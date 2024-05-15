<template>
  <n-empty :class="$style['empty']" :theme-overrides="overrideEmptyTheme()">
    <template #icon>
      <img src="@/assets/noData.png" alt="no data" />
    </template>
  </n-empty>
</template>

<script lang="ts" setup>
import { overrideEmptyTheme } from './emptyTheme';

defineOptions({ name: 'ComEmpty' });
</script>

<style module lang="scss">
.empty {
  @apply h-full justify-center;
}
</style>
