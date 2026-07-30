<template>
	<template v-if="project">
		<div :style="brandVars" class="lab-project">
			<!-- Hero -->
			<section class="lab-hero">
				<div class="container mx-auto px-6 md:px-12 py-28 md:py-32">
					<div class="lab-hero-grid reveal-stagger">
						<div class="lab-hero-left">
							<!-- <RouterLink to="/labs" class="lab-hero-breadcrumb">
								<i class="fa fa-arrow-left text-[10px]"></i>
								re/START Labs
							</RouterLink> -->

							<h1 class="lab-hero-title">
								<img
									v-if="project.logo"
									:src="project.logo"
									:alt="project.name"
									class="lab-hero-logo"
								>
								<span v-else>{{ project.name }}</span>
							</h1>
							<p class="lab-hero-tagline">{{ project.tagline }}</p>
							<p v-if="project.shortDescription" class="lab-hero-desc">
								{{ project.shortDescription }}
							</p>

							<div class="lab-hero-ctas">
								<a
									v-if="project.url"
									:href="project.url"
									target="_blank"
									rel="noopener"
									class="btn btn-lab"
								>
									{{ project.cta || `Visita ${project.name}` }}
									<i class="fa fa-external-link text-[11px]"></i>
								</a>
								<a href="#capturas" class="btn btn-ghost-dark">
									Ver capturas
									<i class="fa fa-arrow-down text-[11px]"></i>
								</a>
							</div>

							<div v-if="project.platforms?.length" class="lab-hero-platforms">
								<span
									v-for="platform in project.platforms"
									:key="platform"
									class="lab-hero-platform"
								>
									{{ platform }}
								</span>
							</div>
						</div>

						<div class="lab-hero-right">
							<div class="lab-hero-shot">
								<img
									:src="project.heroImage"
									:alt="project.name"
									loading="eager"
								>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Stats strip -->
			<section v-if="project.stats?.length" class="lab-stats">
				<div class="container mx-auto px-6 md:px-12">
					<div class="lab-stats-grid">
						<div
							v-for="stat in project.stats"
							:key="stat.label"
							class="lab-stat"
						>
							<div class="lab-stat-value">{{ stat.value }}</div>
							<div class="lab-stat-label">{{ stat.label }}</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Problem & Solution -->
			<section v-if="project.problem || project.solution" class="lab-ps">
				<div class="container mx-auto px-6 md:px-12">
					<div class="lab-ps-grid">
						<div v-if="project.problem" class="lab-ps-col problem">
							<h3>El problema</h3>
							<p>{{ project.problem }}</p>
						</div>
						<div v-if="project.solution" class="lab-ps-col solution">
							<h3>Nuestra soluci&oacute;n</h3>
							<p>{{ project.solution }}</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Features -->
			<section v-if="project.features?.length" class="lab-features">
				<div class="container mx-auto px-6 md:px-12">
					<div class="lab-features-head">
						<p class="lab-eyebrow lab-eyebrow-brand">Lo que incluye</p>
						<h2 class="lab-section-title">
							Capacidades <em>principales</em>
						</h2>
					</div>

					<div class="lab-features-grid">
						<div
							v-for="feat in project.features"
							:key="feat.title"
							class="lf-card"
						>
							<span class="lf-icon">
								<i :class="feat.icon"></i>
							</span>
							<h4>{{ feat.title }}</h4>
							<p>{{ feat.desc }}</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Screenshots -->
			<section
				v-if="project.screenshots?.length"
				id="capturas"
				class="lab-shots"
			>
				<div class="container mx-auto px-6 md:px-12">
					<div class="lab-shots-head">
						<p class="lab-eyebrow lab-eyebrow-brand">Capturas</p>
						<h2 class="lab-section-title-inverse">
							Un vistazo a la <em>experiencia</em>
						</h2>
					</div>

					<div class="lab-shots-tabs">
						<button
							v-for="(shot, i) in project.screenshots"
							:key="shot.src"
							class="lab-shots-tab"
							:class="{ 'is-active': activeShot === i }"
							@click="activeShot = i"
						>
							{{ shot.label }}
						</button>
					</div>

					<div class="lab-shots-display">
						<div class="lab-shots-frame">
							<img
								:src="project.screenshots[activeShot].src"
								:alt="project.screenshots[activeShot].label"
								loading="lazy"
							>
						</div>
						<p
							v-if="project.screenshots[activeShot].caption"
							class="lab-shots-caption"
						>
							{{ project.screenshots[activeShot].caption }}
						</p>
					</div>
				</div>
			</section>

			<!-- Tech -->
			<section v-if="project.tech?.length" class="lab-tech">
				<div class="container mx-auto px-6 md:px-12">
					<p class="lab-eyebrow lab-eyebrow-brand">Stack</p>
					<h2 class="lab-tech-title">
						Construido con tecnolog&iacute;a <em>moderna</em>
					</h2>
					<div class="lab-tech-chips">
						<span v-for="t in project.tech" :key="t.name" class="tech-chip">
							<span class="tech-chip-dot"></span>
							{{ t.name }}
						</span>
					</div>
				</div>
			</section>

			<!-- Highlights -->
			<section v-if="project.highlights?.length" class="lab-highlights">
				<div class="container mx-auto px-6 md:px-12">
					<div class="lab-highlights-grid">
						<div>
							<p class="lab-eyebrow lab-eyebrow-brand">Destacados t&eacute;cnicos</p>
							<h2 class="lab-section-title-inverse">
								Decisiones que marcan la <em>diferencia</em>
							</h2>
						</div>
						<div class="lab-highlights-list">
							<div
								v-for="h in project.highlights"
								:key="h"
								class="lab-highlight-item"
							>
								<span class="lab-highlight-check">
									<i class="ion-checkmark-round"></i>
								</span>
								<p>{{ h }}</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Related projects -->
			<section v-if="relatedProjects.length" class="lab-related">
				<div class="container mx-auto px-6 md:px-12">
					<div class="lab-features-head">
						<p class="lab-eyebrow">Otros proyectos del lab</p>
						<h2 class="lab-section-title">
							Explora lo que <em>construimos</em>
						</h2>
					</div>

					<div
						:key="`related-${project.slug}`"
						class="lab-related-grid"
					>
						<RouterLink
							v-for="related in relatedProjects"
							:key="related.slug"
							:to="`/labs/${related.slug}`"
							class="lab-related-card"
						>
							<img
								:src="related.heroImage"
								:alt="related.name"
								loading="lazy"
							>
							<div class="lab-related-overlay" :style="relatedOverlayStyle(related)"></div>
							<div class="lab-related-body">
								<p class="lab-related-cat" :style="`color: ${related.brandColor}`">
									{{ related.category || 'Producto' }}
								</p>
								<h3>{{ related.name }}</h3>
								<p class="lab-related-tagline">{{ related.tagline }}</p>
							</div>
						</RouterLink>
					</div>
				</div>
			</section>

			<!-- CTA -->
			<section class="page-cta is-dark">
				<div class="container mx-auto px-6 md:px-12">
					<i :class="[ctaIcon, 'lab-cta-icon']"></i>
					<h2 class="cta-title">
						&iquest;Listo para <em>empezar</em>?
					</h2>
					<p class="cta-lede">
						Conversemos sobre tu caso de uso. Agenda una asesor&iacute;a gratuita y definimos juntos el camino m&aacute;s corto a producci&oacute;n.
					</p>
					<div class="cta-ctas">
						<a
							v-if="project.url"
							:href="project.url"
							target="_blank"
							rel="noopener"
							class="btn btn-lab"
						>
							{{ project.cta || `Visita ${project.name}` }}
							<i class="fa fa-arrow-right text-[11px]"></i>
						</a>
						<RouterLink to="/labs" class="btn btn-ghost-dark">
							Ver todas las soluciones
						</RouterLink>
					</div>
				</div>
			</section>
		</div>
	</template>

	<section v-else class="py-20 px-4 text-center">
		<div class="container mx-auto">
			<h3 class="text-2xl font-light uppercase tracking-wide text-text">Proyecto no encontrado</h3>
			<p class="text-text-light mt-4">El proyecto que buscas no existe.</p>
			<RouterLink to="/labs" class="btn btn-primary mt-8 inline-flex">
				Volver a Labs
			</RouterLink>
		</div>
	</section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { labsProjects } from '@/data/labsProjects.js'

