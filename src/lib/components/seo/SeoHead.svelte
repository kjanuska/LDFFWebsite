<script lang="ts">
	import type { Lang } from '$lib/types';
	import { BASE_URL } from '$lib/utils/seo';
	import { page } from '$app/stores';

	interface Props {
		title: string;
		description: string;
		ogImage?: string;
		lang: Lang;
		type?: string;
	}

	let { title, description, ogImage = '/favicon.svg', lang, type = 'website' }: Props = $props();

	let pathWithoutLang = $derived(
		$page.url.pathname.replace(/^\/(en|lt)/, '') || '/'
	);
	let canonicalPath = $derived($page.url.pathname);
	let fullTitle = $derived(`${title} | LDFF`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{BASE_URL}{ogImage}" />
	<meta property="og:type" content={type} />
	<meta property="og:url" content="{BASE_URL}{canonicalPath}" />
	<meta property="og:site_name" content="LDFF" />
	<meta property="og:locale" content={lang === 'en' ? 'en_GB' : 'lt_LT'} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{BASE_URL}{ogImage}" />

	<!-- Canonical & Hreflang -->
	<link rel="canonical" href="{BASE_URL}{canonicalPath}" />
	<link rel="alternate" hreflang="en" href="{BASE_URL}/en{pathWithoutLang}" />
	<link rel="alternate" hreflang="lt" href="{BASE_URL}/lt{pathWithoutLang}" />
	<link rel="alternate" hreflang="x-default" href="{BASE_URL}/en{pathWithoutLang}" />
</svelte:head>
