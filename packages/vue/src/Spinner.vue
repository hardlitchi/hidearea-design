<template>
  <ha-spinner
    ref="elementRef"
    :size="size"
    :color="color"
    :variant="variant"
    :speed="speed"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaSpinner as HaSpinnerElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface SpinnerProps {
  /**
   * Size of the spinner
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Color variant
   * @default "primary"
   */
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

  /**
   * Spinner style
   * @default "circular"
   */
  variant?: 'circular' | 'dots' | 'pulse';

  /**
   * Animation speed (e.g., "0.8s", "1s", "1.5s")
   * @default "0.8s"
   */
  speed?: string;
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'md',
  color: 'primary',
  variant: 'circular',
  speed: '0.8s',
});

const elementRef = ref<HaSpinnerElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.size = props.size;
  element.color = props.color;
  element.variant = props.variant;
  element.speed = props.speed;
});
</script>
