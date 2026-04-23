<template>
	<footer class="bg-dark pt-16 pb-8">
		<div class="container mx-auto px-6 md:px-12">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
				<!-- Brand -->
				<div>
					<RouterLink to="/" class="text-xl font-semibold tracking-wide text-white no-underline">
						re/START
					</RouterLink>
					<p class="text-sm text-footer-text leading-relaxed mt-4">
						Agencia digital especializada en dise&ntilde;o de experiencias y desarrollo de productos digitales.
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
					&copy; {{ year }} re/START. Todos los derechos reservados.
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
