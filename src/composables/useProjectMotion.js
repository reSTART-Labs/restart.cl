import { onMounted, onUnmounted } from 'vue'

/*
 * Animación de entrada para las páginas de proyecto de Labs.
 *
 * Replica el vocabulario de suma.cl: títulos que suben partidos por palabras con
 * stagger, wipes que descubren imágenes, y grillas que entran escalonadas — todo con
 * GSAP + ScrollTrigger y curvas power2.out, que es lo que usa la referencia.
 *
 * GSAP entra por import() dinámico dentro de onMounted, así que su chunk no toca el
 * bundle principal, no se descarga en ninguna otra ruta y no corre en el SSR.
 *
 * Dos reglas heredadas del loader que hubo que apagar:
 *  1. Todo se anima con gsap.from(), que fija el estado inicial en tiempo de
 *     ejecución. Si el chunk nunca carga, el contenido queda visible — nunca
 *     invisible esperando JS.
 *  2. prefers-reduced-motion corta ANTES del import, así quien no quiere movimiento
 *     tampoco paga la descarga.
 */

const isBrowser = typeof window !== 'undefined'

function prefiereMenosMovimiento() {
	return isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/*
 * Parte un elemento en palabras envueltas en spans, respetando los elementos inline
 * que traiga dentro. Los títulos del sitio usan <em> para el acento en color primario
 * (ver style.css), así que partir por textContent los destruiría.
 *
 * Con mascara: true cada palabra queda dentro de un contenedor con overflow hidden
 * para que el movimiento se lea como que aparece desde detrás de una línea. El padding
 * compensa los descendentes (g, y, p), que si no quedan cortados.
 */
function partirEnPalabras(elemento, { mascara = false } = {}) {
	const palabras = []

	const recorrer = (nodo) => {
		const hijos = [...nodo.childNodes]

		hijos.forEach((hijo) => {
			if (hijo.nodeType === Node.TEXT_NODE) {
				const partes = hijo.textContent.split(/(\s+)/)
				if (!partes.some((p) => p.trim())) return

				const fragmento = document.createDocumentFragment()

				partes.forEach((parte) => {
					if (!parte) return
					if (!parte.trim()) {
						fragmento.appendChild(document.createTextNode(parte))
						return
					}

					const contenedor = document.createElement('span')
					contenedor.className = 'pm-word'
					if (mascara) contenedor.classList.add('pm-word-mask')

					const interior = document.createElement('span')
					interior.className = 'pm-word-inner'
					interior.textContent = parte

					contenedor.appendChild(interior)
					fragmento.appendChild(contenedor)
					palabras.push(mascara ? interior : contenedor)
				})

				nodo.replaceChild(fragmento, hijo)
				return
			}

			if (hijo.nodeType === Node.ELEMENT_NODE) recorrer(hijo)
		})
	}

	recorrer(elemento)
	return palabras
}

/* Cuenta el número que trae el stat conservando lo que no es número: '100M+' cuenta
   hasta 100 y vuelve a poner 'M+'; '24/7' cuenta hasta 24 y recupera '/7'. */
function animarConteo(gsap, elemento) {
	const original = elemento.textContent.trim()
	const match = original.match(/^([\d.,]+)(.*)$/)
	if (!match) return

	const destino = parseFloat(match[1].replace(/\./g, '').replace(',', '.'))
	if (!Number.isFinite(destino)) return

	const sufijo = match[2]
	const decimales = (match[1].split(',')[1] || '').length
	const contador = { valor: 0 }

	gsap.to(contador, {
		valor: destino,
		duration: 1.4,
		ease: 'power2.out',
		scrollTrigger: { trigger: elemento, start: 'top 88%' },
		onUpdate: () => {
			const n = contador.valor.toLocaleString('es-CL', {
				minimumFractionDigits: decimales,
				maximumFractionDigits: decimales,
			})
			elemento.textContent = n + sufijo
		},
		onComplete: () => { elemento.textContent = original },
	})
}

export function useProjectMotion(raizRef) {
	let contexto = null

	onMounted(async () => {
		if (!isBrowser || prefiereMenosMovimiento()) return

		const raiz = raizRef?.value
		if (!raiz) return

		let gsap, ScrollTrigger
		try {
			;[{ gsap }, { ScrollTrigger }] = await Promise.all([
				import('gsap'),
				import('gsap/ScrollTrigger'),
			])
		} catch (e) {
			// Sin GSAP la página se ve igual, solo sin animación. No hay nada que revertir.
			return
		}

		gsap.registerPlugin(ScrollTrigger)

		/* gsap.context acota todo lo creado acá dentro y permite matarlo de una sola
		   vez al desmontar. Sin esto los ScrollTrigger se acumulan al navegar entre
		   proyectos, porque el sitio es SPA. */
		contexto = gsap.context((self) => {
			const q = (sel) => self.selector(sel)
			const alEntrar = (trigger, extra = {}) => ({
				trigger,
				start: 'top 85%',
				once: true,
				...extra,
			})

			// ── Hero: el título sube por palabras desde detrás de una máscara
			const titulo = q('.lab-hero-title')[0]
			const linea = gsap.timeline({ defaults: { ease: 'power2.out' } })
			let tituloAnimado = false

			if (titulo) {
				const palabras = partirEnPalabras(titulo, { mascara: true })

				if (palabras.length) {
					linea.from(palabras, {
						yPercent: 115,
						duration: 0.9,
						stagger: 0.045,
					})
					tituloAnimado = true
				} else if (titulo.querySelector('img')) {
					/* Los proyectos con logo no tienen texto que partir: el h1 es solo la
					   imagen, así que se anima el elemento completo. */
					linea.from(titulo, { y: 30, opacity: 0, duration: 0.9 })
					tituloAnimado = true
				}
			}

			const restoHero = [
				'.lab-hero-tagline',
				'.lab-hero-desc',
				'.lab-hero-ctas',
				'.lab-hero-platforms',
			].flatMap((sel) => q(sel))

			if (restoHero.length) {
				linea.from(restoHero, {
					y: 26,
					opacity: 0,
					duration: 0.7,
					stagger: 0.09,
				}, tituloAnimado ? '-=0.55' : 0)
			}

			// La captura del hero se descubre con un wipe de abajo hacia arriba
			const shot = q('.lab-hero-shot')[0]
			if (shot) {
				linea.from(shot, {
					clipPath: 'inset(0% 0% 100% 0%)',
					duration: 1.1,
					ease: 'power2.inOut',
				}, 0.15)
			}

			// ── Títulos de sección: palabras que suben al entrar en viewport
			q('.lab-section-title, .lab-section-title-inverse, .lab-tech-title').forEach((t) => {
				const palabras = partirEnPalabras(t)
				if (!palabras.length) return
				gsap.from(palabras, {
					y: 28,
					opacity: 0,
					duration: 0.7,
					ease: 'power2.out',
					stagger: 0.03,
					scrollTrigger: alEntrar(t),
				})
			})

			// ── Stats: entran escalonados y los números cuentan
			const stats = q('.lab-stat')
			if (stats.length) {
				gsap.from(stats, {
					y: 30,
					opacity: 0,
					duration: 0.7,
					ease: 'power2.out',
					stagger: 0.08,
					scrollTrigger: alEntrar(stats[0].parentElement || stats[0]),
				})
				q('.lab-stat-value').forEach((v) => animarConteo(gsap, v))
			}

			// ── Problema / solución
			q('.lab-ps-col').forEach((col, i) => {
				gsap.from(col, {
					y: 34,
					opacity: 0,
					duration: 0.8,
					ease: 'power2.out',
					delay: i * 0.12,
					scrollTrigger: alEntrar(col),
				})
			})

			// ── Grillas escalonadas: features, chips del stack, destacados, clientes
			const grillas = [
				{ items: '.lf-card', y: 40, stagger: 0.07 },
				{ items: '.tech-chip', y: 16, stagger: 0.025 },
				{ items: '.lab-highlight-item', y: 22, stagger: 0.07 },
				{ items: '.lab-client-card', y: 36, stagger: 0.1 },
			]

			grillas.forEach(({ items, y, stagger }) => {
				const nodos = q(items)
				if (!nodos.length) return
				gsap.from(nodos, {
					y,
					opacity: 0,
					duration: 0.7,
					ease: 'power2.out',
					stagger,
					scrollTrigger: alEntrar(nodos[0].parentElement || nodos[0]),
				})
			})

			// ── Galería: wipe que descubre la captura
			const marco = q('.lab-shots-frame')[0]
			if (marco) {
				gsap.from(marco, {
					clipPath: 'inset(0% 0% 100% 0%)',
					duration: 1.1,
					ease: 'power2.inOut',
					scrollTrigger: alEntrar(marco, { start: 'top 80%' }),
				})
			}
		}, raiz)
	})

	onUnmounted(() => {
		contexto?.revert()
		contexto = null
	})
}
