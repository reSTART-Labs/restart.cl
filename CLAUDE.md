# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page marketing website for Re/START (restart.cl). Built with Vue 3 + Vite + Tailwind CSS 4 with Server-Side Rendering (SSR) via Express.

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 6** (dev server + build)
- **Tailwind CSS 4** (utility-first, `@theme` config in `src/style.css`)
- **Express 5** (SSR server)
- **Yarn 4** (package manager, `nodeLinker: node-modules`)
- **Node.js 22** (see `.nvmrc`)
- **Google Analytics** (UA legacy)
- **Cal.com** embed for booking
- **Ionicons 2.0.1** + **Font Awesome 4.7.0** (CDN in `index.html`)

## Build & Development

```bash
yarn install              # Install dependencies
yarn dev                  # Vite dev server (client only, HMR)
yarn dev:server           # SSR dev server with Express + nodemon (http://localhost:3000)
yarn build                # Build client + SSR bundles
yarn serve                # Production SSR server
```

**Deployment:** Node.js server running `yarn serve` (SSR with Express).

## Architecture

### Directory Structure
```
index.html                 # Vite entry point (<!--app-html--> placeholder for SSR)
server.js                  # Express SSR server
vite.config.js             # Vite + Vue + Tailwind config
src/
  main.client.js           # Client entry: createApp + mount
  main.server.js           # Server entry: createSSRApp + renderToString
  App.vue                  # Root component, imports all sections
  style.css                # Tailwind imports + @theme (colors, fonts)
  components/
    Nav.vue                # Navbar (transparent, absolute positioned)
    Hero.vue               # Full-height hero with parallax
    About.vue              # "Sobre nosotros" section
    Features.vue           # 4 services in 2x2 grid
    Contact.vue            # Cal.com embed + social links
    Footer.vue             # 4-column footer with go-top button
  composables/
    useParallax.js         # Scroll-based parallax (SSR-safe, desktop only)
public/
  img/                     # hero.jpg, contact.jpg, office.jpg
  favicon.png
  logo.png
```

### Key Sections
Nav → Hero → About → Features → Contact (Cal.com embed) → Footer

### Tailwind Theme (`src/style.css`)
Custom colors and fonts defined via `@theme`:
- **Primary (turquesa):** `#41BECF` (primary), `#25A1B4` (dark), `#228398` (deep), `#11303B` (ocean), `#7DD8E3` (sky)
- **Oscuros:** `#141218` (dark/footer), `#1E1E1E` (soft), `#36343B` (graphite/contact)
- **Acentos:** violeta `#563CF8`, magenta `#E60A62`, naranja `#FF6B00`, dorado `#FAA92B`, verde `#47AE89`
- **Fuentes:** Libre Franklin, Lato (sans) / Merriweather (serif)

## Conventions

- **Indentation:** tabs (per `.editorconfig`)
- **Line endings:** LF
- **Charset:** UTF-8
- **Vue style:** Composition API with `<script setup>`, no Options API
- **Styling:** Tailwind utility classes (no custom CSS unless necessary)
- **Breakpoints:** Tailwind defaults + `max-md` / `max-lg` variants

## Infrastructure

- Main site: `https://restart.cl` (this repo, Node.js SSR)
- Help center: `https://help.restart.cl`
- Hosting panel: `http://hosting.restart.cl`
- Campaigns: `http://campaign.restart.cl`
