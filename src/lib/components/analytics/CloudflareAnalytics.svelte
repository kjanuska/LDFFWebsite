<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	// Only load analytics in the browser (not during SSR)
	onMount(() => {
		if (browser && typeof window !== 'undefined') {
			// Load Cloudflare Web Analytics
			const script = document.createElement('script');
			script.defer = true;
			script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
			script.setAttribute('data-cf-beacon', '{"token": "your-beacon-token"}');
			document.head.appendChild(script);
		}
	});
</script>