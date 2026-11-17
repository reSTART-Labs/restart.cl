# Portafolio con detalle por proyecto — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unificar proyectos Labs y de clientes en una sola fuente con `type`, darle a cada uno una página de detalle con hero de dispositivo auto-scroll, efectos de scroll y paleta propia, y alimentar desde ahí el home, `/portafolio`, `/labs` y `/startup`.

**Architecture:** `src/data/projects.js` reemplaza `labsProjects.js` y `portfolio.js` y expone helpers puros (probados con `node:test`). Un único `ProjectPage.vue` (evolución de `LabsProjectPage.vue`) sirve `/labs/:slug` y `/portafolio/:slug`; la URL canónica la decide `type` y la otra redirige (guard de router + 301 en `server.js`). Las animaciones reutilizan `useProjectMotion.js` (GSAP + ScrollTrigger, ya SSR-safe y con reduced-motion).

**Tech Stack:** Vue 3 `<script setup>`, Vue Router 5, Vite 6 SSR, Tailwind 4, Express 5, GSAP 3, `node:test` (Node 22), Playwright MCP para capturas y verificación.

**Spec:** `docs/superpowers/specs/2026-11-17-portafolio-detalle-design.md`

## Global Constraints

- Indentación con tabs, LF, UTF-8. Vue solo Composition API con `<script setup>`.
- Copy en español neutro (Chile), sin voseo. Anglicismos técnicos OK.
- Estilos con tokens semánticos (`bg-surface`, `text-text`, `var(--color-…)`); hex solo en superficies siempre oscuras.
- Nada de detalle interno en el copy: problema/solución/features desde el resultado para el cliente (memoria `labs-mensaje-capacidad-no-detalle-interno`).
- **Ningún testimonio inventado.** Ningún proyecto lleva `testimonials` hasta que el usuario los entregue.
- `prefers-reduced-motion: reduce` → sin auto-scroll ni animaciones de entrada.
- Slugs de Labs existentes no cambian (`bogy`, `api-restart`, `learningpath`, `petsit`, `minicatalogo`).
- Capturas: web 1440 px de ancho con alto máx. 6000 px; mobile 390 px con alto máx. 5000 px; JPEG calidad ~80; ruta `public/img/projects/<slug>/`.
- Paleta Merc@do: `brandColor '#A3FF6A'`, `brandDark '#0F0F0F'`.
- MVPs (`mvp: true`): `bogy`, `petsit`, `minicatalogo`, `learningpath`, `mercado`.
- Créditos Zenit y HS Paneles: `[{ role: 'Diseño', name: 'Tres Marías Estudio' }, { role: 'Desarrollo WordPress', name: 'Re/START' }]`, sin `url`.

## Review Focus

1. **Navegar de un detalle a otro sin recargar** (relacionados): la galería vuelve a la primera imagen, el auto-scroll reinicia con la nueva captura y las animaciones GSAP se recrean sin duplicarse. → Task 4, paso de verificación "navegación entre detalles".
2. **Acento claro en tema claro** (lima de Merc@do sobre fondo blanco): texto y bordes de acento legibles. → Task 4, verificación en tema claro de `/labs/mercado`.
3. **Pantalla de 390 px**: el dispositivo del hero va debajo del texto y no hay scroll horizontal en ningún detalle ni listado. → Task 4 y Task 5, verificación `scrollWidth <= innerWidth`.
4. **Captura de alto distinto entre proyectos**: el auto-scroll debe recorrer toda la captura a velocidad parecida (duración proporcional al alto), no saltar ni cortarse. → Task 4, `scrollDuration` probado en Task 2.
5. **Slug con `type` cruzado o inexistente**: `/portafolio/bogy` → 301 a `/labs/bogy`; `/labs/grupo-zenit` → 301 a `/portafolio/grupo-zenit`; slug desconocido muestra el estado "no encontrado" actual. → Task 3 (tests de `canonicalPath`) y Task 6.

---

### Task 1: Capturas de proyectos

