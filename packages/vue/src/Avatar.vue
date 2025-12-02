<template>
  <ha-avatar
    :ref="elementRef"
    :src="src"
    :alt="alt"
    :size="size"
    :variant="variant"
    :initials="initials"
    :status="status"
    v-bind="$attrs"
  >
    <slot />
  </ha-avatar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaAvatar as HaAvatarElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface AvatarProps {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Avatar size
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Avatar variant
   * @default "circle"
   */
  variant?: 'circle' | 'square' | 'rounded';

  /**
   * Initials to display (overrides auto-generated initials)
   */
  initials?: string;

  /**
   * Status indicator
   */
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const props = withDefaults(defineProps<AvatarProps>(), {
  src: '',
  alt: '',
  size: 'md',
  variant: 'circle',
  initials: '',
  status: undefined,
});

const elementRef = ref<HaAvatarElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  if (props.src) {
    element.setAttribute('src', props.src);
  }
  if (props.alt) {
    element.setAttribute('alt', props.alt);
  }
  element.setAttribute('size', props.size);
  element.setAttribute('variant', props.variant);
  if (props.initials) {
    element.setAttribute('initials', props.initials);
  }
  if (props.status) {
    element.setAttribute('status', props.status);
  }
});

// Expose element reference
defineExpose({
  element: elementRef,
});
</script>
