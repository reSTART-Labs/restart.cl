<template>
	<footer class="bg-footer-bg py-20 relative max-md:pb-24 max-md:text-center">
		<a
			href="#"
			class="absolute left-0 right-0 mx-auto -top-6 w-12 h-12 bg-primary rounded-full flex flex-col items-center justify-center text-white no-underline text-xs tracking-wide hover:bg-primary-dark transition-colors"
			@click.prevent="scrollToTop"
		>
			<i class="fa fa-angle-up text-base"></i>
			TOP
		</a>

		<div class="container mx-auto px-4">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-md:gap-0">
				<div class="max-md:mb-9">
					<h4 class="text-white uppercase font-normal tracking-wide font-['Lato'] text-base">
						<RouterLink to="/servicios/staffing" class="text-white no-underline hover:text-primary-sky transition-colors">Staffing</RouterLink>
					</h4>
					<ul class="list-none p-0 text-footer-text font-serif leading-7">
						<li>Equipos dedicados</li>
						<li>Profesionales especializados</li>
						<li>Aumento de equipo</li>
					</ul>

					<h4 class="text-white uppercase font-normal tracking-wide font-['Lato'] text-base mt-6">
						<RouterLink to="/servicios/desarrollo-de-software" class="text-white no-underline hover:text-primary-sky transition-colors">Desarrollo de software</RouterLink>
					</h4>
					<ul class="list-none p-0 text-footer-text font-serif leading-7">
						<li>Aplicaciones Web</li>
						<li>Apps M&oacute;viles</li>
						<li>Sistemas a Medida</li>
						<li>Integraciones</li>
					</ul>
				</div>

				<div class="max-md:mb-9">
					<h4 class="text-white uppercase font-normal tracking-wide font-['Lato'] text-base">
						<RouterLink to="/servicios/diseno-de-producto" class="text-white no-underline hover:text-primary-sky transition-colors">Dise&ntilde;o de producto</RouterLink>
					</h4>
					<ul class="list-none p-0 text-footer-text font-serif leading-7">
						<li>UX/UI</li>
						<li>Prototipado</li>
						<li>Investigaci&oacute;n de usuarios</li>
						<li>Dise&ntilde;o de interfaces</li>
					</ul>

					<h4 class="text-white uppercase font-normal tracking-wide font-['Lato'] text-base mt-6">
						<RouterLink to="/servicios/tecnologias-cloud" class="text-white no-underline hover:text-primary-sky transition-colors">Tecnolog&iacute;as cloud</RouterLink>
					</h4>
					<ul class="list-none p-0 text-footer-text font-serif leading-7">
						<li>Infraestructura cloud</li>
						<li>Migraci&oacute;n de servicios</li>
						<li>Optimizaci&oacute;n de costos</li>
						<li>Gesti&oacute;n de datos</li>
					</ul>
				</div>

				<div class="max-md:mb-9">
					<h4 class="text-white uppercase font-normal tracking-wide font-['Lato'] text-base">Atenci&oacute;n a clientes</h4>
					<ul class="list-none p-0 text-footer-text font-serif leading-7">
						<li>help@restart.cl</li>
						<li>
							<a href="//restart-devs.tawk.help" target="_blank" class="text-footer-text hover:text-white transition-colors">Ayuda</a>
						</li>
					</ul>
				</div>

				<div class="max-md:mb-9">
					<h4 class="text-white uppercase font-normal tracking-wide font-['Lato'] text-base">Laboratorio</h4>
					<ul class="list-none p-0 text-footer-text font-serif leading-7">
						<li>
							<a href="//indicadoresdeldia.cl" target="_blank" title="Indicadores del D&iacute;a" class="text-footer-text hover:text-white transition-colors">Indicadores del D&iacute;a</a>
						</li>
						<li>
							<a href="//learningpath.cl" target="_blank" title="LearningPath" class="text-footer-text hover:text-white transition-colors">LearningPath</a>
						</li>
						<li>
							<a href="//minicatalogo.com" target="_blank" title="Minicatalogo" class="text-footer-text hover:text-white transition-colors">Minicatalogo.com</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
