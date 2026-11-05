/*
 * Genera el avatar animado de re/START (GIF en loop) a partir del favicon.
 *
 * Secuencia: la "/" del favicon y luego esferas que giran, cada una cubierta por
 * un patrón que se repite, construido desde la marca:
 *   1. la "/" del favicon,
 *   2. esfera con dos "/" enteras (la del favicon) que ondulan como serpiente mientras
 *      gira; nace desde el centro de la "/" y la del frente calza con el logo,
 *   3. esfera de cuadrados redondeados (la forma del favicon) que laten en ola,
 *   4. esfera de flechas circulares de "restart" que giran (el "re"),
 *   5. esfera de triángulos de "play" que laten como corazón (el "START"),
 *   y vuelta a la "/". Blanco y negro, como el favicon.
 *
 * Entre esferas hay un barrido diagonal en el ángulo de la "/". El primer cuadro
 * es la "/" limpia, así sirve también donde el avatar queda estático.
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
 * a la siguiente, salvo la "/" → esfera de "/": ahí la esfera nace sobre la misma
 * "/" y la cubre, sin barrido.
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

const easeOutBack = (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2

/*
 * Eje perpendicular a la "/" del favicon (en coordenadas -1..1, y hacia abajo):
 * el barrido entre escenas avanza en esta dirección, paralelo al trazo.
 */
const ACROSS = [0.904, 0.426]
const across = (u, v) => u * ACROSS[0] + v * ACROSS[1]

const SPHERE_R = 0.8

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

/*
 * Proyecta (u, v) sobre una esfera de radio `rad`, inclinada y girando. Devuelve
 * [lon, lat] (lat crece hacia abajo, como v) o null si el punto cae fuera.
 */
function sphere(u, v, spin, tiltX, tiltZ, rad = SPHERE_R) {
	const x0 = u / rad
	const y0 = v / rad
	const d = x0 * x0 + y0 * y0
	if (d >= 1) return null
	const z0 = Math.sqrt(1 - d)
	const cz = Math.cos(tiltZ), sz = Math.sin(tiltZ)
	const x1 = x0 * cz - y0 * sz
	const y1 = x0 * sz + y0 * cz
	const cx = Math.cos(tiltX), sx = Math.sin(tiltX)
	const y2 = y1 * cx - z0 * sx
	const z2 = y1 * sx + z0 * cx
	return [Math.atan2(x1, z2) + spin, Math.asin(clamp(y2, -1, 1))]
}

/*
 * Cubre una esfera con un patrón por celdas. Hay `rows` filas de latitud; cada fila
 * tiene menos celdas hacia los polos (como los paneles de una pelota) para que las
 * formas mantengan su proporción, y las filas impares van corridas media celda.
 * `cell(x, y, col, row)` recibe coordenadas locales -1..1 con la celda cuadrada.
 */
function patternSphere(u, v, { spin, tiltX, tiltZ, rad, cols, rows }, cell) {
	const s = sphere(u, v, spin, tiltX, tiltZ, rad)
	if (!s) return 0
	const [lon, lat] = s
	const gv = (lat / Math.PI + 0.5) * rows
	const row = Math.min(rows - 1, Math.floor(gv))
	const latC = ((row + 0.5) / rows - 0.5) * Math.PI
	const n = Math.max(1, Math.round(cols * Math.cos(latC)))
	const gu = (lon / TAU) * n + (row % 2) * 0.5
	const col = ((Math.floor(gu) % n) + n) % n
	const x = (frac(gu) - 0.5) * Math.cos(lat) * (TAU / n) / (Math.PI / rows)
	const y = frac(gv) - 0.5
	return cell(x * 2, y * 2, col, row)
}

