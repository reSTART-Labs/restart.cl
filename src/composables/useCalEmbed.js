import { ref, onMounted, watch } from 'vue'

export function useCalEmbed(containerRef, options = {}) {
	const {
		calLink = 'restart/asesoria-gratuita',
		layout = 'month_view',
		brandColor = '#000000',
	} = options

	const loaded = ref(false)

	function loadScript() {
		return new Promise((resolve, reject) => {
			if (window.Cal) {
				resolve()
				return
			}

			const script = document.createElement('script')
			script.src = 'https://app.cal.com/embed/embed.js'
			script.async = true
			script.onload = resolve
			script.onerror = reject
			document.head.appendChild(script)
		})
	}

	function initCal(el) {
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
	}

	onMounted(async () => {
		const el = containerRef.value
		if (!el) return

		await loadScript()

		if (window.Cal) {
			initCal(el)
		} else {
			const stop = watch(() => window.Cal, (val) => {
				if (val) {
					initCal(el)
					stop()
				}
			})
		}
	})

	return { loaded }
}
