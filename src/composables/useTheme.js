import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'restart-theme'
const theme = ref('light')

function applyTheme(next) {
	theme.value = next
	if (typeof document === 'undefined') return
	document.documentElement.setAttribute('data-theme', next)
	try { localStorage.setItem(STORAGE_KEY, next) } catch (e) {}
}

export function useTheme() {
	onMounted(() => {
		const current = document.documentElement.getAttribute('data-theme')
		if (current === 'dark' || current === 'light') {
			theme.value = current
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
			applyTheme(prefersDark ? 'dark' : 'light')
		}
	})

	function toggle() {
		applyTheme(theme.value === 'dark' ? 'light' : 'dark')
	}

	return { theme, toggle, setTheme: applyTheme }
}
