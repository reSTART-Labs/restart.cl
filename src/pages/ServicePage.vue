<template>
	<template v-if="service">
		<!-- Hero with background image -->
		<section class="service-hero relative min-h-[70vh] flex items-end overflow-hidden">
			<img
				:src="service.image"
				:alt="service.title"
				class="absolute inset-0 w-full h-full object-cover"
			>
			<div class="absolute inset-0 service-hero-overlay"></div>
			<div class="relative z-10 container mx-auto px-6 md:px-12 pb-20 pt-36">
				<div class="max-w-2xl">
					<RouterLink to="/#features" class="hero-kicker">
						<i class="fa fa-arrow-left text-[9px]"></i>
						Servicios &middot; {{ service.title }}
					</RouterLink>
					<div class="flex items-center gap-4 mb-5 mt-6">
						<span class="hero-icon-chip">
							<i :class="[service.icon, 'text-primary-sky text-xl']"></i>
						</span>
						<span class="hero-service-tag">
							{{ service.title }}
						</span>
					</div>
					<h1 class="hero-title">
						{{ service.headline }}
					</h1>
					<p class="hero-lede">
						{{ service.description }}
					</p>
					<div class="flex flex-wrap items-center gap-3 mt-10">
						<RouterLink to="/#contact" class="btn btn-primary">
							{{ service.cta }}
						</RouterLink>
						<a href="#features-detail" class="btn btn-ghost-dark">
							Conoce m&aacute;s
							<i class="fa fa-arrow-down text-[11px]"></i>
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Items overview strip -->
		<section class="items-strip">
			<div class="container mx-auto px-6 md:px-12">
				<div class="grid grid-cols-2 md:grid-cols-4">
					<div
						v-for="item in service.items"
						:key="item"
						class="items-strip-item"
					>
						<i class="ion-checkmark-round"></i>
						<span>{{ item }}</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Detailed features -->
		<section id="features-detail" class="py-24 px-6 md:px-12">
			<div class="container mx-auto">
				<div class="text-center mb-16 max-w-2xl mx-auto">
					<p class="sp-eyebrow">Lo que hacemos</p>
					<h2 class="sp-section-title">
						Capacidades en <em>{{ service.title.toLowerCase() }}</em>
					</h2>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					<div
						v-for="(feat, i) in service.features"
						:key="feat.title"
						class="sp-feature-card group"
					>
						<div class="flex items-start gap-5">
							<span class="sp-feature-num">
								{{ String(i + 1).padStart(2, '0') }}
							</span>
							<div>
								<h3 class="sp-feature-title">
									{{ feat.title }}
								</h3>
								<p class="sp-feature-desc">
									{{ feat.desc }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- AI solutions (only for inteligencia-artificial) -->
		<section
			v-if="service.slug === 'inteligencia-artificial' && aiSolutions.length"
			class="py-24 px-6 md:px-12 bg-dark"
		>
			<div class="container mx-auto">
				<div class="text-center mb-16 max-w-2xl mx-auto">
					<p class="sp-eyebrow" style="color: var(--color-primary-300);">Soluciones de IA</p>
					<h2 class="sp-section-title-inverse">
						Cinco frentes donde la <em>IA</em> genera impacto real
					</h2>
					<p class="sp-lede-inverse">
						Cada soluci&oacute;n es un bloque probado que combinamos seg&uacute;n tu caso de uso, datos y metas de negocio.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<RouterLink
						v-for="sol in aiSolutions"
						:key="sol.slug"
						:to="`/inteligencia-artificial/${sol.slug}`"
						class="ai-solution-card group no-underline"
						:style="`background: ${sol.bg}`"
					>
						<div class="relative z-[2]">
							<span class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm mb-5">
								<i :class="[sol.icon, 'text-white text-xl']"></i>
							</span>
							<h3 class="text-white text-xl font-semibold leading-tight">
								{{ sol.title }}
							</h3>
							<p class="text-white/60 text-sm leading-relaxed mt-3">
								{{ sol.headline }}
							</p>
							<ul class="mt-5 space-y-2">
								<li
									v-for="item in sol.items"
									:key="item"
									class="flex items-center gap-2 text-white/70 text-xs"
								>
									<i class="ion-checkmark-round text-primary-sky text-sm"></i>
									{{ item }}
								</li>
							</ul>
							<span class="inline-flex items-center gap-2 text-primary-sky text-xs font-semibold uppercase tracking-wide mt-6 group-hover:gap-3 transition-all">
								Ver soluci&oacute;n
								<i class="fa fa-arrow-right text-[10px]"></i>
							</span>
						</div>
					</RouterLink>
				</div>
			</div>
		</section>

		<!-- Process section -->
		<section class="py-24 px-6 md:px-12 bg-features-bg">
			<div class="container mx-auto">
				<div class="text-center mb-16 max-w-2xl mx-auto">
					<p class="sp-eyebrow">Nuestro proceso</p>
					<h2 class="sp-section-title">
						C&oacute;mo <em>trabajamos</em>
					</h2>
					<p class="sp-lede">
						Un proceso probado que garantiza resultados predecibles y transparencia total.
					</p>
				</div>

				<div class="process-grid">
					<div
						v-for="(step, i) in processSteps"
						:key="step.title"
						class="process-step"
						:class="{ 'is-last': i === processSteps.length - 1 }"
					>
						<span class="process-step-num">{{ i + 1 }}</span>
						<h4 class="process-step-title">{{ step.title }}</h4>
						<p class="process-step-desc">{{ step.desc }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Benefits section -->
		<section class="benefits-section">
			<div class="container mx-auto px-6 md:px-12">
				<div class="benefits-grid">
					<div>
						<p class="sp-eyebrow" style="color: var(--color-primary-300);">Ventajas</p>
						<h2 class="sp-section-title-inverse">
							&iquest;Por qu&eacute; elegirnos para <em>{{ service.title.toLowerCase() }}</em>?
						</h2>
						<p class="sp-lede-inverse">
							Trabajamos con los m&aacute;s altos est&aacute;ndares de calidad y transparencia para que tu inversi&oacute;n se traduzca en resultados reales.
						</p>
					</div>
					<div class="benefits-list">
						<div
							v-for="benefit in service.benefits"
							:key="benefit"
							class="benefit-item"
						>
							<span class="benefit-check">
								<i class="ion-checkmark-round"></i>
							</span>
							<p>{{ benefit }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Related services -->
		<section class="py-24 px-6 md:px-12">
			<div class="container mx-auto">
				<div class="text-center mb-16">
					<p class="sp-eyebrow">Servicios relacionados</p>
					<h2 class="sp-section-title">
						Complementa tu <em>estrategia</em>
					</h2>
				</div>

				<div :key="`related-${service.slug}`" class="related-grid">
					<RouterLink
						v-for="related in relatedServices"
						:key="related.slug"
						:to="`/servicios/${related.slug}`"
						class="related-card no-underline group"
					>
						<img
							:src="related.image"
							:alt="related.title"
							class="related-card-img"
							loading="lazy"
						>
						<div class="related-card-body">
							<i :class="[related.icon, 'related-card-icon']"></i>
							<h3 class="related-card-title">{{ related.title }}</h3>
							<p class="related-card-desc">{{ related.headline }}</p>
							<span class="related-card-link">
								Ver servicio
								<i class="fa fa-arrow-right text-[9px]"></i>
							</span>
						</div>
					</RouterLink>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="page-cta is-dark">
			<div class="container mx-auto px-6 md:px-12">
				<h2 class="sp-section-title-inverse" style="max-width: 24ch; margin: 0 auto; text-align: center;">
					&iquest;Listo para <em>empezar</em>?
				</h2>
				<p class="page-cta-lede">
					Conversemos sobre c&oacute;mo podemos ayudarte con {{ service.title.toLowerCase() }}.
					Agenda una asesor&iacute;a gratuita y te contamos todo.
				</p>
				<div class="page-cta-ctas">
					<RouterLink to="/#contact" class="btn btn-primary">
						{{ service.cta }}
					</RouterLink>
					<RouterLink to="/" class="btn btn-ghost-dark">
						Ver todos los servicios
					</RouterLink>
				</div>
			</div>
		</section>
	</template>

	<section v-else class="py-20 px-4 text-center">
		<div class="container mx-auto">
			<h3 class="text-2xl font-light uppercase tracking-wide text-text">Servicio no encontrado</h3>
			<p class="text-text-light mt-4">El servicio que buscas no existe.</p>
			<RouterLink
				to="/"
				class="inline-block mt-8 text-white uppercase font-bold text-[11px] tracking-wide bg-primary rounded-full px-8 py-4 no-underline transition-all duration-200 hover:bg-primary-dark"
			>
				Volver al inicio
			</RouterLink>
		</div>
	</section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '@/data/services.js'
import { aiSolutions } from '@/data/aiSolutions.js'

const route = useRoute()
const service = computed(() => services.find(s => s.slug === route.params.slug))

const relatedServices = computed(() => {
	if (!service.value) return []
	return services.filter(s => s.slug !== service.value.slug)
})

const processSteps = [
	{
		title: 'Descubrimiento',
		desc: 'Entendemos tu negocio, objetivos y desafíos para definir el alcance del proyecto.',
	},
	{
		title: 'Estrategia',
		desc: 'Diseñamos la solución técnica y el roadmap con entregables claros y medibles.',
	},
	{
		title: 'Ejecución',
		desc: 'Desarrollamos en sprints con revisiones semanales y demos de avance.',
	},
	{
		title: 'Entrega y soporte',
		desc: 'Lanzamos, capacitamos a tu equipo y mantenemos soporte continuo.',
	},
]
</script>

<style scoped>
/* ── HERO ── */
.service-hero-overlay {
	background: linear-gradient(180deg,
		rgba(4, 23, 30, 0.6) 0%,
		rgba(4, 23, 30, 0.88) 65%,
		var(--color-primary-900) 100%);
}

.hero-kicker {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.55);
	text-decoration: none;
	transition: color 0.2s ease;
	margin-bottom: 24px;
}

.hero-kicker::before {
	content: "";
	display: block;
	width: 24px;
	height: 1px;
	background: var(--color-primary-300);
}

.hero-kicker:hover {
	color: var(--color-primary-300);
}

.hero-icon-chip {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	border-radius: 14px;
	background: rgba(103, 215, 228, 0.18);
}

.hero-service-tag {
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary-300);
}

.hero-title {
	color: #FFFFFF;
	font-family: var(--font-display);
	font-size: clamp(40px, 5.4vw, 72px);
	font-weight: 300;
	line-height: 1.05;
	letter-spacing: -0.025em;
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
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 18px;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.78);
	margin-top: 28px;
	max-width: 54ch;
}

