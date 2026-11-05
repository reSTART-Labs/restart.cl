/*
 * Genera el avatar animado de re/START (GIF en loop) a partir del favicon.
 *
 * Secuencia: la "/" del favicon → anillos concéntricos → esfera con franjas en
 * espiral → diana pulsante → esfera con franjas onduladas → esfera de puntos →
 * vuelta a la "/". Todo en blanco y negro, como el favicon. Cada escena entra con
 * un círculo que se abre desde el centro.
 *
 * Cada cuadro se dibuja en una grilla 2× (antialias por promedio) y se pasa
 * crudo a ffmpeg, que arma el GIF con una paleta de grises. Solo requiere ffmpeg.
 *
 * Uso: node scripts/avatar-gif.mjs   → public/brand/avatar/avatar-{512,160,80}.gif
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
const R = 0.8 // radio de las esferas y anillos (en unidades de -1..1)

/* Línea de tiempo: [escena, cuadros]. Las transiciones están dentro de cada escena. */
const TIMELINE = [
	['logo', 36],
	['rings', 48],
	['spiral', 66],
	['target', 54],
	['wavy', 66],
	['dots', 60],
]
const TRANSITION = 12

const TAU = Math.PI * 2
const frac = (x) => x - Math.floor(x)
const smooth = (t) => t * t * (3 - 2 * t)

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

/*
 * Proyecta (u, v) sobre una esfera inclinada que gira. Devuelve [lon, lat] o null
 * si el punto cae fuera. La inclinación en Z sigue el ángulo de la "/".
 */
function sphere(u, v, spin, tiltX = -0.45, tiltZ = -0.35) {
	const x0 = u / R
	const y0 = v / R
	const d = x0 * x0 + y0 * y0
	if (d >= 1) return null
	const z0 = Math.sqrt(1 - d)
	const cz = Math.cos(tiltZ), sz = Math.sin(tiltZ)
	const x1 = x0 * cz - y0 * sz
	const y1 = x0 * sz + y0 * cz
	const cx = Math.cos(tiltX), sx = Math.sin(tiltX)
	const y2 = y1 * cx - z0 * sx
	const z2 = y1 * sx + z0 * cx
	return [Math.atan2(x1, z2) + spin, Math.asin(Math.max(-1, Math.min(1, y2)))]
}

/* Cada escena devuelve 1 (blanco) o 0 (negro) para un punto, con t en segundos. */
const scenes = {
	logo: (u, v, t, i, logo) => logo[i] / 255,

	rings(u, v, t) {
		const r = Math.hypot(u, v)
		if (r > R) return 0
		return frac(r * 9 - t * 1.6) < 0.2 ? 1 : 0
	},

	spiral(u, v, t) {
		const s = sphere(u, v, t * 1.4)
		if (!s) return 0
		const f = (s[1] / Math.PI) * 9 + (s[0] / TAU) * 2
		return frac(f) < 0.5 ? 1 : 0
	},

	target(u, v, t) {
		const r = Math.hypot(u, v)
		if (r > R) return 0
		return frac(r / (R * 0.5) + t * 0.9) < 0.5 ? 1 : 0
	},

	wavy(u, v, t) {
		const s = sphere(u, v, -t * 1.2, -0.3, 0.3)
		if (!s) return 0
		const f = (s[1] / Math.PI) * 8 + 0.35 * Math.sin(s[0] * 3)
		return frac(f) < 0.45 ? 1 : 0
	},

	dots(u, v, t) {
		const s = sphere(u, v, t * 1.1, -0.12, 0)
		if (!s) return 0
		const gu = (s[0] / TAU) * 18
		const gv = (s[1] / Math.PI) * 10
		// Las columnas se encogen hacia los polos; compensa para que los puntos sean redondos.
		const du = (frac(gu) - 0.5) * Math.cos(s[1])
		const dv = frac(gv) - 0.5
		return du * du + dv * dv < 0.09 ? 1 : 0
	},
}

function render() {
	const logo = loadLogo()
	const total = TIMELINE.reduce((n, [, f]) => n + f, 0)
	const frames = []
	const hi = new Float32Array(GRID * GRID)

	let start = 0
	for (let s = 0; s < TIMELINE.length; s++) {
		const [name, count] = TIMELINE[s]
		const prev = TIMELINE[(s - 1 + TIMELINE.length) % TIMELINE.length][0]
		const prevStart = s === 0 ? total - TIMELINE.at(-1)[1] : start - TIMELINE[s - 1][1]

		for (let f = 0; f < count; f++) {
			const frame = start + f
			const t = f / FPS
			// Durante la transición, la escena nueva entra en un círculo que crece
			// desde el centro, con un aro negro en el borde que separa ambas.
			const k = f < TRANSITION ? smooth(f / TRANSITION) : 1
			const edge = k * 1.5
			const tPrev = (frame - prevStart + (s === 0 ? total : 0)) / FPS

			for (let y = 0, i = 0; y < GRID; y++) {
				const v = (y + 0.5) / GRID * 2 - 1
				for (let x = 0; x < GRID; x++, i++) {
					const u = (x + 0.5) / GRID * 2 - 1
					const r = Math.hypot(u, v)
					if (k >= 1 || r < edge - 0.04) hi[i] = scenes[name](u, v, t, i, logo)
					else if (r < edge) hi[i] = 0
					else hi[i] = scenes[prev](u, v, tPrev, i, logo)
				}
			}

			const out = Buffer.alloc(SIZE * SIZE)
			for (let y = 0; y < SIZE; y++) {
				for (let x = 0; x < SIZE; x++) {
					let sum = 0
					for (let dy = 0; dy < SS; dy++) {
						for (let dx = 0; dx < SS; dx++) sum += hi[(y * SS + dy) * GRID + x * SS + dx]
					}
					out[y * SIZE + x] = Math.round((sum / (SS * SS)) * 255)
				}
			}
			frames.push(out)
		}
		start += count
	}
	return frames
}

function encode(frames, size, file) {
	const scale = size === SIZE ? '' : `scale=${size}:${size}:flags=lanczos,`
	const res = spawnSync('ffmpeg', [
		'-v', 'error', '-y',
		'-f', 'rawvideo', '-pix_fmt', 'gray', '-s', `${SIZE}x${SIZE}`, '-r', String(FPS), '-i', '-',
		'-filter_complex', `${scale}split[a][b];[a]palettegen=max_colors=16:reserve_transparent=0[p];[b][p]paletteuse=dither=none`,
		'-loop', '0', file,
	], { input: Buffer.concat(frames), maxBuffer: 1 << 30 })
	if (res.status !== 0) throw new Error(res.stderr.toString())
}

const frames = render()
fs.mkdirSync(OUT_DIR, { recursive: true })
for (const size of [512, 160, 80]) {
	const file = path.join(OUT_DIR, `avatar-${size}.gif`)
	encode(frames, size, file)
	console.log(`${path.relative(ROOT, file)}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`)
}
console.log(`${frames.length} cuadros, ${(frames.length / FPS).toFixed(1)} s`)
