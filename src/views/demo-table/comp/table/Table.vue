<template>
  <n-data-table
    class="h-full"
    remote
    striped
    :columns="columns"
    :data="tableData"
    :bordered="false"
    :flex-height="true"
    :pagination="pagination"
    :loading="loading"
    :render-cell="useEmptyCell"
  />
</template>

<script lang="ts" setup>
import { $dialog } from '@/common/shareContext';
import { ACTION } from '../../constant.ts';
import { cols } from './columns.ts';
import { DataTableColumns, NButton } from 'naive-ui';
import { IObj } from '@/types';
import { IPageItem } from '../../type.ts';
import { pageList, postDelete } from '../../fetchData.ts';
import { useActionDivider } from '@/common/hooks/useActionDivider.ts';
import { useAutoLoading } from '@/common/hooks/useAutoLoading.ts';
import { useEmptyCell } from '@/common/hooks/useEmptyCell.ts';
import { useNaivePagination } from '@/common/hooks/useNaivePagination.ts';
import { VNode, ref, toRaw, h } from 'vue';

const emits = defineEmits(['action']);

const [loading, search] = useAutoLoading(true);
const columns = ref<DataTableColumns>([]);
const tableData = ref<IPageItem[]>([]);
const { pagination, updateTotal } = useNaivePagination(getTableData);

let filterData: IObj<any> = {}; // 搜索条件

function getTableData() {
  const params = {
    pageNo: pagination.page,
    pageSize: pagination.pageSize,
    ...filterData,
  };

  search(pageList(params)).then((res) => {
    tableData.value = res.data.rows || [];
    updateTotal(res.data.total || 0);
  });
}

function getTableDataWrap(data: IObj<any>) {
  filterData = Object.assign({}, data) || {};
  pagination.page = 1;
  getTableData();
}

function setColumns() {
  columns.value.push(...cols);

  // 添加操作栏 action
  columns.value.push({
    title: '操作',
    key: 'actions',
    width: 240,
    align: 'center',
    render(row) {
      return getActionBtn(row);
    },
  });
}

function getActionBtn(row: any) {
  const status = Number(row.userStatus);
  const acList: [VNode, boolean?][] = [
    [
      h(
        NButton,
        {
          text: true,
          class: 'com-action-button',
          onClick: () => emits('action', { action: ACTION.DETAIL, data: toRaw(row) }),
        },
        { default: () => '详情' }
      ),
    ],
    [
      h(
        NButton,
        {
          text: true,
          class: 'com-action-button',
          onClick: () => emits('action', { action: ACTION.EDIT, data: toRaw(row) }),
        },
        { default: () => '编辑' }
      ),
    ],
    [
      h(
        NButton,
        {
          text: true,
          class: 'com-action-button',
          onClick: () => deleteData(row),
        },
        { default: () => '删除' }
      ),
    ],
  ];

  return useActionDivider(acList);
}

// 删除
function deleteData(row: IObj<any>) {
  $dialog.error({
    title: '删除',
    content: '确认删除后，该数据无法恢复！',
    positiveText: '确定',
    onPositiveClick: async () => {
      postDelete({ id: row.id }).then(() => {
        getTableData();
      });
    },
  });
}

// on created
setColumns();

defineExpose({
  getTableDataWrap,
  getTableData,
});

defineOptions({ name: 'DemoTable' });
</script>

<style module lang="scss"></style>
