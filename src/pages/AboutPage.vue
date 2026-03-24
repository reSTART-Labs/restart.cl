<template>
	<!-- Hero statement -->
	<section class="relative bg-primary-ocean py-32 px-6 md:px-12 max-md:py-24">
		<div class="absolute inset-0 bg-gradient-to-br from-primary-ocean to-dark opacity-90"></div>
		<div class="relative z-10 container mx-auto max-w-4xl">
			<h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
				En re/START creemos en construir tecnolog&iacute;a con prop&oacute;sito, trabajar junto a quienes se atreven a emprender y crear soluciones que abren camino a nuevas oportunidades.
			</h1>
			<p class="text-primary-sky text-lg md:text-xl font-semibold mt-8">
				Tecnolog&iacute;a hecha por y para emprendedores.
			</p>
			<RouterLink
				to="/#contact"
				class="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark mt-10"
			>
				Conversemos
			</RouterLink>
		</div>
	</section>

	<!-- Company story -->
	<section class="py-24 px-6 md:px-12">
		<div class="container mx-auto max-w-4xl">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
				<div>
					<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
						Nuestra historia
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
						Construimos soluciones digitales que impulsan el crecimiento de emprendedores y empresas
					</h2>
				</div>
				<div class="flex flex-col gap-6">
					<p class="text-base text-text-light leading-[29px]">
						re/START naci&oacute; con una convicci&oacute;n simple: que los emprendedores merecen acceso a tecnolog&iacute;a de primer nivel, sin importar su tama&ntilde;o. Desde nuestros inicios, nos enfocamos en acompa&ntilde;ar a quienes est&aacute;n construyendo algo nuevo, ofreciendo soluciones digitales que realmente se adaptan a sus necesidades y presupuestos.
					</p>
					<p class="text-base text-text-light leading-[29px]">
						Con el tiempo, fuimos creciendo junto a nuestros clientes. Hoy somos un equipo que combina dise&ntilde;o, desarrollo y estrategia tecnol&oacute;gica para ayudar a empresas de todos los tama&ntilde;os a digitalizarse, optimizar procesos y escalar sus operaciones con herramientas hechas a su medida.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- What we do -->
	<section class="py-24 px-6 md:px-12 bg-features-bg">
		<div class="container mx-auto max-w-4xl">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
				<div>
					<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
						Lo que hacemos
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
						Especializados en transformar ideas en productos digitales reales
					</h2>
				</div>
				<div class="flex flex-col gap-6">
					<p class="text-base text-text-light leading-[29px]">
						Nos especializamos en la digitalizaci&oacute;n de procesos, el descubrimiento de oportunidades y el desarrollo de productos que generan impacto. Desde aplicaciones web y m&oacute;viles hasta infraestructura cloud, cubrimos todo el ciclo de vida tecnol&oacute;gico de tu empresa.
					</p>
					<p class="text-base text-text-light leading-[29px]">
						Nuestro equipo de profesionales certificados trabaja con las &uacute;ltimas tecnolog&iacute;as para entregar soluciones robustas y escalables, siempre con un enfoque personalizado que entiende la realidad de cada emprendimiento.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Team -->
	<section class="py-24 px-6 md:px-12">
		<div class="container mx-auto max-w-3xl text-center">
			<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
				Nuestro equipo
			</p>
			<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
				Somos un equipo multidisciplinario de profesionales, unidos por la convicci&oacute;n de crear soluciones que hacen crecer negocios
			</h2>
			<p class="text-base text-text-light leading-[29px] mt-8">
				Dise&ntilde;adores, desarrolladores, ingenieros cloud y estrategas digitales que entienden lo que significa construir algo desde cero. Porque muchos de nosotros tambi&eacute;n somos emprendedores.
			</p>
		</div>
	</section>

	<!-- Values -->
	<section class="py-24 px-6 md:px-12 bg-features-bg">
		<div class="container mx-auto">
			<div class="text-center mb-16">
				<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
					Nuestros valores
				</p>
				<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
					Lo que nos define
				</h2>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
				<div
					v-for="value in values"
					:key="value.title"
					class="bg-white rounded-2xl p-7 border border-border/60"
				>
					<i :class="[value.icon, 'text-primary text-2xl']"></i>
					<h4 class="text-base font-semibold text-dark mt-4 mb-2">{{ value.title }}</h4>
					<p class="text-sm text-text-light leading-relaxed">{{ value.description }}</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Partnership -->
	<section class="py-24 px-6 md:px-12">
		<div class="container mx-auto max-w-4xl">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
				<div>
					<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
						Nuestro compromiso
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
						M&aacute;s que proveedores, somos tu socio tecnol&oacute;gico
					</h2>
				</div>
				<div class="flex flex-col gap-6">
					<p class="text-base text-text-light leading-[29px]">
						Nos involucramos al 100% en cada proyecto, desde la concepci&oacute;n de la idea hasta su implementaci&oacute;n y evoluci&oacute;n. Entendemos tus objetivos de negocio porque hablamos tu mismo idioma: el del emprendedor que necesita resultados concretos.
					</p>
					<p class="text-base text-text-light leading-[29px]">
						No entregamos soluciones gen&eacute;ricas. Trabajamos de manera colaborativa para crear tecnolog&iacute;a que se ajusta a tu realidad, tus tiempos y tu visi&oacute;n de crecimiento.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-24 px-6 md:px-12 bg-primary-ocean">
		<div class="container mx-auto max-w-3xl text-center">
			<h2 class="text-white text-3xl md:text-4xl font-light leading-tight">
				En re/START, tus metas son nuestras metas.
			</h2>
			<p class="text-white/70 text-base leading-relaxed mt-6 max-w-xl mx-auto">
				Nos comprometemos a entender tus necesidades y ofrecer soluciones personalizadas que impulsen el &eacute;xito de tu emprendimiento.
			</p>
			<RouterLink
				to="/#contact"
				class="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-full no-underline transition-all duration-200 hover:bg-primary-dark mt-10"
			>
				Conversemos
			</RouterLink>
		</div>
	</section>
