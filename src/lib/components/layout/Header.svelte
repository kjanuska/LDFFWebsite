<script lang="ts">
	import type { Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import LanguageSwitcher from '$lib/components/ui/LanguageSwitcher.svelte';
	import { getAllFestivals } from '$lib/utils/data';
	import { page } from '$app/stores';

	interface Props {
		lang: Lang;
	}

	let { lang }: Props = $props();
	let strings = $derived(t(lang));
	let years = $derived(getAllFestivals().map(f => f.year));

	function isActive(path: string): boolean {
		return $page.url.pathname === path;
	}

	function isArchiveActive(): boolean {
		return $page.url.pathname.startsWith(`/${lang}/archive`) ||
			/^\/(?:en|lt)\/\d{4}/.test($page.url.pathname);
	}
</script>

<header class="header">
	<div class="container header-inner">
		<a href="/{lang}/" class="logo">LDFF</a>

		<nav class="nav" aria-label="Main navigation">
			<a href="/{lang}/" class:active={isActive(`/${lang}/`) || isActive(`/${lang}`)}
				>{strings.nav.home}</a
			>
			<div class="dropdown-wrap">
				<a href="/{lang}/archive" class:active={isArchiveActive()}
					>{strings.nav.archive}</a
				>
				<div class="dropdown">
					{#each years as year}
						<a href="/{lang}/{year}" class:active={isActive(`/${lang}/${year}`)}>{year}</a>
					{/each}
				</div>
			</div>
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

	/* Dropdown */
	.dropdown-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		left: 50%;
		translate: -50% 0;
		padding-top: 12px;
		background: transparent;
		min-width: 100px;
		display: flex;
		flex-direction: column;
		opacity: 0;
		pointer-events: none;
		transition: opacity 150ms ease;
	}

	.dropdown-wrap:hover .dropdown {
		opacity: 1;
		pointer-events: auto;
	}

	.dropdown::before {
		content: '';
		position: absolute;
		inset: 12px 0 0;
		background: var(--color-black);
		border: 1px solid rgba(255, 255, 255, 0.12);
		z-index: -1;
	}

	.dropdown a {
		padding: 8px 16px;
		border-bottom: none;
		text-align: center;
		letter-spacing: 0.05em;
	}

	.dropdown a:hover,
	.dropdown a.active {
		background: rgba(255, 255, 255, 0.08);
		color: var(--color-white);
	}

	.dropdown a.active {
		border-bottom: none;
	}

	/* override LanguageSwitcher colors inside dark header */
	:global(.header .lang-switch button) {
		color: rgba(255, 255, 255, 0.5);
	}
	:global(.header .lang-switch button.active) {
		color: var(--color-white);
	}
	:global(.header .lang-switch button:hover) {
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
