<template>
	<section id="features" class="py-24 md:px-6 lg:px-12">
		<div class="container mx-auto">
			<div class="section-head text-center mb-16 px-6 md:px-0">
				<p class="features-eyebrow">Nuestros servicios</p>
				<h2 class="features-title">
					Impulsa el crecimiento de tu <em>negocio</em>
				</h2>
				<p class="features-lede">
					Combinamos talento, tecnolog&iacute;a y dise&ntilde;o para crear soluciones digitales a medida.
				</p>
			</div>

			<!-- Desktop accordion (lg+) -->
			<div class="acordeon hidden lg:flex gap-3">
				<RouterLink
					v-for="(service, index) in services"
					:key="service.slug"
					:to="`/servicios/${service.slug}`"
					class="acordeon-item"
					:class="[
						`sc-pattern-${(index % 5) + 1}`,
						service.slug === 'inteligencia-artificial' ? 'sc-lab' : '',
					]"
				>
					<!-- <span class="acordeon-tag">
						{{ String(index + 1).padStart(2, '0') }} · {{ service.slug === 'inteligencia-artificial' ? 'IA · Lab' : service.title }}
					</span> -->
					<div class="acordeon-content">
						<span class="acordeon-icon"><i :class="service.icon"></i></span>
						<h3 class="acordeon-title">{{ service.title }}</h3>
						<p class="acordeon-desc">
							{{ service.headline }}
						</p>
						<span class="acordeon-cta">
							Descubre m&aacute;s
							<i class="fa fa-arrow-right text-[10px]"></i>
						</span>
					</div>
				</RouterLink>
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
								:class="[`sc-pattern-${(services.indexOf(service) % 5) + 1}`, service.slug === 'inteligencia-artificial' ? 'sc-lab' : '']"
							>
								<!-- <span class="acordeon-tag">
									{{ String(services.indexOf(service) + 1).padStart(2, '0') }} · {{ service.slug === 'inteligencia-artificial' ? 'IA · Lab' : service.title }}
								</span> -->
								<div class="relative z-[2] w-full">
									<span class="acordeon-icon"><i :class="service.icon"></i></span>
									<h3 class="text-white text-xl font-semibold mt-4">{{ service.title }}</h3>
									<p class="text-white/75 text-sm leading-relaxed mt-2 font-serif italic font-light">{{ service.headline }}</p>
									<span class="inline-flex items-center gap-2 text-primary-sky text-xs font-semibold uppercase tracking-widest mt-4">
										Descubre m&aacute;s
										<i class="fa fa-arrow-right text-[10px]"></i>
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

const activeSlide = ref(0)
const swiperContainerRef = ref(null)
let swiperInstance = null

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
/* ── Shared card base ── */
.acordeon-item,
.swiper-card {
	position: relative;
	overflow: hidden;
	background: linear-gradient(165deg,
		var(--color-primary-700) 0%,
		var(--color-primary-800) 55%,
		var(--color-primary-900) 100%);
	border: 1px solid color-mix(in oklab, var(--color-primary-300) 10%, transparent);
	isolation: isolate;
}

/* Pattern layer (differentiator) */
.acordeon-item::before,
.swiper-card::before {
	content: "";
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 0;
	transition: transform 0.8s ease, opacity 0.5s ease;
}

/* Bottom darkening for legibility */
.acordeon-item::after,
.swiper-card::after {
	content: "";
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 72%;
	background: linear-gradient(to bottom,
		transparent 0%,
		color-mix(in oklab, var(--color-primary-900) 40%, transparent) 55%,
		color-mix(in oklab, var(--color-primary-900) 72%, transparent) 100%);
	pointer-events: none;
	z-index: 1;
}

/* ── Desktop accordion (pure CSS hover) ── */
.acordeon {
	height: 460px;
}

.acordeon-item {
	flex: 1 1 0%;
	min-width: 0;
	border-radius: 22px;
	cursor: pointer;
	padding: 28px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	text-decoration: none;
	color: #FFFFFF;
	transition: box-shadow 0.35s ease;
}

.acordeon-item:hover {
	box-shadow: 0 24px 60px rgba(4, 23, 30, 0.4);
}

