<template>
  <ha-menu ref="menuRef" :class="className">
    <slot />
  </ha-menu>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

interface MenuProps {
  size?: string;
  className?: string;
}

interface HaMenuElement extends HTMLElement {
  size: string;
}

const props = defineProps<MenuProps>();
const emit = defineEmits<{
  'item-click': [value: string];
}>();

const menuRef = ref<HaMenuElement | null>(null);

onMounted(() => {
  const element = menuRef.value;
  if (!element) return;

  element.addEventListener('item-click', (e: Event) => {
    const customEvent = e as CustomEvent;
    emit('item-click', customEvent.detail.value);
  });

  if (props.size) {
    element.size = props.size;
  }
});

watch(
  () => props.size,
  (newValue) => {
    if (menuRef.value && newValue) {
      menuRef.value.size = newValue;
    }
  }
);
</script>