const route = useRoute()
const project = computed(() => labsProjects.find(p => p.slug === route.params.slug))

const relatedProjects = computed(() => {
	if (!project.value) return []
	return labsProjects.filter(p => p.slug !== project.value.slug)
})

const activeShot = ref(0)
watch(() => route.params.slug, () => { activeShot.value = 0 })

const brandVars = computed(() => {
	if (!project.value) return ''
	const brand = project.value.brandColor || '#41BECF'
	const dark = project.value.brandDark || '#141218'
	return {
		'--brand': brand,
		'--brand-dark': dark,
	}
})

const ctaIcon = computed(() => {
	return project.value?.ctaIcon || 'ion-ios-bolt-outline'
})

function relatedOverlayStyle(related) {
	const bg = related.brandDark || '#141218'
	return `background: linear-gradient(to top, ${bg}ee 0%, ${bg}55 40%, transparent 100%);`
}
</script>

<style scoped>
/* ========================================================================
   HERO
   ======================================================================== */
.lab-hero {
	position: relative;
	overflow: hidden;
	background:
		radial-gradient(ellipse 60% 60% at 20% 10%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 55%),
		radial-gradient(ellipse 50% 50% at 85% 90%, rgba(50, 191, 212, 0.14), transparent 55%),
		var(--color-primary-900);
}

