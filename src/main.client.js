import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router.js'
import './style.css'

const router = createRouter()
createApp(App).use(router).mount('#app')