/* Cada escena devuelve 0..1 (negro..blanco) para un punto, con t en segundos. */
const scenes = {
	logo: (u, v, t, i, logo) => logo[i] / 255,

	// Esfera con dos "/" enteras del favicon, una adelante y otra atrás (así al
	// empezar solo se ve la del frente, sin trozos de la otra por el borde). La
	// esfera calza con el logo: la "/" del frente se proyecta igual que la del
	// favicon, así el paso desde la "/" sola es continuo. Una red tenue de meridianos
	// y paralelos (con su contorno) aparece desde el centro para mostrar la esfera;
	// luego gira y cada "/" ondula a lo largo como una serpiente.
	slashes(u, v, t, i, logo) {
		const r = Math.hypot(u, v)
		if (r >= SPHERE_R) return 0
		const spin = 1.8 * Math.max(0, t - 0.35)
		const s = sphere(u, v, spin, 0, 0)
		const [lon, lat] = s
		const snake = 0.16 * smooth(clamp((t - 0.45) / 0.5)) * Math.sin(lat * 3.2 - t * 5.5)
		let out = 0
		for (let k = 0; k < 2; k++) {
			const dl = ((((lon - k * Math.PI) % TAU) + TAU + Math.PI) % TAU) - Math.PI
			if (Math.abs(dl) > Math.PI / 2) continue
			// Misma proyección ortográfica que la pantalla: sin serpiente, la "/" del frente
			// cae exactamente sobre la del logo.
			const x = SPHERE_R * Math.sin(dl - snake) * Math.cos(lat)
			out = Math.max(out, sampleLogo(logo, x, SPHERE_R * Math.sin(lat)))
		}
		if (out > 0.5) return out
		// Red de la esfera, revelada por un círculo nítido que crece desde el centro.
		const reveal = SPHERE_R * smooth(clamp(t / 0.5))
		if (r > reveal) return out
		const STEP = Math.PI / 6
		const LINE = 0.014
		const meridian = Math.abs(frac(lon / STEP + 0.5) - 0.5) * STEP * Math.cos(lat)
		const parallel = Math.abs(frac(lat / STEP + 0.5) - 0.5) * STEP
		const grid = meridian < LINE || parallel < LINE ? 0.3 : 0
		const rim = r > reveal - 0.016 ? 0.55 : 0
		return Math.max(out, grid, rim)
	},

	// Esfera de cuadrados redondeados que crecen y se achican en una ola diagonal.
	tiles(u, v, t) {
		return patternSphere(u, v, { spin: -t * 0.8, tiltX: -0.3, tiltZ: 0.3, cols: 16, rows: 8 }, (x, y, col, row) => {
			const pulse = 0.5 + 0.5 * Math.sin(t * 4.2 - (col * 0.6 + row * 0.9))
			const h = mix(0.3, 0.78, pulse)
			return roundBox(x, y, h, h * 0.32) < 0 ? 1 : 0
		})
	},

	// Flecha circular de "restart": un arco grueso que gira acelerando y frenando,
	// cuyo largo respira, con una punta triangular recta en la tangente del arco.
	// En la esfera se repite, cada flecha con su propio desfase.
	restart(u, v, t) {
		return patternSphere(u, v, { spin: t * 0.7, tiltX: -0.4, tiltZ: -0.2, cols: 8, rows: 4 },
			(x, y, col, row) => arrow(x * 1.05, y * 1.05, t + (col + row) * 0.35, 0.17))
	},

	// Triángulos de "play" que laten como un corazón (dos pulsos y una pausa), con
	// el latido avanzando fila por fila.
	play(u, v, t) {
		return patternSphere(u, v, { spin: -t * 0.9, tiltX: -0.3, tiltZ: 0.2, cols: 12, rows: 6 }, (x, y, col, row) => {
			const beat = frac(t * 0.9 - row * 0.08)
			const bump = (c) => Math.exp(-(((beat - c) / 0.055) ** 2))
			const s = 0.95 * (1 + 0.28 * (bump(0.08) + 0.65 * bump(0.26)))
			return triangle(x + s / 4, y, s) < 0 ? 1 : 0
		})
	},
}

/* Una flecha circular de "restart" en coordenadas -1..1, con semigrosor W. */
function arrow(u, v, t, W = 0.1) {
	const r = Math.hypot(u, v)
	const R0 = 0.54
	const spin = t * 2.4 + Math.sin(t * 2.4) * 0.6
	const len = TAU * (0.74 + 0.06 * Math.sin(t * 3))
	const th = (((Math.atan2(v, u) - spin) % TAU) + TAU) % TAU
	if (th <= len && Math.abs(r - R0) < W) return 1
	const end = spin + len
	const nx = Math.cos(end), ny = Math.sin(end)
	const a = (u - R0 * nx) * -ny + (v - R0 * ny) * nx // a lo largo de la tangente
	const b = (u - R0 * nx) * nx + (v - R0 * ny) * ny // hacia afuera del círculo
	const HEAD = W * 3
	return a >= 0 && a <= HEAD && Math.abs(b) <= W * 2.1 * (1 - a / HEAD) ? 1 : 0
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
