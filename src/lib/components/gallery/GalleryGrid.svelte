<script lang="ts">
	import type { GalleryImage, Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import Lightbox from './Lightbox.svelte';

	interface Props {
		images: GalleryImage[];
		lang: Lang;
	}

	let { images, lang }: Props = $props();
	let strings = $derived(t(lang));
	let selectedIndex: number | null = $state(null);
</script>

{#if images.length > 0}
	<section class="gallery section">
		<h2>{strings.gallery.title}</h2>

		<div class="gallery-grid">
			{#each images as image, i}
				<button
					class="gallery-item"
					onclick={() => (selectedIndex = i)}
					aria-label="{strings.gallery.photo} {i + 1}"
				>
					<img
						src="/images/{image.year}/gallery/{image.filename}"
						alt="{strings.gallery.photo} {i + 1}"
						loading="lazy"
						decoding="async"
					/>
				</button>
			{/each}
		</div>

		{#if selectedIndex !== null}
			<Lightbox
				{images}
				currentIndex={selectedIndex}
				{lang}
				onclose={() => (selectedIndex = null)}
				onnext={() => {
					if (selectedIndex !== null && selectedIndex < images.length - 1) selectedIndex++;
				}}
				onprev={() => {
					if (selectedIndex !== null && selectedIndex > 0) selectedIndex--;
				}}
			/>
		{/if}
	</section>
{/if}

<style>
	h2 {
		margin-bottom: var(--space-lg);
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-sm);
	}

	@media (min-width: 640px) {
		.gallery-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--space-md);
		}
	}

	@media (min-width: 1024px) {
		.gallery-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.gallery-item {
		aspect-ratio: 4 / 3;
		overflow: hidden;
		cursor: pointer;
	}

	.gallery-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-base);
	}

	.gallery-item:hover img {
		transform: scale(1.05);
	}
</style>