.acordeon-item:hover::before {
	transform: scale(1.08);
}

.acordeon-content {
	position: relative;
	z-index: 2;
	color: white;
	width: 100%;
}

.acordeon-icon {
	display: inline-flex;
	width: 44px;
	height: 44px;
	border-radius: 12px;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(6px);
	-webkit-backdrop-filter: blur(6px);
	border: 1px solid rgba(255, 255, 255, 0.12);
	align-items: center;
	justify-content: center;
	margin-bottom: 18px;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.acordeon-icon i {
	color: #FFFFFF;
	font-size: 20px;
}

.sc-lab .acordeon-icon {
	background: rgba(255, 255, 255, 0.14);
	border-color: rgba(255, 255, 255, 0.2);
}

.acordeon-tag {
	position: absolute;
	top: 24px;
	right: 24px;
	z-index: 3;
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	padding: 4px 10px;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.06);
	border: 1px solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(6px);
	-webkit-backdrop-filter: blur(6px);
}

.sc-lab .acordeon-tag {
	color: #C8C0FF;
	background: rgba(79, 61, 245, 0.24);
	border-color: rgba(200, 192, 255, 0.28);
}

.acordeon-title {
	font-size: 22px;
	font-weight: 700;
	line-height: 1.15;
	letter-spacing: -0.01em;
	color: #FFFFFF;
	text-shadow: 0 1px 20px rgba(4, 23, 30, 0.35);
	margin: 0;
}

.acordeon-desc {
	margin-top: 12px;
	font-family: var(--font-serif);
	font-weight: 300;
	font-style: italic;
	font-size: 13.5px;
	line-height: 1.65;
	color: rgba(255, 255, 255, 0.82);
	opacity: 0;
	max-height: 0;
	overflow: hidden;
	transition: opacity 0.5s ease, max-height 0.5s ease, margin-top 0.5s ease;
}

.acordeon-item:hover .acordeon-desc {
	opacity: 1;
	max-height: 120px;
}

.acordeon-cta {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	margin-top: 18px;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	opacity: 0;
	transform: translateY(4px);
	transition: opacity 0.5s ease, transform 0.5s ease, gap 0.2s ease;
}

.acordeon-item:hover .acordeon-cta {
	opacity: 1;
	transform: translateY(0);
}

.acordeon-item:hover .acordeon-cta:hover {
	gap: 12px;
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
	min-height: 340px;
	border-radius: 20px;
	padding: 28px;
}

/* ── Atmospheric patterns (shared across accordion + swiper) ── */
.sc-pattern-1::before {
	background:
		radial-gradient(circle at 100% 100%,
			transparent 0, transparent 70px,
			rgba(103, 215, 228, 0.10) 71px, rgba(103, 215, 228, 0.10) 72px, transparent 73px,
			transparent 140px,
			rgba(103, 215, 228, 0.08) 141px, rgba(103, 215, 228, 0.08) 142px, transparent 143px,
			transparent 220px,
			rgba(103, 215, 228, 0.06) 221px, rgba(103, 215, 228, 0.06) 222px, transparent 223px,
			transparent 320px,
			rgba(103, 215, 228, 0.04) 321px, rgba(103, 215, 228, 0.04) 322px, transparent 323px);
}

.sc-pattern-2::before {
	background-image: radial-gradient(rgba(103, 215, 228, 0.22) 1px, transparent 1.5px);
	background-size: 18px 18px;
	opacity: 0.5;
	mask-image: radial-gradient(ellipse 80% 100% at 50% 40%, black 30%, transparent 80%);
	-webkit-mask-image: radial-gradient(ellipse 80% 100% at 50% 40%, black 30%, transparent 80%);
}

.sc-pattern-3::before {
	background:
		radial-gradient(ellipse 70% 50% at 25% 20%, rgba(103, 215, 228, 0.22), transparent 60%),
		radial-gradient(ellipse 60% 45% at 85% 75%, rgba(245, 159, 36, 0.08), transparent 65%),
		radial-gradient(ellipse 40% 30% at 60% 50%, rgba(103, 215, 228, 0.06), transparent 70%);
}

