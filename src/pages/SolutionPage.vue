<template>
	<template v-if="solution">
		<!-- ── HERO ── -->
		<section class="sol-hero relative min-h-[78vh] flex items-end overflow-hidden">
			<img
				:src="solution.image"
				:alt="solution.title"
				class="absolute inset-0 w-full h-full object-cover"
			>
			<div class="absolute inset-0 sol-hero-overlay"></div>
			<div class="relative z-10 container mx-auto px-6 md:px-12 pb-20 pt-36">
				<div class="max-w-3xl">
					<RouterLink to="/#soluciones" class="hero-kicker">
						<i class="fa fa-arrow-left text-[9px]"></i>
						{{ solution.hero.eyebrow }}
					</RouterLink>
					<div class="flex items-center gap-4 mb-5 mt-6">
						<span class="hero-icon-chip">
							<i :class="[solution.icon, 'text-primary-sky text-xl']"></i>
						</span>
						<span class="hero-service-tag">{{ solution.title }}</span>
					</div>
					<h1 class="hero-title" v-html="solution.hero.title"></h1>
					<p class="hero-lede">{{ solution.hero.description }}</p>
					<div class="flex flex-wrap items-center gap-3 mt-10">
						<a href="#form" class="btn btn-primary">
							{{ solution.hero.cta }}
							<i class="fa fa-arrow-right text-[11px]"></i>
						</a>
						<a href="#services" class="btn btn-ghost-dark">
							Ver soluciones
							<i class="fa fa-arrow-down text-[11px]"></i>
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- ── PROBLEM ── -->
		<section class="py-24 px-6 md:px-12 bg-features-bg">
			<div class="container mx-auto">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
					<div class="lg:col-span-5">
						<p class="sp-eyebrow">{{ solution.problem.eyebrow }}</p>
						<h2 class="sp-section-title" v-html="solution.problem.title"></h2>
					</div>
					<div class="lg:col-span-7 space-y-5">
						<p
							v-for="(p, i) in solution.problem.paragraphs"
							:key="i"
							class="problem-paragraph"
						>
							{{ p }}
						</p>

						<div v-if="solution.problem.benefits" class="problem-benefits">
							<h4 v-if="solution.problem.benefitsTitle" class="problem-benefits-title">
								{{ solution.problem.benefitsTitle }}
							</h4>
							<ul>
								<li v-for="b in solution.problem.benefits" :key="b">
									<span class="problem-benefit-check">
										<i class="ion-checkmark-round"></i>
									</span>
									<span>{{ b }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ── CREDENTIAL BAND ── -->
		<section v-if="solution.credentialBand" class="credential-band">
			<div class="container mx-auto px-6 md:px-12 text-center">
				<p class="credential-eyebrow" v-if="solution.credentialBand.eyebrow">
					{{ solution.credentialBand.eyebrow }}
				</p>
				<h2 class="credential-title" v-html="solution.credentialBand.text"></h2>
			</div>
		</section>

		<!-- ── SERVICES / SOLUTIONS ── -->
		<section id="services" class="py-24 px-6 md:px-12">
			<div class="container mx-auto">
				<div class="text-center mb-16 max-w-3xl mx-auto">
					<p class="sp-eyebrow">{{ solution.services.eyebrow }}</p>
					<h2 class="sp-section-title" v-html="solution.services.title"></h2>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div
						v-for="(item, i) in solution.services.items"
						:key="item.title"
						class="service-card group"
					>
						<span class="service-card-num">
							{{ String(i + 1).padStart(2, '0') }}
						</span>
						<i :class="[item.icon, 'service-card-icon']"></i>
						<h3 class="service-card-title">{{ item.title }}</h3>
						<p class="service-card-desc">{{ item.desc }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- ── AUDIENCE ── -->
		<section v-if="solution.audience" class="py-24 px-6 md:px-12 audience-section">
			<div class="container mx-auto">
				<div class="text-center mb-14 max-w-3xl mx-auto">
					<p class="sp-eyebrow" style="color: var(--color-primary-300);">
						{{ solution.audience.eyebrow }}
					</p>
					<h2 class="sp-section-title-inverse" v-html="solution.audience.title"></h2>
					<p class="sp-lede-inverse">{{ solution.audience.intro }}</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div
						v-for="item in solution.audience.items"
						:key="item.label"
						class="audience-item"
					>
						<i :class="[item.icon, 'audience-item-icon']"></i>
						<span>{{ item.label }}</span>
					</div>
				</div>
			</div>
		</section>

		<!-- ── USE CASES ── -->
		<section v-if="solution.useCases" class="py-24 px-6 md:px-12">
			<div class="container mx-auto">
				<div class="text-center mb-14 max-w-2xl mx-auto">
					<p class="sp-eyebrow">{{ solution.useCases.eyebrow }}</p>
					<h2 class="sp-section-title" v-html="solution.useCases.title"></h2>
				</div>
				<div class="usecases-grid">
					<div
						v-for="(uc, i) in solution.useCases.items"
						:key="uc"
						class="usecase-card"
					>
						<span class="usecase-num">{{ String(i + 1).padStart(2, '0') }}</span>
						<p>{{ uc }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- ── BEFORE / AFTER ── -->
		<section v-if="solution.beforeAfter" class="py-24 px-6 md:px-12 bg-features-bg">
			<div class="container mx-auto">
				<div class="text-center mb-14 max-w-3xl mx-auto">
					<p class="sp-eyebrow">{{ solution.beforeAfter.eyebrow }}</p>
					<h2 class="sp-section-title" v-html="solution.beforeAfter.title"></h2>
					<p v-if="solution.beforeAfter.intro" class="sp-lede">{{ solution.beforeAfter.intro }}</p>
				</div>

				<div class="ba-grid">
					<div
						v-for="(pair, i) in solution.beforeAfter.items"
						:key="i"
						class="ba-row"
					>
						<div class="ba-side ba-before">
							<span class="ba-tag">Antes</span>
							<p>{{ pair.before }}</p>
						</div>
						<span class="ba-arrow" aria-hidden="true">
							<i class="fa fa-arrow-right"></i>
						</span>
						<div class="ba-side ba-after">
							<span class="ba-tag">Ahora</span>
							<p>{{ pair.after }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ── AREAS ── -->
		<section v-if="solution.areas" class="py-24 px-6 md:px-12">
			<div class="container mx-auto">
				<div class="text-center mb-14 max-w-2xl mx-auto">
					<p class="sp-eyebrow">{{ solution.areas.eyebrow }}</p>
					<h2 class="sp-section-title" v-html="solution.areas.title"></h2>
					<p v-if="solution.areas.intro" class="sp-lede">{{ solution.areas.intro }}</p>
				</div>
				<div class="areas-grid">
					<div
						v-for="item in solution.areas.items"
						:key="item.area"
						class="area-card"
					>
						<div class="area-card-head">
							<span class="area-card-icon">
								<i :class="item.icon"></i>
							</span>
							<h3>{{ item.area }}</h3>
						</div>
						<p>{{ item.solution }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- ── DIFFERENTIATORS ── -->
		<section v-if="solution.differentiators" class="py-24 px-6 md:px-12 diff-section">
			<div class="container mx-auto">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
					<div class="lg:col-span-5">
						<p class="sp-eyebrow" style="color: var(--color-primary-300);">
							{{ solution.differentiators.eyebrow }}
						</p>
						<h2 class="sp-section-title-inverse" v-html="solution.differentiators.title"></h2>
					</div>
					<div class="lg:col-span-7 space-y-3">
						<div
							v-for="d in solution.differentiators.items"
							:key="d"
							class="diff-item"
						>
							<span class="diff-check">
								<i class="ion-checkmark-round"></i>
							</span>
							<p>{{ d }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ── METHODOLOGY ── -->
		<section class="py-24 px-6 md:px-12 bg-features-bg">
			<div class="container mx-auto">
				<div class="text-center mb-16 max-w-2xl mx-auto">
					<p class="sp-eyebrow">{{ solution.methodology.eyebrow }}</p>
					<h2 class="sp-section-title" v-html="solution.methodology.title"></h2>
				</div>

				<div class="method-grid">
					<div
						v-for="(step, i) in solution.methodology.steps"
						:key="step.title"
						class="method-step"
						:class="{ 'is-last': i === solution.methodology.steps.length - 1 }"
					>
						<span class="method-step-num">{{ i + 1 }}</span>
						<h4 class="method-step-title">{{ step.title }}</h4>
						<p class="method-step-desc">{{ step.desc }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- ── FINAL CTA ── -->
		<section class="page-cta is-dark">
			<div class="container mx-auto px-6 md:px-12 text-center">
				<h2 class="sp-section-title-inverse mx-auto" style="max-width: 22ch;" v-html="solution.finalCta.title"></h2>
				<p class="page-cta-lede">{{ solution.finalCta.text }}</p>
				<div class="page-cta-ctas">
					<a :href="solution.finalCta.primary.href" class="btn btn-primary">
						{{ solution.finalCta.primary.label }}
						<i class="fa fa-arrow-right text-[11px]"></i>
					</a>
					<RouterLink :to="solution.finalCta.secondary.to" class="btn btn-ghost-dark">
						{{ solution.finalCta.secondary.label }}
					</RouterLink>
				</div>
			</div>
		</section>

		<!-- ── CONTACT FORM ── -->
		<section id="form" class="py-24 px-6 md:px-12">
			<div class="container mx-auto">
				<div class="form-card">
					<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
						<div class="lg:col-span-5">
							<p class="sp-eyebrow">{{ solution.contact.eyebrow }}</p>
							<h2 class="sp-section-title" v-html="solution.contact.title"></h2>
							<p class="sp-lede">{{ solution.contact.text }}</p>

							<div class="contact-info">
								<h4 class="contact-info-heading">Horario de atención</h4>
								<ul>
									<li
										v-for="s in solution.contact.schedule"
										:key="s.label"
									>
										<span>{{ s.label }}</span>
										<strong>{{ s.value }}</strong>
									</li>
								</ul>

								<a
									:href="solution.contact.whatsapp.href"
									target="_blank"
									rel="noopener"
									class="whatsapp-link"
								>
									<i class="ion-social-whatsapp"></i>
									<span>
										<small>{{ solution.contact.whatsapp.label }}</small>
										<strong>{{ solution.contact.whatsapp.value }}</strong>
									</span>
								</a>
							</div>
						</div>

						<div class="lg:col-span-7">
							<ContactForm
								:source="`solucion-${solution.slug}`"
								:fields="['name', 'company', 'email', 'phone', 'message']"
								message-label="Cuéntanos sobre tu operación"
								message-placeholder="Procesos a digitalizar, cantidad de usuarios, sistemas existentes..."
								:message-rows="5"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</template>

	<section v-else class="py-20 px-4 text-center">
		<div class="container mx-auto">
			<h3 class="text-2xl font-light uppercase tracking-wide text-text">Solución no encontrada</h3>
			<p class="text-text-light mt-4">La solución que buscas no existe.</p>
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
import { solutions } from '@/data/solutions.js'
import ContactForm from '@/components/ContactForm.vue'

const route = useRoute()
const solution = computed(() => solutions.find(s => s.slug === route.params.slug))
</script>

<style scoped>
/* ── HERO ── */
.sol-hero-overlay {
	background: linear-gradient(180deg,
		rgba(4, 23, 30, 0.55) 0%,
		rgba(4, 23, 30, 0.85) 65%,
		var(--color-primary-900) 100%);
}

.hero-kicker {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.55);
	text-decoration: none;
	transition: color 0.2s ease;
	margin-bottom: 24px;
}

.hero-kicker::before {
	content: "";
	display: block;
	width: 24px;
	height: 1px;
	background: var(--color-primary-300);
}

.hero-kicker:hover {
	color: var(--color-primary-300);
}

.hero-icon-chip {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	border-radius: 14px;
	background: rgba(103, 215, 228, 0.18);
}

.hero-service-tag {
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary-300);
}

.hero-title {
	color: #FFFFFF;
	font-family: var(--font-display);
	font-size: clamp(40px, 5.6vw, 76px);
	font-weight: 300;
	line-height: 1.05;
	letter-spacing: -0.025em;
	max-width: 22ch;
	margin: 0;
}

.hero-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.hero-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 18px;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.78);
	margin-top: 28px;
	max-width: 60ch;
}

/* ── EYEBROWS · TITLES ── */
.sp-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin-bottom: 18px;
}

.sp-section-title {
	font-family: var(--font-display);
	font-size: clamp(28px, 3.5vw, 44px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.15;
	color: var(--color-text);
	margin: 0;
}

.sp-section-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary);
}

.sp-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 16px;
	line-height: 1.7;
	color: var(--color-text-light);
	margin-top: 20px;
}

