<template>
	<div class="dot-map">
		<canvas ref="canvas" class="dot-map-canvas" aria-hidden="true"></canvas>
		<ul class="dot-map-pins">
			<li
				v-for="sede in sedes"
				:key="sede.name"
				class="dot-map-pin"
				:style="pinStyle(sede)"
			>
				<span class="dot-map-pin-dot"></span>
				<span class="dot-map-pin-label">
					<strong>{{ sede.name }}</strong>
					<span>{{ sede.country }}</span>
				</span>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { COLS, ROWS, LAT_NORTH, LAT_SOUTH, land, sedes } from '@/data/worldDots'

/*
 * Mapa mundial de puntos en <canvas> 2D: aparición escalonada al entrar en
 * pantalla (easeOutBack), pulso de opacidad por región y, en escritorio, los
 * puntos crecen y se apartan del mouse. Los pins de las sedes son HTML encima.
 */
const DOT_SIZE_RATIO = 0.44
const BASE_SCALE = 0.45
const REVEAL_DURATION = 1100
const REVEAL_STAGGER = 800
const OVERSHOOT = 1.1
const HOVER_RADIUS = 190
const HOVER_MIN = 0.1
const HOVER_MAX = 0.5
const HOVER_LERP = 0.12
const REPULSE_MAX = 8
const REPULSE_LERP = 0.14
const PULSE_MIN = 0.35
const PULSE_EXTRA = 0.65

/* Bandas de longitud que hacen de "región" para desfasar el pulso. */
const REGIONS = [
	{ maxCol: 20, dur: 3500, off: 0.13 }, // Américas
	{ maxCol: 34, dur: 3000, off: 0.5 },  // Europa y África
	{ maxCol: COLS, dur: 4000, off: 0.2 }, // Asia y Oceanía
]

const canvas = ref(null)

function pinStyle({ lat, lon }) {
	return {
		left: `${((lon + 180) / 360) * 100}%`,
		top: `${((LAT_NORTH - lat) / (LAT_NORTH - LAT_SOUTH)) * 100}%`,
	}
}

let cleanup = () => {}

onMounted(() => {
	const el = canvas.value
	const ctx = el.getContext('2d')
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	const canHover = window.matchMedia('(min-width: 992px) and (hover: hover)')

	const dots = land.map((idx, i) => {
		const col = idx % COLS
		const region = REGIONS.find((r) => col < r.maxCol)
		return {
			col,
			row: Math.floor(idx / COLS),
			delay: (i / Math.max(1, land.length - 1)) * REVEAL_STAGGER,
			dur: region.dur,
			off: region.off + i * 0.017,
			hs: 0, ox: 0, oy: 0,
		}
	})

	let color = ''
	let visible = false
	let revealStart = null
	let hover = false
	let mx = 0
	let my = 0
	let raf = 0
	let onScreen = false

	// El color sale del tema (CSS `color` del canvas), así sigue al toggle claro/oscuro.
	const readColor = () => { color = getComputedStyle(el).color }
	const easeOutBack = (t) => 1 + (OVERSHOOT + 1) * Math.pow(t - 1, 3) + OVERSHOOT * Math.pow(t - 1, 2)

	function resize() {
		const dpr = Math.min(window.devicePixelRatio || 1, 2)
		el.width = Math.round(el.clientWidth * dpr)
		el.height = Math.round(el.clientHeight * dpr)
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
		if (reduceMotion) draw(performance.now())
	}

	function draw(now) {
		const w = el.clientWidth
		const h = el.clientHeight
		const cw = w / COLS
		const ch = h / ROWS
		const radius = Math.min(cw, ch) * DOT_SIZE_RATIO
		const interactive = hover && canHover.matches

		ctx.clearRect(0, 0, w, h)
		ctx.fillStyle = color

		for (const d of dots) {
			const bx = (d.col + 0.5) * cw
			const by = (d.row + 0.5) * ch

			let ths = 0, tox = 0, toy = 0
			if (interactive) {
				const dx = bx - mx
				const dy = by - my
				const dist = Math.hypot(dx, dy) || 1e-4
				if (dist <= HOVER_RADIUS) {
					const t = 1 - Math.pow(dist / HOVER_RADIUS, 1.8)
					ths = HOVER_MIN + t * (HOVER_MAX - HOVER_MIN)
					tox = (dx / dist) * t * REPULSE_MAX
					toy = (dy / dist) * t * REPULSE_MAX
				}
			}
			d.hs += (ths - d.hs) * HOVER_LERP
			d.ox += (tox - d.ox) * REPULSE_LERP
			d.oy += (toy - d.oy) * REPULSE_LERP

			let rev = 1
			let alpha = 0.7
			if (!reduceMotion) {
				const e = visible ? now - revealStart - d.delay : 0
				rev = e <= 0 ? 0 : e >= REVEAL_DURATION ? 1 : easeOutBack(e / REVEAL_DURATION)
				const p = ((now + d.off * d.dur) % d.dur) / d.dur
				alpha = Math.min(1, PULSE_MIN + (0.5 + 0.5 * Math.sin(p * Math.PI * 2)) * PULSE_EXTRA)
			}

			const scale = Math.max(0, rev) * (BASE_SCALE + d.hs)
			if (scale <= 0.001) continue

			ctx.globalAlpha = alpha
			ctx.beginPath()
			ctx.arc(bx + d.ox, by + d.oy, radius * scale, 0, Math.PI * 2)
			ctx.fill()
		}
		ctx.globalAlpha = 1
	}

	function loop(now) {
		draw(now)
		raf = onScreen ? requestAnimationFrame(loop) : 0
	}

	// Revela una vez y pausa el loop mientras el mapa está fuera de pantalla.
	const io = new IntersectionObserver((entries) => {
		onScreen = entries.some((e) => e.isIntersecting)
		if (onScreen && !visible) {
			visible = true
			revealStart = performance.now()
			el.closest('.dot-map')?.classList.add('is-visible')
		}
		if (onScreen && !raf && !reduceMotion) raf = requestAnimationFrame(loop)
	}, { threshold: 0.2 })
	io.observe(el)

	const ro = new ResizeObserver(resize)
	ro.observe(el)

	const themeObserver = new MutationObserver(() => {
		readColor()
		if (reduceMotion) draw(performance.now())
	})
	themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

	const onEnter = () => { hover = true }
	const onLeave = () => { hover = false }
	const onMove = (e) => {
		const r = el.getBoundingClientRect()
		mx = e.clientX - r.left
		my = e.clientY - r.top
	}
	el.addEventListener('mouseenter', onEnter)
	el.addEventListener('mouseleave', onLeave)
	el.addEventListener('mousemove', onMove)

	readColor()
	resize()
	if (reduceMotion) el.closest('.dot-map')?.classList.add('is-visible')

	cleanup = () => {
		cancelAnimationFrame(raf)
		io.disconnect()
		ro.disconnect()
		themeObserver.disconnect()
		el.removeEventListener('mouseenter', onEnter)
		el.removeEventListener('mouseleave', onLeave)
		el.removeEventListener('mousemove', onMove)
	}
})

