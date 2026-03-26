<script lang="ts">
	import type { GalleryImage, Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import { X, ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Props {
		images: GalleryImage[];
		currentIndex: number;
		lang: Lang;
		onclose: () => void;
		onnext: () => void;
		onprev: () => void;
	}

	let { images, currentIndex, lang, onclose, onnext, onprev }: Props = $props();
	let strings = $derived(t(lang));
	let currentImage = $derived(images[currentIndex]);

	let touchStartX: number | null = null;

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
		if (e.key === 'ArrowRight') onnext();
		if (e.key === 'ArrowLeft') onprev();
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		if (touchStartX === null) return;
		const diff = e.changedTouches[0].clientX - touchStartX;
		if (Math.abs(diff) > 50) {
			if (diff < 0) onnext();
			else onprev();
		}
		touchStartX = null;
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) onclose();
	}

	$effect(() => {
		document.body.classList.add('modal-open');
		return () => document.body.classList.remove('modal-open');
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions a11y_interactive_supports_focus a11y_click_events_have_key_events -->
<div
	class="lightbox"
	role="dialog"
	aria-modal="true"
	aria-label="{strings.gallery.photo} {currentIndex + 1} / {images.length}"
	onclick={handleBackdropClick}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
	tabindex="-1"
>
	<button class="lightbox-close" onclick={onclose} aria-label={strings.common.close}>
		<X size={24} />
	</button>

	<div class="lightbox-counter">
		{currentIndex + 1} / {images.length}
	</div>

	{#if currentIndex > 0}
		<button class="lightbox-nav lightbox-prev" onclick={onprev} aria-label={strings.common.previous}>
			<ChevronLeft size={32} />
		</button>
	{/if}

	{#if currentIndex < images.length - 1}
		<button class="lightbox-nav lightbox-next" onclick={onnext} aria-label={strings.common.next}>
			<ChevronRight size={32} />
		</button>
	{/if}

	<img
		src="/images/{currentImage.year}/gallery/{currentImage.filename}"
		alt="{strings.gallery.photo} {currentIndex + 1}"
		class="lightbox-image"
	/>
</div>

<style>
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: rgba(0, 0, 0, 0.95);
		display: grid;
		place-items: center;
		padding: var(--space-xl);
		animation: fadeIn 200ms ease;
	}

	.lightbox-image {
		max-width: 100%;
		max-height: 85vh;
		object-fit: contain;
	}

	.lightbox-close {
		position: absolute;
		top: var(--space-md);
		right: var(--space-md);
		color: var(--color-white);
		z-index: 1;
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
	}

	.lightbox-close:hover {
		opacity: 0.7;
	}

	.lightbox-counter {
		position: absolute;
		top: var(--space-md);
		left: 50%;
		transform: translateX(-50%);
		color: var(--color-white);
		font-size: var(--text-sm);
		opacity: 0.7;
	}

	.lightbox-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-white);
		width: 48px;
		height: 48px;
		display: grid;
		place-items: center;
		transition: opacity var(--transition-fast);
	}

	.lightbox-nav:hover {
		opacity: 0.7;
	}

	.lightbox-prev {
		left: var(--space-md);
	}

	.lightbox-next {
		right: var(--space-md);
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
