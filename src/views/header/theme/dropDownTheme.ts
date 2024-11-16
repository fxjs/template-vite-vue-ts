/**
 * 组件主题
 */
import { DropdownProps } from 'naive-ui';

type DropDownThemeOverrides = NonNullable<DropdownProps['themeOverrides']>;
export const dropDownTheme = (color = '#235d96'): DropDownThemeOverrides => {
  return {
    // color,
    padding: '5px 2px',
  };
};
