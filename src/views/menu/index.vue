<template>
  <n-layout has-sider>
    <n-layout-sider
      :class="{ [$style.wrap]: true, [$style.expand]: isExpand }"
      :collapsed-width="48"
      :collapsed="isExpand"
      :width="260"
      @collapse="setExpand(false)"
      @expand="setExpand(true)"
      bordered
      collapse-mode="width"
    >
      <n-scrollbar :style="`max-height: ${scrollMaxH}; margin-top: 12px;`">
        <n-menu
          v-model:value="activeKey"
          :collapsed="isExpand"
          :options="menuList"
          :inverted="isDark"
          accordion
          @update:value="handleUpdateValue"
        />
      </n-scrollbar>

      <n-button :class="$style['btn-trigger']" @click="setExpand(!isExpand)" text>
        <IconExpand :class="{ [$style['icon-expand']]: true, [$style['re']]: isExpand }" />
      </n-button>
    </n-layout-sider>
  </n-layout>
</template>

<script lang="ts" setup>
import { icon_expand as IconExpand } from './assets/icon/index';
import { useMenu } from '@/views/menu/useMenu';
import { computed } from 'vue';
import { useState } from '@/common/hooks/useState.ts';
import { themeStore } from '@/theme/ThemeStore.ts';

const { menuList, activeKey, handleUpdateValue } = useMenu();
const [isExpand, setExpand] = useState(false);
const isDark = computed(() => themeStore.themeRef.value.theme === 'dark');

const props = defineProps({
  headless: Boolean,
});

const scrollMaxH = computed(() => {
  // - topH - gapTop - iconH - gapBottom - py
  return props.headless ? 'calc(100vh - 48px)' : 'calc(100vh - 64px - 12px - 24px - 20px - 6px)';
});

defineOptions({ name: 'MenuIndex' });
</script>

<style module lang="scss">
.wrap {
  position: relative;
  background-color: var(--skin-bg0) !important;

  &.expand {
    background: var(--com-primary-color);
  }
}

.btn-trigger {
  .icon-expand {
    margin-left: 24px !important;
    color: var(--skin-t1);
    font-size: 24px;
    transition: all 0.35s;
    &.re {
      margin-left: 12px !important;
      transform-origin: center center;
      transform: rotate(-180deg);
    }
  }
}
</style>