.sc-pattern-4::before {
	background:
		repeating-linear-gradient(to bottom,
			transparent 0,
			transparent 10px,
			rgba(103, 215, 228, 0.05) 10px,
			rgba(103, 215, 228, 0.05) 11px),
		radial-gradient(ellipse at 50% 0%, rgba(103, 215, 228, 0.14), transparent 60%);
}

.sc-pattern-5::before {
	background:
		radial-gradient(ellipse 70% 55% at 85% 5%, rgba(79, 61, 245, 0.48), transparent 55%),
		radial-gradient(ellipse 65% 50% at 15% 95%, rgba(103, 215, 228, 0.22), transparent 60%),
		radial-gradient(ellipse 45% 40% at 55% 50%, rgba(245, 159, 36, 0.06), transparent 55%);
	opacity: 1;
}

.sc-lab {
	border-color: color-mix(in oklab, var(--color-accent-electric) 30%, transparent);
}

/* ── Section head ── */
.features-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin-bottom: 18px;
}

.features-title {
	font-family: var(--font-display);
	font-size: clamp(30px, 3.6vw, 48px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: var(--color-text);
	margin: 0;
}

.features-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary);
}

.features-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 17px;
	line-height: 1.7;
	color: var(--color-text-light);
	margin: 20px auto 0;
	max-width: 52ch;
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

.service-detail-media::after {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(135deg,
		color-mix(in oklab, var(--color-primary-800) 72%, transparent) 0%,
		transparent 60%);
	pointer-events: none;
}

.service-detail-media-icon {
	position: absolute;
	bottom: 24px;
	left: 24px;
	z-index: 2;
	width: 56px;
	height: 56px;
	border-radius: 16px;
	background: rgba(255, 255, 255, 0.14);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: #FFFFFF;
	font-size: 24px;
}

.service-detail-tag {
	display: inline-block;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	padding: 5px 14px;
	border-radius: 999px;
	background: color-mix(in oklab, var(--color-primary) 14%, transparent);
	color: var(--color-primary);
	margin-bottom: 18px;
}

.service-detail-tag.is-lab {
	background: color-mix(in oklab, var(--color-accent-electric) 14%, transparent);
	color: var(--color-accent-electric);
}

.service-detail-headline {
	font-family: var(--font-display);
	font-size: clamp(26px, 3.4vw, 40px);
	font-weight: 300;
	letter-spacing: -0.02em;
	line-height: 1.12;
	color: var(--color-text);
	margin: 0;
}

.service-detail-desc {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 17px;
	line-height: 1.75;
	color: var(--color-text-light);
	margin-top: 18px;
	max-width: 58ch;
}

.features-inline {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 18px;
	margin-top: 32px;
}

@media (max-width: 640px) {
	.features-inline { grid-template-columns: 1fr; }
}

.feature-item {
	display: flex;
	gap: 14px;
	padding: 14px;
	border-radius: 12px;
	transition: background 0.2s;
}

.feature-item:hover {
	background: var(--color-features-bg);
}

.feature-dot {
	width: 6px;
	height: 6px;
	border-radius: 999px;
	background: var(--color-primary);
	margin-top: 9px;
	flex-shrink: 0;
}

.feature-title {
	font-size: 14px;
	font-weight: 700;
	letter-spacing: -0.005em;
	color: var(--color-text);
	margin: 0;
}

.feature-desc {
	font-size: 13px;
	line-height: 1.6;
	color: var(--color-text-light);
	margin-top: 4px;
}

.benefits-block {
	margin-top: 32px;
	padding-top: 24px;
	border-top: 1px solid var(--color-border);
}

.benefits-label {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	color: var(--color-text-muted);
	margin-bottom: 14px;
}

.benefit-chip {
	font-size: 12px;
	color: var(--color-text-light);
	background: var(--color-features-bg);
	border: 1px solid var(--color-border);
	padding: 6px 14px;
	border-radius: 999px;
}

.service-detail-cta {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	padding: 14px 28px;
	border-radius: 999px;
	background: var(--color-primary);
	color: #FFFFFF;
	margin-top: 32px;
	text-decoration: none;
	transition: all 0.2s ease;
}

.service-detail-cta:hover {
	background: var(--color-primary-dark);
	transform: translateY(-1px);
}
</style>
