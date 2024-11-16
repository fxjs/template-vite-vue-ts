<template>
  <div class="h-screen">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({ name: 'noAuthLayoutComp' });
</script>
