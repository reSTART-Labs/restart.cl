<template>
	<header class="fixed top-0 left-0 right-0 z-50 px-4 pt-4 flex justify-center">
		<nav
			class="w-full max-w-5xl flex items-center justify-between px-5 md:px-6 h-14 rounded-full transition-all duration-300"
			:class="scrolled
				? 'bg-white/95 backdrop-blur-md shadow-lg'
				: 'bg-white/10 backdrop-blur-sm'"
		>
			<!-- Logo -->
			<RouterLink
				to="/"
				class="text-base font-semibold tracking-wide no-underline transition-colors duration-200 shrink-0"
				:class="scrolled ? 'text-dark' : 'text-white'"
			>
				re/START
			</RouterLink>

			<!-- Desktop links -->
			<ul class="hidden lg:flex items-center gap-6 list-none m-0 p-0">
				<li>
					<RouterLink
						to="/nosotros"
						class="text-[13px] font-medium no-underline transition-colors duration-200"
						:class="scrolled ? 'text-text hover:text-primary' : 'text-white/80 hover:text-white'"
					>
						Nosotros
					</RouterLink>
				</li>
				<li class="relative" @mouseenter="servicesOpen = true" @mouseleave="servicesOpen = false">
					<button
						class="text-[13px] font-medium transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
						:class="scrolled ? 'text-text hover:text-primary' : 'text-white/80 hover:text-white'"
					>
						Servicios
						<i class="fa fa-angle-down text-[10px] transition-transform duration-200" :class="servicesOpen ? 'rotate-180' : ''"></i>
					</button>
					<transition
						enter-active-class="transition duration-200 ease-out"
						enter-from-class="opacity-0 -translate-y-2"
						enter-to-class="opacity-100 translate-y-0"
						leave-active-class="transition duration-150 ease-in"
						leave-from-class="opacity-100 translate-y-0"
						leave-to-class="opacity-0 -translate-y-2"
					>
						<div v-show="servicesOpen" class="absolute top-full left-1/2 -translate-x-1/2 pt-4">
							<ul class="bg-white rounded-2xl shadow-2xl py-3 min-w-[240px] list-none m-0 p-0 border border-border/50">
								<li v-for="service in services" :key="service.slug">
									<RouterLink
										:to="`/servicios/${service.slug}`"
										class="flex items-center gap-3 px-5 py-3 text-sm text-text hover:bg-features-bg hover:text-primary no-underline transition-colors"
										@click="servicesOpen = false"
									>
										<i :class="[service.icon, 'text-primary text-lg w-5 text-center']"></i>
										{{ service.title }}
									</RouterLink>
								</li>
							</ul>
						</div>
					</transition>
				</li>
				<li>
					<RouterLink
						to="/#contact"
						class="text-[13px] font-medium no-underline transition-colors duration-200"
						:class="scrolled ? 'text-text hover:text-primary' : 'text-white/80 hover:text-white'"
					>
						Contacto
					</RouterLink>
				</li>
			</ul>

			<!-- Desktop CTA -->
			<RouterLink
				to="/#contact"
				class="hidden lg:inline-block text-xs font-bold uppercase tracking-wide px-5 py-2 rounded-full no-underline transition-all duration-200"
				:class="scrolled
					? 'bg-primary text-white hover:bg-primary-dark'
					: 'bg-white/15 text-white hover:bg-white/25'"
			>
				Conversemos
			</RouterLink>

			<!-- Mobile hamburger -->
			<button
				class="lg:hidden w-9 h-9 flex items-center justify-center transition-colors duration-200"
				:class="scrolled ? 'text-dark' : 'text-white'"
				@click="mobileOpen = true"
			>
				<i class="fa fa-bars text-lg"></i>
			</button>
		</nav>

		<!-- Mobile overlay (teleported to body to avoid stacking context issues) -->
		<Teleport to="body" :disabled="!isMounted">
			<transition
				enter-active-class="transition duration-300 ease-out"
				enter-from-class="translate-x-full"
				enter-to-class="translate-x-0"
				leave-active-class="transition duration-200 ease-in"
				leave-from-class="translate-x-0"
				leave-to-class="translate-x-full"
			>
				<div
					v-if="mobileOpen"
					class="fixed inset-0 z-[100] bg-dark flex flex-col"
				>
				<!-- Mobile header -->
				<div class="relative z-10 flex items-center justify-between px-6 h-16 shrink-0">
					<RouterLink
						to="/"
						class="text-base font-semibold tracking-wide text-white no-underline"
						@click="mobileOpen = false"
					>
						re/START
					</RouterLink>
					<button
						class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
						@click="mobileOpen = false"
					>
						<i class="fa fa-times text-sm"></i>
					</button>
				</div>

				<!-- Mobile links -->
				<nav class="flex-1 flex flex-col justify-center px-8 -mt-10">
					<ul class="list-none m-0 p-0 flex flex-col gap-0">
						<li class="border-b border-white/8">
							<RouterLink
								to="/"
								class="flex items-center justify-between py-5 text-xl font-light text-white/90 hover:text-primary no-underline transition-colors"
								@click="mobileOpen = false"
							>
								Inicio
								<i class="fa fa-arrow-right text-xs text-white/20"></i>
							</RouterLink>
						</li>
						<li class="border-b border-white/8">
							<RouterLink
								to="/nosotros"
								class="flex items-center justify-between py-5 text-xl font-light text-white/90 hover:text-primary no-underline transition-colors"
								@click="mobileOpen = false"
							>
								Nosotros
								<i class="fa fa-arrow-right text-xs text-white/20"></i>
							</RouterLink>
						</li>
						<li class="border-b border-white/8">
							<button
								class="flex items-center justify-between w-full py-5 text-xl font-light text-white/90 hover:text-primary transition-colors cursor-pointer"
								@click="mobileServicesOpen = !mobileServicesOpen"
							>
								Servicios
								<i
									class="fa fa-angle-down text-sm text-white/40 transition-transform duration-200"
									:class="mobileServicesOpen ? 'rotate-180' : ''"
								></i>
							</button>
							<transition
								enter-active-class="transition-all duration-200 ease-out"
								enter-from-class="max-h-0 opacity-0"
								enter-to-class="max-h-[300px] opacity-100"
								leave-active-class="transition-all duration-150 ease-in"
								leave-from-class="max-h-[300px] opacity-100"
								leave-to-class="max-h-0 opacity-0"
							>
								<ul v-show="mobileServicesOpen" class="list-none m-0 p-0 overflow-hidden pb-3">
									<li v-for="service in services" :key="service.slug">
										<RouterLink
											:to="`/servicios/${service.slug}`"
											class="flex items-center gap-3 py-3 pl-4 text-base text-white/50 hover:text-primary no-underline transition-colors"
											@click="mobileOpen = false"
										>
											<i :class="[service.icon, 'text-primary/60 w-5 text-center text-sm']"></i>
											{{ service.title }}
										</RouterLink>
									</li>
								</ul>
							</transition>
						</li>
						<li>
							<RouterLink
								to="/#contact"
								class="flex items-center justify-between py-5 text-xl font-light text-white/90 hover:text-primary no-underline transition-colors"
								@click="mobileOpen = false"
							>
								Contacto
								<i class="fa fa-arrow-right text-xs text-white/20"></i>
							</RouterLink>
						</li>
					</ul>

					<RouterLink
						to="/#contact"
						class="mt-10 text-center text-sm font-bold uppercase tracking-wide bg-primary text-white px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark"
						@click="mobileOpen = false"
					>
						Conversemos
					</RouterLink>
				</nav>
			</div>
			</transition>
		</Teleport>
	</header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { services } from '@/data/services.js'

const scrolled = ref(false)
const mobileOpen = ref(false)
const servicesOpen = ref(false)
const mobileServicesOpen = ref(false)
const isMounted = ref(false)

function onScroll() {
	scrolled.value = window.scrollY > 50
}

onMounted(() => {
	isMounted.value = true
	window.addEventListener('scroll', onScroll, { passive: true })
	onScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
})
</script>
