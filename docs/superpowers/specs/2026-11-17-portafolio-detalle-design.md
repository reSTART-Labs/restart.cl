# Portafolio con detalle por proyecto (Labs + clientes)

Fecha: 2026-11-17 · Estado: aprobado

## Intención

El portafolio de restart.cl deja de ser una grilla de tarjetas que enlazan a sitios externos y
pasa a mostrar **proyectos propios (Labs) y de clientes**, cada uno con **su propia página de
detalle**: problema y solución en términos generales, imágenes de la web y/o app mobile, y
testimonios (varios por proyecto: contraparte del cliente y/o cliente final).

El detalle tiene que ser **entretenido**: el hero se adapta a si el proyecto es web o mobile y
muestra el home del proyecto dentro de un dispositivo, desplazándose como si alguien hiciera
scroll. Cada sección tiene efecto al hacer scroll, y toda la página toma la paleta de colores del
proyecto.

## Metas

- Una sola fuente de datos de proyectos con `type: 'labs' | 'customer'`.
- Un único componente de detalle, usado por proyectos Labs y de clientes.
- Hero de dispositivo (navegador, teléfono o ambos) con auto-scroll del home del proyecto.
- Efectos de entrada al hacer scroll en cada sección del detalle.
- Paleta por proyecto (`brandColor`, `brandDark`, `brandAccent`) aplicada a todo el detalle.
- Testimonios múltiples por proyecto, con quién lo dice y desde qué lado (cliente / usuario final).
- Créditos múltiples por proyecto, con o sin enlace (ya existe el formato `credits`).
- `/startup` ("MVPs que entregamos") muestra solo proyectos marcados como MVP y enlaza a su detalle.
- Agregar **Merc@do** (mercado.restart.cl) a Labs.

## No-metas

- CMS o panel de edición: el contenido sigue en un archivo JS del repo.
- Traducción / multi-idioma.
- Capturas de apps nativas: se usan las que entregue Re/START; no se simulan.

## Anti-metas (si pasa esto, falló aunque funcione)

- **Testimonios inventados.** La sección solo aparece si el proyecto tiene testimonios reales.
  Mientras no los haya, el campo queda vacío y la sección no se renderiza.
- **Exponer detalle interno.** Regla vigente para Labs: el texto habla de lo que se logró para el
  cliente/usuario, no de cómo está construido por dentro (sin arquitectura, infra, ni estrategias
  internas). Aplica igual a proyectos de clientes, con más razón.
- **Proyectos de relleno.** Solo proyectos que existen. Se eliminan las tarjetas con foto de
  Unsplash y cliente genérico.
- **Romper SSR / hidratación** o hacer la página pesada (imágenes largas sin lazy-load ni tope de
  tamaño). El auto-scroll no puede marear: respeta `prefers-reduced-motion`.

## Enfoques considerados

- **A. Fuente única con `type` + detalle compartido (elegido).** Fusiona `labsProjects.js` y
  `portfolio.js` en `src/data/projects.js`. Un detalle para todo. Elimina la duplicación de
  MarketData/LearningPath/Minicatalogo y lleva el hero nuevo también a Labs. Costo: migrar datos y
  rehacer `LabsProjectPage.vue`.
- B. Datos separados, detalle compartido. Menos cambio en Labs, pero los proyectos propios siguen
  en dos archivos con textos que divergen y el `type` se vuelve redundante.
- C. Detalle nuevo solo para clientes; los propios enlazan a Labs actual. Más rápido, pero dos
  experiencias de detalle distintas y Labs no gana el hero nuevo.

Ricardo eligió **A**.

## Inventario de proyectos (decidido)

| slug | nombre | type | notas |
|---|---|---|---|
| `bogy` | BoGy | labs | ya tiene detalle; reemplaza la tarjeta "Sistema de gestión deportiva" |
| `api-restart` | MarketData | labs | api.restart.cl; reemplaza "Indicadores del Día" |
| `learningpath` | LearningPath | labs | hoy `external: true` (sin detalle) → pasa a tener detalle |
| `petsit` | Petsit | labs | ya tiene detalle |
| `minicatalogo` | Minicatalogo | labs | hoy `external: true` → pasa a tener detalle; reemplaza "E-commerce B2B" |
| `mercado` | Merc@do | labs | **nuevo**: mercado.restart.cl, SaaS que avisa por correo de licitaciones y compras ágiles de Mercado Público que calzan con tu negocio |
| `grupo-zenit` | Grupo Zenit | customer | WordPress; diseño Tres Marías Estudio |
| `hs-paneles` | HS Paneles | customer | WordPress; diseño Tres Marías Estudio |

