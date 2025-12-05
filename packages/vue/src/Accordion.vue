<template>
  <ha-accordion
    ref="elementRef"
    :allow-multiple="allowMultiple"
    :collapsible="collapsible"
    v-bind="$attrs"
  >
    <slot />
  </ha-accordion>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HaAccordion as HaAccordionElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface AccordionProps {
  /**
   * Allow multiple items to be open simultaneously
   * @default false
   */
  allowMultiple?: boolean;

  /**
   * Allow all items to be collapsed
   * @default false
   */
  collapsible?: boolean;
}

const props = withDefaults(defineProps<AccordionProps>(), {
  allowMultiple: false,
  collapsible: false,
});

const elementRef = ref<HaAccordionElement | null>(null);

defineExpose({
  element: elementRef,
});
</script>
