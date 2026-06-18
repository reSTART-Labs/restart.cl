# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-page marketing website for Re/START (restart.cl). Vue 3 + Vite + Tailwind CSS 4 with Server-Side Rendering (SSR) via Express and `vue-router`. Includes a small Express API backend that powers the contact form (forwards leads to an n8n webhook).

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vue Router 5** (SSR-aware: memory history on server, web history on client)
- **Vite 6** (dev server + build)
- **Tailwind CSS 4** (utility-first, `@theme` config in `src/style.css`)
- **Express 5** (SSR server + JSON API under `/api`)
- **Yarn 4** (package manager, `nodeLinker: node-modules`)
- **Node.js 22** (see `.nvmrc`)
- **GTM / dataLayer** click + virtual-pageview tracking (`src/composables/useTracking.js`)
- **Cal.com** embed for booking (`src/composables/useCalEmbed.js`)
- **n8n webhook** for contact-form lead delivery
- **Ionicons 2.0.1** + **Font Awesome 4.7.0** (CDN in `index.html`)

## Build & Development

```bash
yarn install              # Install dependencies
yarn dev                  # Vite dev server, CLIENT ONLY — NO /api, no SSR (HMR)
yarn dev:server           # Full app: Express + SSR + /api + Vite middleware (nodemon)
yarn build                # Build client + SSR bundles (dist/client, dist/server)
yarn serve                # Production SSR server (NODE_ENV=production)
```

> **Important:** `yarn dev` serves only the client bundle. The contact API (`/api/contact`)
> is served exclusively by the Express server, so forms only work under `yarn dev:server`
> (dev) or `yarn serve` (prod). Submitting a form under plain `yarn dev` returns 404 and the
> form shows the generic "Algo salió mal" error. Use `yarn dev:server` for any work that
> touches the contact form.

**Deployment:** Node.js server running `yarn serve` after `yarn build`. The API code in
`src/api/` is imported directly from source by `server.js` (not part of the Vite bundle), so
API changes take effect on **process restart**, not necessarily on `yarn build`.

## Architecture

### Routing (`src/router.js`)
SSR-aware factory (`createRouter`): `createMemoryHistory` on the server, `createWebHistory`
on the client. `scrollBehavior` honors saved position, hash anchors (smooth), else top.

| Path | Name | Page |
|------|------|------|
| `/` | home | `HomePage.vue` |
| `/nosotros` | about | `AboutPage.vue` |
| `/servicios` | services | `ServicesPage.vue` |
| `/servicios/:slug` | service | `ServicePage.vue` |
| `/startup` | startup | `StartupPage.vue` |
| `/inteligencia-artificial/:slug` | ai-solution | `AiSolutionPage.vue` |
| `/soluciones/:slug` | solution | `SolutionPage.vue` |
| `/labs` | labs | `LabsPage.vue` |
| `/labs/:slug` | labs-project | `LabsProjectPage.vue` |

### Directory Structure
```
index.html                 # Vite entry (<!--app-html--> placeholder for SSR)
server.js                  # Express SSR server + registers /api + serves dist/client (prod)
vite.config.js             # Vite + Vue + Tailwind + `@` → src alias
src/
  main.client.js           # Client entry: createSSRApp + router + mount + tracking
  main.server.js           # Server entry: createSSRApp + router.push(url) + renderToString
  router.js                # Route table + SSR-aware history factory
  App.vue                  # Nav + <RouterView /> + Footer
  style.css                # Tailwind import + @theme tokens + base + reusable .btn system
  pages/                   # One component per route (see table above)
  components/
    Nav.vue                # Pill navbar: theme toggle, Servicios/Soluciones dropdowns, mobile drawer
    Hero.vue               # Home hero with parallax
    About.vue, Features.vue, Startup.vue, TechShowroom.vue, Solutions.vue, Portfolio.vue
    Faq.vue                # Home FAQ accordion
    Contact.vue            # Home contact section (ContactForm + Cal.com embed slot)
    ContactForm.vue        # Reusable form → POST /api/contact (honeypot, validation, states)
    PageHero.vue           # Shared interior-page hero
    Footer.vue
  composables/
    useParallax.js         # Scroll parallax (SSR-safe, desktop only)
    useTheme.js            # Dark/light theme via html[data-theme], persisted
    useTracking.js         # GTM dataLayer: delegated click tracking + virtual_page_view
    useCalEmbed.js         # Cal.com inline embed loader
  data/
    services.js, solutions.js, aiSolutions.js, labsProjects.js, portfolio.js
  api/
    index.js               # registerApi(app): mounts express.json + /api/contact router
    contact.js             # Contact handler: sanitize → validate → forward to n8n
    rateLimit.js           # In-memory per-IP rate limiter
public/
  img/                     # hero.jpg, contact.jpg, office.jpg, labs/
  logo*.png, favicon.png
```

