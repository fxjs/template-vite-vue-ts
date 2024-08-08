import { computed, h, VNode } from 'vue';
import { NConfigProvider } from 'naive-ui';
import { naiveThemeOverrides } from '@/theme';
import { useCssVar } from '@vueuse/core';

const theme = naiveThemeOverrides();
const primaryColor = useCssVar('--skin-c1', document.documentElement);
const isDark = true;

export function useThemeRender() {
  function theme_h(...args: Parameters<typeof h>): VNode {
    return h(
      NConfigProvider,
      {
        themeOverrides: isDark ? theme.dark(primaryColor.value) : theme.light(primaryColor.value),
      },
      h(...args)
    );
  }

  return { theme_h };
}
