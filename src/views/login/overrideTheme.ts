/**
 * 组件主题
 */
import { FormProps, TabsProps, CheckboxProps } from 'naive-ui';

type FormThemeOverrides = NonNullable<FormProps['themeOverrides']>;
export const overrideFormTheme = (): FormThemeOverrides => {
  return {
    peers: {},
  };
};

type TabsThemeOverrides = NonNullable<TabsProps['themeOverrides']>;
export const overrideTabsTheme = (): TabsThemeOverrides => {
  return {
    tabTextColorBar: '#b1b1b1',
    tabTextColorActiveBar: '#fff',
    tabTextColorHoverBar: '#fff',
    barColor: '#fff',
  };
};

type CheckboxThemeOverrides = NonNullable<CheckboxProps['themeOverrides']>;
export const overrideCheckboxTheme = (): CheckboxThemeOverrides => {
  return {
    checkMarkColor: '#fff',
  };
};
