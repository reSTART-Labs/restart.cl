/**
 * Fuente única de proyectos: productos propios de Re/START Labs (`type: 'labs'`)
 * y proyectos hechos para clientes (`type: 'customer'`).
 *
 * @typedef {Object} ProjectFeature
 * @property {string} icon   Clase de Ionicons 2.0.1.
 * @property {string} title
 * @property {string} desc
 *
 * @typedef {Object} ProjectScreenshot
 * @property {string} src     Ruta pública de la imagen.
 * @property {string} label   Pestaña de la galería ("Sitio", "Inicio", …).
 * @property {string} caption
 * @property {'web' | 'mobile'} [device]  Marco en la galería: navegador (por defecto) o teléfono.
 *
 * @typedef {Object} ProjectCredit
 * @property {string} role
 * @property {string} name
 * @property {string} [url]  Si existe, el nombre se enlaza (pestaña nueva).
 *
 * @typedef {Object} ProjectTestimonial
 * @property {string} quote
 * @property {string} name
 * @property {string} role
 * @property {string} [company]
 * @property {'client' | 'end-user'} side
 * @property {string} [avatar]
 *
 * @typedef {Object} Project
 * @property {string} slug
 * @property {'labs' | 'customer'} type
 * @property {string} name
 * @property {string} client          Nombre del cliente; Labs usa "Producto propio".
 * @property {boolean} [mvp]          Se muestra en /startup.
 * @property {string[]} tags          Chips de las tarjetas.
 * @property {string} tagline
 * @property {string} shortDescription
 * @property {string} [description]
 * @property {string} url
 * @property {string} status
 * @property {number} [year]
 * @property {string} category
 * @property {string[]} platforms
 * @property {string} brandColor
 * @property {string} brandDark
 * @property {string} [brandAccent]
 * @property {string} [logo]
 * @property {string} heroImage
 * @property {string} problem
 * @property {string} solution
 * @property {ProjectFeature[]} [features]
 * @property {{ value: string, label: string }[]} [stats]
 * @property {{ web: string, mobile?: string }} showcase  Capturas de página completa para el hero.
 * @property {ProjectScreenshot[]} screenshots
 * @property {{ name: string, category: string }[]} [tech]
 * @property {string[]} [highlights]
 * @property {{ name: string, url: string, image: string, desc: string }[]} [clients]
 * @property {ProjectCredit[]} [credits]
 * @property {ProjectTestimonial[]} [testimonials]  Solo testimonios reales entregados por el cliente.
 * @property {string} cta
 */

export const PROJECT_TYPES = ['labs', 'customer']

const TRES_MARIAS_CREDITS = [
	{ role: 'Diseño', name: 'Tres Marías Estudio' },
	{ role: 'Desarrollo WordPress', name: 'Re/START' },
]

