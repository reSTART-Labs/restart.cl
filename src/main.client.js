import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router.js'
import { installClickTracking, pushEvent } from './composables/useTracking.js'
import './style.css'

const router = createRouter()
const app = createSSRApp(App)
app.use(router)

router.isReady().then(() => {
	app.mount('#app')
	installClickTracking()
})

router.afterEach((to) => {
	pushEvent('virtual_page_view', {
		page: to.fullPath,
		page_name: to.name || null,
	})
})
