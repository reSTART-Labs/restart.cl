<template>
	<section id="faq" class="py-24 px-6 md:px-12 faq-bg">
		<div class="container mx-auto max-w-3xl">
			<div class="text-center mb-16">
				<p class="faq-eyebrow">FAQ</p>
				<h2 class="faq-title">
					Preguntas <em>frecuentes</em>
				</h2>
			</div>

			<div class="flex flex-col divide-y divide-white/10">
				<div
					v-for="(item, index) in faqs"
					:key="index"
					class="py-6"
				>
					<button
						class="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
						@click="toggle(index)"
					>
						<h3 class="text-base md:text-lg font-medium text-white group-hover:text-primary transition-colors">
							{{ item.question }}
						</h3>
						<span
							class="shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300"
							:class="open === index ? 'bg-primary border-primary rotate-45' : 'group-hover:border-primary'"
						>
							<i class="fa fa-plus text-xs text-white"></i>
						</span>
					</button>
					<div
						class="grid transition-all duration-300 ease-in-out"
						:class="open === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'"
					>
						<div class="overflow-hidden">
							<p class="text-sm md:text-base text-white/60 leading-relaxed">
								{{ item.answer }}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="text-center mt-16 pt-10 border-t border-white/10">
				<p class="faq-foot-text">
					&iquest;No encontraste lo que buscabas?
				</p>
				<RouterLink
					to="/#contact"
					class="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-[0.08em] px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark mt-6"
				>
					Cont&aacute;ctanos ahora
				</RouterLink>
			</div>
		</div>
	</section>
</template>

<style scoped>
.faq-bg {
	background: #060A11;
}

html[data-theme="light"] .faq-bg {
	background: var(--color-primary-900);
}

.faq-eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary-300);
	margin-bottom: 18px;
}

.faq-title {
	font-family: var(--font-display);
	font-size: clamp(30px, 3.6vw, 48px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: #FFFFFF;
	margin: 0;
}

.faq-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.faq-foot-text {
	font-family: var(--font-serif);
	font-weight: 300;
	font-style: italic;
	font-size: 16px;
	color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1919px) {
	.faq-title {
		font-size: 45px;
		line-height: 1.12;
	}

	.faq-foot-text {
		font-size: 16px;
		line-height: 1.62;
	}
}

@media (max-width: 1439px) {
	.faq-title {
		font-size: 41px;
		line-height: 1.14;
	}

	.faq-foot-text {
		font-size: 15px;
		line-height: 1.61;
	}
}

@media (max-width: 1199px) {
	.faq-title {
		font-size: 37px;
		line-height: 1.15;
	}

	.faq-foot-text {
		font-size: 15px;
		line-height: 1.60;
	}
}

@media (max-width: 1079px) {
	.faq-title {
		font-size: 34px;
		line-height: 1.17;
	}

	.faq-foot-text {
		font-size: 15px;
		line-height: 1.58;
	}
}

@media (max-width: 991px) {
	.faq-title {
		font-size: 31px;
		line-height: 1.19;
	}

	.faq-foot-text {
		font-size: 15px;
		line-height: 1.57;
	}
}

@media (max-width: 768px) {
	.faq-title {
		font-size: 28px;
		line-height: 1.21;
	}

	.faq-foot-text {
		font-size: 14px;
		line-height: 1.55;
	}
}

@media (max-width: 575px) {
	.faq-title {
		font-size: 26px;
		line-height: 1.22;
	}

	.faq-foot-text {
		font-size: 14px;
		line-height: 1.55;
	}
}
</style>

<script setup>
import { ref } from 'vue'

const open = ref(null)

function toggle(index) {
	open.value = open.value === index ? null : index
}

const faqs = [
	{
		question: '\u00bfCu\u00e1nto cuesta desarrollar un proyecto de software a medida?',
		answer: 'Cada proyecto es \u00fanico, por lo que el costo depende de su alcance, complejidad y tecnolog\u00edas involucradas. Trabajamos con presupuestos adaptados a la realidad de cada emprendimiento. Agenda una asesor\u00eda gratuita y te entregaremos una cotizaci\u00f3n detallada sin compromiso.',
	},
	{
		question: '\u00bfCu\u00e1nto tiempo toma desarrollar una aplicaci\u00f3n web o m\u00f3vil?',
		answer: 'Los tiempos var\u00edan seg\u00fan la complejidad del proyecto. Un MVP puede estar listo en 6 a 10 semanas, mientras que soluciones m\u00e1s completas pueden tomar de 3 a 6 meses. Definimos plazos claros desde el inicio para que siempre sepas qu\u00e9 esperar.',
	},
	{
		question: '\u00bfTrabajan con startups y empresas peque\u00f1as?',
		answer: 'S\u00ed, es nuestra especialidad. re/START naci\u00f3 para acompa\u00f1ar a emprendedores y empresas en crecimiento. Entendemos los desaf\u00edos de construir algo desde cero y adaptamos nuestros servicios para que accedas a tecnolog\u00eda de primer nivel sin importar tu tama\u00f1o.',
	},
	{
		question: '\u00bfC\u00f3mo es el proceso de trabajo?',
		answer: 'Seguimos un proceso colaborativo en etapas: descubrimiento y estrategia, dise\u00f1o UX/UI, desarrollo, pruebas y lanzamiento. En cada fase mantenemos comunicaci\u00f3n constante para asegurar que el resultado se alinee con tus objetivos de negocio.',
	},
	{
		question: '\u00bfOfrecen soporte despu\u00e9s del lanzamiento?',
		answer: 'Por supuesto. Ofrecemos planes de mantenimiento y soporte continuo para que tu producto evolucione junto a tu negocio. Esto incluye actualizaciones, monitoreo, correcci\u00f3n de incidencias y nuevas funcionalidades seg\u00fan lo necesites.',
	},
	{
		question: '\u00bfQu\u00e9 tecnolog\u00edas utilizan?',
		answer: 'Trabajamos con un stack moderno y probado: Vue.js, React y Node.js para desarrollo web, Python para automatizaci\u00f3n e inteligencia de datos, AWS y Google Cloud para infraestructura, y herramientas como Figma para dise\u00f1o de producto. Elegimos la tecnolog\u00eda que mejor se adapte a tu proyecto.',
	},
]
</script>
