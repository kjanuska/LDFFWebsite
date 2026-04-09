<script lang="ts">
	import type { Sponsor, Lang } from '$lib/types';
	import { t } from '$lib/i18n';

	interface Props {
		sponsors: Sponsor[];
		lang: Lang;
	}

	let { sponsors, lang }: Props = $props();
	let strings = $derived(t(lang));
</script>

{#if sponsors.length > 0}
	<section class="sponsors">
		<h2>{strings.sponsors.title}</h2>
		<div class="sponsor-grid">
			{#each sponsors as sponsor}
				<div class="sponsor-item" title={sponsor.sponsor_name}>
					<img
						src="/images/sponsors/{sponsor.logo_filename}"
						alt={sponsor.sponsor_name}
						loading="lazy"
						decoding="async"
						class="sponsor-logo"
					/>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.sponsors {
		background: rgb(255, 255, 255);
		padding-inline: var(--content-padding);
		padding-block: var(--space-xl);
		margin-top: var(--space-xl);
		border-top: 1px solid var(--color-gray-200);
	}

	h2 {
		margin-bottom: var(--space-lg);
		text-align: center;
		font-size: var(--text-sm);
		font-family: var(--font-body);
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-gray-500);
	}

	.sponsor-grid {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--space-md);
		max-width: 1200px;
		margin: 0 auto;
	}

	.sponsor-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100px;
		height: 56px;
		flex-shrink: 0;
	}

	.sponsor-logo {
		max-height: 44px;
		max-width: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
		transition: all var(--transition-base);
	}

	@media (min-width: 640px) {
		.sponsor-item {
			width: 160px;
			height: 80px;
		}

		.sponsor-logo {
			max-height: 64px;
		}
	}

	@media (min-width: 1024px) {
		.sponsor-logo {
			max-height: 72px;
		}
	}
</style>
