<template>
  <div></div>
</template>

<script setup lang="ts">
import { $http } from '@tanzerfe/http';
import { api } from '@/api';

(function getData() {
  // GET
  const url1 = api.getUrl(api.type.xxx, api.name.xxx.a1, { q1: 'test' });
  $http.get(url1, { data: { _cfg: { showTip: true } } }); // 带错误提示

  // POST
  const url2 = api.getUrl(api.type.xxx, api.name.xxx.a1);
  const params = { p1: 'test' };
  $http.post(url2, { data: { ...params, _cfg: { showTip: true } } });
})();

defineOptions({ name: 'DemoComp' });
</script>

<style scoped lang="scss"></style>
