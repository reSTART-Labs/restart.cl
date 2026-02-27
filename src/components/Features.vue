<template>
	<section id="features" class="py-20 px-4 bg-features-bg border-t border-b border-border">
		<div class="container mx-auto">
			<div class="text-center">
				<h3 class="text-2xl font-light uppercase tracking-wide text-dark max-md:text-[23px]">
					&iquest;Que hacemos?
				</h3>
				<hr class="w-32 mx-auto my-6 border-t-2 border-border">
				<p class="text-base text-text-light leading-[29px] w-4/5 mx-auto max-md:w-auto">
					Combinamos talento, tecnolog&iacute;a y dise&ntilde;o para impulsar el crecimiento de tu empresa con soluciones digitales a medida.
				</p>
			</div>

			<div class="w-[88%] mx-auto mt-28">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
					<RouterLink
						v-for="service in services"
						:key="service.slug"
						:to="`/servicios/${service.slug}`"
						class="flex no-underline group max-md:flex-col max-md:items-center max-md:text-center"
					>
						<i :class="['icon', service.icon, 'text-primary text-5xl leading-none text-center lg:mr-5 shrink-0 group-hover:text-primary-dark transition-colors']"></i>
						<div class="max-lg:mt-5 lg:ml-2">
							<h4 class="text-[17px] text-text mt-0 group-hover:text-dark transition-colors">{{ service.title }}</h4>
							<p class="mt-4 text-[15px] leading-6 text-text-light w-[95%]">{{ service.description }}</p>
						</div>
					</RouterLink>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { services } from '@/data/services.js'
</script>
