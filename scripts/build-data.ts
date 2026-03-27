/**
 * Build Data Script
 *
 * Converts CSV exports from Google Sheets into structured JSON
 * that SvelteKit uses at build time.
 *
 * Usage: npx tsx scripts/build-data.ts
 *
 * CSV files in data/csv/:
 * - festival-info.csv      — one row per festival year
 * - films.csv              — one row per film (uses location_slug)
 * - locations-master.csv   — master list of venues (slug → name + map URL)
 * - sponsors.csv           — one row per sponsor-year entry (uses sponsor_slug)
 * - sponsors-master.csv    — master list of sponsors (slug → name + logo + url)
 *
 * Gallery images are auto-detected from static/images/{year}/gallery/ folders.
 * Sponsor logos live in static/images/sponsors/ (flat, no year subdirectory).
 */

import { parse } from 'csv-parse/sync';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const CSV_DIR = join(ROOT, 'data', 'csv');
const OUT_DIR = join(ROOT, 'src', 'lib', 'data');
const STATIC_DIR = join(ROOT, 'static');

mkdirSync(OUT_DIR, { recursive: true });

// --- Helpers ---

function readCsv<T>(filename: string): T[] {
	const filepath = join(CSV_DIR, filename);
	if (!existsSync(filepath)) {
		console.warn(`Warning: ${filename} not found in data/csv/, writing empty array.`);
		return [];
	}
	const raw = readFileSync(filepath, 'utf-8');
	return parse(raw, {
		columns: true,
		skip_empty_lines: true,
		trim: true,
		cast: (value, context) => {
			if (context.header) return value;
			if (context.column === 'year' || context.column === 'duration' || context.column === 'display_order') {
				const num = Number(value);
				return isNaN(num) ? value : num;
			}
			return value;
		}
	}) as T[];
}

function writeJson(filename: string, data: unknown): void {
	const filepath = join(OUT_DIR, filename);
	writeFileSync(filepath, JSON.stringify(data, null, '\t'));
	console.log(`  ✓ ${filename}`);
}

function validateRequired(records: Record<string, unknown>[], fields: string[], source: string): void {
	for (let i = 0; i < records.length; i++) {
		for (const field of fields) {
			if (records[i][field] === undefined || records[i][field] === '') {
				console.error(`Error: Missing required field "${field}" in ${source} row ${i + 1}`);
				process.exit(1);
			}
		}
	}
}

// --- Process Festival Info ---

console.log('Building data...');

const festivals = readCsv<Record<string, unknown>>('festival-info.csv');
validateRequired(festivals, ['year', 'festival_start_date', 'festival_end_date'], 'festival-info.csv');
writeJson('festivals.json', festivals);

// --- Load Locations Master ---

type LocationRow = { slug: string; name: string; address: string; google_maps_url: string };
const locationsRaw = readCsv<LocationRow>('locations-master.csv');
const locationsMap = new Map(locationsRaw.map((l) => [l.slug, l]));

// --- Process Films (resolve location_slug → location fields) ---

type FilmRow = Record<string, unknown> & { location_slug?: string; trailer_url_en?: string; trailer_url_lt?: string };
const filmsRaw = readCsv<FilmRow>('films.csv');
validateRequired(filmsRaw as Record<string, unknown>[], ['year', 'slug', 'title_en', 'title_lt'], 'films.csv');

const films = filmsRaw.map((film) => {
	const { location_slug, trailer_url_en, trailer_url_lt, ...rest } = film;
	const loc = location_slug ? locationsMap.get(location_slug) : undefined;
	if (location_slug && !loc) {
		console.warn(`Warning: location_slug "${location_slug}" not found in locations-master.csv`);
	}

	// Smart trailer URL logic
	let finalTrailerEn = trailer_url_en || '';
	let finalTrailerLt = trailer_url_lt || '';

	// If only one language has a trailer, use it for both
	if (trailer_url_en && !trailer_url_lt) {
		finalTrailerLt = trailer_url_en;
	} else if (trailer_url_lt && !trailer_url_en) {
		finalTrailerEn = trailer_url_lt;
	}

	return {
		...rest,
		location_name: loc?.name ?? '',
		location_address: loc?.address ?? '',
		location_google_maps_url: loc?.google_maps_url ?? '',
		trailer_url_en: finalTrailerEn,
		trailer_url_lt: finalTrailerLt,
	};
});

writeJson('films.json', films);

// --- Load Sponsors Master ---

type SponsorMasterRow = { slug: string; name: string; logo_filename: string; url: string };
const sponsorsMaster = readCsv<SponsorMasterRow>('sponsors-master.csv');
const sponsorsMap = new Map(sponsorsMaster.map((s) => [s.slug, s]));

// --- Process Sponsors (resolve sponsor_slug → full details) ---

type SponsorYearRow = { year: number; sponsor_slug: string };
const sponsorsRaw = readCsv<SponsorYearRow>('sponsors.csv');
validateRequired(sponsorsRaw as unknown as Record<string, unknown>[], ['year', 'sponsor_slug'], 'sponsors.csv');

const sponsors = sponsorsRaw.map((s, index) => {
	const master = sponsorsMap.get(s.sponsor_slug);
	if (!master) {
		console.warn(`Warning: sponsor_slug "${s.sponsor_slug}" not found in sponsors-master.csv`);
	}
	return {
		year: s.year,
		sponsor_name: master?.name ?? s.sponsor_slug,
		logo_filename: master?.logo_filename ?? '',
		url: master?.url && master.url.trim() ? master.url : undefined,
		display_order: index + 1, // Use CSV row order as importance ranking
	};
});

// Sponsors are already sorted by CSV order, no need to re-sort
writeJson('sponsors.json', sponsors);

// --- Auto-detect Gallery Images ---

const galleryImages: { filename: string; year: number }[] = [];
const imagesDir = join(STATIC_DIR, 'images');

if (existsSync(imagesDir)) {
	const yearDirs = readdirSync(imagesDir).filter((d) => /^\d{4}$/.test(d));
	for (const yearDir of yearDirs) {
		const galleryDir = join(imagesDir, yearDir, 'gallery');
		if (existsSync(galleryDir)) {
			const files = readdirSync(galleryDir).filter((f) =>
				/\.(jpg|jpeg|png|webp|avif)$/i.test(f)
			);
			for (const file of files.sort()) {
				galleryImages.push({ filename: file, year: Number(yearDir) });
			}
		}
	}
}

writeJson('gallery.json', galleryImages);

console.log('Data build complete.');
