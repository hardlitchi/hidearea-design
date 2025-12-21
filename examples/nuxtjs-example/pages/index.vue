<template>
  <div class="container">
    <header style="margin-bottom: var(--ha-spacing-8)">
      <h1
        style="
          font-size: var(--ha-font-size-4xl);
          font-weight: var(--ha-font-weight-bold);
          margin-bottom: var(--ha-spacing-4);
        "
      >
        Hidearea Design System
      </h1>
      <p
        style="
          font-size: var(--ha-font-size-lg);
          color: var(--ha-color-text-secondary);
        "
      >
        Nuxt.js Integration Example
      </p>
    </header>

    <main>
      <section class="section">
        <h2 class="section-title">Getting Started</h2>
        <p style="margin-bottom: var(--ha-spacing-4); line-height: 1.6">
          This example demonstrates how to integrate Hidearea Design System into
          a Nuxt.js application. All components are fully typed with TypeScript
          and work seamlessly with Vue 3's Composition API.
        </p>
      </section>

      <section class="section">
        <h2 class="section-title">Interactive Example</h2>

        <div
          style="
            padding: var(--ha-spacing-6);
            background-color: var(--ha-color-background-secondary);
            border-radius: var(--ha-border-radius-lg);
            margin-bottom: var(--ha-spacing-4);
          "
        >
          <p
            style="
              margin-bottom: var(--ha-spacing-4);
              font-size: var(--ha-font-size-lg);
            "
          >
            Count: <strong>{{ count }}</strong>
          </p>

          <div
            style="display: flex; gap: var(--ha-spacing-3); flex-wrap: wrap"
          >
            <ha-button variant="primary" @click="increment">
              Increment
            </ha-button>

            <ha-button variant="secondary" @click="decrement">
              Decrement
            </ha-button>

            <ha-button variant="outline" @click="reset"> Reset </ha-button>

            <ha-button variant="danger" :disabled="count === 0" @click="reset">
              Clear
            </ha-button>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Button Variants</h2>

        <div
          style="
            display: flex;
            gap: var(--ha-spacing-3);
            flex-wrap: wrap;
            margin-bottom: var(--ha-spacing-6);
          "
        >
          <ha-button variant="primary">Primary</ha-button>
          <ha-button variant="secondary">Secondary</ha-button>
          <ha-button variant="danger">Danger</ha-button>
          <ha-button variant="outline">Outline</ha-button>
          <ha-button variant="ghost">Ghost</ha-button>
        </div>

        <h3
          style="
            font-size: var(--ha-font-size-xl);
            font-weight: var(--ha-font-weight-semibold);
            margin-bottom: var(--ha-spacing-3);
            margin-top: var(--ha-spacing-6);
          "
        >
          Button Sizes
        </h3>

        <div
          style="
            display: flex;
            gap: var(--ha-spacing-3);
            align-items: center;
            flex-wrap: wrap;
          "
        >
          <ha-button variant="primary" size="sm">Small</ha-button>
          <ha-button variant="primary" size="md">Medium</ha-button>
          <ha-button variant="primary" size="lg">Large</ha-button>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Design Tokens</h2>

        <p style="margin-bottom: var(--ha-spacing-4); line-height: 1.6">
          This example uses Hidearea Design System tokens for consistent
          spacing, typography, colors, and other design properties. Tokens are
          available as CSS custom properties and can be used throughout your
          application.
        </p>

        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--ha-spacing-4);
          "
        >
          <div
            style="
              padding: var(--ha-spacing-4);
              background-color: var(--ha-color-primary);
              border-radius: var(--ha-border-radius-md);
              color: white;
            "
          >
            Primary Color
          </div>
          <div
            style="
              padding: var(--ha-spacing-4);
              background-color: var(--ha-color-secondary);
              border-radius: var(--ha-border-radius-md);
              color: white;
            "
          >
            Secondary Color
          </div>
          <div
            style="
              padding: var(--ha-spacing-4);
              background-color: var(--ha-color-success);
              border-radius: var(--ha-border-radius-md);
              color: white;
            "
          >
            Success Color
          </div>
          <div
            style="
              padding: var(--ha-spacing-4);
              background-color: var(--ha-color-danger);
              border-radius: var(--ha-border-radius-md);
              color: white;
            "
          >
            Danger Color
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Navigation</h2>
        <p style="margin-bottom: var(--ha-spacing-4)">
          Explore more examples:
        </p>
        <div style="display: flex; gap: var(--ha-spacing-3); flex-wrap: wrap">
          <NuxtLink to="/components">
            <ha-button variant="outline">View Components</ha-button>
          </NuxtLink>
          <NuxtLink to="/forms">
            <ha-button variant="outline">View Forms</ha-button>
          </NuxtLink>
        </div>
      </section>
    </main>

    <footer
      style="
        margin-top: var(--ha-spacing-12);
        padding-top: var(--ha-spacing-8);
        border-top: 1px solid var(--ha-color-border-primary);
        color: var(--ha-color-text-secondary);
        text-align: center;
      "
    >
      <p>Built with Hidearea Design System</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};

const reset = () => {
  count.value = 0;
};
</script>
