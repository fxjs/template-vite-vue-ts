<template>
  <n-modal
    ref="modalRef"
    :width="width"
    :height="height"
    preset="card"
    :show-icon="false"
    :theme-overrides="overrideModalTheme()"
    :style="wrapStyle"
    style="--n-color-modal: rgba(2, 11, 20, 0.85)"
    header-style="padding: 10px; height: 40px; line-height: 20px; font-size: 12px;"
    content-style="padding: 0 10px"
    @after-enter="useDragModal($event)"
  >
    <template #header>
      <slot name="header" />
    </template>

    <n-scrollbar :style="{ maxHeight: contentMaxHeight }">
      <slot></slot>
    </n-scrollbar>

    <template #action>
      <slot name="action" />
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { overrideModalTheme } from './modalTheme';
import { useDragModal } from '@/components/dialog/dragPlugin';

defineOptions({ name: 'comDialog' }); // 基础弹窗组件支持 n-modal 所有属性

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 900,
  },
  height: {
    type: Number,
    default: 600,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  wrapStyle: {
    type: String,
  },
});

const emits = defineEmits(['handleClose', 'handleNegative', 'handlePositive']);

const modalRef = ref();

const minH = computed(() => Math.max(props.height, 120));
const wrapStyle = computed(() => props.wrapStyle ?? `width: ${props.width}px; height: ${minH.value}px;`);

// 内容区域最大高度，计算公式：弹窗高 - title(-action) - padding
const contentMaxHeight = computed(() => {
  let h = minH.value - 40 - 10;
  return `${h}px`;
});

function close() {
  modalRef.value?.doUpdateShow(false);
}

function handleClose() {
  close();
  emits('handleClose');
}

// Expose fn
defineExpose({
  close,
});
</script>

<style module lang="scss"></style>