.lab-hero-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 64px;
	align-items: center;
}

.lab-hero-breadcrumb {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.5);
	margin-bottom: 24px;
	text-decoration: none;
	transition: color 0.2s ease;
}

.lab-hero-breadcrumb:hover {
	color: var(--brand);
}

.lab-hero-title {
	display: inline-flex;
	align-items: center;
	font-family: var(--font-display);
	font-size: clamp(40px, 5.4vw, 68px);
	color: #FFFFFF;
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1;
	margin: 0;
	white-space: nowrap;
}

.lab-hero-logo {
	display: block;
	height: 1.3em;
	width: auto;
	object-fit: contain;
}

.lab-hero-tagline {
	font-family: var(--font-serif);
	font-style: italic;
	font-size: 22px;
	color: var(--brand);
	margin-top: 10px;
	font-weight: 300;
	line-height: 1.3;
}

.lab-hero-desc {
	font-size: 16px;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.72);
	margin-top: 24px;
	max-width: 52ch;
}

.lab-hero-ctas {
	display: flex;
	gap: 12px;
	margin-top: 32px;
	flex-wrap: wrap;
}

.lab-hero-platforms {
	display: flex;
	gap: 8px;
	margin-top: 28px;
	flex-wrap: wrap;
}

.lab-hero-platform {
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.2em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.55);
	padding: 5px 12px;
	border-radius: 999px;
	border: 1px solid rgba(255, 255, 255, 0.15);
}

.lab-hero-right {
	position: relative;
}

.lab-hero-shot {
	position: relative;
	border-radius: 20px;
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
}

.lab-hero-shot::before {
	content: "";
	position: absolute;
	inset: -16px;
	background: radial-gradient(circle at center, color-mix(in oklab, var(--brand) 18%, transparent), transparent 60%);
	z-index: -1;
	filter: blur(40px);
	pointer-events: none;
}

.lab-hero-shot img {
	display: block;
	width: 100%;
	height: auto;
}

/* Brand-colored primary button for labs */
.btn-lab {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-family: var(--font-sans);
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	padding: 14px 28px;
	border-radius: 999px;
	border: 1px solid var(--brand);
	background: var(--brand);
	color: var(--brand-dark);
	text-decoration: none;
	cursor: pointer;
	transition: all 0.2s ease;
	line-height: 1;
}

.btn-lab:hover {
	transform: translateY(-1px);
	box-shadow: 0 10px 30px color-mix(in oklab, var(--brand) 30%, transparent);
}

/* ========================================================================
   STATS STRIP
   ======================================================================== */
.lab-stats {
	background: var(--color-surface);
	border-top: 1px solid var(--color-border-soft);
	border-bottom: 1px solid var(--color-border-soft);
	padding: 40px 0;
}

.lab-stats-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

.lab-stat {
	text-align: center;
	padding: 0 24px;
	border-right: 1px solid var(--color-border);
}

.lab-stat:last-child {
	border-right: none;
}

.lab-stat-value {
	font-family: var(--font-display);
	font-size: clamp(30px, 2.8vw, 40px);
	font-weight: 300;
	color: var(--brand);
	letter-spacing: -0.025em;
	line-height: 1;
}

.lab-stat-label {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: var(--color-text-muted);
	margin-top: 12px;
}

