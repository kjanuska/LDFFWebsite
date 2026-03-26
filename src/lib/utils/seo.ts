import type { Film, Festival, Lang } from '$lib/types';

const BASE_URL = 'https://ldff.info';

export function buildOrganizationJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Lithuanian Documentary Film Festival',
		alternateName: 'LDFF',
		url: BASE_URL,
		logo: `${BASE_URL}/favicon.svg`
	};
}

export function buildEventJsonLd(festival: Festival, lang: Lang) {
	const description =
		lang === 'en' ? festival.hero_description_en : festival.hero_description_lt;
	return {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: `LDFF ${festival.year}`,
		description,
		startDate: festival.festival_start_date,
		endDate: festival.festival_end_date,
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		location: {
			'@type': 'Place',
			name: 'Vilnius',
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Vilnius',
				addressCountry: 'LT'
			}
		},
		organizer: buildOrganizationJsonLd()
	};
}

export function buildMovieJsonLd(film: Film, lang: Lang) {
	const title = lang === 'en' ? film.title_en : film.title_lt;
	const description = lang === 'en' ? film.description_en : film.description_lt;
	return {
		'@context': 'https://schema.org',
		'@type': 'Movie',
		name: title,
		description,
		director: {
			'@type': 'Person',
			name: film.director
		},
		duration: `PT${film.duration}M`,
		image: `${BASE_URL}/images/${film.year}/posters/${film.poster_filename}`,
		...(film.trailer_url
			? {
					trailer: {
						'@type': 'VideoObject',
						embedUrl: film.trailer_url
					}
				}
			: {})
	};
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: `${BASE_URL}${item.url}`
		}))
	};
}

export { BASE_URL };
