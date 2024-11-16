<template>
  <header :class="$style['header']">
    <div :class="$style['area']">
      <!--  left  -->
      <div :class="$style['area-l']">
        <span :class="$style['title']" @click="goHome">{{ sysName }}</span>
      </div>

      <!--  right  -->
      <div :class="$style['area-r']">
        <ThemeIcon class="text-[30px]" @click="themeStore.toggleTheme()" />
        <avatar />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Avatar from '@/views/header/comp/Avatar.vue';
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

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 700px;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    left: 482px;
    top: -20px;
    width: 800px;
    height: 112px;
    border-radius: 0% 0% 0% 80%/0% 0% 0% 100%;
    background: var(--skin-c1);
  }
}

.area {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.area-l {
  position: relative;
  font-size: 24px;
  //padding-left: 45px;
  //
  //&::after {
  //  content: '';
  //  position: absolute;
  //  top: 50%;
  //  left: 0;
  //  width: 40px;
  //  height: 40px;
  //  background: url('./assets/brand.png') center center no-repeat;
  //  background-size: 100% auto;
  //  transform: translateY(-50%);
  //}
}

.area-r {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 24px;
}

.title {
  color: #ffffff;
  font-family: 'youshe', serif;
  font-size: 36px;
  font-weight: 400;
  text-shadow: 0 2px 8px rgba(41, 47, 58, 0.05);
  background: linear-gradient(0deg, #0ec5ec 0%, #31beff 0%, #effcfe 59%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