**Files:**
- Create: `public/img/projects/<slug>/web.jpg`, `public/img/projects/<slug>/mobile.jpg`, `public/img/projects/<slug>/site-1.jpg`, `public/img/projects/<slug>/site-2.jpg` para cada slug abajo
- Move: `public/img/portfolio/zenit.jpg` → `public/img/projects/grupo-zenit/site-1.jpg`, `public/img/portfolio/hspaneles.jpg` → `public/img/projects/hs-paneles/site-1.jpg` (y borrar `public/img/portfolio/`)

**Interfaces:**
- Produces: los archivos de arriba, referenciados por Task 2.

| slug | URL |
|---|---|
| bogy | https://bogy.restart.cl |
| api-restart | https://api.restart.cl |
| learningpath | https://learningpath.cl |
| petsit | https://petsit.cl |
| minicatalogo | https://minicatalogo.com |
| mercado | https://mercado.restart.cl |
| grupo-zenit | https://grupozenit.cl |
| hs-paneles | https://hspaneles.cl |

- [ ] **Step 1: `web.jpg` de cada sitio.** Con Playwright MCP: `browser_resize` 1440×6000, navegar, esperar 2 s (lazy-load), `browser_take_screenshot` (viewport, no fullPage) a `.playwright-mcp/<slug>-web.png`. Si la página mide menos de 6000 px, usar `fullPage: true` con viewport 1440×900.
- [ ] **Step 2: `mobile.jpg`.** Igual con 390×5000 (o fullPage a 390×844 si es más corta).
- [ ] **Step 3: `site-1.jpg` / `site-2.jpg`.** Viewport 1440×900: hero (scroll 0) y una sección representativa más abajo (`window.scrollTo`). Para Zenit/HS `site-1` ya existe (mover); tomar solo `site-2`.
- [ ] **Step 4: Convertir a JPEG** con `sips -s format jpeg -s formatOptions 80 <png> --out public/img/projects/<slug>/<name>.jpg`.
- [ ] **Step 5: Verificar.** Run: `ls public/img/projects/*/ | wc -l` y `sips -g pixelWidth -g pixelHeight public/img/projects/*/web.jpg`. Expected: 8 carpetas con 4 archivos cada una; `web.jpg` 1440 de ancho y ≤ 6000 de alto. Mirar cada `web.jpg` con Read: sin banners de cookies tapando el hero (cerrarlos y repetir si los hay).
- [ ] **Step 6: Commit** `rm -r public/img/portfolio && git add public/img/projects && git commit -m "Portafolio: capturas web y mobile de los 8 proyectos"`

Las capturas **dentro del producto** (con login) no son parte de este plan: requieren cuenta demo del usuario. Se agregan a `screenshots` después con `label: 'Producto'`.

---

### Task 2: Fuente única de proyectos

**Files:**
- Create: `src/data/projects.js`
- Create: `tests/projects.test.js`
- Modify: `package.json` (script `"test": "node --test tests/"`)
- Delete (en Task 5, cuando no queden importadores): `src/data/labsProjects.js`, `src/data/portfolio.js`

**Interfaces:**
- Consumes: imágenes de Task 1.
- Produces (todo exportado desde `src/data/projects.js`):
  - `projects: Project[]`
  - `PROJECT_TYPES = ['labs', 'customer']`
  - `getProject(slug: string): Project | undefined`
  - `projectPath(p: Project): string` → `/labs/<slug>` si `type === 'labs'`, `/portafolio/<slug>` si `customer`
  - `labsProjects: Project[]` (filtra `type === 'labs'`, mismo orden)
  - `mvpProjects: Project[]` (filtra `mvp === true`)
  - `heroDevices(p: Project): Array<'web' | 'mobile'>` → claves presentes en `p.showcase` en orden `['web','mobile']`; `[]` si no hay showcase
  - `scrollDuration(heightPx: number, viewportPx: number): number` → segundos de un recorrido de auto-scroll: `max(6, (heightPx - viewportPx) / 120)`; `0` si `heightPx <= viewportPx`

