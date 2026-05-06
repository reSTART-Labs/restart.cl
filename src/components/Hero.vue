<template>
	<section id="hero" class="hero-bg relative min-h-screen flex items-center overflow-hidden" ref="heroRef">
		<div class="hero-overlay absolute inset-0"></div>

		<div
			class="relative z-10 container mx-auto px-6 md:px-12"
			:style="heroContentStyle"
		>
			<p class="hero-kicker animate-fade-in-up animation-delay-100">
				Creatividad, Experiencia y Tecnolog&iacute;a
			</p>

			<h1 class="hero-title animate-fade-in-up animation-delay-200">
				Dise&ntilde;amos <em>experiencias</em> y productos digitales
			</h1>

			<p class="hero-lede animate-fade-in-up animation-delay-400">
				Impulsamos el crecimiento de tu empresa con soluciones tecnol&oacute;gicas a medida.
			</p>

			<div class="flex flex-wrap items-center gap-4 mt-10 animate-fade-in-up animation-delay-400">
				<RouterLink to="/#contact" class="hero-btn hero-btn-primary">
					Conversemos
				</RouterLink>
				<RouterLink to="/#features" class="hero-btn hero-btn-ghost">
					Nuestros servicios
					<i class="fa fa-arrow-right text-[11px]"></i>
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

<style scoped>
.hero-kicker {
	display: inline-flex;
	align-items: center;
	gap: 14px;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	margin-bottom: 28px;
}

.hero-kicker::before {
	content: "";
	display: block;
	width: 32px;
	height: 1px;
	background: var(--color-primary-300);
}

.hero-title {
	color: #FFFFFF;
	font-family: var(--font-display);
	font-size: clamp(44px, 6.5vw, 84px);
	font-weight: 300;
	line-height: 1.05;
	letter-spacing: -0.03em;
	max-width: 18ch;
	margin: 0;
}

.hero-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.hero-lede {
	margin-top: 28px;
	max-width: 54ch;
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 19px;
	line-height: 1.65;
	color: rgba(255, 255, 255, 0.78);
}

.hero-btn {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	padding: 14px 28px;
	border-radius: 999px;
	border: 1px solid transparent;
	transition: all 0.2s ease;
	text-decoration: none;
}

.hero-btn-primary {
	background: var(--color-primary);
	color: #FFFFFF;
	border-color: var(--color-primary);
}

.hero-btn-primary:hover {
	background: var(--color-primary-dark);
	border-color: var(--color-primary-dark);
	transform: translateY(-1px);
}

.hero-btn-ghost {
	background: transparent;
	color: #FFFFFF;
	border-color: rgba(255, 255, 255, 0.3);
}

.hero-btn-ghost:hover {
	background: rgba(255, 255, 255, 0.1);
	border-color: rgba(255, 255, 255, 0.6);
}
</style>
