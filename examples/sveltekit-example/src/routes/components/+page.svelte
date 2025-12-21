<script lang="ts">
	let textInput = $state('');
	let selectValue = $state('');
	let checked = $state(false);
</script>

<svelte:head>
	<title>Components - SvelteKit Example</title>
</svelte:head>

<div class="container">
	<header style="margin-bottom: var(--ha-spacing-8);">
		<a href="/">
			<ha-button variant="ghost">← Back to Home</ha-button>
		</a>
		<h1 style="font-size: var(--ha-font-size-3xl); font-weight: var(--ha-font-weight-bold); margin-top: var(--ha-spacing-4);">
			Component Showcase
		</h1>
	</header>

	<!-- Buttons -->
	<section class="section">
		<h2 class="section-title">Buttons</h2>
		<div class="button-group">
			<ha-button variant="primary">Primary</ha-button>
			<ha-button variant="secondary">Secondary</ha-button>
			<ha-button variant="danger">Danger</ha-button>
			<ha-button variant="outline">Outline</ha-button>
			<ha-button variant="ghost">Ghost</ha-button>
			<ha-button variant="primary" disabled>Disabled</ha-button>
		</div>
	</section>

	<!-- Alerts -->
	<section class="section">
		<h2 class="section-title">Alerts</h2>
		<div class="alert-group">
			<ha-alert variant="info">
				This is an informational alert message.
			</ha-alert>
			<ha-alert variant="success">
				Operation completed successfully!
			</ha-alert>
			<ha-alert variant="warning">
				Please review this warning message.
			</ha-alert>
			<ha-alert variant="error">
				An error occurred. Please try again.
			</ha-alert>
		</div>
	</section>

	<!-- Badges -->
	<section class="section">
		<h2 class="section-title">Badges</h2>
		<div class="badge-group">
			<ha-badge variant="primary">Primary</ha-badge>
			<ha-badge variant="secondary">Secondary</ha-badge>
			<ha-badge variant="success">Success</ha-badge>
			<ha-badge variant="warning">Warning</ha-badge>
			<ha-badge variant="error">Error</ha-badge>
			<ha-badge variant="info">Info</ha-badge>
		</div>
	</section>

	<!-- Form Elements -->
	<section class="section">
		<h2 class="section-title">Form Elements</h2>
		<div class="form-grid">
			<div>
				<label for="text-input">Text Input</label>
				<ha-input
					id="text-input"
					type="text"
					placeholder="Enter text..."
					value={textInput}
					oninput={(e: Event) => textInput = (e.target as HTMLInputElement).value}
				/>
			</div>
			<div>
				<label for="select-input">Select</label>
				<ha-select
					id="select-input"
					value={selectValue}
					onchange={(e: Event) => selectValue = (e.target as HTMLSelectElement).value}
				>
					<option value="">Choose an option</option>
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
				</ha-select>
			</div>
		</div>
		<div style="margin-top: var(--ha-spacing-4);">
			<label style="display: flex; align-items: center; gap: var(--ha-spacing-2); cursor: pointer;">
				<ha-checkbox
					checked={checked}
					onchange={(e: Event) => checked = (e.target as HTMLInputElement).checked}
				/>
				<span>I agree to the terms and conditions</span>
			</label>
		</div>
	</section>

	<!-- Cards -->
	<section class="section">
		<h2 class="section-title">Cards</h2>
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--ha-spacing-4);">
			<ha-card>
				<div slot="header">
					<h3 style="font-size: var(--ha-font-size-lg); font-weight: var(--ha-font-weight-semibold);">
						Card Title
					</h3>
				</div>
				<p style="margin-bottom: var(--ha-spacing-3);">
					This is a card component with a header and footer. Cards are useful for grouping related content.
				</p>
				<div slot="footer" class="card-footer">
					<ha-button variant="outline" size="small">Cancel</ha-button>
					<ha-button variant="primary" size="small">Confirm</ha-button>
				</div>
			</ha-card>

			<ha-card>
				<div slot="header">
					<h3 style="font-size: var(--ha-font-size-lg); font-weight: var(--ha-font-weight-semibold);">
						Another Card
					</h3>
				</div>
				<p>
					Cards can contain any content including text, images, buttons, and other components.
				</p>
			</ha-card>
		</div>
	</section>

	<!-- Tooltips -->
	<section class="section">
		<h2 class="section-title">Tooltips</h2>
		<div style="display: flex; gap: var(--ha-spacing-4); flex-wrap: wrap;">
			<ha-tooltip content="This is a tooltip on top">
				<ha-button variant="primary">Hover me (top)</ha-button>
			</ha-tooltip>
			<ha-tooltip content="This is a tooltip on the right" placement="right">
				<ha-button variant="secondary">Hover me (right)</ha-button>
			</ha-tooltip>
			<ha-tooltip content="This is a tooltip on the bottom" placement="bottom">
				<ha-button variant="outline">Hover me (bottom)</ha-button>
			</ha-tooltip>
			<ha-tooltip content="This is a tooltip on the left" placement="left">
				<ha-button variant="ghost">Hover me (left)</ha-button>
			</ha-tooltip>
		</div>
	</section>
</div>
