import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@hidearea-design/core', '@hidearea-design/tokens']
	},
	optimizeDeps: {
		include: ['@hidearea-design/core', '@hidearea-design/tokens']
	}
});
