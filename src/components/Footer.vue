<template>
	<footer class="site-footer pt-16 pb-8">
		<div class="container mx-auto px-6 md:px-12">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 footer-divider">
				<!-- Brand -->
				<div>
					<RouterLink to="/" class="text-xl font-semibold tracking-wide text-white no-underline">
						re/START
					</RouterLink>
					<p class="text-sm text-footer-text leading-relaxed mt-4">
						Impulsamos el crecimiento de tu empresa con soluciones tecnológicas a medida.
					</p>
					<div class="flex items-center gap-4 mt-6">
						<a
							href="//twitter.com/restart_cl"
							target="_blank"
							class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-200 no-underline"
						>
							<i class="ion-social-twitter text-sm"></i>
						</a>
						<a
							href="#"
							class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-200 no-underline"
						>
							<i class="ion-social-facebook text-sm"></i>
						</a>
					</div>
				</div>

				<!-- Servicios -->
				<div>
					<h4 class="text-white text-sm font-semibold uppercase tracking-wide mb-5">Servicios</h4>
					<ul class="list-none m-0 p-0 flex flex-col gap-2.5">
						<li v-for="service in services" :key="service.slug">
							<RouterLink
								:to="`/servicios/${service.slug}`"
								class="text-sm text-footer-text hover:text-primary no-underline transition-colors"
							>
								{{ service.title }}
							</RouterLink>
						</li>
					</ul>
				</div>

				<!-- Empresa -->
				<div>
					<h4 class="text-white text-sm font-semibold uppercase tracking-wide mb-5">Empresa</h4>
					<ul class="list-none m-0 p-0 flex flex-col gap-2.5">
						<li>
							<RouterLink to="/nosotros" class="text-sm text-footer-text hover:text-primary no-underline transition-colors">
								Nosotros
							</RouterLink>
						</li>
						<li>
							<RouterLink to="/#contact" class="text-sm text-footer-text hover:text-primary no-underline transition-colors">
								Contacto
							</RouterLink>
						</li>
						<li>
							<a href="//restart-devs.tawk.help" target="_blank" class="text-sm text-footer-text hover:text-primary no-underline transition-colors">
								Centro de ayuda
							</a>
						</li>
					</ul>
				</div>

				<!-- Laboratorio -->
				<div>
					<h4 class="text-white text-sm font-semibold uppercase tracking-wide mb-5">
						<RouterLink to="/labs" class="text-white no-underline hover:text-primary transition-colors">
							Laboratorio
						</RouterLink>
					</h4>
					<ul class="list-none m-0 p-0 flex flex-col gap-2.5">
						<li v-for="lab in labsProjects" :key="lab.slug">
							<RouterLink
								v-if="!lab.external"
								:to="`/labs/${lab.slug}`"
								class="text-sm text-footer-text hover:text-primary no-underline transition-colors"
							>
								{{ lab.name }}
							</RouterLink>
							<a
								v-else
								:href="lab.url"
								target="_blank"
								rel="noopener"
								class="text-sm text-footer-text hover:text-primary no-underline transition-colors"
							>
								{{ lab.name }}
							</a>
						</li>
						<li>
							<RouterLink
								to="/labs"
								class="inline-flex items-center gap-1.5 text-sm text-primary-sky hover:text-primary no-underline transition-colors"
							>
								Ver todos
								<i class="fa fa-arrow-right text-[9px]"></i>
							</RouterLink>
						</li>
					</ul>
				</div>
			</div>

			<!-- Bottom -->
			<div class="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
				<p class="text-xs text-white/40">
					{{ year }} re/START by <a href="https://minicatalogo.com" target="_blank" class="text-white/40 hover:text-primary no-underline transition-colors">Minicatalogo.com</a>. Todos los derechos reservados.
				</p>
				<p class="text-xs text-white/40">
					help@restart.cl
				</p>
			</div>
		</div>
	</footer>
</template>

<script setup>
import { services } from '@/data/services.js'
import { labsProjects } from '@/data/labsProjects.js'

const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
	position: relative;
	background: var(--color-footer-bg);
	box-shadow:
		inset 0 60px 80px -60px rgba(0, 0, 0, 0.4),
		0 -20px 40px -20px rgba(0, 0, 0, 0.12);
}

.site-footer::before {
	content: "";
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: min(1200px, 90%);
	height: 1px;
	background: linear-gradient(to right,
		transparent 0%,
		color-mix(in oklab, var(--color-primary-300) 35%, transparent) 50%,
		transparent 100%);
	opacity: 0.4;
}

/* Soft divider between grid and bottom row — no hard line */
.footer-divider {
	position: relative;
}

.footer-divider::after {
	content: "";
	position: absolute;
	left: 50%;
	bottom: 0;
	transform: translateX(-50%);
	width: 80%;
	height: 1px;
	background: linear-gradient(to right,
		transparent 0%,
		rgba(255, 255, 255, 0.08) 20%,
		rgba(255, 255, 255, 0.08) 80%,
		transparent 100%);
}
</style>
