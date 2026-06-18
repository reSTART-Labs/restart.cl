<template>
	<!-- ── HERO ── -->
	<section class="su-hero relative overflow-hidden">
		<div class="relative z-10 container mx-auto px-6 md:px-12 py-36 max-md:py-28">
			<p class="page-hero-kicker">re/START &middot; MVP en 3 semanas</p>
			<h1 class="su-hero-title">
				Desarrollamos el MVP de tu <em>Startup</em> en 3 semanas.
			</h1>
			<p class="su-hero-lede">
				Hecho por founders, para founders. Dise&ntilde;amos, construimos y lanzamos MVPs funcionando en semanas &mdash; no meses &mdash; sea una app nueva para tus usuarios o una herramienta interna para tu equipo.
			</p>

			<div class="su-hero-ctas">
				<a href="#contacto" class="btn btn-primary">Contacto</a>
				<a href="#precios" class="btn btn-ghost-dark">Precios</a>
			</div>

			<div class="su-stats">
				<div class="su-stat">
					<strong>20+</strong>
					<span>MVPs desarrollados</span>
				</div>
				<div class="su-stat">
					<strong>10+</strong>
					<span>clientes atendidos</span>
				</div>
				<div class="su-stat">
					<strong>100%</strong>
					<span>proyectos entregados a tiempo</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ── PROCESO ── -->
	<section id="proceso" class="py-24 px-6 md:px-12 bg-features-bg">
		<div class="container mx-auto max-w-5xl">
			<div class="mb-16">
				<p class="su-eyebrow">El proceso</p>
				<h2 class="su-section-title">C&oacute;mo <em>trabajamos</em></h2>
				<p class="su-section-lede">
					Seguimos un proceso claro de 3 semanas dise&ntilde;ado para llevarte de la idea a una app real funcionando &mdash; r&aacute;pido y sin distracciones.
				</p>
			</div>

			<ol class="su-steps">
				<li v-for="step in steps" :key="step.num" class="su-step">
					<div class="su-step-num">{{ step.num }}</div>
					<div class="su-step-body">
						<p class="su-step-phase">{{ step.phase }}</p>
						<h3 class="su-step-title">{{ step.title }}</h3>
						<p class="su-step-desc">{{ step.desc }}</p>
						<p class="su-step-result">
							<span class="su-step-result-label">Resultado:</span> {{ step.result }}
						</p>
					</div>
				</li>
			</ol>
		</div>
	</section>

	<!-- ── QUÉ CONSTRUIMOS ── -->
	<section class="py-24 px-6 md:px-12">
		<div class="container mx-auto max-w-5xl">
			<div class="mb-14">
				<p class="su-eyebrow">Qu&eacute; construimos</p>
				<h2 class="su-section-title">Qu&eacute; es un MVP, <em>para nosotros</em>.</h2>
				<p class="su-section-lede">
					Cualquier app enfocada que podamos lanzar en 3 semanas &mdash; ya sea para tus clientes o que viva dentro de tu empresa.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div v-for="group in buildGroups" :key="group.title" class="su-build-card">
					<h3 class="su-build-title">{{ group.title }}</h3>
					<p class="su-build-desc">{{ group.desc }}</p>
					<ul class="su-build-list">
						<li v-for="item in group.items" :key="item">
							<i class="fa fa-long-arrow-right su-build-arrow"></i>
							{{ item }}
						</li>
					</ul>
				</div>
			</div>

			<p class="su-build-foot">
				Mismo proceso de 3 semanas. Mismo precio. Mismo equipo.
			</p>
		</div>
	</section>

	<!-- ── PRICING ── -->
	<section id="precios" class="py-24 px-6 md:px-12 bg-features-bg">
		<div class="container mx-auto max-w-6xl">
			<div class="text-center mb-16">
				<p class="su-eyebrow">Lo que ofrecemos</p>
				<h2 class="su-section-title">Precios<em>.</em></h2>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
				<div
					v-for="plan in plans"
					:key="plan.name"
					class="su-plan"
					:class="{ 'su-plan-featured': plan.featured }"
				>
					<span v-if="plan.featured" class="su-plan-badge">M&aacute;s popular</span>

					<h3 class="su-plan-name">{{ plan.name }}</h3>
					<p class="su-plan-desc">{{ plan.desc }}</p>

					<div class="su-plan-price">
						<span v-if="plan.priceOld" class="su-plan-price-old">{{ plan.priceOld }}</span>
						<span class="su-plan-price-now">{{ plan.price }}</span>
					</div>
					<p v-if="plan.priceNote" class="su-plan-price-note">{{ plan.priceNote }}</p>
					<p class="su-plan-terms">{{ plan.terms }}</p>

					<ul class="su-plan-features">
						<li v-for="feat in plan.features" :key="feat">
							<i class="fa fa-check su-plan-check"></i>
							{{ feat }}
						</li>
					</ul>

					<a
						href="#contacto"
						class="su-plan-cta"
						:class="plan.featured ? 'su-plan-cta-primary' : 'su-plan-cta-ghost'"
					>
						{{ plan.cta }}
						<i class="fa fa-arrow-right text-[10px]"></i>
					</a>
				</div>
			</div>

			<div class="su-pricing-foot">
				<p>
					&iquest;No est&aacute;s seguro de si somos el indicado? Agenda una llamada y vemos si podemos ayudarte &mdash; o te conectamos con alguien de nuestra red que s&iacute; pueda.
				</p>
				<a href="#contacto" class="btn-text mt-4">
					Agendar una llamada
					<i class="fa fa-arrow-right text-[10px]"></i>
				</a>
			</div>
		</div>
	</section>

	<!-- ── PARA QUIÉN ── -->
	<section class="py-24 px-6 md:px-12">
		<div class="container mx-auto max-w-5xl">
			<div class="mb-14">
				<p class="su-eyebrow">Para qui&eacute;n es</p>
				<h2 class="su-section-title">Hecho para founders que se <em>mueven r&aacute;pido</em>.</h2>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div v-for="aud in audiences" :key="aud.title" class="su-audience-card">
					<span class="su-audience-icon">
						<i :class="aud.icon"></i>
					</span>
					<h3 class="su-audience-title">{{ aud.title }}</h3>
					<p class="su-audience-desc">{{ aud.desc }}</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ── TRABAJO SELECCIONADO ── -->
	<section class="py-24 px-6 md:px-12 bg-features-bg">
		<div class="container mx-auto">
			<div class="text-center mb-16">
				<p class="su-eyebrow">Trabajo seleccionado</p>
				<h2 class="su-section-title su-section-title-center">MVPs que <em>entregamos</em>.</h2>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<a
					v-for="project in projects"
					:key="project.slug"
					:href="project.url"
					:target="project.url ? '_blank' : undefined"
					:rel="project.url ? 'noopener' : undefined"
					class="su-work-card group no-underline"
				>
					<div class="relative overflow-hidden rounded-t-2xl">
						<img
							:src="project.image"
							:alt="project.title"
							class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						>
						<div class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div
							v-if="project.url"
							class="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
						>
							<i class="fa fa-external-link text-sm text-dark"></i>
						</div>
					</div>
					<div class="p-6">
						<p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
							{{ project.client }}
						</p>
						<h3 class="text-lg font-semibold text-text group-hover:text-primary transition-colors duration-200">
							{{ project.title }}
						</h3>
						<p class="text-sm text-text-light leading-relaxed mt-2">
							{{ project.description }}
						</p>
						<div class="flex flex-wrap gap-2 mt-4">
							<span
								v-for="tag in project.tags"
								:key="tag"
								class="text-[11px] font-medium text-text-muted bg-surface px-2.5 py-1 rounded-full"
							>
								{{ tag }}
							</span>
						</div>
					</div>
				</a>
			</div>
		</div>
	</section>

	<!-- ── FAQ ── -->
	<section id="faq" class="py-24 px-6 md:px-12 su-faq-bg">
		<div class="container mx-auto max-w-3xl">
			<div class="text-center mb-16">
				<p class="su-faq-eyebrow">FAQ</p>
				<h2 class="su-faq-title">Preguntas <em>frecuentes</em></h2>
			</div>

			<div class="flex flex-col divide-y divide-white/10">
				<div v-for="(item, index) in faqs" :key="index" class="py-6">
					<button
						class="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
						@click="toggleFaq(index)"
					>
						<h3 class="text-base md:text-lg font-medium text-white group-hover:text-primary transition-colors">
							{{ item.question }}
						</h3>
						<span
							class="shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300"
							:class="openFaq === index ? 'bg-primary border-primary rotate-45' : 'group-hover:border-primary'"
						>
							<i class="fa fa-plus text-xs text-white"></i>
						</span>
					</button>
					<div
						class="grid transition-all duration-300 ease-in-out"
						:class="openFaq === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'"
					>
						<div class="overflow-hidden">
							<p class="text-sm md:text-base text-white/60 leading-relaxed">
								{{ item.answer }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ── CONTACTO ── -->
	<section id="contacto" class="py-24 px-6 md:px-12">
		<div class="container mx-auto max-w-3xl">
			<div class="text-center mb-12">
				<p class="su-eyebrow">Contacto</p>
				<h2 class="su-section-title su-section-title-center">
					Construyamos tu <em>MVP</em>.
				</h2>
				<p class="su-section-lede su-section-lede-center">
					Cu&eacute;ntanos sobre tu idea y te respondemos a la brevedad para ver si encaja en nuestro proceso de 3 semanas.
				</p>
			</div>

			<div class="su-contact-card">
				<ContactForm
					source="startup"
					:fields="['name', 'company', 'email', 'message']"
					message-label="Cu&eacute;ntanos sobre tu proyecto"
					message-placeholder="¿Qué quieres construir? ¿Para clientes o uso interno?"
					submit-label="Enviar mensaje"
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import ContactForm from '@/components/ContactForm.vue'
import { projects } from '@/data/portfolio.js'

const steps = [
	{
		num: '00',
		phase: 'Discovery & Fit',
		title: 'Discovery & Fit',
		desc: 'Alineamos objetivos, expectativas y si el proyecto encaja en nuestro proceso de 3 semanas.',
		result: 'Dirección del MVP clara y features core definidas.',
	},
	{
		num: '01',
		phase: 'Semana 1',
		title: 'Diseño, scope y dirección visual',
		desc: 'Definimos el MVP, fijamos la dirección visual y cerramos el scope para mantenernos enfocados.',
		result: 'Scope del MVP aprobado con 3 features core y dirección visual definida.',
	},
	{
		num: '02',
		phase: 'Semana 2',
		title: 'Construir e iterar',
		desc: 'Construimos el MVP e iteramos contigo a través de sesiones enfocadas y updates asíncronos.',
		result: 'MVP totalmente funcional con la funcionalidad core.',
	},
	{
		num: '03',
		phase: 'Semana 3',
		title: 'Pulir y lanzar',
		desc: 'Refinamos, testeamos y preparamos el MVP para el lanzamiento, seguido de un handover completo.',
		result: 'MVP pulido en vivo en tu propio dominio.',
	},
	{
		num: '04',
		phase: 'Post-lanzamiento',
		title: '2 semanas de soporte gratis',
		desc: 'Nos quedamos cerca dos semanas después del lanzamiento para asegurar estabilidad.',
		result: 'Bug fixes cubiertos, sin sorpresas.',
	},
]

const buildGroups = [
	{
		title: 'Apps para clientes',
		desc: 'Apps por las que tus usuarios pagan o se registran.',
		items: ['SaaS & web apps', 'PWAs mobile-first', 'Marketplaces', 'Apps con IA'],
	},
	{
		title: 'Herramientas internas',
		desc: 'Herramientas que tu equipo usa todos los días para moverse más rápido.',
		items: [
			'Dashboards de ops y admin',
			'CRMs y portales internos',
			'Agentes de IA para staff',
			'Automatizaciones de workflow',
		],
	},
]

const plans = [
	{
		name: 'Desarrollo de MVP',
		desc: 'En 3 semanas, tendrás un MVP totalmente funcional — para clientes o interno — listo para usar.',
		price: 'USD 5,000',
		priceOld: 'USD 7,500',
		priceNote: 'Queda 1 cupo a este precio',
		terms: '50% al inicio · 50% en la entrega · 3 semanas',
		featured: true,
		cta: 'Agendar una llamada',
		features: [
			'Web app o PWA mobile-first (nativo se cotiza por separado)',
			'Integraciones de DB y APIs (Supabase, Stripe, OpenAI, etc.)',
			'Landing page',
			'Autenticación y onboarding de usuarios',
			'Hasta 3 features core',
			'Panel de admin simple',
			'Deploy en tu dominio propio',
			'Auditoría de seguridad',
			'Comunicación asíncrona vía Slack/WhatsApp',
			'Updates de progreso semanales',
			'2 semanas de soporte gratis post-entrega',
		],
	},
	{
		name: 'Soporte Continuo',
		desc: 'Mantén tu MVP funcionando sin problemas después del lanzamiento.',
		price: 'USD 500 / mes',
		priceOld: '',
		priceNote: 'Pausa o cancela cuando quieras',
		terms: '',
		featured: false,
		cta: 'Contáctanos',
		features: [
			'Hasta 6 horas/mes (bug fixes + cambios menores de UI)',
			'Soporte de emergencia el mismo día',
			'Comunicación asíncrona vía Slack/WhatsApp',
			'Progreso trackeado en Notion',
		],
	},
	{
		name: 'Desarrollo Continuo',
		desc: 'Nos convertimos en tu partner de producto — agregando nuevas features cada semana.',
		price: 'Contáctanos',
		priceOld: '',
		priceNote: 'Mín. 3 meses · pausa o cancela cuando quieras después',
		terms: '',
		featured: false,
		cta: 'Contáctanos',
		features: [
			'Equipo de desarrolladores AI dedicado',
			'Nuevas features entregadas en sprints de 2 semanas',
			'Updates de progreso semanales',
			'Comunicación asíncrona vía Slack/WhatsApp',
		],
	},
]

const audiences = [
	{
		icon: 'fa fa-rocket',
		title: 'Founders de startups',
		desc: 'Que quieren validar temprano sin construir un equipo de devs entero.',
	},
	{
		icon: 'fa fa-briefcase',
		title: 'Ejecutivos C-level',
		desc: 'Que prueban nuevas ideas de producto dentro de su organización.',
	},
	{
		icon: 'fa fa-refresh',
		title: 'Emprendedores seriales',
		desc: 'Que buscan un partner de producto a largo plazo que piense como un founder.',
	},
]

const faqs = [
	{
		question: '¿Realmente entregan un MVP en 3 semanas?',
		answer: 'Sí. Trabajamos con un scope acotado a 3 features core y un proceso enfocado de tres semanas, más una fase previa de Discovery & Fit donde alineamos objetivos. Si tu idea requiere más, lo conversamos en esa etapa y la dividimos en fases.',
	},
	{
		question: '¿Qué cuenta como una “feature core”?',
		answer: 'Una feature core es una funcionalidad principal que entrega valor real al usuario, por ejemplo: agendar una cita, procesar un pago o generar un reporte. En la etapa de Discovery definimos juntos cuáles son las 3 que componen tu MVP.',
	},
	{
		question: '¿Qué pasa si necesito más de 3 features?',
		answer: 'Lanzamos primero el MVP con las 3 features core y luego seguimos agregando funcionalidad mediante nuestro plan de Desarrollo Continuo, con nuevas features en sprints de 2 semanas.',
	},
	{
		question: '¿De quién es el código y el producto final?',
		answer: 'Tuyo. El MVP se despliega en tu propio dominio y la propiedad del código y del producto queda 100% en tus manos tras la entrega.',
	},
	{
		question: '¿Desarrollan apps móviles nativas?',
		answer: 'El plan de MVP incluye una web app o una PWA mobile-first, que funciona muy bien en celulares. Si necesitas una app nativa para las tiendas, la cotizamos por separado.',
	},
	{
		question: '¿ Cómo es la comunicación durante el proyecto?',
		answer: 'Trabajamos de forma asíncrona vía Slack o WhatsApp, con updates de progreso semanales y sesiones enfocadas cuando hace falta. Así avanzamos rápido sin reuniones innecesarias.',
	},
	{
		question: '¿Qué incluye el soporte posterior al lanzamiento?',
		answer: 'Todo MVP incluye 2 semanas de soporte gratis para asegurar estabilidad y cubrir bug fixes. Después puedes continuar con el plan de Soporte Continuo o el de Desarrollo Continuo según lo que necesites.',
	},
]

const openFaq = ref(null)

function toggleFaq(index) {
	openFaq.value = openFaq.value === index ? null : index
}
</script>

<style scoped>
/* ── HERO ── */
.su-hero {
	background:
		radial-gradient(ellipse 50% 50% at 15% 10%, rgba(79, 61, 245, 0.22), transparent 55%),
		radial-gradient(ellipse 50% 50% at 85% 90%, rgba(50, 191, 212, 0.2), transparent 55%),
		radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245, 159, 36, 0.06), transparent 60%),
		var(--color-primary-900);
}