/* ── ITEMS STRIP ── */
.items-strip {
	background: var(--color-primary-800);
	padding: 24px 0;
}

.items-strip-item {
	text-align: center;
	padding: 16px 8px;
	border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.items-strip-item:last-child {
	border-right: none;
}

.items-strip-item i {
	color: var(--color-primary-400);
	font-size: 18px;
	display: block;
	margin-bottom: 6px;
}

.items-strip-item span {
	font-size: 12px;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.85);
}

/* ── EYEBROWS & TITLES ── */
.sp-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin-bottom: 18px;
}

.sp-section-title {
	font-family: var(--font-display);
	font-size: clamp(28px, 3.5vw, 42px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: var(--color-text);
	margin: 0;
}

.sp-section-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary);
}

.sp-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 15px;
	line-height: 1.7;
	color: var(--color-text-light);
	margin-top: 16px;
}

.sp-section-title-inverse {
	font-family: var(--font-display);
	font-size: clamp(28px, 3.2vw, 40px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: #FFFFFF;
	margin: 0;
}

.sp-section-title-inverse :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.sp-lede-inverse {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 16px;
	line-height: 1.75;
	color: rgba(255, 255, 255, 0.72);
	margin-top: 20px;
}

/* ── DETAIL FEATURES · CARDS ── */
.sp-feature-card {
	padding: 28px;
	border: 1px solid var(--color-border);
	background: var(--color-surface);
	border-radius: 20px;
	transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}

.sp-feature-card:hover {
	box-shadow: 0 12px 28px rgba(13, 17, 23, 0.08);
	transform: translateY(-2px);
	border-color: var(--color-border-strong);
}

.sp-feature-num {
	flex-shrink: 0;
	width: 48px;
	height: 48px;
	border-radius: 14px;
	background: var(--color-primary-pastel);
	color: var(--color-primary);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-family: var(--font-display);
	font-size: 16px;
	font-weight: 700;
	letter-spacing: -0.01em;
	transition: transform 0.3s ease;
}

.sp-feature-card:hover .sp-feature-num {
	transform: scale(1.06);
}

.sp-feature-title {
	font-size: 18px;
	font-weight: 700;
	letter-spacing: -0.005em;
	color: var(--color-text);
	margin: 0;
}

.sp-feature-desc {
	font-size: 14px;
	line-height: 1.65;
	color: var(--color-text-light);
	margin-top: 8px;
}

/* ── PROCESS ── */
.process-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 24px;
}

