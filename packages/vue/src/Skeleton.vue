<template>
  <ha-skeleton
    ref="elementRef"
    :variant="variant"
    :animation="animation"
    :width="width"
    :height="height"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HaSkeleton as HaSkeletonElement } from '@hidearea-design/core';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'text',
  animation: 'pulse',
});

const elementRef = ref<HaSkeletonElement>();

defineExpose({
  element: elementRef,
});
</script>
