<template>
	<section id="soluciones" class="py-24 px-6 md:px-12">
		<div class="container mx-auto">
			<!-- Header -->
			<div class="text-center max-w-3xl mx-auto mb-12">
				<h2 class="solutions-title">
					Soluciones de <em>digitalizaci&oacute;n</em>
				</h2>
				<p class="solutions-lede">
					Incorporar la tecnolog&iacute;a y el software a tu n&uacute;cleo de negocio no es sencillo, pero hacerlo bien tiene un potencial enorme en eficiencia, productividad e innovaci&oacute;n.
				</p>
			</div>

			<!-- Tabs -->
			<div class="flex items-center justify-center flex-wrap gap-x-10 gap-y-3 md:gap-x-14 mb-10">
				<button
					v-for="(solution, index) in solutions"
					:key="solution.slug"
					type="button"
					class="solutions-tab"
					:class="activeIndex === index ? 'is-active' : ''"
					@click="goTo(index)"
				>
					{{ solution.tab }}
				</button>
			</div>

			<!-- Carousel -->
			<div ref="swiperContainerRef" class="swiper solutions-swiper">
				<div class="swiper-wrapper">
					<div
						v-for="solution in solutions"
						:key="solution.slug"
						class="swiper-slide"
					>
						<div class="solutions-card">
							<div class="solutions-card-content">
								<h3 class="solutions-card-title">{{ solution.title }}</h3>
								<p class="solutions-card-desc">{{ solution.description }}</p>
								<RouterLink
									:to="`/soluciones/${solution.slug}`"
									class="solutions-card-link"
								>
									Ver m&aacute;s
								</RouterLink>
							</div>
							<div
								class="solutions-card-media"
								:style="{ backgroundImage: `url('${solution.image}')` }"
								role="img"
								:aria-label="solution.tab"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const solutions = [
	{
		slug: 'mineria',
		tab: 'Minería',
		title: 'Transformación digital para la Minería Chilena',
		description: 'Desarrollo de software, apps y automatización diseñados para mejorar la eficiencia, trazabilidad y control de procesos en faenas mineras y empresas proveedoras.',
		image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1400&q=80',
	},
	{
		slug: 'industria',
		tab: 'Industrias',
		title: 'Transformación digital para la industria que produce',
		description: 'Desarrollamos soluciones tecnológicas personalizadas para empresas productivas: desde software interno hasta apps móviles sin conexión. Mejora el control, la eficiencia y la trazabilidad de tus procesos.',
		image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=1400&q=80',
	},
	{
		slug: 'pymes',
		tab: 'Pymes',
		title: 'Digitaliza tu Pyme y haz crecer tu negocio',
		description: 'Automatiza tareas, mejora el control de tus procesos y lleva tu empresa al siguiente nivel con soluciones tecnológicas a medida.',
		image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80',
	},
]

const activeIndex = ref(0)
const swiperContainerRef = ref(null)
let swiperInstance = null

function goTo(index) {
	if (swiperInstance) {
		swiperInstance.slideToLoop(index)
	} else {
		activeIndex.value = index
	}
}

