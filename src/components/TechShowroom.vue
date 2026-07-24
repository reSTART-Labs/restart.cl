<template>
	<section class="py-20 bg-features-bg overflow-hidden">
		<div class="container mx-auto px-6 md:px-12 text-center mb-12">
			<p class="tech-eyebrow">Tecnolog&iacute;as</p>
			<h2 class="tech-title">
				Stack que <em>utilizamos</em>
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

<style scoped>
.tech-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin-bottom: 18px;
}

.tech-title {
	font-family: var(--font-display);
	font-size: clamp(28px, 3.2vw, 42px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: var(--color-text);
	margin: 0;
}

.tech-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary);
}

@media (max-width: 1919px) {
	.tech-title {
		font-size: 39px;
		line-height: 1.12;
	}
}

@media (max-width: 1439px) {
	.tech-title {
		font-size: 36px;
		line-height: 1.14;
	}
}

@media (max-width: 1199px) {
	.tech-title {
		font-size: 33px;
		line-height: 1.15;
	}
}

@media (max-width: 1079px) {
	.tech-title {
		font-size: 30px;
		line-height: 1.17;
	}
}

@media (max-width: 991px) {
	.tech-title {
		font-size: 27px;
		line-height: 1.19;
	}
}

@media (max-width: 768px) {
	.tech-title {
		font-size: 26px;
		line-height: 1.21;
	}
}

@media (max-width: 575px) {
	.tech-title {
		font-size: 26px;
		line-height: 1.22;
	}
}
</style>
