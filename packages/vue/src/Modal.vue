<template>
  <ha-modal
    ref="elementRef"
    :open="open"
    :size="size"
    :variant="variant"
    :closable="closable"
    :close-on-backdrop="closeOnBackdrop"
    :close-on-escape="closeOnEscape"
    v-bind="$attrs"
    @modal-open="handleOpen"
    @modal-close="handleClose"
  >
    <slot />
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </ha-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { HaModal as HaModalElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface ModalProps {
  /**
   * Modal open state
   * @default false
   */
  open?: boolean;

  /**
   * Modal size
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Modal variant
   * @default "default"
   */
  variant?: 'default' | 'centered' | 'fullscreen';

  /**
   * Show close button
   * @default true
   */
  closable?: boolean;

  /**
   * Close on backdrop click
   * @default true
   */
  closeOnBackdrop?: boolean;

  /**
   * Close on Escape key
   * @default true
   */
  closeOnEscape?: boolean;
}

const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  size: 'md',
  variant: 'default',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
});

const emit = defineEmits<{
  open: [];
  close: [];
  'update:open': [value: boolean];
}>();

const elementRef = ref<HaModalElement | null>(null);

watch(() => props.open, (newValue) => {
  const element = elementRef.value;
  if (!element) return;

  if (newValue) {
    element.setAttribute('open', '');
  } else {
    element.removeAttribute('open');
  }
});

const handleOpen = () => {
  emit('open');
  emit('update:open', true);
};

const handleClose = () => {
  emit('close');
  emit('update:open', false);
};

// Expose element reference
defineExpose({
  element: elementRef,
});
</script>
