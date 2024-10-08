import _cloneDeep from 'lodash-es/cloneDeep';

/**
 * 移除树结构最后一级空数组
 * @param tree
 * @param childProp
 * @returns tree
 */
function _trimLastEmptyChild(tree: any[], childProp = 'child') {
  for (const item of tree) {
    const children = item[childProp] || [];
    if (children.length) {
      _trimLastEmptyChild(children, childProp);
    } else {
      delete item[childProp];
    }
  }
}
export function trimLastEmptyChild(tree: any[], childProp = 'child') {
  const _tree = _cloneDeep(tree);
  _trimLastEmptyChild(_tree, childProp);
  return _tree;
}

/**
 * 平铺树节点
 * 1. `tree`：数据结构数组；
 * 2. `dictValue`：要查找的`dictValue`值；
 * 3. `includeGivenNode`：是否包括给定的节点（可选，默认为`false`）；
 * 4. `dictValueKey`：`dictValue`字段的键名（可选，默认为`"dictValue"`）；
 * 5. `childrenListKey`：子节点数组的键名（可选，默认为`"childDictDataList"`）。
 *
 * `getChildrenByDictValue`函数会返回一个包含所有给定节点的子节点一维数组。如果`includeGivenNode`为`true`，则返回的数组中还将包括给定的节点。
 */

export function getChildrenByDictValue(
  tree: any[],
  dictValue: string,
  includeGivenNode = false,
  dictValueKey = 'dictValue',
  childDictDataListKey = 'childDictDataList'
): any[] {
  const result: any[] = [];
  const _tree = _cloneDeep(tree);

  function traverse(nodes: any[]) {
    for (const node of nodes) {
      if (node[dictValueKey] === dictValue) {
        if (includeGivenNode) {
          result.push(node);
        }
        if (node[childDictDataListKey]) {
          const children = getAllChildren(node[childDictDataListKey], childDictDataListKey);
          result.push(...children);
        }
        break;
      }
    }
  }

  function getAllChildren(nodes: any[], childDictDataListKey: string): any[] {
    const allChildren: any[] = [];
    for (const node of nodes) {
      allChildren.push(node);
      if (node[childDictDataListKey]) {
        const children = getAllChildren(node[childDictDataListKey], childDictDataListKey);
        allChildren.push(...children);
      }
    }

    return allChildren;
  }

  traverse(_tree);

  return result;
}
