<script lang="ts">
	import type { Lang } from '$lib/types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Globe } from 'lucide-svelte';

	interface Props {
		lang: Lang;
	}

	let { lang }: Props = $props();

	let enPath = $derived($page.url.pathname.replace(`/${lang}`, '/en'));
	let ltPath = $derived($page.url.pathname.replace(`/${lang}`, '/lt'));

	function switchLanguage(newLang: Lang) {
		const newPath = newLang === 'en' ? enPath : ltPath;
		goto(newPath, { noScroll: true });
	}
</script>

<nav class="lang-switch" aria-label="Language">
	<Globe size={14} />
	<button
		onclick={() => switchLanguage('en')}
		class:active={lang === 'en'}
		aria-current={lang === 'en' ? 'page' : undefined}
		aria-label="Switch to English"
	>
		EN
	</button>
	<span aria-hidden="true">/</span>
	<button
		onclick={() => switchLanguage('lt')}
		class:active={lang === 'lt'}
		aria-current={lang === 'lt' ? 'page' : undefined}
		aria-label="Switch to Lithuanian"
	>
		LT
	</button>
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

	button {
		background: none;
		border: none;
		padding: 2px 4px;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		letter-spacing: inherit;
		transition: color var(--transition-fast);
	}

	button:hover {
		color: var(--color-flag-yellow);
	}

	.active {
		color: var(--color-black);
	}

	button:not(.active) {
		color: var(--color-gray-400);
	}

	span {
		color: var(--color-gray-300);
	}
</style>
