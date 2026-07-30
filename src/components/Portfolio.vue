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
					@click="activeCategory = cat.value"
				>
					{{ cat.label }}
				</button>
			</div>

			<!-- Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<a
					v-for="project in filtered"
					:key="project.slug"
					:href="project.url"
					:target="project.url ? '_blank' : undefined"
					class="portfolio-card group no-underline"
				>
					<div class="relative overflow-hidden rounded-t-2xl">
						<img
							:src="project.image"
							:alt="project.title"
							class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						>
						<div class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div
							v-if="project.url"
							class="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
						>
							<i class="fa fa-external-link text-sm text-dark"></i>
						</div>
					</div>

					<div class="p-6">
						<p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
							{{ project.client }}
						</p>
						<h3 class="text-lg font-semibold text-text group-hover:text-primary transition-colors duration-200">
							{{ project.title }}
						</h3>
						<p class="text-sm text-text-light leading-relaxed mt-2">
							{{ project.description }}
						</p>
						<div class="flex flex-wrap gap-2 mt-4">
							<span
								v-for="tag in project.tags"
								:key="tag"
								class="text-[11px] font-medium text-text-muted bg-features-bg px-2.5 py-1 rounded-full"
							>
								{{ tag }}
							</span>
						</div>
					</div>
				</a>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects, categories } from '@/data/portfolio.js'

const activeCategory = ref('all')

const filtered = computed(() => {
	if (activeCategory.value === 'all') return projects
	return projects.filter(p => p.category === activeCategory.value)
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

.portfolio-card {
	display: block;
	background: var(--color-surface);
	border-radius: 16px;
	border: 1px solid var(--color-border);
	overflow: hidden;
	transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
}

.portfolio-card:hover {
	box-shadow: 0 20px 40px rgba(13, 17, 23, 0.08);
	transform: translateY(-4px);
	border-color: var(--color-border-strong);
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
