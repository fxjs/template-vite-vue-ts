/**
 * 组合路径 去掉多余的斜杠
 * @param paths
 */
export function resolvePath(...paths: string[]): string {
  let str = paths.join('/');

  str = str.replace(/([^:])\/+/g, '$1/');

  return str;
}
