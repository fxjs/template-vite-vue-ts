import { api } from '@/api';
import { IDict } from '@/types';
import { $http } from '@tanzerfe/http';

/**
 * 后端接口字典 API
 */

const cache = new Map();
/**
 * 接口
 */
export const backendDict = {
  /**
   * @param type 字典类型，如传 tzlx
   */
  getSysDictByType(type: string) {
    const url = api.getUrl(api.type.demo, api.name.demo.queryDictDataByType, { type });
    return $http.get<IDict[]>(url);
  },
  /**
   * 获取字典树
   * @params dictType 字典类型,  dictCode: 字典编码
   */
  getDictDataTree(dictType: string, dictCode?: string) {
    const url = api.getUrl(api.type.demo, api.name.demo.getDictDataTree, { dictType, dictCode });
    return $http.get<IDict[]>(url);
  },

  /*getDeviceTypes() {
    const url = api.getUrl(api.type.iotMonitor, api.name.iotMonitor.getDeviceTypes);
    return $http.get<{ options: IGetDicByType }>(url, { data: { _cfg: { showTip: true } } });
  },

  getAreaTree(parentDistCode: string) {
    const url = $api.getUrl($api.type.upms, $api.name.upms.getAreaTree, { parentDistCode });
    return $http.get<IGetDicByType>(url, { data: { _cfg: { showTip: true } } });
  },*/
};

/**
 * 清缓存
 */
export function clearBackendDictCache() {
  cache.clear();
}
