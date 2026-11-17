<template>
	<div
		class="device-showcase"
		:class="[`is-${layout}`, { 'is-static': isStatic }]"
		@mouseenter="pausar"
		@mouseleave="reanudar"
		@focusin="pausar"
		@focusout="reanudar"
		@touchstart.passive="tocar"
	>
		<!-- Navegador: barra con 3 puntos + dominio, pantalla con la captura -->
		<div v-if="webSrc" class="ds-browser">
			<div class="ds-bar" aria-hidden="true">
				<span class="ds-dots"><i></i><i></i><i></i></span>
				<span class="ds-url">
					<i class="fa fa-lock"></i>
					{{ domain }}
				</span>
			</div>
			<div
				ref="webScreen"
				class="ds-screen"
				:tabindex="isStatic ? 0 : undefined"
				:role="isStatic ? 'region' : undefined"
				:aria-label="isStatic ? alt : undefined"
			>
				<img
					ref="webImg"
					:src="webSrc"
					:alt="alt"
					:loading="isStatic ? 'lazy' : undefined"
					:fetchpriority="isStatic ? undefined : 'high'"
					decoding="async"
					@load="iniciar('web')"
				>
			</div>
		</div>

		<!-- Teléfono: solo o superpuesto abajo a la derecha del navegador -->
		<div v-if="mobileSrc" class="ds-phone">
			<div ref="mobileScreen" class="ds-phone-screen">
				<img
					ref="mobileImg"
					:src="mobileSrc"
					:alt="`${alt} en el teléfono`"
					:loading="isStatic ? 'lazy' : undefined"
					decoding="async"
					@load="iniciar('mobile')"
				>
			</div>
		</div>
	</div>
</template>

<script setup>
/*
 * Marco de dispositivo para las capturas de un proyecto.
 *
 * - Hero: navegador, teléfono, o navegador con teléfono superpuesto, según las
 *   capturas que traiga `showcase` (ver heroDevices). Las capturas son de página
 *   completa y se recorren solas de arriba abajo y de vuelta, con pausa en cada
 *   extremo; el hover las detiene.
 * - `static`: la galería reusa el mismo marco sin auto-scroll; si la captura es más
 *   alta que el marco, se puede recorrer con la rueda.
 *
 * El auto-scroll usa la Web Animations API y arranca solo en el cliente, tras el
 * `load` de la imagen (hace falta su alto renderizado). En SSR el marco sale con la
 * imagen arriba y sin transform, así que no hay desajuste de hidratación. Con
 * prefers-reduced-motion no se anima nada.
 *
 * Los colores salen de --brand / --brand-dark, heredadas de la página.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { heroDevices, scrollDuration } from '@/data/projects.js'

const props = defineProps({
	showcase: { type: Object, default: () => ({}) },
	fallback: { type: String, default: '' },
	url: { type: String, default: '' },
	name: { type: String, default: '' },
	static: { type: Boolean, default: false },
})

const PAUSA_S = 1.5

const isStatic = computed(() => props.static)
const devices = computed(() => heroDevices({ showcase: props.showcase }))
const usaFallback = computed(() => devices.value.length === 0)

const webSrc = computed(() => props.showcase?.web || (usaFallback.value ? props.fallback : ''))
const mobileSrc = computed(() => props.showcase?.mobile || '')

const layout = computed(() => {
	if (webSrc.value && mobileSrc.value) return 'combo'
	if (mobileSrc.value) return 'phone'
	return 'browser'
})

const alt = computed(() => (props.name ? `Captura de ${props.name}` : 'Captura del proyecto'))

const domain = computed(() => {
	if (!props.url) return props.name
	try {
		return new URL(props.url).hostname.replace(/^www\./, '')
	} catch {
		return props.url
	}
})

const webScreen = ref(null)
const webImg = ref(null)
const mobileScreen = ref(null)
const mobileImg = ref(null)

const animaciones = { web: null, mobile: null }
let montado = false
let pausado = false
let observador = null
let consultaMovimiento = null
let esperaResize = null
let esperaToque = null

const animable = () =>
	montado
	&& !isStatic.value
	&& !usaFallback.value
	&& !(consultaMovimiento?.matches)

function detener(cual) {
	animaciones[cual]?.cancel()
	animaciones[cual] = null
}

function iniciar(cual) {
	detener(cual)
	if (!animable()) return

	const marco = cual === 'web' ? webScreen.value : mobileScreen.value
	const img = cual === 'web' ? webImg.value : mobileImg.value
	if (!marco || !img || !img.complete || !img.naturalHeight) return

	const alto = img.getBoundingClientRect().height
	const altoMarco = marco.clientHeight
	const d = scrollDuration(alto, altoMarco)
	if (!d) return

	const distancia = -(alto - altoMarco)
	const total = 2 * PAUSA_S + 2 * d
	const fin = `translateY(${distancia}px)`

	animaciones[cual] = img.animate(
		[
			{ transform: 'translateY(0)', offset: 0 },
			{ transform: 'translateY(0)', offset: PAUSA_S / total, easing: 'ease-in-out' },
			{ transform: fin, offset: (PAUSA_S + d) / total },
			{ transform: fin, offset: (2 * PAUSA_S + d) / total, easing: 'ease-in-out' },
			{ transform: 'translateY(0)', offset: 1 },
		],
		{ duration: total * 1000, iterations: Infinity },
	)
	if (pausado) animaciones[cual].pause()
}

function reiniciarTodo() {
	iniciar('web')
	iniciar('mobile')
}

function pausar() {
	pausado = true
	Object.values(animaciones).forEach((a) => a?.pause())
}

function reanudar() {
	clearTimeout(esperaToque)
	pausado = false
	Object.values(animaciones).forEach((a) => a?.play())
}

// Touch: pausa al tocar y retoma a los pocos segundos (o al siguiente toque).
function tocar() {
	clearTimeout(esperaToque)
	pausar()
	esperaToque = setTimeout(reanudar, 4000)
}

onMounted(() => {
	montado = true
	if (isStatic.value) return

	consultaMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)')
	consultaMovimiento.addEventListener?.('change', reiniciarTodo)

	// La imagen puede haber cargado antes de hidratar: su @load ya pasó.
	reiniciarTodo()

	// El alto renderizado cambia con el ancho: recalcular el recorrido.
	if ('ResizeObserver' in window) {
		observador = new ResizeObserver(() => {
			clearTimeout(esperaResize)
			esperaResize = setTimeout(reiniciarTodo, 200)
		})
		if (webScreen.value) observador.observe(webScreen.value)
		if (mobileScreen.value) observador.observe(mobileScreen.value)
	}
})

// Si el mismo componente recibe otras capturas, se parte de cero (el @load relanza).
watch(() => [webSrc.value, mobileSrc.value], () => {
	detener('web')
	detener('mobile')
})

onBeforeUnmount(() => {
	montado = false
	detener('web')
	detener('mobile')
	clearTimeout(esperaResize)
	clearTimeout(esperaToque)
	observador?.disconnect()
	consultaMovimiento?.removeEventListener?.('change', reiniciarTodo)
})
</script>

<style scoped>
.device-showcase {
	position: relative;
	width: 100%;
}

/* Brillo de marca detrás del dispositivo */
.device-showcase::before {
	content: "";
	position: absolute;
	inset: -6%;
	background: radial-gradient(circle at 60% 50%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 62%);
	filter: blur(40px);
	z-index: 0;
	pointer-events: none;
}

