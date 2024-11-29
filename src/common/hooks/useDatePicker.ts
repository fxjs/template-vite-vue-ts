import {
  getCurrentDayRange,
  getCurrentMonthRange,
  getCurrentQuarterRange,
  getCurrentYearRange,
} from '@/utils/dayjsRange.ts';
import { Shortcuts } from 'naive-ui/es/date-picker/src/interface';

/**
 * 快捷日期范围
 */
export function useShortcutsDateRange() {
  const shortcuts: Shortcuts = {
    今日: () => getCurrentDayRange<number>(new Date(), true),
    本月: () => getCurrentMonthRange<number>(new Date(), true),
    本季度: () => getCurrentQuarterRange<number>(new Date(), true),
    本年: () => getCurrentYearRange<number>(new Date(), true),
  };

  function shortcutsFilter(rs: string[]): Shortcuts {
    return rs.reduce((filtered, s) => {
      if (s in shortcuts) {
        filtered[s] = shortcuts[s];
      }
      return filtered;
    }, {} as Shortcuts);
  }

  return {
    shortcuts,
    shortcutsFilter,
  };
}