Se eliminan: "Sistema de gestión deportiva", "Plataforma e-commerce B2B", "App de delivery
regional" (las dos primeras eran BoGy y Minicatalogo; la tercera no existe).

Slugs existentes de Labs se conservan tal cual (`/labs/api-restart` etc. no cambia de URL).

## Modelo de datos

`src/data/projects.js` exporta `projects` y helpers (`getProject(slug)`, `projectPath(p)`,
listas filtradas por tipo / MVP). Reemplaza a `labsProjects.js` y `portfolio.js`; se actualizan
sus importadores (`LabsPage.vue`, `LabsProjectPage.vue`, `StartupPage.vue`, `Portfolio.vue`,
`Footer.vue`).

Cada proyecto conserva los campos actuales de Labs (`slug`, `name`, `tagline`, `shortDescription`,
`description`, `url`, `status`, `year`, `category`, `platforms`, `brandColor`, `brandDark`,
`brandAccent`, `logo`, `heroImage`, `problem`, `solution`, `features`, `screenshots`, `stats`,
`highlights`, `tech`, `clients`, `cta`) y suma:

- `type: 'labs' | 'customer'` — obligatorio.
- `client` — nombre del cliente (customer). Labs muestra "Producto propio".
- `mvp: true` — opcional; lo muestra `/startup`.
- `tags` — chips de stack para las tarjetas (se conservan los actuales).
- `credits: [{ role, name, url? }]` — opcional; ya implementado en la tarjeta.
- `testimonials: [{ quote, name, role, company?, side: 'client' | 'end-user', avatar? }]` —
  opcional. `side` se muestra como etiqueta ("Cliente" / "Usuario final").
- `showcase: { web?: src, mobile?: src }` — capturas de página completa (largas) para el hero.
  Qué dispositivo(s) muestra el hero se deriva de lo que exista: solo `web` → navegador,
  solo `mobile` → teléfono, ambos → navegador con teléfono superpuesto.

Se elimina `external` (todos los proyectos tienen detalle; el enlace al sitio vive en el CTA).

## Rutas

| Ruta | Qué muestra |
|---|---|
| `/portafolio` | **nueva** — listado completo con filtro Todos / Propios / Clientes |
| `/portafolio/:slug` | **nueva** — detalle de proyecto `customer`. Si el slug es `labs`, redirige a `/labs/:slug` |
| `/labs` | listado, solo `type: 'labs'` (como hoy) |
| `/labs/:slug` | detalle de proyecto `labs`, con el componente nuevo. Si el slug es `customer`, redirige a `/portafolio/:slug` |

Así cada proyecto tiene una sola URL canónica. Las tarjetas usan `projectPath(p)`.

## Página de detalle

Orden de secciones (cada una se omite si no tiene datos, como hoy en Labs):

1. **Hero de dispositivo** — fondo `brandDark`, nombre + tagline + chips de plataforma + CTA al
   sitio, y a un lado el dispositivo con la captura `showcase` desplazándose en loop lento
   (arriba → abajo → pausa → vuelve), pausa al pasar el mouse. Con `prefers-reduced-motion` queda
   estático arriba. En mobile (pantalla chica) el dispositivo va debajo del texto.
   Fallback si no hay `showcase`: `heroImage` en el mismo marco, sin auto-scroll.
2. Stats (si hay).
3. Problema / Solución.
4. Features.
5. **Galería** — las `screenshots` actuales, dentro del mismo marco de dispositivo.
6. **Testimonios** — tarjetas con cita, nombre, cargo, empresa y etiqueta de lado. Varios por
   proyecto.
7. Tech / Highlights (si hay; para clientes normalmente no).
8. Créditos (si hay).
9. Proyectos relacionados (mismo `type` primero).
10. CTA final.

**Efectos de scroll:** cada sección entra con un reveal (fade + leve desplazamiento) al entrar
al viewport, vía un composable SSR-safe (`IntersectionObserver`, no corre en servidor, respeta
reduced-motion). El dispositivo del hero tiene un parallax suave al hacer scroll de la página
(reutilizar `useParallax.js` si calza).

**Paleta:** el detalle define variables CSS a partir de `brandColor` / `brandDark` /
`brandAccent` (como hace hoy `LabsProjectPage.vue`) y todas las secciones las usan: acentos,
fondos de secciones oscuras, bordes de tarjetas de testimonio, barra del navegador, etc.