.sp-section-title-inverse {
	font-family: var(--font-display);
	font-size: clamp(28px, 3.4vw, 42px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.15;
	color: #FFFFFF;
	margin: 0;
}

.sp-section-title-inverse :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.sp-lede-inverse {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 16px;
	line-height: 1.75;
	color: rgba(255, 255, 255, 0.72);
	margin-top: 20px;
}

/* ── PROBLEM ── */
.problem-paragraph {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 18px;
	line-height: 1.85;
	color: var(--color-text-light);
	margin: 0;
}

.problem-benefits {
	margin-top: 8px;
	padding: 26px 28px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 18px;
}

.problem-benefits-title {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.2em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin: 0 0 16px;
}

.problem-benefits ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;
}

@media (min-width: 640px) {
	.problem-benefits ul { grid-template-columns: 1fr 1fr; }
}

.problem-benefits li {
	display: flex;
	align-items: center;
	gap: 12px;
	font-size: 14px;
	font-weight: 500;
	color: var(--color-text);
}

.problem-benefit-check {
	flex-shrink: 0;
	width: 26px;
	height: 26px;
	border-radius: 999px;
	background: var(--color-primary-pastel);
	color: var(--color-primary);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
}

/* ── CREDENTIAL BAND ── */
.credential-band {
	padding: 64px 0;
	background: var(--color-primary-800);
	color: #FFFFFF;
	text-align: center;
}

