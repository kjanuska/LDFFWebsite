<script lang="ts">
	import type { Film, Lang } from '$lib/types';
	import { getFilmTitle } from '$lib/utils/data';

	interface Props {
		film: Film;
		lang: Lang;
		onfilmclick?: (film: Film) => void;
	}

	let { film, lang, onfilmclick }: Props = $props();
	let title = $derived(getFilmTitle(film, lang));

	function handleClick(e: MouseEvent) {
		if (onfilmclick) {
			e.preventDefault();
			onfilmclick(film);
		}
	}
</script>

<a
	href="/{lang}/{film.year}/{film.slug}"
	class="film-card"
	onclick={handleClick}
>
	<div class="poster-wrapper">
		<img
			src="/images/{film.year}/posters/{film.poster_filename}"
			alt={title}
			loading="lazy"
			decoding="async"
			class="poster"
		/>
		<div class="overlay">
			<span class="director">{film.director}</span>
		</div>
	</div>
	<h3 class="film-title">{title}</h3>
</a>

<style>
	.film-card {
		display: block;
		text-decoration: none;
	}

	.poster-wrapper {
		position: relative;
		aspect-ratio: 2 / 3;
		overflow: hidden;
		background: var(--color-gray-100);
	}

	.poster {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-base);
	}

	.film-card:hover .poster {
		transform: scale(1.03);
	}

	.overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
		display: flex;
		align-items: flex-end;
		padding: var(--space-md);
		opacity: 0;
		transition: opacity var(--transition-base);
	}

	.film-card:hover .overlay {
		opacity: 1;
	}

	.director {
		color: var(--color-white);
		font-size: var(--text-sm);
	}

	.film-title {
		margin-top: var(--space-sm);
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 500;
		line-height: 1.3;
	}
</style>
