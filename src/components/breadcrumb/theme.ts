import { BreadcrumbProps } from 'naive-ui';

type BreadcrumbThemeOverrides = NonNullable<BreadcrumbProps['themeOverrides']>;
const breadcrumbTheme: BreadcrumbThemeOverrides = {
  fontSize: '16px',
  itemLineHeight: '37px',
  itemTextColor: 'var(--skin-t6)',
  itemTextColorHover: 'var(--skin-t3)',
  itemTextColorPressed: 'var(--skin-t3)',
  itemColorPressed: 'var(--skin-t3)',
  itemTextColorActive: 'var(--skin-t3)',
  separatorColor: 'var(--skin-t6)',
};

export default breadcrumbTheme;
