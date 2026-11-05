/*
 * Genera el avatar animado de re/START (GIF en loop) a partir del favicon.
 *
 * Secuencia, toda construida desde la marca:
 *   1. la "/" del favicon,
 *   2. la "/" se multiplica en copias de sí misma que se desplazan y ondulan,
 *   3. grilla de cuadrados redondeados (la forma del favicon) que laten en ola,
 *   4. flecha circular de "restart" que gira (el "re"),
 *   5. triángulo de "play" con ecos que se expanden (el "START"),
 *   y vuelta a la "/". Blanco y negro, como el favicon.
 *
 * Cada escena sale con un barrido diagonal en el ángulo de la "/". El primer
 * cuadro es la "/" limpia, así sirve también donde el avatar queda estático.
 *
 * Cada cuadro se dibuja en una grilla 2× (antialias por promedio) y se pasa
 * crudo a ffmpeg, que arma el GIF con una paleta de 64 grises (los degradados la
 * necesitan para no verse en escalones). Solo requiere ffmpeg.
 *
 * Uso: node scripts/avatar-gif.mjs   → public/brand/avatar/avatar-{512,160,80}.gif
 *                                      y avatar-negative-{512,160,80}.gif (negro sobre blanco)
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'public/brand/avatar')
const FAVICON = path.join(ROOT, 'public/favicon.png')

const SIZE = 512
const SS = 2
const GRID = SIZE * SS
const FPS = 30

/*
 * Línea de tiempo: [escena, cuadros, barrido]. Cada escena termina con el barrido
 * a la siguiente, salvo la "/" → diagonales: ahí la escena nueva parte de la misma
 * "/", así que pasa sin corte (un barrido la partiría en dos por un instante).
 */
const TIMELINE = [
	['logo', 40, false],
	['slashes', 72],
	['tiles', 66],
	['restart', 66],
	['play', 60],
]
const TRANSITION = 14

const TAU = Math.PI * 2
const frac = (x) => x - Math.floor(x)
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x))
const smooth = (t) => t * t * (3 - 2 * t)
const mix = (a, b, t) => a + (b - a) * t

/*
 * Ejes de la "/" del favicon (en coordenadas -1..1, y hacia abajo): ALONG corre a lo
 * largo del trazo y ACROSS es perpendicular. Todo lo diagonal usa estos ejes.
 */
const ALONG = [0.426, -0.904]
const ACROSS = [0.904, 0.426]
const across = (u, v) => u * ACROSS[0] + v * ACROSS[1]
const along = (u, v) => u * ALONG[0] + v * ALONG[1]

/* Distancia con signo a un cuadrado redondeado de semilado b y radio r (centrado). */
function roundBox(u, v, b, r) {
	const qx = Math.abs(u) - b + r
	const qy = Math.abs(v) - b + r
	return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r
}

/* Triángulo equilátero con la punta a la derecha y circunradio s: máx. de las 3 caras. */
const TRI = [180, 60, -60].map((d) => [Math.cos((d * Math.PI) / 180), Math.sin((d * Math.PI) / 180)])
const triangle = (u, v, s) => Math.max(...TRI.map(([x, y]) => u * x + v * y)) - s / 2

/* La "/" del favicon sobre negro, a resolución de la grilla. */
function loadLogo() {
	const res = spawnSync('ffmpeg', [
		'-v', 'error',
		'-f', 'lavfi', '-i', `color=black:s=${GRID}x${GRID}`,
		'-i', FAVICON,
		'-filter_complex', `[1]scale=${GRID}:${GRID}[f];[0][f]overlay`,
		'-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'gray', '-',
	], { maxBuffer: GRID * GRID * 2 })
	if (res.status !== 0) throw new Error(res.stderr.toString())
	return res.stdout
}

/* Lee la "/" del favicon en un punto (u, v) cualquiera; fuera del cuadro es negro. */
function sampleLogo(logo, u, v) {
	const x = Math.floor(((u + 1) / 2) * GRID)
	const y = Math.floor(((v + 1) / 2) * GRID)
	if (x < 0 || y < 0 || x >= GRID || y >= GRID) return 0
	return logo[y * GRID + x] / 255
}