.page-hero-kicker {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	margin-bottom: 24px;
}

.page-hero-kicker::before {
	content: "";
	display: block;
	width: 24px;
	height: 1px;
	background: var(--color-primary-300);
}

.su-hero-title {
	font-family: var(--font-display);
	font-size: clamp(38px, 5.2vw, 70px);
	font-weight: 300;
	color: #FFFFFF;
	line-height: 1.06;
	letter-spacing: -0.025em;
	max-width: 18ch;
	margin: 0;
}

.su-hero-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.su-hero-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 18px;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.78);
	margin-top: 28px;
	max-width: 60ch;
}

.su-hero-ctas {
	display: flex;
	flex-wrap: wrap;
	gap: 14px;
	margin-top: 40px;
}

.su-stats {
	display: flex;
	flex-wrap: wrap;
	gap: 48px;
	margin-top: 56px;
	padding-top: 36px;
	border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.su-stat {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.su-stat strong {
	font-family: var(--font-display);
	font-size: clamp(32px, 4vw, 44px);
	font-weight: 300;
	line-height: 1;
	color: var(--color-primary-300);
}

.su-stat span {
	font-size: 13px;
	color: rgba(255, 255, 255, 0.6);
}

/* ── Section headings (shared) ── */
.su-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin-bottom: 16px;
}

.su-section-title {
	font-family: var(--font-display);
	font-size: clamp(30px, 3.5vw, 48px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: var(--color-text);
	margin: 0;
}

.su-section-title-center {
	margin-left: auto;
	margin-right: auto;
}

.su-section-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary);
}

