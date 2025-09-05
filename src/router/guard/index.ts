import type { Router } from 'vue-router';
import useMndCtx from '@/common/shareContext/useMndCtx.ts';
import { APP_CONFIG } from '@/app.config.ts';
import { initialRoutes } from '@/router';
import { MessageReactive } from 'naive-ui/es/message/src/MessageProvider';
import { registerDynamicRoute } from '@/router/register';
import { sleep } from '@/utils/time.ts';
import { topRoutes as baseArr } from '@/router/register/topRoutes';
import { useAuthStore } from '@/store/auth';
import { usePermsStore } from '@/store/perms';

export function setupRouterGuard(router: Router) {
  createPageGuard(router);
}

export function resetRoutes(router: Router) {
  const arr = router.getRoutes();
  const initialRouteNamesArr = initialRoutes.map((item) => item.name);

  for (const item of arr) {
    const name = item.name;

    // 不在初始路由表内 则删除
    if (!initialRouteNamesArr.includes(name)) {
      name && router.removeRoute(name);
    }
  }
}

/**
 * 页面路由权限
 * @param router
 */
export function createPageGuard(router: Router) {
  let updaterLoadingInst: MessageReactive | undefined;
  let updaterTimer: unknown;

  router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    const isLogin = auth.isLogin;

    if (window.$sysUpdater?.hasNewVer && !updaterLoadingInst) {
      // 开始 loadingBar
      useMndCtx().loadingBar.start();
      // 显示升级 loading
      updaterLoadingInst = useMndCtx().message.loading(window.$sysUpdater.updateVerTip, { duration: 0 });
    }

    // meta支持配置非授权页 { noAuth: true }
    if (to.meta?.noAuth) {
      return next();
    }

    if (!isLogin) {
      if (to.name !== 'login') {
        if (APP_CONFIG.useLoginPage) {
          next({ name: 'login' });
        } else {
          next();
        }
      } else {
        if (from.name && from.name !== 'login') {
          window.location.reload();
        } else {
          next();
        }
      }
    } else {
      const permsStore = usePermsStore();
      const { isDynamicRouteLoaded } = permsStore;
      if (isDynamicRouteLoaded) {
        next();
      } else {
        resetRoutes(router); // 重置为初始路由

        const asyncArr = await registerDynamicRoute();

        permsStore.isDynamicRouteLoaded = true;
        permsStore.asyncRoutes = [...baseArr, ...asyncArr];
        next({ ...to, replace: true });
      }
    }
  });

  router.afterEach((to) => {
    if (window.$sysUpdater?.hasNewVer && !updaterTimer) {
      document.title = window.$sysUpdater.updateVerTip;
      updaterTimer = setTimeout(async () => {
        // 结束 loadingBar
        useMndCtx().loadingBar.finish();
        await sleep(1000);
        window.location.reload();
        updaterLoadingInst?.destroy();
        updaterLoadingInst = undefined;
        updaterTimer = undefined;
      }, 5000);
    }
    // 设置document title: useTitle(to.meta.title);
  });
}
