/**
 * 公共接口（非字典）
 * 函数命名规范：以 com 开头，如 comGetDemo
 */
import { api } from '@/api';
import { $http } from '@tanzerfe/http';
import JsFileDownloader from 'js-file-downloader';
import type { OptionalParams } from 'js-file-downloader';

/**
 * 示例接口 comGetDemo
 */
export async function comGetDemo() {}

/**
 * 部门树接口 comGetDeptTree
 */
export function comGetDeptTree() {
  const url = api.getUrl(api.type.demo, api.name.demo.deptTree);
  return $http.post<any>(url, { data: { _cfg: { showTip: true } } });
}

/**
 * 导出-文件下载
 * @param url
 * @param options
 */
export function fileDownloader(url: string, options: OptionalParams = {}) {
  const defaultOpt: OptionalParams = {
    timeout: 2 * 60 * 1000,
    contentTypeDetermination: 'header',
    headers: [],
  };

  return new JsFileDownloader({
    url,
    ...defaultOpt,
    ...options,
    nameCallback: (name: string) => {
      return options.filename || name;
    },
  });
}

/**
 * 模板下载
 * @param str
 */
export function fileDownloaderUrl(str: string) {
  const url = window.$SYS_CFG.apiBaseFile + str + '?t=' + new Date().getTime();
  const anchor = document.createElement('A') as HTMLAnchorElement;

  anchor.setAttribute('rel', 'fileDownloader');
  anchor.setAttribute('target', '_blank');
  anchor.href = url;

  return anchor.click();
}
