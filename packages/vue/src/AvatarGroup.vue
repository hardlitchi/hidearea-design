<template>
  <ha-avatar-group
    ref="elementRef"
    :max="max"
    :size="size"
    :layout="layout"
    v-bind="$attrs"
  >
    <slot />
  </ha-avatar-group>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaAvatarGroup as HaAvatarGroupElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface AvatarGroupProps {
  /**
   * Maximum number of avatars to display
   * @default 0 (no limit)
   */
  max?: number;

  /**
   * Avatar size (propagated to children)
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Group layout
   * @default "stack"
   */
  layout?: 'stack' | 'grid' | 'list';
}

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  max: 0,
  size: 'md',
  layout: 'stack',
});

const elementRef = ref<HaAvatarGroupElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  if (props.max > 0) {
    element.setAttribute('max', props.max.toString());
  }
  element.setAttribute('size', props.size);
  element.setAttribute('layout', props.layout);
});

// Expose element reference
defineExpose({
  element: elementRef,
});
</script>
