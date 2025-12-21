<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	// Import Web Components on client side only
	onMount(async () => {
		await import('@hidearea-design/core');
	});
</script>

<slot />