/** @type {Project[]} Clientes primero, luego Labs (el home los muestra en este orden). */
export const projects = [
	{
		slug: 'grupo-zenit',
		type: 'customer',
		name: 'Grupo Zenit',
		client: 'Grupo Zenit',
		tags: ['WordPress', 'Desarrollo a medida', 'Multilenguaje'],
		tagline: 'Activando el futuro de la innovación científico-tecnológica',
		shortDescription: 'Sitio corporativo para una consultora de innovación científico-tecnológica, con secciones de programas, servicios, eventos y versión bilingüe.',
		url: 'https://grupozenit.cl',
		status: 'live',
		category: 'Sitio corporativo',
		platforms: ['Web'],
		brandColor: '#C3F950',
		brandDark: '#21280E',
		brandAccent: '#05A278',
		heroImage: '/img/projects/grupo-zenit/site-1.jpg',
		problem: 'Grupo Zenit acompaña a startups Deep Tech, universidades, empresas y sector público con programas y servicios muy distintos entre sí. Necesitaba un sitio que explicara esa oferta con claridad a cada público y que pudiera crecer con nuevos programas y eventos sin depender de un desarrollador.',
		solution: 'Un sitio corporativo en WordPress que ordena la oferta en dos líneas —programas para startups y servicios de estrategia— y presenta cada programa con su propia página. El equipo de Zenit publica programas, eventos y contenidos por su cuenta, en español y en inglés.',
		features: [
			{
				icon: 'ion-ios-lightbulb-outline',
				title: 'Programas a la vista',
				desc: 'Cada programa de incubación y aceleración tiene su página, para que una startup entienda rápido cuál le sirve.',
			},
			{
				icon: 'ion-ios-briefcase-outline',
				title: 'Servicios para instituciones',
				desc: 'Universidades, empresas y sector público encuentran la oferta de estrategia, transferencia tecnológica e innovación corporativa.',
			},
			{
				icon: 'ion-ios-calendar-outline',
				title: 'Eventos',
				desc: 'Una sección de eventos que el equipo actualiza por su cuenta para convocar a su comunidad.',
			},
			{
				icon: 'ion-ios-paper-outline',
				title: 'Versión bilingüe',
				desc: 'Contenido en español y en inglés para llegar a socios e inversionistas de fuera de Chile.',
			},
			{
				icon: 'ion-ios-email-outline',
				title: 'Contacto directo',
				desc: 'Un formulario «¡Hablemos!» en cada página para que quien llega con un proyecto escriba de inmediato.',
			},
		],
		showcase: {
			web: '/img/projects/grupo-zenit/web.jpg',
			mobile: '/img/projects/grupo-zenit/mobile.jpg',
		},
		screenshots: [
			{
				src: '/img/projects/grupo-zenit/site-1.jpg',
				label: 'Sitio',
				caption: 'Portada del sitio con la propuesta de Zenit y el acceso directo a conversar.',
			},
			{
				src: '/img/projects/grupo-zenit/site-2.jpg',
				label: 'Qué hacemos',
				caption: 'Las dos líneas de trabajo —ventures y estrategia— y la entrada a los programas.',
			},
		],
		credits: TRES_MARIAS_CREDITS,
		cta: 'Visita el sitio',
	},
	{
		slug: 'hs-paneles',
		type: 'customer',
		name: 'HS Paneles',
		client: 'HS Paneles',
		tags: ['WordPress', 'Desarrollo a medida', 'Catálogo'],
		tagline: 'Cubiertas y revestimientos de acero, con cotización en línea',
		shortDescription: 'Sitio corporativo para una empresa de cubiertas y revestimientos de acero, con catálogo de productos, proyectos y cotización en línea.',
		url: 'https://hspaneles.cl',
		status: 'live',
		category: 'Sitio corporativo',
		platforms: ['Web'],
		brandColor: '#D50021',
		brandDark: '#152036',
		brandAccent: '#1F4355',
		heroImage: '/img/projects/hs-paneles/site-1.jpg',
		problem: 'HS Paneles vende soluciones técnicas —paneles, cubiertas, placas y hojalatería— a constructoras y profesionales de todo Chile. Sus clientes necesitan entender qué producto calza con su obra y pedir una cotización sin pasar por varias llamadas.',
		solution: 'Un sitio corporativo en WordPress con el catálogo ordenado por línea de producto, los servicios técnicos que acompañan cada obra, un portafolio de proyectos ejecutados y un formulario de cotización que llega directo al equipo de ventas.',
		features: [
			{
				icon: 'ion-cube',
				title: 'Catálogo por línea',
				desc: 'Paneles aislados, cubiertas emballetadas, revestimientos, placas colaborantes y hojalatería, cada uno con su ficha.',
			},
			{
				icon: 'ion-clipboard',
				title: 'Cotización en línea',
				desc: 'Un formulario con tipo de proyecto y datos de la empresa para que el equipo técnico responda con una propuesta.',
			},
			{
				icon: 'ion-wrench',
				title: 'Servicios técnicos',
				desc: 'Asesoría, cubicación, montaje y postventa explicados para que el cliente sepa qué lo acompaña además del producto.',
			},
			{
				icon: 'ion-ios-location-outline',
				title: 'Portafolio de obras',
				desc: 'Proyectos industriales, de retail y obra pública que muestran la experiencia de la empresa en terreno.',
			},
			{
				icon: 'ion-social-whatsapp',
				title: 'Contacto inmediato',
				desc: 'WhatsApp directo y correo de ventas siempre a mano para quien prefiere conversar antes de cotizar.',
			},
		],
		showcase: {
			web: '/img/projects/hs-paneles/web.jpg',
			mobile: '/img/projects/hs-paneles/mobile.jpg',
		},
		screenshots: [
			{
				src: '/img/projects/hs-paneles/site-1.jpg',
				label: 'Sitio',
				caption: 'Portada del sitio con la trayectoria de la empresa y el acceso a productos y cotización.',
			},
			{
				src: '/img/projects/hs-paneles/site-2.jpg',
				label: 'Productos',
				caption: 'Líneas de producto con su descripción y la entrada a los servicios técnicos.',
			},
		],
		credits: TRES_MARIAS_CREDITS,
		cta: 'Visita el sitio',
	},
	{
		slug: 'mercado',
		type: 'labs',
		name: 'Merc@do',
		client: 'Producto propio',
		mvp: true,
		tags: ['SaaS', 'Mercado Público', 'Alertas por correo'],
		tagline: 'Te avisamos cuando el Estado quiere comprar lo que vendes',
		shortDescription: 'Revisa las licitaciones y compras ágiles de Mercado Público y te avisa por correo solo de las que calzan con tu negocio, con el porqué de cada una.',
		description: 'Merc@do lee Mercado Público por ti. Cada licitación y compra ágil nueva pasa por el embudo que armas una sola vez —palabras clave, códigos y filtros— y recibe un puntaje de match. Solo lo que de verdad calza con tu negocio llega a tu correo.',
		url: 'https://mercado.restart.cl',
		status: 'live',
		year: 2026,
		category: 'SaaS',
		platforms: ['Web'],
		brandColor: '#A3FF6A',
		brandDark: '#0F0F0F',
		heroImage: '/img/projects/mercado/site-1.jpg',
		problem: 'Todos los días salen cientos de licitaciones y compras ágiles de todo Chile y de todos los rubros, muchas con códigos que no corresponden. Revisarlas a mano quita horas, y una compra ágil se resuelve en pocos días: si la ves tarde, ya no alcanzas a ofertar.',
		solution: 'Un embudo que armas una vez con lo que vendes. Merc@do revisa cada proceso nuevo, le da un puntaje de match de 0 a 100 con la razón y te envía por correo solo lo que vale la pena. Lo demás queda en tu panel por si quieres mirarlo.',
		features: [
			{
				icon: 'ion-ios-search-strong',
				title: 'Embudo a tu medida',
				desc: 'Palabras clave, códigos de ChileCompra y filtros por región, monto y días al cierre, de lo más amplio a lo más fino.',
			},
			{
				icon: 'ion-ios-analytics-outline',
				title: 'Puntaje de match',
				desc: 'Cada proceso recibe un puntaje de 0 a 100 y la razón de por qué calza con tu negocio.',
			},
			{
				icon: 'ion-ios-email-outline',
				title: 'Avisos por correo',
				desc: 'Un resumen diario con los mejores matches o un aviso inmediato, sin spam.',
			},
			{
				icon: 'ion-ios-eye-outline',
				title: 'Lo mal categorizado también',
				desc: 'Busca tus palabras en el texto de cada proceso y te avisa cuando un match llegó sin tus códigos.',
			},
			{
				icon: 'ion-ios-flame',
				title: 'Tendencias',
				desc: 'Lo que más está comprando el Estado cada semana, comparado con los meses anteriores.',
			},
			{
				icon: 'ion-ios-people-outline',
				title: 'Tu equipo en el mismo panel',
				desc: 'Parte con tu RUT, trae los datos de tu negocio y suma a tu equipo para revisar los matches juntos.',
			},
		],
		showcase: {
			web: '/img/projects/mercado/web.jpg',
			mobile: '/img/projects/mercado/mobile.jpg',
		},
		screenshots: [
			{
				src: '/img/projects/mercado/site-1.jpg',
				label: 'Sitio',
				caption: 'Portada pública de Merc@do con su propuesta y el acceso para crear una cuenta gratis.',
			},
			{
				src: '/img/projects/mercado/site-2.jpg',
				label: 'El problema',
				caption: 'Por qué revisar Mercado Público a mano no alcanza, y cómo DATO lo hace por ti.',
			},
		],
		cta: 'Prueba Merc@do',
	},
	{
		slug: 'bogy',
		type: 'labs',
		client: 'Producto propio',
		mvp: true,
		tags: ['Vue 3', 'NestJS', 'React Native', 'PostgreSQL'],
		name: 'BoGy',
		tagline: 'Gestiona tu negocio deportivo',
		shortDescription: 'Plataforma para gimnasios, academias y entrenadores: alumnos, reservas, pagos y asistencia en un solo lugar.',
		description: 'BoGy centraliza la gestión operativa y comercial de negocios deportivos. Cada dueño administra su negocio desde un dashboard web; alumnos y entrenadores usan una app mobile para reservar, pagar y registrar asistencia. Cada negocio ve solo sus datos, cobra con tarjeta o wallet y mantiene informados a sus alumnos con correos automáticos.',
		url: 'https://bogy.cl',
		status: 'live',
		year: 2026,
		logo: '/img/labs/bogy/logo.png',
		brandColor: '#00ff87',
		brandDark: '#07070d',
		brandAccent: '#7c3aed',
		heroImage: '/img/labs/bogy/home.png',
		category: 'SaaS',
		platforms: ['Web', 'iOS', 'Android'],
		problem: 'Los gimnasios y academias deportivas usan Excel, WhatsApp y hojas impresas para gestionar alumnos, planes, horarios y pagos. El resultado: cobros perdidos, dobles reservas y horas desperdiciadas en tareas manuales.',
		solution: 'Un único dashboard web para el dueño del negocio y una app mobile simple para alumnos y entrenadores. Todo conectado en tiempo real: alumnos reservan, el sistema valida plan y cupo, el entrenador marca asistencia y los pagos se cobran automáticamente.',
		features: [
			{
				icon: 'ion-ios-people-outline',
				title: 'Gestión de alumnos',
				desc: 'Invita por email, crea perfiles directos, asigna planes y consulta el historial de asistencia y pagos.',
			},
			{
				icon: 'ion-ios-calendar-outline',
				title: 'Horarios y reservas',
				desc: 'Slots recurrentes por disciplina con capacidad máxima. Los alumnos reservan desde la app y el sistema valida su plan.',
			},
			{
				icon: 'ion-ios-checkmark-outline',
				title: 'Asistencia por clase',
				desc: 'Grilla por entrenador con marcado rápido de asistencia, alta y baja de alumnos en tiempo real.',
			},
			{
				icon: 'ion-card',
				title: 'Pagos online',
				desc: 'Mercado Pago, Transbank Oneclick, Apple Pay y Google Pay. Suscripciones con renovación automática y alertas de vencimiento.',
			},
			{
				icon: 'ion-ios-email-outline',
				title: 'Correos automáticos',
				desc: 'Verificación de cuenta, invitaciones, confirmaciones de reserva y avisos de vencimiento, sin que nadie tenga que enviarlos a mano.',
			},
			{
				icon: 'ion-ios-locked-outline',
				title: 'Cada negocio, sus datos',
				desc: 'Cada negocio ve y administra solo su información, y sus pagos y credenciales quedan protegidos.',
			},
			{
				icon: 'ion-ios-analytics-outline',
				title: 'Reportes y KPIs',
				desc: 'Métricas de alumnos, entrenadores, planes activos y asistencia. Exportación de datos para tomar decisiones.',
			},
			{
				icon: 'ion-ios-paperplane-outline',
				title: 'Invitaciones por código',
				desc: 'Códigos de 6 dígitos con expiración para sumar alumnos y entrenadores sin fricción desde la app.',
			},
		],
		stats: [
			{ value: '5', label: 'Medios de pago' },
			{ value: '3', label: 'Plataformas (web, dashboard, app)' },
			{ value: '24/7', label: 'Disponibilidad' },
		],
		showcase: {
			web: '/img/projects/bogy/web.jpg',
			mobile: '/img/projects/bogy/app-home.jpg',
		},
		screenshots: [
			{
				src: '/img/projects/bogy/site-1.jpg',
				label: 'Sitio',
				caption: 'Portada pública de BoGy con su propuesta para negocios deportivos y el acceso para empezar.',
			},
			{
				src: '/img/projects/bogy/site-2.jpg',
				label: 'Sitio en detalle',
				caption: 'Lo que resuelve para el dueño del negocio y para quién está pensado: gimnasios, box, escalada, yoga y academias.',
			},
			{
				src: '/img/labs/bogy/home.png',
				label: 'Inicio',
				caption: 'Lo que ofrece Bogy en una mirada y cómo crear una cuenta para empezar a probarlo.',
			},
			{
				src: '/img/labs/bogy/caracteristicas.png',
				label: 'Características',
				caption: 'Las nueve funciones principales, ordenadas por gestión, pagos, marketing e integraciones.',
			},
			{
				src: '/img/projects/bogy/app-calendar.jpg',
				device: 'mobile',
				label: 'App: reservar',
				caption: 'En la app, el alumno elige su clase y asegura su cupo en segundos.',
			},
			{
				src: '/img/projects/bogy/app-achievements.jpg',
				device: 'mobile',
				label: 'App: logros',
				caption: 'Cada clase suma: medallas y rachas que motivan a los alumnos a volver.',
			},
			{
				src: '/img/labs/bogy/precios.png',
				label: 'Precios',
				caption: 'Un plan gratuito para partir, condiciones claras y respuestas a las dudas más comunes.',
			},
			{
				src: '/img/labs/bogy/contacto.png',
				label: 'Contacto',
				caption: 'Un formulario y otros canales para que un gimnasio o academia pueda escribirnos.',
			},
		],
		tech: [
			{ name: 'Vue 3', category: 'Frontend' },
			{ name: 'Vite SSR', category: 'Frontend' },
			{ name: 'NestJS', category: 'Backend' },
			{ name: 'Prisma', category: 'ORM' },
			{ name: 'PostgreSQL', category: 'Database' },
			{ name: 'Redis', category: 'Cache' },
			{ name: 'React Native', category: 'Mobile' },
			{ name: 'Docker', category: 'Infra' },
			{ name: 'Railway', category: 'Infra' },
			{ name: 'Nginx', category: 'Infra' },
			{ name: 'MailerSend', category: 'Correos' },
			{ name: 'Supabase Storage', category: 'Storage' },
		],
		highlights: [
			'Cada negocio ve y administra solo sus datos',
			'Cobro online con cinco medios de pago, incluidos Apple Pay y Google Pay',
			'Sitio público rápido y fácil de encontrar en buscadores',
			'Pagos y credenciales protegidos de punta a punta',
		],
		cta: 'Visita BoGy',
	},
	{
		slug: 'api-restart',
		type: 'labs',
		client: 'Producto propio',
		tags: ['Vue.js', 'Node.js', 'API REST', 'Tailwind'],
		name: 'MarketData',
		tagline: 'Los datos públicos de Chile, en una sola API',
		shortDescription: 'Indicadores económicos, cotizaciones, clima, sismos, mercado público, vehículos y oferta académica en una API REST gratuita, siempre al día y lista para conectar a cualquier producto.',
		description: 'MarketData toma los datos públicos de Chile —repartidos hoy entre decenas de organismos y formatos— y los entrega como una sola API REST, con documentación y sin pedir autenticación para empezar. Es la pieza que permite levantar un producto con datos reales en días y no en meses.',
		url: 'https://api.restart.cl',
		status: 'live',
		year: 2026,
		category: 'Plataforma',
		platforms: ['API REST', 'Web'],
		brandColor: '#10B981',
		brandDark: '#0A0F0D',
		heroImage: '/img/labs/api-restart/home.png',
		problem: 'Los datos públicos de Chile existen, pero viven repartidos entre el Banco Central, el SII, ChileCompra, el Centro Sismológico y decenas de organismos más, cada uno con su propio formato y su propia disponibilidad. Cualquier producto que los necesite termina gastando su tiempo en ir a buscarlos, en vez de en lo que quería construir.',
		solution: 'Una sola API REST que entrega todo eso ya normalizado y al día, con un formato estable y documentación clara. Nosotros nos hacemos cargo de las fuentes; el producto que la consume parte directo desde el dato listo para usar.',
		features: [
			{
				icon: 'ion-ios-analytics-outline',
				title: 'Indicadores económicos',
				desc: 'UF, UTM, dólar, euro, TPM, IPC, cobre y oro, al día y con su serie histórica.',
			},
			{
				icon: 'ion-ios-refresh-outline',
				title: 'Cotizaciones',
				desc: 'Tipo de cambio compra y venta para USD, EUR, BRL, ARS y UYU.',
			},
			{
				icon: 'ion-ios-partlysunny-outline',
				title: 'Clima y sismos',
				desc: 'Temperatura, pronóstico a 7 días y calidad del aire por ciudad, más la actividad sísmica del país.',
			},
			{
				icon: 'ion-ios-briefcase-outline',
				title: 'Mercado público',
				desc: 'Órdenes de compra y licitaciones del Estado, con sus organismos y proveedores.',
			},
			{
				icon: 'ion-ios-car',
				title: 'Vehículos',
				desc: 'Tasación fiscal e historial de revisiones técnicas, consultables por patente.',
			},
			{
				icon: 'ion-ios-calendar-outline',
				title: 'Calendario',
				desc: 'Feriados legales con su ley y efemérides de varios países, resueltas para cualquier fecha.',
			},
			{
				icon: 'ion-ios-book-outline',
				title: 'Oferta académica',
				desc: 'Programas de universidades e institutos con precios, modalidad y fechas de inicio.',
			},
			{
				icon: 'ion-ios-locked-outline',
				title: 'Cuentas y cuotas',
				desc: 'Login con Google o GitHub, API keys propias y límites según el nivel de uso.',
			},
		],
		stats: [
			{ value: '15', label: 'Servicios de datos' },
			{ value: '100M+', label: 'Registros consultables' },
			{ value: '24/7', label: 'Actualización automática' },
			{ value: 'Gratis', label: 'Para empezar a usarla' },
		],
		showcase: {
			web: '/img/projects/api-restart/web.jpg',
			mobile: '/img/projects/api-restart/mobile.jpg',
		},
		screenshots: [
			{
				src: '/img/projects/api-restart/site-1.jpg',
				label: 'Sitio',
				caption: 'Portada pública de MarketData con los indicadores del día y el catálogo de servicios de datos.',
			},
			{
				src: '/img/projects/api-restart/site-2.jpg',
				label: 'Sitio en detalle',
				caption: 'Fuentes oficiales, actualización automática y un ejemplo de consulta listo para copiar.',
			},
			{
				src: '/img/labs/api-restart/home.png',
				label: 'Inicio',
				caption: 'Indicadores en vivo, la propuesta de valor y un ejemplo de llamada listo para copiar.',
			},
			{
				src: '/img/labs/api-restart/docs.png',
				label: 'Documentación',
				caption: 'Guía de inicio y catálogo de endpoints, para partir en minutos.',
			},
			{
				src: '/img/labs/api-restart/indicadores.png',
				label: 'Indicadores',
				caption: 'UF, UTM, dólar y euro con su serie histórica y la fuente oficial de cada valor.',
			},
			{
				src: '/img/labs/api-restart/calendario.png',
				label: 'Calendario',
				caption: 'Feriados y efemérides por mes, listos para alimentar cualquier calendario o portada.',
			},
			{
				src: '/img/labs/api-restart/educacion.png',
				label: 'Educación',
				caption: 'Programas por institución con precio, modalidad y fecha de inicio, buscables y filtrables.',
			},
			{
				src: '/img/labs/api-restart/mercado-publico.png',
				label: 'Mercado público',
				caption: 'Órdenes de compra y licitaciones del Estado, con montos, organismos y proveedores.',
			},
		],
		/*
		 * Stack a la vista solo como señal de capacidad. A propósito no se listan
		 * los detalles de arquitectura interna: acá el mensaje es lo que se puede
		 * construir con esto, no cómo está hecho por dentro.
		 */
		tech: [
			{ name: 'NestJS', category: 'Backend' },
			{ name: 'Node.js', category: 'Backend' },
			{ name: 'PostgreSQL', category: 'Database' },
			{ name: 'Nuxt 3', category: 'Frontend' },
			{ name: 'Tailwind', category: 'Frontend' },
			{ name: 'JSON:API', category: 'Formato' },
			{ name: 'OpenAPI', category: 'Docs' },
			{ name: 'OAuth 2.0', category: 'Auth' },
			{ name: 'Docker', category: 'Infra' },
		],
		/*
		 * Productos externos que consumen la API. indicadoresdeldia.cl NO va acá:
		 * hoy es un 302 a api.restart.cl/indicadores, así que es la misma plataforma
		 * y no un producto aparte que la use.
		 */
		clients: [
			{
				name: 'MiPortada.cl',
				url: 'https://miportada.cl',
				image: '/img/labs/miportada/home.png',
				desc: 'Portal de noticias de Chile y el mundo. Su sección «Hoy se conmemora» sale del calendario y las efemérides de esta API.',
			},
		],
		cta: 'Ver la documentación',
	},
	// LearningPath oculto mientras learningpath.cl esté caído (solo hay una captura de error).
	// Para volver a mostrarlo: descomentar y reponer imágenes reales del sitio.
	/*
	{
		slug: 'learningpath',
		type: 'labs',
		name: 'LearningPath',
		client: 'Producto propio',
		mvp: true,
		tags: ['React', 'Python', 'IA', 'PostgreSQL'],
		tagline: 'Caminos de aprendizaje que se adaptan',
		shortDescription: 'Plataforma para armar, compartir y seguir rutas de aprendizaje personalizadas en equipos y comunidades.',
		url: 'https://learningpath.cl',
		status: 'live',
		year: 2024,
		category: 'Educación',
		platforms: ['Web'],
		brandColor: '#563CF8',
		brandDark: '#1E1E1E',
		heroImage: '/img/labs/learningpath/home.png',
		problem: 'Aprender algo nuevo hoy significa navegar entre cursos, artículos y videos sueltos sin saber por dónde partir ni qué viene después. En equipos y comunidades, cada persona termina armando su propio camino y el conocimiento no se comparte.',
		solution: 'Una plataforma donde se arman rutas de aprendizaje paso a paso, se comparten con el equipo o la comunidad y cada persona sigue su avance. El camino se adapta a lo que cada uno ya sabe.',
		features: [
			{
				icon: 'ion-ios-navigate-outline',
				title: 'Rutas paso a paso',
				desc: 'Recursos ordenados en un camino claro, de lo básico a lo avanzado.',
			},
			{
				icon: 'ion-ios-people-outline',
				title: 'Para equipos y comunidades',
				desc: 'Las rutas se comparten para que todos aprendan sobre la misma base.',
			},
			{
				icon: 'ion-ios-checkmark-outline',
				title: 'Seguimiento del avance',
				desc: 'Cada persona ve qué completó y qué le falta para terminar su ruta.',
			},
			{
				icon: 'ion-ios-lightbulb-outline',
				title: 'Caminos que se adaptan',
				desc: 'La ruta se personaliza según los intereses y el nivel de cada persona.',
			},
		],
		showcase: {
			web: '/img/labs/learningpath/home.png',
		},
		screenshots: [
			{
				src: '/img/labs/learningpath/home.png',
				label: 'Sitio',
				caption: 'Portada pública de LearningPath con su propuesta para aprender con rutas personalizadas.',
			},
		],
		cta: 'Explora LearningPath',
	},
	*/
	{
		slug: 'petsit',
		type: 'labs',
		client: 'Producto propio',
		mvp: true,
		tags: ['Marketplace', 'Pagos online', 'Web'],
		name: 'Petsit',
		tagline: 'Convierte tu amor por los animales en algo profesional',
		shortDescription: 'Marketplace que conecta cuidadores de mascotas con tutores: alojamiento, guardería, paseos, visitas a domicilio y cuidados especiales.',
		description: 'Petsit es una plataforma que profesionaliza el cuidado de mascotas en Chile. Los tutores encuentran cuidadores responsables en su zona, reservan con pago seguro integrado y reciben actualizaciones durante todo el servicio. Los petsitters construyen un emprendimiento haciendo algo que aman, con respaldo de estándares internacionales de bienestar animal.',
		url: 'https://petsit.cl',
		status: 'live',
		year: 2025,
		category: 'Marketplace',
		platforms: ['Web'],
		brandColor: '#47AE89',
		brandDark: '#11303B',
		brandAccent: '#228398',
		heroImage: '/img/projects/petsit/site-1.jpg',
		problem: 'Dejar a tu mascota con alguien de confianza mientras viajas o trabajas es una decisión cargada de dudas: quién, dónde, por cuánto y con qué garantías. Las alternativas informales dependen de contactos y WhatsApp, sin verificación ni respaldo.',
		solution: 'Un marketplace donde los tutores exploran perfiles verificados de cuidadores cercanos, reservan con pago seguro y mantienen comunicación directa durante todo el servicio. Para los petsitters, una vitrina profesional para construir su emprendimiento en torno al cuidado animal.',
		features: [
			{
				icon: 'ion-ios-home-outline',
				title: 'Alojamiento',
				desc: 'Hospedaje en casa del cuidador con ambiente familiar, ideal para estadías de varios días cuando viajas.',
			},
			{
				icon: 'ion-ios-sunny-outline',
				title: 'Guardería',
				desc: 'Cuidado diurno mientras trabajas. Tu mascota queda acompañada, ejercitada y vuelve a casa al final del día.',
			},
			{
				icon: 'ion-ios-paw-outline',
				title: 'Paseos',
				desc: 'Salidas y ejercicio a domicilio con cuidadores capacitados en manejo, seguridad y socialización.',
			},
			{
				icon: 'ion-ios-heart-outline',
				title: 'Cuidados especiales',
				desc: 'Atención personalizada para mascotas con necesidades médicas, adultos mayores o convalecencia.',
			},
			{
				icon: 'ion-ios-location-outline',
				title: 'Visitas a domicilio',
				desc: 'El cuidador va a tu casa para alimentar, pasear y acompañar a tu mascota en su entorno conocido.',
			},
			{
				icon: 'ion-ios-ribbon-outline',
				title: 'Entrenamiento',
				desc: 'Formación y corrección de comportamiento con petsitters especializados en adiestramiento positivo.',
			},
		],
		showcase: {
			web: '/img/projects/petsit/web.jpg',
			mobile: '/img/projects/petsit/mobile.jpg',
		},
		screenshots: [
			{
				src: '/img/projects/petsit/site-1.jpg',
				label: 'Sitio',
				caption: 'Portada pública de Petsit con los servicios de cuidado y el acceso para tutores y cuidadores.',
			},
			{
				src: '/img/projects/petsit/site-2.jpg',
				label: 'Sitio en detalle',
				caption: 'Lo que encuentra un petsitter en la plataforma: visibilidad, conexión directa con tutores y gestión simple.',
			},
			{
				src: '/img/projects/petsit/home.jpg',
				label: 'Inicio',
				caption: 'Hero del marketplace con los seis servicios, flujo de reserva en tres pasos y cobertura por zonas.',
			},
			{
				src: '/img/labs/petsit/petsitter.png',
				label: 'Petsitter',
				caption: 'Página de postulación para cuidadores: beneficios de profesionalizarse en Petsit y formulario de ingreso.',
			},
		],
		highlights: [
			'Cuidadores con verificación de antecedentes y capacitación',
			'Reserva con pago seguro integrado de punta a punta',
			'Estándares internacionales de bienestar animal',
			'Emparejamiento por zona para reducir tiempos y costos',
		],
		cta: 'Conoce Petsit',
	},
	{
		slug: 'minicatalogo',
		type: 'labs',
		name: 'Minicatalogo',
		client: 'Producto propio',
		mvp: true,
		tags: ['Vue.js', 'Firebase', 'Tailwind', 'PWA'],
		tagline: 'Tu catálogo online en minutos',
		shortDescription: 'Sitio web y tienda online para emprendedores, con catálogo de productos, pagos y ventas por redes sociales y WhatsApp, sin conocimientos técnicos.',
		url: 'https://minicatalogo.com',
		status: 'live',
		year: 2023,
		category: 'E-commerce',
		platforms: ['Web'],
		brandColor: '#3333CC',
		brandDark: '#001524',
		heroImage: '/img/projects/minicatalogo/site-1.jpg',
		problem: 'Un emprendedor quiere vender por internet, pero armar un sitio y una tienda le quita el tiempo que necesita para atender su negocio. Las ventas quedan repartidas entre Instagram, Facebook y WhatsApp, sin un lugar que las ordene.',
		solution: 'Una plataforma donde el emprendedor crea su catálogo, publica su sitio con dominio propio y vende con pagos integrados, mientras centraliza en un solo lugar lo que llega desde sus redes. La parte técnica y el soporte corren por cuenta de Minicatalogo.',
		features: [
			{
				icon: 'ion-monitor',
				title: 'Sitio web propio',
				desc: 'Diseños listos, dominio propio, certificado SSL y formulario de contacto.',
			},
			{
				icon: 'ion-bag',
				title: 'Tienda online',
				desc: 'Catálogo de productos o servicios con pagos por Webpay, Flow, Mercado Pago, PayU y PayPal.',
			},
			{
				icon: 'ion-social-whatsapp',
				title: 'Redes y WhatsApp',
				desc: 'El catálogo se vincula con Facebook, Instagram y WhatsApp para vender donde ya están los clientes.',
			},
			{
				icon: 'ion-ios-analytics-outline',
				title: 'Informes al instante',
				desc: 'La información de cada venta en el celular, para decidir con datos al día.',
			},
			{
				icon: 'ion-ios-bolt-outline',
				title: 'Lista para los Cyber',
				desc: 'Probada en más de 6 eventos Cyber sin salas de espera ni caídas.',
			},
		],
		showcase: {
			web: '/img/projects/minicatalogo/web.jpg',
			mobile: '/img/projects/minicatalogo/mobile.jpg',
		},
		screenshots: [
			{
				src: '/img/projects/minicatalogo/site-1.jpg',
				label: 'Sitio',
				caption: 'Portada pública de Minicatalogo con su propuesta para emprendedores y el acceso a registrar un negocio.',
			},
			{
				src: '/img/projects/minicatalogo/site-2.jpg',
				label: 'Canales de venta',
				caption: 'Sitio web y tienda online: lo que incluye cada canal para empezar a vender.',
			},
			{
				src: '/img/projects/minicatalogo/home.jpg',
				label: 'Inicio',
				caption: 'Página de inicio completa: sitio web, tienda online y venta B2B para negocios, con sus planes y beneficios.',
			},
		],
		cta: 'Crea tu catálogo',
	},
]