@media (max-width: 960px) {
	.process-grid { grid-template-columns: 1fr 1fr; gap: 32px 16px; }
}

@media (max-width: 640px) {
	.process-grid { grid-template-columns: 1fr; }
}

.process-step {
	text-align: center;
	position: relative;
}

@media (min-width: 961px) {
	.process-step:not(.is-last)::after {
		content: "";
		position: absolute;
		top: 24px;
		left: calc(50% + 32px);
		width: calc(100% - 32px);
		height: 1px;
		background: var(--color-border-strong);
	}
}

.process-step-num {
	position: relative;
	z-index: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	border-radius: 999px;
	background: var(--color-surface);
	border: 2px solid var(--color-primary);
	color: var(--color-primary);
	font-family: var(--font-display);
	font-size: 14px;
	font-weight: 700;
}

.process-step-title {
	font-size: 15px;
	font-weight: 700;
	letter-spacing: -0.005em;
	color: var(--color-text);
	margin: 20px 0 0;
}

.process-step-desc {
	font-size: 13px;
	line-height: 1.6;
	color: var(--color-text-light);
	margin-top: 8px;
}

/* ── BENEFITS ── */
.benefits-section {
	padding: 96px 0;
	background: var(--color-primary-800);
	color: #FFFFFF;
}

