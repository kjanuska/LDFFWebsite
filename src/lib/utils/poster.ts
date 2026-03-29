import type { Film, Lang } from '$lib/types';
import { getFilmTitle } from './data';

// Films that we know don't have actual poster images
const FILMS_WITHOUT_POSTERS = ['secret-screening', 'under-the-red-light'];

/**
 * Check if a poster image exists for a film
 */
export function posterExists(film: Film): boolean {
	// Check if this is a film we know doesn't have a poster
	if (FILMS_WITHOUT_POSTERS.includes(film.slug)) {
		return false;
	}

	// Check for both poster_filename and poster_filename_en (CSV field)
	const posterFile = film.poster_filename || (film as any).poster_filename_en;
	return !!(posterFile && posterFile.trim() !== '');
}

/**
 * Get the poster image URL for a film
 */
export function getPosterUrl(film: Film): string {
	// Check for both poster_filename and poster_filename_en (CSV field)
	const posterFile = film.poster_filename || (film as any).poster_filename_en;
	return `/images/${film.year}/posters/${posterFile}`;
}

/**
 * Generate an SVG placeholder for a film poster
 */
export function generatePosterPlaceholder(film: Film, lang: Lang): string {
	const title = getFilmTitle(film, lang);

	// Create a simple, elegant text-based poster
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
			<defs>
				<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#f7f9fc;stop-opacity:1" />
					<stop offset="100%" style="stop-color:#e8ecf1;stop-opacity:1" />
				</linearGradient>
			</defs>
			<rect width="400" height="600" fill="url(#bg)" stroke="#d0d7de" stroke-width="1"/>

			<!-- Title text -->
			<foreignObject x="20" y="80" width="360" height="380">
				<div xmlns="http://www.w3.org/1999/xhtml" style="
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
					text-align: center;
					font-family: Georgia, serif;
					font-size: 48px;
					font-weight: bold;
					line-height: 1.1;
					color: #2c3e50;
					padding: 30px;
					word-wrap: break-word;
					hyphens: auto;
				">
					${escapeHtml(title)}
				</div>
			</foreignObject>

			${film.director ? `
			<!-- Director -->
			<foreignObject x="20" y="470" width="360" height="80">
				<div xmlns="http://www.w3.org/1999/xhtml" style="
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
					text-align: center;
					font-family: Georgia, serif;
					font-size: 22px;
					font-style: italic;
					color: #6c757d;
					padding: 0 30px;
					word-wrap: break-word;
				">
					${escapeHtml(film.director)}
				</div>
			</foreignObject>
			` : ''}
		</svg>
	`.trim();

	// Convert to data URL using URL encoding (works in SSR)
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/**
 * Escape HTML/XML characters for safe use in SVG
 */
function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}