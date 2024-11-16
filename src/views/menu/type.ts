import { MenuOption } from 'naive-ui';
import { VNodeChild } from 'vue';

export interface IMenu extends Omit<MenuOption, 'icon'> {
  icon?: string | (() => VNodeChild);
  key?: string; // 一般同路由名称（注意相同路由名对应多个tab的场景，需拼接固定参数?tab=xxx用于区分）
  routeName?: string; // 路由名称
  routeQuery?: string; // 路由参数
}
