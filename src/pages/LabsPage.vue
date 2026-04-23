<template>
	<!-- Hero -->
	<section class="labs-hero relative overflow-hidden pt-32 pb-20 px-6 md:px-12">
		<div class="absolute inset-0 labs-hero-bg"></div>
		<div class="relative z-10 container mx-auto max-w-4xl">
			<p class="text-primary-sky text-sm font-semibold uppercase tracking-widest mb-5">
				re/START Labs
			</p>
			<h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
				Laboratorio de productos que exploran, validan y ven la luz.
			</h1>
			<p class="text-white/60 text-lg leading-relaxed mt-6 max-w-2xl">
				Un espacio donde prototipamos ideas, probamos tecnolog&iacute;as y lanzamos productos propios. Algunos escalan, otros ense&ntilde;an &mdash; todos dejan algo.
			</p>

			<div class="flex flex-wrap items-center gap-6 mt-10">
				<div class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-primary-sky animate-pulse"></span>
					<span class="text-white/60 text-xs font-semibold uppercase tracking-widest">
						{{ projects.length }} proyectos vivos
					</span>
				</div>
				<RouterLink
					to="/#contact"
					class="inline-flex items-center gap-2 text-primary-sky text-xs font-semibold uppercase tracking-widest no-underline hover:gap-3 transition-all"
				>
					&iquest;Tienes una idea? Convers&eacute;mosla
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
	<section class="py-24 px-6 md:px-12 bg-dark">
		<div class="container mx-auto max-w-2xl text-center">
			<p class="text-primary-sky text-sm font-semibold uppercase tracking-widest mb-4">
				Construye con nosotros
			</p>
			<h2 class="text-3xl md:text-4xl font-light text-white leading-tight">
				&iquest;Tu pr&oacute;xima idea puede ser el siguiente lab?
			</h2>
			<p class="text-white/60 text-base leading-relaxed mt-5">
				Si tienes un producto en mente y necesitas un equipo que lo construya con el rigor de un lab y la velocidad de un startup, hablemos.
			</p>
			<RouterLink
				to="/#contact"
				class="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark mt-10"
			>
				Conversemos
				<i class="fa fa-arrow-right text-xs"></i>
			</RouterLink>
		</div>
	</section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { labsProjects } from '@/data/labsProjects.js'

const projects = labsProjects

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
.labs-hero {
	background: #141218;
}

.labs-hero-bg {
	background:
		radial-gradient(circle at 15% 10%, rgba(86, 60, 248, 0.22) 0%, transparent 45%),
		radial-gradient(circle at 85% 90%, rgba(65, 190, 207, 0.18) 0%, transparent 50%),
		radial-gradient(circle at 50% 50%, rgba(250, 169, 43, 0.08) 0%, transparent 60%);
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
</style>
