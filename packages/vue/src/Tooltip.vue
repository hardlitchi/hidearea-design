<script setup lang="ts">
import { ref, onMounted, withDefaults } from 'vue';
import type { HaTooltip as HaTooltipElement } from '@hidearea-design/core';
import '@hidearea-design/core';

export interface TooltipProps {
  /**
   * Tooltip content text
   */
  content?: string;

  /**
   * Tooltip placement
   */
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

  /**
   * Trigger type
   */
  trigger?: 'hover' | 'focus' | 'click';

  /**
   * Tooltip variant
   */
  variant?: 'default' | 'dark' | 'light';

  /**
   * Tooltip size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show arrow indicator
   */
  showArrow?: boolean;

  /**
   * Show delay in milliseconds
   */
  delay?: number;

  /**
   * Disabled state
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  trigger: 'hover',
  variant: 'default',
  size: 'md',
  showArrow: false,
  delay: 200,
  disabled: false,
});

const emit = defineEmits<{
  show: [];
  hide: [];
}>();

const elementRef = ref<HaTooltipElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  if (props.content) {
    element.content = props.content;
  }
  element.placement = props.placement;
  element.triggerMode = props.trigger;
  element.variant = props.variant;
  element.size = props.size;
  element.showArrow = props.showArrow;
  element.delay = props.delay;
  element.disabled = props.disabled;

  // Event listeners
  element.addEventListener('show', () => {
    emit('show');
  });

  element.addEventListener('hide', () => {
    emit('hide');
  });
});
</script>

<template>
  <ha-tooltip
    :ref="elementRef"
    :content="content"
    :placement="placement"
    :trigger="trigger"
    :variant="variant"
    :size="size"
    :show-arrow="showArrow"
    :delay="delay"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
  </ha-tooltip>
</template>
