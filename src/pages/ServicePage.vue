<template>
	<template v-if="service">
		<!-- Hero with background image -->
		<section class="service-hero relative min-h-[70vh] flex items-end overflow-hidden">
			<img
				:src="service.image"
				:alt="service.title"
				class="absolute inset-0 w-full h-full object-cover"
			>
			<div class="absolute inset-0 service-hero-overlay"></div>
			<div class="relative z-10 container mx-auto px-6 md:px-12 pb-16 pt-32">
				<div class="max-w-2xl">
					<div class="flex items-center gap-3 mb-6">
						<span class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
							<i :class="[service.icon, 'text-primary-sky text-lg']"></i>
						</span>
						<span class="text-primary-sky text-sm font-semibold uppercase tracking-widest">
							{{ service.title }}
						</span>
					</div>
					<h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1]">
						{{ service.headline }}
					</h1>
					<p class="text-white/60 text-lg leading-relaxed mt-6 max-w-xl">
						{{ service.description }}
					</p>
					<div class="flex flex-wrap items-center gap-4 mt-10">
						<RouterLink
							to="/#contact"
							class="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark"
						>
							{{ service.cta }}
						</RouterLink>
						<a
							href="#features-detail"
							class="inline-flex items-center gap-2 text-white font-medium text-sm border border-white/30 px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-white/10 hover:border-white/60"
						>
							Conoce m&aacute;s
							<i class="fa fa-arrow-down text-xs"></i>
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Items overview strip -->
		<section class="bg-primary-ocean">
			<div class="container mx-auto px-6 md:px-12">
				<div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
					<div
						v-for="item in service.items"
						:key="item"
						class="py-6 md:py-8 px-4 md:px-8 text-center"
					>
						<i class="ion-checkmark-round text-primary text-lg mb-2 block"></i>
						<span class="text-white/80 text-sm font-medium">{{ item }}</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Detailed features -->
		<section id="features-detail" class="py-24 px-6 md:px-12">
			<div class="container mx-auto">
				<div class="text-center mb-16 max-w-2xl mx-auto">
					<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
						Lo que hacemos
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
						Capacidades en {{ service.title.toLowerCase() }}
					</h2>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
					<div
						v-for="(feat, i) in service.features"
						:key="feat.title"
						class="service-feature-card group"
					>
						<div class="flex items-start gap-5">
							<span
								class="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold transition-all duration-300 group-hover:scale-110"
								:style="`background: ${service.bg}15; color: ${service.bg === '#1E1E1E' ? 'var(--color-primary)' : service.bg}`"
							>
								{{ String(i + 1).padStart(2, '0') }}
							</span>
							<div>
								<h3 class="text-lg font-semibold text-dark group-hover:text-primary transition-colors">
									{{ feat.title }}
								</h3>
								<p class="text-text-light text-sm leading-relaxed mt-2">
									{{ feat.desc }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Process section -->
		<section class="py-24 px-6 md:px-12 bg-features-bg">
			<div class="container mx-auto">
				<div class="text-center mb-16 max-w-2xl mx-auto">
					<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
						Nuestro proceso
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
						C&oacute;mo trabajamos
					</h2>
					<p class="text-text-light text-base leading-relaxed mt-5">
						Un proceso probado que garantiza resultados predecibles y transparencia total.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div
						v-for="(step, i) in processSteps"
						:key="step.title"
						class="relative"
					>
						<!-- Connector line -->
						<div
							v-if="i < processSteps.length - 1"
							class="hidden lg:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-28px)] h-px bg-border"
						></div>
						<div class="text-center">
							<span
								class="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary text-primary font-bold text-sm shadow-sm"
							>
								{{ i + 1 }}
							</span>
							<h4 class="text-dark font-semibold text-base mt-5">{{ step.title }}</h4>
							<p class="text-text-light text-sm leading-relaxed mt-2">{{ step.desc }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Benefits section -->
		<section class="py-24 px-6 md:px-12" :style="`background: ${service.bg}`">
			<div class="container mx-auto">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div>
						<p class="text-primary-sky text-sm font-semibold uppercase tracking-widest mb-4">
							Ventajas
						</p>
						<h2 class="text-3xl md:text-4xl font-light text-white leading-tight">
							&iquest;Por qu&eacute; elegirnos para {{ service.title.toLowerCase() }}?
						</h2>
						<p class="text-white/60 text-base leading-relaxed mt-5">
							Trabajamos con los m&aacute;s altos est&aacute;ndares de calidad y transparencia para que tu inversi&oacute;n se traduzca en resultados reales.
						</p>
					</div>
					<div class="space-y-4">
						<div
							v-for="(benefit, i) in service.benefits"
							:key="benefit"
							class="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-primary/40 transition-colors"
						>
							<span class="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
								<i class="ion-checkmark-round text-primary text-sm"></i>
							</span>
							<p class="text-white/80 text-sm font-medium leading-relaxed">
								{{ benefit }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Related services -->
		<section class="py-24 px-6 md:px-12">
			<div class="container mx-auto">
				<div class="text-center mb-16">
					<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
						Servicios relacionados
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
						Complementa tu estrategia
					</h2>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<RouterLink
						v-for="related in relatedServices"
						:key="related.slug"
						:to="`/servicios/${related.slug}`"
						class="related-card no-underline group"
					>
						<div class="relative overflow-hidden rounded-2xl h-[240px]">
							<img
								:src="related.image"
								:alt="related.title"
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							>
							<div
								class="absolute inset-0 transition-opacity duration-300"
								:style="`background: linear-gradient(to top, ${related.bg}ee 0%, ${related.bg}88 40%, transparent 100%)`"
							></div>
							<div class="absolute bottom-0 left-0 right-0 p-6">
								<i :class="[related.icon, 'text-primary-sky text-xl mb-2 block']"></i>
								<h3 class="text-white text-lg font-semibold">{{ related.title }}</h3>
								<p class="text-white/50 text-sm mt-1">{{ related.headline }}</p>
								<span class="inline-flex items-center gap-2 text-primary-sky text-xs font-semibold uppercase tracking-wide mt-3 group-hover:gap-3 transition-all">
									Ver servicio
									<i class="fa fa-arrow-right text-[10px]"></i>
								</span>
							</div>
						</div>
					</RouterLink>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="py-24 px-6 md:px-12 bg-dark">
			<div class="container mx-auto text-center max-w-2xl">
				<i :class="[service.icon, 'text-primary-sky text-5xl mb-6 block']"></i>
				<h2 class="text-3xl md:text-4xl font-light text-white leading-tight">
					&iquest;Listo para empezar?
				</h2>
				<p class="text-white/60 text-base leading-relaxed mt-5">
					Conversemos sobre c&oacute;mo podemos ayudarte con {{ service.title.toLowerCase() }}.
					Agenda una asesor&iacute;a gratuita y te contamos todo.
				</p>
				<div class="flex flex-wrap items-center justify-center gap-4 mt-10">
					<RouterLink
						to="/#contact"
						class="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark"
					>
						{{ service.cta }}
						<i class="fa fa-arrow-right text-xs"></i>
					</RouterLink>
					<RouterLink
						to="/"
						class="inline-flex items-center gap-2 text-white font-medium text-sm border border-white/30 px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-white/10 hover:border-white/60"
					>
						Ver todos los servicios
					</RouterLink>
				</div>
			</div>
		</section>
	</template>

	<section v-else class="py-20 px-4 text-center">
		<div class="container mx-auto">
			<h3 class="text-2xl font-light uppercase tracking-wide text-dark">Servicio no encontrado</h3>
			<p class="text-text-light mt-4">El servicio que buscas no existe.</p>
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '@/data/services.js'

const route = useRoute()
const service = computed(() => services.find(s => s.slug === route.params.slug))

const relatedServices = computed(() => {
	if (!service.value) return []
	return services.filter(s => s.slug !== service.value.slug)
})

const processSteps = [
	{
		title: 'Descubrimiento',
		desc: 'Entendemos tu negocio, objetivos y desafíos para definir el alcance del proyecto.',
	},
	{
		title: 'Estrategia',
		desc: 'Diseñamos la solución técnica y el roadmap con entregables claros y medibles.',
	},
	{
		title: 'Ejecución',
		desc: 'Desarrollamos en sprints con revisiones semanales y demos de avance.',
	},
	{
		title: 'Entrega y soporte',
		desc: 'Lanzamos, capacitamos a tu equipo y mantenemos soporte continuo.',
	},
]
</script>

<style scoped>
.service-hero-overlay {
	background: linear-gradient(to top, rgba(20, 18, 24, 0.95) 0%, rgba(20, 18, 24, 0.6) 50%, rgba(20, 18, 24, 0.3) 100%);
}

.service-feature-card {
	padding: 28px;
	border-radius: 20px;
	border: 1px solid var(--color-border);
	background: white;
	transition: box-shadow 0.3s, transform 0.3s;
}

.service-feature-card:hover {
	box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06);
	transform: translateY(-2px);
}
</style>
