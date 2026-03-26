<script lang="ts">
	import type { Film, Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import { getFilmTitle, getFilmDescription, formatScreeningTime } from '$lib/utils/data';
	import LazyVideo from '$lib/components/ui/LazyVideo.svelte';
	import { Calendar, MapPin, ExternalLink, Clock, Globe, Film as FilmIcon } from 'lucide-svelte';

	interface Props {
		film: Film;
		lang: Lang;
	}

	let { film, lang }: Props = $props();
	let strings = $derived(t(lang));
	let title = $derived(getFilmTitle(film, lang));
	let description = $derived(getFilmDescription(film, lang));
</script>

<article class="film-detail">
	<div class="film-detail-grid">
		<div class="poster-column">
			<img
				src="/images/{film.year}/posters/{film.poster_filename}"
				alt={title}
				class="poster"
				loading="lazy"
				decoding="async"
			/>
		</div>

		<div class="info-column">
			<h1>{title}</h1>
			<p class="director">{film.director}</p>

			<p class="description">{description}</p>

			<dl class="meta-list">
				{#if film.duration}
					<div class="meta-item">
						<dt><Clock size={16} /> {strings.film.duration}</dt>
						<dd>{film.duration} {strings.film.minutes}</dd>
					</div>
				{/if}
				{#if film.country}
					<div class="meta-item">
						<dt><Globe size={16} /> {strings.film.country}</dt>
						<dd>{film.country}</dd>
					</div>
				{/if}
				{#if film.language}
					<div class="meta-item">
						<dt><FilmIcon size={16} /> {strings.film.language}</dt>
						<dd>{film.language}</dd>
					</div>
				{/if}
				{#if film.screening_datetime}
					<div class="meta-item">
						<dt><Calendar size={16} /> {strings.film.screening}</dt>
						<dd>{formatScreeningTime(film.screening_datetime, lang)}</dd>
					</div>
				{/if}
				{#if film.location_name}
					<div class="meta-item">
						<dt><MapPin size={16} /> {strings.film.location}</dt>
						<dd>
							{#if film.location_google_maps_url}
								<a href={film.location_google_maps_url} target="_blank" rel="noopener noreferrer">
									{film.location_name} <ExternalLink size={12} />
								</a>
							{:else}
								{film.location_name}
							{/if}
						</dd>
					</div>
				{/if}
			</dl>

			{#if film.ticket_url}
				<a
					href={film.ticket_url}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-primary"
				>
					<ExternalLink size={16} />
					{strings.film.tickets}
				</a>
			{/if}
		</div>
	</div>

	{#if film.trailer_url}
		<div class="trailer-section">
			<h2>{strings.film.watchTrailer}</h2>
			<LazyVideo url={film.trailer_url} title={title} />
		</div>
	{/if}
</article>

<style>
	.film-detail-grid {
		display: grid;
		gap: var(--space-xl);
	}

	@media (min-width: 640px) {
		.film-detail-grid {
			grid-template-columns: 300px 1fr;
		}
	}

	@media (min-width: 1024px) {
		.film-detail-grid {
			grid-template-columns: 350px 1fr;
		}
	}

	.poster {
		width: 100%;
		max-width: 350px;
		aspect-ratio: 2 / 3;
		object-fit: cover;
		background: var(--color-gray-100);
	}

	h1 {
		margin-bottom: var(--space-xs);
	}

	.director {
		font-size: var(--text-lg);
		color: var(--color-gray-500);
		margin-bottom: var(--space-lg);
	}

	.description {
		line-height: 1.8;
		color: var(--color-gray-800);
		margin-bottom: var(--space-xl);
		max-width: 60ch;
	}

	.meta-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-bottom: var(--space-lg);
	}

	.meta-item {
		display: flex;
		gap: var(--space-lg);
		font-size: var(--text-sm);
	}

	.meta-item dt {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		color: var(--color-gray-500);
		min-width: 120px;
		font-weight: 500;
	}

	.meta-item dd {
		color: var(--color-gray-800);
	}

	.meta-item dd a {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.meta-item dd a:hover {
		color: var(--color-black);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		padding: 12px 24px;
		font-size: var(--text-sm);
		font-weight: 500;
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.btn-primary {
		background: var(--color-black);
		color: var(--color-white);
	}

	.btn-primary:hover {
		background: var(--color-gray-800);
	}

	.trailer-section {
		margin-top: var(--space-2xl);
	}

	.trailer-section h2 {
		margin-bottom: var(--space-lg);
	}
</style>