/* ── Navegador ───────────────────────────────────────────────────────── */
.ds-browser {
	position: relative;
	z-index: 1;
	border-radius: 14px;
	overflow: hidden;
	background: color-mix(in oklab, var(--brand-dark), black 35%);
	border: 1px solid color-mix(in oklab, var(--brand) 22%, rgba(255, 255, 255, 0.08));
	box-shadow:
		0 30px 60px rgba(0, 0, 0, 0.45),
		0 0 0 1px rgba(0, 0, 0, 0.2);
}

.is-combo .ds-browser {
	width: 88%;
}

.ds-bar {
	display: flex;
	align-items: center;
	gap: 14px;
	padding: 10px 14px;
	background: color-mix(in oklab, var(--brand-dark), white 9%);
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.ds-dots {
	display: inline-flex;
	gap: 6px;
	flex-shrink: 0;
}

.ds-dots i {
	display: block;
	width: 9px;
	height: 9px;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.22);
}

.ds-dots i:first-child {
	background: var(--brand);
}

.ds-url {
	flex: 1;
	min-width: 0;
	max-width: 320px;
	margin: 0 auto;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 7px;
	padding: 4px 12px;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.07);
	color: rgba(255, 255, 255, 0.62);
	font-family: var(--font-sans);
	font-size: 11px;
	letter-spacing: 0.02em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.ds-url .fa {
	font-size: 9px;
	opacity: 0.7;
}

.ds-screen {
	position: relative;
	aspect-ratio: 16 / 10;
	overflow: hidden;
	background: var(--brand-dark);
}

.ds-screen img,
.ds-phone-screen img {
	display: block;
	width: 100%;
	height: auto;
	will-change: transform;
}

/* Fallback (sin showcase): imagen fija recortada arriba */
.is-browser:not(.is-static) .ds-screen img {
	min-height: 100%;
	object-fit: cover;
	object-position: top;
}

/* ── Teléfono ────────────────────────────────────────────────────────── */
.ds-phone {
	position: relative;
	z-index: 2;
	padding: 7px;
	border-radius: 30px;
	background: color-mix(in oklab, var(--brand-dark), black 45%);
	border: 1px solid color-mix(in oklab, var(--brand) 28%, rgba(255, 255, 255, 0.1));
	box-shadow:
		0 26px 50px rgba(0, 0, 0, 0.55),
		inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.ds-phone::after {
	/* Isla de la cámara */
	content: "";
	position: absolute;
	top: 13px;
	left: 50%;
	width: 30%;
	height: 10px;
	transform: translateX(-50%);
	border-radius: 999px;
	background: #000;
	z-index: 1;
}

.ds-phone-screen {
	position: relative;
	aspect-ratio: 9 / 19.5;
	border-radius: 23px;
	overflow: hidden;
	background: var(--brand-dark);
}

/* Navegador + teléfono: el teléfono monta la esquina inferior derecha */
.is-combo {
	padding-bottom: 9%;
}

.is-combo .ds-phone {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 25%;
}

/* Solo teléfono: centrado */
.is-phone .ds-phone {
	width: min(44%, 300px);
	margin: 0 auto;
}

/* ── Galería (estático) ──────────────────────────────────────────────── */
.is-static .ds-screen {
	aspect-ratio: auto;
	max-height: min(72vh, 640px);
	overflow-y: auto;
	scrollbar-width: thin;
	scrollbar-color: color-mix(in oklab, var(--brand) 50%, transparent) transparent;
}

.is-static .ds-screen img {
	will-change: auto;
}

@media (max-width: 640px) {
	.ds-bar {
		padding: 8px 10px;
		gap: 10px;
	}

	.ds-dots i {
		width: 7px;
		height: 7px;
	}

	.ds-url {
		font-size: 10px;
	}

	.ds-phone {
		padding: 4px;
		border-radius: 18px;
	}

	.ds-phone::after {
		top: 8px;
		height: 6px;
	}

	.ds-phone-screen {
		border-radius: 14px;
	}
}
</style>