/* ========================================================================
   PROBLEM/SOLUTION
   ======================================================================== */
.lab-ps {
	padding: 96px 0;
	background: var(--color-bg);
}

.lab-ps-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 64px;
	max-width: 1060px;
	margin: 0 auto;
}

.lab-ps-col h3 {
	font-family: var(--font-sans);
	font-size: 14px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	margin: 0 0 16px;
}

.lab-ps-col.problem h3 {
	color: var(--color-text-muted);
}

.lab-ps-col.solution h3 {
	color: var(--brand);
}

.lab-ps-col p {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 18px;
	line-height: 1.8;
	color: var(--color-text);
	margin: 0;
}

/* ========================================================================
   SECTION HELPERS
   ======================================================================== */
.lab-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin-bottom: 18px;
}

.lab-eyebrow-brand {
	color: var(--brand);
}

.lab-section-title {
	font-family: var(--font-display);
	font-size: clamp(28px, 3.2vw, 42px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: var(--color-text);
	margin: 0;
}

.lab-section-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--brand);
}

.lab-section-title-inverse {
	font-family: var(--font-display);
	font-size: clamp(28px, 3.2vw, 42px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: #FFFFFF;
	margin: 0;
}

.lab-section-title-inverse :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--brand);
}

/* ========================================================================
   FEATURES GRID
   ======================================================================== */
.lab-features {
	padding: 96px 0;
	background: var(--color-surface-muted);
}

.lab-features-head {
	text-align: center;
	margin-bottom: 56px;
}

.lab-features-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 16px;
}

.lf-card {
	padding: 24px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 20px;
	transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}

.lf-card:hover {
	box-shadow: 0 12px 28px rgba(13, 17, 23, 0.08);
	transform: translateY(-3px);
	border-color: color-mix(in oklab, var(--brand) 30%, var(--color-border));
}

.lf-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	border-radius: 14px;
	background: color-mix(in oklab, var(--brand) 12%, transparent);
	color: var(--brand);
	font-size: 18px;
	margin-bottom: 18px;
}

.lf-card h4 {
	font-family: var(--font-sans);
	font-size: 16px;
	font-weight: 700;
	letter-spacing: -0.005em;
	color: var(--color-text);
	margin: 0;
}

.lf-card p {
	font-size: 13px;
	line-height: 1.6;
	color: var(--color-text-light);
	margin-top: 10px;
}

/* ========================================================================
   SCREENSHOTS
   ======================================================================== */
.lab-shots {
	padding: 96px 0;
	background: var(--color-primary-800);
	color: #FFFFFF;
}

.lab-shots-head {
	text-align: center;
	margin-bottom: 48px;
}

.lab-shots-tabs {
	display: flex;
	justify-content: center;
	gap: 8px;
	flex-wrap: wrap;
	margin-bottom: 40px;
}

.lab-shots-tab {
	font-family: var(--font-sans);
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	padding: 10px 20px;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	color: rgba(255, 255, 255, 0.7);
	transition: all 0.2s ease;
	cursor: pointer;
}

.lab-shots-tab:hover {
	background: rgba(255, 255, 255, 0.12);
	color: #FFFFFF;
}

.lab-shots-tab.is-active {
	background: var(--brand);
	color: var(--brand-dark);
	border-color: var(--brand);
}

.lab-shots-display {
	max-width: 960px;
	margin: 0 auto;
	position: relative;
}

.lab-shots-display::before {
	content: "";
	position: absolute;
	inset: -16px;
	background: radial-gradient(circle at center, color-mix(in oklab, var(--brand) 16%, transparent), transparent 60%);
	filter: blur(40px);
	z-index: 0;
}

.lab-shots-frame {
	position: relative;
	border-radius: 20px;
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
	z-index: 1;
}

.lab-shots-frame img {
	width: 100%;
	height: auto;
	display: block;
}

.lab-shots-caption {
	text-align: center;
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 14px;
	color: rgba(255, 255, 255, 0.6);
	margin: 24px auto 0;
	max-width: 48ch;
	line-height: 1.7;
}

/* ========================================================================
   TECH
   ======================================================================== */
.lab-tech {
	padding: 80px 0;
	text-align: center;
	background: var(--color-bg);
}

.lab-tech-title {
	font-family: var(--font-display);
	font-size: clamp(24px, 2.6vw, 32px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: var(--color-text);
	max-width: 24ch;
	margin: 0 auto 32px;
}

.lab-tech-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--brand);
}

