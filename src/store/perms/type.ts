export type IPermItem = string[];

export interface IMenu {
  childMenu: any[];
  menuId: string;
  menuName: string;
  menuType: string;
  orderNum: number;
  parentId: string;
  parentName: string;
  perms: string;
  visible: string;
}

export type IGetMenusByUserIdRes = IMenu[];
