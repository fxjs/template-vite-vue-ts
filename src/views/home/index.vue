<template>
  <div class="h-screen grid place-content-center place-items-center bg-skin-bg0">
    <n-float-button :right="20" :top="20" shape="circle" type="primary" @click="themeStore.toggleTheme()" title="theme">
      <FlFilledDarkTheme class="text-[24px]" />
    </n-float-button>

    <p class="text-4xl text-skin-c1 dark:text-skin-c4/80">home</p>
  </div>
</template>

<script setup lang="ts">
import { FlFilledDarkTheme } from '@kalimahapps/vue-icons';
import { themeStore } from '@/theme/ThemeStore.ts';

defineOptions({ name: 'HomeIndex' });
</script>

<style scoped lang="scss"></style>
