<script lang="ts">
	import type { PageData } from './$types';
	import type { User } from './+page';

	let { data }: { data: PageData } = $props();

	function getRoleBadgeVariant(role: User['role']) {
		switch (role) {
			case 'admin':
				return 'error';
			case 'user':
				return 'primary';
			case 'guest':
				return 'secondary';
			default:
				return 'info';
		}
	}

	function getStatusBadgeVariant(status: User['status']) {
		return status === 'active' ? 'success' : 'warning';
	}
</script>

<svelte:head>
	<title>Load Function Demo - SvelteKit Example</title>
</svelte:head>

<div class="container">
	<header style="margin-bottom: var(--ha-spacing-8);">
		<a href="/">
			<ha-button variant="ghost">← Back to Home</ha-button>
		</a>
		<h1 style="font-size: var(--ha-font-size-3xl); font-weight: var(--ha-font-weight-bold); margin-top: var(--ha-spacing-4);">
			SvelteKit Load Function Demo
		</h1>
		<p style="color: var(--ha-color-text-secondary); margin-top: var(--ha-spacing-2);">
			Demonstrating server-side data loading with SvelteKit load functions
		</p>
	</header>

	<section class="section">
		<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--ha-spacing-4);">
			<h2 class="section-title" style="margin-bottom: 0;">Users</h2>
			<div style="font-size: var(--ha-font-size-sm); color: var(--ha-color-text-secondary);">
				Loaded at: {new Date(data.timestamp).toLocaleTimeString()}
			</div>
		</div>

		<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--ha-spacing-4);">
			{#each data.users as user (user.id)}
				<ha-card>
					<div slot="header">
						<h3 style="font-size: var(--ha-font-size-lg); font-weight: var(--ha-font-weight-semibold);">
							{user.name}
						</h3>
					</div>

					<div style="margin-bottom: var(--ha-spacing-3);">
						<p style="font-size: var(--ha-font-size-sm); color: var(--ha-color-text-secondary);">
							{user.email}
						</p>
					</div>

					<div style="display: flex; gap: var(--ha-spacing-2); align-items: center;">
						<ha-badge variant={getRoleBadgeVariant(user.role)}>
							{user.role}
						</ha-badge>
						<ha-badge variant={getStatusBadgeVariant(user.status)}>
							{user.status}
						</ha-badge>
					</div>

					<div slot="footer" class="card-footer">
						<ha-button variant="outline" size="small">View</ha-button>
						<ha-button variant="primary" size="small">Edit</ha-button>
					</div>
				</ha-card>
			{/each}
		</div>
	</section>

	<section class="section" style="margin-top: var(--ha-spacing-12);">
		<h2 class="section-title">How It Works</h2>
		<p style="margin-bottom: var(--ha-spacing-4); line-height: 1.6;">
			This page demonstrates SvelteKit's server-side data loading with load functions. The user data
			is fetched before the page is rendered, providing instant access to the data without
			client-side loading states.
		</p>

		<div style="background-color: var(--ha-color-background-secondary); padding: var(--ha-spacing-4); border-radius: var(--ha-border-radius-md);">
			<h3 style="font-size: var(--ha-font-size-lg); font-weight: var(--ha-font-weight-semibold); margin-bottom: var(--ha-spacing-3);">
				Key Benefits
			</h3>
			<ul style="line-height: 2; margin-left: var(--ha-spacing-6);">
				<li>Data loaded before rendering (universal or server-side)</li>
				<li>No loading spinners or skeleton screens needed</li>
				<li>Better SEO with server-rendered content</li>
				<li>Type-safe data with TypeScript and generated types</li>
				<li>Automatic revalidation on navigation</li>
				<li>Svelte 5 runes for reactive state ($props, $state, $derived)</li>
			</ul>
		</div>
	</section>
</div>
