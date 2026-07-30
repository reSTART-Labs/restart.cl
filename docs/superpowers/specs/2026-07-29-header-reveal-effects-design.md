# Efectos de entrada de header: loader, cortina y reveals

**Fecha:** 2026-07-29
**Rama:** `feat/header-reveal-effects`
**Referencia:** [team-work.cl](https://team-work.cl) (sitio Framer) + [CodePen dimensi/jgzYRY](https://codepen.io/dimensi/pen/jgzYRY)

## Objetivo

Portar a restart.cl los efectos de entrada de header de team-work.cl, precedidos por un
loader real que espere los assets críticos. La secuencia completa es:

**esfera girando (cargando) → cortina de persianas abriéndose → nav → contenido del header**

## Referencia medida

Los valores de team-work.cl no son estimaciones: se extrajeron de la config de animación del
sitio en vivo (payload `framer/appear` + reglas CSS de variantes) y se cronometraron con un
`MutationObserver` sobre la secuencia real de carga.

### Cortina del home (pre-loader de Framer)

- Overlay `position: fixed; inset: 0; z-index: 10`, azul de marca `#0065DD`.
- Se divide en mitad superior + mitad inferior; cada mitad en 5 columnas del 20% de ancho.
- Se abre desde la línea media hacia afuera: la columna superior se retrae hacia arriba y la
  inferior hacia abajo, **columna por columna de izquierda a derecha**.
- Stagger medido entre columnas: ~150 ms (189 / 240 / 342 / 495 / 647 ms).
- Cada columna colapsa con spring sin rebote; ~700 ms de recorrido perceptible.
- Framer anima `height` de 553 px a 1 px. Nosotros usamos `transform: scaleY()`.
- No usa `sessionStorage`: se repite en cada carga dura del home. Solo existe en `/`.

### Entrada del nav

- `y: 60px → 0`, `opacity: 0.001 → 1`, delay **800 ms**.
- Spring `damping: 27, mass: 0.3, stiffness: 121` (≈ 900 ms de asentamiento).
- **Solo en carga dura.** En navegación SPA el nav persiste montado y no se re-anima.

### Cambio de sección (navegación SPA)

- No hay cortina ni fade de página completa.
- Lo único que anima es el fondo del hero de la nueva sección: `scale(1.2) → scale(1)`,
  ~700 ms, spring `bounce: 0`, dentro de un contenedor `overflow: hidden`, con overlay
  oscuro `#161616` al 25% encima.
- El contenido del header hace fade-in con delay **1200 ms**.

### Títulos de sección interiores

- `y: 40px → 0` + fade, 600 ms, `cubic-bezier(0.44, 0, 0.56, 1)`.

### Esfera del CodePen

- 36 planos (`rotateY` en pasos de 10°) × 18 puntos (`rotate` en pasos de 10°) = 648 puntos.
- Árbol `transform-style: preserve-3d`; un único `animation: rotateSphere 4s linear infinite`
  en el contenedor.
- Medido en desktop headless: ~10 ms/frame. Densidad riesgosa en móvil de gama baja.
- El keyframe del pen interpola hacia `rotate3d(0, 0, 0, 360deg)`, que es un vector de eje
  nulo inválido; funciona por accidente del interpolador.

## Decisiones

| Decisión | Elección |
|---|---|
| Efectos a portar | Los cuatro: cortina, zoom-out del hero, entrada del nav, fade-up de títulos |
| Frecuencia de la cortina | En cada entrada al home, incluso por navegación SPA |
| Color de la cortina | Adaptado al tema (`--color-bg`) |
| Heroes sin imagen de fondo | Solo fade-up del contenido; sin assets nuevos |
| Delay del contenido del header | 1200 ms, idéntico a team-work |
| Fin del loader | Assets críticos + `document.fonts.ready`, mínimo 800 ms, tope 3 s |
| Alcance del loader | Cualquier carga dura del sitio, no solo el home |
| Color de la esfera | `--color-primary-500` sobre `--color-bg` |
| Logo en la cortina | Descartado: la esfera ya es la señal de marca |

### Salvedad registrada

Con 1200 ms el texto del header aparece bastante después de la imagen: se percibe lento y
castiga el LCP. Se implementa fiel a team-work por decisión explícita, con el valor
gobernado por un único token CSS para poder bajarlo a ~250 ms sin tocar componentes.

## Arquitectura

```
src/components/SiteLoader.vue       # orquesta los dos actos; montado en App.vue
src/components/LoaderSphere.vue     # la esfera (presentacional puro, CSS)
src/components/PageCurtain.vue      # las 5 persianas (presentacional puro, CSS)
src/composables/useLoader.js        # gating de assets + fase actual
src/composables/useScrollReveal.js  # IntersectionObserver para [data-reveal]
src/style.css                       # keyframes + tokens de timing
```

`LoaderSphere` y `PageCurtain` no conocen el estado de carga: reciben su fase por prop y solo
pintan. `SiteLoader` orquesta y es el único que habla con `useLoader`. `useLoader` es el único
que sabe de assets, timers y router.

**Por qué un composable con estado global y no props:** el overlay vive fuera del `RouterView`
(debe sobrevivir al cambio de página y quedar por encima del nav), y `Nav.vue` necesita saber
si es carga dura o navegación SPA. `useLoader.js` centraliza eso con un `ref` de ámbito de
módulo, el mismo patrón que ya usa `useTheme.js`.

### Contrato de `useLoader`

| Expone | Tipo | Significado |
|---|---|---|
| `phase` | `'loading' \| 'opening' \| 'done'` | Fase actual de la secuencia |
| `isHardLoad` | `boolean` | `true` en la primera carga; `false` tras la primera navegación SPA |
| `playCurtain()` | `function` | Inicia la cortina sin esfera (usado al volver al home por SPA) |

### Contrato de `useScrollReveal`

Se instala una vez desde `App.vue`, igual que `installClickTracking`. Observa
`[data-reveal]`, añade la clase de entrada al cruzar el viewport y deja de observar el
elemento. Los delays escalonados salen de `data-reveal-delay`.

## Coreografía

| # | Momento | Qué pasa |
|---|---|---|
| 1 | `t=0` | El overlay (`--color-bg`) y la esfera turquesa vienen en el HTML del SSR: se ven antes de que el bundle JS se parsee. La esfera gira 4 s linear infinite, CSS puro. |
| 2 | `t=ready` | `ready` = `document.fonts.ready` + assets `[data-critical]` del hero, con mínimo 800 ms y tope 3 s. La esfera hace fade-out en 300 ms. |
| 3 | `t=ready+300` | Arranca la cortina: 5 columnas, stagger 150 ms, 700 ms cada una → 1300 ms. |
| 4 | `+800 ms` | Entra el nav (`y: 60 → 0`). |
| 5 | `+1200 ms` | Aparece el contenido del header. |
| 6 | fin | El overlay se desmonta. |

Presupuesto total en el mejor caso: **~2.4 s** hasta el header completo.

### Tabla de valores

| Elemento | Efecto | Delay | Duración | Curva |
|---|---|---|---|---|
| Persianas (×5 columnas, ×2 mitades) | `scaleY(1) → 0` desde el centro | `i × 150ms` | 700 ms | `cubic-bezier(.16,1,.3,1)` |
| Esfera (salida) | fade | 0 | 300 ms | `ease-out` |
| Nav pill (solo carga dura) | `y: 60px → 0` + fade | 800 ms | 800 ms | `cubic-bezier(.22,1,.36,1)` |
| Contenido del header | fade | 1200 ms | 600 ms | `cubic-bezier(.16,1,.3,1)` |
| Fondo del hero (4 con imagen) | `scale(1.2) → 1` | 0 | 700 ms | `cubic-bezier(.16,1,.3,1)` |
| Títulos de sección (scroll) | `y: 40px → 0` + fade | escalonado | 600 ms | `cubic-bezier(.44,0,.56,1)` |

Las curvas `cubic-bezier` reemplazan los springs de Framer: mismo perfil sin rebote, sin
dependencia de una librería de animación.

### Tokens de timing en `style.css`

`--loader-min`, `--loader-timeout`, `--curtain-stagger`, `--curtain-duration`,
`--reveal-hero-delay`, `--reveal-nav-delay`, `--hero-zoom-duration`. Comprimir la secuencia
completa debe ser posible editando solo estos valores.

## Cuándo aparece cada acto

- **Carga dura de cualquier ruta**: esfera → cortina. La cortina deja de ser exclusiva del
  home, a diferencia de team-work.cl, porque el loader aplica a todo el sitio.
- **Navegación SPA al home**: solo cortina (sin esfera, no hay nada que cargar).
- **Navegación SPA a cualquier otra sección**: ni esfera ni cortina; solo los efectos del
  header de esa sección.

## Navegación SPA
- **Cualquier sección**: zoom-out del fondo del hero + fade del contenido con su delay.
- **Nav**: no se re-anima nunca después de la carga dura.

## La esfera, adaptada

- **Marcado sin `style` inline**: los 36 ángulos de plano y los 18 de punto salen de reglas
  `:nth-child` en `style.css`. Los `<li>` van vacíos, así los 648 nodos comprimen a casi nada
  en el HTML del SSR; con `style` inline serían ~26 KB de HTML.
- **Densidad responsiva**: 36×18 en `md+`, 18×12 (216 puntos) bajo `md`.
- **Eje de rotación explícito** en lugar del vector nulo del pen.
- Puntos en `--color-primary-500` sobre `--color-bg`.

## Heroes

Zoom-out `scale(1.2) → 1` sobre los 4 heroes con imagen de fondo:

- `src/pages/ServicePage.vue`
- `src/pages/SolutionPage.vue`
- `src/pages/AiSolutionPage.vue`
- `src/pages/ServicesPage.vue`

Solo fade-up escalonado (sin zoom) en los 4 heroes de gradiente plano:

- `src/pages/AboutPage.vue`
- `src/pages/LabsPage.vue`
- `src/pages/StartupPage.vue`
- `src/pages/LabsProjectPage.vue`

`src/components/Hero.vue` (home) ya tiene `hero-bg` con imagen y parallax; se suma a la
coreografía sin duplicar el parallax existente.

### Limpieza incluida

Se elimina `src/components/PageHero.vue`: es código muerto (cero imports en todo el repo) y es
exactamente el componente que alguien tocaría al buscar dónde viven los headers.

## Riesgos y mitigaciones

**Si el JS nunca carga, el overlay tapa el sitio para siempre.** Es el riesgo grave del
cambio. El overlay lleva una animación CSS de apertura automática a los ~3.2 s con
`animation-fill-mode: forwards`. Cuando el JS arranca, añade `html.loader-js` y esa animación
se desactiva para que el gating preciso tome el control. Más un `<noscript>` que oculta el
overlay del todo. Sin esto, un bundle caído deja el sitio en blanco.

**Scroll durante la carga:** `overflow: hidden` en `html` mientras la fase es `loading`; se
libera al empezar la cortina, así el sitio ya es usable mientras las persianas terminan.

**FOUC de hidratación:** el nav y el contenido del header animan con CSS puro y
`animation-fill-mode: both`, así terminan visibles sin depender de JS. Solo el scroll-reveal
requiere JS, y sus estados ocultos viven bajo `html.reveal-ready`, clase que añade el cliente.
Sin JS todo se ve, sin animación.

**`prefers-reduced-motion`:** sin esfera, sin cortina, sin zoom ni translate. El overlay no se
monta y el contenido se ve de inmediato con fades de 200 ms.

**Perf de 648 nodos en móvil:** densidad reducida bajo `md`.

## Ajustes tras la primera revisión

- **Salida de la esfera**: el fade se reemplazó por una implosión — cada punto viaja por su
  propio radio hasta el centro. Se anima la altura del `li`, que *es* el radio, en vez de
  escalar la esfera: así los puntos conservan su tamaño y el gesto se lee como que se juntan y
  no como un zoom out. Se probó también moverlos con `transform` (que no toca layout) y salió
  **peor**: 74.8 ms de peor frame contra 41.6 ms, porque en un árbol `preserve-3d` esos 648
  transforms no se pueden componer por separado, así que no hay ganancia de compositor y sí
  648 animaciones más que tickear. `--sphere-exit` pasó de 300 ms a 420 ms para que el viaje
  se alcance a leer.
- **El giro va en una capa aparte** (`.loader-sphere-spin`). Acompañar el fade en el mismo nodo
  obligaba a redeclarar la animación de giro, lo que la reiniciaba en 0°: la esfera daba un
  salto visible justo al empezar a salir.
- **Ritmo del texto**: `--reveal-hero-delay` bajó de 1200 ms a **250 ms** y
  `--reveal-nav-delay` de 800 ms a 400 ms. Los 1200 ms de la referencia dejaban el header sin
  texto demasiado tiempo; ahora el contenido ya está puesto cuando cada columna de la cortina
  lo descubre. El texto aparece a ~1.6 s de la carga en vez de ~2.8 s.
- **Bug de rutas hermanas**: la guarda que ignora los saltos de solo-hash comparaba el
  *nombre* de la ruta, y dos secciones hermanas comparten nombre y difieren solo en el param
  (`/soluciones/mineria` → `/soluciones/industria`), así que el efecto se descartaba. Ahora
  compara `to.path === from.path`.

## Notas de implementación

Diferencias entre el diseño y lo construido:

- **Contrato de `useLoader`**: además de `phase` / `isHardLoad` / `playCurtain()` expone
  `curtainOpen` y `hasSphere`. El diseño trataba «esfera desapareciendo» y «cortina
  abriéndose» como una sola fase `opening`, pero están separados por los 300 ms del fade de
  la esfera: `SiteLoader` necesita distinguirlos y `Nav` engancha su entrada a `curtainOpen`.
- **Color de los puntos**: `var(--color-primary)` en lugar de `--color-primary-500` fijo. Es
  primary-500 en claro y primary-400 en oscuro, siguiendo la convención del repo para
  mantener contraste en ambos temas.
- **Densidad móvil**: se ocultan los planos y los puntos pares, quedando 18 × 9 = 162 puntos
  pintados (el diseño estimaba ~216). Ocultar la mitad de forma regular se lee mejor que
  recortar a un número exacto, y el patrón queda parejo.
- **`is-loading` se libera al abrir la cortina**, no al empezar el fade de la esfera. Con lo
  segundo, el header quedaba 300 ms sin regla que lo ocultara y su animación arrancaba desde
  un estado ya visible. Detectado al cronometrar la secuencia.
- **`data-reveal` en el home**: los bloques de título de `Features`, `Solutions`, `Portfolio`,
  `TechShowroom`, `Faq` y `Contact`; en `About` y `Startup` no hay un contenedor de título
  aparte, así que el reveal aplica a la columna de texto completa.

## Verificación

El repo no tiene suite de tests. La verificación es manual y por capturas:

1. `yarn dev:server` + capturas Playwright en los hitos (0 / 800 / 1100 / 2400 ms), comparadas
   contra las referencias capturadas de team-work.cl.
2. `yarn build && yarn serve`: confirmar que el overlay llega en el HTML del SSR (`curl` +
   grep del marcado) y que no hay FOUC.
3. Con JS deshabilitado: el sitio se revela por el fallback CSS.
4. Con `prefers-reduced-motion: reduce`: ni esfera ni cortina, contenido inmediato.
5. Navegación SPA: cortina al volver al home, zoom-out en cada sección, nav sin re-animar.
6. Las 9 rutas del sitio cargan sin quedar con contenido invisible.
