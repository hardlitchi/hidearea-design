<template>
  <ha-list
    :ref="elementRef"
    :bordered="bordered"
    :hoverable="hoverable"
    :divided="divided"
    v-bind="$attrs"
  >
    <slot />
  </ha-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HaList as HaListElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface ListProps {
  /**
   * Enable borders around list
   * @default false
   */
  bordered?: boolean;

  /**
   * Enable hover effect on items
   * @default false
   */
  hoverable?: boolean;

  /**
   * Show dividers between items
   * @default false
   */
  divided?: boolean;
}

const props = withDefaults(defineProps<ListProps>(), {
  bordered: false,
  hoverable: false,
  divided: false,
});

const elementRef = ref<HaListElement | null>(null);

defineExpose({
  element: elementRef,
});
</script>
