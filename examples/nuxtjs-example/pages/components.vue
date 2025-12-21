<template>
  <div class="container">
    <header style="margin-bottom: var(--ha-spacing-8)">
      <NuxtLink
        to="/"
        style="
          color: var(--ha-color-primary);
          margin-bottom: var(--ha-spacing-4);
          display: inline-block;
        "
      >
        ← Back to Home
      </NuxtLink>
      <h1
        style="
          font-size: var(--ha-font-size-4xl);
          font-weight: var(--ha-font-weight-bold);
          margin-bottom: var(--ha-spacing-4);
        "
      >
        Component Showcase
      </h1>
      <p
        style="
          font-size: var(--ha-font-size-lg);
          color: var(--ha-color-text-secondary);
        "
      >
        Explore various components from Hidearea Design System
      </p>
    </header>

    <main style="display: flex; flex-direction: column; gap: var(--ha-spacing-8)">
      <!-- Alerts Section -->
      <section>
        <h2 class="section-title">Alerts</h2>
        <div style="display: flex; flex-direction: column; gap: var(--ha-spacing-3)">
          <ha-alert variant="info" title="Information">
            This is an informational alert message.
          </ha-alert>
          <ha-alert variant="success" title="Success">
            Your changes have been saved successfully!
          </ha-alert>
          <ha-alert variant="warning" title="Warning">
            Please review the following items before proceeding.
          </ha-alert>
          <ha-alert variant="error" title="Error">
            An error occurred while processing your request.
          </ha-alert>
        </div>
      </section>

      <!-- Badges Section -->
      <section>
        <h2 class="section-title">Badges</h2>
        <div
          style="
            display: flex;
            gap: var(--ha-spacing-3);
            flex-wrap: wrap;
            align-items: center;
          "
        >
          <ha-badge variant="primary">Primary</ha-badge>
          <ha-badge variant="secondary">Secondary</ha-badge>
          <ha-badge variant="success">Success</ha-badge>
          <ha-badge variant="danger">Danger</ha-badge>
          <ha-badge variant="warning">Warning</ha-badge>
          <ha-badge variant="info">Info</ha-badge>
        </div>
      </section>

      <!-- Cards Section -->
      <section>
        <h2 class="section-title">Cards</h2>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--ha-spacing-4);
          "
        >
          <ha-card>
            <div slot="header">
              <h3
                style="
                  font-size: var(--ha-font-size-xl);
                  font-weight: var(--ha-font-weight-semibold);
                "
              >
                Card Title
              </h3>
            </div>
            <p>This is a basic card with header and footer.</p>
            <div
              slot="footer"
              style="
                display: flex;
                gap: var(--ha-spacing-2);
                justify-content: flex-end;
              "
            >
              <ha-button variant="outline" size="sm">Cancel</ha-button>
              <ha-button variant="primary" size="sm">Save</ha-button>
            </div>
          </ha-card>

          <ha-card>
            <div slot="header">
              <h3
                style="
                  font-size: var(--ha-font-size-xl);
                  font-weight: var(--ha-font-weight-semibold);
                "
              >
                Feature Card
              </h3>
            </div>
            <p>Cards can contain any content including other components.</p>
            <div style="margin-top: var(--ha-spacing-3)">
              <ha-badge variant="success">New</ha-badge>
            </div>
          </ha-card>

          <ha-card>
            <div slot="header">
              <h3
                style="
                  font-size: var(--ha-font-size-xl);
                  font-weight: var(--ha-font-weight-semibold);
                "
              >
                Interactive Card
              </h3>
            </div>
            <p style="margin-bottom: var(--ha-spacing-3)">
              Cards work great with other components.
            </p>
            <ha-input
              placeholder="Enter text..."
              :value="cardInput"
              @input="cardInput = ($event.target as HTMLInputElement).value"
            />
          </ha-card>
        </div>
      </section>

      <!-- Form Controls Section -->
      <section>
        <h2 class="section-title">Form Controls</h2>

        <div
          style="
            display: flex;
            flex-direction: column;
            gap: var(--ha-spacing-6);
            max-width: 600px;
          "
        >
          <div>
            <label
              style="
                display: block;
                margin-bottom: var(--ha-spacing-2);
                font-weight: var(--ha-font-weight-medium);
              "
            >
              Text Input
            </label>
            <ha-input
              placeholder="Enter your name..."
              :value="textInput"
              @input="textInput = ($event.target as HTMLInputElement).value"
            />
          </div>

          <div>
            <label
              style="
                display: block;
                margin-bottom: var(--ha-spacing-3);
                font-weight: var(--ha-font-weight-medium);
              "
            >
              Checkbox
            </label>
            <ha-checkbox
              :checked="checkboxValue"
              @change="checkboxValue = ($event.target as HTMLInputElement).checked"
              label="I agree to the terms and conditions"
            />
          </div>

          <div>
            <label
              style="
                display: block;
                margin-bottom: var(--ha-spacing-3);
                font-weight: var(--ha-font-weight-medium);
              "
            >
              Radio Buttons
            </label>
            <div
              style="
                display: flex;
                flex-direction: column;
                gap: var(--ha-spacing-2);
              "
            >
              <ha-radio
                name="example"
                value="option1"
                :checked="radioValue === 'option1'"
                @change="radioValue = ($event.target as HTMLInputElement).value"
                label="Option 1"
              />
              <ha-radio
                name="example"
                value="option2"
                :checked="radioValue === 'option2'"
                @change="radioValue = ($event.target as HTMLInputElement).value"
                label="Option 2"
              />
              <ha-radio
                name="example"
                value="option3"
                :checked="radioValue === 'option3'"
                @change="radioValue = ($event.target as HTMLInputElement).value"
                label="Option 3"
              />
            </div>
          </div>

          <div>
            <label
              style="
                display: flex;
                align-items: center;
                gap: var(--ha-spacing-3);
                font-weight: var(--ha-font-weight-medium);
              "
            >
              <ha-switch
                :checked="switchValue"
                @change="switchValue = ($event.target as HTMLInputElement).checked"
              />
              <span>Enable notifications</span>
            </label>
          </div>
        </div>
      </section>

      <!-- Tooltips Section -->
      <section>
        <h2 class="section-title">Tooltips</h2>
        <div
          style="display: flex; gap: var(--ha-spacing-4); flex-wrap: wrap"
        >
          <ha-tooltip content="This is a tooltip on top" placement="top">
            <ha-button variant="outline">Hover me (top)</ha-button>
          </ha-tooltip>
          <ha-tooltip content="This is a tooltip on the right" placement="right">
            <ha-button variant="outline">Hover me (right)</ha-button>
          </ha-tooltip>
          <ha-tooltip content="This is a tooltip on the bottom" placement="bottom">
            <ha-button variant="outline">Hover me (bottom)</ha-button>
          </ha-tooltip>
          <ha-tooltip content="This is a tooltip on the left" placement="left">
            <ha-button variant="outline">Hover me (left)</ha-button>
          </ha-tooltip>
        </div>
      </section>
    </main>

    <footer
      style="
        margin-top: var(--ha-spacing-12);
        padding-top: var(--ha-spacing-8);
        border-top: 1px solid var(--ha-color-border-primary);
        text-align: center;
      "
    >
      <div style="margin-bottom: var(--ha-spacing-4)">
        <NuxtLink to="/" style="color: var(--ha-color-primary)">
          Home
        </NuxtLink>
        |
        <NuxtLink to="/forms" style="color: var(--ha-color-primary)">
          Forms
        </NuxtLink>
      </div>
      <p style="color: var(--ha-color-text-secondary)">
        Built with Hidearea Design System
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const cardInput = ref('');
const textInput = ref('');
const checkboxValue = ref(false);
const radioValue = ref('option1');
const switchValue = ref(false);
</script>
