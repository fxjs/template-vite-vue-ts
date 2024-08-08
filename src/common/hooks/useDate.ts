import { dayjs } from '@/utils/dayjs';

type dateRange = [string, string];

type timeUnit = 'year' | 'month' | 'day';

/*
 * 获取时间日期范围
 * @param timeSpace {number}
 * @param type { year | month | day }
 * @param hasTime { boolean }
 */
function useYMDRange(timeSpace: number): dateRange;
function useYMDRange(timeSpace: number, type: timeUnit): dateRange;
function useYMDRange(timeSpace: number, hasTime: boolean): dateRange;
function useYMDRange(timeSpace: number, type: timeUnit, hasTime: boolean): dateRange;

function useYMDRange(timeSpace: number, typeOrhasTime: timeUnit | boolean = 'day', hasTime = false): dateRange {
  let range_s: dayjs.ConfigType = '';
  let range_e: dayjs.ConfigType = '';

  let type: timeUnit = 'day';
  if (typeof typeOrhasTime === 'boolean') {
    hasTime = typeOrhasTime;
  } else {
    type = typeOrhasTime;
  }

  if (timeSpace > 0) {
    range_s = dayjs();
    range_e = dayjs().add(timeSpace, type);
  } else {
    range_s = dayjs().add(timeSpace, type);
    range_e = dayjs();
  }

  return [
    hasTime ? range_s.format('YYYY-MM-DD 00:00:00') : range_s.format('YYYY-MM-DD'),
    hasTime ? range_e.format('YYYY-MM-DD 23:59:59') : range_e.format('YYYY-MM-DD'),
  ];
}

/*
 * 日期拼接时分秒
 * @param YMD {string}
 * @param isStart { boolean }
 */
function useYMDJoinTime(YMD: string, isStart = true) {
  const _time = isStart ? ' 00:00:00' : ' 23:59:59';
  const YMDTime = YMD ? YMD + _time : '';
  return YMDTime;
}

export { useYMDRange, useYMDJoinTime };
