// global style
import '@/css/index.scss';

/**
 * 在 app 挂载之前动态的插入 meta 标签
 */
function useNaiveUIStyle() {
  const meta = document.createElement('meta');

  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);
}
export function setupAssets() {
  useNaiveUIStyle();
}
