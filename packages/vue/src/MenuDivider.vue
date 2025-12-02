<template>
  <ha-menu-divider :class="className" />
</template>

<script setup lang="ts">
interface MenuDividerProps {
  className?: string;
}

defineProps<MenuDividerProps>();
</script>