.benefits-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 64px;
	align-items: center;
}

@media (max-width: 1024px) {
	.benefits-grid { grid-template-columns: 1fr; gap: 40px; }
}

.benefits-list {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.benefit-item {
	padding: 18px 20px;
	border-radius: 14px;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	display: flex;
	gap: 14px;
	align-items: center;
	transition: border-color 0.2s ease;
}

.benefit-item:hover {
	border-color: rgba(103, 215, 228, 0.4);
}

.benefit-check {
	flex-shrink: 0;
	width: 28px;
	height: 28px;
	border-radius: 999px;
	background: rgba(50, 191, 212, 0.2);
	color: var(--color-primary-300);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
}

.benefit-item p {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.85);
	line-height: 1.5;
	margin: 0;
}

/* ── RELATED SERVICES ── */
.related-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
}

@media (max-width: 960px) {
	.related-grid { grid-template-columns: 1fr; }
}

.related-card {
	position: relative;
	border-radius: 20px;
	overflow: hidden;
	height: 240px;
	background: linear-gradient(165deg, var(--color-primary-700), var(--color-primary-800));
	transition: transform 0.3s ease;
	display: block;
}

.related-card:hover {
	transform: translateY(-3px);
}

.related-card-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: 0.5;
	transition: opacity 0.3s ease, transform 0.6s ease;
}

.related-card:hover .related-card-img {
	opacity: 0.7;
	transform: scale(1.05);
}

.related-card::after {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(to top,
		var(--color-primary-900) 5%,
		color-mix(in oklab, var(--color-primary-800) 50%, transparent) 55%,
		transparent 100%);
	pointer-events: none;
}

.related-card-body {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20px;
	z-index: 2;
	color: #FFFFFF;
}

.related-card-icon {
	color: var(--color-primary-300);
	font-size: 18px;
	display: block;
	margin-bottom: 4px;
}

.related-card-title {
	font-size: 16px;
	font-weight: 700;
	letter-spacing: -0.005em;
	color: #FFFFFF;
	margin: 0;
}

.related-card-desc {
	font-size: 12px;
	color: rgba(255, 255, 255, 0.65);
	margin-top: 4px;
}

.related-card-link {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	margin-top: 14px;
	transition: gap 0.2s ease;
}

.related-card:hover .related-card-link {
	gap: 10px;
}

/* ── CTA ── */
.page-cta {
	padding: 96px 0;
	background: var(--color-surface-muted);
	text-align: center;
}

.page-cta.is-dark {
	background: var(--color-primary-800);
	color: #FFFFFF;
}

.page-cta-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 16px;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.7);
	margin: 20px auto 0;
	max-width: 52ch;
}

