<template>
	<section id="startup" class="startup-section py-24 px-6 md:px-12">
		<div class="container mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
				<!-- Left column -->
				<div class="lg:col-span-7" data-reveal>
					<h2 class="startup-title">
						Servicios para la <em>innovaci&oacute;n</em> desde cero
					</h2>
					<p class="startup-lede">
						Podemos ayudarte a crear tu Startup de principio a fin, dando forma a tu idea en aplicaciones web y m&oacute;viles listas para salir al mercado. Enf&oacute;cate en que crezca, nosotros en que funcione.
					</p>
					<div class="startup-actions">
						<RouterLink to="/startup" class="startup-cta">
							Desarrolla tu MVP en 3 semanas
						</RouterLink>
						<RouterLink to="/#contact" class="startup-cta-text">
							Hablemos
							<i class="fa fa-arrow-right text-[11px]"></i>
						</RouterLink>
					</div>
				</div>

				<!-- Right column -->
				<div class="lg:col-span-5 lg:pt-4">
					<h3 class="startup-coinvest-title">Co-inversi&oacute;n en Startups</h3>
					<p class="startup-coinvest-text">
						Tambi&eacute;n co-invertimos en nuevas e innovadoras ideas de proyectos, no como proveedores sino como socios. Siempre estamos dispuestos a hablar de cualquier idea de negocio.
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.startup-section {
	background: var(--color-dark-graphite);
	color: #FFFFFF;
}

html[data-theme="dark"] .startup-section {
	background: #0F141D;
}

.startup-title {
	font-family: var(--font-display);
	font-size: clamp(32px, 4vw, 54px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.12;
	color: #FFFFFF;
	max-width: 14ch;
	margin: 0;
}

.startup-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary-300);
}

.startup-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 17px;
	line-height: 1.8;
	color: rgba(255, 255, 255, 0.6);
	margin-top: 36px;
	max-width: 56ch;
}

.startup-actions {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 24px;
	margin-top: 40px;
}

.startup-cta {
	display: inline-flex;
	align-items: center;
	padding: 16px 44px;
	border-radius: 999px;
	border: 1.5px solid rgba(255, 255, 255, 0.85);
	color: #FFFFFF;
	font-size: 14px;
	font-weight: 700;
	letter-spacing: 0.04em;
	text-decoration: none;
	transition: all 0.25s ease;
}

.startup-cta:hover {
	background: #FFFFFF;
	color: var(--color-dark-graphite);
	transform: translateY(-1px);
}

.startup-cta-text {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	color: rgba(255, 255, 255, 0.85);
	font-size: 14px;
	font-weight: 600;
	text-decoration: none;
	transition: gap 0.2s ease, color 0.2s ease;
}

.startup-cta-text:hover {
	color: #FFFFFF;
	gap: 12px;
}

.startup-coinvest-title {
	font-family: var(--font-display);
	font-size: clamp(20px, 2vw, 24px);
	font-weight: 600;
	letter-spacing: -0.01em;
	line-height: 1.2;
	color: #FFFFFF;
	margin: 0;
}

.startup-coinvest-text {
	font-family: var(--font-sans);
	font-weight: 300;
	font-size: 16px;
	line-height: 1.75;
	color: rgba(255, 255, 255, 0.55);
	margin-top: 20px;
	max-width: 48ch;
}

@media (max-width: 1919px) {
	.startup-title {
		font-size: 51px;
		line-height: 1.12;
	}
	.startup-lede {
		font-size: 16px;
		line-height: 1.62;
	}
	.startup-cta {
		font-size: 14px;
		line-height: 1.62;
	}
	.startup-cta-text {
		font-size: 14px;
		line-height: 1.62;
	}
	.startup-coinvest-title {
		font-size: 23px;
		line-height: 1.26;
	}
	.startup-coinvest-text {
		font-size: 16px;
		line-height: 1.62;
	}
}

@media (max-width: 1439px) {
	.startup-title {
		font-size: 46px;
		line-height: 1.14;
	}
	.startup-lede {
		font-size: 16px;
		line-height: 1.60;
	}
	.startup-cta {
		font-size: 14px;
		line-height: 1.61;
	}
	.startup-cta-text {
		font-size: 14px;
		line-height: 1.61;
	}
	.startup-coinvest-title {
		font-size: 21px;
		line-height: 1.28;
	}
	.startup-coinvest-text {
		font-size: 15px;
		line-height: 1.61;
	}
}

@media (max-width: 1199px) {
	.startup-title {
		font-size: 42px;
		line-height: 1.15;
	}
	.startup-lede {
		font-size: 15px;
		line-height: 1.58;
	}
	.startup-cta {
		font-size: 14px;
		line-height: 1.60;
	}
	.startup-cta-text {
		font-size: 14px;
		line-height: 1.60;
	}
	.startup-coinvest-title {
		font-size: 20px;
		line-height: 1.30;
	}
	.startup-coinvest-text {
		font-size: 15px;
		line-height: 1.60;
	}
}

@media (max-width: 1079px) {
	.startup-title {
		font-size: 38px;
		line-height: 1.17;
	}
	.startup-lede {
		font-size: 15px;
		line-height: 1.56;
	}
	.startup-cta {
		font-size: 14px;
		line-height: 1.58;
	}
	.startup-cta-text {
		font-size: 14px;
		line-height: 1.58;
	}
	.startup-coinvest-title {
		font-size: 18px;
		line-height: 1.32;
	}
	.startup-coinvest-text {
		font-size: 15px;
		line-height: 1.58;
	}
}

@media (max-width: 991px) {
	.startup-title {
		font-size: 35px;
		line-height: 1.19;
	}
	.startup-lede {
		font-size: 15px;
		line-height: 1.54;
	}
	.startup-cta {
		font-size: 14px;
		line-height: 1.57;
	}
	.startup-cta-text {
		font-size: 14px;
		line-height: 1.57;
	}
	.startup-coinvest-title {
		font-size: 18px;
		line-height: 1.33;
	}
	.startup-coinvest-text {
		font-size: 15px;
		line-height: 1.57;
	}
}

@media (max-width: 768px) {
	.startup-title {
		font-size: 31px;
		line-height: 1.21;
	}
	.startup-lede {
		font-size: 15px;
		line-height: 1.52;
	}
	.startup-cta {
		font-size: 14px;
		line-height: 1.55;
	}
	.startup-cta-text {
		font-size: 14px;
		line-height: 1.55;
	}
	.startup-coinvest-title {
		font-size: 18px;
		line-height: 1.34;
	}
	.startup-coinvest-text {
		font-size: 14px;
		line-height: 1.55;
	}
}

@media (max-width: 575px) {
	.startup-title {
		font-size: 29px;
		line-height: 1.22;
	}
	.startup-lede {
		font-size: 15px;
		line-height: 1.50;
	}
	.startup-cta {
		font-size: 14px;
		line-height: 1.55;
	}
	.startup-cta-text {
		font-size: 14px;
		line-height: 1.55;
	}
	.startup-coinvest-title {
		font-size: 18px;
		line-height: 1.35;
	}
	.startup-coinvest-text {
		font-size: 14px;
		line-height: 1.55;
	}
}
</style>
