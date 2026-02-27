<template>
	<header class="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
		<nav
			class="flex items-center gap-8 px-8 py-3 rounded-full backdrop-blur-md transition-all duration-300"
			:class="scrolled ? 'bg-white/90 shadow-lg' : 'bg-white/10'"
		>
			<RouterLink
				to="/"
				class="text-lg font-semibold tracking-wide no-underline transition-colors duration-200"
				:class="scrolled ? 'text-dark' : 'text-white'"
			>
				Re/START
			</RouterLink>

			<ul class="hidden md:flex items-center gap-6 list-none m-0 p-0">
				<li>
					<RouterLink
						to="/nosotros"
						class="text-sm font-medium no-underline transition-colors duration-200"
						:class="scrolled ? 'text-text hover:text-dark' : 'text-white/80 hover:text-white'"
					>
						Nosotros
					</RouterLink>
				</li>
				<li class="relative" @mouseenter="servicesOpen = true" @mouseleave="servicesOpen = false">
					<button
						class="text-sm font-medium transition-colors duration-200 flex items-center gap-1 cursor-pointer"
						:class="scrolled ? 'text-text hover:text-dark' : 'text-white/80 hover:text-white'"
					>
						Servicios
						<i class="fa fa-angle-down text-xs"></i>
					</button>
					<div
						v-show="servicesOpen"
						class="absolute top-full left-1/2 -translate-x-1/2 pt-2"
					>
						<ul class="bg-white rounded-xl shadow-xl py-2 min-w-[220px] list-none m-0 p-0">
							<li v-for="service in services" :key="service.slug">
								<RouterLink
									:to="`/servicios/${service.slug}`"
									class="block px-4 py-2 text-sm text-text hover:bg-features-bg hover:text-dark no-underline transition-colors"
									@click="servicesOpen = false"
								>
									<i :class="[service.icon, 'mr-2 text-primary']"></i>
									{{ service.title }}
								</RouterLink>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<RouterLink
						to="/#contact"
						class="text-sm font-medium no-underline transition-colors duration-200"
						:class="scrolled ? 'text-text hover:text-dark' : 'text-white/80 hover:text-white'"
					>
						Contacto
					</RouterLink>
				</li>
			</ul>

			<RouterLink
				to="/#contact"
				class="hidden md:inline-block text-xs font-bold uppercase tracking-wide px-5 py-2 rounded-full border transition-all duration-200 no-underline"
				:class="scrolled
					? 'border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white'
					: 'border-white text-white hover:bg-white hover:text-primary-ocean'"
			>
				Contáctanos
			</RouterLink>

			<button
				class="md:hidden transition-colors duration-200"
				:class="scrolled ? 'text-dark' : 'text-white'"
				@click="mobileOpen = !mobileOpen"
			>
				<i class="fa fa-bars text-lg"></i>
			</button>
		</nav>

		<div
			v-if="mobileOpen"
			class="absolute top-full mt-2 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 md:hidden"
		>
			<ul class="list-none m-0 p-0 flex flex-col gap-4">
				<li>
					<RouterLink
						to="/nosotros"
						class="text-sm font-medium text-text hover:text-dark no-underline"
						@click="mobileOpen = false"
					>
						Nosotros
					</RouterLink>
				</li>
				<li>
					<span class="text-sm font-medium text-text-muted uppercase tracking-wide text-xs">Servicios</span>
					<ul class="list-none m-0 p-0 mt-2 flex flex-col gap-2 pl-3">
						<li v-for="service in services" :key="service.slug">
							<RouterLink
								:to="`/servicios/${service.slug}`"
								class="text-sm text-text hover:text-dark no-underline flex items-center gap-2"
								@click="mobileOpen = false"
							>
								<i :class="[service.icon, 'text-primary']"></i>
								{{ service.title }}
							</RouterLink>
						</li>
					</ul>
				</li>
				<li>
					<RouterLink
						to="/#contact"
						class="inline-block text-xs font-bold uppercase tracking-wide px-5 py-2 rounded-full border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white transition-all duration-200 no-underline"
						@click="mobileOpen = false"
					>
						Contáctanos
					</RouterLink>
				</li>
			</ul>
		</div>
	</header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { services } from '@/data/services.js'

const scrolled = ref(false)
const mobileOpen = ref(false)
const servicesOpen = ref(false)

function onScroll() {
	scrolled.value = window.scrollY > 50
}

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true })
	onScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
})
</script>
