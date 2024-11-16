<template>
  <div :class="$style['page']">
    <div :class="$style['container']">
      <img src="" alt="" />
      <div class="mb-[24px]">暂无使用权限，请联系本系统的管理员开设！</div>

      <n-button type="primary" @click="goLogin()">返回系统登录</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

function goLogin() {
  window.location.href = window.location.origin + window.location.pathname;
}

defineComponent({ name: 'ErrorPage403Comp' });
</script>

<style module lang="scss">
.page {
  width: 100%;
  height: 100vh;
  background: #051931;
  display: grid;
  place-content: center;
}

.container {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
