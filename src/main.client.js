import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router.js'
import { installClickTracking, pushEvent } from './composables/useTracking.js'
import { installLoader } from './composables/useLoader.js'
import { installScrollReveal } from './composables/useScrollReveal.js'
import './style.css'

const router = createRouter()
const app = createSSRApp(App)
app.use(router)

// Antes de isReady: así el afterEach de la navegación inicial ya está registrado
// y useLoader puede distinguir carga dura de navegación SPA.
installLoader(router)

router.isReady().then(() => {
	app.mount('#app')
	installClickTracking()
	installScrollReveal(router)
})

router.afterEach((to) => {
	pushEvent('virtual_page_view', {
		page: to.fullPath,
		page_name: to.name || null,
	})
})
