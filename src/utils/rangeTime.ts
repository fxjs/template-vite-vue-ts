export function dayStart(time: any) {
  const nowTimeDate = new Date(time);
  return parseTime(nowTimeDate.setHours(0, 0, 0, 0), '{y}-{m}-{d} {h}:{i}:{s}');
}

export function dayEnd(time: any) {
  const nowTimeDate = new Date(time);
  return parseTime(nowTimeDate.setHours(23, 59, 59, 999), '{y}-{m}-{d} {h}:{i}:{s}');
}

export function getCurrentMonthStart(time: any) {
  const date = time ? time : new Date();
  date.setDate(1);
  return dayStart(date);
}

export function getCurrentMonthEnd(time: any) {
  const date = time ? time : new Date();
  const currentMonth = date.getMonth();
  const nextMonth = currentMonth + 1;
  const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  const oneDay = 24 * 60 * 60 * 1000;
  // @ts-ignore
  return dayEnd(new Date(nextMonthFirstDay - oneDay));
}

export function getCurrentYearStart(date: any) {
  date = date ? date : new Date();
  date.setDate(1);
  date.setMonth(0);
  return dayStart(date);
}

export function getCurrentYearEnd(date: any) {
  date = date ? date : new Date();
  date.setFullYear(date.getFullYear() + 1); // 设置到明年
  date.setMonth(0); // 明年的0月，也就是对应到1月，是存在的哦，不是不存在的0
  date.setDate(0); // 明年的0日
  return dayEnd(date);
}

export function parseTime(time: any, pattern: string) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '');
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    // @ts-ignore
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}
