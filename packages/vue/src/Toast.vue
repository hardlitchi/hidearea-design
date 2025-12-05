<template>
  <ha-toast
    ref="elementRef"
    :variant="variant"
    :message="message"
    :closable="closable"
    :duration="duration"
    :show-progress="showProgress"
    v-bind="$attrs"
    @toast-close="handleClose"
  >
    <slot />
  </ha-toast>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaToast as HaToastElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface ToastProps {
  /**
   * Toast variant
   * @default "info"
   */
  variant?: 'info' | 'success' | 'warning' | 'error';

  /**
   * Toast message
   */
  message?: string;

  /**
   * Show close button
   * @default true
   */
  closable?: boolean;

  /**
   * Auto-close duration in milliseconds (0 to disable)
   * @default 5000
   */
  duration?: number;

  /**
   * Show progress bar
   * @default false
   */
  showProgress?: boolean;
}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'info',
  message: '',
  closable: true,
  duration: 5000,
  showProgress: false,
});

const emit = defineEmits<{
  close: [];
}>();

const elementRef = ref<HaToastElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  element.setAttribute('variant', props.variant);
  if (props.message) {
    element.setAttribute('message', props.message);
  }
  if (props.closable) {
    element.setAttribute('closable', '');
  }
  element.setAttribute('duration', props.duration.toString());
  if (props.showProgress) {
    element.setAttribute('show-progress', '');
  }
});

const handleClose = () => {
  emit('close');
};

// Expose close method
defineExpose({
  close: () => elementRef.value?.close(),
});
</script>
