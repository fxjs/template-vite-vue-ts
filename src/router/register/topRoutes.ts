/**
 * 顶级路由(实例挂载时注册) - 路由表
 */
import MainLayout from '@/layouts/MainLayout.vue';
import Error404 from '@/views/error/ErrorPage.vue';
import Error403 from '@/views/error/ErrorPage403.vue';
import { RouteRecordRaw } from 'vue-router';

export const topRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'topRoute',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'homeIndex',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'demo',
        name: 'demo',
        children: [
          {
            path: 'demo-table',
            name: 'demoTable',
            component: () => import('@/views/demo-table/index.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/403',
    name: 'ERROR_403',
    component: Error403,
    meta: { noAuth: true },
  },
];

export const ROUTE_NAME = {
  ERROR_404: 'ERROR_404',
};

export const ERROR_404_ROUTE = {
  path: '/:catchAll(.*)*',
  name: ROUTE_NAME.ERROR_404,
  component: Error404,
  meta: { title: '404' },
};
