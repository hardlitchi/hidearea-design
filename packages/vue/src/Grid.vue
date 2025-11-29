<template>
  <ha-grid
    :ref="elementRef"
    :columns="columns"
    :gap="gap"
    :row-gap="rowGap"
    :column-gap="columnGap"
    :align-items="alignItems"
    :justify-items="justifyItems"
    v-bind="$attrs"
  >
    <slot />
  </ha-grid>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaGrid as HaGridElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface GridProps {
  /**
   * Number of columns
   * @default "12"
   */
  columns?: string;

  /**
   * Gap size (0-12)
   * @default "4"
   */
  gap?: string;

  /**
   * Row gap size (0-12)
   */
  rowGap?: string;

  /**
   * Column gap size (0-12)
   */
  columnGap?: string;

  /**
   * Align items
   */
  alignItems?: 'start' | 'center' | 'end' | 'stretch';

  /**
   * Justify items
   */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}

const props = withDefaults(defineProps<GridProps>(), {
  columns: '12',
  gap: '4',
});

const elementRef = ref<HaGridElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.columns = props.columns;
  element.gap = props.gap;
  if (props.rowGap) element.rowGap = props.rowGap;
  if (props.columnGap) element.columnGap = props.columnGap;
  if (props.alignItems) element.alignItems = props.alignItems;
  if (props.justifyItems) element.justifyItems = props.justifyItems;
});
</script>
