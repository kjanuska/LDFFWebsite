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
		max-width: 900px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		background: var(--color-white);
	}

	.modal-close {
		position: absolute;
		top: var(--space-md);
		right: var(--space-md);
		z-index: 1;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		color: var(--color-gray-600);
		transition: color var(--transition-fast);
	}

	.modal-close:hover {
		color: var(--color-black);
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
