import type { PageLoad, EntryGenerator } from './$types';
import type { Lang } from '$lib/types';
import { getAllFestivals } from '$lib/utils/data';

export const entries: EntryGenerator = () => {
	return [{ lang: 'en' }, { lang: 'lt' }];
};

export const load: PageLoad = ({ params }) => {
	return {
		lang: params.lang as Lang,
		festivals: getAllFestivals()
	};
};