.lab-tech-chips {
	display: inline-flex;
	gap: 8px;
	flex-wrap: wrap;
	justify-content: center;
}

.tech-chip {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 13px;
	color: var(--color-text);
	background: var(--color-surface-muted);
	border: 1px solid var(--color-border);
	padding: 8px 16px;
	border-radius: 999px;
}

.tech-chip-dot {
	width: 6px;
	height: 6px;
	border-radius: 999px;
	background: var(--brand);
}

/* ========================================================================
   HIGHLIGHTS
   ======================================================================== */
.lab-highlights {
	padding: 96px 0;
	background: var(--brand-dark);
	color: #FFFFFF;
}

.lab-highlights-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 64px;
	align-items: center;
	max-width: 1060px;
	margin: 0 auto;
}

.lab-highlights-list {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.lab-highlight-item {
	padding: 18px 20px;
	border-radius: 14px;
	background: color-mix(in oklab, var(--brand) 5%, transparent);
	border: 1px solid color-mix(in oklab, var(--brand) 15%, transparent);
	display: flex;
	gap: 14px;
	align-items: center;
	transition: border-color 0.2s ease;
}

.lab-highlight-item:hover {
	border-color: color-mix(in oklab, var(--brand) 40%, transparent);
}

.lab-highlight-check {
	flex-shrink: 0;
	width: 28px;
	height: 28px;
	border-radius: 999px;
	background: color-mix(in oklab, var(--brand) 22%, transparent);
	color: var(--brand);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
}

.lab-highlight-item p {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.85);
	line-height: 1.5;
	margin: 0;
}

/* ========================================================================
   RELATED PROJECTS
   ======================================================================== */
.lab-related {
	padding: 96px 0;
	background: var(--color-bg);
}

.lab-related-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
}

.lab-related-card {
	position: relative;
	border-radius: 20px;
	overflow: hidden;
	height: 240px;
	display: block;
	text-decoration: none;
	transition: transform 0.3s ease;
}

.lab-related-card:hover {
	transform: translateY(-3px);
}

.lab-related-card img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: 0.55;
	transition: opacity 0.3s ease, transform 0.6s ease;
}

.lab-related-card:hover img {
	opacity: 0.75;
	transform: scale(1.05);
}