## Contact form & API

Flow: `ContactForm.vue` → `POST /api/contact` → `src/api/contact.js` → n8n webhook.

`ContactForm.vue` is reused across pages via props (`source`, `fields`, labels, etc.). The
`source` prop tags the lead's origin in n8n — e.g. `"home"` (Contact.vue) vs `"startup"`
(StartupPage.vue). The hidden `website` field is a honeypot.

`src/api/contact.js` pipeline:
1. **Origin check** — `ALLOWED_ORIGIN` (see env vars). Requests with no Origin/Referer
   (curl, server-to-server) pass; rate limit + validation + honeypot still apply.
2. **Rate limit** — per-IP, `CONTACT_RATE_LIMIT_PER_MIN` (default 5/min). Needs
   `app.set('trust proxy', 1)` (set in `server.js`) to read the real IP behind a proxy.
3. **Honeypot** — if `website` is filled, returns a fake `{ok:true}` and drops the lead.
4. **Validation** — name ≥ 2, valid email, message ≥ 5 chars.
5. **Forward** — POSTs the payload (+ `meta`: ip, ua, origin, ts) to `N8N_CONTACT_WEBHOOK`
   with optional `X-Shared-Secret`. Failure → 502 `upstream_failed`.

### Environment variables (`.env`, gitignored)
| Var | Purpose |
|-----|---------|
| `N8N_CONTACT_WEBHOOK` | **Required.** URL the contact lead is forwarded to. Unset → 502. |
| `ALLOWED_ORIGIN` | Comma-separated allowlist of site origins. **Must be the production domain(s)**, e.g. `https://restart.cl,https://www.restart.cl`. A `localhost` value in prod returns **403 forbidden** on every submit. Unset → all origins allowed. |
| `N8N_SHARED_SECRET` | Optional. Sent as `X-Shared-Secret` header to n8n. |
| `CONTACT_RATE_LIMIT_PER_MIN` | Optional, default 5. |
| `MAIL_PASS` | Mail provider credential (MailerSend). |
| `PORT` | Server port (default 3000). |

> **Production gotcha:** the #1 cause of "form doesn't work in prod" is `ALLOWED_ORIGIN`
> still pointing at `localhost`. Origin matching is `origin.startsWith(allowed)`, so include
> both apex and `www` if the site is reachable on both.

`.env.development` (tracked) holds only non-secret dev defaults (`PORT`, `NODE_ENV`).

## Theming (`src/style.css`)

Tailwind 4 `@theme` defines a turquoise primary ramp (`--color-primary-50…900`) plus two
narrative accents (electric `#4F3DF5`, gold `#F59F24`) and functional signal colors. Semantic
tokens (`--color-bg`, `--color-surface`, `--color-text`, `--color-border`, …) resolve per
theme. **Light is the default; `html[data-theme="dark"]` overrides the tokens.** Toggle via
`useTheme`. Always style with semantic tokens (`bg-surface`, `text-text`, `border-border`,
`var(--color-…)`) so components work in both themes — avoid hardcoded hex except on
permanently-dark surfaces (heroes, FAQ).

- **Fonts:** Lato (`--font-sans` / `--font-display`), Merriweather (`--font-serif`).
  `<em>` renders as italic Merriweather (editorial accent); inside headings it takes the
  primary color — used heavily in section titles.
- **Reusable button system:** `.btn` + `.btn-primary` / `.btn-ghost` / `.btn-ghost-dark` /
  `.btn-text` (defined in `style.css`).

## Conventions

- **Indentation:** tabs (per `.editorconfig`); **Line endings:** LF; **Charset:** UTF-8.
- **Vue:** Composition API with `<script setup>`, no Options API.
- **Pages** live in `src/pages/` (one per route); shared/repeated UI in `src/components/`.
- **Styling:** Tailwind utilities first; scoped `<style>` with CSS tokens for bespoke
  sections. Match the existing editorial style (light section title + italic `<em>` accent,
  `.eyebrow` kicker, serif lede). Mirror an existing page (e.g. `LabsPage.vue`,
  `StartupPage.vue`) when adding a new one.
- **Spanish copy:** neutral Spanish (Chile-facing) — not Argentine voseo. Tech anglicisms
  (MVP, SaaS, PWA, deploy, sprint) are fine.
- **Tracking:** GTM tracking is automatic via event delegation; give meaningful section
  `id`s / link text. No manual wiring needed for clicks.

## Infrastructure

- Main site: `https://restart.cl` (this repo, Node.js SSR)
- Help center: `https://help.restart.cl`
- Hosting panel: `http://hosting.restart.cl`
- Campaigns: `http://campaign.restart.cl`
