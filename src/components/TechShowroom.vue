<template>
	<section class="py-20 bg-features-bg overflow-hidden">
		<div class="container mx-auto px-6 md:px-12 text-center mb-12">
			<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
				Tecnolog&iacute;as
			</p>
			<h2 class="text-3xl md:text-4xl font-light text-dark">
				Stack que utilizamos
			</h2>
		</div>

		<div class="marquee-wrapper">
			<div class="marquee-track">
				<div v-for="(tech, i) in [...techs, ...techs]" :key="i" class="marquee-item">
					<i v-if="tech.fa" :class="[tech.fa, 'text-3xl']"></i>
					<span v-else class="text-lg font-bold tracking-wide">{{ tech.label }}</span>
					<span class="text-xs font-medium mt-2 block">{{ tech.name }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const techs = [
	{ name: 'Vue.js', label: 'Vue', fa: 'ion-social-javascript' },
	{ name: 'React', label: 'React', fa: 'ion-social-javascript' },
	{ name: 'Node.js', label: 'Node', fa: 'ion-social-nodejs' },
	{ name: 'Python', label: 'Py', fa: 'ion-social-python' },
	{ name: 'AWS', label: 'AWS' },
	{ name: 'Docker', label: '', fa: 'ion-social-octocat' },
	{ name: 'PostgreSQL', label: 'PG' },
	{ name: 'Firebase', label: '', fa: 'ion-fireball' },
	{ name: 'TypeScript', label: 'TS' },
	{ name: 'Tailwind', label: 'TW', fa: 'ion-social-css3' },
	{ name: 'Figma', label: '', fa: 'ion-paintbrush' },
	{ name: 'Git', label: '', fa: 'ion-social-github' },
]
</script>
