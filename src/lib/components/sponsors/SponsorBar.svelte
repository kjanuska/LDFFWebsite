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
				<a
					href={sponsor.url}
					target="_blank"
					rel="noopener noreferrer"
					class="sponsor-link"
					title={sponsor.sponsor_name}
				>
					<img
						src="/images/sponsors/{sponsor.logo_filename}"
						alt={sponsor.sponsor_name}
						loading="lazy"
						decoding="async"
						class="sponsor-logo"
					/>
				</a>
			{/each}
		</div>
	</section>
{/if}

<style>
	.sponsors {
		background: var(--color-gray-100);
		margin-inline: calc(-1 * var(--content-padding));
		padding-inline: var(--content-padding);
		padding-block: var(--space-xl);
		margin-top: var(--space-xl);
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
		gap: var(--space-xl);
	}

	.sponsor-link {
		display: block;
	}

	.sponsor-logo {
		height: 48px;
		width: auto;
		filter: grayscale(100%);
		opacity: 0.5;
		transition: all var(--transition-base);
	}

	.sponsor-link:hover .sponsor-logo {
		filter: grayscale(0%);
		opacity: 1;
	}

	@media (min-width: 640px) {
		.sponsor-logo {
			height: 56px;
		}
	}
</style>