.credential-eyebrow {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	margin: 0 0 14px;
}

.credential-title {
	font-family: var(--font-display);
	font-size: clamp(26px, 3.4vw, 42px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.15;
	color: #FFFFFF;
	margin: 0;
	max-width: 26ch;
	margin-inline: auto;
}

.credential-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

/* ── BEFORE / AFTER ── */
.ba-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 18px;
	max-width: 1080px;
	margin: 0 auto;
}

.ba-row {
	display: grid;
	grid-template-columns: 1fr;
	gap: 14px;
	align-items: stretch;
	padding: 18px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 18px;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.ba-row:hover {
	border-color: var(--color-primary);
	box-shadow: 0 16px 36px rgba(13, 17, 23, 0.06);
}

@media (min-width: 768px) {
	.ba-row {
		grid-template-columns: 1fr auto 1fr;
		gap: 22px;
		padding: 22px 26px;
		align-items: center;
	}
}

.ba-side {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 14px 18px;
	border-radius: 12px;
}

.ba-before {
	background: rgba(143, 149, 161, 0.08);
}

.ba-after {
	background: var(--color-primary-pastel);
}

.ba-tag {
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.22em;
	text-transform: uppercase;
}

.ba-before .ba-tag {
	color: var(--color-text-muted);
}

.ba-after .ba-tag {
	color: var(--color-primary);
}

.ba-side p {
	margin: 0;
	font-size: 14px;
	line-height: 1.6;
	color: var(--color-text);
}

.ba-before p {
	color: var(--color-text-light);
	text-decoration: line-through;
	text-decoration-color: rgba(138, 143, 153, 0.5);
	text-decoration-thickness: 1px;
}

.ba-arrow {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border-radius: 999px;
	background: var(--color-primary);
	color: var(--color-primary-on);
	font-size: 13px;
	flex-shrink: 0;
	margin: 0 auto;
}

@media (max-width: 767px) {
	.ba-arrow {
		transform: rotate(90deg);
	}
}

/* ── AREAS ── */
.areas-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
	max-width: 1080px;
	margin: 0 auto;
}