.page-cta-ctas {
	display: inline-flex;
	gap: 14px;
	margin-top: 36px;
	flex-wrap: wrap;
	justify-content: center;
}

.ai-solution-card {
	display: block;
	padding: 28px;
	border-radius: 20px;
	position: relative;
	overflow: hidden;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ai-solution-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

/* ── RESPONSIVE TYPE SCALE ── */
@media (max-width: 1919px) {
	.hero-title { font-size: 66px; line-height: 1.06; }
	.hero-lede { font-size: 17px; line-height: 1.62; }
	.items-strip-item i { font-size: 17px; line-height: 1.62; }
	.sp-section-title { font-size: 39px; line-height: 1.12; }
	.sp-lede { font-size: 15px; line-height: 1.62; }
	.sp-section-title-inverse { font-size: 38px; line-height: 1.12; }
	.sp-lede-inverse { font-size: 16px; line-height: 1.62; }
	.sp-feature-num { font-size: 16px; line-height: 1.62; }
	.sp-feature-title { font-size: 17px; line-height: 1.62; }
	.sp-feature-desc { font-size: 14px; line-height: 1.62; }
	.process-step-num { font-size: 14px; line-height: 1.62; }
	.process-step-title { font-size: 15px; line-height: 1.62; }
	.benefit-item p { font-size: 14px; line-height: 1.62; }
	.related-card-icon { font-size: 17px; line-height: 1.62; }
	.related-card-title { font-size: 16px; line-height: 1.62; }
	.page-cta-lede { font-size: 16px; line-height: 1.62; }
}

@media (max-width: 1439px) {
	.hero-title { font-size: 59px; line-height: 1.07; }
	.hero-lede { font-size: 17px; line-height: 1.60; }
	.items-strip-item i { font-size: 17px; line-height: 1.60; }
	.sp-section-title { font-size: 36px; line-height: 1.14; }
	.sp-lede { font-size: 14px; line-height: 1.61; }
	.sp-section-title-inverse { font-size: 34px; line-height: 1.14; }
	.sp-lede-inverse { font-size: 15px; line-height: 1.61; }
	.sp-feature-num { font-size: 15px; line-height: 1.61; }
	.sp-feature-title { font-size: 17px; line-height: 1.60; }
	.sp-feature-desc { font-size: 14px; line-height: 1.61; }
	.process-step-num { font-size: 14px; line-height: 1.61; }
	.process-step-title { font-size: 14px; line-height: 1.61; }
	.benefit-item p { font-size: 14px; line-height: 1.61; }
	.related-card-icon { font-size: 17px; line-height: 1.60; }
	.related-card-title { font-size: 15px; line-height: 1.61; }
	.page-cta-lede { font-size: 15px; line-height: 1.61; }
}

@media (max-width: 1199px) {
	.hero-title { font-size: 52px; line-height: 1.08; }
	.hero-lede { font-size: 16px; line-height: 1.58; }
	.items-strip-item i { font-size: 16px; line-height: 1.58; }
	.sp-section-title { font-size: 33px; line-height: 1.15; }
	.sp-lede { font-size: 14px; line-height: 1.60; }
	.sp-section-title-inverse { font-size: 31px; line-height: 1.15; }
	.sp-lede-inverse { font-size: 15px; line-height: 1.60; }
	.sp-feature-num { font-size: 15px; line-height: 1.60; }
	.sp-feature-title { font-size: 16px; line-height: 1.58; }
	.sp-feature-desc { font-size: 14px; line-height: 1.60; }
	.process-step-num { font-size: 14px; line-height: 1.60; }
	.process-step-title { font-size: 14px; line-height: 1.60; }
	.benefit-item p { font-size: 14px; line-height: 1.60; }
	.related-card-icon { font-size: 16px; line-height: 1.58; }
	.related-card-title { font-size: 15px; line-height: 1.60; }
	.page-cta-lede { font-size: 15px; line-height: 1.60; }
}

@media (max-width: 1079px) {
	.hero-title { font-size: 46px; line-height: 1.10; }
	.hero-lede { font-size: 15px; line-height: 1.56; }
	.items-strip-item i { font-size: 15px; line-height: 1.56; }
	.sp-section-title { font-size: 30px; line-height: 1.17; }
	.sp-lede { font-size: 14px; line-height: 1.58; }
	.sp-section-title-inverse { font-size: 28px; line-height: 1.17; }
	.sp-lede-inverse { font-size: 15px; line-height: 1.58; }
	.sp-feature-num { font-size: 15px; line-height: 1.58; }
	.sp-feature-title { font-size: 15px; line-height: 1.56; }
	.sp-feature-desc { font-size: 14px; line-height: 1.58; }
	.process-step-num { font-size: 14px; line-height: 1.58; }
	.process-step-title { font-size: 14px; line-height: 1.58; }
	.benefit-item p { font-size: 14px; line-height: 1.58; }
	.related-card-icon { font-size: 15px; line-height: 1.56; }
	.related-card-title { font-size: 15px; line-height: 1.58; }
	.page-cta-lede { font-size: 15px; line-height: 1.58; }
}

@media (max-width: 991px) {
	.hero-title { font-size: 41px; line-height: 1.12; }
	.hero-lede { font-size: 15px; line-height: 1.54; }
	.items-strip-item i { font-size: 15px; line-height: 1.54; }
	.sp-section-title { font-size: 27px; line-height: 1.19; }
	.sp-lede { font-size: 14px; line-height: 1.57; }
	.sp-section-title-inverse { font-size: 26px; line-height: 1.19; }
	.sp-lede-inverse { font-size: 15px; line-height: 1.57; }
	.sp-feature-num { font-size: 15px; line-height: 1.57; }
	.sp-feature-title { font-size: 15px; line-height: 1.54; }
	.sp-feature-desc { font-size: 14px; line-height: 1.57; }
	.process-step-num { font-size: 14px; line-height: 1.57; }
	.process-step-title { font-size: 14px; line-height: 1.57; }
	.benefit-item p { font-size: 14px; line-height: 1.57; }
	.related-card-icon { font-size: 15px; line-height: 1.54; }
	.related-card-title { font-size: 15px; line-height: 1.57; }
	.page-cta-lede { font-size: 15px; line-height: 1.57; }
}

@media (max-width: 768px) {
	.hero-title { font-size: 36px; line-height: 1.14; }
	.hero-lede { font-size: 15px; line-height: 1.52; }
	.items-strip-item i { font-size: 15px; line-height: 1.52; }
	.sp-section-title { font-size: 26px; line-height: 1.21; }
	.sp-lede { font-size: 14px; line-height: 1.55; }
	.sp-section-title-inverse { font-size: 26px; line-height: 1.21; }
	.sp-lede-inverse { font-size: 14px; line-height: 1.55; }
	.sp-feature-num { font-size: 14px; line-height: 1.55; }
	.sp-feature-title { font-size: 15px; line-height: 1.52; }
	.sp-feature-desc { font-size: 14px; line-height: 1.55; }
	.process-step-num { font-size: 14px; line-height: 1.55; }
	.process-step-title { font-size: 14px; line-height: 1.55; }
	.benefit-item p { font-size: 14px; line-height: 1.55; }
	.related-card-icon { font-size: 15px; line-height: 1.52; }
	.related-card-title { font-size: 14px; line-height: 1.55; }
	.page-cta-lede { font-size: 14px; line-height: 1.55; }
}

@media (max-width: 575px) {
	.hero-title { font-size: 32px; line-height: 1.16; }
	.hero-lede { font-size: 15px; line-height: 1.50; }
	.items-strip-item i { font-size: 15px; line-height: 1.50; }
	.sp-section-title { font-size: 26px; line-height: 1.22; }
	.sp-lede { font-size: 14px; line-height: 1.55; }
	.sp-section-title-inverse { font-size: 26px; line-height: 1.22; }
	.sp-lede-inverse { font-size: 14px; line-height: 1.55; }
	.sp-feature-num { font-size: 14px; line-height: 1.55; }
	.sp-feature-title { font-size: 15px; line-height: 1.50; }
	.sp-feature-desc { font-size: 14px; line-height: 1.55; }
	.process-step-num { font-size: 14px; line-height: 1.55; }
	.process-step-title { font-size: 14px; line-height: 1.55; }
	.benefit-item p { font-size: 14px; line-height: 1.55; }
	.related-card-icon { font-size: 15px; line-height: 1.50; }
	.related-card-title { font-size: 14px; line-height: 1.55; }
	.page-cta-lede { font-size: 14px; line-height: 1.55; }
}
</style>
