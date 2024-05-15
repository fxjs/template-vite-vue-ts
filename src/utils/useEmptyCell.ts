import { h } from 'vue';

/**
 * 表格空数据单元格渲染为 “--”
 * @param value {any}
 * @return VNodeChild
 */
export function useEmptyCell(value: any) {
  if (value === '') {
    return h('span', null, { default: () => '--' });
  }
  return value;
}
