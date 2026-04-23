<template>
	<template v-if="project">
		<!-- Hero -->
		<section
			class="labs-hero relative overflow-hidden pt-32 pb-16 px-6 md:px-12"
			:style="heroStyle"
		>
			<div class="absolute inset-0 labs-hero-overlay"></div>
			<div class="relative z-10 container mx-auto">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					<div class="max-w-xl">
						<RouterLink
							to="/"
							class="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold uppercase tracking-widest mb-6 no-underline transition-colors"
						>
							<i class="fa fa-arrow-left text-[10px]"></i>
							re/START Labs
						</RouterLink>

						<div class="flex items-center gap-4 mb-6">
							<img
								v-if="project.logo"
								:src="project.logo"
								:alt="project.name"
								class="h-10 w-auto object-contain"
							>
							<span
								v-if="project.status"
								class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
								:class="statusClasses"
							>
								<span class="w-1.5 h-1.5 rounded-full" :style="`background: ${project.brandColor}`"></span>
								{{ statusLabel }}
							</span>
						</div>

						<h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
							{{ project.name }}
						</h1>
						<p
							class="text-2xl md:text-3xl font-semibold mt-3"
							:style="`color: ${project.brandColor}`"
						>
							{{ project.tagline }}
						</p>
						<p class="text-white/70 text-base md:text-lg leading-relaxed mt-6">
							{{ project.shortDescription }}
						</p>

						<div class="flex flex-wrap items-center gap-3 mt-10">
							<a
								v-if="project.url"
								:href="project.url"
								target="_blank"
								rel="noopener"
								class="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wide px-7 py-3.5 rounded-full no-underline transition-all duration-200 hover:scale-105"
								:style="`background: ${project.brandColor}; color: ${project.brandDark || '#07070d'}`"
							>
								{{ project.cta || `Visita ${project.name}` }}
								<i class="fa fa-external-link text-xs"></i>
							</a>
							<a
								href="#capturas"
								class="inline-flex items-center gap-2 text-white font-medium text-sm border border-white/30 px-7 py-3.5 rounded-full no-underline transition-all duration-200 hover:bg-white/10 hover:border-white/60"
							>
								Ver capturas
								<i class="fa fa-arrow-down text-xs"></i>
							</a>
						</div>

						<div v-if="project.platforms?.length" class="flex flex-wrap items-center gap-2 mt-8">
							<span
								v-for="platform in project.platforms"
								:key="platform"
								class="text-[11px] text-white/60 font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/15"
							>
								{{ platform }}
							</span>
						</div>
					</div>

					<div class="relative max-lg:order-first">
						<div
							class="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
							:style="`background: ${project.brandColor}`"
						></div>
						<div class="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
							<img
								:src="project.heroImage"
								:alt="project.name"
								class="w-full h-auto block"
								loading="eager"
							>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Stats strip -->
		<section v-if="project.stats?.length" class="bg-dark border-y border-white/5">
			<div class="container mx-auto px-6 md:px-12">
				<div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
					<div
						v-for="stat in project.stats"
						:key="stat.label"
						class="py-8 px-4 md:px-8 text-center"
					>
						<p
							class="text-3xl md:text-4xl font-bold"
							:style="`color: ${project.brandColor}`"
						>
							{{ stat.value }}
						</p>
						<p class="text-white/50 text-xs md:text-sm font-medium uppercase tracking-widest mt-2">
							{{ stat.label }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Problem & Solution -->
		<section v-if="project.problem || project.solution" class="py-24 px-6 md:px-12">
			<div class="container mx-auto max-w-5xl">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
					<div v-if="project.problem">
						<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
							El problema
						</p>
						<p class="text-text text-lg md:text-xl font-light leading-relaxed">
							{{ project.problem }}
						</p>
					</div>
					<div v-if="project.solution">
						<p
							class="text-sm font-semibold uppercase tracking-widest mb-4"
							:style="`color: ${project.brandColor}`"
						>
							Nuestra soluci&oacute;n
						</p>
						<p class="text-text text-lg md:text-xl font-light leading-relaxed">
							{{ project.solution }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Full description -->
		<section v-if="project.description" class="pb-24 px-6 md:px-12">
			<div class="container mx-auto max-w-3xl text-center">
				<p class="text-text-light text-base md:text-lg leading-relaxed">
					{{ project.description }}
				</p>
			</div>
		</section>

		<!-- Features -->
		<section v-if="project.features?.length" class="py-24 px-6 md:px-12 bg-features-bg">
			<div class="container mx-auto">
				<div class="text-center mb-16 max-w-2xl mx-auto">
					<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
						Lo que incluye
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-text leading-tight">
						Capacidades <em>principales</em>
					</h2>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
					<div
						v-for="feat in project.features"
						:key="feat.title"
						class="labs-feature-card group"
					>
						<span
							class="inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
							:style="`background: ${project.brandColor}15; color: ${project.brandColor}`"
						>
							<i :class="[feat.icon, 'text-xl']"></i>
						</span>
						<h3 class="text-text text-base font-semibold leading-tight">
							{{ feat.title }}
						</h3>
						<p class="text-text-light text-sm leading-relaxed mt-2">
							{{ feat.desc }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Screenshots -->
		<section
			v-if="project.screenshots?.length"
			id="capturas"
			class="py-24 px-6 md:px-12 bg-dark"
		>
			<div class="container mx-auto">
				<div class="text-center mb-16 max-w-2xl mx-auto">
					<p
						class="text-sm font-semibold uppercase tracking-widest mb-4"
						:style="`color: ${project.brandColor}`"
					>
						Capturas
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-white leading-tight">
						Un vistazo a la <em>experiencia</em>
					</h2>
				</div>

				<!-- Tabs -->
				<div class="flex flex-wrap items-center justify-center gap-2 mb-10">
					<button
						v-for="(shot, i) in project.screenshots"
						:key="shot.src"
						class="text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
						:class="activeShot === i
							? 'text-text'
							: 'text-white/60 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10'"
						:style="activeShot === i ? `background: ${project.brandColor}` : ''"
						@click="activeShot = i"
					>
						{{ shot.label }}
					</button>
				</div>

				<!-- Active screenshot -->
				<div class="relative max-w-5xl mx-auto">
					<div
						class="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
						:style="`background: ${project.brandColor}`"
					></div>
					<div class="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
						<img
							:src="project.screenshots[activeShot].src"
							:alt="project.screenshots[activeShot].label"
							class="w-full h-auto block"
							loading="lazy"
						>
					</div>
					<p
						v-if="project.screenshots[activeShot].caption"
						class="text-center text-white/60 text-sm mt-6 max-w-xl mx-auto leading-relaxed"
					>
						{{ project.screenshots[activeShot].caption }}
					</p>
				</div>
			</div>
		</section>

		<!-- Tech stack -->
		<section v-if="project.tech?.length" class="py-24 px-6 md:px-12">
			<div class="container mx-auto max-w-4xl text-center">
				<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
					Stack
				</p>
				<h2 class="text-3xl md:text-4xl font-light text-text leading-tight">
					Construido con tecnolog&iacute;a <em>moderna</em>
				</h2>

				<div class="flex flex-wrap items-center justify-center gap-2 mt-10">
					<span
						v-for="t in project.tech"
						:key="t.name"
						class="inline-flex items-center gap-2 text-sm text-text bg-features-bg border border-border px-4 py-2 rounded-full"
					>
						<span class="w-1.5 h-1.5 rounded-full" :style="`background: ${project.brandColor}`"></span>
						{{ t.name }}
					</span>
				</div>
			</div>
		</section>

		<!-- Highlights -->
		<section
			v-if="project.highlights?.length"
			class="py-24 px-6 md:px-12"
			:style="`background: ${project.brandDark || '#141218'}`"
		>
			<div class="container mx-auto max-w-5xl">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div>
						<p
							class="text-sm font-semibold uppercase tracking-widest mb-4"
							:style="`color: ${project.brandColor}`"
						>
							Destacados t&eacute;cnicos
						</p>
						<h2 class="text-3xl md:text-4xl font-light text-white leading-tight">
							Decisiones que marcan la <em>diferencia</em>
						</h2>
					</div>
					<div class="space-y-4">
						<div
							v-for="h in project.highlights"
							:key="h"
							class="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
						>
							<span
								class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
								:style="`background: ${project.brandColor}20`"
							>
								<i
									class="ion-checkmark-round text-sm"
									:style="`color: ${project.brandColor}`"
								></i>
							</span>
							<p class="text-white/80 text-sm font-medium leading-relaxed">{{ h }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Related projects -->
		<section
			v-if="relatedProjects.length"
			class="py-24 px-6 md:px-12"
		>
			<div class="container mx-auto">
				<div class="text-center mb-16">
					<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
						Otros proyectos del lab
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-text leading-tight">
						Explora lo que <em>construimos</em>
					</h2>
				</div>

				<div
					:key="`related-${project.slug}`"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<RouterLink
						v-for="related in relatedProjects"
						:key="related.slug"
						:to="`/labs/${related.slug}`"
						class="related-project-card group no-underline"
					>
						<div class="relative overflow-hidden rounded-2xl h-[240px]">
							<img
								:src="related.heroImage"
								:alt="related.name"
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							>
							<div
								class="absolute inset-0"
								:style="`background: linear-gradient(to top, ${related.brandDark || '#141218'}ee 0%, ${related.brandDark || '#141218'}55 40%, transparent 100%)`"
							></div>
							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p
									class="text-xs font-bold uppercase tracking-widest"
									:style="`color: ${related.brandColor}`"
								>
									{{ related.category || 'Producto' }}
								</p>
								<h3 class="text-white text-xl font-semibold mt-1">{{ related.name }}</h3>
								<p class="text-white/60 text-sm mt-1">{{ related.tagline }}</p>
							</div>
						</div>
					</RouterLink>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="py-24 px-6 md:px-12 bg-dark">
			<div class="container mx-auto text-center max-w-2xl">
				<h2 class="text-3xl md:text-4xl font-light text-white leading-tight">
					&iquest;Quieres construir algo <em>similar</em>?
				</h2>
				<p class="text-white/60 text-base leading-relaxed mt-5">
					Conversemos sobre tu idea y construy&aacute;mosla juntos con el mismo rigor con el que construimos {{ project.name }}.
				</p>
				<div class="flex flex-wrap items-center justify-center gap-4 mt-10">
					<RouterLink
						to="/#contact"
						class="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark"
					>
						Conversemos
						<i class="fa fa-arrow-right text-xs"></i>
					</RouterLink>
					<a
						v-if="project.url"
						:href="project.url"
						target="_blank"
						rel="noopener"
						class="inline-flex items-center gap-2 text-white font-medium text-sm border border-white/30 px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-white/10 hover:border-white/60"
					>
						Ir a {{ project.name }}
						<i class="fa fa-external-link text-xs"></i>
					</a>
				</div>
			</div>
		</section>
	</template>

	<section v-else class="py-20 px-4 text-center">
		<div class="container mx-auto">
			<h3 class="text-2xl font-light uppercase tracking-wide text-text">Proyecto no encontrado</h3>
			<p class="text-text-light mt-4">El proyecto que buscas no existe.</p>
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

const heroStyle = computed(() => {
	if (!project.value) return ''
	const dark = project.value.brandDark || '#141218'
	const accent = project.value.brandAccent || project.value.brandColor || '#41BECF'
	return `background: radial-gradient(circle at 20% 0%, ${accent}33 0%, transparent 50%), radial-gradient(circle at 80% 100%, ${project.value.brandColor}22 0%, transparent 50%), ${dark};`
})

const statusLabel = computed(() => {
	if (!project.value?.status) return ''
	return {
		live: 'En producción',
		beta: 'Beta',
		'in-development': 'En desarrollo',
	}[project.value.status] || project.value.status
})

const statusClasses = computed(() => 'text-white/80 border-white/15 bg-white/5')
</script>

<style scoped>
.labs-hero {
	min-height: 70vh;
}

.labs-hero-overlay {
	background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
	pointer-events: none;
}

.labs-feature-card {
	background: white;
	border: 1px solid var(--color-border);
	border-radius: 20px;
	padding: 24px;
	transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.labs-feature-card:hover {
	box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06);
	transform: translateY(-2px);
}
</style>
