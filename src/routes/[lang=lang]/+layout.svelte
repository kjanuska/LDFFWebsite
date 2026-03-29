<script lang="ts">
	import type { Lang } from '$lib/types';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { data, children } = $props();
	let lang = $derived(data.lang as Lang);
</script>

<Header {lang} />

<main>
	{@render children()}
</main>

<Footer />
