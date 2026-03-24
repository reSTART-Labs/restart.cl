<template>
	<section id="features" class="py-24 md:px-6 lg:px-12">
		<div class="container mx-auto">
			<div class="text-center mb-16 px-6 md:px-0">
				<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
					Nuestros servicios
				</p>
				<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
					Impulsa el crecimiento de tu negocio
				</h2>
				<p class="text-text-light text-base leading-relaxed mt-5 max-w-2xl mx-auto">
					Combinamos talento, tecnolog&iacute;a y dise&ntilde;o para crear soluciones digitales a medida.
				</p>
			</div>

			<!-- Desktop accordion (lg+) -->
			<div class="acordeon hidden lg:flex gap-4" style="height: 500px">
				<div
					v-for="(service, index) in services"
					:key="service.slug"
					class="acordeon-item"
					:class="{
						'is-expanded': expandedIndex === index,
						'is-shrunk': expandedIndex !== null && expandedIndex !== index,
					}"
					:style="{ background: cardBg(service.bg) }"
					@mouseenter="expandedIndex = index"
				>
					<div class="acordeon-content">
						<i :class="[service.icon, 'text-primary-sky text-3xl mb-4 block']"></i>
						<h3 class="acordeon-title">{{ service.title }}</h3>
						<p
							class="acordeon-desc"
							:class="expandedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
						>
							{{ service.headline }}
						</p>
						<RouterLink
							:to="`/servicios/${service.slug}`"
							class="acordeon-cta"
							:class="expandedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'"
						>
							Descubre m&aacute;s
							<i class="fa fa-arrow-right text-xs"></i>
						</RouterLink>
					</div>
				</div>
			</div>

			<!-- Mobile/Tablet Swiper (below lg) -->
			<div class="lg:hidden">
				<div ref="swiperContainerRef" class="swiper">
					<div class="swiper-wrapper">
						<div
							v-for="service in services"
							:key="service.slug"
							class="swiper-slide"
						>
							<RouterLink
								:to="`/servicios/${service.slug}`"
								class="swiper-card no-underline"
								:style="{ background: cardBg(service.bg) }"
							>
								<div class="relative z-[2]">
									<i :class="[service.icon, 'text-primary-sky text-2xl mb-3 block']"></i>
									<h3 class="text-white text-xl font-semibold">{{ service.title }}</h3>
									<p class="text-white/60 text-sm leading-relaxed mt-2">{{ service.headline }}</p>
									<span class="inline-flex items-center gap-2 text-primary-sky text-sm font-medium mt-4">
										Descubre m&aacute;s
										<i class="fa fa-arrow-right text-xs"></i>
									</span>
								</div>
							</RouterLink>
						</div>
					</div>
				</div>

				<!-- Dots -->
				<div class="flex items-center justify-center gap-2 mt-6">
					<button
						v-for="(service, index) in services"
						:key="service.slug"
						class="w-2 h-2 rounded-full transition-all duration-300"
						:class="activeSlide === index ? 'bg-primary w-6' : 'bg-border'"
						@click="slideTo(index)"
					></button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { services } from '@/data/services.js'

const expandedIndex = ref(0)
const activeSlide = ref(0)
const swiperContainerRef = ref(null)
let swiperInstance = null

function cardBg(color) {
	return `linear-gradient(to top right, ${color} 30%, transparent), linear-gradient(to top left, ${color} 30%, transparent), ${color}`
}

function slideTo(index) {
	if (swiperInstance) {
		swiperInstance.slideToLoop(index)
	}
}

async function initSwiper() {
	if (typeof window === 'undefined' || !swiperContainerRef.value) return

	const { default: Swiper } = await import('swiper')
	const { Pagination } = await import('swiper/modules')
	await import('swiper/css')

	swiperInstance = new Swiper(swiperContainerRef.value, {
		modules: [Pagination],
		slidesPerView: 'auto',
		spaceBetween: 16,
		centeredSlides: false,
		slidesOffsetBefore: 24,
		slidesOffsetAfter: 24,
		loop: true,
		breakpoints: {
			640: {
				spaceBetween: 20,
			},
		},
		on: {
			slideChange(swiper) {
				activeSlide.value = swiper.realIndex
			},
		},
	})
}

onMounted(() => {
	initSwiper()
})

onUnmounted(() => {
	if (swiperInstance) {
		swiperInstance.destroy(true, true)
		swiperInstance = null
	}
})
</script>

<style scoped>
/* ── Desktop accordion ── */
.acordeon-item {
	flex: 2 1 0%;
	border-radius: 24px;
	position: relative;
	overflow: hidden;
	cursor: pointer;
	padding: 24px;
	display: flex;
	align-items: flex-end;
	transition: flex 0.7s cubic-bezier(0.05, 0.7, 0.1, 1),
	            padding 0.7s cubic-bezier(0.05, 0.7, 0.1, 1);
}

.acordeon-item.is-expanded {
	flex: 4 1 0%;
	padding: 40px;
}

.acordeon-item.is-shrunk {
	flex: 2 1 0%;
}

.acordeon-content {
	position: relative;
	z-index: 2;
	color: white;
}

.acordeon-title {
	font-size: 28px;
	font-weight: 600;
	line-height: 1.2;
	transition: font-size 0.7s cubic-bezier(0.05, 0.7, 0.1, 1);
}

.is-expanded .acordeon-title {
	font-size: 40px;
}

.acordeon-desc {
	margin-top: 12px;
	font-size: 15px;
	line-height: 1.6;
	color: rgba(255, 255, 255, 0.6);
	transition: opacity 0.5s ease, transform 0.5s ease;
}

.acordeon-cta {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	margin-top: 20px;
	font-size: 14px;
	font-weight: 600;
	color: var(--color-primary-sky);
	text-decoration: none;
	transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}

.acordeon-cta:hover {
	color: white;
}

/* ── Mobile/Tablet Swiper ── */
.swiper-slide {
	width: 80%;
}

@media (min-width: 640px) {
	.swiper-slide {
		width: 45%;
	}
}

.swiper-card {
	display: flex;
	align-items: flex-end;
	min-height: 300px;
	border-radius: 20px;
	padding: 28px;
	position: relative;
	overflow: hidden;
}
</style>
