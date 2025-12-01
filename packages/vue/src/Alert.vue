<template>
  <ha-alert
    :ref="elementRef"
    :variant="variant"
    :style-variant="styleVariant"
    :title="title"
    :closable="closable"
    :show-icon="showIcon"
    v-bind="$attrs"
    @alert-close="handleClose"
  >
    <slot />
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
  </ha-alert>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaAlert as HaAlertElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface AlertProps {
  /**
   * Alert variant
   * @default "info"
   */
  variant?: 'info' | 'success' | 'warning' | 'error';

  /**
   * Alert style variant
   * @default "soft"
   */
  styleVariant?: 'filled' | 'outlined' | 'soft';

  /**
   * Alert title
   */
  title?: string;

  /**
   * Show close button
   * @default false
   */
  closable?: boolean;

  /**
   * Show icon
   * @default true
   */
  showIcon?: boolean;
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  styleVariant: 'soft',
  title: '',
  closable: false,
  showIcon: true,
});

const emit = defineEmits<{
  close: [];
}>();

const elementRef = ref<HaAlertElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.variant = props.variant;
  element.styleVariant = props.styleVariant;
  if (props.title) {
    element.title = props.title;
  }
  element.closable = props.closable;
  element.showIcon = props.showIcon;
});

const handleClose = () => {
  emit('close');
};

// Expose close method
defineExpose({
  close: () => elementRef.value?.close(),
});
</script>
