<template>
  <div :class="$style['page-login']">
    <div :class="$style['top']">
      <span :class="$style.name">{{ sysName }}</span>
    </div>

    <LoginForm />
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './LoginForm.vue';

const sysName = window.$SYS_CFG.sysName;

defineOptions({ name: 'loginIndex' });
</script>

<style module lang="scss">
.page-login {
  background: url('./assets/bg.jpg') center top no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  .name {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-family: 'youshe', serif;
    font-size: 36px;
    font-weight: 400;
    text-shadow: 0 2px 8px rgba(41, 47, 58, 0.05);
    background: linear-gradient(0deg, #0ec5ec 0%, #31beff 0%, #effcfe 59%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
  }
}
</style>