/** @param {string} slug */
export function getProject(slug) {
	return projects.find((p) => p.slug === slug)
}

/** @param {Project} p */
export function projectPath(p) {
	return p.type === 'labs' ? `/labs/${p.slug}` : `/portafolio/${p.slug}`
}

/**
 * Path canónico para /labs/:slug o /portafolio/:slug cuando el proyecto existe y
 * su ruta correcta es la otra; null en cualquier otro caso. Ignora trailing slash.
 * @param {string} path
 * @returns {string | null}
 */
export function canonicalPath(path) {
	const m = /^\/(?:labs|portafolio)\/([^/]+)\/?$/.exec(path)
	if (!m) return null
	const p = getProject(m[1])
	if (!p) return null
	const to = projectPath(p)
	return to === path.replace(/\/$/, '') ? null : to
}

export const labsProjects = projects.filter((p) => p.type === 'labs')

export const mvpProjects = projects.filter((p) => p.mvp === true)

/**
 * Dispositivos que muestra el hero, según las capturas disponibles.
 * @param {Partial<Project>} p
 * @returns {Array<'web' | 'mobile'>}
 */
export function heroDevices(p) {
	return ['web', 'mobile'].filter((k) => p.showcase?.[k])
}

/**
 * Segundos que dura un recorrido de auto-scroll por una captura larga:
 * proporcional al alto que queda fuera del viewport, con un mínimo de 6 s.
 * @param {number} heightPx
 * @param {number} viewportPx
 */
export function scrollDuration(heightPx, viewportPx) {
	if (heightPx <= viewportPx) return 0
	return Math.max(6, (heightPx - viewportPx) / 120)
}
