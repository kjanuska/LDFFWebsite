<script lang="ts">
	import { Instagram, Facebook, Youtube } from 'lucide-svelte';
</script>

<footer class="footer">
	<div class="container footer-inner">
		<div class="footer-brand">
			<span class="footer-logo">LDFF</span>
			<p class="footer-copy">&copy; {new Date().getFullYear()} Lithuanian Documentary Film Festival</p>
		</div>

		<div class="footer-social">
			<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
				<Instagram size={20} />
			</a>
			<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
				<Facebook size={20} />
			</a>
			<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
				<Youtube size={20} />
			</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--color-black);
		color: var(--color-white);
		padding-block: var(--space-xl);
		margin-top: 0;
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-md);
	}

	.footer-logo {
		font-family: var(--font-heading);
		font-weight: 700;
		letter-spacing: 0.1em;
		font-size: var(--text-lg);
	}

	.footer-copy {
		font-size: var(--text-xs);
		color: rgba(255, 255, 255, 0.4);
		margin-top: var(--space-xs);
	}

	.footer-social {
		display: flex;
		gap: var(--space-md);
	}

	.footer-social a {
		color: rgba(255, 255, 255, 0.5);
		transition: color var(--transition-fast);
	}

	.footer-social a:hover {
		color: var(--color-white);
	}
</style>
