<template>
  <ha-menu-item ref="itemRef" :class="className">
    <slot />
  </ha-menu-item>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

interface MenuItemProps {
  value?: string;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
}

interface HaMenuItemElement extends HTMLElement {
  value: string;
  disabled: boolean;
  danger: boolean;
}

const props = defineProps<MenuItemProps>();
const emit = defineEmits<{
  click: [];
}>();

const itemRef = ref<HaMenuItemElement | null>(null);

onMounted(() => {
  const element = itemRef.value;
  if (!element) return;

  element.addEventListener('item-click', () => {
    emit('click');
  });

  if (props.value) {
    element.value = props.value;
  }

  if (typeof props.disabled === 'boolean') {
    element.disabled = props.disabled;
  }

  if (typeof props.danger === 'boolean') {
    element.danger = props.danger;
  }
});

watch(
  () => props.value,
  (newValue) => {
    if (itemRef.value && newValue) {
      itemRef.value.value = newValue;
    }
  }
);

watch(
  () => props.disabled,
  (newValue) => {
    if (itemRef.value && typeof newValue === 'boolean') {
      itemRef.value.disabled = newValue;
    }
  }
);

watch(
  () => props.danger,
  (newValue) => {
    if (itemRef.value && typeof newValue === 'boolean') {
      itemRef.value.danger = newValue;
    }
  }
);
</script>
