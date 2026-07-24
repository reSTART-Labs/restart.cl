<template>
	<!-- Hero -->
	<section class="services-hero relative overflow-hidden">
		<div class="services-hero-bg">
			<img src="/img/office.jpg" alt="">
		</div>
		<div class="services-hero-overlay"></div>

		<div class="relative z-10 container mx-auto px-6 md:px-12 py-36">
			<div class="page-hero-kicker">Servicios &middot; Cat&aacute;logo completo</div>
			<h1 class="services-hero-title">
				Cinco frentes donde <em>empujamos</em> tu negocio
			</h1>
			<p class="services-hero-lede">
				Desde integrar talento a tu equipo hasta construir productos end-to-end o experimentar con inteligencia artificial. Cada servicio es un bloque que combinamos seg&uacute;n tu caso.
			</p>
			<div class="flex flex-wrap items-center gap-3 mt-10">
				<RouterLink to="/#contact" class="btn btn-primary">
					Agendar asesor&iacute;a
				</RouterLink>
				<RouterLink to="/#portfolio" class="btn btn-ghost-dark">
					Ver portafolio <i class="fa fa-arrow-right text-[11px]"></i>
				</RouterLink>
			</div>
		</div>
	</section>

	<!-- Services index -->
	<section class="services-index">
		<div class="container mx-auto px-6 md:px-12">
			<div class="services-list">
				<RouterLink
					v-for="(service, index) in services"
					:key="service.slug"
					:to="`/servicios/${service.slug}`"
					class="service-row"
					:class="service.slug === 'inteligencia-artificial' ? 'is-lab' : ''"
				>
					<div class="service-row-media" :class="service.slug === 'inteligencia-artificial' ? 'is-lab-media' : ''">
						<img :src="service.image" :alt="service.title" loading="lazy">
						<div class="service-row-icon"><i :class="service.icon"></i></div>
					</div>
					<div class="service-row-content">
						<div class="service-row-num">
							{{ String(index + 1).padStart(2, '0') }} &middot; {{ categoryLabel(service.slug) }}
						</div>
						<h3 class="service-row-title">{{ service.title }}</h3>
						<p class="service-row-desc">{{ service.description }}</p>
						<div class="service-row-bullets">
							<span
								v-for="item in service.items"
								:key="item"
								class="service-row-bullet"
							>
								{{ item }}
							</span>
						</div>
						<div class="service-row-cta">
							{{ service.cta }}
							<i class="fa fa-arrow-right text-[10px]"></i>
						</div>
					</div>
				</RouterLink>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="page-cta is-dark">
		<div class="container mx-auto px-6 md:px-12">
			<p class="cta-eyebrow">Primera conversaci&oacute;n &middot; sin costo</p>
			<h2 class="cta-title">
				Agendemos <em>30 minutos</em> y definamos el plan.
			</h2>
			<p class="cta-lede">
				En una sola llamada entendemos tu contexto, definimos alcance y te enviamos una propuesta con tiempos y costo cerrado.
			</p>
			<div class="cta-ctas">
				<RouterLink to="/#contact" class="btn btn-primary">
					Agendar asesor&iacute;a
				</RouterLink>
				<RouterLink to="/#portfolio" class="btn btn-ghost-dark">
					Ver portafolio
				</RouterLink>
			</div>
		</div>
	</section>
</template>

<script setup>
import { services } from '@/data/services.js'

const CATEGORY_MAP = {
	'staffing': 'Equipo',
	'desarrollo-de-software': 'Software',
	'diseno-de-producto': 'Producto',
	'tecnologias-cloud': 'Cloud',
	'inteligencia-artificial': 'IA · Lab',
}

function categoryLabel(slug) {
	return CATEGORY_MAP[slug] || 'Servicio'
}
</script>

<style scoped>
/* ── Hero ── */
.services-hero {
	background: var(--color-primary-900);
}

.services-hero-bg {
	position: absolute;
	inset: 0;
	z-index: 0;
}

.services-hero-bg img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.services-hero-overlay {
	position: absolute;
	inset: 0;
	z-index: 1;
	background: linear-gradient(180deg,
		rgba(4, 23, 30, 0.6) 0%,
		rgba(4, 23, 30, 0.88) 65%,
		var(--color-primary-900) 100%);
}

.page-hero-kicker {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	margin-bottom: 24px;
}

.page-hero-kicker::before {
	content: "";
	display: block;
	width: 24px;
	height: 1px;
	background: var(--color-primary-300);
}

.services-hero-title {
	font-family: var(--font-display);
	font-size: clamp(40px, 5.4vw, 72px);
	font-weight: 300;
	color: #FFFFFF;
	line-height: 1.05;
	letter-spacing: -0.025em;
	max-width: 18ch;
	margin: 0;
}

.services-hero-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.services-hero-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 18px;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.78);
	margin-top: 28px;
	max-width: 54ch;
}

