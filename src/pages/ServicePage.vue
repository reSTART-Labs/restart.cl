<template>
	<template v-if="service">
		<PageHero :title="service.title" :subtitle="service.headline" :icon="service.icon" />

		<section class="py-20 px-4">
			<div class="container mx-auto max-w-3xl">
				<p class="text-base text-text-light leading-[29px] text-center">
					{{ service.description }}
				</p>
			</div>
		</section>

		<section class="py-20 px-4 bg-features-bg border-t border-b border-border">
			<div class="container mx-auto max-w-2xl">
				<h3 class="text-2xl font-light uppercase tracking-wide text-dark text-center max-md:text-[23px]">
					Capacidades
				</h3>
				<hr class="w-32 mx-auto my-6 border-t-2 border-border">
				<ul class="list-none p-0 grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
					<li
						v-for="item in service.items"
						:key="item"
						class="flex items-center gap-3 text-text-light text-[15px]"
					>
						<i class="ion-checkmark-round text-primary text-lg"></i>
						{{ item }}
					</li>
				</ul>
			</div>
		</section>

		<section class="py-20 px-4">
			<div class="container mx-auto text-center">
				<h3 class="text-2xl font-light uppercase tracking-wide text-dark max-md:text-[23px]">
					¿Listo para empezar?
				</h3>
				<hr class="w-32 mx-auto my-6 border-t-2 border-border">
				<p class="text-base text-text-light leading-[29px] max-w-xl mx-auto">
					Conversemos sobre cómo podemos ayudarte con {{ service.title.toLowerCase() }}.
				</p>
				<RouterLink
					to="/#contact"
					class="inline-block mt-8 text-white uppercase font-bold text-[11px] tracking-wide bg-primary rounded-full px-8 py-4 no-underline transition-all duration-200 hover:bg-primary-dark"
				>
					{{ service.cta }}
				</RouterLink>
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
import PageHero from '@/components/PageHero.vue'

const route = useRoute()
const service = computed(() => services.find(s => s.slug === route.params.slug))
</script>
