<script lang="ts">
	import type { Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import LanguageSwitcher from '$lib/components/ui/LanguageSwitcher.svelte';
	import { page } from '$app/stores';

	interface Props {
		lang: Lang;
	}

	let { lang }: Props = $props();
	let strings = $derived(t(lang));

	function isActive(path: string): boolean {
		return $page.url.pathname === path;
	}
</script>

<header class="header">
	<div class="container header-inner">
		<a href="/{lang}/" class="logo">LDFF</a>

		<nav class="nav" aria-label="Main navigation">
			<a href="/{lang}/" class:active={isActive(`/${lang}/`) || isActive(`/${lang}`)}
				>{strings.nav.home}</a
			>
			<a href="/{lang}/archive" class:active={isActive(`/${lang}/archive`)}
				>{strings.nav.archive}</a
			>
		</nav>

		<LanguageSwitcher {lang} />
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--color-black);
	}

	/* Lithuanian flag tricolor stripe under header */
	.header::after {
		content: '';
		display: block;
		height: 3px;
		background: linear-gradient(
			to right,
			var(--color-flag-yellow) 33.33%,
			var(--color-flag-green) 33.33%,
			var(--color-flag-green) 66.66%,
			var(--color-flag-red) 66.66%
		);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
	}

	.logo {
		font-family: var(--font-heading);
		font-size: var(--text-lg);
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--color-white);
	}

	.nav {
		display: flex;
		gap: var(--space-lg);
		font-size: var(--text-sm);
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.nav a {
		color: rgba(255, 255, 255, 0.65);
		transition: color var(--transition-fast);
		padding-block: 4px;
		border-bottom: 2px solid transparent;
	}

	.nav a:hover {
		color: var(--color-white);
	}

	.nav a.active {
		color: var(--color-white);
		border-bottom-color: var(--color-flag-yellow);
	}

	/* override LanguageSwitcher colors inside dark header */
	:global(.header .lang-switch a) {
		color: rgba(255, 255, 255, 0.5);
	}
	:global(.header .lang-switch a.active) {
		color: var(--color-white);
	}
	:global(.header .lang-switch a:hover) {
		color: var(--color-accent);
	}
	:global(.header .lang-switch span) {
		color: rgba(255, 255, 255, 0.25);
	}
	:global(.header .lang-switch svg) {
		color: rgba(255, 255, 255, 0.4);
	}

	@media (max-width: 640px) {
		.nav {
			gap: var(--space-md);
		}
	}
</style>
