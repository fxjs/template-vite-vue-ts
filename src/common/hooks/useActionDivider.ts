import { h, VNode } from 'vue';
import { NDivider } from 'naive-ui';

/**
 * 操作栏应用分隔线
 * @param actions
 */
export function useActionDivider(actions: [VNode, boolean?][]) {
  const ret: VNode[] = [];
  const dividerEl = h(NDivider, {
    vertical: true,
    themeOverrides: {
      color: 'var(--skin-divide)',
    },
  });

  const allPermActions = actions.filter((item) => {
    return item[1] || item[1] === undefined; // 默认有权限
  });
  const len = allPermActions.length;

  for (let i = 0, len = allPermActions.length; i < len; i++) {
    const item = allPermActions[i][0];

    ret.push(item);

    // 加分隔线
    if (len > 1 && i !== len - 1) {
      ret.push(dividerEl);
    }
  }

  return ret;
}
