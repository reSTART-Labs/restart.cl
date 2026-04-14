import { ref, onMounted } from 'vue'

export function useCalEmbed(containerRef, options = {}) {
	const {
		calLink = 'restart/asesoria-gratuita',
		layout = 'month_view',
		brandColor = '#000000',
	} = options

	const loaded = ref(false)

	function ensureCal() {
		;(function (C, A, L) {
			let p = function (a, ar) { a.q.push(ar) }
			let d = C.document
			C.Cal = C.Cal || function () {
				let cal = C.Cal
				let ar = arguments
				if (!cal.loaded) {
					cal.ns = {}
					cal.q = cal.q || []
					d.head.appendChild(d.createElement('script')).src = A
					cal.loaded = true
				}
				if (ar[0] === L) {
					const api = function () { p(api, arguments) }
					const namespace = ar[1]
					api.q = api.q || []
					typeof namespace === 'string'
						? (cal.ns[namespace] = api) && p(api, ar)
						: p(cal, ar)
					return
				}
				p(cal, ar)
			}
		})(window, 'https://app.cal.com/embed/embed.js', 'init')
	}

	onMounted(() => {
		const el = containerRef.value
		if (!el) return

		ensureCal()

		window.Cal('init', { origin: 'https://cal.com' })

		window.Cal('inline', {
			elementOrSelector: el,
			calLink,
			layout,
		})

		window.Cal('ui', {
			styles: { branding: { brandColor } },
			hideEventTypeDetails: false,
			layout,
		})

		loaded.value = true
	})

	return { loaded }
}
