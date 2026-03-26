import type { PageLoad, EntryGenerator } from './$types';
import type { Lang } from '$lib/types';
import {
	getAllFestivals,
	getFestival,
	getFilmsForYear,
	getSponsorsForYear,
	getGalleryForYear
} from '$lib/utils/data';

export const entries: EntryGenerator = () => {
	const festivals = getAllFestivals();
	const entries = [];
	for (const f of festivals) {
		entries.push({ lang: 'en', year: String(f.year) });
		entries.push({ lang: 'lt', year: String(f.year) });
	}
	return entries;
};

export const load: PageLoad = ({ params }) => {
	const lang = params.lang as Lang;
	const year = Number(params.year);
	const festival = getFestival(year);
	const films = getFilmsForYear(year);
	const sponsors = getSponsorsForYear(year);
	const gallery = getGalleryForYear(year);

	return {
		lang,
		year,
		festival,
		films,
		sponsors,
		gallery
	};
};
