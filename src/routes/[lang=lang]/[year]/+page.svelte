<script lang="ts">
	import type { Film, Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import { buildEventJsonLd, buildBreadcrumbJsonLd } from '$lib/utils/seo';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import FilmList from '$lib/components/film/FilmList.svelte';
	import TrailerModal from '$lib/components/film/TrailerModal.svelte';
	import SponsorBar from '$lib/components/sponsors/SponsorBar.svelte';
	import GalleryGrid from '$lib/components/gallery/GalleryGrid.svelte';
	import { getFestivalTagline } from '$lib/utils/data';

	let { data } = $props();
	let lang = $derived(data.lang as Lang);
	let strings = $derived(t(lang));

	let selectedFilm: Film | null = $state(null);
</script>

{#if data.festival}
	{@const tagline = getFestivalTagline(data.festival, lang)}
	<SeoHead
		title="LDFF {data.year} — {tagline}"
		description={lang === 'en' ? data.festival.hero_description_en : data.festival.hero_description_lt}
		{lang}
	/>
	<JsonLd data={buildEventJsonLd(data.festival, lang)} />
{:else}
	<SeoHead
		title="LDFF {data.year}"
		description={strings.seo.siteDescription}
		{lang}
	/>
{/if}
<JsonLd
	data={buildBreadcrumbJsonLd([
		{ name: strings.nav.home, url: `/${lang}/` },
		{ name: strings.archive.title, url: `/${lang}/archive` },
		{ name: String(data.year), url: `/${lang}/${data.year}` }
	])}
/>

<div class="container">
	<Breadcrumb
		items={[
			{ label: strings.nav.home, href: `/${lang}/` },
			{ label: strings.archive.title, href: `/${lang}/archive` },
			{ label: String(data.year), href: `/${lang}/${data.year}` }
		]}
	/>
</div>

{#if data.festival}
	<Hero festival={data.festival} {lang} />
{/if}

<div class="container">
	{#if data.films.length > 0}
		<section class="section">
			<h2 class="section-heading">{strings.nav.films}</h2>
			<FilmList
				films={data.films}
				{lang}
				ontrailerclick={(film) => (selectedFilm = film)}
			/>
		</section>
	{/if}

	<SponsorBar sponsors={data.sponsors} {lang} />

	<GalleryGrid images={data.gallery} {lang} />
</div>

<TrailerModal
	film={selectedFilm}
	{lang}
	open={selectedFilm !== null}
	onclose={() => (selectedFilm = null)}
/>

<style>
	h2 {
		margin-bottom: var(--space-lg);
	}
</style>
