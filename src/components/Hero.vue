<template>
	<section class="hero-bg relative min-h-screen" ref="heroRef">
		<div class="hero-overlay absolute inset-0"></div>
		<div class="relative z-10 h-screen container mx-auto px-4">
			<div
				class="absolute left-0 right-0 text-center"
				:style="heroTextStyle"
				ref="heroTextRef"
			>
				<h1 class="text-white text-xs font-semibold uppercase tracking-wide animate-fade-in-up animation-delay-100">
					Creatividad, Experiencia y Tecnolog&iacute;a
				</h1>
				<p class="text-white text-4xl font-light leading-tight mt-7 mx-auto w-4/5 animate-fade-in-up animation-delay-400 max-md:text-[28px] max-md:leading-[38px] max-md:w-full max-lg:text-3xl max-lg:w-[90%]">
					Nos especializamos en el dise&ntilde;o de experiencias y desarrollo de productos digitales
				</p>
				<a
					href="#about"
					class="inline-block mt-7 text-white uppercase font-bold text-[11px] tracking-wide border border-primary-sky rounded-full px-6 py-3 no-underline transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white animate-fade-in-up animation-delay-400"
				>
					Con&oacute;cenos
				</a>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useParallax } from '@/composables/useParallax'

const heroRef = ref(null)
const heroTextRef = ref(null)

const { scrollY } = useParallax()

const heroTextStyle = computed(() => {
	if (typeof window === 'undefined') {
		return { top: 'calc(50% - 110px)' }
	}
	const isMobile = window.innerWidth <= 1024
	const baseTop = window.innerWidth <= 767 ? 'calc(50% - 190px)' : 'calc(50% - 110px)'

	if (isMobile) {
		return { top: baseTop }
	}

	const scroll = scrollY.value
	const slowScroll = scroll / 1.4
	const opacity = scroll > 0 ? Math.max(0, (1000 - scroll * 2.7) / 1000) : 1

	return {
		top: baseTop,
		transform: `translateY(${slowScroll}px)`,
		opacity,
	}
})
</script>
