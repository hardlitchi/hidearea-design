<template>
  <ha-button
    ref="elementRef"
    :variant="variant"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :full-width="fullWidth"
    :type="type"
    v-bind="$attrs"
  >
    <slot />
  </ha-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaButton as HaButtonElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface ButtonProps {
  /**
   * Button variant
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

  /**
   * Button size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button type
   * @default "button"
   */
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button',
});

const elementRef = ref<HaButtonElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.variant = props.variant;
  element.size = props.size;
  element.disabled = props.disabled;
  element.loading = props.loading;
  element.fullWidth = props.fullWidth;
  element.setAttribute('type', props.type);
});

// Expose focus and blur methods
defineExpose({
  focus: () => elementRef.value?.focus(),
  blur: () => elementRef.value?.blur(),
});
</script>
