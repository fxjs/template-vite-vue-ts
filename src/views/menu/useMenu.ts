import { IObj } from '@/types';
import type { IMenu } from '@/views/menu/type';
import { MenuOption, NIcon } from 'naive-ui';
import { h, ref, watch } from 'vue';
import { type LocationQueryRaw, useRouter } from 'vue-router';
import * as IconMap from './assets/icon';
import { menuDataList } from './menu';

export function useMenu() {
  const router = useRouter();
  const rName = router.currentRoute.value.name as string;
  const rQuery = router.currentRoute.value.query;
  const rMeta = router.currentRoute.value.meta;
  const activeKey = ref(addTabParamToNameIfPresent(rName, rQuery, rMeta));

  const menuList = transMenuList(menuDataList);

  function handleUpdateValue(key: string, item: MenuOption) {
    activeKey.value = key;

    if (typeof item.routeName === 'string' && item.routeName) {
      const { routeName, routeQuery } = item;
      const name = processName(routeName);
      const query = routeQuery as LocationQueryRaw;

      router.push({ name, query });
    } else if (typeof item.url === 'string' && item.url) {
      window.open(item.url);
    }
  }

  watch(
    () => router.currentRoute.value,
    (val) => {
      if (val.name) {
        activeKey.value = addTabParamToNameIfPresent(<string>val.name, val.query, val.meta);
      }
    }
  );

  return { menuList, activeKey, handleUpdateValue };
}

// 转换menu列表数据 - 处理icon
function transMenuList(menus: IMenu[]) {
  return menus.map((menu) => {
    const menuOption = { ...menu };

    if (typeof menu.icon === 'string' && menu.icon) {
      menuOption.icon = renderMenuIcon(menu.icon);
    }

    if (menuOption.children) {
      const children = <IMenu[]>menuOption.children;
      menuOption.children = transMenuList(children);
    }

    return menuOption;
  });
}

function renderMenuIcon(k: string) {
  const iconKey = <keyof typeof IconMap>`icon_${k}`;
  const icon = IconMap[iconKey];

  return () =>
    h(NIcon, null, {
      default: () =>
        h(icon, {
          fontSize: '20px',
        }),
    });
}

function processName(name: string) {
  return name.replace(/\?.*$/, '');
}

/**
 * 还原tab参数
 * @param name
 * @param query
 * @param meta
 */
function addTabParamToNameIfPresent(name: string, query: LocationQueryRaw, meta: IObj<any>) {
  const tab = query.tab;
  const includeTab = meta?.includeTab;
  return tab && includeTab ? `${name}?tab=${tab}` : name;
}
