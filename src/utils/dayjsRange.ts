import { dayjs } from '@/utils/dayjs.ts';

/**
 * 获取指定时间范围（年）的开始和结束时间
 * @param time {Date} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳（true 返回 getTime()，false 返回格式化字符串）
 * @returns {[T, T]} - 返回包含开始和结束时间的数组
 */
export function getCurrentYearRange<T extends number | string>(time: Date, returnTime = false): [T, T] {
  const start = dayStart(dayjs(time).startOf('year'), returnTime) as T;
  const end = dayEnd(dayjs(time).endOf('year'), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取指定时间范围（年）从开始到当前时间的范围
 * @param time {Date} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳（true 返回 getTime()，false 返回格式化字符串）
 * @returns {[T, T]} - 返回包含开始时间和当前时间的数组
 */
export function getCurrentYearRangeUntilNow<T extends number | string>(time: Date, returnTime = false): [T, T] {
  // 获取当年开始时间
  const start = dayStart(dayjs(time).startOf('year'), returnTime) as T;
  // 获取当前时间（作为结束时间）
  const end = dayEnd(dayjs(), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取指定时间范围（季度）的开始和结束时间
 * @param time {Date} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳
 * @returns {[T, T]} - 返回包含开始和结束时间的数组
 */
export function getCurrentQuarterRange<T extends number | string>(time: Date, returnTime = false): [T, T] {
  const start = dayStart(dayjs(time).startOf('quarter'), returnTime) as T;
  const end = dayEnd(dayjs(time).endOf('quarter'), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取指定时间范围（季度）从开始到当前时间的范围
 * @param time {Date} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳
 * @returns {[T, T]} - 返回包含开始时间和当前时间的数组
 */
export function getCurrentQuarterRangeUntilNow<T extends number | string>(time: Date, returnTime = false): [T, T] {
  // 获取当前季度的开始时间
  const start = dayStart(dayjs(time).startOf('quarter'), returnTime) as T;
  // 获取当前时间（作为结束时间）
  const end = dayEnd(dayjs(), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取指定时间范围（月）的开始和结束时间
 * @param time {Date} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳
 * @returns {[T, T]} - 返回包含开始和结束时间的数组
 */
export function getCurrentMonthRange<T extends number | string>(time: Date, returnTime = false): [T, T] {
  const start = dayStart(dayjs(time).startOf('month'), returnTime) as T;
  const end = dayEnd(dayjs(time).endOf('month'), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取指定时间范围（月）从开始到当前时间的范围
 * @param time {Date} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳
 * @returns {[T, T]} - 返回包含开始时间和当前时间的数组
 */
export function getCurrentMonthRangeUntilNow<T extends number | string>(time: Date, returnTime = false): [T, T] {
  // 获取当前月的开始时间
  const start = dayStart(dayjs(time).startOf('month'), returnTime) as T;
  // 获取当前时间（作为结束时间）
  const end = dayEnd(dayjs(), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取指定时间范围（本周）的开始和结束时间
 * @param time {Date} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳（true 返回 getTime()，false 返回格式化字符串）
 * @returns {[T, T]} - 返回包含本周开始和结束时间的数组
 */
export function getCurrentWeekRange<T extends number | string>(time: Date, returnTime = false): [T, T] {
  const start = dayStart(dayjs(time).startOf('week'), returnTime) as T;
  const end = dayEnd(dayjs(time).endOf('week'), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取指定时间范围（本周）从开始到当前时间的范围
 * @param time {Date} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳（true 返回 getTime()，false 返回格式化字符串）
 * @returns {[T, T]} - 返回包含本周开始时间和当前时间的数组
 */
export function getCurrentWeekRangeUntilNow<T extends number | string>(time: Date, returnTime = false): [T, T] {
  // 获取本周的开始时间
  const start = dayStart(dayjs(time).startOf('week'), returnTime) as T;
  // 获取当前时间（作为结束时间）
  const end = dayEnd(dayjs(), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取指定时间范围（日）的开始和结束时间
 * @param time {Date} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳（true 返回 getTime()，false 返回格式化字符串）
 * @returns {[T, T]} - 返回包含开始和结束时间的数组
 */
export function getCurrentDayRange<T extends number | string>(time: Date, returnTime = false): [T, T] {
  const start = dayStart(dayjs(time).startOf('day'), returnTime) as T;
  const end = dayEnd(dayjs(time).endOf('day'), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取最近N天的开始和结束时间
 * @param time {Date} - 输入的时间对象
 * @param days {number} - 最近N天的天数
 * @param returnTime {boolean} - 是否返回时间戳（true 返回 getTime()，false 返回格式化字符串）
 * @returns {[T, T]} - 返回包含最近N天开始和结束时间的数组
 */
export function getLastNDaysRange<T extends number | string>(time: Date, days: number, returnTime = false): [T, T] {
  const start = dayStart(
    dayjs(time)
      .subtract(days - 1, 'days')
      .startOf('day'),
    returnTime
  ) as T;
  const end = dayEnd(dayjs(time).endOf('day'), returnTime) as T;
  return [start, end] as [T, T];
}

/**
 * 获取指定日期的开始时间
 * @param time {dayjs.Dayjs} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳
 * @returns {number | string} - 返回格式化的开始时间或时间戳
 */
export function dayStart(time: dayjs.Dayjs, returnTime = false): number | string {
  const formatted = time.startOf('day').format('YYYY-MM-DD HH:mm:ss');
  return returnTime ? time.startOf('day').valueOf() : formatted;
}

/**
 * 获取指定日期的结束时间
 * @param time {dayjs.Dayjs} - 输入的时间对象
 * @param returnTime {boolean} - 是否返回时间戳
 * @returns {number | string} - 返回格式化的结束时间或时间戳
 */
export function dayEnd(time: dayjs.Dayjs, returnTime = false): number | string {
  const formatted = time.endOf('day').format('YYYY-MM-DD HH:mm:ss');
  return returnTime ? time.endOf('day').valueOf() : formatted;
}
