<template>
	<!-- Hero -->
	<section class="pf-hero relative overflow-hidden">
		<div class="relative z-10 container mx-auto px-6 md:px-12 py-36 reveal-stagger">
			<p class="pf-kicker">Portafolio</p>
			<h1 class="pf-title">
				Productos propios y proyectos que <em>construimos</em> con clientes.
			</h1>
			<p class="pf-lede">
				Una selecci&oacute;n de lo que hemos dise&ntilde;ado, desarrollado y puesto en producci&oacute;n: del laboratorio propio a las soluciones a medida.
			</p>
		</div>
	</section>

	<!-- Listado -->
	<section class="py-16 md:py-20 px-6 md:px-12 bg-features-bg">
		<div class="container mx-auto">
			<div class="flex flex-wrap items-center justify-center gap-2 mb-12">
				<button
					v-for="cat in categories"
					:key="cat.value"
					class="px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
					:class="activeCategory === cat.value
						? 'bg-primary text-white'
						: 'bg-surface text-text-muted hover:text-primary hover:bg-primary-pastel'"
					@click="activeCategory = cat.value"
				>
					{{ cat.label }}
				</button>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<ProjectCard v-for="project in filtered" :key="project.slug" :project="project" />
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="pf-cta">
		<div class="container mx-auto px-6 md:px-12">
			<p class="pf-cta-eyebrow">Construye con nosotros</p>
			<h2 class="pf-cta-title">
				&iquest;Tu proyecto puede ser el <em>siguiente</em>?
			</h2>
			<div class="mt-9">
				<RouterLink to="/#contact" class="btn btn-primary">Conversemos</RouterLink>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects.js'

const categories = [
	{ value: 'all', label: 'Todos' },
	{ value: 'labs', label: 'Propios' },
	{ value: 'customer', label: 'Clientes' },
]

const activeCategory = ref('all')

const filtered = computed(() =>
	activeCategory.value === 'all'
		? projects
		: projects.filter(p => p.type === activeCategory.value),
)
</script>

<style scoped>
.pf-hero {
	background:
		radial-gradient(ellipse 50% 50% at 15% 10%, rgba(79, 61, 245, 0.22), transparent 55%),
		radial-gradient(ellipse 50% 50% at 85% 90%, rgba(111, 224, 237, 0.2), transparent 55%),
		var(--color-primary-900);
}

.pf-kicker {
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

.pf-kicker::before {
	content: "";
	display: block;
	width: 24px;
	height: 1px;
	background: var(--color-primary-300);
}

.pf-title {
	font-family: var(--font-display);
	font-size: clamp(32px, 5.4vw, 66px);
	font-weight: 300;
	color: #FFFFFF;
	line-height: 1.08;
	letter-spacing: -0.025em;
	max-width: 20ch;
	margin: 0;
}

.pf-title :deep(em),
.pf-cta-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.pf-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: clamp(15px, 1.4vw, 18px);
	line-height: 1.65;
	color: rgba(255, 255, 255, 0.78);
	margin-top: 28px;
	max-width: 54ch;
}

.pf-cta {
	padding: 96px 0;
	text-align: center;
	background: var(--color-primary-800);
	color: #FFFFFF;
}

.pf-cta-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	margin-bottom: 16px;
}

.pf-cta-title {
	font-family: var(--font-display);
	font-size: clamp(26px, 3.2vw, 40px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.15;
	color: #FFFFFF;
	max-width: 24ch;
	margin: 0 auto;
}
</style>