onBeforeUnmount(() => cleanup())
</script>

<style scoped>
.dot-map {
	position: relative;
	width: 100%;
}

.dot-map-canvas {
	display: block;
	width: 100%;
	height: auto;
	aspect-ratio: 55 / 35;
	color: var(--color-primary-500);
}

:global(html[data-theme="dark"]) .dot-map-canvas {
	color: var(--color-primary-300);
}

.dot-map-pins {
	position: absolute;
	inset: 0;
	margin: 0;
	padding: 0;
	list-style: none;
	pointer-events: none;
}

.dot-map-pin {
	position: absolute;
	display: flex;
	align-items: center;
	gap: 0.6rem;
	transform: translate(-0.4rem, -50%);
	opacity: 0;
	transition: opacity 0.6s ease 1.4s;
}

.is-visible .dot-map-pin {
	opacity: 1;
}

.dot-map-pin-dot {
	position: relative;
	flex: none;
	width: 0.8rem;
	height: 0.8rem;
	border-radius: 50%;
	background: var(--color-primary-700);
	box-shadow: 0 0 0 3px var(--color-surface);
}

.dot-map-pin-dot::after {
	content: '';
	position: absolute;
	inset: 0;
	border-radius: 50%;
	background: var(--color-primary-400);
	animation: dot-map-ping 2s ease-out infinite;
}

:global(html[data-theme="dark"]) .dot-map-pin-dot {
	background: var(--color-primary-200);
}

.dot-map-pin-label {
	display: flex;
	flex-direction: column;
	padding: 0.35rem 0.7rem;
	border: 1px solid var(--color-border);
	border-radius: 0.5rem;
	background: var(--color-surface-raised);
	box-shadow: 0 6px 18px rgb(0 0 0 / 0.08);
	line-height: 1.2;
	white-space: nowrap;
}

.dot-map-pin-label strong {
	font-size: 0.8rem;
	color: var(--color-text);
}

.dot-map-pin-label span {
	font-size: 0.7rem;
	color: var(--color-text-muted);
}

@keyframes dot-map-ping {
	from { transform: scale(1); opacity: 0.7; }
	to { transform: scale(3); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
	.dot-map-pin { transition: none; }
	.dot-map-pin-dot::after { animation: none; }
}
</style>
