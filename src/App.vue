<template>
  <n-config-provider
    preflight-style-disabled
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="theme.dark(primaryColor)"
  >
    <router-view />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider, zhCN, dateZhCN, NSelect, NCascader, NDataTable } from 'naive-ui';
import { naiveThemeOverrides } from '@/theme';
import { useCssVar } from '@vueuse/core';

const theme = naiveThemeOverrides();
const primaryColor = useCssVar('--com-primary-color', document.documentElement);

// setInterval(() => {
//   // 调试：随机生成颜色
//   primaryColor.value = `#${Math.random().toString(16).slice(2, 8)}`;
// }, 1000);

// 全局修改NaiveUI组件默认属性
NSelect.props.consistentMenuWidth = { type: Boolean, default: false };
NCascader.props.virtualScroll = { type: Boolean, default: false };
NDataTable.props.striped = { type: Boolean, default: true };
</script>

<style scoped lang="scss"></style>
