<template>
	<section id="about" class="py-24 px-6 md:px-12">
		<div class="container mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<!-- Content -->
				<div class="max-w-xl">
					<p class="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
						Sobre nosotros
					</p>
					<h2 class="text-3xl md:text-4xl font-light text-dark leading-tight">
						Tecnolog&iacute;a hecha por y para emprendedores
					</h2>
					<p class="text-base text-text-light leading-[29px] mt-8">
						<strong class="text-dark">re/START</strong> naci&oacute; para acompa&ntilde;ar a quienes est&aacute;n construyendo algo nuevo.
						Combinamos dise&ntilde;o, desarrollo y estrategia tecnol&oacute;gica para crear soluciones digitales que se adaptan a la realidad de cada emprendimiento.
					</p>

					<!-- Stats -->
					<div class="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
						<div>
							<p class="text-3xl md:text-4xl font-light text-primary">+50</p>
							<p class="text-xs text-text-muted uppercase tracking-wide mt-1">Proyectos</p>
						</div>
						<div>
							<p class="text-3xl md:text-4xl font-light text-primary">+30</p>
							<p class="text-xs text-text-muted uppercase tracking-wide mt-1">Clientes</p>
						</div>
						<div>
							<p class="text-3xl md:text-4xl font-light text-primary">+8</p>
							<p class="text-xs text-text-muted uppercase tracking-wide mt-1">A&ntilde;os</p>
						</div>
					</div>

					<RouterLink
						to="/nosotros"
						class="inline-flex items-center gap-2 text-primary text-sm font-medium mt-8 no-underline hover:gap-3 transition-all duration-200"
					>
						Con&oacute;cenos m&aacute;s
						<i class="fa fa-arrow-right text-xs"></i>
					</RouterLink>
				</div>

				<!-- Image composition -->
				<div class="relative hidden lg:block">
					<div class="about-image-grid">
						<div class="overflow-hidden rounded-2xl">
							<img
								src="/img/office.jpg"
								alt="Equipo re/START trabajando"
								class="w-full h-[360px] object-cover"
								loading="lazy"
							>
						</div>
						<div class="overflow-hidden rounded-2xl mt-6 ml-12">
							<img
								src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80"
								alt="Colaboraci&oacute;n en equipo"
								class="w-full h-[220px] object-cover"
								loading="lazy"
							>
						</div>
					</div>
					<!-- Decorative accent -->
					<div class="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary/20 rounded-2xl"></div>
					<div class="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-xl"></div>
				</div>
			</div>
		</div>
	</section>
</template>
