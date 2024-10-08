import { throttle, debounce, ThrottleSettings, DebounceSettings } from 'lodash-es';

/**
 * 节流函数装饰器
 * @param {number} wait 节流的毫秒
 * @param {object} options 节流选项的配置
 * @inner [options.leading=true] {boolean}: 指定调用在节流开始前调用
 * @inner [options.trailing=true] {boolean}: 指定调用在节流结束后调用
 */
function DThrottle(wait?: number, options?: ThrottleSettings) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    // 重写函数
    descriptor.value = throttle(descriptor.value, wait, options);
  };
}
/**
 * 防抖函数装饰器
 * @param {number} wait 防抖的毫秒
 * @param {object} options 防抖选项的配置
 * @inner [options.leading=true] {boolean}: 指定调用在延迟开始前调用
 * @inner [options.trailing=true] {boolean}: 指定调用在延迟结束后调用
 * @inner [options.maxWait] {number}: 设置func允许被延迟的最大值
 */
function DDebounce(wait?: number, options?: DebounceSettings) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    // 重写函数
    descriptor.value = debounce(descriptor.value, wait, options);
  };
}

export { DThrottle, DDebounce };
