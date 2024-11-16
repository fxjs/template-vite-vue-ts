/**
 * 解析 import.meta.glob
 * @param data
 */
export function useMetaGlobEager(data: Record<string, any>) {
  const temp: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) {
    // 提取文件名（不带扩展名）
    const match = k.match(/\/([^/]+)\.[^/.]+$/);
    const _k = match ? match[1] : '';
    temp[_k] = v.default;
  }
  return temp;
}
