<template>
  <ha-list-item
    :ref="elementRef"
    :disabled="disabled"
    :active="active"
    v-bind="$attrs"
    @list-item-click="handleClick"
  >
    <slot />
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
  </ha-list-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HaListItem as HaListItemElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface ListItemProps {
  /**
   * Disable the item
   * @default false
   */
  disabled?: boolean;

  /**
   * Mark item as active
   * @default false
   */
  active?: boolean;
}

const props = withDefaults(defineProps<ListItemProps>(), {
  disabled: false,
  active: false,
});

const emit = defineEmits<{
  click: [];
}>();

const elementRef = ref<HaListItemElement | null>(null);

const handleClick = () => {
  emit('click');
};

defineExpose({
  element: elementRef,
});
</script>
