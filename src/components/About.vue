<template>
	<section id="about" class="py-24 px-6 md:px-12">
		<div class="container mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<!-- Content -->
				<div class="about-text">
					<div class="eyebrow">Sobre nosotros</div>
					<h2 class="about-title">
						Tecnolog&iacute;a hecha por y para <em>emprendedores</em>
					</h2>
					<p class="about-lede">
						<strong>re/START</strong> naci&oacute; para acompa&ntilde;ar a quienes est&aacute;n construyendo algo nuevo. Combinamos dise&ntilde;o, desarrollo y estrategia tecnol&oacute;gica para crear soluciones digitales que se adaptan a la realidad de cada emprendimiento.
					</p>

					<div class="about-stats">
						<div class="about-stat">
							<div class="about-stat-num">+50</div>
							<div class="about-stat-label">Proyectos</div>
						</div>
						<div class="about-stat">
							<div class="about-stat-num">+30</div>
							<div class="about-stat-label">Clientes</div>
						</div>
						<div class="about-stat">
							<div class="about-stat-num">+8</div>
							<div class="about-stat-label">A&ntilde;os</div>
						</div>
					</div>

					<RouterLink to="/nosotros" class="about-link">
						Con&oacute;cenos m&aacute;s
						<i class="fa fa-arrow-right text-[10px]"></i>
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

<style scoped>
.eyebrow {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-primary);
	margin-bottom: 18px;
}

.about-title {
	font-family: var(--font-display);
	font-size: clamp(30px, 3.5vw, 48px);
	font-weight: 300;
	letter-spacing: -0.025em;
	line-height: 1.1;
	color: var(--color-text);
	max-width: 18ch;
	margin: 0;
}

.about-title :deep(em) {
	font-family: var(--font-serif);
	font-style: italic;
	font-weight: 400;
	color: var(--color-primary);
}

.about-lede {
	font-family: var(--font-serif);
	font-weight: 300;
	font-size: 17px;
	line-height: 1.8;
	color: var(--color-text-light);
	margin-top: 28px;
	max-width: 56ch;
}

.about-lede :deep(strong) {
	font-family: var(--font-sans);
	font-style: normal;
	font-weight: 700;
	color: var(--color-text);
}

.about-stats {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24px;
	margin-top: 40px;
	padding-top: 40px;
	border-top: 1px solid var(--color-border);
}

.about-stat-num {
	font-family: var(--font-display);
	font-size: clamp(32px, 3vw, 44px);
	font-weight: 100;
	color: var(--color-primary);
	letter-spacing: -0.03em;
	line-height: 1;
}

.about-stat-label {
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: var(--color-text-muted);
	margin-top: 10px;
}

.about-link {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	color: var(--color-primary);
	font-size: 14px;
	font-weight: 500;
	margin-top: 32px;
	text-decoration: none;
	transition: gap 0.2s ease;
}

.about-link:hover {
	gap: 12px;
}

.about-image-grid > div {
	position: relative;
}

@media (max-width: 1919px) {
	.about-title {
		font-size: 45px;
		line-height: 1.12;
	}
	.about-lede {
		font-size: 16px;
		line-height: 1.62;
	}
	.about-stat-num {
		font-size: 41px;
		line-height: 1.12;
	}
	.about-link {
		font-size: 14px;
		line-height: 1.62;
	}
}

@media (max-width: 1439px) {
	.about-title {
		font-size: 41px;
		line-height: 1.14;
	}
	.about-lede {
		font-size: 16px;
		line-height: 1.60;
	}
	.about-stat-num {
		font-size: 38px;
		line-height: 1.14;
	}
	.about-link {
		font-size: 14px;
		line-height: 1.61;
	}
}

@media (max-width: 1199px) {
	.about-title {
		font-size: 37px;
		line-height: 1.15;
	}
	.about-lede {
		font-size: 15px;
		line-height: 1.58;
	}
	.about-stat-num {
		font-size: 34px;
		line-height: 1.15;
	}
	.about-link {
		font-size: 14px;
		line-height: 1.60;
	}
}

@media (max-width: 1079px) {
	.about-title {
		font-size: 34px;
		line-height: 1.17;
	}
	.about-lede {
		font-size: 15px;
		line-height: 1.56;
	}
	.about-stat-num {
		font-size: 31px;
		line-height: 1.17;
	}
	.about-link {
		font-size: 14px;
		line-height: 1.58;
	}
}

@media (max-width: 991px) {
	.about-title {
		font-size: 31px;
		line-height: 1.19;
	}
	.about-lede {
		font-size: 15px;
		line-height: 1.54;
	}
	.about-stat-num {
		font-size: 28px;
		line-height: 1.19;
	}
	.about-link {
		font-size: 14px;
		line-height: 1.57;
	}
}

@media (max-width: 768px) {
	.about-title {
		font-size: 28px;
		line-height: 1.21;
	}
	.about-lede {
		font-size: 15px;
		line-height: 1.52;
	}
	.about-stat-num {
		font-size: 26px;
		line-height: 1.21;
	}
	.about-link {
		font-size: 14px;
		line-height: 1.55;
	}
}

@media (max-width: 575px) {
	.about-title {
		font-size: 26px;
		line-height: 1.22;
	}
	.about-lede {
		font-size: 15px;
		line-height: 1.50;
	}
	.about-stat-num {
		font-size: 26px;
		line-height: 1.22;
	}
	.about-link {
		font-size: 14px;
		line-height: 1.55;
	}
}
</style>
