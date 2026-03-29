<script lang="ts">
	import type { Film, Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import FilmList from '$lib/components/film/FilmList.svelte';
	import TrailerModal from '$lib/components/film/TrailerModal.svelte';
	import SponsorBar from '$lib/components/sponsors/SponsorBar.svelte';
	import GalleryGrid from '$lib/components/gallery/GalleryGrid.svelte';

	let { data } = $props();
	let lang = $derived(data.lang as Lang);
	let strings = $derived(t(lang));

	let selectedFilm: Film | null = $state(null);
</script>

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
