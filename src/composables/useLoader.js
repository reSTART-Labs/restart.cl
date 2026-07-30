import { ref, readonly } from 'vue'

/*
 * Secuencia de entrada: esfera cargando → cortina abriéndose → header.
 *
 * El estado es de ámbito de módulo (mismo patrón que useTheme) porque el overlay
 * vive fuera del RouterView, el nav necesita saber si es carga dura o navegación
 * SPA, y las páginas necesitan saber cuándo animar su header. Solo se muta desde
 * el navegador, así que el SSR siempre renderiza la fase inicial.
 *
 * Los tiempos salen de los tokens CSS de style.css: esa es la única fuente de
 * verdad y permite recomprimir toda la secuencia sin tocar este archivo.
 */

const PHASE_LOADING = 'loading'
const PHASE_OPENING = 'opening'
const PHASE_DONE = 'done'

const isBrowser = typeof window !== 'undefined'

const phase = ref(PHASE_LOADING)
const curtainOpen = ref(false)
const hasSphere = ref(true)
const isHardLoad = ref(true)

let started = false
let finishTimer = null

function readMs(name, fallback) {
	if (!isBrowser) return fallback
	const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
	if (!raw) return fallback
	const value = parseFloat(raw)
	if (Number.isNaN(value)) return fallback
	return raw.endsWith('ms') ? value : value * 1000
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function prefersReducedMotion() {
	return isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function fontsReady() {
	if (!isBrowser || !document.fonts) return Promise.resolve()
	return document.fonts.ready.catch(() => {})
}

/* Espera los assets que el header necesita para no abrir la cortina sobre un
   hero a medio pintar. Un error de carga resuelve igual: el loader no es un
   lugar donde valga la pena quedarse esperando. */
function criticalAssets() {
	if (!isBrowser) return Promise.resolve()

	const waits = []

	document.querySelectorAll('img[data-critical]').forEach((img) => {
		if (img.complete) return
		waits.push(new Promise((resolve) => {
			img.addEventListener('load', resolve, { once: true })
			img.addEventListener('error', resolve, { once: true })
		}))
	})

	/* Fondos declarados en CSS (el hero del home) no son elementos img, así que se
	   esperan con un Image() apuntando a la misma URL: pega en la misma caché. */
	document.querySelectorAll('[data-critical-src]').forEach((el) => {
		const src = el.getAttribute('data-critical-src')
		if (!src) return
		waits.push(new Promise((resolve) => {
			const probe = new Image()
			probe.addEventListener('load', resolve, { once: true })
			probe.addEventListener('error', resolve, { once: true })
			probe.src = src
		}))
	})

	return Promise.all(waits)
}

/* Reinicia las animaciones de entrada del header. El reflow entre remove y add
   es lo que fuerza el restart en cada navegación. */
function triggerHeroReveal() {
	if (!isBrowser) return
	const root = document.documentElement
	root.classList.remove('hero-reveal')
	void root.offsetWidth
	root.classList.add('hero-reveal')
}

function curtainTotalMs() {
	return readMs('--curtain-duration', 700) + 4 * readMs('--curtain-stagger', 150)
}

function scheduleFinish() {
	if (finishTimer) clearTimeout(finishTimer)
	finishTimer = setTimeout(() => {
		phase.value = PHASE_DONE
		curtainOpen.value = false
		finishTimer = null
	}, curtainTotalMs() + 50)
}

/* is-loading se libera acá y no al empezar el fade de la esfera: si se soltara
   antes, el header quedaría 300 ms sin regla que lo oculte y su animación
   arrancaría desde un estado ya visible (tapado por la cortina, pero sucio). */
function openCurtain() {
	document.documentElement.classList.remove('is-loading')
	curtainOpen.value = true
	triggerHeroReveal()
	scheduleFinish()
}

function open() {
	phase.value = PHASE_OPENING
	setTimeout(openCurtain, readMs('--sphere-fade', 300))
}

/* Llamado desde SiteLoader.onMounted: que la clase loader-js se ponga acá y no en
   un script del <head> es deliberado. Es la prueba de que Vue montó de verdad; si
   el bundle nunca corre, el fallback CSS abre la cortina y el sitio no queda tapado. */
function start() {
	if (!isBrowser || started) return
	started = true

	document.documentElement.classList.add('loader-js')

	if (prefersReducedMotion()) {
		phase.value = PHASE_DONE
		return
	}

	document.documentElement.classList.add('is-loading')

	const ready = Promise.race([
		Promise.all([fontsReady(), criticalAssets()]),
		delay(readMs('--loader-timeout', 3000)),
	])

	Promise.all([ready, delay(readMs('--loader-min', 800))]).then(open)
}

/* Cortina sin esfera: al volver al home por SPA no hay nada que cargar. */
function playCurtain() {
	if (!isBrowser) return

	if (prefersReducedMotion()) {
		triggerHeroReveal()
		return
	}

	if (finishTimer) {
		clearTimeout(finishTimer)
		finishTimer = null
	}

	hasSphere.value = false
	curtainOpen.value = false
	phase.value = PHASE_OPENING

	/* Dos frames para que las persianas alcancen a pintarse cerradas antes de abrirse. */
	requestAnimationFrame(() => requestAnimationFrame(openCurtain))
}

export function installLoader(router) {
	if (!isBrowser) return

	router.afterEach((to, from) => {
		if (!from.name) return // navegación inicial: la maneja start()
		if (to.name === from.name) return // solo cambió el hash

		isHardLoad.value = false

		if (to.name === 'home') playCurtain()
		else triggerHeroReveal()
	})
}

export function useLoader() {
	return {
		phase: readonly(phase),
		curtainOpen: readonly(curtainOpen),
		hasSphere: readonly(hasSphere),
		isHardLoad: readonly(isHardLoad),
		start,
		playCurtain,
	}
}
