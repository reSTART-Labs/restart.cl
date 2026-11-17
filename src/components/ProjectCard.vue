<template>
	<RouterLink :to="projectPath(project)" class="portfolio-card group no-underline">
		<div class="relative overflow-hidden rounded-t-2xl">
			<img
				:src="project.showcase.web"
				:alt="project.name"
				class="w-full h-56 object-cover object-top transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
			>
			<div class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
			<span class="portfolio-badge" :class="project.type === 'labs' ? 'is-labs' : 'is-customer'">
				{{ project.type === 'labs' ? 'Propio' : 'Cliente' }}
			</span>
		</div>

		<div class="p-6">
			<p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
				{{ project.client }}
			</p>
			<h3 class="text-lg font-semibold text-text group-hover:text-primary transition-colors duration-200">
				{{ project.name }}
			</h3>
			<p class="text-sm text-text-light leading-relaxed mt-2">
				{{ project.shortDescription }}
			</p>
			<p v-if="project.credits?.length" class="text-xs text-text-muted mt-3">
				<template v-for="(credit, i) in project.credits" :key="credit.name + credit.role">
					<span v-if="i > 0"> · </span>{{ credit.role }}: {{ credit.name }}
				</template>
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
	</RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { projectPath } from '@/data/projects.js'

defineProps({
	project: { type: Object, required: true },
})
</script>

<style scoped>
.portfolio-card {
	position: relative;
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

.portfolio-badge {
	position: absolute;
	top: 14px;
	left: 14px;
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	padding: 5px 10px;
	border-radius: 999px;
	backdrop-filter: blur(6px);
}

.portfolio-badge.is-labs {
	background: rgba(13, 17, 23, 0.72);
	color: var(--color-primary-300);
}

.portfolio-badge.is-customer {
	background: rgba(255, 255, 255, 0.88);
	color: #0d1117;
}
</style>