`Project` = campos actuales de `labsProjects.js` (sin `external`) + `type`, `client`, `mvp?`, `tags`, `credits?: {role,name,url?}[]`, `testimonials?: {quote,name,role,company?,side:'client'|'end-user',avatar?}[]`, `showcase: { web: string, mobile?: string }`, `screenshots: {src,label,caption}[]`. Agregar JSDoc `@typedef` al inicio del archivo con este shape.

- [ ] **Step 1: Escribir los tests que fallan** en `tests/projects.test.js` (`node:test` + `node:assert/strict`, `fs.existsSync` sobre `public` + ruta):
  - `slugs únicos` — `new Set(projects.map(p=>p.slug)).size === projects.length`
  - `inventario` — slugs exactamente `['bogy','api-restart','learningpath','petsit','minicatalogo','mercado','grupo-zenit','hs-paneles']` (cualquier orden)
  - `type válido` — todo `p.type` ∈ `PROJECT_TYPES`; `grupo-zenit` y `hs-paneles` son `customer`, el resto `labs`
  - `todo proyecto tiene imágenes` — `showcase.web` existe en disco; `screenshots.length >= 2` y cada `src` existe en disco
  - `contenido de detalle` — todo proyecto tiene `problem`, `solution`, `tagline`, `brandColor`, `brandDark` no vacíos
  - `sin testimonios inventados` — ningún proyecto tiene `testimonials` con largo > 0
  - `créditos` — `getProject('grupo-zenit').credits` deepEqual a los de Global Constraints; todo crédito tiene `role` y `name` string
  - `mvpProjects` — slugs exactamente `['bogy','learningpath','petsit','minicatalogo','mercado']` (cualquier orden)
  - `projectPath` — `projectPath(getProject('bogy')) === '/labs/bogy'`, `projectPath(getProject('hs-paneles')) === '/portafolio/hs-paneles'`
  - `heroDevices` — `{showcase:{web:'a',mobile:'b'}}` → `['web','mobile']`; `{showcase:{mobile:'b'}}` → `['mobile']`; `{}` → `[]`
  - `scrollDuration` — `(900, 900) === 0`; `(1500, 900) === 6`; `(6000, 900) === 42.5`
  - `mercado` — `brandColor === '#A3FF6A'`, `brandDark === '#0F0F0F'`, `url === 'https://mercado.restart.cl'`
- [ ] **Step 2: Correr y ver que falla.** Run: `yarn test` — Expected: FAIL (`Cannot find module .../src/data/projects.js`).
- [ ] **Step 3: Implementar `src/data/projects.js`.** Migrar los 5 de `labsProjects.js` tal cual (quitar `external`, agregar `type: 'labs'`, `client: 'Producto propio'`, `tags` desde `portfolio.js` cuando exista, `mvp` según Global Constraints, `showcase` y `screenshots` apuntando a Task 1 — conservar los screenshots que ya tienen y sumar `site-1/2`). Agregar `mercado`, `grupo-zenit`, `hs-paneles`. Redactar `tagline`/`shortDescription`/`problem`/`solution`/`features` (3–6) para `learningpath`, `minicatalogo`, `mercado`, `grupo-zenit`, `hs-paneles` leyendo sus sitios públicos (Playwright `browser_evaluate` → `document.body.innerText`); paletas de Zenit/HS desde sus sitios (Zenit: lima `#C6F94F` aprox. + verde `#0BA678`; verificar con `getComputedStyle`). `credits` de Zenit/HS de `portfolio.js` actual. Orden del array: los de clientes primero, luego Labs (así el home los muestra arriba).
- [ ] **Step 4: Correr tests.** Run: `yarn test` — Expected: PASS, 12 tests.
- [ ] **Step 5: Commit** `git add src/data/projects.js tests/projects.test.js package.json && git commit -m "Proyectos: fuente única con type labs/customer"`

---

### Task 3: Rutas y redirecciones canónicas

**Files:**
- Modify: `src/data/projects.js` (agregar `canonicalPath`)
- Modify: `tests/projects.test.js`
- Modify: `src/router.js`
- Modify: `server.js:37-46` (bloque `REDIRECCIONES`)

