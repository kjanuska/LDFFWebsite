<script lang="ts">
	import type { Film, Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import { getFilmTitle, getFilmDescription } from '$lib/utils/data';
	import Modal from '$lib/components/ui/Modal.svelte';
	import LazyVideo from '$lib/components/ui/LazyVideo.svelte';
	import { Calendar, MapPin, ExternalLink } from 'lucide-svelte';
	import { formatScreeningTime } from '$lib/utils/data';

	interface Props {
		film: Film | null;
		lang: Lang;
		open: boolean;
		onclose: () => void;
	}

	let { film, lang, open, onclose }: Props = $props();
	let strings = $derived(t(lang));
</script>

<Modal {open} {onclose}>
	{#if film}
		{@const title = getFilmTitle(film, lang)}
		{@const description = getFilmDescription(film, lang)}

		<div class="film-modal">
			{#if film.trailer_url}
				<LazyVideo url={film.trailer_url} {title} />
			{/if}

			<div class="film-modal-body">
				<h2>{title}</h2>
				<p class="director">{film.director}</p>
				<p class="description">{description}</p>

				<div class="meta">
					{#if film.screening_datetime}
						<div class="meta-item">
							<Calendar size={16} />
							<span>{formatScreeningTime(film.screening_datetime, lang)}</span>
						</div>
					{/if}
					{#if film.location_name}
						<div class="meta-item">
							<MapPin size={16} />
							{#if film.location_google_maps_url}
								<a href={film.location_google_maps_url} target="_blank" rel="noopener noreferrer">
									{film.location_name}
								</a>
							{:else}
								<span>{film.location_name}</span>
							{/if}
						</div>
					{/if}
				</div>

				<div class="actions">
					{#if film.ticket_url}
						<a href={film.ticket_url} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
							<ExternalLink size={16} />
							{strings.film.tickets}
						</a>
					{/if}
					<a href="/{lang}/{film.year}/{film.slug}" class="btn btn-secondary" onclick={onclose}>
						{strings.film.viewDetails}
					</a>
				</div>
			</div>
		</div>
	{/if}
</Modal>

<style>
	.film-modal-body {
		padding: var(--space-lg);
	}

	h2 {
		font-size: var(--text-xl);
		margin-bottom: var(--space-xs);
	}

	.director {
		font-size: var(--text-sm);
		color: var(--color-gray-500);
		margin-bottom: var(--space-md);
	}

	.description {
		line-height: 1.7;
		color: var(--color-gray-800);
		margin-bottom: var(--space-lg);
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-bottom: var(--space-lg);
		font-size: var(--text-sm);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-gray-600);
	}

	.meta-item a {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.meta-item a:hover {
		color: var(--color-black);
	}

	.actions {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		padding: 10px 20px;
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

	.btn-secondary {
		border: 1px solid var(--color-gray-300);
		color: var(--color-black);
	}

	.btn-secondary:hover {
		border-color: var(--color-black);
	}
</style>
