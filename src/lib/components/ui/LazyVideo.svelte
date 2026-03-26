<script lang="ts">
	import { Play } from 'lucide-svelte';

	interface Props {
		url: string;
		title: string;
		autoplay?: boolean;
	}

	let { url, title, autoplay = false }: Props = $props();
	let loaded = $state(autoplay);

	let embedUrl = $derived(getEmbedUrl(url));

	function getEmbedUrl(rawUrl: string): string {
		// YouTube
		const ytMatch = rawUrl.match(
			/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
		);
		if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1`;

		// Vimeo
		const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/);
		if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

		return rawUrl;
	}

	function getThumbnailUrl(rawUrl: string): string | null {
		const ytMatch = rawUrl.match(
			/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
		);
		if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
		return null;
	}

	let thumbnailUrl = $derived(getThumbnailUrl(url));
</script>

<div class="video-container">
	{#if loaded && embedUrl}
		<iframe
			src={embedUrl}
			{title}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	{:else}
		<button class="video-placeholder" onclick={() => (loaded = true)} aria-label="Play {title}">
			{#if thumbnailUrl}
				<img src={thumbnailUrl} alt="" loading="lazy" class="video-thumbnail" />
			{/if}
			<div class="play-button">
				<Play size={48} />
			</div>
		</button>
	{/if}
</div>

<style>
	.video-container {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: var(--color-black);
	}

	iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: none;
	}

	.video-placeholder {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		overflow: hidden;
	}

	.video-thumbnail {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.play-button {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		width: 80px;
		height: 80px;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 50%;
		color: var(--color-black);
		transition: transform var(--transition-fast);
	}

	.video-placeholder:hover .play-button {
		transform: scale(1.1);
	}
</style>
