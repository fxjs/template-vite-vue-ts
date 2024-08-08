<template>
  <n-config-provider
    preflight-style-disabled
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="isDark ? darkTheme : undefined"
    :theme-overrides="isDark ? theme.dark(primaryColor) : theme.light(primaryColor)"
  >
    <router-view />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider, zhCN, dateZhCN, NSelect, NCascader, NDataTable, darkTheme } from 'naive-ui';
import { themeStore } from '@/theme/ThemeStore';
import { naiveThemeOverrides } from '@/theme';
import { useCssVar } from '@vueuse/core';
import { computed } from 'vue';

const theme = naiveThemeOverrides();
const primaryColor = useCssVar('--skin-c1', document.documentElement);
const isDark = computed(() => themeStore.themeRef.value.theme === 'dark');

// 全局修改NaiveUI组件默认属性
NSelect.props.consistentMenuWidth = { type: Boolean, default: false };
NCascader.props.virtualScroll = { type: Boolean, default: false };
NDataTable.props.striped = { type: Boolean, default: true };
</script>

<style scoped lang="scss"></style>
