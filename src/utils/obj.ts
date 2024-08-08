import { isEqual, isPlainObject } from 'lodash-es';
import { toRaw } from 'vue';

/**
 * 是否是空对象
 * @param val
 */
export function isEmptyObj(val: any) {
  return isEqual(val, {});
}

/**
 * 去掉Null值
 * @param obj
 * @param isRemove 默认删除
 * @param fill 替换Null的值
 */
export function trimObjNull(obj: Record<string, any>, isRemove = true, fill = '') {
  const _obj = Object.assign({}, toRaw(obj));
  const keys = Object.keys(_obj);

  for (const key of keys) {
    if (_obj[key] === null) {
      if (isRemove) {
        delete _obj[key];
      } else {
        _obj[key] = fill;
      }
    }
  }

  return _obj;
}

/**
 * 解析数据
 * @param data
 * @return Object (default {})
 */
export function parseData(data: string) {
  let msg = {};
  try {
    msg = typeof data === 'object' ? data : JSON.parse(data);
    // 只接受普通对象
    if (!isPlainObject(msg)) {
      msg = {};
    }
  } catch (e) {
    msg = {};
  }
  return msg;
}
