<template>
  <t-config-provider>
    <router-view />
  </t-config-provider>
</template>

<script lang="ts" setup>
import { themeStore } from '@/theme/ThemeStore';
import { computed } from 'vue';

// const primaryColor = useCssVar('--skin-c1', document.documentElement);
const mode = computed(() => themeStore.themeRef.value.theme);
</script>

<style scoped lang="scss"></style>
