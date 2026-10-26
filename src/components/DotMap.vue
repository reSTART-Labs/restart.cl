<template>
	<div class="dot-map">
		<canvas ref="canvas" class="dot-map-canvas" :style="{ aspectRatio: `${COLS} / ${ROWS}` }" aria-hidden="true"></canvas>
		<ul class="dot-map-pins">
			<li
				v-for="sede in sedes"
				:key="sede.name"
				class="dot-map-pin"
				:style="pinStyle(sede)"
				tabindex="0"
			>
				<span class="dot-map-pin-glow"></span>
				<svg class="dot-map-pin-marker" viewBox="0 0 24 32" aria-hidden="true">
					<path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0z" />
					<circle cx="12" cy="11.5" r="4.2" />
				</svg>
				<span class="dot-map-pin-label">{{ sede.name }}, {{ sede.country }}</span>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { COLS, ROWS, LAT_NORTH, LAT_SOUTH, land, sedes } from '@/data/worldDots'

/*
 * Mapa mundial de puntos en <canvas> 2D sobre el fondo de la tarjeta: aparición
 * escalonada al entrar en pantalla (easeOutBack), pulso de opacidad por región y,
 * en escritorio, los puntos cercanos al mouse crecen, se aclaran y se apartan.
 * Los pins de las sedes son HTML encima, anclados al punto más cercano.
 */
const DOT_SIZE_RATIO = 0.44
const BASE_SCALE = 0.48
const REVEAL_DURATION = 1100
const REVEAL_STAGGER = 800
const OVERSHOOT = 1.1
const HOVER_RADIUS = 190
const HOVER_MIN = 0.1
const HOVER_MAX = 0.6
const HOVER_LERP = 0.12
const HOVER_ALPHA = 0.35
const REPULSE_MAX = 10
const REPULSE_LERP = 0.14
const PULSE_MIN = 0.4
const PULSE_EXTRA = 0.35

/* Bandas de longitud que hacen de "región" para desfasar el pulso. */
const REGIONS = [
	{ maxCol: 22, dur: 3500, off: 0.13 }, // Américas
	{ maxCol: 37, dur: 3000, off: 0.5 },  // Europa y África
	{ maxCol: COLS, dur: 4000, off: 0.2 }, // Asia y Oceanía
]

const canvas = ref(null)

/* El pin se ancla al centro de la celda más cercana para quedar sobre un punto. */
function pinStyle({ lat, lon }) {
	const col = Math.min(COLS - 1, Math.floor(((lon + 180) / 360) * COLS))
	const row = Math.min(ROWS - 1, Math.floor(((LAT_NORTH - lat) / (LAT_NORTH - LAT_SOUTH)) * ROWS))
	return {
		left: `${((col + 0.5) / COLS) * 100}%`,
		top: `${((row + 0.5) / ROWS) * 100}%`,
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
			let alpha = PULSE_MIN + PULSE_EXTRA / 2
			if (!reduceMotion) {
				const e = visible ? now - revealStart - d.delay : 0
				rev = e <= 0 ? 0 : e >= REVEAL_DURATION ? 1 : easeOutBack(e / REVEAL_DURATION)
				const p = ((now + d.off * d.dur) % d.dur) / d.dur
				alpha = PULSE_MIN + (0.5 + 0.5 * Math.sin(p * Math.PI * 2)) * PULSE_EXTRA
			}
			// Cerca del mouse los puntos además se aclaran.
			alpha = Math.min(1, alpha + (d.hs / HOVER_MAX) * HOVER_ALPHA)

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

	// Se escucha en el contenedor para que pasar sobre un pin no corte el hover.
	const wrap = el.parentElement
	const onEnter = () => { hover = true }
	const onLeave = () => { hover = false }
	const onMove = (e) => {
		const r = el.getBoundingClientRect()
		mx = e.clientX - r.left
		my = e.clientY - r.top
	}
	wrap.addEventListener('mouseenter', onEnter)
	wrap.addEventListener('mouseleave', onLeave)
	wrap.addEventListener('mousemove', onMove)

	readColor()
	resize()
	if (reduceMotion) el.closest('.dot-map')?.classList.add('is-visible')

	cleanup = () => {
		cancelAnimationFrame(raf)
		io.disconnect()
		ro.disconnect()
		themeObserver.disconnect()
		wrap.removeEventListener('mouseenter', onEnter)
		wrap.removeEventListener('mouseleave', onLeave)
		wrap.removeEventListener('mousemove', onMove)
	}
})

