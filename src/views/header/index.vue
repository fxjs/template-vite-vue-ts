<template>
  <header :class="$style['header']">
    <div :class="$style['area']">header</div>
  </header>
</template>

<script lang="ts" setup>
import { MdOutlinedDarkMode as DarkIcon } from '@kalimahapps/vue-icons';
import { MdOutlinedLightMode as LightIcon } from '@kalimahapps/vue-icons';
import { themeStore } from '@/theme/ThemeStore.ts';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const sysName = window.$SYS_CFG.sysName;
const router = useRouter();
const isDark = computed(() => themeStore.themeRef.value.theme === 'dark');
const ThemeIcon = computed(() => (isDark.value ? DarkIcon : LightIcon));

function goHome() {
  router.push({ name: 'homeIndex' });
}

defineOptions({ name: 'HeaderComp' });
</script>

<style module lang="scss">
.header {
  position: relative;
  overflow: hidden;
  background: var(--skin-c1);
  color: #fff;
  padding: 0 24px;
}
</style>
