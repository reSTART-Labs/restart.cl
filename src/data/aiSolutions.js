export const aiSolutions = [
	{
		slug: 'rag-systems',
		title: 'RAG Systems',
		icon: 'ion-ios-search-strong',
		headline: 'Conversaciones precisas sobre tu propia información',
		description: 'Conectamos modelos de lenguaje con tus datos privados —manuales, políticas, tickets, bases de conocimiento— mediante Retrieval-Augmented Generation. El resultado: respuestas contextuales, trazables y seguras que reducen alucinaciones y aceleran la atención interna y a clientes.',
		items: [
			'Búsqueda semántica',
			'Respuestas con citas',
			'Conocimiento privado',
			'Actualización continua',
		],
		features: [
			{
				title: 'Indexación semántica',
				desc: 'Procesamos PDFs, wikis, correos y bases de datos con embeddings para buscar por significado y no solo por palabras clave.',
			},
			{
				title: 'Respuestas citadas',
				desc: 'Cada respuesta incluye las fuentes consultadas, garantizando trazabilidad y control editorial sobre la información entregada.',
			},
			{
				title: 'Permisos y seguridad',
				desc: 'Filtramos resultados según el rol del usuario para que nadie acceda a información fuera de su perímetro autorizado.',
			},
			{
				title: 'Evaluación continua',
				desc: 'Monitoreo de precisión, relevancia y latencia con pipelines automatizados que detectan regresiones antes que el usuario.',
			},
		],
		benefits: [
			'Reducción drástica de alucinaciones del modelo',
			'Respuestas en segundos sobre miles de documentos',
			'Auditoría completa de fuentes consultadas',
			'Integración con Confluence, Notion, SharePoint y más',
		],
		image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
		cta: 'Activa tu RAG',
		bg: '#228398',
	},
	{
		slug: 'graph-rag-systems',
		title: 'Graph RAG Systems',
		icon: 'ion-ios-loop-strong',
		headline: 'Razonamiento sobre relaciones, no solo documentos',
		description: 'Extendemos el RAG clásico con grafos de conocimiento que capturan entidades, jerarquías y relaciones entre tus datos. Ideal para preguntas complejas que requieren conectar múltiples fuentes, inferir dependencias y razonar sobre estructuras organizacionales, técnicas o contractuales.',
		items: [
			'Grafo de conocimiento',
			'Razonamiento multi-hop',
			'Entidades conectadas',
			'Exploración visual',
		],
		features: [
			{
				title: 'Extracción de entidades',
				desc: 'Identificamos automáticamente personas, productos, contratos y cláusulas junto con sus relaciones dentro de tus documentos.',
			},
			{
				title: 'Grafo de conocimiento',
				desc: 'Modelamos tu dominio con nodos y relaciones explícitas, consultables en tiempo real por el modelo y por tu equipo.',
			},
			{
				title: 'Consultas multi-hop',
				desc: 'Conectamos información distante —cliente → contrato → cláusula → riesgo— en una sola respuesta coherente y fundamentada.',
			},
			{
				title: 'Visualización interactiva',
				desc: 'Exploración visual del grafo para validar conexiones, descubrir patrones ocultos y comunicar hallazgos al negocio.',
			},
		],
		benefits: [
			'Responde preguntas que un RAG plano no puede',
			'Descubre relaciones no evidentes en tu data',
			'Mayor precisión en dominios estructurados',
			'Base sólida para agentes con memoria persistente',
		],
		image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
		cta: 'Modela tu dominio',
		bg: '#563CF8',
	},
	{
		slug: 'agentic-systems',
		title: 'Agentic Systems',
		icon: 'ion-ios-cog-outline',
		headline: 'Agentes autónomos que ejecutan, no solo responden',
		description: 'Diseñamos agentes de IA capaces de planificar, invocar herramientas y coordinarse entre sí para completar tareas complejas de punta a punta. Desde la automatización de procesos internos hasta asistentes que interactúan con CRMs, correos y APIs en nombre de tu equipo.',
		items: [
			'Planning autónomo',
			'Uso de herramientas',
			'Multi-agente',
			'Human-in-the-loop',
		],
		features: [
			{
				title: 'Planning y tool use',
				desc: 'Agentes que descomponen objetivos y eligen la herramienta correcta —APIs, bases de datos, scripts— en cada paso del flujo.',
			},
			{
				title: 'Equipos multi-agente',
				desc: 'Orquestamos agentes especializados (investigador, ejecutor, revisor) que colaboran y se validan entre sí en tareas largas.',
			},
			{
				title: 'Human-in-the-loop',
				desc: 'Checkpoints y aprobaciones configurables antes de acciones críticas o irreversibles, con interfaz amigable para revisores.',
			},
			{
				title: 'Observabilidad total',
				desc: 'Trazas completas de decisiones, costos y latencia por corrida para depurar, mejorar y rendir cuentas a tu negocio.',
			},
		],
		benefits: [
			'Automatización de procesos con lógica flexible',
			'Menos handoffs manuales entre sistemas',
			'Agentes disponibles 24/7 sobre tus herramientas',
			'Escalabilidad sin ampliar el equipo',
		],
		image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
		cta: 'Despliega tu agente',
		bg: '#11303B',
	},
	{
		slug: 'document-intelligence',
		title: 'Document Intelligence',
		icon: 'ion-ios-paper-outline',
		headline: 'De documentos a datos estructurados',
		description: 'Transformamos contratos, facturas, formularios y expedientes —incluso escaneados o manuscritos— en información estructurada y lista para integrarse a tus sistemas. Combinamos OCR, visión por computador y LLMs para extraer, validar y clasificar con altísima precisión a escala.',
		items: [
			'OCR inteligente',
			'Extracción estructurada',
			'Clasificación automática',
			'Validación cruzada',
		],
		features: [
			{
				title: 'OCR y visión',
				desc: 'Lectura precisa de PDFs, imágenes y manuscritos con modelos especializados para cada tipo de documento y formato.',
			},
			{
				title: 'Extracción semántica',
				desc: 'Pasamos de páginas sueltas a campos estructurados —montos, partes, fechas, cláusulas— listos para ingresar a tus sistemas.',
			},
			{
				title: 'Clasificación automática',
				desc: 'Identificamos el tipo de documento y lo enrutamos al proceso correcto sin intervención humana ni reglas frágiles.',
			},
			{
				title: 'Validación cruzada',
				desc: 'Chequeos entre documentos y contra tus sistemas maestros para detectar inconsistencias antes de procesar o facturar.',
			},
		],
		benefits: [
			'Procesamiento 10x más rápido que manual',
			'Reducción de errores de ingreso de datos',
			'Escalamiento sin crecer el back-office',
			'Trazabilidad legal y auditable',
		],
		image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
		cta: 'Digitaliza tus documentos',
		bg: '#36343B',
	},
	{
		slug: 'decision-intelligence',
		title: 'Decision Intelligence',
		icon: 'ion-ios-analytics-outline',
		headline: 'IA que apoya decisiones, no las reemplaza',
		description: 'Integramos modelos predictivos, simulación y explicabilidad para que los tomadores de decisiones cuenten con recomendaciones accionables, escenarios cuantificados y confianza en cada paso. Para pricing, demanda, asignación de recursos y gestión de riesgo.',
		items: [
			'Forecasting',
			'Simulación de escenarios',
			'Optimización',
			'Explicabilidad',
		],
		features: [
			{
				title: 'Modelos predictivos',
				desc: 'Forecasts de demanda, churn, riesgo y comportamiento con evaluación honesta de la incertidumbre y sus límites.',
			},
			{
				title: 'Simulación de escenarios',
				desc: 'What-ifs interactivos para evaluar decisiones antes de ejecutarlas, con impacto cuantificado sobre tus KPIs clave.',
			},
			{
				title: 'Optimización',
				desc: 'Programación matemática y aprendizaje por refuerzo para asignar recursos escasos al mejor uso posible.',
			},
			{
				title: 'Explicabilidad',
				desc: 'Razonamiento transparente: el usuario entiende por qué el modelo recomienda algo y cuándo conviene desconfiar.',
			},
		],
		benefits: [
			'Decisiones respaldadas por datos y simulación',
			'Reducción de sesgos y errores operativos',
			'Mejor uso de recursos y capital',
			'Adopción real por parte del negocio',
		],
		image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
		cta: 'Decide con IA',
		bg: '#47AE89',
	},
]
