import type { IMenu } from '@/views/menu/type';

/**
 * 菜单
 */
export const menuDataList: IMenu[] = [
  // {
  //   label: '首页',
  //   key: 'home', // 一般同路由名
  //   icon: 'sy', // 图标名
  //   routeName: 'home', // 路由名称
  // },
  {
    label: '示例模块',
    key: 'demo',
    icon: 'pzgl',
    children: [
      {
        label: '表格 CRUD',
        key: 'demoTable',
        routeName: 'demoTable',
      },
    ],
  },
];