async function initSwiper() {
	if (typeof window === 'undefined' || !swiperContainerRef.value) return

	const { default: Swiper } = await import('swiper')
	const { EffectFade, Autoplay } = await import('swiper/modules')
	await import('swiper/css')
	await import('swiper/css/effect-fade')

	swiperInstance = new Swiper(swiperContainerRef.value, {
		modules: [EffectFade, Autoplay],
		effect: 'fade',
		fadeEffect: { crossFade: true },
		slidesPerView: 1,
		loop: true,
		allowTouchMove: true,
		autoplay: {
			delay: 6000,
			disableOnInteraction: false,
		},
		on: {
			slideChange(swiper) {
				activeIndex.value = swiper.realIndex
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
.solutions-title {
	font-family: var(--font-display);
	font-size: clamp(30px, 3.6vw, 48px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: var(--color-text);
	margin: 0;
}

.solutions-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary);
}

.solutions-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 17px;
	line-height: 1.7;
	color: var(--color-text-light);
	margin: 22px auto 0;
	max-width: 60ch;
}

/* Tabs */
.solutions-tab {
	background: transparent;
	border: 0;
	padding: 6px 2px;
	cursor: pointer;
	font-family: var(--font-display);
	font-size: clamp(18px, 1.6vw, 22px);
	font-weight: 400;
	letter-spacing: -0.01em;
	color: var(--color-text-light);
	transition: color 0.25s ease;
	position: relative;
}

.solutions-tab:hover {
	color: var(--color-text);
}

.solutions-tab.is-active {
	color: var(--color-accent-green);
	font-weight: 600;
}

/* Card */
.solutions-card {
	display: grid;
	grid-template-columns: 1fr;
	gap: 0;
	border-radius: 18px;
	overflow: hidden;
	min-height: 420px;
}

@media (min-width: 1024px) {
	.solutions-card {
		grid-template-columns: 1fr 1fr;
	}
}

.solutions-card-content {
	background: var(--color-dark-graphite);
	color: #FFFFFF;
	padding: 48px 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

@media (min-width: 768px) {
	.solutions-card-content {
		padding: 60px 56px;
	}
}

html[data-theme="dark"] .solutions-card-content {
	background: #1A2230;
}

.solutions-card-title {
	font-family: var(--font-display);
	font-size: clamp(24px, 2.6vw, 34px);
	font-weight: 300;
	letter-spacing: -0.02em;
	line-height: 1.2;
	color: #FFFFFF;
	margin: 0;
	max-width: 18ch;
}

.solutions-card-desc {
	font-family: var(--font-sans);
	font-size: 15px;
	line-height: 1.8;
	color: rgba(255, 255, 255, 0.65);
	margin-top: 22px;
	max-width: 52ch;
}

.solutions-card-link {
	display: inline-flex;
	align-items: center;
	margin-top: 28px;
	color: var(--color-accent-green);
	font-size: 14px;
	font-weight: 600;
	text-decoration: underline;
	text-underline-offset: 4px;
	transition: opacity 0.2s ease;
	width: fit-content;
}

.solutions-card-link:hover {
	opacity: 0.8;
}

.solutions-card-media {
	background-size: cover;
	background-position: center;
	min-height: 280px;
}

@media (min-width: 1024px) {
	.solutions-card-media {
		min-height: 100%;
	}
}

/* Ensure Swiper height matches the tallest slide */
.solutions-swiper {
	width: 100%;
}

.solutions-swiper :deep(.swiper-slide) {
	height: auto;
}

@media (max-width: 1919px) {
	.solutions-title {
		font-size: 45px;
		line-height: 1.12;
	}
	.solutions-lede {
		font-size: 16px;
		line-height: 1.62;
	}
	.solutions-tab {
		font-size: 21px;
		line-height: 1.26;
	}
	.solutions-card-title {
		font-size: 32px;
		line-height: 1.12;
	}
	.solutions-card-desc {
		font-size: 15px;
		line-height: 1.62;
	}
	.solutions-card-link {
		font-size: 14px;
		line-height: 1.62;
	}
}

@media (max-width: 1439px) {
	.solutions-title {
		font-size: 41px;
		line-height: 1.14;
	}
	.solutions-lede {
		font-size: 16px;
		line-height: 1.60;
	}
	.solutions-tab {
		font-size: 20px;
		line-height: 1.28;
	}
	.solutions-card-title {
		font-size: 29px;
		line-height: 1.14;
	}
	.solutions-card-desc {
		font-size: 14px;
		line-height: 1.61;
	}
	.solutions-card-link {
		font-size: 14px;
		line-height: 1.61;
	}
}

@media (max-width: 1199px) {
	.solutions-title {
		font-size: 37px;
		line-height: 1.15;
	}
	.solutions-lede {
		font-size: 15px;
		line-height: 1.58;
	}
	.solutions-tab {
		font-size: 18px;
		line-height: 1.30;
	}
	.solutions-card-title {
		font-size: 27px;
		line-height: 1.15;
	}
	.solutions-card-desc {
		font-size: 14px;
		line-height: 1.60;
	}
	.solutions-card-link {
		font-size: 14px;
		line-height: 1.60;
	}
}

@media (max-width: 1079px) {
	.solutions-title {
		font-size: 34px;
		line-height: 1.17;
	}
	.solutions-lede {
		font-size: 15px;
		line-height: 1.56;
	}
	.solutions-tab {
		font-size: 18px;
		line-height: 1.32;
	}
	.solutions-card-title {
		font-size: 26px;
		line-height: 1.17;
	}
	.solutions-card-desc {
		font-size: 14px;
		line-height: 1.58;
	}
	.solutions-card-link {
		font-size: 14px;
		line-height: 1.58;
	}
}

@media (max-width: 991px) {
	.solutions-title {
		font-size: 31px;
		line-height: 1.19;
	}
	.solutions-lede {
		font-size: 15px;
		line-height: 1.54;
	}
	.solutions-tab {
		font-size: 18px;
		line-height: 1.33;
	}
	.solutions-card-title {
		font-size: 26px;
		line-height: 1.19;
	}
	.solutions-card-desc {
		font-size: 14px;
		line-height: 1.57;
	}
	.solutions-card-link {
		font-size: 14px;
		line-height: 1.57;
	}
}

@media (max-width: 768px) {
	.solutions-title {
		font-size: 28px;
		line-height: 1.21;
	}
	.solutions-lede {
		font-size: 15px;
		line-height: 1.52;
	}
	.solutions-tab {
		font-size: 18px;
		line-height: 1.34;
	}
	.solutions-card-title {
		font-size: 26px;
		line-height: 1.21;
	}
	.solutions-card-desc {
		font-size: 14px;
		line-height: 1.55;
	}
	.solutions-card-link {
		font-size: 14px;
		line-height: 1.55;
	}
}

@media (max-width: 575px) {
	.solutions-title {
		font-size: 26px;
		line-height: 1.22;
	}
	.solutions-lede {
		font-size: 15px;
		line-height: 1.50;
	}
	.solutions-tab {
		font-size: 18px;
		line-height: 1.35;
	}
	.solutions-card-title {
		font-size: 26px;
		line-height: 1.22;
	}
	.solutions-card-desc {
		font-size: 14px;
		line-height: 1.55;
	}
	.solutions-card-link {
		font-size: 14px;
		line-height: 1.55;
	}
}
</style>
