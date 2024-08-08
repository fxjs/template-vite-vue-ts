import {
  dayEnd,
  dayStart,
  getCurrentMonthEnd,
  getCurrentMonthStart,
  getCurrentYearEnd,
  getCurrentYearStart,
} from '@/utils/rangeTime';
import { Shortcuts } from 'naive-ui/es/date-picker/src/interface';

export function useDatePicker() {
  const shortcuts: Shortcuts = {
    今日: () => {
      const start = dayStart(new Date()) as string;
      const end = dayEnd(new Date()) as string;
      return [new Date(start).getTime(), new Date(end).getTime()];
    },
    本月: () => {
      const start = getCurrentMonthStart(new Date()) as string;
      const end = getCurrentMonthEnd(new Date()) as string;
      return [new Date(start).getTime(), new Date(end).getTime()];
    },
    本年: () => {
      const start = getCurrentYearStart(new Date()) as string;
      const end = getCurrentYearEnd(new Date()) as string;
      return [new Date(start).getTime(), new Date(end).getTime()];
    },
  };
  function shortcutsFilter(rs: string[]): Shortcuts {
    const shortcutsF: Shortcuts = {};
    rs.forEach((s) => {
      if (Object.keys(shortcuts).includes(s)) shortcutsF[s] = shortcuts[s];
    });
    return shortcutsF;
  }
  return {
    shortcuts,
    shortcutsFilter,
  };
}