.su-section-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 17px;
	line-height: 1.7;
	color: var(--color-text-light);
	margin: 20px 0 0;
	max-width: 60ch;
}

.su-section-lede-center {
	margin-left: auto;
	margin-right: auto;
}

/* ── PROCESO ── */
.su-steps {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
}

.su-step {
	display: grid;
	grid-template-columns: 88px 1fr;
	gap: 24px;
	padding: 32px 0;
	border-top: 1px solid var(--color-border);
}

.su-step:last-child {
	border-bottom: 1px solid var(--color-border);
}

.su-step-num {
	font-family: var(--font-display);
	font-size: clamp(36px, 4vw, 52px);
	font-weight: 300;
	line-height: 1;
	color: var(--color-primary);
	opacity: 0.5;
}

.su-step-phase {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin: 0 0 8px;
}

.su-step-title {
	font-family: var(--font-display);
	font-size: clamp(20px, 2.2vw, 26px);
	font-weight: 600;
	letter-spacing: -0.015em;
	color: var(--color-text);
	margin: 0;
}

.su-step-desc {
	font-size: 16px;
	line-height: 1.7;
	color: var(--color-text-light);
	margin: 12px 0 0;
	max-width: 60ch;
}

.su-step-result {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 300;
	font-size: 15px;
	line-height: 1.6;
	color: var(--color-text-soft);
	margin: 14px 0 0;
}

