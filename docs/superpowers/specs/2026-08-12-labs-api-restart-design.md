# Labs: api.restart.cl reemplaza a Indicadores del Día

**Fecha:** 2026-08-12
**Rama:** `main`
**Referencias:** proyecto en `/Users/ricardogatica/Projects/reSTART_Labs/reSTART/api.restart.cl` ·
animación de [suma.cl](https://suma.cl/suma-book-velutti.html)

## Objetivo

Quitar la página `/labs/indicadores-del-dia` y poner en su lugar el proyecto **api.restart.cl**
(MarketData Chile), mostrando qué tecnologías usa y qué problemas resolvió.
indicadoresdeldia.cl no desaparece: pasa a figurar dentro de la nueva página como uno de los
sitios que consumen la API, que es lo que realmente es.

## Decisiones

| Decisión | Elección |
|---|---|
| Qué pasa con indicadoresdeldia.cl | Se fusiona: aparece como cliente de la API |
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
bundle principal ni a ninguna otra ruta, y no toca el SSR. ~35 KB gzip, solo en `/labs/:slug`.

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
