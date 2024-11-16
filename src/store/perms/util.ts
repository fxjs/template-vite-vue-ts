import type { IGetMenusByUserIdRes, IMenu, IPermItem } from './type';
import { emptyable } from '@/types';

/**
 * 取所有权限表
 * @param arr
 */
export function getPermsList(arr: IGetMenusByUserIdRes): IPermItem {
  return arr.map((item: any) => item.perms);
}

/**
 * 取所有菜单
 * @param arr
 */
export function getMenuList(arr: IGetMenusByUserIdRes): IGetMenusByUserIdRes {
  const ret = arr.filter((item) => item.menuType === 'M' && item.visible === '0');
  ret.sort((a, b) => +a.orderNum - +b.orderNum);

  for (const item of ret) {
    const temp = getChildByPid(arr, item.menuId);
    temp.sort((a, b) => +a.orderNum - +b.orderNum);
    item.childMenu = temp;
  }

  return ret;
}

/**
 * 获取一级子节点
 * @param arr
 * @param pid
 * @param visible '0'显示 '1'隐藏
 */
function getChildByPid(arr: IGetMenusByUserIdRes, pid: string, visible = '0') {
  return arr.filter((item) => item.parentId === pid && item.visible === visible);
}

/**
 * 通过属性获取节点
 * @param arr
 * @param propVal
 * @param propKey
 */
export function getMenuByProp(arr: IGetMenusByUserIdRes, propVal: any, propKey = 'menuId'): IMenu | undefined {
  const items = arr.filter((item: any) => item[propKey] === propVal);

  return items[0];
}

/**
 * 获取顶层节点
 * @param arr
 * @param propVal
 * @param propKey
 */
export function getTopMenuByProp(arr: IGetMenusByUserIdRes, propVal: string, propKey = 'menuId'): emptyable<IMenu> {
  let topMenu = getMenuByProp(arr, propVal, propKey);
  if (!topMenu) return {};

  while (topMenu.parentId) {
    const parentMenu = getMenuByProp(arr, topMenu.parentId);
    if (!parentMenu) break;
    topMenu = parentMenu;
  }

  return topMenu || {};
}
