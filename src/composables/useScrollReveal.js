/*
 * Fade-up escalonado de los títulos de sección al entrar en viewport.
 *
 * Se instala una vez desde main.client.js, igual que installClickTracking: los
 * elementos se marcan con data-reveal en el template y no hace falta cablear nada
 * por componente. El delay opcional va en --reveal-delay.
 *
 * La clase reveal-ready se añade solo si hay IntersectionObserver, porque es la
 * que activa los estados ocultos en CSS: sin observer, nada se oculta.
 */

const isBrowser = typeof window !== 'undefined'

let observer = null

function onIntersect(entries) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return
		entry.target.classList.add('is-revealed')
		observer.unobserve(entry.target)
	})
}

function scan() {
	if (!observer) return
	document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => {
		observer.observe(el)
	})
}

export function installScrollReveal(router) {
	if (!isBrowser || !('IntersectionObserver' in window)) return

	document.documentElement.classList.add('reveal-ready')

	observer = new IntersectionObserver(onIntersect, {
		rootMargin: '0px 0px -12% 0px',
		threshold: 0.1,
	})

	scan()

	// Cada página trae su propio DOM: hay que volver a barrer tras navegar.
	if (router) router.afterEach(() => requestAnimationFrame(scan))
}
