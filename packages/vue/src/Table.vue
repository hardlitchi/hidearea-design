<template>
  <ha-table
    :ref="elementRef"
    :striped="striped"
    :bordered="bordered"
    :hoverable="hoverable"
    :compact="compact"
    :full-width="fullWidth"
    v-bind="$attrs"
  >
    <slot />
  </ha-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HaTable as HaTableElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface TableProps {
  /**
   * Enable striped rows
   * @default false
   */
  striped?: boolean;

  /**
   * Enable borders
   * @default false
   */
  bordered?: boolean;

  /**
   * Enable row hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Enable compact mode
   * @default false
   */
  compact?: boolean;

  /**
   * Enable full width table
   * @default false
   */
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<TableProps>(), {
  striped: false,
  bordered: false,
  hoverable: false,
  compact: false,
  fullWidth: false,
});

const elementRef = ref<HaTableElement | null>(null);

defineExpose({
  element: elementRef,
});
</script>
