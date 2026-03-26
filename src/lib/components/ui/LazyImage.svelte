<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		width?: number;
		height?: number;
		class?: string;
	}

	let { src, alt, width, height, class: className = '' }: Props = $props();
</script>

<img {src} {alt} {width} {height} loading="lazy" decoding="async" class={className} />