</template>

<script setup>
const values = [
	{
		icon: 'ion-ios-lightbulb-outline',
		title: 'Innovaci\u00f3n',
		description: 'Exploramos nuevas ideas y tendencias para ofrecer soluciones que marquen la diferencia en tu negocio.',
	},
	{
		icon: 'ion-paintbrush',
		title: 'Creatividad',
		description: 'Dise\u00f1amos con prop\u00f3sito, buscando soluciones que combinan funcionalidad y est\u00e9tica.',
	},
	{
		icon: 'ion-ios-eye-outline',
		title: 'Transparencia',
		description: 'Construimos relaciones basadas en la confianza, con comunicaci\u00f3n clara en cada etapa del proyecto.',
	},
	{
		icon: 'ion-ios-flame',
		title: 'Pasi\u00f3n',
		description: 'Nos apasiona la tecnolog\u00eda y el crecimiento continuo. Cada proyecto es una oportunidad de superarnos.',
	},
	{
		icon: 'ion-ios-heart-outline',
		title: 'Compromiso',
		description: 'Nos involucramos con integridad en cada relaci\u00f3n, cumpliendo lo que prometemos.',
	},
	{
		icon: 'ion-ios-star-outline',
		title: 'Calidad',
		description: 'Buscamos la excelencia en cada detalle, desde el c\u00f3digo hasta la experiencia final del usuario.',
	},
	{
		icon: 'ion-ios-people',
		title: 'Trabajo en equipo',
		description: 'Creemos en el poder de la colaboraci\u00f3n, tanto dentro de nuestro equipo como con nuestros clientes.',
	},
	{
		icon: 'ion-chatboxes',
		title: 'Comunicaci\u00f3n',
		description: 'Mantenemos canales abiertos y claros para que siempre sepas en qu\u00e9 estado est\u00e1 tu proyecto.',
	},
]
</script>
