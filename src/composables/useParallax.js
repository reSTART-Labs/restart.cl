import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax() {
	const scrollY = ref(0)
	let ticking = false

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				scrollY.value = window.scrollY
				ticking = false
			})
			ticking = true
		}
	}

	onMounted(() => {
		if (typeof window !== 'undefined' && window.innerWidth > 1024) {
			window.addEventListener('scroll', onScroll, { passive: true })
		}
	})

	onUnmounted(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', onScroll)
		}
	})

	return { scrollY }
}
