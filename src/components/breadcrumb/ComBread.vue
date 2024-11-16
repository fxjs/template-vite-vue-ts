<template>
  <n-breadcrumb :theme-overrides="breadcrumbTheme">
    <n-breadcrumb-item v-for="item of data" :clickable="!!item.clickable" :key="item.name" @click="handleClick(item)">
      {{ item.name }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
import breadcrumbTheme from './theme';
import { useRouter } from 'vue-router';
import type { IBreadData } from '@/types';

interface Props {
  data: IBreadData[];
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
});
const router = useRouter();

/**
 * 路由跳转
 * @param item
 */
function handleClick(item: IBreadData) {
  if (item.clickable && item.routeRaw) {
    router.push(item.routeRaw);
  }
}

defineOptions({ name: 'ComBread' }); // 面包屑组件
</script>

<style module></style>
