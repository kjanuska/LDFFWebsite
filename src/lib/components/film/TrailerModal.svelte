<script lang="ts">
	import type { Film, Lang } from '$lib/types';
	import { getFilmTitle, getTrailerUrl } from '$lib/utils/data';
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
		{@const trailerUrl = getTrailerUrl(film, lang)}
		{#if trailerUrl}
			<LazyVideo url={trailerUrl} {title} autoplay />
		{/if}
	{/if}
</Modal>

