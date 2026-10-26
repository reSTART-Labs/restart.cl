# Labs: MarketData reemplaza a Indicadores del Día

**Fecha:** 2026-08-12
**Rama:** `main`
**Referencias:** proyecto en `/Users/ricardogatica/Projects/reSTART_Labs/reSTART/api.restart.cl` ·
animación de [suma.cl](https://suma.cl/suma-book-velutti.html)

## Objetivo

Quitar la página `/labs/indicadores-del-dia` y poner en su lugar el proyecto **MarketData**
(la API que vive en api.restart.cl).

**Ajuste posterior a la primera versión (mismo día, feedback del usuario):** el proyecto se llama
**MarketData**, no `api.restart.cl` —ese es solo dónde vive—, y la página **no** debe exponer el
detalle interno del proyecto. El mensaje es *lo que se puede lograr con esto*, no cómo está
construido por dentro. Ver "Nivel de exposición".

## Decisiones

| Decisión | Elección |
|---|---|
| Qué pasa con indicadoresdeldia.cl | Se absorbe. No aparece como cliente: hoy es un redirect a la propia API (ver "Clientes de la API") |
| Alcance de la animación | GSAP + ScrollTrigger, cargado solo en las páginas de proyecto de Labs |
| Material visual | Capturas reales de secciones de api.restart.cl, sin diagramas |
| URL vieja | Redirect 301 a la página nueva |
| Slug | `/labs/api-restart` |

La animación queda en `LabsProjectPage.vue`, así que **la heredan los cinco proyectos de Labs**
(BoGy, PetSit, LearningPath, Minicatálogo y este), no solo la página nueva.

## Lo que ya existe y no hay que construir

`LabsProjectPage.vue` ya renderiza hero, stats, problema/solución, features, galería de capturas
con tabs, stack técnico y highlights. "Qué tecnologías usamos y qué problemas resolvimos" **ya
está soportado por el esquema**: el trabajo es de contenido y datos, no de estructura.

## Arquitectura

```
src/data/labsProjects.js            # -entrada indicadores-del-dia, +entrada api-restart
src/pages/LabsProjectPage.vue       # +sección "hecho con esta API", +motion
src/composables/useProjectMotion.js # nuevo: vocabulario de animación
scripts/capturar-api.cjs            # nuevo: regenerar capturas con Puppeteer
server.js                           # +redirect 301
public/img/labs/api-restart/        # 6 capturas
```

### Única pieza nueva de estructura: `clients`

El esquema no tiene dónde poner "sitios que usan esta API". Se agrega un campo opcional
`clients: [{ name, url, image, desc }]` y una sección al final de la página, que solo se
renderiza si el proyecto lo trae. Reutiliza `/img/labs/indicadores/home.png`, que ya existe en el
repo y quedaría huérfana al borrar la entrada.

### Capturas

`scripts/capturar-api.cjs` toma prestado el Puppeteer del scraper de api.restart.cl (restart.cl
no depende de un navegador) y captura seis secciones a 1440 px de ancho: **home, docs,
indicadores, calendario, educación y mercado público**. El dashboard queda fuera porque exige
sesión.

Queda versionado para regenerar las imágenes cuando el sitio cambie, no como script de un solo
uso. El alto se recorta al contenido real (acotado entre 1400 y 2400 px) porque forzar el alto
del viewport dejaba franjas vacías.

**Peso:** las capturas salen entre 180 y 576 KB, y seis de ese tamaño son ~2,2 MB en una sola
página. Se pasan por `pngquant --quality=65-90`, que las deja en 584 KB en total (73 % menos) sin
degradar el texto pequeño. La convención del repo son capturas de 110-220 KB; con esto quedan
dentro.

### Animación

`gsap` + `ScrollTrigger` con **`import()` dinámico dentro de `onMounted`**: el chunk no entra al
bundle principal ni a ninguna otra ruta, y no toca el SSR. Solo en `/labs/:slug`.

**Peso real medido:** 45 KB gzip (27 de GSAP core + 18 de ScrollTrigger), no los ~35 KB que se
estimaron al diseñar.

`useProjectMotion.js` implementa el vocabulario que usa suma.cl (que es GSAP + ScrollTrigger con
`power2.out` y stagger; su Locomotive Scroll está comentado en el código del tema):

| Efecto de la referencia | Dónde se aplica |
|---|---|
| `linesFadeUp` / `wordsFadeUp` (texto partido, stagger) | h1 del hero y títulos de sección |
| `blockUp` (wipe de bloque que descubre) | capturas y tarjetas de feature |
| stagger + `power2.out` | grilla de features, chips del stack |
| conteo numérico | valores de stats |

**Dos reglas heredadas del episodio del loader:**

1. Se usa `gsap.from()`, que fija el estado inicial **en tiempo de ejecución**. Si el chunk nunca
   carga, el contenido simplemente está visible; nunca invisible esperando JS.
2. `prefers-reduced-motion` corta antes del `import()`, así quien no quiere movimiento tampoco
   paga los 35 KB.

`ScrollTrigger` se destruye en `onUnmounted`: al ser SPA, los triggers se acumularían al navegar
entre proyectos.

### Redirect

En `server.js`, antes del handler de SSR: `/labs/indicadores-del-dia` → `/labs/api-restart` con
301. Funciona en `yarn dev:server` y en producción; **no** en `yarn dev`, que sirve solo el
cliente, igual que pasa con la API de contacto.

## Contenido

Los "problemas resueltos" salen de hechos verificables del repo del proyecto, no de marketing:

- Dos motores de base de datos separados por responsabilidad: PostgreSQL para todo el market data
  y MySQL solo para identidad.
- Ingesta de ~100 millones de revisiones técnicas por `COPY` en streaming, sin cargar los
  archivos en memoria.
- Rate limit por niveles (sin key 5 req/10 s por IP; `free` 100 req/10 s; `paid` sin límite) con
  la key hasheada en SHA-256.
- Unificación de cuentas OAuth **solo por correo verificado**, para que nadie pueda reclamar la
  cuenta de otro declarando su correo.
- El calendario materializa sus reglas de forma perezosa, así no "se acaba" al cambiar de año.
- Navegador headless de Cloudflare como respaldo cuando el scraping propio no pasa.
- Migraciones incrementales que se aplican solas en cada deploy, trackeadas por motor.

Cifras verificadas en el proyecto y en las capturas: 15 servicios de datos, 21 jobs de scraping,
7 servicios en Docker Compose, 1.920 programas académicos, ~100 M de filas de revisiones.

Marca: `#10b981` (el esmeralda que usa el sitio), sobre fondo oscuro.

## Nivel de exposición

La página es una vitrina de capacidad, no una memoria técnica. Regla: si una frase solo le sirve a
alguien que va a reimplementar el proyecto, no va.

| Se queda | Se fue |
|---|---|
| Los 8 dominios de datos (qué se puede pedir) | El conteo de jobs de scraping y de servicios en Docker |
| Stack a nivel de nombres, como señal de capacidad | La sección completa de *highlights* técnicos |
| Cifras de escala de cara al usuario (15 servicios, 100M+ registros) | Los dos motores de BD y su separación por responsabilidad |
| Fuentes oficiales por nombre (Banco Central, SII, ChileCompra) | Hasheo SHA-256 de las keys, unificación de cuentas OAuth, COPY en streaming, navegador headless de respaldo, migraciones por deploy |

Los `stats` pasaron a ser de cara al usuario: **15 servicios de datos · 100M+ registros
consultables · 24/7 actualización automática · gratis para empezar**. `highlights` se eliminó del
dato en vez de reescribirse, porque el encabezado de esa sección en `LabsProjectPage.vue`
("Destacados técnicos · Decisiones que marcan la diferencia") es compartido con los otros
proyectos de Labs y es técnico por definición. Al ser `v-if`, la sección simplemente no se
renderiza.

El stack recortado deja fuera TypeORM, MySQL, Puppeteer, Nginx y Railway: ORM, segundo motor,
scraping y hosting son "cómo está hecho". Quedan 9 chips.

## Clientes de la API

La sección "Hecho con esto" lista **solo MiPortada.cl**, y está pensada para crecer:

| Sitio | Qué consume |
|---|---|
| [MiPortada.cl](https://miportada.cl) | Su bloque "Hoy se conmemora" — calendario y efemérides |

**Por qué indicadoresdeldia.cl no está.** El diseño original lo ponía acá como cliente. Al
verificarlo en el navegador resultó que ya no es un producto aparte:

- `http://indicadoresdeldia.cl` responde **302 → `https://api.restart.cl/indicadores`**. Es un
  dominio de vanidad de la propia plataforma, no un sitio que la consuma.
- Su **HTTPS está caído**: `https://indicadoresdeldia.cl` da `connection refused`. El enlace que
  íbamos a publicar habría estado roto. (Pendiente de infra, fuera de este repo.)
- La captura que había en el repo, `public/img/labs/indicadores/home.png`, **es una pantalla de
  error 522 de Cloudflare** capturada el 2026-04-23, no la portada del sitio. El archivo se dejó
  porque `public/brand/02-pages.html` todavía lo referencia, pero **no sirve como material**.

Decisión del usuario: dejar solo MiPortada. Listar un redirect como "producto que usa la API"
sería falso.

La captura de MiPortada se tomó con Playwright a 1440 de ancho y se redujo a 1400 px
(`public/img/labs/miportada/home.png`). **Nota:** miportada.cl responde **403 a fetch simple**
(protección de bots), así que para volver a capturarla hay que usar un navegador real, no `curl`.
Lo que consume de la API se verificó solo desde su portada; si usa más servicios, falta declararlo.

Con una sola tarjeta, el `1fr` del grid la estiraba a todo el ancho y la captura quedaba como una
franja. Las columnas ahora tienen techo (`minmax(340px, 520px)`) y se centran, así que la tarjeta
mantiene su medida con uno o con varios clientes.

## Notas de implementación

Cosas que aparecieron al construir y no estaban en el diseño:

- **Conflicto entre los dos sistemas de animación.** El hero de `LabsProjectPage` ya traía
  `reveal-stagger` del sistema CSS anterior, así que el CSS animaba las columnas y GSAP su
  contenido: movimiento duplicado y con tiempos distintos. Se quitó `reveal-stagger` de esa
  página; GSAP es dueño del hero ahí. `LabsPage` (el índice) conserva el suyo, es otra ruta.
- **El partidor de palabras es propio y no `SplitText`.** GSAP 3.15 ya trae SplitText, pero los
  títulos del sitio usan `<em>` para el acento en color primario y partir por `textContent` lo
  destruiría. El partidor recorre los nodos hijos y preserva los elementos inline.
- **Proyectos cuyo título es un logo.** En BoGy el `h1` contiene solo un `<img>`, así que no hay
  palabras que partir. Se detecta y se anima el elemento completo, en vez de quedar sin entrada.
- **`src/data/portfolio.js` también tiene un `slug: 'indicadores-del-dia'`.** Se revisó: el
  componente lo usa solo como `:key` y enlaza al sitio externo, no a `/labs/`. No genera enlace
  roto y sigue siendo cierto, así que se dejó intacto.
- **El redirect no conserva query strings** (`res.redirect(301, destino)`). Para una URL de página
  sin parámetros no aporta, y agregarlo sería complejidad sin uso.

## Verificación

Sin Playwright (el MCP se desconectó) no hay capturas de regresión ni medición de frames. Se
verifica con lo disponible:

1. `yarn build` sin errores.
2. `curl` al SSR: `/labs/api-restart` responde 200 y trae el contenido; la ruta vieja responde
   301 con el `Location` correcto.
3. `grep` al HTML servido de otras rutas para confirmar que el chunk de GSAP **no** se carga ahí.
4. Las capturas del script como evidencia del contenido.

**Declarado explícitamente: la animación en sí no se puede ver desde acá.** Esa revisión es del
usuario en el navegador.