.lab-related-overlay {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.lab-related-body {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20px;
	z-index: 2;
	color: #FFFFFF;
}

.lab-related-cat {
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	margin: 0 0 4px;
}

.lab-related-body h3 {
	font-size: 18px;
	font-weight: 700;
	letter-spacing: -0.005em;
	color: #FFFFFF;
	margin: 0;
}

.lab-related-tagline {
	font-size: 13px;
	color: rgba(255, 255, 255, 0.7);
	margin-top: 4px;
}

/* ========================================================================
   CTA
   ======================================================================== */
.page-cta {
	padding: 96px 0;
	text-align: center;
	background: var(--color-surface-muted);
}

.page-cta.is-dark {
	background: var(--color-primary-800);
	color: #FFFFFF;
}

.lab-cta-icon {
	font-size: 40px;
	color: var(--brand);
	display: block;
	margin-bottom: 20px;
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
	color: var(--brand);
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

/* ========================================================================
   RESPONSIVE
   ======================================================================== */
@media (max-width: 1024px) {
	.lab-hero-grid {
		grid-template-columns: 1fr;
		gap: 40px;
	}

	.lab-hero-right {
		order: -1;
	}

	.lab-stats-grid {
		grid-template-columns: 1fr 1fr;
		gap: 32px 0;
	}

	.lab-stat {
		border-right: none;
	}

	.lab-ps-grid {
		grid-template-columns: 1fr;
		gap: 40px;
	}

	.lab-features-grid {
		grid-template-columns: 1fr 1fr;
	}

	.lab-highlights-grid {
		grid-template-columns: 1fr;
		gap: 40px;
	}

	.lab-related-grid {
		grid-template-columns: 1fr;
	}
}

@media (max-width: 640px) {
	.lab-features-grid {
		grid-template-columns: 1fr;
	}
}

/* ========================================================================
   RESPONSIVE TYPE SCALE
   ======================================================================== */
@media (max-width: 1919px) {
	.lab-hero-title {
		font-size: 63px;
		line-height: 1.06;
	}
	.lab-hero-tagline {
		font-size: 21px;
		line-height: 1.26;
	}
	.lab-hero-desc {
		font-size: 16px;
		line-height: 1.62;
	}
	.lab-stat-value {
		font-size: 38px;
		line-height: 1.12;
	}
	.lab-ps-col h3 {
		font-size: 14px;
		line-height: 1.62;
	}
	.lab-ps-col p {
		font-size: 17px;
		line-height: 1.62;
	}
	.lab-section-title {
		font-size: 39px;
		line-height: 1.12;
	}
	.lab-section-title-inverse {
		font-size: 39px;
		line-height: 1.12;
	}
	.lf-icon {
		font-size: 17px;
		line-height: 1.62;
	}
	.lf-card h4 {
		font-size: 16px;
		line-height: 1.62;
	}
	.lab-shots-caption {
		font-size: 14px;
		line-height: 1.62;
	}
	.lab-tech-title {
		font-size: 30px;
		line-height: 1.26;
	}
	.lab-highlight-item p {
		font-size: 14px;
		line-height: 1.62;
	}
	.lab-related-body h3 {
		font-size: 17px;
		line-height: 1.62;
	}
	.lab-cta-icon {
		font-size: 38px;
		line-height: 1.12;
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
	.lab-hero-title {
		font-size: 56px;
		line-height: 1.07;
	}
	.lab-hero-tagline {
		font-size: 20px;
		line-height: 1.28;
	}
	.lab-hero-desc {
		font-size: 15px;
		line-height: 1.61;
	}
	.lab-stat-value {
		font-size: 34px;
		line-height: 1.14;
	}
	.lab-ps-col h3 {
		font-size: 14px;
		line-height: 1.61;
	}
	.lab-ps-col p {
		font-size: 17px;
		line-height: 1.60;
	}
	.lab-section-title {
		font-size: 36px;
		line-height: 1.14;
	}
	.lab-section-title-inverse {
		font-size: 36px;
		line-height: 1.14;
	}
	.lf-icon {
		font-size: 17px;
		line-height: 1.60;
	}
	.lf-card h4 {
		font-size: 15px;
		line-height: 1.61;
	}
	.lab-shots-caption {
		font-size: 14px;
		line-height: 1.61;
	}
	.lab-tech-title {
		font-size: 28px;
		line-height: 1.28;
	}
	.lab-highlight-item p {
		font-size: 14px;
		line-height: 1.61;
	}
	.lab-related-body h3 {
		font-size: 17px;
		line-height: 1.60;
	}
	.lab-cta-icon {
		font-size: 34px;
		line-height: 1.14;
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
	.lab-hero-title {
		font-size: 49px;
		line-height: 1.08;
	}
	.lab-hero-tagline {
		font-size: 18px;
		line-height: 1.30;
	}
	.lab-hero-desc {
		font-size: 15px;
		line-height: 1.60;
	}
	.lab-stat-value {
		font-size: 31px;
		line-height: 1.15;
	}
	.lab-ps-col h3 {
		font-size: 14px;
		line-height: 1.60;
	}
	.lab-ps-col p {
		font-size: 16px;
		line-height: 1.58;
	}
	.lab-section-title {
		font-size: 33px;
		line-height: 1.15;
	}
	.lab-section-title-inverse {
		font-size: 33px;
		line-height: 1.15;
	}
	.lf-icon {
		font-size: 16px;
		line-height: 1.58;
	}
	.lf-card h4 {
		font-size: 15px;
		line-height: 1.60;
	}
	.lab-shots-caption {
		font-size: 14px;
		line-height: 1.60;
	}
	.lab-tech-title {
		font-size: 27px;
		line-height: 1.30;
	}
	.lab-highlight-item p {
		font-size: 14px;
		line-height: 1.60;
	}
	.lab-related-body h3 {
		font-size: 16px;
		line-height: 1.58;
	}
	.lab-cta-icon {
		font-size: 31px;
		line-height: 1.15;
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
	.lab-hero-title {
		font-size: 44px;
		line-height: 1.10;
	}
	.lab-hero-tagline {
		font-size: 18px;
		line-height: 1.32;
	}
	.lab-hero-desc {
		font-size: 15px;
		line-height: 1.58;
	}
	.lab-stat-value {
		font-size: 28px;
		line-height: 1.17;
	}
	.lab-ps-col h3 {
		font-size: 14px;
		line-height: 1.58;
	}
	.lab-ps-col p {
		font-size: 15px;
		line-height: 1.56;
	}
	.lab-section-title {
		font-size: 30px;
		line-height: 1.17;
	}
	.lab-section-title-inverse {
		font-size: 30px;
		line-height: 1.17;
	}
	.lf-icon {
		font-size: 15px;
		line-height: 1.56;
	}
	.lf-card h4 {
		font-size: 15px;
		line-height: 1.58;
	}
	.lab-shots-caption {
		font-size: 14px;
		line-height: 1.58;
	}
	.lab-tech-title {
		font-size: 25px;
		line-height: 1.32;
	}
	.lab-highlight-item p {
		font-size: 14px;
		line-height: 1.58;
	}
	.lab-related-body h3 {
		font-size: 15px;
		line-height: 1.56;
	}
	.lab-cta-icon {
		font-size: 28px;
		line-height: 1.17;
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
	.lab-hero-title {
		font-size: 39px;
		line-height: 1.12;
	}
	.lab-hero-tagline {
		font-size: 18px;
		line-height: 1.33;
	}
	.lab-hero-desc {
		font-size: 15px;
		line-height: 1.57;
	}
	.lab-stat-value {
		font-size: 26px;
		line-height: 1.19;
	}
	.lab-ps-col h3 {
		font-size: 14px;
		line-height: 1.57;
	}
	.lab-ps-col p {
		font-size: 15px;
		line-height: 1.54;
	}
	.lab-section-title {
		font-size: 27px;
		line-height: 1.19;
	}
	.lab-section-title-inverse {
		font-size: 27px;
		line-height: 1.19;
	}
	.lf-icon {
		font-size: 15px;
		line-height: 1.54;
	}
	.lf-card h4 {
		font-size: 15px;
		line-height: 1.57;
	}
	.lab-shots-caption {
		font-size: 14px;
		line-height: 1.57;
	}
	.lab-tech-title {
		font-size: 23px;
		line-height: 1.33;
	}
	.lab-highlight-item p {
		font-size: 14px;
		line-height: 1.57;
	}
	.lab-related-body h3 {
		font-size: 15px;
		line-height: 1.54;
	}
	.lab-cta-icon {
		font-size: 26px;
		line-height: 1.19;
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
	.lab-hero-title {
		font-size: 34px;
		line-height: 1.14;
	}
	.lab-hero-tagline {
		font-size: 18px;
		line-height: 1.34;
	}
	.lab-hero-desc {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-stat-value {
		font-size: 26px;
		line-height: 1.21;
	}
	.lab-ps-col h3 {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-ps-col p {
		font-size: 15px;
		line-height: 1.52;
	}
	.lab-section-title {
		font-size: 26px;
		line-height: 1.21;
	}
	.lab-section-title-inverse {
		font-size: 26px;
		line-height: 1.21;
	}
	.lf-icon {
		font-size: 15px;
		line-height: 1.52;
	}
	.lf-card h4 {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-shots-caption {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-tech-title {
		font-size: 21px;
		line-height: 1.34;
	}
	.lab-highlight-item p {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-related-body h3 {
		font-size: 15px;
		line-height: 1.52;
	}
	.lab-cta-icon {
		font-size: 26px;
		line-height: 1.21;
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
	.lab-hero-title {
		font-size: 30px;
		line-height: 1.16;
	}
	.lab-hero-tagline {
		font-size: 18px;
		line-height: 1.35;
	}
	.lab-hero-desc {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-stat-value {
		font-size: 26px;
		line-height: 1.22;
	}
	.lab-ps-col h3 {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-ps-col p {
		font-size: 15px;
		line-height: 1.50;
	}
	.lab-section-title {
		font-size: 26px;
		line-height: 1.22;
	}
	.lab-section-title-inverse {
		font-size: 26px;
		line-height: 1.22;
	}
	.lf-icon {
		font-size: 15px;
		line-height: 1.50;
	}
	.lf-card h4 {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-shots-caption {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-tech-title {
		font-size: 20px;
		line-height: 1.35;
	}
	.lab-highlight-item p {
		font-size: 14px;
		line-height: 1.55;
	}
	.lab-related-body h3 {
		font-size: 15px;
		line-height: 1.50;
	}
	.lab-cta-icon {
		font-size: 26px;
		line-height: 1.22;
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
