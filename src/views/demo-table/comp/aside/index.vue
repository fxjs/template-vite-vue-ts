<template>
  <ComDrawerB
    :autoFocus="false"
    :footerPaddingBottom="25"
    :maskClosable="false"
    :show-action="isModify"
    :positive-loading="submitLoading"
    @handle-negative="handleClose"
    @handle-positive="handleSubmit"
    class="!w-[430px]"
  >
    <Detail v-if="isDetail" />
    <Modify ref="modifyRef" v-else-if="isModify" :show="show" />
  </ComDrawerB>
</template>

<script lang="ts" setup>
import ComDrawerB from '@/components/drawer/ComDrawerB.vue';
import Detail from './Detail.vue';
import Modify from './Modify.vue';
import { ACTION, PROVIDE_KEY } from '../../constant.ts';
import { computed, useAttrs, inject, Ref, ref, watch } from 'vue';
import { IActionData } from '../../type.ts';
import { useAutoLoading } from '@/common/hooks/useAutoLoading.ts';

const emits = defineEmits(['action']);
const attrs = useAttrs();
const show = computed(() => !!attrs.show);
const currentAction = inject(PROVIDE_KEY.currentAction) as Ref<IActionData>; // inject
const isDetail = computed(() => currentAction.value.action === ACTION.DETAIL);
const isModify = computed(
  () => currentAction.value.action === ACTION.EDIT || currentAction.value.action === ACTION.ADD
);
const modifyRef = ref();
const [submitLoading, wrapFn] = useAutoLoading(false, 0);

function handleSubmit() {
  wrapFn(modifyRef.value?.handleSubmit())
    .then(() => {
      handleSubmitted();
    })
    .catch(() => {});
}

function handleSubmitted() {
  emits('action', { action: ACTION.SEARCH });
  handleClose();
}

function handleClose() {
  emits('update:show' as any, false); // any-屏蔽组件内透传的emit类型
}

watch(
  () => show.value,
  (val) => {
    if (!val) submitLoading.value = false;
  }
);

defineOptions({ name: 'DemoAsideIndex' });
</script>

<style module lang="scss"></style>
