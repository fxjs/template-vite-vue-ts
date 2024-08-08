/**
 * 校验文本框 （始终返回布尔值）
 * @param value
 * @return boolean
 */

export function onlyAllowNumber(value: string) {
  return !value || /^\d+$/.test(value);
}

export function trim(value: string) {
  return !value.startsWith(' ') && !value.endsWith(' ');
}
