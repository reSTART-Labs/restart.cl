/**
 * credits (opcional): [{ role, name, url? }] — se muestran como "role: name"
 * separados por " · ". Si trae url, el nombre se enlaza (abre en pestaña nueva).
 */
export const projects = [
	{
		slug: 'grupo-zenit',
		title: 'Grupo Zenit',
		client: 'Grupo Zenit',
		category: 'web',
		description: 'Sitio corporativo para una consultora de innovación científico-tecnológica, con secciones de programas, servicios, eventos y versión bilingüe.',
		image: '/img/portfolio/zenit.jpg',
		tags: ['WordPress', 'Desarrollo a medida', 'Multilenguaje'],
		url: 'https://grupozenit.cl',
		credits: [
			{ role: 'Diseño', name: 'Tres Marías Estudio' },
			{ role: 'Desarrollo WordPress', name: 'Re/START' },
		],
	},
	{
		slug: 'hs-paneles',
		title: 'HS Paneles',
		client: 'HS Paneles',
		category: 'web',
		description: 'Sitio corporativo para una empresa de cubiertas y revestimientos de acero, con catálogo de productos, proyectos y cotización en línea.',
		image: '/img/portfolio/hspaneles.jpg',
		tags: ['WordPress', 'Desarrollo a medida', 'Catálogo'],
		url: 'https://hspaneles.cl',
		credits: [
			{ role: 'Diseño', name: 'Tres Marías Estudio' },
			{ role: 'Desarrollo WordPress', name: 'Re/START' },
		],
	},
	{
		slug: 'marketdata',
		title: 'MarketData',
		client: 'Producto propio',
		category: 'web',
		description: 'Los datos públicos de Chile en una sola API REST: indicadores económicos, cotizaciones, clima, sismos, mercado público y más, siempre al día.',
		image: '/img/labs/api-restart/home.png',
		tags: ['Vue.js', 'Node.js', 'API REST', 'Tailwind'],
		url: 'https://api.restart.cl',
	},
	{
		slug: 'learning-path',
		title: 'LearningPath',
		client: 'Producto propio',
		category: 'web',
		description: 'Herramienta que genera rutas de aprendizaje personalizadas para desarrolladores, conectando recursos y tecnologías.',
		image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
		tags: ['React', 'Python', 'IA', 'PostgreSQL'],
		url: 'https://learningpath.cl',
	},
	{
		slug: 'minicatalogo',
		title: 'Minicatalogo.com',
		client: 'Producto propio',
		category: 'web',
		description: 'Plataforma SaaS para que emprendedores creen su catálogo digital de productos en minutos, sin conocimientos técnicos.',
		image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
		tags: ['Vue.js', 'Firebase', 'Tailwind', 'PWA'],
		url: 'https://minicatalogo.com',
	},
	{
		slug: 'gestion-deportiva',
		title: 'Sistema de gestión deportiva',
		client: 'Centro deportivo',
		category: 'software',
		description: 'Sistema integral para la administración de clases, membresías, pagos y reportes de un centro deportivo.',
		image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
		tags: ['Vue.js', 'Node.js', 'PostgreSQL', 'AWS'],
	},
	{
		slug: 'ecommerce-b2b',
		title: 'Plataforma e-commerce B2B',
		client: 'Empresa de distribución',
		category: 'software',
		description: 'Portal de ventas mayoristas con catálogo dinámico, gestión de pedidos, crédito y facturación electrónica integrada.',
		image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80',
		tags: ['React', 'Node.js', 'Docker', 'AWS'],
	},
	{
		slug: 'app-delivery',
		title: 'App de delivery regional',
		client: 'Startup logística',
		category: 'mobile',
		description: 'Aplicación móvil para gestión de entregas en tiempo real con tracking, notificaciones push y panel de administración.',
		image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80',
		tags: ['React Native', 'Node.js', 'Firebase', 'Google Maps'],
	},
]

export const categories = [
	{ value: 'all', label: 'Todos' },
	{ value: 'web', label: 'Web' },
	{ value: 'software', label: 'Software' },
	{ value: 'mobile', label: 'Mobile' },
]