/* ── Services index ── */
.services-index {
	padding: 96px 0;
	background: var(--color-bg);
}

.services-list {
	display: flex;
	flex-direction: column;
	gap: 24px;
}

.service-row {
	display: grid;
	grid-template-columns: 1fr 1.4fr;
	gap: 48px;
	align-items: center;
	padding: 32px;
	border-radius: 28px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
	text-decoration: none;
	color: inherit;
}

.service-row:hover {
	border-color: var(--color-border-strong);
	box-shadow: 0 30px 60px rgba(13, 17, 23, 0.1);
	transform: translateY(-2px);
}

.service-row:nth-child(even) {
	grid-template-columns: 1.4fr 1fr;
}

.service-row:nth-child(even) .service-row-media {
	order: 2;
}

.service-row:nth-child(even) .service-row-content {
	order: 1;
}

.service-row.is-lab {
	border-color: color-mix(in oklab, var(--color-accent-electric) 28%, var(--color-border));
}

.service-row-media {
	position: relative;
	border-radius: 20px;
	overflow: hidden;
	height: 320px;
	background: linear-gradient(165deg,
		var(--color-primary-700),
		var(--color-primary-800),
		var(--color-primary-900));
}

.service-row-media.is-lab-media {
	background: linear-gradient(165deg,
		var(--color-accent-electric),
		var(--color-primary-800),
		var(--color-primary-900));
}

.service-row-media img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: 0.78;
	transition: transform 0.6s ease, opacity 0.3s ease;
}

.service-row:hover .service-row-media img {
	transform: scale(1.04);
	opacity: 0.88;
}

.service-row-media::after {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(135deg,
		color-mix(in oklab, var(--color-primary-800) 70%, transparent),
		transparent 60%);
	pointer-events: none;
}

.service-row-icon {
	position: absolute;
	bottom: 20px;
	left: 20px;
	z-index: 2;
	width: 48px;
	height: 48px;
	border-radius: 14px;
	background: rgba(255, 255, 255, 0.14);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;
	color: #FFFFFF;
}

.service-row-num {
	font-family: var(--font-code);
	font-size: 11px;
	letter-spacing: 0.18em;
	color: var(--color-primary);
	margin-bottom: 8px;
	text-transform: uppercase;
}

.service-row.is-lab .service-row-num {
	color: var(--color-accent-electric);
}

.service-row-title {
	font-family: var(--font-display);
	font-size: clamp(28px, 3vw, 40px);
	font-weight: 300;
	letter-spacing: -0.02em;
	color: var(--color-text);
	margin: 0;
}

.service-row-desc {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 16px;
	line-height: 1.75;
	color: var(--color-text-light);
	margin-top: 16px;
	max-width: 56ch;
}

.service-row-bullets {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	margin-top: 20px;
}

.service-row-bullet {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--color-text-muted);
	background: var(--color-surface-muted);
	border: 1px solid var(--color-border);
	padding: 6px 12px;
	border-radius: 999px;
}

.service-row-cta {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	color: var(--color-primary);
	font-size: 14px;
	font-weight: 500;
	margin-top: 24px;
	transition: gap 0.2s ease;
}

.service-row:hover .service-row-cta {
	gap: 12px;
}

.service-row.is-lab .service-row-cta {
	color: var(--color-accent-electric);
}

/* ── CTA ── */
.page-cta {
	padding: 96px 0;
	text-align: center;
	background: var(--color-surface-muted);
}

.page-cta.is-dark {
	background: var(--color-primary-800);
	color: #FFFFFF;
}

.cta-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	margin-bottom: 16px;
}

.cta-title {
	font-family: var(--font-display);
	font-size: clamp(28px, 3.2vw, 42px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: #FFFFFF;
	max-width: 24ch;
	margin: 0 auto;
}

.cta-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.cta-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 16px;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.7);
	margin: 20px auto 0;
	max-width: 52ch;
}

.cta-ctas {
	display: inline-flex;
	gap: 14px;
	margin-top: 36px;
	flex-wrap: wrap;
	justify-content: center;
}

/* ── Responsive ── */
@media (max-width: 960px) {
	.service-row,
	.service-row:nth-child(even) {
		grid-template-columns: 1fr;
		gap: 20px;
		padding: 20px;
	}

	.service-row:nth-child(even) .service-row-media,
	.service-row:nth-child(even) .service-row-content {
		order: initial;
	}

	.service-row-media {
		height: 220px;
	}

	.service-row-title {
		font-size: clamp(22px, 4vw, 28px);
	}
}