onBeforeUnmount(() => cleanup())
</script>

<style scoped>
.dot-map {
	--dot-map-bg: var(--color-surface);
	--dot-map-dot: var(--color-primary-500);
	--dot-map-pin: var(--color-primary-700);
	--dot-map-glow: 26 142 158;
	position: relative;
	width: 100%;
}

:global(html[data-theme="dark"] .dot-map) {
	--dot-map-dot: var(--color-primary-300);
	--dot-map-pin: #fff;
	--dot-map-glow: 111 224 237;
}

.dot-map-canvas {
	display: block;
	width: 100%;
	height: auto;
	color: var(--dot-map-dot);
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
	width: 0;
	height: 0;
	opacity: 0;
	transition: opacity 0.6s ease 1.4s;
	pointer-events: auto;
	outline: none;
}

.is-visible .dot-map-pin {
	opacity: 1;
}

/* Halo en la base del pin: punto cian con ondas que se expanden. */
.dot-map-pin-glow {
	position: absolute;
	left: -0.3rem;
	top: -0.3rem;
	width: 0.6rem;
	height: 0.6rem;
	border-radius: 50%;
	background: rgb(var(--dot-map-glow));
	box-shadow: 0 0 0 0.45rem rgb(var(--dot-map-glow) / 0.25), 0 0 0 0.9rem rgb(var(--dot-map-glow) / 0.12);
}

.dot-map-pin-glow::after {
	content: '';
	position: absolute;
	inset: 0;
	border-radius: 50%;
	background: rgb(var(--dot-map-glow));
	animation: dot-map-ping 2.4s ease-out infinite;
}

.dot-map-pin-marker {
	position: absolute;
	left: -0.75rem;
	bottom: 0.15rem;
	width: 1.5rem;
	height: 2rem;
	filter: drop-shadow(0 3px 6px rgb(0 0 0 / 0.25));
	transition: transform 0.25s ease;
	transform-origin: 50% 100%;
}

.dot-map-pin-marker path {
	fill: var(--dot-map-pin);
}

.dot-map-pin-marker circle {
	fill: var(--dot-map-bg);
}

.dot-map-pin:hover .dot-map-pin-marker,
.dot-map-pin:focus-visible .dot-map-pin-marker {
	transform: scale(1.15);
}

.dot-map-pin-label {
	position: absolute;
	left: 1.1rem;
	bottom: 1rem;
	padding: 0.3rem 0.6rem;
	border-radius: 0.4rem;
	background: var(--dot-map-pin);
	color: var(--dot-map-bg);
	font-size: 0.75rem;
	font-weight: 700;
	white-space: nowrap;
	box-shadow: 0 6px 18px rgb(0 0 0 / 0.2);
	opacity: 0;
	transform: translateY(4px);
	transition: opacity 0.2s ease, transform 0.2s ease;
	pointer-events: none;
}

.dot-map-pin:hover .dot-map-pin-label,
.dot-map-pin:focus-visible .dot-map-pin-label {
	opacity: 1;
	transform: none;
}

@keyframes dot-map-ping {
	from { transform: scale(1); opacity: 0.6; }
	to { transform: scale(3.5); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
	.dot-map-pin { transition: none; }
	.dot-map-pin-glow::after { animation: none; }
}
</style>
