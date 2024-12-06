import { LS } from '@/utils/storages';
import { ref, Ref } from 'vue';
import pkg from '../../package.json';

class ThemeStore {
  private cacheKey = `THEME_${pkg.name.toUpperCase().replace(/-/g, '_')}`;
  themeRef: Ref<ThemeConfig> = ref(new ThemeConfig());

  constructor() {
    const force = window.$SYS_CFG.forceTheme;
    const initialConfig = force ? new ThemeConfig() : <ThemeConfig>LS.get(this.cacheKey) || new ThemeConfig();
    this.themeRef.value = initialConfig;
    this.themeConfig = initialConfig;
    this.initSystemThemeListener();
  }

  get themeConfig(): ThemeConfig {
    return <ThemeConfig>LS.get(this.cacheKey) || this.themeRef.value;
  }

  set themeConfig(val: ThemeConfig) {
    const nv = Object.assign({}, val);
    LS.set(this.cacheKey, nv);
    this.themeRef.value = nv;
    // document.documentElement.dataset.theme = nv.theme;
    document.documentElement.setAttribute('class', nv.theme);
  }

  toggleTheme(theme?: 'light' | 'dark' | 'auto') {
    const val = this.themeConfig;

    if (theme === 'auto') {
      this.setThemeAuto();
    } else {
      val.isFollowSystem = false; // 手动切换 强制退出"自动"模式
      val.theme = theme || (val.theme === 'light' ? 'dark' : 'light');
      this.themeConfig = val;
    }
  }

  useSystemTheme() {
    const val = this.themeConfig;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    val.theme = mediaQuery.matches ? 'light' : 'dark';
    this.themeConfig = val;
  }

  /**
   * 设置跟随系统主题自动切换
   */
  setThemeAuto() {
    this.themeConfig = Object.assign(this.themeConfig, { isFollowSystem: true });
    this.useSystemTheme();
  }

  reset() {
    this.themeConfig = new ThemeConfig();
  }

  private initSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const applySystemTheme = () => {
      if (this.themeConfig.isFollowSystem) {
        this.useSystemTheme();
      }
    };

    // Initialize theme based on system setting
    applySystemTheme();
    // Listen for changes in system theme and apply if necessary
    mediaQuery.onchange = applySystemTheme;
  }
}

class ThemeConfig {
  theme: 'dark' | 'light' = window.$SYS_CFG.defaultTheme;
  isFollowSystem = false;
}

export const themeStore = new ThemeStore();
