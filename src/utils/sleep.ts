/**
 * 延迟函数
 * @param t 毫秒
 */
export function sleep(t: number) {
  return new Promise((resolve) => setTimeout(resolve, t));
}