@media (min-width: 768px) {
	.areas-grid { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1100px) {
	.areas-grid { grid-template-columns: repeat(3, 1fr); }
}

.area-card {
	padding: 26px 26px 24px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 18px;
	transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.area-card:hover {
	border-color: var(--color-primary);
	transform: translateY(-3px);
	box-shadow: 0 16px 40px rgba(13, 17, 23, 0.06);
}

.area-card-head {
	display: flex;
	align-items: center;
	gap: 14px;
	margin-bottom: 14px;
}

.area-card-icon {
	flex-shrink: 0;
	width: 44px;
	height: 44px;
	border-radius: 12px;
	background: var(--color-primary-pastel);
	color: var(--color-primary);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;
}

.area-card-head h3 {
	margin: 0;
	font-size: 17px;
	font-weight: 700;
	letter-spacing: -0.005em;
	color: var(--color-text);
}

.area-card p {
	margin: 0;
	font-size: 14px;
	line-height: 1.65;
	color: var(--color-text-light);
}

/* ── SERVICES ── */
.service-card {
	position: relative;
	padding: 36px 28px 32px;
	border-radius: 20px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}

.service-card:hover {
	box-shadow: 0 16px 40px rgba(13, 17, 23, 0.08);
	transform: translateY(-3px);
	border-color: var(--color-border-strong);
}

.service-card-num {
	position: absolute;
	top: 24px;
	right: 28px;
	font-family: var(--font-display);
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.12em;
	color: var(--color-text-muted);
}

.service-card-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 52px;
	height: 52px;
	border-radius: 14px;
	background: var(--color-primary-pastel);
	color: var(--color-primary);
	font-size: 24px;
	margin-bottom: 22px;
	transition: transform 0.3s ease;
}

.service-card:hover .service-card-icon {
	transform: scale(1.06);
}

.service-card-title {
	font-size: 18px;
	font-weight: 700;
	letter-spacing: -0.005em;
	color: var(--color-text);
	margin: 0;
	line-height: 1.3;
}

.service-card-desc {
	font-size: 14px;
	line-height: 1.65;
	color: var(--color-text-light);
	margin-top: 10px;
}

/* ── AUDIENCE ── */
.audience-section {
	background: var(--color-primary-800);
	color: #FFFFFF;
}

.audience-item {
	display: flex;
	align-items: center;
	gap: 14px;
	padding: 18px 20px;
	border-radius: 14px;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.08);
	transition: border-color 0.2s ease, transform 0.2s ease;
}

