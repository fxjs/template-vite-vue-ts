import router from '@/router';
import { ERROR_404_ROUTE } from '@/router/register/topRoutes';
import { getPermsRouteList } from '@/router/register/dynamicRoutes';

/**
 * 按权限注册
 */
export async function registerDynamicRoute() {
  const arr = await getPermsRouteList();
  return new Promise<any[]>((resolve) => {
    // for (const route of arr) {
    //   // 添加动态路由
    //   router.addRoute('mountDynamicRoute', route);
    // }
    // 404最后添加
    router.addRoute(ERROR_404_ROUTE);
    resolve(arr);
  });
}
