<script lang="ts">
	import type { Lang } from '$lib/types';
	import { page } from '$app/stores';
	import { Globe } from 'lucide-svelte';

	interface Props {
		lang: Lang;
	}

	let { lang }: Props = $props();

	let enPath = $derived($page.url.pathname.replace(`/${lang}`, '/en'));
	let ltPath = $derived($page.url.pathname.replace(`/${lang}`, '/lt'));
</script>

<nav class="lang-switch" aria-label="Language">
	<Globe size={14} />
	<a href={enPath} class:active={lang === 'en'} aria-current={lang === 'en' ? 'page' : undefined}>EN</a>
	<span aria-hidden="true">/</span>
	<a href={ltPath} class:active={lang === 'lt'} aria-current={lang === 'lt' ? 'page' : undefined}>LT</a>
</nav>

<style>
	.lang-switch {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		font-weight: 500;
		letter-spacing: 0.05em;
	}

	a {
		padding: 2px 4px;
		transition: color var(--transition-fast);
	}

	a:hover {
		color: var(--color-flag-yellow);
	}

	.active {
		color: var(--color-black);
	}

	a:not(.active) {
		color: var(--color-gray-400);
	}

	span {
		color: var(--color-gray-300);
	}
</style>
