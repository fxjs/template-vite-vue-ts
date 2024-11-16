<template>
  <div :class="[$style['main-layout'], $style['row']]">
    <Header :class="$style['header']" />
    <Menu :class="$style['sidebar']" />
    <router-view :class="$style['content']" v-slot="{ Component }">
      <keep-alive :include="keepAliveComps">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/views/header/index.vue';
import Menu from '@/views/menu/index.vue';

// 需缓存组件
const keepAliveComps = [] as string[];

defineOptions({ name: 'MainLayoutComp' });
</script>

<style module lang="scss">
.main-layout {
  --header-height: 64px;

  display: grid;
  min-width: 1366px;

  &.row {
    grid-template-areas:
      'header header'
      'sidebar content'; /* 定义grid区域 */
    grid-template-columns: minmax(0, auto) 1fr;
    grid-template-rows: var(--header-height) calc(100vh - var(--header-height));
  }
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
  min-width: 48px;
}

.content {
  grid-area: content;
  overflow: auto;
  padding: 0 24px 24px;
}
</style>