.su-step-result-label {
	font-family: var(--font-sans);
	font-style: normal;
	font-weight: 700;
	color: var(--color-primary);
}

@media (max-width: 640px) {
	.su-step {
		grid-template-columns: 1fr;
		gap: 8px;
	}
}

/* ── QUÉ CONSTRUIMOS ── */
.su-build-card {
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 20px;
	padding: 36px;
}

.su-build-title {
	font-family: var(--font-display);
	font-size: 22px;
	font-weight: 600;
	letter-spacing: -0.015em;
	color: var(--color-text);
	margin: 0;
}

.su-build-desc {
	font-size: 15px;
	line-height: 1.6;
	color: var(--color-text-light);
	margin: 10px 0 24px;
}

.su-build-list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.su-build-list li {
	display: flex;
	align-items: center;
	gap: 12px;
	font-size: 15px;
	font-weight: 500;
	color: var(--color-text-soft);
}

.su-build-arrow {
	color: var(--color-primary);
	font-size: 14px;
}

.su-build-foot {
	text-align: center;
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 300;
	font-size: 17px;
	color: var(--color-text-soft);
	margin: 40px 0 0;
}

/* ── PRICING ── */
.su-plan {
	position: relative;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 20px;
	padding: 36px 32px;
	display: flex;
	flex-direction: column;
	height: 100%;
}

