export type Lang = 'en' | 'lt';

export interface Festival {
	year: number;
	festival_start_date: string;
	festival_end_date: string;
	tagline_en: string;
	tagline_lt: string;
	hero_description_en: string;
	hero_description_lt: string;
}

export interface Film {
	year: number;
	slug: string;
	title_en: string;
	title_lt: string;
	description_en: string;
	description_lt: string;
	director: string;
	duration: number;
	language: string;
	screening_datetime: string;
	location_name: string;
	location_address: string;
	location_google_maps_url: string;
	trailer_url: string;
	poster_filename: string;
}

export interface Sponsor {
	year: number;
	sponsor_name: string;
	logo_filename: string;
	url: string;
	tier: 'main' | 'partner' | 'media' | 'supporter';
	display_order: number;
}

export interface GalleryImage {
	filename: string;
	year: number;
}
