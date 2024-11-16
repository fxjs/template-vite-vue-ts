import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import routes from './routes';
import { setupRouterGuard } from '@/router/guard';

const Router = createRouter({
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
  routes,
  history: createWebHashHistory(),
});

export const initialRoutes: RouteRecordRaw[] = Router.getRoutes();

setupRouterGuard(Router);

export default Router;
