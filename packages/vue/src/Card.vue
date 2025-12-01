<template>
  <ha-card
    :ref="elementRef"
    :variant="variant"
    :padding="padding"
    :hoverable="hoverable"
    :clickable="clickable"
    v-bind="$attrs"
    @card-click="handleClick"
  >
    <slot />
    <template v-if="$slots.media" #media>
      <slot name="media" />
    </template>
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </ha-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaCard as HaCardElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface CardProps {
  /**
   * Card variant
   * @default "default"
   */
  variant?: 'default' | 'outlined' | 'elevated';

  /**
   * Card padding size
   * @default "md"
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Enable hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Make card clickable
   * @default false
   */
  clickable?: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
  hoverable: false,
  clickable: false,
});

const emit = defineEmits<{
  click: [];
}>();

const elementRef = ref<HaCardElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.variant = props.variant;
  element.padding = props.padding;
  element.hoverable = props.hoverable;
  element.clickable = props.clickable;
});

const handleClick = () => {
  emit('click');
};
</script>