.audience-item:hover {
	border-color: rgba(103, 215, 228, 0.4);
	transform: translateY(-2px);
}

.audience-item-icon {
	flex-shrink: 0;
	width: 36px;
	height: 36px;
	border-radius: 10px;
	background: rgba(103, 215, 228, 0.15);
	color: var(--color-primary-300);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
}

.audience-item span {
	font-size: 14px;
	font-weight: 500;
	color: rgba(255, 255, 255, 0.88);
	line-height: 1.35;
}

/* ── USE CASES ── */
.usecases-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 14px;
	max-width: 920px;
	margin: 0 auto;
}

@media (min-width: 768px) {
	.usecases-grid {
		grid-template-columns: 1fr 1fr;
	}
}

.usecase-card {
	display: flex;
	align-items: flex-start;
	gap: 18px;
	padding: 22px 24px;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 16px;
	transition: border-color 0.2s ease, transform 0.2s ease;
}

.usecase-card:hover {
	border-color: var(--color-primary);
	transform: translateY(-2px);
}

.usecase-num {
	flex-shrink: 0;
	font-family: var(--font-display);
	font-size: 14px;
	font-weight: 700;
	letter-spacing: 0.05em;
	color: var(--color-primary);
	background: var(--color-primary-pastel);
	width: 38px;
	height: 38px;
	border-radius: 10px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.usecase-card p {
	margin: 0;
	font-size: 15px;
	line-height: 1.55;
	color: var(--color-text);
	padding-top: 8px;
}

/* ── DIFFERENTIATORS ── */
.diff-section {
	background: var(--color-dark-graphite);
}

html[data-theme="dark"] .diff-section {
	background: #0F141D;
}

.diff-item {
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 18px 22px;
	border-radius: 14px;
	background: rgba(255, 255, 255, 0.04);
	border: 1px solid rgba(255, 255, 255, 0.08);
	transition: border-color 0.2s ease;
}

.diff-item:hover {
	border-color: rgba(103, 215, 228, 0.4);
}

.diff-check {
	flex-shrink: 0;
	width: 32px;
	height: 32px;
	border-radius: 999px;
	background: rgba(50, 191, 212, 0.2);
	color: var(--color-primary-300);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 13px;
}

.diff-item p {
	margin: 0;
	font-size: 15px;
	line-height: 1.55;
	color: rgba(255, 255, 255, 0.85);
}

/* ── METHODOLOGY ── */
.method-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 32px 24px;
}

