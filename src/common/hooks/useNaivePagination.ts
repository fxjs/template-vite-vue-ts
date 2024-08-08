import { reactive, defineComponent, h } from 'vue';
import { NPagination } from 'naive-ui';
import type { PaginationProps } from 'naive-ui';

export function useNaivePagination(queryHandle: (page: number, pageSize: number | undefined) => void, option?: any) {
  const pagination: PaginationProps = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 30, 40],
    showQuickJumper: true,
    onUpdatePage: (page: number) => {
      pagination.page = page;
      queryHandle(page, pagination.pageSize);
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize;
      pagination.page = 1;
      queryHandle(pagination.page, pageSize);
    },
    prefix({ itemCount }: any) {
      return `共 ${itemCount} 条`;
    },
    ...option,
  });
  function updateTotal(total: number) {
    pagination.itemCount = total;
  }
  function resetUpdate() {
    pagination.pageSize = option?.pageSize || 10;
    pagination.page = 1;
    queryHandle(pagination.page, pagination.pageSize);
  }
  return {
    pagination,
    updateTotal,
    resetUpdate,
  };
}

export function useNPaginationComp(pagination: any) {
  return defineComponent(() => {
    return () => {
      return h(NPagination, {
        ...pagination,
      });
    };
  });
}
