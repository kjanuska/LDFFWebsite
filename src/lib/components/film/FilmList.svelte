<script lang="ts">
	import type { Film, Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import { getFilmTitle, getFilmDescription, formatScreeningTime } from '$lib/utils/data';
	import { Play, Calendar, MapPin, Clock } from 'lucide-svelte';

	interface Props {
		films: Film[];
		lang: Lang;
		ontrailerclick?: (film: Film) => void;
	}

	let { films, lang, ontrailerclick }: Props = $props();
	let strings = $derived(t(lang));
</script>

<ul class="film-list">
	{#each films as film, i (film.slug)}
		{@const title = getFilmTitle(film, lang)}
		{@const description = getFilmDescription(film, lang)}
		<li class="film-item" class:odd={i % 2 === 0}>
			<div class="film-number">{String(i + 1).padStart(2, '0')}</div>

			<button
				class="poster-btn"
				onclick={() => film.trailer_url && ontrailerclick?.(film)}
				aria-label={film.trailer_url ? `${strings.film.watchTrailer}: ${title}` : title}
				disabled={!film.trailer_url}
			>
				<img
					src="/images/{film.year}/posters/{film.poster_filename}"
					alt={title}
					loading="lazy"
					decoding="async"
					class="poster"
				/>
				{#if film.trailer_url}
					<div class="play-overlay">
						<div class="play-icon"><Play size={28} fill="currentColor" /></div>
					</div>
				{/if}
			</button>

			<div class="film-info">
				<div class="film-header">
					<h3 class="film-title">{title}</h3>
					<span class="film-director">{film.director}</span>
				</div>

				<p class="film-description">{description}</p>

				<dl class="film-meta">
					{#if film.screening_datetime}
						<div class="meta-row">
							<dt><Calendar size={14} /></dt>
							<dd>{formatScreeningTime(film.screening_datetime, lang)}</dd>
						</div>
					{/if}
					{#if film.location_name}
						<div class="meta-row">
							<dt><MapPin size={14} /></dt>
							<dd>
								{#if film.location_google_maps_url}
									<a href={film.location_google_maps_url} target="_blank" rel="noopener noreferrer" class="location-link">
										<span class="location-name">{film.location_name}</span>
										{#if film.location_address}
											<span class="location-address">{film.location_address}</span>
										{/if}
									</a>
								{:else}
									<span class="location-name">{film.location_name}</span>
									{#if film.location_address}
										<span class="location-address">{film.location_address}</span>
									{/if}
								{/if}
							</dd>
						</div>
					{/if}
					{#if film.duration}
						<div class="meta-row">
							<dt><Clock size={14} /></dt>
							<dd>{film.duration} {strings.film.minutes}</dd>
						</div>
					{/if}
				</dl>
			</div>
		</li>
	{/each}
</ul>

<style>
	.film-list {
		display: flex;
		flex-direction: column;
	}

	.film-item {
		display: grid;
		grid-template-columns: 2rem 220px 1fr;
		gap: var(--space-lg);
		align-items: start;
		padding-block: var(--space-xl);
		border-bottom: 1px solid var(--color-gray-200);
	}

	.film-item.odd {
		background: var(--color-gray-100);
		margin-inline: calc(-1 * var(--content-padding));
		padding-inline: var(--content-padding);
	}

	.film-number {
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--color-gray-400);
		padding-top: var(--space-sm);
		font-variant-numeric: tabular-nums;
	}

	/* Poster */
	.poster-btn {
		position: relative;
		display: block;
		aspect-ratio: 2 / 3;
		overflow: hidden;
		background: var(--color-gray-200);
		cursor: pointer;
	}

	.poster-btn:disabled {
		cursor: default;
	}

	.poster {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-base);
		display: block;
	}

	.poster-btn:not(:disabled):hover .poster {
		transform: scale(1.04);
	}

	/* Play overlay — always visible when trailer exists */
	.play-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background var(--transition-base);
	}

	.poster-btn:not(:disabled):hover .play-overlay {
		background: rgba(0, 0, 0, 0.45);
	}

	.play-icon {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		color: var(--color-black);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform var(--transition-fast);
	}

	.poster-btn:not(:disabled):hover .play-icon {
		transform: scale(1.1);
	}

	/* Film info */
	.film-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.film-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.film-title {
		font-size: var(--text-xl);
		font-weight: 400;
		line-height: 1.2;
	}

	.film-director {
		font-size: var(--text-sm);
		color: var(--color-gray-500);
		letter-spacing: 0.02em;
		text-transform: uppercase;
		font-weight: 500;
	}

	.film-description {
		font-size: var(--text-base);
		line-height: 1.75;
		color: var(--color-gray-600);
		max-width: 65ch;
	}

	/* Meta */
	.film-meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.meta-row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-gray-600);
	}

	.meta-row dt {
		flex-shrink: 0;
		color: var(--color-gray-400);
	}

	.meta-row dd a {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.meta-row dd a:hover {
		color: var(--color-black);
	}

	.location-link {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.film-item {
			grid-template-columns: 1fr;
		}

		.film-number {
			display: none;
		}

		.poster-btn {
			max-width: 180px;
		}
	}

	@media (max-width: 1024px) and (min-width: 769px) {
		.film-item {
			grid-template-columns: 1.5rem 180px 1fr;
		}
	}
</style>
