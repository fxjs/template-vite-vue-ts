import { stringify } from 'querystringify';
import { merge } from 'lodash-es';
// api file
import demo from './demo.ts';

export const api = {
  type: {
    demo: '',
  },
  name: merge(demo),

  /**
   * 组装请求地址
   * @param serviceType
   * @param apiName
   * @param query
   */
  getUrl(serviceType: string, apiName: string, query?: any): string {
    const url = window.$SYS_CFG.apiBaseURL;
    const paramsStr = query ? `?${stringify(query)}` : '';
    const _apiName = apiName?.indexOf('/') === 0 ? apiName : '/' + apiName;
    const _serviceType = serviceType ? '/' + serviceType : '';

    return `${url}${_serviceType}${_apiName}${paramsStr}`;
  },
};
