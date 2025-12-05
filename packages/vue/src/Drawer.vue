<template>
  <ha-drawer
    ref="elementRef"
    :open="open"
    :placement="placement"
    :size="size"
    :overlay="overlay"
    :close-on-backdrop="closeOnBackdrop"
    :close-on-escape="closeOnEscape"
    v-bind="$attrs"
    @drawer-open="handleOpen"
    @drawer-close="handleClose"
    @backdrop-click="handleBackdropClick"
  >
    <slot />
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </ha-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { HaDrawer as HaDrawerElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface DrawerProps {
  /**
   * Drawer open state
   * @default false
   */
  open?: boolean;

  /**
   * Drawer placement
   * @default "right"
   */
  placement?: 'left' | 'right' | 'top' | 'bottom';

  /**
   * Drawer size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show backdrop overlay
   * @default true
   */
  overlay?: boolean;

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

const props = withDefaults(defineProps<DrawerProps>(), {
  open: false,
  placement: 'right',
  size: 'md',
  overlay: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
});

const emit = defineEmits<{
  open: [];
  close: [];
  'backdrop-click': [];
  'update:open': [value: boolean];
}>();

const elementRef = ref<HaDrawerElement | null>(null);

const handleOpen = () => {
  emit('update:open', true);
  emit('open');
};

const handleClose = () => {
  emit('update:open', false);
  emit('close');
};

const handleBackdropClick = () => {
  emit('backdrop-click');
};

const openDrawer = () => {
  elementRef.value?.open();
};

const closeDrawer = () => {
  elementRef.value?.close();
};

const toggle = () => {
  elementRef.value?.toggle();
};

// Sync open state
watch(
  () => props.open,
  (newValue) => {
    if (elementRef.value) {
      if (newValue) {
        elementRef.value.setAttribute('open', '');
      } else {
        elementRef.value.removeAttribute('open');
      }
    }
  }
);

defineExpose({
  element: elementRef,
  open: openDrawer,
  close: closeDrawer,
  toggle,
});
</script>
