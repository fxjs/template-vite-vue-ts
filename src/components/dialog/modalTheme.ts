/**
 * 组件主题
 */
import { ModalProps } from 'naive-ui';

type ModalThemeOverrides = NonNullable<ModalProps['themeOverrides']>;

export const overrideModalTheme = (): ModalThemeOverrides => {
  return {
    peers: {
      Card: {
        paddingMedium: '20px 24px',
        borderRadius: '12px',
      },
      Dialog: {
        padding: '20px 24px',
        borderRadius: '12px',
      },
    },
  };
};
