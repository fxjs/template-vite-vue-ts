import pkg from '../../../package.json';
import type { IAuthState } from './type';
import { defineStore } from 'pinia';
import { IObj } from '@/types';
import router from '@/router';
import { postLogin, postLogout } from '@/store/auth/fetchData.ts';

export const useAuthStore = defineStore(`${pkg.name}-store`, {
  persist: true,
  state: (): IAuthState => ({
    userInfo: {
      token: '',
    },
  }),
  getters: {
    // 登录状态
    isLogin(state) {
      return Boolean(state.userInfo.token);
    },
  },
  actions: {
    async login(data: IObj<any>) {
      const res = await postLogin(data);

      this.userInfo = res.data;
      await router.push({ name: 'homeIndex' });
    },
    async logout(opt?: any) {
      const userId = this.userInfo.userId + '';

      // useMndCtx().loadingBar.start();
      postLogout(userId).finally(async () => {
        try {
          await router.push({ name: 'login' });
          // useMndCtx().loadingBar.finish();
        } catch (e) {}
      });
      this.reset();
    },
    reset() {
      this.$reset();
    },
  },
});
