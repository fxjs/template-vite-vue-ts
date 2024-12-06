<template>
  <div :class="[$style['main-layout']]">
    <router-view :class="$style['content']" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'MainLayoutComp' });
</script>

<style module lang="scss">
.main-layout {
}

.content {
  overflow: auto;
  padding: 0 24px 24px;
}
</style>
