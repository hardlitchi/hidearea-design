<script lang="ts">
	interface FormData {
		name: string;
		email: string;
		country: string;
		message: string;
		newsletter: boolean;
		plan: string;
	}

	interface FormErrors {
		name?: string;
		email?: string;
		country?: string;
		message?: string;
	}

	let formData = $state<FormData>({
		name: '',
		email: '',
		country: '',
		message: '',
		newsletter: false,
		plan: 'basic'
	});

	let errors = $state<FormErrors>({});
	let submitted = $state(false);

	function validateForm(): boolean {
		const newErrors: FormErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
		} else if (formData.name.trim().length < 2) {
			newErrors.name = 'Name must be at least 2 characters';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		if (!formData.country) {
			newErrors.country = 'Please select a country';
		}

		if (!formData.message.trim()) {
			newErrors.message = 'Message is required';
		} else if (formData.message.trim().length < 10) {
			newErrors.message = 'Message must be at least 10 characters';
		}

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitted = false;

		if (validateForm()) {
			console.log('Form submitted:', formData);
			submitted = true;

			// Reset form after successful submission
			setTimeout(() => {
				formData = {
					name: '',
					email: '',
					country: '',
					message: '',
					newsletter: false,
					plan: 'basic'
				};
				submitted = false;
			}, 3000);
		}
	}

	function handleReset() {
		formData = {
			name: '',
			email: '',
			country: '',
			message: '',
			newsletter: false,
			plan: 'basic'
		};
		errors = {};
		submitted = false;
	}
</script>

<svelte:head>
	<title>Forms - SvelteKit Example</title>
</svelte:head>

<div class="container">
	<header style="margin-bottom: var(--ha-spacing-8);">
		<a href="/">
			<ha-button variant="ghost">← Back to Home</ha-button>
		</a>
		<h1 style="font-size: var(--ha-font-size-3xl); font-weight: var(--ha-font-weight-bold); margin-top: var(--ha-spacing-4);">
			Form Examples
		</h1>
		<p style="color: var(--ha-color-text-secondary); margin-top: var(--ha-spacing-2);">
			Demonstrating form validation and state management with Svelte 5 runes
		</p>
	</header>

	{#if submitted}
		<ha-alert variant="success" style="margin-bottom: var(--ha-spacing-6);">
			Form submitted successfully! Check the console for the submitted data.
		</ha-alert>
	{/if}

	<form onsubmit={handleSubmit}>
		<section class="section">
			<h2 class="section-title">Contact Form</h2>

			<div class="form-grid">
				<div>
					<label for="name">
						Name <span style="color: var(--ha-color-error);">*</span>
					</label>
					<ha-input
						id="name"
						type="text"
						placeholder="John Doe"
						value={formData.name}
						invalid={!!errors.name}
						oninput={(e: Event) => formData.name = (e.target as HTMLInputElement).value}
					/>
					{#if errors.name}
						<span style="color: var(--ha-color-error); font-size: var(--ha-font-size-sm); margin-top: var(--ha-spacing-1); display: block;">
							{errors.name}
						</span>
					{/if}
				</div>

				<div>
					<label for="email">
						Email <span style="color: var(--ha-color-error);">*</span>
					</label>
					<ha-input
						id="email"
						type="email"
						placeholder="john@example.com"
						value={formData.email}
						invalid={!!errors.email}
						oninput={(e: Event) => formData.email = (e.target as HTMLInputElement).value}
					/>
					{#if errors.email}
						<span style="color: var(--ha-color-error); font-size: var(--ha-font-size-sm); margin-top: var(--ha-spacing-1); display: block;">
							{errors.email}
						</span>
					{/if}
				</div>

				<div>
					<label for="country">
						Country <span style="color: var(--ha-color-error);">*</span>
					</label>
					<ha-select
						id="country"
						value={formData.country}
						invalid={!!errors.country}
						onchange={(e: Event) => formData.country = (e.target as HTMLSelectElement).value}
					>
						<option value="">Select a country</option>
						<option value="us">United States</option>
						<option value="uk">United Kingdom</option>
						<option value="ca">Canada</option>
						<option value="au">Australia</option>
						<option value="jp">Japan</option>
					</ha-select>
					{#if errors.country}
						<span style="color: var(--ha-color-error); font-size: var(--ha-font-size-sm); margin-top: var(--ha-spacing-1); display: block;">
							{errors.country}
						</span>
					{/if}
				</div>

				<div>
					<label for="plan">Plan</label>
					<ha-select
						id="plan"
						value={formData.plan}
						onchange={(e: Event) => formData.plan = (e.target as HTMLSelectElement).value}
					>
						<option value="basic">Basic</option>
						<option value="pro">Professional</option>
						<option value="enterprise">Enterprise</option>
					</ha-select>
				</div>
			</div>

			<div style="margin-top: var(--ha-spacing-4);">
				<label for="message">
					Message <span style="color: var(--ha-color-error);">*</span>
				</label>
				<textarea
					id="message"
					placeholder="Tell us about your project..."
					bind:value={formData.message}
					style="
						width: 100%;
						min-height: 120px;
						padding: var(--ha-spacing-3);
						font-family: var(--ha-font-family-base);
						font-size: var(--ha-font-size-base);
						border: 1px solid {errors.message ? 'var(--ha-color-error)' : 'var(--ha-color-border-primary)'};
						border-radius: var(--ha-border-radius-md);
						background-color: var(--ha-color-background-primary);
						color: var(--ha-color-text-primary);
						resize: vertical;
					"
				/>
				{#if errors.message}
					<span style="color: var(--ha-color-error); font-size: var(--ha-font-size-sm); margin-top: var(--ha-spacing-1); display: block;">
						{errors.message}
					</span>
				{/if}
			</div>

			<div style="margin-top: var(--ha-spacing-4);">
				<label style="display: flex; align-items: center; gap: var(--ha-spacing-2); cursor: pointer;">
					<ha-checkbox
						checked={formData.newsletter}
						onchange={(e: Event) => formData.newsletter = (e.target as HTMLInputElement).checked}
					/>
					<span>Subscribe to newsletter</span>
				</label>
			</div>

			<div style="margin-top: var(--ha-spacing-6); display: flex; gap: var(--ha-spacing-3);">
				<ha-button type="submit" variant="primary">
					Submit Form
				</ha-button>
				<ha-button type="button" variant="outline" onclick={handleReset}>
					Reset
				</ha-button>
			</div>
		</section>
	</form>

	<section class="section" style="margin-top: var(--ha-spacing-12);">
		<h2 class="section-title">Form State</h2>
		<pre style="
			background-color: var(--ha-color-background-secondary);
			padding: var(--ha-spacing-4);
			border-radius: var(--ha-border-radius-md);
			overflow: auto;
			font-size: var(--ha-font-size-sm);
		">{JSON.stringify({ formData, errors }, null, 2)}</pre>
	</section>
</div>
