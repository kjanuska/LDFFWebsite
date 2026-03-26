import type { Lang } from '$lib/types';
import en from './en.ts';
import lt from './lt.ts';

const translations = { en, lt } as const;

export type Translations = typeof en;

export function t(lang: Lang): Translations {
	return translations[lang];
}

export function localize<T extends Record<string, unknown>>(
	item: T,
	lang: Lang,
	fields: string[]
): T & Record<string, string> {
	const result = { ...item } as T & Record<string, string>;
	for (const field of fields) {
		const key = `${field}_${lang}` as keyof T;
		result[field] = item[key] as string;
	}
	return result;
}
