<script lang="ts">
	import type { Lang } from '$lib/types';
	import { t } from '$lib/i18n';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import { formatDateRange } from '$lib/utils/data';
	import { ArrowRight } from 'lucide-svelte';

	let { data } = $props();
	let lang = $derived(data.lang as Lang);
	let strings = $derived(t(lang));
</script>

<div class="container">
	<Breadcrumb
		items={[
			{ label: strings.nav.home, href: `/${lang}/` },
			{ label: strings.archive.title, href: `/${lang}/archive` }
		]}
	/>

	<section class="section">
		<h1>{strings.archive.title}</h1>

		<div class="editions-list">
			{#each data.festivals as festival}
				<a href="/{lang}/{festival.year}" class="edition-card">
					<div class="edition-year">{festival.year}</div>
					<div class="edition-info">
						<p class="edition-tagline">
							{lang === 'en' ? festival.tagline_en : festival.tagline_lt}
						</p>
						<p class="edition-dates">
							{formatDateRange(festival.festival_start_date, festival.festival_end_date, lang)}
						</p>
					</div>
					<ArrowRight size={20} />
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	h1 {
		margin-bottom: var(--space-xl);
	}

	.editions-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.edition-card {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
		padding: var(--space-lg);
		border: 1px solid var(--color-gray-200);
		transition: all var(--transition-fast);
	}

	.edition-card:hover {
		border-color: var(--color-black);
	}

	.edition-year {
		font-family: var(--font-heading);
		font-size: var(--text-2xl);
		min-width: 120px;
	}

	.edition-info {
		flex: 1;
	}

	.edition-tagline {
		font-family: var(--font-heading);
		font-size: var(--text-lg);
		font-style: italic;
		margin-bottom: var(--space-xs);
	}

	.edition-dates {
		font-size: var(--text-sm);
		color: var(--color-gray-500);
	}

	@media (max-width: 640px) {
		.edition-card {
			flex-wrap: wrap;
		}

		.edition-year {
			min-width: auto;
		}
	}
</style>
