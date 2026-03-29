<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		onclose: () => void;
		children: Snippet;
	}

	let { open, onclose, children }: Props = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) onclose();
	}

	$effect(() => {
		if (open) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => document.body.classList.remove('modal-open');
	});
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
	<!-- svelte-ignore a11y_no_static_element_interactions a11y_interactive_supports_focus a11y_click_events_have_key_events -->
	<div class="modal-backdrop" onclick={handleBackdropClick} role="dialog" aria-modal="true" tabindex="-1">
		<div class="modal-content">
			<button class="modal-close" onclick={onclose} aria-label="Close">
				<X size={24} />
			</button>
			{@render children()}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.88);
		display: grid;
		place-items: center;
		padding: var(--content-padding);
		animation: fadeIn 200ms ease;
	}

	.modal-content {
		position: relative;
		max-width: min(1200px, 95vw);
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
		background: transparent;
		border-radius: 8px;
	}

	.modal-close {
		position: absolute;
		top: 16px;
		right: 16px;
		z-index: 10;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		border-radius: 50%;
		color: var(--color-white);
		transition: all var(--transition-fast);
	}

	.modal-close:hover {
		background: rgba(0, 0, 0, 0.8);
		transform: scale(1.05);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
