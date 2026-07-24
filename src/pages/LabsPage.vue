<template>
	<!-- Hero -->
	<section class="labs-hero relative overflow-hidden">
		<div class="relative z-10 container mx-auto px-6 md:px-12 py-36">
			<p class="page-hero-kicker">re/START Labs</p>
			<h1 class="labs-hero-title">
				Laboratorio de productos que <em>exploran</em>, validan y ven la luz.
			</h1>
			<p class="labs-hero-lede">
				Un espacio donde prototipamos ideas, probamos tecnolog&iacute;as y lanzamos productos propios. Algunos escalan, otros ense&ntilde;an &mdash; todos dejan algo.
			</p>

			<div class="labs-hero-stats">
				<div class="labs-hero-stat">
					<span class="labs-hero-dot"></span>
					<strong>{{ projects.length }}</strong> proyectos vivos
				</div>
				<div class="labs-hero-divider">&middot;</div>
				<div class="labs-hero-stat">
					<strong>{{ yearRange }}</strong> activo
				</div>
				<div class="labs-hero-divider">&middot;</div>
				<RouterLink to="/#contact" class="labs-hero-stat labs-hero-cta">
					&iquest;Tu idea el siguiente?
					<i class="fa fa-arrow-right text-[10px]"></i>
				</RouterLink>
			</div>
		</div>
	</section>

	<!-- Masonry -->
	<section class="py-16 md:py-20 px-6 md:px-12 bg-features-bg">
		<div class="container mx-auto">
			<div class="masonry">
				<component
					:is="project.external ? 'a' : 'RouterLink'"
					v-for="(project, i) in projects"
					:key="project.slug"
					v-bind="cardBindings(project)"
					class="masonry-item group no-underline"
					:class="cardSizeClass(i)"
				>
					<div
						class="masonry-card"
						:style="`background: ${project.brandDark || '#141218'}`"
					>
						<!-- Image -->
						<div v-if="project.heroImage" class="masonry-image">
							<img
								:src="project.heroImage"
								:alt="project.name"
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							>
							<div
								class="absolute inset-0"
								:style="`background: linear-gradient(to top, ${project.brandDark || '#141218'}ee 0%, ${project.brandDark || '#141218'}22 50%, transparent 100%)`"
							></div>
							<div
								v-if="project.category"
								class="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm"
								:style="`background: ${project.brandColor}22; color: ${project.brandColor}; border: 1px solid ${project.brandColor}44`"
							>
								{{ project.category }}
							</div>
							<div
								v-if="project.external"
								class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 group-hover:bg-white/20 transition-colors"
							>
								<i class="fa fa-external-link text-xs"></i>
							</div>
						</div>

						<!-- Content -->
						<div class="masonry-content">
							<h3 class="text-white text-xl md:text-2xl font-semibold leading-tight">
								{{ project.name }}
							</h3>
							<p
								class="text-sm md:text-base font-medium mt-1.5"
								:style="`color: ${project.brandColor}`"
							>
								{{ project.tagline }}
							</p>
							<p
								v-if="project.shortDescription"
								class="text-white/60 text-sm leading-relaxed mt-4"
							>
								{{ project.shortDescription }}
							</p>

							<div class="flex flex-wrap items-center gap-2 mt-5">
								<span
									v-for="platform in project.platforms"
									:key="platform"
									class="text-[10px] text-white/50 font-medium uppercase tracking-widest px-2 py-1 rounded-full border border-white/15"
								>
									{{ platform }}
								</span>
								<span v-if="project.year" class="text-[10px] text-white/40 font-medium uppercase tracking-widest ml-auto">
									{{ project.year }}
								</span>
							</div>

							<span
								class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mt-5 group-hover:gap-3 transition-all"
								:style="`color: ${project.brandColor}`"
							>
								{{ project.external ? 'Visitar sitio' : 'Ver proyecto' }}
								<i class="fa fa-arrow-right text-[10px]"></i>
							</span>
						</div>
					</div>
				</component>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="page-cta is-dark">
		<div class="container mx-auto px-6 md:px-12">
			<p class="cta-eyebrow">Construye con nosotros</p>
			<h2 class="cta-title">
				&iquest;Tu pr&oacute;xima idea puede ser el <em>siguiente lab</em>?
			</h2>
			<p class="cta-lede">
				Si tienes un producto en mente y necesitas un equipo que lo construya con el rigor de un lab y la velocidad de un startup, hablemos.
			</p>
			<div class="cta-ctas">
				<RouterLink to="/#contact" class="btn btn-primary">
					Conversemos
				</RouterLink>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { labsProjects } from '@/data/labsProjects.js'

const projects = labsProjects

const yearRange = computed(() => {
	const years = projects.map(p => p.year).filter(Boolean)
	if (!years.length) return ''
	const min = Math.min(...years)
	const max = Math.max(...years)
	return min === max ? `${min}` : `${min}–${max}`
})

function cardBindings(project) {
	if (project.external) {
		return { href: project.url, target: '_blank', rel: 'noopener' }
	}
	return { to: `/labs/${project.slug}` }
}

function cardSizeClass(index) {
	const pattern = ['is-tall', '', '', 'is-tall', '', '']
	return pattern[index % pattern.length]
}
</script>

