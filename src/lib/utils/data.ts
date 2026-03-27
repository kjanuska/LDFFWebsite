import type { Lang, Film, Festival, Sponsor, GalleryImage } from '$lib/types';
import festivalsData from '$lib/data/festivals.json';
import filmsData from '$lib/data/films.json';
import sponsorsData from '$lib/data/sponsors.json';
import galleryData from '$lib/data/gallery.json';

const festivals = festivalsData as Festival[];
const films = filmsData as Film[];
const sponsors = sponsorsData as Sponsor[];
const gallery = galleryData as GalleryImage[];

export function getCurrentFestival(): Festival | undefined {
	// Most recent year is "current"
	return festivals.reduce((latest, f) => (f.year > (latest?.year ?? 0) ? f : latest), festivals[0]);
}

export function getFestival(year: number): Festival | undefined {
	return festivals.find((f) => f.year === year);
}

export function getAllFestivals(): Festival[] {
	return [...festivals].sort((a, b) => b.year - a.year);
}

export function getFilmsForYear(year: number): Film[] {
	return films.filter((f) => f.year === year);
}

export function getFilm(year: number, slug: string): Film | undefined {
	return films.find((f) => f.year === year && f.slug === slug);
}

export function getAllFilms(): Film[] {
	return films;
}

export function getSponsorsForYear(year: number): Sponsor[] {
	return sponsors.filter((s) => s.year === year);
}

export function getGalleryForYear(year: number): GalleryImage[] {
	return gallery.filter((g) => g.year === year);
}

export function getFilmTitle(film: Film, lang: Lang): string {
	return lang === 'en' ? film.title_en : film.title_lt;
}

export function getFilmDescription(film: Film, lang: Lang): string {
	return lang === 'en' ? film.description_en : film.description_lt;
}

export function getFestivalTagline(festival: Festival, lang: Lang): string {
	return lang === 'en' ? festival.tagline_en : festival.tagline_lt;
}

export function getFestivalDescription(festival: Festival, lang: Lang): string {
	return lang === 'en' ? festival.hero_description_en : festival.hero_description_lt;
}

export function formatDate(dateStr: string, lang: Lang): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString(lang === 'en' ? 'en-GB' : 'lt-LT', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

export function formatDateRange(start: string, end: string, lang: Lang): string {
	const startDate = new Date(start);
	const endDate = new Date(end);
	const locale = lang === 'en' ? 'en-GB' : 'lt-LT';

	const startStr = startDate.toLocaleDateString(locale, { day: 'numeric', month: 'long' });
	const endStr = endDate.toLocaleDateString(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	return `${startStr} – ${endStr}`;
}

export function formatScreeningTime(datetime: string, lang: Lang): string {
	const date = new Date(datetime);
	const locale = lang === 'en' ? 'en-GB' : 'lt-LT';

	const dateStr = date.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	});

	// Use 12-hour format for English, 24-hour for Lithuanian
	const timeStr = date.toLocaleTimeString(locale, {
		hour: 'numeric',
		minute: '2-digit',
		hour12: lang === 'en'
	});

	return `${dateStr}, ${timeStr}`;
}
