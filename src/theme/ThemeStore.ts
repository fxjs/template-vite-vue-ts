import { LS } from '@/utils/storages';
import { ref, Ref } from 'vue';
import pkg from '../../package.json';

class ThemeStore {
  private cacheKey = `THEME_${pkg.name.toUpperCase().replace(/-/g, '_')}`;
  themeRef: Ref<ThemeConfig> = ref(new ThemeConfig());

  constructor() {
    const initialConfig = <ThemeConfig>LS.get(this.cacheKey) || new ThemeConfig();
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

  toggleTheme() {
    const val = this.themeConfig;
    if (val.isFollowSystem) {
      this.useSystemTheme();
    } else {
      val.theme = val.theme === 'light' ? 'dark' : 'light';
      this.themeConfig = val;
    }
  }

  useSystemTheme() {
    const val = this.themeConfig;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    val.theme = mediaQuery.matches ? 'light' : 'dark';
    val.isFollowSystem = true;
    this.themeConfig = val;
  }

  reset() {
    this.themeConfig = new ThemeConfig();
  }

  private initSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.onchange = () => this.useSystemTheme();
  }
}

class ThemeConfig {
  theme: 'dark' | 'light' = 'dark';
  isFollowSystem = false;
}

export const themeStore = new ThemeStore();
