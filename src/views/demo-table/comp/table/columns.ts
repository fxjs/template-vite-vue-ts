import { DataTableColumn } from 'naive-ui';

export const cols: DataTableColumn[] = [
  {
    title: '序号',
    key: 'index',
    align: 'center',
    width: 65,
    render: (_: any, index: number) => {
      return index + 1;
    },
  },
  {
    title: '单位名称',
    key: 'dwmc',
    align: 'center',
    ellipsis: { tooltip: true, lineClamp: 2 },
  },
  {
    title: '单位地址',
    key: 'dwdz',
    align: 'center',
    ellipsis: { tooltip: true, lineClamp: 2 },
  },
  {
    title: '行政区划',
    key: 'xzqh',
    align: 'center',
    ellipsis: { tooltip: true, lineClamp: 2 },
  },
  {
    title: '检查情况',
    key: 'jcqk',
    align: 'center',
  },
  {
    title: '检查日期',
    key: 'jcrq',
    align: 'center',
  },
  {
    title: '检查单位',
    key: 'jcdwmc',
    align: 'center',
    ellipsis: { tooltip: true, lineClamp: 2 },
  },
  {
    title: '检查结果',
    key: 'jcjg',
    align: 'center',
  },
  {
    title: '更新时间',
    key: 'gxsj',
    align: 'center',
    width: 200,
  },
];
