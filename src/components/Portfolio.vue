<template>
	<section id="portfolio" class="py-24 px-6 md:px-12">
		<div class="container mx-auto">
			<div class="text-center mb-16">
				<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
					Portafolio
				</p>
				<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
					Proyectos que hablan por s&iacute; solos
				</h2>
				<p class="text-text-light text-base leading-relaxed mt-5 max-w-2xl mx-auto">
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
						<h3 class="text-lg font-semibold text-dark group-hover:text-primary transition-colors duration-200">
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
.portfolio-card {
	display: block;
	background: white;
	border-radius: 16px;
	border: 1px solid var(--color-border);
	overflow: hidden;
	transition: box-shadow 0.3s, transform 0.3s;
}

.portfolio-card:hover {
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
	transform: translateY(-4px);
}
</style>
