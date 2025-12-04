<template>
  <ha-datagrid
    ref="elementRef"
    :striped="striped ? '' : undefined"
    :bordered="bordered ? '' : undefined"
    :hoverable="hoverable ? '' : undefined"
    :selectable="selectable ? '' : undefined"
    :page-size="pageSize"
    :current-page="currentPage"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
    @page-change="handlePageChange"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { HaDataGrid as HaDataGridElement, DataGridColumn, DataGridRow } from '@hidearea-design/core';

export interface DataGridProps {
  columns?: DataGridColumn[];
  data?: DataGridRow[];
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  pageSize?: number;
  currentPage?: number;
}

const props = withDefaults(defineProps<DataGridProps>(), {
  striped: false,
  bordered: false,
  hoverable: false,
  selectable: false,
  pageSize: 10,
  currentPage: 1,
});

const emit = defineEmits<{
  (e: 'sort-change', event: CustomEvent): void;
  (e: 'selection-change', event: CustomEvent): void;
  (e: 'page-change', event: CustomEvent): void;
}>();

const elementRef = ref<HaDataGridElement>();

const handleSortChange = (event: CustomEvent) => {
  emit('sort-change', event);
};

const handleSelectionChange = (event: CustomEvent) => {
  emit('selection-change', event);
};

const handlePageChange = (event: CustomEvent) => {
  emit('page-change', event);
};

const getSelectedRows = () => {
  return elementRef.value?.getSelectedRows() || [];
};

const clearSelection = () => {
  elementRef.value?.clearSelection();
};

// Watch for columns changes
watch(
  () => props.columns,
  (newColumns) => {
    if (elementRef.value && newColumns) {
      elementRef.value.setColumns(newColumns);
    }
  },
  { immediate: true }
);

// Watch for data changes
watch(
  () => props.data,
  (newData) => {
    if (elementRef.value && newData) {
      elementRef.value.setData(newData);
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (elementRef.value) {
    if (props.columns) {
      elementRef.value.setColumns(props.columns);
    }
    if (props.data) {
      elementRef.value.setData(props.data);
    }
  }
});

defineExpose({
  element: elementRef,
  getSelectedRows,
  clearSelection,
});
</script>
