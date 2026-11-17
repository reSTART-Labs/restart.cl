<template>
	<section class="pt-section">
		<div class="container mx-auto px-6 md:px-12">
			<div class="pt-head">
				<p class="pt-eyebrow">Testimonios</p>
				<h2 class="pt-title">
					Lo que dicen <em>quienes lo usan</em>
				</h2>
			</div>

			<div class="pt-grid" :class="{ 'is-single': testimonials.length === 1 }">
				<figure
					v-for="t in testimonials"
					:key="t.name + t.quote.slice(0, 24)"
					class="pt-card"
				>
					<span class="pt-side">{{ sideLabel(t.side) }}</span>
					<span class="pt-mark" aria-hidden="true">&ldquo;</span>
					<blockquote class="pt-quote">{{ t.quote }}</blockquote>
					<figcaption class="pt-author">
						<img
							v-if="t.avatar"
							:src="t.avatar"
							:alt="t.name"
							class="pt-avatar"
							loading="lazy"
						>
						<span>
							<strong class="pt-name">{{ t.name }}</strong>
							<span class="pt-role">
								{{ t.role }}<template v-if="t.company"> · {{ t.company }}</template>
							</span>
						</span>
					</figcaption>
				</figure>
			</div>
		</div>
	</section>
</template>

<script setup>
/*
 * Testimonios de un proyecto. Solo datos reales entregados por el cliente: la página
 * no renderiza este componente si el proyecto no trae `testimonials`.
 * Usa --brand-ink (definida por ProjectPage) para bordes y comillas.
 */
defineProps({
	testimonials: { type: Array, required: true },
})

const SIDES = { client: 'Cliente', 'end-user': 'Usuario final' }
const sideLabel = (side) => SIDES[side] || 'Cliente'
</script>

<style scoped>
.pt-section {
	padding: 96px 0;
	background: var(--color-bg);
}

.pt-head {
	text-align: center;
	margin-bottom: 56px;
}

.pt-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--brand-ink);
	margin-bottom: 18px;
}

.pt-title {
	font-family: var(--font-display);
	font-size: clamp(26px, 3.2vw, 39px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.12;
	color: var(--color-text);
	margin: 0;
}

.pt-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--brand-ink);
}

.pt-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
}

.pt-grid.is-single {
	grid-template-columns: minmax(0, 720px);
	justify-content: center;
}

.pt-card {
	position: relative;
	margin: 0;
	padding: 32px 28px 28px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-top: 3px solid var(--brand-ink);
	border-radius: 20px;
	display: flex;
	flex-direction: column;
}

.pt-side {
	align-self: flex-start;
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--brand-ink);
	padding: 4px 10px;
	border-radius: 999px;
	border: 1px solid color-mix(in oklab, var(--brand-ink) 40%, transparent);
}

.pt-mark {
	font-family: var(--font-serif);
	font-size: 64px;
	line-height: 0.6;
	color: var(--brand-ink);
	margin-top: 22px;
	height: 26px;
}

.pt-quote {
	margin: 0;
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 17px;
	line-height: 1.7;
	color: var(--color-text);
	flex: 1;
}

.pt-author {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-top: 24px;
}

.pt-avatar {
	width: 44px;
	height: 44px;
	border-radius: 999px;
	object-fit: cover;
}

.pt-name {
	display: block;
	font-size: 15px;
	font-weight: 700;
	color: var(--color-text);
}

.pt-role {
	display: block;
	font-size: 13px;
	color: var(--color-text-light);
	margin-top: 2px;
}

@media (max-width: 640px) {
	.pt-grid {
		grid-template-columns: 1fr;
	}
}
</style>
