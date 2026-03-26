import type { LayoutLoad } from './$types';
import type { Lang } from '$lib/types';

export const load: LayoutLoad = ({ params }) => {
	return {
		lang: params.lang as Lang
	};
};
