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

			<!-- Detailed service showcase -->
			<div class="mt-24 space-y-32 px-6 md:px-0">
				<div
					v-for="(service, index) in services"
					:key="service.slug + '-detail'"
					class="service-detail"
					:class="index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'"
				>
					<!-- Image side -->
					<div class="service-detail-image">
						<div class="relative overflow-hidden rounded-2xl">
							<img
								:src="service.image"
								:alt="service.title"
								class="w-full h-[320px] lg:h-[440px] object-cover"
								loading="lazy"
							>
							<div
								class="absolute inset-0"
								:style="`background: linear-gradient(135deg, ${service.bg}cc 0%, transparent 60%)`"
							></div>
							<div class="absolute bottom-6 left-6 z-[2]">
								<i :class="[service.icon, 'text-primary-sky text-4xl']"></i>
							</div>
						</div>
					</div>

					<!-- Content side -->
					<div class="service-detail-content">
						<span
							class="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
							:style="`background: ${service.bg}22; color: ${service.bg === '#1E1E1E' ? '#41BECF' : service.bg}`"
						>
							{{ service.title }}
						</span>
						<h3 class="text-2xl lg:text-3xl font-light text-dark leading-tight">
							{{ service.headline }}
						</h3>
						<p class="text-text-light text-base leading-relaxed mt-4">
							{{ service.description }}
						</p>

						<!-- Feature grid -->
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
							<div
								v-for="feat in service.features"
								:key="feat.title"
								class="feature-card"
							>
								<div class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></div>
								<div>
									<h4 class="text-sm font-semibold text-dark">{{ feat.title }}</h4>
									<p class="text-xs text-text-light leading-relaxed mt-1">{{ feat.desc }}</p>
								</div>
							</div>
						</div>

						<!-- Benefits -->
						<div class="mt-8 pt-6 border-t border-border">
							<p class="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Beneficios clave</p>
							<div class="flex flex-wrap gap-2">
								<span
									v-for="benefit in service.benefits"
									:key="benefit"
									class="text-xs text-text-light bg-features-bg border border-border px-3 py-1.5 rounded-full"
								>
									{{ benefit }}
								</span>
							</div>
						</div>

						<RouterLink
							:to="`/servicios/${service.slug}`"
							class="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-wide px-7 py-3.5 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark mt-8"
						>
							{{ service.cta }}
							<i class="fa fa-arrow-right text-xs"></i>
						</RouterLink>
					</div>
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

/* ── Service detail showcase ── */
.service-detail {
	display: flex;
	flex-direction: column;
	gap: 40px;
	align-items: center;
}

@media (min-width: 1024px) {
	.service-detail {
		flex-direction: row;
		gap: 64px;
	}
}

.service-detail-image {
	flex: 1;
	min-width: 0;
	width: 100%;
}

.service-detail-content {
	flex: 1;
	min-width: 0;
	width: 100%;
}

.feature-card {
	display: flex;
	gap: 12px;
	padding: 12px;
	border-radius: 12px;
	transition: background 0.2s;
}

.feature-card:hover {
	background: var(--color-features-bg);
}
</style>
