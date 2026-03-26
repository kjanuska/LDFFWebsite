<script lang="ts">
	import type { Film, Lang } from '$lib/types';
	import { getFilmTitle } from '$lib/utils/data';
	import Modal from '$lib/components/ui/Modal.svelte';
	import LazyVideo from '$lib/components/ui/LazyVideo.svelte';

	interface Props {
		film: Film | null;
		lang: Lang;
		open: boolean;
		onclose: () => void;
	}

	let { film, lang, open, onclose }: Props = $props();
</script>

<Modal {open} {onclose}>
	{#if film}
		{@const title = getFilmTitle(film, lang)}
		<div class="trailer-modal">
			<div class="trailer-header">
				<h2>{title}</h2>
				<p class="director">{film.director}</p>
			</div>
			{#if film.trailer_url}
				<LazyVideo url={film.trailer_url} {title} autoplay />
			{/if}
		</div>
	{/if}
</Modal>

<style>
	.trailer-modal {
		width: min(720px, 90vw);
	}

	.trailer-header {
		padding: var(--space-md) var(--space-lg) var(--space-sm);
	}

	h2 {
		font-size: var(--text-lg);
		font-weight: 400;
	}

	.director {
		font-size: var(--text-sm);
		color: var(--color-gray-500);
		margin-top: var(--space-xs);
	}
</style>
