<template>
	<section class="hero-bg relative min-h-screen flex items-center" ref="heroRef">
		<div class="hero-overlay absolute inset-0"></div>

		<div
			class="relative z-10 container mx-auto px-6 md:px-12"
			:style="heroContentStyle"
		>
			<p class="text-primary-sky text-sm font-semibold uppercase tracking-widest mb-6 animate-fade-in-up animation-delay-100">
				Creatividad, Experiencia y Tecnolog&iacute;a
			</p>

			<h1 class="text-white text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] max-w-3xl animate-fade-in-up animation-delay-200">
				Dise&ntilde;amos experiencias y productos digitales
			</h1>

			<p class="text-white/70 text-lg md:text-xl leading-relaxed mt-8 max-w-xl animate-fade-in-up animation-delay-400">
				Impulsamos el crecimiento de tu empresa con soluciones tecnol&oacute;gicas a medida.
			</p>

			<div class="flex flex-wrap items-center gap-4 mt-10 animate-fade-in-up animation-delay-400">
				<RouterLink
					to="/#contact"
					class="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark"
				>
					Conversemos
				</RouterLink>
				<RouterLink
					to="/#features"
					class="inline-flex items-center gap-2 text-white font-medium text-sm border border-white/30 px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-white/10 hover:border-white/60"
				>
					Nuestros servicios
					<i class="fa fa-arrow-right text-xs"></i>
				</RouterLink>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useParallax } from '@/composables/useParallax'

const heroRef = ref(null)
const mounted = ref(false)
const { scrollY } = useParallax()

onMounted(() => {
	mounted.value = true
})

const heroContentStyle = computed(() => {
	if (!mounted.value) return {}
	if (window.innerWidth <= 1024) return {}

	const scroll = scrollY.value
	const opacity = scroll > 0 ? Math.max(0, (800 - scroll * 2) / 800) : 1

	return {
		transform: `translateY(${scroll / 2.5}px)`,
		opacity,
	}
})
</script>
