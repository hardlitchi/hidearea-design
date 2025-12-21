<script lang="ts">
	let count = $state(0);
</script>

<svelte:head>
	<title>Hidearea Design System - SvelteKit Example</title>
	<meta name="description" content="Example integration of Hidearea Design System with SvelteKit" />
</svelte:head>

<div class="container">
	<header style="text-align: center; margin-bottom: var(--ha-spacing-8);">
		<h1 style="font-size: var(--ha-font-size-4xl); font-weight: var(--ha-font-weight-bold); margin-bottom: var(--ha-spacing-2);">
			Hidearea Design System
		</h1>
		<p style="font-size: var(--ha-font-size-lg); color: var(--ha-color-text-secondary);">
			SvelteKit Integration Example
		</p>
	</header>

	<section class="section">
		<h2 class="section-title">Welcome</h2>
		<p style="margin-bottom: var(--ha-spacing-4); line-height: 1.6;">
			This example demonstrates how to integrate the Hidearea Design System into a SvelteKit application.
			The design system provides a comprehensive set of components and design tokens for building
			modern web applications.
		</p>

		<div style="margin-bottom: var(--ha-spacing-6);">
			<h3 style="font-size: var(--ha-font-size-xl); font-weight: var(--ha-font-weight-semibold); margin-bottom: var(--ha-spacing-3);">
				Interactive Counter
			</h3>
			<div style="display: flex; align-items: center; gap: var(--ha-spacing-4);">
				<ha-button variant="primary" onclick={() => count++}>Increment</ha-button>
				<ha-button variant="secondary" onclick={() => count--}>Decrement</ha-button>
				<ha-button variant="outline" onclick={() => count = 0}>Reset</ha-button>
				<span style="font-size: var(--ha-font-size-2xl); font-weight: var(--ha-font-weight-bold);">
					Count: {count}
				</span>
			</div>
		</div>
	</section>

	<section class="section">
		<h2 class="section-title">Explore Examples</h2>
		<div class="button-group">
			<a href="/components">
				<ha-button variant="primary">Component Showcase</ha-button>
			</a>
			<a href="/forms">
				<ha-button variant="secondary">Form Examples</ha-button>
			</a>
			<a href="/load-demo">
				<ha-button variant="outline">Load Function Demo</ha-button>
			</a>
		</div>
	</section>

	<section class="section">
		<h2 class="section-title">Features</h2>
		<ul style="line-height: 2; margin-left: var(--ha-spacing-6);">
			<li>Modern Web Components built with Lit</li>
			<li>Svelte 5 runes for reactive state management</li>
			<li>Comprehensive design token system</li>
			<li>TypeScript support with full type definitions</li>
			<li>SvelteKit-optimized configuration</li>
			<li>Server-side rendering compatible</li>
		</ul>
	</section>
</div>
