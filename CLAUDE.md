# LDFF Website — Claude Code Instructions

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:
 
Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
 
Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
 
Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
 
Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.
 
Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character
 
Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

## Project Overview

Static website for the Lithuanian Documentary Film Festival (LDFF). Bilingual (EN/LT). Built with SvelteKit + static adapter, deployed to Cloudflare Pages.

**Domain:** `https://ldff.info`

## Tech Stack

- **Framework:** SvelteKit 2 with `@sveltejs/adapter-static`
- **Language:** TypeScript, Svelte 5 (runes syntax)
- **Icons:** lucide-svelte
- **Hosting:** Cloudflare Pages
- **Svelte version is 5** — always use runes: `$props()`, `$state()`, `$derived()`, `$effect()`. Never use `export let`, `$:`, or `onMount` from Svelte 4.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Run build:data then vite build (produces /build)
npm run build:data   # CSV → JSON pipeline only (writes to src/lib/data/)
npm run check        # TypeScript + svelte-check
npm run preview      # Preview production build locally
```

## URL Structure

```
/                    → redirects to /en/
/en/                 → Homepage (current festival year)
/lt/                 → Homepage (Lithuanian)
/en/archive          → All festival editions
/en/{year}           → Single edition (films, gallery, sponsors)
/lt/...              → Lithuanian equivalents
```

Individual film pages (`/en/{year}/{slug}`) are **not yet implemented** — `FilmDetail.svelte` exists but there are no route handlers.

The `[lang=lang]` param matcher enforces only `en` or `lt` are valid.

## Data Flow

1. Admin exports Google Sheets tabs as CSV into `data/csv/`
2. Run `npm run build:data` — parses CSVs, writes JSON to `src/lib/data/`
3. Run `npm run build` (or just `npm run build` which does both)
4. Deploy `build/` to Cloudflare Pages

### CSV files (source of truth — committed to git)

- `data/csv/festival-info.csv` — one row per year: dates, taglines, descriptions
- `data/csv/films.csv` — one row per film, `year` column groups by edition
- `data/csv/sponsors.csv` — one row per sponsor with `year`, `tier`, `display_order`
- `data/csv/locations-master.csv` — canonical location data, referenced by films
- Gallery images are **not in CSV** — auto-detected from `static/images/{year}/gallery/`

### Generated JSON (gitignored — rebuilt from CSV)

- `src/lib/data/festivals.json`
- `src/lib/data/films.json`
- `src/lib/data/sponsors.json`
- `src/lib/data/gallery.json`

## Static Images

```
static/images/{year}/posters/     # Film poster images
static/images/{year}/gallery/     # Photo gallery images
static/images/sponsors/{year}/    # Sponsor logos
```

## Key Files

| File | Purpose |
|---|---|
| `src/params/lang.ts` | Constrains `[lang]` param to `en` or `lt` |
| `src/lib/types/index.ts` | All TypeScript interfaces (Film, Festival, Sponsor, etc.) |
| `src/lib/utils/data.ts` | Data helpers: `getCurrentFestival()`, `getFilmsForYear()`, date formatting |
| `src/lib/utils/poster.ts` | Poster helpers: `posterExists()`, `getPosterUrl()`, SVG placeholder generator |
| `src/lib/i18n/index.ts` | `t(lang)` function returning UI strings |
| `src/lib/i18n/en.ts` | English UI strings |
| `src/lib/i18n/lt.ts` | Lithuanian UI strings |
| `src/app.css` | CSS custom properties, reset, typography |
| `svelte.config.js` | Static adapter config, prerender entries |
| `scripts/build-data.ts` | CSV → JSON build script (run with `tsx`) |

## Component Map

```
layout/
  Header.svelte       — sticky nav, logo, year dropdown, language switcher
  Footer.svelte       — logo, copyright, social links (Facebook only)

ui/
  Modal.svelte        — generic modal: ESC close, backdrop click, scroll lock
  LazyVideo.svelte    — YouTube/Vimeo: loads iframe only on click
  LazyImage.svelte    — loading="lazy" + decoding="async"
  Breadcrumb.svelte   — breadcrumb trail
  LanguageSwitcher.svelte — EN/LT toggle links

film/
  FilmCard.svelte     — poster card with hover overlay, click handler
  FilmList.svelte     — numbered list view with poster, meta, description
  FilmGrid.svelte     — responsive CSS grid of FilmCards
  FilmModal.svelte    — modal wrapper for trailer playback
  TrailerModal.svelte — modal containing LazyVideo for trailer
  FilmDetail.svelte   — full film content (unused — no route implemented yet)

gallery/
  GalleryGrid.svelte  — grid of thumbnails, opens Lightbox
  Lightbox.svelte     — fullscreen viewer, arrow keys + swipe

sponsors/
  SponsorBar.svelte   — logo row, grayscale → color on hover

home/
  Hero.svelte         — hero section with logo, year badge, tagline, dates

analytics/
  CloudflareAnalytics.svelte — loads Cloudflare Web Analytics beacon
```

## Styling

All styles use CSS custom properties defined in `src/app.css`. Component styles are scoped via Svelte's `<style>` blocks. No CSS framework.

Key variables: `--color-black` (#0a0a0a), `--color-white` (#fafafa), `--color-accent` (#b71c1c, Lithuanian flag red), `--color-flag-yellow` (#f9a825), `--color-flag-green` (#1b5e20), `--font-heading` (Georgia), `--font-body` (Inter), fluid `--text-*` sizes using `clamp()`.

## Adding a New Festival Year

1. Add a new row to `data/csv/festival-info.csv`
2. Add film rows to `data/csv/films.csv` with the new year
3. Add sponsor rows to `data/csv/sponsors.csv` with the new year
4. Add images to `static/images/{year}/`
5. Run `npm run build` — new pages are auto-generated via `entries()` functions

## Prerender

Every `+page.ts` exports an `entries()` function that generates all lang/year combinations. The root `+layout.ts` sets `prerender = true`. Missing images during prerender are silently ignored (configured in `svelte.config.js`).

## Deployment

Build output goes to `build/`. Deploy to Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `build`
- Node version: 20

`static/_redirects` handles `/ → /en/` at the CDN edge.
`static/_headers` sets cache headers for fonts and images.
