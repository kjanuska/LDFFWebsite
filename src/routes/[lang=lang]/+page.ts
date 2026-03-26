import type { PageLoad, EntryGenerator } from './$types';
import type { Lang } from '$lib/types';
import { getCurrentFestival, getFilmsForYear, getSponsorsForYear } from '$lib/utils/data';

export const entries: EntryGenerator = () => {
	return [{ lang: 'en' }, { lang: 'lt' }];
};

export const load: PageLoad = ({ params }) => {
	const lang = params.lang as Lang;
	const festival = getCurrentFestival();
	const films = festival ? getFilmsForYear(festival.year) : [];
	const sponsors = festival ? getSponsorsForYear(festival.year) : [];

	return {
		lang,
		festival,
		films,
		sponsors
	};
};
