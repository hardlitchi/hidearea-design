<template>
  <ha-toast-container
    ref="elementRef"
    :position="position"
    v-bind="$attrs"
  >
    <slot />
  </ha-toast-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaToastContainer as HaToastContainerElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface ToastContainerProps {
  /**
   * Toast container position
   * @default "top-right"
   */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const props = withDefaults(defineProps<ToastContainerProps>(), {
  position: 'top-right',
});

const elementRef = ref<HaToastContainerElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  element.setAttribute('position', props.position);
});

// Expose element reference
defineExpose({
  element: elementRef,
});
</script>
