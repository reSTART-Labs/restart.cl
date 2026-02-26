# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page marketing website for Re/START (restart.cl). No build system based on Node.js — uses CodeKit 2.x (macOS GUI app) for SCSS compilation and JS minification. Deployed via GitHub Pages from the `master` branch.

## Tech Stack

- **HTML5** single-page site (`index.html`)
- **SCSS/Sass** compiled to CSS via CodeKit
- **Bootstrap 4 Alpha 6** (CDN)
- **jQuery 3.2.1** + Skrollr 0.6.30 for parallax (CDN)
- **Google Analytics** (UA legacy)
- **Cal.com** embed for booking

## Build & Development

There is no `package.json` or npm workflow. CodeKit 2.x handles:
- `assets/scss/main.scss` → `assets/dist/css/main.css` (compressed, with source map)
- `assets/dist/js/main.js` → `assets/dist/js/main.min.js` (minified, with source map)

To develop locally, open `index.html` in a browser. CodeKit watches for file changes and recompiles automatically. Built output in `assets/dist/` is committed to the repo.

**Deployment:** push to `master` — GitHub Pages serves the site at `restart.cl` (configured via `CNAME`).

## Architecture

### SCSS Structure (`assets/scss/`)
- `main.scss` — entry point, imports all partials
- `variables.scss` — font stacks and easing variables
- `bootstrap/_overrides.scss` — Bootstrap 4 customizations
- `custom/_layout.scss` — navbar variants (light/dark/transparent), footer, off-canvas
- `custom/modules/` — mixins for vendor prefixes, CSS animation keyframes
- `custom/components/` — button styles (most component partials are commented out)
- `custom/pages/` — per-section styles: hero, home (features), contact, footer

Vendor prefixes are handled via custom mixins (not Autoprefixer).

### JavaScript (`assets/dist/js/main.js`)
- jQuery IIFE pattern with `$(document).ready()`
- `window.utils` namespace: browser detection, debounce, parallax helpers
- `retina` object for hi-DPI image swapping via `data-2x` attributes
- Skrollr parallax initialized only on desktop (>1024px width)

### Key Sections in `index.html`
Header (navbar) → Hero → About → Features → Contact (Cal.com embed) → Footer

## Conventions

- **Indentation:** tabs (per `.editorconfig`)
- **Line endings:** LF
- **Charset:** UTF-8
- **Breakpoints:** 767px (mobile), 991px (tablet), 1200px (desktop)
- **Color palette:** dark navy `#353d4d`/`#343746` (footer), accent blue `#31b3ed` (hero)

## Infrastructure (from README)

- Main site: `https://restart.cl` (this repo, GitHub Pages)
- Help center: `https://help.restart.cl` (ticket system on compute instance)
- Hosting panel: `http://hosting.restart.cl`
- Campaigns: `http://campaign.restart.cl`