.method-step {
	text-align: center;
	position: relative;
}

.method-step-num {
	position: relative;
	z-index: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	border-radius: 999px;
	background: var(--color-surface);
	border: 2px solid var(--color-primary);
	color: var(--color-primary);
	font-family: var(--font-display);
	font-size: 14px;
	font-weight: 700;
}

.method-step-title {
	font-size: 16px;
	font-weight: 700;
	letter-spacing: -0.005em;
	color: var(--color-text);
	margin: 20px 0 0;
}

.method-step-desc {
	font-size: 13px;
	line-height: 1.6;
	color: var(--color-text-light);
	margin-top: 8px;
}

/* ── FINAL CTA ── */
.page-cta {
	padding: 96px 0;
	text-align: center;
}

.page-cta.is-dark {
	background: var(--color-primary-800);
	color: #FFFFFF;
}

.page-cta-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 16px;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.7);
	margin: 20px auto 0;
	max-width: 56ch;
}

.page-cta-ctas {
	display: inline-flex;
	gap: 14px;
	margin-top: 36px;
	flex-wrap: wrap;
	justify-content: center;
}

/* ── CONTACT FORM ── */
.form-card {
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 24px;
	padding: clamp(28px, 4vw, 56px);
	box-shadow: 0 20px 60px rgba(8, 44, 56, 0.08);
}

.contact-info {
	margin-top: 36px;
	border-top: 1px solid var(--color-border);
	padding-top: 28px;
}

.contact-info-heading {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-text-muted);
	margin: 0 0 14px;
}

.contact-info ul {
	list-style: none;
	padding: 0;
	margin: 0 0 24px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.contact-info ul li {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	font-size: 14px;
	color: var(--color-text-light);
}

.contact-info ul li strong {
	color: var(--color-text);
	font-weight: 600;
}

.whatsapp-link {
	display: inline-flex;
	align-items: center;
	gap: 14px;
	padding: 14px 20px;
	border-radius: 14px;
	background: rgba(71, 174, 137, 0.1);
	color: var(--color-accent-green);
	text-decoration: none;
	transition: background 0.2s ease, transform 0.2s ease;
}

.whatsapp-link:hover {
	background: rgba(71, 174, 137, 0.18);
	transform: translateY(-1px);
}

.whatsapp-link i {
	font-size: 26px;
}

.whatsapp-link span {
	display: flex;
	flex-direction: column;
}

.whatsapp-link small {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	color: var(--color-accent-green);
	opacity: 0.85;
}

.whatsapp-link strong {
	font-size: 15px;
	font-weight: 700;
	color: var(--color-text);
}

.contact-label {
	display: block;
	font-size: 12px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--color-text-muted);
	margin-bottom: 8px;
}

.contact-input {
	width: 100%;
	padding: 14px 16px;
	font-size: 14px;
	color: var(--color-text);
	background: var(--color-features-bg);
	border: 1px solid var(--color-border);
	border-radius: 12px;
	outline: none;
	transition: border-color 0.2s, box-shadow 0.2s;
	font-family: inherit;
}

.contact-input:focus {
	border-color: var(--color-primary);
	box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent);
}

.contact-input::placeholder {
	color: var(--color-text-muted);
}
</style>
