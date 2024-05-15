/**
 * 组件主题
 */
import { EmptyProps } from 'naive-ui';
import { themeLightExtra } from '@/theme/settings/themeJson';

type EmptyThemeOverrides = NonNullable<EmptyProps['themeOverrides']>;

export const overrideEmptyTheme = (): EmptyThemeOverrides => {
  return {
    ...themeLightExtra.EmptyLarge,
  };
};