<style scoped>
/* ── Hero (idéntico a la propuesta) ── */
.labs-hero {
	background:
		radial-gradient(ellipse 50% 50% at 15% 10%, rgba(79, 61, 245, 0.22), transparent 55%),
		radial-gradient(ellipse 50% 50% at 85% 90%, rgba(50, 191, 212, 0.2), transparent 55%),
		radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245, 159, 36, 0.06), transparent 60%),
		var(--color-primary-900);
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

.labs-hero-title {
	font-family: var(--font-display);
	font-size: clamp(40px, 5.4vw, 72px);
	font-weight: 300;
	color: #FFFFFF;
	line-height: 1.05;
	letter-spacing: -0.025em;
	max-width: 18ch;
	margin: 0;
}

.labs-hero-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.labs-hero-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 18px;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.78);
	margin-top: 28px;
	max-width: 54ch;
}

.labs-hero-stats {
	display: inline-flex;
	align-items: center;
	gap: 24px;
	flex-wrap: wrap;
	margin-top: 40px;
	padding: 14px 24px;
	background: rgba(255, 255, 255, 0.06);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 999px;
}

.labs-hero-stat {
	font-size: 12px;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.8);
	display: inline-flex;
	align-items: center;
	gap: 8px;
	text-decoration: none;
}

.labs-hero-stat :deep(strong),
.labs-hero-stat strong {
	color: var(--color-primary-300);
	font-weight: 700;
}

.labs-hero-dot {
	display: inline-block;
	width: 6px;
	height: 6px;
	border-radius: 999px;
	background: var(--color-primary-300);
}

.labs-hero-divider {
	color: rgba(255, 255, 255, 0.35);
	font-size: 12px;
}

.labs-hero-cta {
	transition: gap 0.2s ease, color 0.2s ease;
}

.labs-hero-cta:hover {
	color: var(--color-primary-300);
	gap: 12px;
}

.labs-hero-cta i {
	color: var(--color-primary-300);
}

.masonry {
	column-count: 1;
	column-gap: 24px;
}

@media (min-width: 640px) {
	.masonry { column-count: 2; }
}

@media (min-width: 1024px) {
	.masonry { column-count: 3; }
}

.masonry-item {
	display: block;
	break-inside: avoid;
	margin-bottom: 24px;
	transition: transform 0.3s ease;
}

.masonry-item:hover {
	transform: translateY(-4px);
}

.masonry-card {
	border-radius: 20px;
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.06);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
	transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.masonry-item:hover .masonry-card {
	border-color: rgba(255, 255, 255, 0.18);
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

.masonry-image {
	position: relative;
	overflow: hidden;
	aspect-ratio: 4 / 3;
}

.masonry-item.is-tall .masonry-image {
	aspect-ratio: 3 / 4;
}

.masonry-content {
	padding: 24px;
}

@media (min-width: 768px) {
	.masonry-content {
		padding: 28px;
	}
}

/* ── CTA (idéntico a la propuesta) ── */
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

/* ── Escala tipográfica responsiva ── */
@media (max-width: 1919px) {
	.labs-hero-title {
		font-size: 66px;
		line-height: 1.06;
	}
	.cta-title {
		font-size: 39px;
		line-height: 1.12;
	}
	.labs-hero-lede {
		font-size: 17px;
		line-height: 1.62;
	}
	.cta-lede {
		font-size: 16px;
		line-height: 1.62;
	}
}

@media (max-width: 1439px) {
	.labs-hero-title {
		font-size: 59px;
		line-height: 1.07;
	}
	.cta-title {
		font-size: 36px;
		line-height: 1.14;
	}
	.labs-hero-lede {
		font-size: 17px;
		line-height: 1.60;
	}
	.cta-lede {
		font-size: 15px;
		line-height: 1.61;
	}
}

@media (max-width: 1199px) {
	.labs-hero-title {
		font-size: 52px;
		line-height: 1.08;
	}
	.cta-title {
		font-size: 33px;
		line-height: 1.15;
	}
	.labs-hero-lede {
		font-size: 16px;
		line-height: 1.58;
	}
	.cta-lede {
		font-size: 15px;
		line-height: 1.60;
	}
}

@media (max-width: 1079px) {
	.labs-hero-title {
		font-size: 46px;
		line-height: 1.10;
	}
	.cta-title {
		font-size: 30px;
		line-height: 1.17;
	}
	.labs-hero-lede {
		font-size: 15px;
		line-height: 1.56;
	}
	.cta-lede {
		font-size: 15px;
		line-height: 1.58;
	}
}

@media (max-width: 991px) {
	.labs-hero-title {
		font-size: 41px;
		line-height: 1.12;
	}
	.cta-title {
		font-size: 27px;
		line-height: 1.19;
	}
	.labs-hero-lede {
		font-size: 15px;
		line-height: 1.54;
	}
	.cta-lede {
		font-size: 15px;
		line-height: 1.57;
	}
}

@media (max-width: 768px) {
	.labs-hero-title {
		font-size: 36px;
		line-height: 1.14;
	}
	.cta-title {
		font-size: 26px;
		line-height: 1.21;
	}
	.labs-hero-lede {
		font-size: 15px;
		line-height: 1.52;
	}
	.cta-lede {
		font-size: 14px;
		line-height: 1.55;
	}
}

@media (max-width: 575px) {
	.labs-hero-title {
		font-size: 32px;
		line-height: 1.16;
	}
	.cta-title {
		font-size: 26px;
		line-height: 1.22;
	}
	.labs-hero-lede {
		font-size: 15px;
		line-height: 1.50;
	}
	.cta-lede {
		font-size: 14px;
		line-height: 1.55;
	}
}
</style>
