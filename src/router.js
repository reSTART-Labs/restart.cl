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
		path: '/servicios',
		name: 'services',
		component: () => import('./pages/ServicesPage.vue'),
	},
	{
		path: '/startup',
		name: 'startup',
		component: () => import('./pages/StartupPage.vue'),
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
	{
		path: '/soluciones/:slug',
		name: 'solution',
		component: () => import('./pages/SolutionPage.vue'),
	},
	{
		path: '/labs',
		name: 'labs',
		component: () => import('./pages/LabsPage.vue'),
	},
	{
		path: '/labs/:slug',
		name: 'labs-project',
		component: () => import('./pages/LabsProjectPage.vue'),
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
