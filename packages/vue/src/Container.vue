<template>
  <ha-container
    :ref="elementRef"
    :max-width="maxWidth"
    :centered="centered"
    :padding="padding"
    v-bind="$attrs"
  >
    <slot />
  </ha-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaContainer as HaContainerElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface ContainerProps {
  /**
   * Maximum width
   * @default "lg"
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * Center the container horizontally
   * @default false
   */
  centered?: boolean;

  /**
   * Padding size
   * @default "md"
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<ContainerProps>(), {
  maxWidth: 'lg',
  centered: false,
  padding: 'md',
});

const elementRef = ref<HaContainerElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.maxWidth = props.maxWidth;
  element.centered = props.centered;
  element.padding = props.padding;
});
</script>