/* ── Escala tipográfica responsiva ── */
@media (max-width: 1919px) {
	.services-hero-title {
		font-size: 66px;
		line-height: 1.06;
	}

	.services-hero-lede {
		font-size: 17px;
		line-height: 1.62;
	}

	.service-row-icon {
		font-size: 21px;
		line-height: 1.26;
	}

	.service-row-title {
		font-size: 38px;
		line-height: 1.12;
	}

	.service-row-desc {
		font-size: 16px;
		line-height: 1.62;
	}

	.service-row-cta {
		font-size: 14px;
		line-height: 1.62;
	}

	.cta-title {
		font-size: 39px;
		line-height: 1.12;
	}

	.cta-lede {
		font-size: 16px;
		line-height: 1.62;
	}
}

@media (max-width: 1439px) {
	.services-hero-title {
		font-size: 59px;
		line-height: 1.07;
	}

	.services-hero-lede {
		font-size: 17px;
		line-height: 1.60;
	}

	.service-row-icon {
		font-size: 20px;
		line-height: 1.28;
	}

	.service-row-title {
		font-size: 34px;
		line-height: 1.14;
	}

	.service-row-desc {
		font-size: 15px;
		line-height: 1.61;
	}

	.service-row-cta {
		font-size: 14px;
		line-height: 1.61;
	}

	.cta-title {
		font-size: 36px;
		line-height: 1.14;
	}

	.cta-lede {
		font-size: 15px;
		line-height: 1.61;
	}
}

@media (max-width: 1199px) {
	.services-hero-title {
		font-size: 52px;
		line-height: 1.08;
	}

	.services-hero-lede {
		font-size: 16px;
		line-height: 1.58;
	}

	.service-row-icon {
		font-size: 18px;
		line-height: 1.30;
	}

	.service-row-title {
		font-size: 31px;
		line-height: 1.15;
	}

	.service-row-desc {
		font-size: 15px;
		line-height: 1.60;
	}

	.service-row-cta {
		font-size: 14px;
		line-height: 1.60;
	}

	.cta-title {
		font-size: 33px;
		line-height: 1.15;
	}

	.cta-lede {
		font-size: 15px;
		line-height: 1.60;
	}
}

@media (max-width: 1079px) {
	.services-hero-title {
		font-size: 46px;
		line-height: 1.10;
	}

	.services-hero-lede {
		font-size: 15px;
		line-height: 1.56;
	}

	.service-row-icon {
		font-size: 18px;
		line-height: 1.32;
	}

	.service-row-title {
		font-size: 28px;
		line-height: 1.17;
	}

	.service-row-desc {
		font-size: 15px;
		line-height: 1.58;
	}

	.service-row-cta {
		font-size: 14px;
		line-height: 1.58;
	}

	.cta-title {
		font-size: 30px;
		line-height: 1.17;
	}

	.cta-lede {
		font-size: 15px;
		line-height: 1.58;
	}
}

@media (max-width: 991px) {
	.services-hero-title {
		font-size: 41px;
		line-height: 1.12;
	}

	.services-hero-lede {
		font-size: 15px;
		line-height: 1.54;
	}

	.service-row-icon {
		font-size: 18px;
		line-height: 1.33;
	}

	.service-row-title {
		font-size: 26px;
		line-height: 1.19;
	}

	.service-row-desc {
		font-size: 15px;
		line-height: 1.57;
	}

	.service-row-cta {
		font-size: 14px;
		line-height: 1.57;
	}

	.cta-title {
		font-size: 27px;
		line-height: 1.19;
	}

	.cta-lede {
		font-size: 15px;
		line-height: 1.57;
	}
}

@media (max-width: 768px) {
	.services-hero-title {
		font-size: 36px;
		line-height: 1.14;
	}

	.services-hero-lede {
		font-size: 15px;
		line-height: 1.52;
	}

	.service-row-icon {
		font-size: 18px;
		line-height: 1.34;
	}

	.service-row-title {
		font-size: 26px;
		line-height: 1.21;
	}

	.service-row-desc {
		font-size: 14px;
		line-height: 1.55;
	}

	.service-row-cta {
		font-size: 14px;
		line-height: 1.55;
	}

	.cta-title {
		font-size: 26px;
		line-height: 1.21;
	}

	.cta-lede {
		font-size: 14px;
		line-height: 1.55;
	}
}

@media (max-width: 575px) {
	.services-hero-title {
		font-size: 32px;
		line-height: 1.16;
	}

	.services-hero-lede {
		font-size: 15px;
		line-height: 1.50;
	}

	.service-row-icon {
		font-size: 18px;
		line-height: 1.35;
	}

	.service-row-title {
		font-size: 26px;
		line-height: 1.22;
	}

	.service-row-desc {
		font-size: 14px;
		line-height: 1.55;
	}

	.service-row-cta {
		font-size: 14px;
		line-height: 1.55;
	}

	.cta-title {
		font-size: 26px;
		line-height: 1.22;
	}

	.cta-lede {
		font-size: 14px;
		line-height: 1.55;
	}
}
</style>
