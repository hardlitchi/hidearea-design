<template>
  <ha-badge
    :ref="elementRef"
    :variant="variant"
    :style-variant="styleVariant"
    :size="size"
    :pill="pill"
    :dot="dot"
    :removable="removable"
    v-bind="$attrs"
    @badge-remove="handleRemove"
  >
    <slot />
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
  </ha-badge>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaBadge as HaBadgeElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface BadgeProps {
  /**
   * Badge variant
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Badge style variant
   * @default "filled"
   */
  styleVariant?: 'filled' | 'outlined' | 'soft';

  /**
   * Badge size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Pill-shaped badge
   * @default false
   */
  pill?: boolean;

  /**
   * Dot-only badge (no content)
   * @default false
   */
  dot?: boolean;

  /**
   * Show remove button
   * @default false
   */
  removable?: boolean;
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  styleVariant: 'filled',
  size: 'md',
  pill: false,
  dot: false,
  removable: false,
});

const emit = defineEmits<{
  remove: [];
}>();

const elementRef = ref<HaBadgeElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.variant = props.variant;
  element.styleVariant = props.styleVariant;
  element.size = props.size;
  element.pill = props.pill;
  element.dot = props.dot;
  element.removable = props.removable;
});

const handleRemove = () => {
  emit('remove');
};

// Expose remove method
defineExpose({
  remove: () => elementRef.value?.remove(),
});
</script>
