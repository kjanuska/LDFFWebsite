<script lang="ts">
	import type { Film, Lang } from '$lib/types';
	import FilmCard from './FilmCard.svelte';

	interface Props {
		films: Film[];
		lang: Lang;
		onfilmclick?: (film: Film) => void;
	}

	let { films, lang, onfilmclick }: Props = $props();
</script>

<div class="film-grid">
	{#each films as film (film.slug)}
		<FilmCard {film} {lang} {onfilmclick} />
	{/each}
</div>

<style>
	.film-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: var(--space-lg);
	}

	@media (min-width: 640px) {
		.film-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.film-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--space-xl);
		}
	}
</style>
