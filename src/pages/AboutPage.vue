<template>
	<PageHero title="Sobre nosotros" subtitle="Creatividad, experiencia y tecnología al servicio de tu negocio" />

	<section class="py-20 px-4">
		<div class="container mx-auto max-w-3xl">
			<h3 class="text-2xl font-light uppercase tracking-wide text-dark text-center max-md:text-[23px]">
				Quiénes somos
			</h3>
			<hr class="w-32 mx-auto my-6 border-t-2 border-border">
			<p class="text-base text-text-light leading-[29px] text-center">
				<strong>Re/START</strong> es una agencia digital online, formada por profesionales apasionados por el Diseño y Desarrollo Web.
				Estámos enfocados en resolver las necesidades de tú negocio a través de servicios y soluciones tecnológicas.
			</p>
			<p class="text-base text-text-light leading-[29px] text-center mt-6">
				Combinamos talento, tecnología y diseño para impulsar el crecimiento de tu empresa con soluciones digitales a medida.
				Nuestro equipo multidisciplinario trabaja de manera colaborativa para entregar productos que generan impacto real.
			</p>
		</div>
	</section>

	<section class="py-20 px-4 bg-features-bg border-t border-b border-border">
		<div class="container mx-auto">
			<h3 class="text-2xl font-light uppercase tracking-wide text-dark text-center max-md:text-[23px]">
				Lo que nos mueve
			</h3>
			<hr class="w-32 mx-auto my-6 border-t-2 border-border">

			<div class="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 max-w-4xl mx-auto">
				<div class="text-center">
					<i class="ion-ios-star-outline text-primary text-4xl"></i>
					<h4 class="text-[17px] text-text mt-4 font-semibold">Misión</h4>
					<p class="mt-3 text-[15px] leading-6 text-text-light">
						Desarrollar soluciones digitales que resuelvan problemas reales, generando valor para nuestros clientes y sus usuarios.
					</p>
				</div>
				<div class="text-center">
					<i class="ion-ios-eye-outline text-primary text-4xl"></i>
					<h4 class="text-[17px] text-text mt-4 font-semibold">Visión</h4>
					<p class="mt-3 text-[15px] leading-6 text-text-light">
						Ser referentes en la creación de experiencias digitales innovadoras en Latinoamérica, impulsando la transformación digital de las empresas.
					</p>
				</div>
				<div class="text-center">
					<i class="ion-ios-heart-outline text-primary text-4xl"></i>
					<h4 class="text-[17px] text-text mt-4 font-semibold">Valores</h4>
					<p class="mt-3 text-[15px] leading-6 text-text-light">
						Colaboración, innovación, calidad y compromiso con nuestros clientes. Cada proyecto es una oportunidad para superar expectativas.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="py-20 px-4">
		<div class="container mx-auto text-center">
			<h3 class="text-2xl font-light uppercase tracking-wide text-dark max-md:text-[23px]">
				¿Listo para empezar?
			</h3>
			<hr class="w-32 mx-auto my-6 border-t-2 border-border">
			<p class="text-base text-text-light leading-[29px] max-w-xl mx-auto">
				Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos digitales.
			</p>
			<RouterLink
				to="/#contact"
				class="inline-block mt-8 text-white uppercase font-bold text-[11px] tracking-wide bg-primary rounded-full px-8 py-4 no-underline transition-all duration-200 hover:bg-primary-dark"
			>
				Contáctanos
			</RouterLink>
		</div>
	</section>
</template>

<script setup>
import PageHero from '@/components/PageHero.vue'
</script>
