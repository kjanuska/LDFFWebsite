<script lang="ts">
	import type { Festival, Lang } from '$lib/types';
	import { getFestivalTagline, getFestivalDescription, formatDateRange } from '$lib/utils/data';

	interface Props {
		festival: Festival;
		lang: Lang;
		showYear?: boolean;
	}

	let { festival, lang, showYear = true }: Props = $props();
	let tagline = $derived(getFestivalTagline(festival, lang));
	let description = $derived(getFestivalDescription(festival, lang));
	let dateRange = $derived(
		formatDateRange(festival.festival_start_date, festival.festival_end_date, lang)
	);
</script>

<section class="hero">
	<div class="container hero-inner">
		<img src="/logo.svg" alt="LDFF" class="hero-logo" />
		{#if showYear}
			<div class="hero-badge">{festival.year}</div>
		{/if}
		<h1 class="hero-title">LDFF</h1>
		<p class="hero-tagline">{tagline}</p>
		<p class="hero-dates">{dateRange}</p>
		<p class="hero-description">{description}</p>
	</div>
</section>

<style>
	.hero {
		padding-block: var(--space-2xl);
		text-align: center;
		background: var(--color-black);
		color: var(--color-white);
	}

	.hero-inner {
		max-width: 800px;
	}

	.hero-logo {
		width: clamp(80px, 15vw, 160px);
		height: auto;
		margin-inline: auto;
		margin-bottom: var(--space-lg);
		filter: invert(1) brightness(2);
	}

	.hero-badge {
		display: inline-block;
		font-size: var(--text-sm);
		font-weight: 700;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		border: 1px solid var(--color-flag-yellow);
		color: var(--color-flag-yellow);
		padding: 4px 16px;
		margin-bottom: var(--space-lg);
	}

	.hero-title {
		font-size: var(--text-3xl);
		letter-spacing: 0.05em;
		margin-bottom: var(--space-md);
		color: var(--color-white);
	}

	.hero-tagline {
		font-family: var(--font-heading);
		font-size: var(--text-xl);
		font-style: italic;
		color: rgba(255, 255, 255, 0.75);
		margin-bottom: var(--space-md);
	}

	.hero-dates {
		font-size: var(--text-lg);
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: var(--space-lg);
		letter-spacing: 0.05em;
	}

	.hero-description {
		font-size: var(--text-base);
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.8;
		max-width: 60ch;
		margin-inline: auto;
	}
</style>