**Interfaces:**
- Consumes: `getProject`, `projectPath` (Task 2).
- Produces:
  - `canonicalPath(path: string): string | null` → para `/labs/:slug` o `/portafolio/:slug` con proyecto existente cuyo `projectPath` difiere, devuelve el canónico; en cualquier otro caso `null`. Ignora trailing slash.
  - Rutas: `{ path: '/portafolio', name: 'portfolio', component: PortfolioPage.vue }`, `{ path: '/portafolio/:slug', name: 'portfolio-project', component: ProjectPage.vue }`, y `labs-project` pasa a `ProjectPage.vue`. Ambas rutas de detalle con `beforeEnter: to => canonicalPath(to.path) ?? true`.

- [ ] **Step 1: Tests que fallan** en `tests/projects.test.js`:
  - `canonicalPath('/portafolio/bogy') === '/labs/bogy'`
  - `canonicalPath('/labs/grupo-zenit') === '/portafolio/grupo-zenit'`
  - `canonicalPath('/labs/bogy') === null`; `canonicalPath('/portafolio/hs-paneles') === null`
  - `canonicalPath('/labs/no-existe') === null`; `canonicalPath('/nosotros') === null`
  - `canonicalPath('/portafolio/bogy/') === '/labs/bogy'`
- [ ] **Step 2:** `yarn test` — Expected: FAIL (`canonicalPath is not a function`).
- [ ] **Step 3: Implementar `canonicalPath`.**
- [ ] **Step 4:** `yarn test` — Expected: PASS.
- [ ] **Step 5: Router y servidor.** Agregar las rutas en `src/router.js` (crear `src/pages/PortfolioPage.vue` y `src/pages/ProjectPage.vue` como stubs mínimos `<template><div /></template>` si aún no existen; Tasks 4–5 los llenan). En `server.js`, junto a `REDIRECCIONES`, agregar `app.get(['/labs/:slug', '/portafolio/:slug'], (req, res, next) => { const to = canonicalPath(req.path); to ? res.redirect(301, to) : next() })` importando `canonicalPath` desde `./src/data/projects.js`. Debe ir **después** de `app.get(Object.keys(REDIRECCIONES), …)` para que `/labs/indicadores-del-dia` siga funcionando.
- [ ] **Step 6: Verificar.** Run: `yarn dev:server` en background, luego `curl -sI http://localhost:3100/portafolio/bogy | head -3` y `curl -sI http://localhost:3100/labs/grupo-zenit | head -3` y `curl -sI http://localhost:3100/labs/indicadores-del-dia | head -3`. Expected: `301` con `Location: /labs/bogy`, `/portafolio/grupo-zenit`, `/labs/api-restart` respectivamente.
- [ ] **Step 7: Commit** `git commit -am "Rutas: /portafolio y redirecciones canónicas por type"` (+ `git add` de los stubs).

---

### Task 4: Página de detalle con hero de dispositivo

**Files:**
- Create: `src/components/DeviceShowcase.vue`
- Create: `src/pages/ProjectPage.vue` (a partir de `src/pages/LabsProjectPage.vue`)
- Delete: `src/pages/LabsProjectPage.vue`
- Modify: `src/composables/useProjectMotion.js` (solo si hace falta re-ejecutar al cambiar de slug)

**Interfaces:**
- Consumes: `getProject`, `projects`, `projectPath`, `heroDevices`, `scrollDuration` (Task 2).
- Produces:
  - `<DeviceShowcase :showcase="{web?, mobile?}" :fallback="string" :url="string" :name="string" />` — renderiza navegador (barra con 3 puntos + dominio de `url`), teléfono, o navegador con teléfono superpuesto abajo a la derecha, según `heroDevices`. Sin showcase: `fallback` estático en marco de navegador. Auto-scroll: tras `load` de la imagen mide su alto renderizado y anima `transform: translateY` de 0 a `-(alto - altoMarco)` con duración `scrollDuration(...)`, pausa 1.5 s en cada extremo, ida y vuelta infinito; pausa con `:hover`; nada de animación con `prefers-reduced-motion`. Imagen del hero sin `loading="lazy"`.

