<template>
  <ha-pagination
    :ref="elementRef"
    :current="current"
    :total="total"
    :page-size="pageSize"
    :variant="variant"
    :size="size"
    :show-quick-jumper="showQuickJumper"
    v-bind="$attrs"
    @page-change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Import the web component
import '@hidearea-design/core';

export interface PaginationProps {
  /**
   * Current page number (1-indexed)
   * @default 1
   */
  current?: number;

  /**
   * Total number of items
   */
  total: number;

  /**
   * Number of items per page
   * @default 10
   */
  pageSize?: number;

  /**
   * Pagination variant
   * @default "default"
   */
  variant?: 'default' | 'rounded' | 'simple';

  /**
   * Pagination size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show quick jumper
   * @default false
   */
  showQuickJumper?: boolean;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  current: 1,
  pageSize: 10,
  variant: 'default',
  size: 'md',
  showQuickJumper: false,
});

const emit = defineEmits<{
  change: [page: number];
  'update:current': [value: number];
}>();

const elementRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  element.setAttribute('current', props.current.toString());
  element.setAttribute('total', props.total.toString());
  element.setAttribute('page-size', props.pageSize.toString());
  element.setAttribute('variant', props.variant);
  element.setAttribute('size', props.size);
  if (props.showQuickJumper) {
    element.setAttribute('show-quick-jumper', '');
  }
});

const handlePageChange = (event: Event) => {
  const customEvent = event as CustomEvent<{ page: number }>;
  const page = customEvent.detail.page;
  emit('change', page);
  emit('update:current', page);
};

// Expose element reference
defineExpose({
  element: elementRef,
});
</script>
