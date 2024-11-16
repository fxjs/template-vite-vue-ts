import { usePermsStore } from '@/store/perms/index';
import { getTopMenuByProp as _getTopMenuByProp } from '@/store/perms/util';
import { IObj } from '@/types';

/**
 * 权限判断
 */
export function usePerms() {
  const { permsList, dataList, menuList } = usePermsStore();

  /**
   * 获取权限
   * @param perms
   * @param fallback
   */
  function hasPerms(perms: string, fallback = false) {
    if (!perms) return fallback;

    return permsList.includes(perms);
  }

  /**
   * 通过路由meta获取权限 即将弃用（2023-06-20）
   * @param meta
   * @param type
   * @param fallback 未配置权限时默认权限
   * todo 权限对接后 fallback需要设置默认值为false
   */
  function hasPermsByMeta(meta: IObj<any>, type: string, fallback = true) {
    const perms = meta?.perms;
    const joinPerms = `${perms}:${type}`; // xxx(路由path):add

    if (!perms) return fallback;

    return hasPerms(joinPerms);
  }

  /**
   * 通过路由path获取权限 (相当于v-auth指令的js版)
   * @param path
   * @param type
   * @param fallback 未配置权限时默认权限
   */
  function hasPermsByPath(path: string, type: string, fallback = false) {
    // 过滤开头、结尾、以及路径中多余的斜线
    const regexA = /^\/+|\/+$/g;
    const regexB = /\/+/g;
    const perms = `${path}/${type}`.replace(regexA, '').replace(regexB, '/');

    return hasPerms(perms, fallback);
  }

  /**
   * 获取权限 - 按perms字段判断
   * @param perms 权限key
   * @return boolean
   */
  function hasPermsByPermsKey(perms: string) {
    return hasPerms(perms);
  }

  /**
   * 获取顶层菜单
   * @param val
   * @param key
   */
  function getTopMenuByProp(val: any, key?: string) {
    return _getTopMenuByProp(dataList, val, key);
  }

  return {
    hasPerms,
    hasPermsByMeta,
    hasPermsByPath,
    hasPermsByPermsKey,
    menuList,
    getTopMenuByProp,
  };
}