.su-plan-featured {
	border-color: var(--color-primary);
	box-shadow: 0 20px 50px color-mix(in oklab, var(--color-primary) 18%, transparent);
}

.su-plan-badge {
	position: absolute;
	top: -13px;
	left: 32px;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--color-primary-on);
	background: var(--color-primary);
	padding: 6px 14px;
	border-radius: 999px;
}

.su-plan-name {
	font-family: var(--font-display);
	font-size: 20px;
	font-weight: 600;
	letter-spacing: -0.01em;
	color: var(--color-text);
	margin: 0;
}

.su-plan-desc {
	font-size: 14px;
	line-height: 1.6;
	color: var(--color-text-light);
	margin: 10px 0 24px;
	min-height: 44px;
}

.su-plan-price {
	display: flex;
	align-items: baseline;
	gap: 12px;
	flex-wrap: wrap;
}

.su-plan-price-old {
	font-size: 18px;
	font-weight: 400;
	color: var(--color-text-muted);
	text-decoration: line-through;
}

.su-plan-price-now {
	font-family: var(--font-display);
	font-size: 32px;
	font-weight: 300;
	letter-spacing: -0.02em;
	color: var(--color-text);
}

.su-plan-price-note {
	font-size: 13px;
	font-weight: 600;
	color: var(--color-accent-gold);
	margin: 8px 0 0;
}

