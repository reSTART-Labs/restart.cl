<template>
	<section id="portfolio" class="py-24 px-6 md:px-12">
		<div class="container mx-auto">
			<div class="text-center mb-16" data-reveal>
				<p class="portfolio-eyebrow">Portafolio</p>
				<h2 class="portfolio-title">
					Proyectos que hablan <em>por s&iacute; solos</em>
				</h2>
				<p class="portfolio-lede">
					Una selecci&oacute;n de los productos y soluciones que hemos construido para nuestros clientes y como laboratorio propio.
				</p>
			</div>

			<!-- Filters -->
			<div class="flex items-center justify-center gap-2 mb-12">
				<button
					v-for="cat in categories"
					:key="cat.value"
					class="px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
					:class="activeCategory === cat.value
						? 'bg-primary text-white'
						: 'bg-features-bg text-text-muted hover:text-primary hover:bg-primary-pastel'"
					:aria-pressed="activeCategory === cat.value"
					@click="activeCategory = cat.value"
				>
					{{ cat.label }}
				</button>
			</div>

			<!-- Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<ProjectCard v-for="project in filtered" :key="project.slug" :project="project" />
			</div>

			<div class="text-center mt-14">
				<RouterLink to="/portafolio" class="btn btn-ghost">Ver todo el portafolio</RouterLink>
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

const filtered = computed(() => {
	if (activeCategory.value === 'all') return projects
	return projects.filter(p => p.type === activeCategory.value)
})
</script>

<style scoped>
.portfolio-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin-bottom: 18px;
}

.portfolio-title {
	font-family: var(--font-display);
	font-size: clamp(30px, 3.5vw, 46px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: var(--color-text);
	margin: 0;
}

.portfolio-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary);
}

.portfolio-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 17px;
	line-height: 1.7;
	color: var(--color-text-light);
	margin: 20px auto 0;
	max-width: 56ch;
}

@media (max-width: 1919px) {
	.portfolio-title {
		font-size: 43px;
		line-height: 1.12;
	}

	.portfolio-lede {
		font-size: 16px;
		line-height: 1.62;
	}
}

@media (max-width: 1439px) {
	.portfolio-title {
		font-size: 40px;
		line-height: 1.14;
	}

	.portfolio-lede {
		font-size: 16px;
		line-height: 1.60;
	}
}

@media (max-width: 1199px) {
	.portfolio-title {
		font-size: 36px;
		line-height: 1.15;
	}

	.portfolio-lede {
		font-size: 15px;
		line-height: 1.58;
	}
}

@media (max-width: 1079px) {
	.portfolio-title {
		font-size: 33px;
		line-height: 1.17;
	}

	.portfolio-lede {
		font-size: 15px;
		line-height: 1.56;
	}
}

@media (max-width: 991px) {
	.portfolio-title {
		font-size: 29px;
		line-height: 1.19;
	}

	.portfolio-lede {
		font-size: 15px;
		line-height: 1.54;
	}
}

@media (max-width: 768px) {
	.portfolio-title {
		font-size: 27px;
		line-height: 1.21;
	}

	.portfolio-lede {
		font-size: 15px;
		line-height: 1.52;
	}
}

@media (max-width: 575px) {
	.portfolio-title {
		font-size: 26px;
		line-height: 1.22;
	}

	.portfolio-lede {
		font-size: 15px;
		line-height: 1.50;
	}
}
</style>