**Paleta vs tema claro/oscuro** (se mantiene el modelo híbrido que ya usa Labs): el hero, la
galería y el CTA final van siempre sobre `brandDark` (ignoran el toggle, como los heroes y el FAQ
del sitio). El resto de las secciones sigue el tema con los tokens semánticos y usa la marca solo
como acento. Para que un acento claro (p.ej. el lima de Merc@do) siga siendo legible sobre fondo
claro, el texto/borde de acento en tema claro se oscurece con `color-mix()` hacia `brandDark`; no
se agrega un campo nuevo al modelo. *(decisión de Claude)*

## Listados

- **Home (`Portfolio.vue`)**: todos los proyectos, tarjeta con badge Propio/Cliente, enlaza al
  detalle (no al sitio externo). Filtro Todos / Propios / Clientes reemplaza Web/Software/Mobile.
  Enlace "Ver todo el portafolio" a `/portafolio`.
- **`/portafolio`**: mismo grid con filtro, página con `PageHero` siguiendo el estilo de
  `LabsPage.vue`.
- **`/startup`**: solo `mvp: true`, enlazando al detalle. Corrige el bug actual donde Zenit y
  HS Paneles aparecen como "MVPs que entregamos".
- **Nav**: se agrega "Portafolio" junto a "Labs" (desktop y drawer mobile).

## Contenido y assets

- **Capturas `showcase`**: Claude las toma con Playwright de los sitios publicados:
  web a 1440 px de ancho, mobile a 390 px, página completa con tope de alto (~6000 px web,
  ~5000 px mobile) para no cargar páginas de 11 000 px; JPEG optimizado, en
  `public/img/projects/<slug>/web.jpg` y `mobile.jpg`. Se cargan con `loading="lazy"` salvo la del
  hero.
- **Hero = sitio público.** `showcase` siempre es la página pública del proyecto, así los 8
  tienen auto-scroll desde el día uno.
- **Galería = público + producto por dentro.** Cada proyecto tiene en `screenshots` un par de
  capturas del sitio público y, cuando corresponda (productos con login: BoGy, Merc@do,
  Minicatalogo, LearningPath, Petsit, MarketData docs), un par del producto por dentro. Lo
  importante es que **todo proyecto tenga imágenes**. Las capturas internas requieren acceso:
  Claude las toma si Ricardo entrega una cuenta demo, o Ricardo las entrega directamente; mientras
  no estén, la galería queda solo con las públicas (nunca vacía). Cada captura lleva un
  `label` que distingue "Sitio" de "Producto".
- **App nativa de BoGy**: se usa `public/img/labs/bogy/mobile.png` existente si sirve; capturas
  nativas adicionales las entrega Ricardo.
- **Textos nuevos** (problema / solución / features de LearningPath, Minicatalogo, Merc@do, Grupo
  Zenit, HS Paneles): Claude los redacta a partir del sitio público, en términos generales y
  desde el resultado para el cliente; Ricardo los revisa.
- **Testimonios**: los entrega Ricardo. Hasta entonces, ningún proyecto tiene `testimonials`.

## Decisiones tomadas por Claude (corregibles)

- **MVPs para `/startup`**: BoGy, Petsit, Minicatalogo, LearningPath y Merc@do (productos
  lanzados en formato MVP; Merc@do se declara "en fase MVP"). MarketData no (es infraestructura
  de datos), ni los clientes WordPress.
- Redirecciones cruzadas `/labs/:slug` ↔ `/portafolio/:slug` según `type`, como 301 en el
  servidor (mismo mecanismo que el mapa `REDIRECCIONES` de `server.js`), además del guard en el
  router para la navegación del cliente.
- Slug inexistente: mismo comportamiento que el detalle de Labs hoy.
- Los cambios aún sin commit (`credits`, imágenes de Zenit/HS Paneles) se migran al nuevo archivo.
- "Portafolio" en el Nav.
- Paleta de Merc@do tomada del sitio: `brandColor #A3FF6A`, `brandDark #0F0F0F`.

## Queda a criterio del implementador

- Diseño visual exacto de los marcos de dispositivo, velocidades/curvas de animación, cómo se
  superponen navegador + teléfono.
- Si el reveal es composable propio o se extiende `useParallax.js`.
- Paletas de Grupo Zenit y HS Paneles (tomarlas de sus sitios).
- Estructura interna de componentes (p.ej. `DeviceFrame.vue`, `ProjectTestimonials.vue`).

## Verificación

No hay suite de tests en el repo. Verificación = `yarn build` sin errores + revisión con
Playwright bajo `yarn dev:server` (SSR real): cada detalle de los 8 proyectos renderiza, el
hero hace auto-scroll y queda estático con reduced-motion, las redirecciones funcionan, `/labs`
solo muestra Labs, `/startup` solo MVPs, no hay errores de hidratación nuevos, y la vista mobile
(390 px) no tiene scroll horizontal.