/* Cada escena devuelve 0..1 (negro..blanco) para un punto, con t en segundos. */
const scenes = {
	logo: (u, v, t, i, logo) => logo[i] / 255,

	// La "/" del favicon se repite: el periodo baja de "una sola /" a una fila de
	// copias que se desplazan en diagonal y ondulan a lo largo del trazo. Un
	// degradado hacia el borde (que entra antes que las copias) hace que cada "/"
	// empiece y termine difuminada, sin cortarse contra el cuadro.
	slashes(u, v, t, i, logo) {
		const grow = smooth(clamp(t / 0.6))
		const period = mix(4, 0.34, grow)
		const shift = Math.max(0, t - 0.5) * 0.22
		const wave = smooth(clamp((t - 0.7) / 0.6)) * 0.05 * Math.sin(along(u, v) * 4.5 + t * 5)
		// Lleva el punto a la copia más cercana y lee ahí la "/" original.
		const d = across(u, v) - shift + wave
		const m = Math.round(d / period)
		const back = m * period + shift - wave
		const fade = mix(1, smooth(clamp(-roundBox(u, v, 0.94, 0.3) / 0.4)), smooth(clamp(t / 0.25)))
		return sampleLogo(logo, u - back * ACROSS[0], v - back * ACROSS[1]) * fade
	},

	// Grilla 5×5 de cuadrados redondeados que crecen y se achican en una ola
	// que avanza en diagonal, cada uno girando un poco al latir.
	tiles(u, v, t) {
		const N = 5
		const cell = 1.7 / N
		const gx = (u + 0.85) / cell
		const gy = (v + 0.85) / cell
		const i = Math.floor(gx)
		const j = Math.floor(gy)
		if (i < 0 || j < 0 || i >= N || j >= N) return 0
		const lx = (frac(gx) - 0.5) * cell
		const ly = (frac(gy) - 0.5) * cell
		const pulse = 0.5 + 0.5 * Math.sin(t * 4.2 - (i * ACROSS[0] - j * ALONG[1] * 0.5) * 1.3)
		const h = cell * mix(0.12, 0.44, pulse)
		const a = (1 - pulse) * 0.6
		const rx = lx * Math.cos(a) - ly * Math.sin(a)
		const ry = lx * Math.sin(a) + ly * Math.cos(a)
		return roundBox(rx, ry, h, h * 0.32) < 0 ? 1 : 0
	},

	// Flecha circular de "restart": un arco grueso que gira acelerando y frenando,
	// cuyo largo respira, con una punta triangular recta en la tangente del arco.
	restart(u, v, t) {
		const r = Math.hypot(u, v)
		const R0 = 0.54
		const W = 0.1
		const spin = t * 2.4 + Math.sin(t * 2.4) * 0.6
		const len = TAU * (0.74 + 0.06 * Math.sin(t * 3))
		const th = (((Math.atan2(v, u) - spin) % TAU) + TAU) % TAU
		if (th <= len && Math.abs(r - R0) < W) return 1
		const end = spin + len
		const nx = Math.cos(end), ny = Math.sin(end)
		const a = (u - R0 * nx) * -ny + (v - R0 * ny) * nx // a lo largo de la tangente
		const b = (u - R0 * nx) * nx + (v - R0 * ny) * ny // hacia afuera del círculo
		const HEAD = 0.3
		return a >= 0 && a <= HEAD && Math.abs(b) <= W * 2.1 * (1 - a / HEAD) ? 1 : 0
	},

	// Triángulo de "play" chico que late como un corazón (dos pulsos y una pausa),
	// y en cada latido suelta un contorno que crece y se desvanece por completo
	// antes de tocar el borde del cuadro.
	play(u, v, t) {
		const BASE = 0.42
		const cu = u + BASE / 4 // centra la caja del triángulo, no su centroide
		const beat = frac(t * 0.9)
		const bump = (c) => Math.exp(-(((beat - c) / 0.055) ** 2))
		const s = BASE * (1 + 0.3 * (bump(0.08) + 0.65 * bump(0.26)))
		if (triangle(cu, v, s) < 0) return 1
		// Circunradio con el que el triángulo todavía cabe entero en el cuadro, con margen.
		const MAX = 0.98
		let out = 0
		for (let k = 0; k < 2; k++) {
			const p = frac(t * 0.9 - 0.08 + k / 2)
			const d = triangle(cu, v, mix(BASE * 1.2, MAX, p))
			if (d < 0 && d > -0.06) out = Math.max(out, (1 - p) * (1 - p))
		}
		return out
	},

}

