/**
 * 校验文本框 （始终返回布尔值）
 * @param value
 * @return boolean
 */

/**
 * 仅支持数字
 */
export function onlyAllowNumber(value: string) {
  return !value || /^\d+$/.test(value);
}

/**
 * 数字+小数
 * @param value
 * @param digit 限制小数位数
 * @return boolean
 */
export function decimal(value: string, digit = 4) {
  // return !value || /^\d*(?:\.\d{0,4})?$/.test(value); // 限制最多4位小数
  const re = new RegExp(`^\\d*(?:\\.\\d{0,${digit}\})?$`);
  return !value || re.test(value);
}

/**
 * 限制前后空格
 */
export function trim(value: string) {
  return !value.startsWith(' ') && !value.endsWith(' ');
}

/**
 * 正则匹配手机号码 - 新
 * @param value
 */
export function isMobilePhone(value: string) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
 *新密码至少包含大写字母、小写字母、数字、特殊符号中任意3种以上
 * @param value
 * @param
 * @return boolean
 */
export function anyThreeSymbols(value: string) {
  const re =
    /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]*$/;
  return !value || re.test(value);
}

/**
 * 校验经纬度
 */
export function validateJwd(data: { lng?: number; lat?: number; dqjd?: number; dqwd?: number }) {
  const { lng, lat, dqjd, dqwd } = data || {};
  const x = lng || dqjd;
  const y = lat || dqwd;

  return x && y && x !== -1 && y !== -1;
}
