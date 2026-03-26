# LDFF Website — Claude Code Instructions

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
/en/{year}/{slug}    → Individual film page
/lt/...              → Lithuanian equivalents
```

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
| `src/lib/utils/seo.ts` | JSON-LD generators: Organization, Event, Movie, Breadcrumb |
| `src/lib/i18n/index.ts` | `t(lang)` function returning UI strings |
| `src/lib/i18n/en.ts` | English UI strings |
| `src/lib/i18n/lt.ts` | Lithuanian UI strings |
| `src/app.css` | CSS custom properties, reset, typography |
| `svelte.config.js` | Static adapter config, prerender entries |
| `scripts/build-data.ts` | CSV → JSON build script (run with `tsx`) |

## Component Map

```
layout/
  Header.svelte       — sticky nav, logo, language switcher
  Footer.svelte       — social links, copyright

seo/
  SeoHead.svelte      — meta, OG, Twitter, canonical, hreflang
  JsonLd.svelte       — <script type="application/ld+json">

ui/
  Modal.svelte        — generic modal: ESC close, backdrop click, scroll lock
  LazyVideo.svelte    — YouTube/Vimeo: loads iframe only on click
  LazyImage.svelte    — loading="lazy" + decoding="async"
  Breadcrumb.svelte   — breadcrumb trail
  LanguageSwitcher.svelte — EN/LT toggle links

film/
  FilmCard.svelte     — poster card (<a> tag for SEO, click opens modal)
  FilmGrid.svelte     — responsive CSS grid of FilmCards
  FilmModal.svelte    — modal with trailer + film info
  FilmDetail.svelte   — full film content for dedicated page

gallery/
  GalleryGrid.svelte  — grid of thumbnails, opens Lightbox
  Lightbox.svelte     — fullscreen viewer, arrow keys + swipe

sponsors/
  SponsorBar.svelte   — logo row, grayscale → color on hover

home/
  Hero.svelte         — hero section with year, tagline, dates
```

## Styling

All styles use CSS custom properties defined in `src/app.css`. Component styles are scoped via Svelte's `<style>` blocks. No CSS framework.

Key variables: `--color-black`, `--color-white`, `--color-accent` (#c8102e), `--font-heading` (Georgia), `--font-body` (Inter), fluid `--text-*` sizes using `clamp()`.

## Adding a New Festival Year

1. Add a new row to `data/csv/festival-info.csv`
2. Add film rows to `data/csv/films.csv` with the new year
3. Add sponsor rows to `data/csv/sponsors.csv` with the new year
4. Add images to `static/images/{year}/`
5. Run `npm run build` — new pages are auto-generated via `entries()` functions

## Prerender

Every `+page.ts` exports an `entries()` function that generates all lang/year/slug combinations. The root `+layout.ts` sets `prerender = true`. Missing images during prerender are silently ignored (configured in `svelte.config.js`).

## Deployment

Build output goes to `build/`. Deploy to Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `build`
- Node version: 20

`static/_redirects` handles `/ → /en/` at the CDN edge.
`static/_headers` sets cache headers for fonts and images.