function render() {
	const logo = loadLogo()
	const frames = []
	const hi = new Float32Array(GRID * GRID)

	for (let s = 0; s < TIMELINE.length; s++) {
		const [name, count, wipe = true] = TIMELINE[s]
		const next = TIMELINE[(s + 1) % TIMELINE.length][0]

		for (let f = 0; f < count; f++) {
			const t = f / FPS
			// En los últimos cuadros, la escena siguiente entra con un barrido diagonal
			// paralelo a la "/", separado por una franja negra. La siguiente arranca
			// con t negativo para que su reloj siga sin salto al empezar.
			const out = f - (count - TRANSITION)
			const k = wipe && out > 0 ? smooth(out / TRANSITION) : 0
			const edge = mix(-1.5, 1.5, k)
			const tNext = (f - count) / FPS

			for (let y = 0, i = 0; y < GRID; y++) {
				const v = ((y + 0.5) / GRID) * 2 - 1
				for (let x = 0; x < GRID; x++, i++) {
					const u = ((x + 0.5) / GRID) * 2 - 1
					if (k <= 0) {
						hi[i] = scenes[name](u, v, t, i, logo)
						continue
					}
					const w = across(u, v)
					if (w < edge - 0.06) hi[i] = scenes[next](u, v, tNext, i, logo)
					else if (w < edge) hi[i] = 0
					else hi[i] = scenes[name](u, v, t, i, logo)
				}
			}

			const outFrame = Buffer.alloc(SIZE * SIZE)
			for (let y = 0; y < SIZE; y++) {
				for (let x = 0; x < SIZE; x++) {
					let sum = 0
					for (let dy = 0; dy < SS; dy++) {
						for (let dx = 0; dx < SS; dx++) sum += hi[(y * SS + dy) * GRID + x * SS + dx]
					}
					outFrame[y * SIZE + x] = Math.round((sum / (SS * SS)) * 255)
				}
			}
			frames.push(outFrame)
		}
	}
	return frames
}

function encode(frames, size, file) {
	const scale = size === SIZE ? '' : `scale=${size}:${size}:flags=lanczos,`
	const res = spawnSync('ffmpeg', [
		'-v', 'error', '-y',
		'-f', 'rawvideo', '-pix_fmt', 'gray', '-s', `${SIZE}x${SIZE}`, '-r', String(FPS), '-i', '-',
		'-filter_complex', `${scale}split[a][b];[a]palettegen=max_colors=64:reserve_transparent=0[p];[b][p]paletteuse=dither=none`,
		'-loop', '0', file,
	], { input: Buffer.concat(frames), maxBuffer: 1 << 30 })
	if (res.status !== 0) throw new Error(res.stderr.toString())
}

const frames = render()
// El negativo es la misma animación con cada pixel invertido.
const negative = frames.map((f) => Buffer.from(Uint8Array.from(f, (b) => 255 - b)))

fs.mkdirSync(OUT_DIR, { recursive: true })
for (const [prefix, set] of [['avatar', frames], ['avatar-negative', negative]]) {
	for (const size of [512, 160, 80]) {
		const file = path.join(OUT_DIR, `${prefix}-${size}.gif`)
		encode(set, size, file)
		console.log(`${path.relative(ROOT, file)}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`)
	}
}
console.log(`${frames.length} cuadros, ${(frames.length / FPS).toFixed(1)} s`)