.su-plan-terms {
	font-size: 13px;
	color: var(--color-text-muted);
	margin: 6px 0 0;
	min-height: 18px;
}

.su-plan-features {
	list-style: none;
	margin: 24px 0;
	padding: 24px 0 0;
	border-top: 1px solid var(--color-border);
	display: flex;
	flex-direction: column;
	gap: 12px;
	flex: 1;
}

.su-plan-features li {
	display: flex;
	align-items: flex-start;
	gap: 12px;
	font-size: 14px;
	line-height: 1.5;
	color: var(--color-text-soft);
}

.su-plan-check {
	color: var(--color-primary);
	font-size: 12px;
	margin-top: 4px;
	flex-shrink: 0;
}

.su-plan-cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	margin-top: auto;
	padding: 14px 24px;
	border-radius: 999px;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	text-decoration: none;
	transition: all 0.2s ease;
}

.su-plan-cta-primary {
	background: var(--color-primary);
	color: var(--color-primary-on);
	border: 1px solid var(--color-primary);
}

.su-plan-cta-primary:hover {
	background: var(--color-primary-dark);
	border-color: var(--color-primary-dark);
	transform: translateY(-1px);
}

.su-plan-cta-ghost {
	background: transparent;
	color: var(--color-text);
	border: 1px solid var(--color-border-strong);
}

.su-plan-cta-ghost:hover {
	border-color: var(--color-primary);
	color: var(--color-primary);
}

.su-pricing-foot {
	max-width: 56ch;
	margin: 48px auto 0;
	text-align: center;
}

.su-pricing-foot p {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 300;
	font-size: 16px;
	line-height: 1.6;
	color: var(--color-text-light);
	margin: 0;
}

/* ── PARA QUIÉN ── */
.su-audience-card {
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 20px;
	padding: 36px;
	transition: border-color 0.3s, transform 0.3s;
}

.su-audience-card:hover {
	border-color: var(--color-border-strong);
	transform: translateY(-4px);
}

.su-audience-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 52px;
	height: 52px;
	border-radius: 16px;
	background: var(--color-primary-pastel);
	color: var(--color-primary);
	font-size: 20px;
	margin-bottom: 20px;
}

.su-audience-title {
	font-family: var(--font-display);
	font-size: 19px;
	font-weight: 600;
	letter-spacing: -0.01em;
	color: var(--color-text);
	margin: 0;
}

.su-audience-desc {
	font-size: 15px;
	line-height: 1.6;
	color: var(--color-text-light);
	margin: 10px 0 0;
}

/* ── TRABAJO SELECCIONADO ── */
.su-work-card {
	display: block;
	background: var(--color-surface);
	border-radius: 16px;
	border: 1px solid var(--color-border);
	overflow: hidden;
	transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
}

.su-work-card:hover {
	box-shadow: 0 20px 40px rgba(13, 17, 23, 0.08);
	transform: translateY(-4px);
	border-color: var(--color-border-strong);
}

/* ── FAQ ── */
.su-faq-bg {
	background: #060A11;
}

html[data-theme="light"] .su-faq-bg {
	background: var(--color-primary-900);
}

.su-faq-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	margin-bottom: 18px;
}

.su-faq-title {
	font-family: var(--font-display);
	font-size: clamp(30px, 3.6vw, 48px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: #FFFFFF;
	margin: 0;
}

.su-faq-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

/* ── CONTACTO ── */
.su-contact-card {
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 20px;
	padding: 36px;
}

@media (min-width: 768px) {
	.su-contact-card {
		padding: 48px;
	}
}
</style>
