import type { GlobalThemeOverrides } from 'naive-ui';
import { ColorType, getThemeColors } from '../helpers';
import { getColorPalette } from '../utils/color';
import { themeDarkSetting, themeDarkJson, themeLightSetting, themeLightJson } from './themeJson';
import cloneDeep from 'lodash-es/cloneDeep';

/** 初始化主题配置 */
function initThemeSettings(isDarkTheme?: boolean, primaryColor?: string) {
  const it = isDarkTheme ? cloneDeep(themeDarkSetting) : cloneDeep(themeLightSetting);

  // 配置auto时根据主色自动匹配
  if (it.info === 'auto') {
    it.info = getColorPalette(it.primary, 7);
  }

  // 动态设置主色调
  if (primaryColor) {
    it.primary = primaryColor;
  }

  return it;
}

/** 获取naive的主题颜色 */
function getNaiveThemeOverrides(colors: Record<ColorType, string>, isDarkTheme?: boolean): GlobalThemeOverrides {
  const { primary, info, success, warning, error } = colors;

  const themeColors = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error],
  ]);

  const colorLoading = primary;
  const themeJson = isDarkTheme ? themeDarkJson : themeLightJson;

  return {
    common: {
      ...themeColors,
    },
    LoadingBar: {
      colorLoading,
    },
    ...themeJson,
  } as unknown as GlobalThemeOverrides;
}

/** naiveUI的主题配置 */
export function naiveThemeOverrides() {
  return {
    dark: (primaryColor?: string) => getNaiveThemeOverrides(initThemeSettings(true, primaryColor), true),
    light: (primaryColor?: string) => getNaiveThemeOverrides(initThemeSettings(false, primaryColor)),
  };
}
