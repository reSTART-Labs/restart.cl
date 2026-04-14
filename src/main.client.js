import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router.js'
import './style.css'

const router = createRouter()
const app = createSSRApp(App)
app.use(router)

router.isReady().then(() => {
	app.mount('#app')
})
