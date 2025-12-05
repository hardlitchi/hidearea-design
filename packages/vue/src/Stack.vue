<template>
  <ha-stack
    ref="elementRef"
    :direction="direction"
    :gap="gap"
    :align="align"
    :justify="justify"
    :wrap="wrap"
    v-bind="$attrs"
  >
    <slot />
  </ha-stack>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaStack as HaStackElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface StackProps {
  /**
   * Stack direction
   * @default "vertical"
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Gap size (0-12)
   * @default "4"
   */
  gap?: string;

  /**
   * Align items
   */
  align?: 'start' | 'center' | 'end' | 'stretch';

  /**
   * Justify content
   */
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

  /**
   * Whether to wrap items
   * @default false
   */
  wrap?: boolean;
}

const props = withDefaults(defineProps<StackProps>(), {
  direction: 'vertical',
  gap: '4',
  wrap: false,
});

const elementRef = ref<HaStackElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.direction = props.direction;
  element.gap = props.gap;
  if (props.align) element.align = props.align;
  if (props.justify) element.justify = props.justify;
  element.wrap = props.wrap;
});
</script>
