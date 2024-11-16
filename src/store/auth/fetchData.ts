import { ILoginRes } from '@/store/auth/type.ts';
import { IObj } from '@/types';
import { api } from '@/api';
import { $http } from '@tanzerfe/http';

export function postLogin(data: IObj<any>) {
  const url = api.getUrl(api.type.demo, api.name.demo.login);

  return $http.post<ILoginRes>(url, {
    data: {
      _cfg: {
        noAuth: true,
        showTip: true,
      },
      ...data,
    },
  });
}

export function postLogout(userId: string) {
  const url = api.getUrl(api.type.demo, api.name.demo.logout, { userId });

  return $http.post<ILoginRes>(url, {
    data: {
      _cfg: {
        showTip: true,
      },
    },
  });
}
