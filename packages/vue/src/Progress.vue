<template>
  <ha-progress
    :ref="elementRef"
    :value="value"
    :max="max"
    :variant="variant"
    :color="color"
    :size="size"
    :show-label="showLabel"
    v-bind="$attrs"
  >
    <slot />
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
  </ha-progress>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaProgress as HaProgressElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface ProgressProps {
  /**
   * Current progress value
   * @default 0
   */
  value?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Progress bar style
   * @default "default"
   */
  variant?: 'default' | 'striped' | 'animated';

  /**
   * Color variant
   * @default "primary"
   */
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Size of the progress bar
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show percentage label
   * @default false
   */
  showLabel?: boolean;
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  max: 100,
  variant: 'default',
  color: 'primary',
  size: 'md',
  showLabel: false,
});

const elementRef = ref<HaProgressElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.value = props.value;
  element.max = props.max;
  element.variant = props.variant;
  element.color = props.color;
  element.size = props.size;
  element.showLabel = props.showLabel;
});
</script>
