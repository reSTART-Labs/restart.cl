<template>
	<header class="fixed top-0 left-0 right-0 z-50 px-4 pt-4 flex justify-center">
		<nav
			class="nav-pill w-full max-w-5xl flex items-center justify-between px-5 md:px-6 h-14 rounded-full transition-all duration-300 border"
			:class="scrolled
				? 'bg-surface/90 backdrop-blur-md shadow-lg border-border'
				: 'bg-white/10 backdrop-blur-sm border-white/15'"
		>
			<!-- Logo -->
			<RouterLink
				to="/"
				class="inline-flex items-center no-underline shrink-0 nav-logo"
				:class="scrolled ? 'nav-logo-solid' : 'nav-logo-transparent'"
			>
				<img src="/logo@0.5x.png" alt="re/START" class="h-[22px] w-auto block">
			</RouterLink>

			<!-- Desktop links -->
			<ul class="hidden lg:flex items-center gap-6 list-none m-0 p-0">
				<li>
					<RouterLink
						to="/nosotros"
						class="text-[13px] font-medium no-underline transition-colors duration-200"
						:class="scrolled ? 'text-text-soft hover:text-primary' : 'text-white/80 hover:text-white'"
					>
						Nosotros
					</RouterLink>
				</li>
				<li class="relative flex items-center" @mouseenter="servicesOpen = true" @mouseleave="servicesOpen = false">
					<RouterLink
						to="/servicios"
						class="text-[13px] font-medium transition-colors duration-200 inline-flex items-center gap-1.5 cursor-pointer no-underline"
						:class="scrolled ? 'text-text-soft hover:text-primary' : 'text-white/80 hover:text-white'"
					>
						Servicios
						<i class="fa fa-angle-down text-[10px] transition-transform duration-200" :class="servicesOpen ? 'rotate-180' : ''"></i>
					</RouterLink>
					<transition
						enter-active-class="transition duration-200 ease-out"
						enter-from-class="opacity-0 -translate-y-2"
						enter-to-class="opacity-100 translate-y-0"
						leave-active-class="transition duration-150 ease-in"
						leave-from-class="opacity-100 translate-y-0"
						leave-to-class="opacity-0 -translate-y-2"
					>
						<div v-show="servicesOpen" class="absolute top-full left-1/2 -translate-x-1/2 pt-4">
							<div class="bg-surface rounded-2xl shadow-2xl p-3 min-w-[440px] border border-border">
								<p class="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted px-3 pt-2 pb-3">
									Servicios &middot; cinco frentes
								</p>
								<ul class="list-none m-0 p-0 grid grid-cols-1 gap-1">
									<li v-for="service in services" :key="service.slug">
										<RouterLink
											:to="`/servicios/${service.slug}`"
											class="group flex items-start gap-4 p-3 rounded-xl text-text-soft hover:bg-features-bg no-underline transition-colors"
											@click="servicesOpen = false"
										>
											<span
												class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
												:class="service.slug === 'inteligencia-artificial' ? 'bg-accent-electric/15 text-accent-electric' : 'bg-primary-pastel text-primary'"
											>
												<i :class="[service.icon, 'text-base']"></i>
											</span>
											<div class="flex-1 min-w-0">
												<p class="text-sm font-semibold text-text leading-tight flex items-center gap-2">
													{{ service.title }}
													<span v-if="service.slug === 'inteligencia-artificial'" class="text-[9px] font-bold uppercase tracking-wider text-accent-electric bg-accent-electric/10 rounded-full px-1.5 py-0.5">Lab</span>
												</p>
												<p class="text-xs text-text-light leading-snug mt-1 font-serif italic">
													{{ service.headline }}
												</p>
											</div>
										</RouterLink>
									</li>
								</ul>
								<RouterLink
									to="/servicios"
									class="flex items-center justify-between gap-3 mx-3 mt-2 mb-1 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary hover:text-primary-dark no-underline"
									@click="servicesOpen = false"
								>
									<span>Ver todos los servicios</span>
									<i class="fa fa-arrow-right text-[10px]"></i>
								</RouterLink>
							</div>
						</div>
					</transition>
				</li>
				<li class="relative flex items-center" @mouseenter="solutionsOpen = true" @mouseleave="solutionsOpen = false">
					<span
						role="button"
						tabindex="0"
						class="text-[13px] font-medium transition-colors duration-200 inline-flex items-center gap-1.5 cursor-pointer select-none"
						:class="scrolled ? 'text-text-soft hover:text-primary' : 'text-white/80 hover:text-white'"
						@click="solutionsOpen = !solutionsOpen"
						@keydown.enter.prevent="solutionsOpen = !solutionsOpen"
						@keydown.space.prevent="solutionsOpen = !solutionsOpen"
					>
						Soluciones
						<i class="fa fa-angle-down text-[10px] transition-transform duration-200" :class="solutionsOpen ? 'rotate-180' : ''"></i>
					</span>
					<transition
						enter-active-class="transition duration-200 ease-out"
						enter-from-class="opacity-0 -translate-y-2"
						enter-to-class="opacity-100 translate-y-0"
						leave-active-class="transition duration-150 ease-in"
						leave-from-class="opacity-100 translate-y-0"
						leave-to-class="opacity-0 -translate-y-2"
					>
						<div v-show="solutionsOpen" class="absolute top-full left-1/2 -translate-x-1/2 pt-4">
							<div class="bg-surface rounded-2xl shadow-2xl p-3 min-w-[240px] border border-border">
								<p class="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted px-3 pt-2 pb-3">
									Soluciones por industria
								</p>
								<ul class="list-none m-0 p-0 grid grid-cols-1 gap-1">
									<li v-for="solution in solutions" :key="solution.slug">
										<RouterLink
											:to="`/soluciones/${solution.slug}`"
											class="group flex items-center gap-3 p-3 rounded-xl text-text-soft hover:bg-features-bg no-underline transition-colors"
											@click="solutionsOpen = false"
										>
											<span class="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-primary-pastel text-primary transition-transform duration-200 group-hover:scale-110">
												<i :class="[solution.icon, 'text-base']"></i>
											</span>
											<span class="text-sm font-semibold text-text">{{ solution.title }}</span>
										</RouterLink>
									</li>
								</ul>
							</div>
						</div>
					</transition>
				</li>
				<li>
					<RouterLink
						to="/#startup"
						class="text-[13px] font-medium no-underline transition-colors duration-200"
						:class="scrolled ? 'text-text-soft hover:text-primary' : 'text-white/80 hover:text-white'"
					>
						Startup
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/labs"
						class="text-[13px] font-medium no-underline transition-colors duration-200"
						:class="scrolled ? 'text-text-soft hover:text-primary' : 'text-white/80 hover:text-white'"
					>
						Labs
					</RouterLink>
				</li>
			</ul>

			<!-- Right cluster -->
			<div class="flex items-center gap-2">
				<!-- Theme toggle -->
				<button
					type="button"
					class="hidden lg:inline-flex w-9 h-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer border-0 bg-transparent"
					:class="scrolled
						? 'text-text-soft hover:text-primary hover:bg-features-bg'
						: 'text-white/70 hover:text-white hover:bg-white/10'"
					:title="theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
					@click="toggle"
				>
					<i v-if="theme === 'dark'" class="fa fa-sun-o text-sm"></i>
					<i v-else class="fa fa-moon-o text-sm"></i>
				</button>

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
					class="lg:hidden w-9 h-9 flex items-center justify-center transition-colors duration-200 bg-transparent border-0 cursor-pointer"
					:class="scrolled ? 'text-text' : 'text-white'"
					@click="mobileOpen = true"
				>
					<i class="fa fa-bars text-lg"></i>
				</button>
			</div>
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
						class="inline-flex items-center no-underline nav-logo nav-logo-transparent"
						@click="mobileOpen = false"
					>
						<img src="/logo@0.5x.png" alt="re/START" class="h-[22px] w-auto block">
					</RouterLink>
					<div class="flex items-center gap-2">
						<button
							class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors border-0 cursor-pointer"
							@click="toggle"
						>
							<i :class="theme === 'dark' ? 'fa fa-sun-o' : 'fa fa-moon-o'" class="text-sm"></i>
						</button>
						<button
							class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors border-0 cursor-pointer"
							@click="mobileOpen = false"
						>
							<i class="fa fa-times text-sm"></i>
						</button>
					</div>
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
						<li class="border-b border-white/8">
							<button
								class="flex items-center justify-between w-full py-5 text-xl font-light text-white/90 hover:text-primary transition-colors cursor-pointer"
								@click="mobileSolutionsOpen = !mobileSolutionsOpen"
							>
								Soluciones
								<i
									class="fa fa-angle-down text-sm text-white/40 transition-transform duration-200"
									:class="mobileSolutionsOpen ? 'rotate-180' : ''"
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
								<ul v-show="mobileSolutionsOpen" class="list-none m-0 p-0 overflow-hidden pb-3">
									<li v-for="solution in solutions" :key="solution.slug">
										<RouterLink
											:to="`/soluciones/${solution.slug}`"
											class="flex items-center gap-3 py-3 pl-4 text-base text-white/50 hover:text-primary no-underline transition-colors"
											@click="mobileOpen = false"
										>
											<i :class="[solution.icon, 'text-primary/60 w-5 text-center text-sm']"></i>
											{{ solution.title }}
										</RouterLink>
									</li>
								</ul>
							</transition>
						</li>
						<li class="border-b border-white/8">
							<RouterLink
								to="/#startup"
								class="flex items-center justify-between py-5 text-xl font-light text-white/90 hover:text-primary no-underline transition-colors"
								@click="mobileOpen = false"
							>
								Startup
								<i class="fa fa-arrow-right text-xs text-white/20"></i>
							</RouterLink>
						</li>
						<li>
							<RouterLink
								to="/labs"
								class="flex items-center justify-between py-5 text-xl font-light text-white/90 hover:text-primary no-underline transition-colors"
								@click="mobileOpen = false"
							>
								Labs
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
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()

const solutions = [
	{ slug: 'mineria', title: 'Minería', icon: 'ion-ios-cog-outline' },
	{ slug: 'industria', title: 'Industria', icon: 'ion-ios-gear-outline' },
	{ slug: 'pymes', title: 'Pymes', icon: 'ion-ios-briefcase-outline' },
]

const scrolled = ref(false)
const mobileOpen = ref(false)
const servicesOpen = ref(false)
const solutionsOpen = ref(false)
const mobileServicesOpen = ref(false)
const mobileSolutionsOpen = ref(false)
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

