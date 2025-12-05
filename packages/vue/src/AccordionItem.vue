<template>
  <ha-accordion-item
    ref="elementRef"
    :open="open"
    :disabled="disabled"
    :header="header"
    v-bind="$attrs"
    @accordion-toggle="handleToggle"
    @accordion-open="handleOpen"
    @accordion-close="handleClose"
  >
    <slot />
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
  </ha-accordion-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HaAccordionItem as HaAccordionItemElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface AccordionItemProps {
  /**
   * Item open state
   * @default false
   */
  open?: boolean;

  /**
   * Disable the item
   * @default false
   */
  disabled?: boolean;

  /**
   * Header text
   */
  header?: string;
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  open: false,
  disabled: false,
});

const emit = defineEmits<{
  toggle: [open: boolean];
  open: [];
  close: [];
}>();

const elementRef = ref<HaAccordionItemElement | null>(null);

const handleToggle = (e: Event) => {
  const customEvent = e as CustomEvent;
  emit('toggle', customEvent.detail.open);
};

const handleOpen = () => {
  emit('open');
};

const handleClose = () => {
  emit('close');
};

const toggle = () => {
  elementRef.value?.toggle();
};

const open = () => {
  elementRef.value?.open();
};

const close = () => {
  elementRef.value?.close();
};

defineExpose({
  element: elementRef,
  toggle,
  open,
  close,
});
</script>
