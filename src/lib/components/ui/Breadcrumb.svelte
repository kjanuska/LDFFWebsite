<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';

	interface BreadcrumbItem {
		label: string;
		href: string;
	}

	interface Props {
		items: BreadcrumbItem[];
	}

	let { items }: Props = $props();
</script>

<nav class="breadcrumb" aria-label="Breadcrumb">
	<ol>
		{#each items as item, i}
			<li>
				{#if i < items.length - 1}
					<a href={item.href}>{item.label}</a>
					<ChevronRight size={14} />
				{:else}
					<span aria-current="page">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumb ol {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-gray-500);
	}

	li {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	a {
		transition: color var(--transition-fast);
	}

	a:hover {
		color: var(--color-black);
	}

	span[aria-current='page'] {
		color: var(--color-black);
	}
</style>
