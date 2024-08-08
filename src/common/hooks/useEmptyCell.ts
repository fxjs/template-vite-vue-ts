import { h } from 'vue';

/**
 * 表格空数据单元格渲染为 “--”
 * @param value {any}
 * @param rowData {object}
 * @param column {object} DataTableBaseColumn
 * @return VNodeChild
 */
export function useEmptyCell(value: any, rowData: any, column: any) {
  if (value === '') {
    return h('span', null, { default: () => '--' });
  }
  return value;
}
