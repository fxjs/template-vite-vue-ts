export const enum PROVIDE_KEY {
  currentAction = 'currentAction',
}

export const enum ACTION {
  SEARCH = 'SEARCH',
  ADD = 'ADD',
  DETAIL = 'DETAIL',
  EXPORT = 'EXPORT', // 导出
  IMPORT = 'IMPORT', // 导入
  DOWNLOAD = 'DOWNLOAD', // 模板下载
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export const ACTION_LABEL: { [key in ACTION]: string } = {
  [ACTION.SEARCH]: '查询',
  [ACTION.ADD]: '新增',
  [ACTION.DETAIL]: '详情',
  [ACTION.EXPORT]: '导出',
  [ACTION.IMPORT]: '导入',
  [ACTION.DOWNLOAD]: '模板下载',
  [ACTION.EDIT]: '编辑',
  [ACTION.DELETE]: '删除',
};
