<template>
  <div class="com-g-row-a1">
    <ComBread :data="breadData" />

    <div class="com-g-row-a1 gap-y-[20px]">
      <filter-comp class="com-table-filter" @action="actionFn" />
      <table-comp class="com-table-container" ref="tableCompRef" @action="actionFn" />
    </div>

    <!-- aside -->
    <AsideComp v-model:show="isShowAside" :title="actionLabel" @action="actionFn" />
  </div>
</template>

<script lang="ts" setup>
import AsideComp from './comp/aside/index.vue';
import ComBread from '@/components/breadcrumb/ComBread.vue';
import FilterComp from './comp/Filter.vue';
import TableComp from './comp/table/Table.vue';
import { ACTION, ACTION_LABEL, PROVIDE_KEY } from './constant.ts';
import { computed, provide, Ref, ref } from 'vue';
import { IActionData } from './type.ts';
import { type IBreadData, IObj } from '@/types';

const breadData: IBreadData[] = [{ name: '菜单1' }, { name: '菜单2' }];
const actionLabel = computed(() => ACTION_LABEL[currentAction.value.action]);
const currentAction = ref<IActionData>({ action: ACTION.ADD, data: {} });
const isShowAside = ref(false);
const tableCompRef = ref();

// provide
provide<Ref<IActionData>>(PROVIDE_KEY.currentAction, currentAction);

function actionFn(val: IActionData) {
  currentAction.value = val;

  if (val.action === ACTION.SEARCH) {
    handleSearch(val.data);
  } else if ([ACTION.DETAIL, ACTION.EDIT, ACTION.ADD].includes(val.action)) {
    isShowAside.value = true;
  }
}

function handleSearch(data?: IObj<any>) {
  if (data) {
    tableCompRef.value?.getTableDataWrap(data);
  } else {
    tableCompRef.value?.getTableData();
  }
}

defineOptions({ name: 'DemoIndex' });
</script>

<style module lang="scss"></style>
