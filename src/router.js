import {
	createRouter as _createRouter,
	createMemoryHistory,
	createWebHistory,
} from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('./pages/HomePage.vue'),
	},
	{
		path: '/nosotros',
		name: 'about',
		component: () => import('./pages/AboutPage.vue'),
	},
	{
		path: '/servicios/:slug',
		name: 'service',
		component: () => import('./pages/ServicePage.vue'),
	},
	{
		path: '/inteligencia-artificial/:slug',
		name: 'ai-solution',
		component: () => import('./pages/AiSolutionPage.vue'),
	},
]

export function createRouter() {
	return _createRouter({
		history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
		routes,
		scrollBehavior(to, from, savedPosition) {
			if (savedPosition) return savedPosition
			if (to.hash) return { el: to.hash, behavior: 'smooth' }
			return { top: 0 }
		},
	})
}
