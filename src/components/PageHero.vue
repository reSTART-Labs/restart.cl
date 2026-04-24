<template>
	<section class="relative bg-primary-ocean py-28 px-4 max-md:py-20">
		<div class="absolute inset-0 bg-gradient-to-br from-primary-ocean to-dark opacity-90"></div>
		<div class="relative z-10 container mx-auto text-center">
			<i v-if="icon" :class="[icon, 'text-primary-sky text-5xl mb-6 block']"></i>
			<h1 class="text-white text-3xl font-light uppercase tracking-wide max-md:text-2xl">
				{{ title }}
			</h1>
			<p v-if="subtitle" class="text-white/70 text-lg mt-4 max-w-2xl mx-auto max-md:text-base">
				{{ subtitle }}
			</p>
		</div>
	</section>
</template>

<script setup>
defineProps({
	title: { type: String, required: true },
	subtitle: { type: String, default: '' },
	icon: { type: String, default: '' },
})
</script>
