import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: true,
			strict: true
		}),
		prerender: {
			entries: ['/', '/en/', '/lt/', '/en/archive', '/lt/archive'],
			handleHttpError: ({ path, message }) => {
				// Ignore missing images during prerender (they may not exist yet)
				if (path.startsWith('/images/')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
