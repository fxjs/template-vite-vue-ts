import { defineStore } from 'pinia';
// import { getMenuList, getPermsList } from './util';
import { IMenu, IPermItem } from './type';
import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/auth';

export const usePermsStore = defineStore('perms-store', {
  state: () => ({
    permsList: [] as IPermItem, // 权限配置表
    dataList: [] as IMenu[], // 全量数据
    menuList: [] as IMenu[], // menuType:M 目录菜单
    routeList: [], // C 权限路由
    actionList: [], // F 操作按钮

    asyncRoutes: [] as RouteRecordRaw[], // 所有异步路由
    isDynamicRouteLoaded: false, // 动态路由加载完成
  }),
  actions: {
    async getPermsList() {
      const { userInfo } = useAuthStore();

      return new Promise((resolve) => {
        if (this.permsList.length) {
          resolve(this.permsList);
        } else {
          // 不需要权限 ->
          resolve([]);
          // <-
          // 需要权限请与后端对接 实现以下功能

          // const url = $api.getUrl($api.type.pcms, $api.name.pcms.getMenusByUserId, {
          //   userId: userInfo.userId,
          // });
          //
          // $http
          //   .get<IGetMenusByUserIdRes>(url, { data: { _cfg: { showTip: true } } })
          //   .then((res) => {
          //     const data = res.data || [];
          //
          //     const permsList = getPermsList(data);
          //     // 调试代码 ->
          //     // permsList = getPermsList(pageList);
          //     // <-
          //     this.permsList = permsList;
          //     this.dataList = data;
          //     this.menuList = getMenuList(data);
          //     resolve(permsList);
          //   })
          //   .catch(() => {
          //     resolve([]);
          //   });
        }
      });
    },
  },
});