- [ ] **Step 1: `DeviceShowcase.vue`.** Colores del marco desde las variables `--brand` / `--brand-dark` heredadas. La animación corre solo en `onMounted` (SSR renderiza el marco con la imagen arriba, sin transform).
- [ ] **Step 2: `ProjectPage.vue`.** Copiar `LabsProjectPage.vue` y:
  - `project` = `getProject(route.params.slug)`; relacionados = mismo `type` primero, luego el otro, excluyendo el actual, máx. 3, enlazando con `projectPath`.
  - Hero: texto a la izquierda, `<DeviceShowcase>` a la derecha (debajo en < 1024 px). Eyebrow: "Labs" o `client`.
  - `brandVars` suma `--brand-accent` (`brandAccent || brandColor`) y `--brand-ink`: `color-mix(in oklab, var(--brand) 55%, var(--brand-dark))` usado para texto/bordes de acento en secciones que siguen el tema claro; en `html[data-theme="dark"]` `--brand-ink` = `var(--brand)`.
  - Galería: cada screenshot dentro del marco de navegador (reusar estilos de `DeviceShowcase` sin auto-scroll, o prop `static`).
  - Sección **Testimonios** (`v-if="project.testimonials?.length"`): tarjetas con `quote`, `name`, `role`, `company`, etiqueta `side` → "Cliente" / "Usuario final", borde/comillas en `--brand-ink`.
  - Sección **Créditos** (`v-if="project.credits?.length"`): mismo formato "role: name" con enlace opcional que la tarjeta.
  - Orden de secciones según spec: hero, stats, problema/solución, features, galería, testimonios, tech/highlights, créditos, relacionados, CTA.
  - Hero, galería y CTA final siempre sobre `--brand-dark` (no siguen el toggle); el resto usa tokens semánticos.
  - `useProjectMotion(rootRef)` se mantiene; si al cambiar de slug no re-anima, agregar `watch(() => route.params.slug)` que revierta el contexto GSAP y lo recree tras `nextTick`.
- [ ] **Step 3: Borrar `LabsProjectPage.vue`** y confirmar que el router apunta a `ProjectPage.vue`. Run: `grep -rn LabsProjectPage src` — Expected: sin resultados.
- [ ] **Step 4: Build.** Run: `yarn build` — Expected: termina sin errores.
- [ ] **Step 5: Verificación visual** (`yarn dev:server`, Playwright MCP, 1440×900): abrir los 8 detalles por su `projectPath`; en cada uno, Read del screenshot: dispositivo correcto (navegador; Zenit/HS/todos con `mobile` → navegador + teléfono), colores del proyecto, sin errores de consola salvo los preexistentes. Comprobar auto-scroll: `browser_evaluate` del `transform` de la imagen del hero en t=0 y t=3 s difieren.
- [ ] **Step 6: Reduced motion.** `browser_emulate_media` `reducedMotion: 'reduce'`, recargar `/labs/bogy`: `transform` del hero en t=3 s es `none` o `matrix(1, 0, 0, 1, 0, 0)`.
- [ ] **Step 7: Tema claro con acento claro.** `/labs/mercado` con tema claro: Read del screenshot de problema/solución y testimonios-o-créditos; el acento se lee (no lima sobre blanco).
- [ ] **Step 8: Navegación entre detalles.** Desde `/labs/bogy` clic en un relacionado: URL cambia, hero muestra la captura del nuevo proyecto, galería en la primera imagen, sin errores de consola.
- [ ] **Step 9: 390 px.** `browser_resize` 390×844 en 3 detalles: `document.documentElement.scrollWidth <= window.innerWidth` es `true`; dispositivo debajo del texto.
- [ ] **Step 10: Commit** `git add -A src/components/DeviceShowcase.vue src/pages && git commit -m "Detalle de proyecto: hero de dispositivo con auto-scroll, testimonios y créditos"`

---

### Task 5: Listados (home, /portafolio, /labs, /startup, nav, footer)

