import { ConfigProviderProps, createDiscreteApi, darkTheme, DiscreteApi } from 'naive-ui';
import { computed } from 'vue';
import { themeStore } from '@/theme/ThemeStore';
import { naiveThemeOverrides } from '@/theme';

const theme = naiveThemeOverrides();

const configProviderPropsRef = computed<ConfigProviderProps>(() => {
  const isDark = themeStore.themeRef.value.theme == 'dark';

  return {
    theme: isDark ? darkTheme : undefined,
    themeOverrides: isDark ? theme.dark() : theme.light(),
  };
});

const mndCtxIns = createDiscreteApi(['message', 'notification', 'dialog', 'loadingBar'], {
  configProviderProps: configProviderPropsRef,
  messageProviderProps: {
    containerStyle: { top: '70px' },
  },
});

/**
 * 弹窗提示类API
 */
export default function useMndCtx(): DiscreteApi {
  return mndCtxIns as DiscreteApi;
}
