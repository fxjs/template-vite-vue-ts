import type { RouteRecordRaw } from 'vue-router';

/**
 * 所有受权限控制的动态路由
 * 父路由 name: baseHome
 */
const dynamicRoutes: any[] = [];

// 有权限的动态路由
const permsRouteList: RouteRecordRaw[] = [];

/**
 * 获取有权限的动态路由
 * path或path:childPath 如果在permsList权限表存在 则说明有权限
 */
export async function getPermsRouteList() {
  return [];
}

/**
 * 获取所有子路由
 * @param path 父路由路径
 */
export function getCurrentTabPermsRoutes(path: string) {
  for (const pRoute of permsRouteList) {
    if (path === pRoute.path) {
      return pRoute.children || [];
    }
  }

  return [];
}