**Files:**
- Create: `src/components/ProjectCard.vue`
- Modify: `src/components/Portfolio.vue`, `src/pages/PortfolioPage.vue` (llenar stub), `src/pages/LabsPage.vue:139-143`, `src/pages/StartupPage.vue:170-222,294`, `src/components/Footer.vue:76,124`, `src/components/Nav.vue:148-152,342-347,413`
- Delete: `src/data/labsProjects.js`, `src/data/portfolio.js`

**Interfaces:**
- Consumes: `projects`, `labsProjects`, `mvpProjects`, `projectPath` (Task 2).
- Produces: `<ProjectCard :project="Project" />` — `RouterLink` a `projectPath(project)`; imagen `showcase.web` con `object-top` y `loading="lazy"`; badge "Propio" (`type: 'labs'`) o "Cliente"; `client`, nombre, `shortDescription`, `tags`, y `credits` en texto (sin enlace dentro de la tarjeta). Estilos: los actuales de `.portfolio-card`.

- [ ] **Step 1: `ProjectCard.vue`.**
- [ ] **Step 2: `Portfolio.vue` (home)**: usa `ProjectCard`; filtros `[{value:'all',label:'Todos'},{value:'labs',label:'Propios'},{value:'customer',label:'Clientes'}]`; botón `.btn .btn-ghost` "Ver todo el portafolio" → `/portafolio`.
- [ ] **Step 3: `PortfolioPage.vue`**: `PageHero` + mismo grid y filtro (estructura de `LabsPage.vue`). Kicker "Portafolio", título con `<em>` siguiendo el estilo editorial.
- [ ] **Step 4: `LabsPage.vue`, `Footer.vue`**: importar `labsProjects` desde `@/data/projects.js`; enlaces con `projectPath`. Quitar cualquier rama `external` (ya no existe).
- [ ] **Step 5: `StartupPage.vue`**: la sección "MVPs que entregamos" itera `mvpProjects` con `ProjectCard`.
- [ ] **Step 6: `Nav.vue`**: link "Portafolio" → `/portafolio` antes de "Labs" en desktop y drawer; `active.portfolio: matches('/portafolio')`.
- [ ] **Step 7: Borrar datos viejos.** `git rm src/data/labsProjects.js src/data/portfolio.js`. Run: `grep -rn "labsProjects.js\|data/portfolio" src` — Expected: sin resultados.
- [ ] **Step 8: Build + tests.** Run: `yarn test && yarn build` — Expected: PASS y build sin errores.
- [ ] **Step 9: Verificación visual** (`yarn dev:server`, Playwright): home → sección portafolio con 8 tarjetas, filtros funcionan (Clientes = 2, Propios = 6); `/portafolio` igual; `/labs` muestra 6 y ninguno de clientes; `/startup` muestra exactamente BoGy, LearningPath, Petsit, Minicatalogo, Merc@do; nav marca "Portafolio" activo en `/portafolio/grupo-zenit`. A 390 px: `scrollWidth <= innerWidth` en home, `/portafolio`, `/startup`.
- [ ] **Step 10: Commit** `git add -A src && git commit -m "Listados: portafolio unificado, /portafolio, MVPs en /startup y link en nav"`

---

### Task 6: Verificación final con SSR

**Files:** ninguno (solo correcciones si algo falla, en el archivo dueño).

- [ ] **Step 1:** `yarn test && yarn build` — Expected: todo PASS.
- [ ] **Step 2:** `yarn serve` (producción, SSR) en background. `curl -s http://localhost:3100/portafolio/grupo-zenit | grep -c "Tres Marías Estudio"` — Expected: ≥ 1 (el detalle se renderiza en el servidor). `curl -s -o /dev/null -w "%{http_code}" http://localhost:3100/portafolio` — Expected: `200`.
- [ ] **Step 3:** Las tres redirecciones de Task 3 Step 6 contra `yarn serve` — Expected: mismos 301.
- [ ] **Step 4:** Playwright sobre `yarn serve`: abrir home, `/portafolio`, un detalle Labs y uno de cliente; consola sin `Hydration` mismatches.
- [ ] **Step 5:** Detener servidores. `git status` limpio.
