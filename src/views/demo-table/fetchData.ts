import { $http } from '@tanzerfe/http';
import { api } from '@/api';
import { fileDownloader } from '@/views/common/response';
import { IDetailRes, IPageListRes } from './type.ts';
import { IObj } from '@/types';

export function pageList(params: IObj<any>) {
  const url = api.getUrl(api.type.demo, api.name.demo.queryInspectPageList);
  return $http.post<IPageListRes>(url, { data: { _cfg: { showTip: true }, ...params } });
}

export function getDetail(query: IObj<any>) {
  const url = api.getUrl(api.type.demo, api.name.demo.queryInspectInfoById, query);
  return $http.get<IDetailRes>(url, { data: { _cfg: { showTip: true } } });
}

export function postSave(params: IObj<any>) {
  const url = api.getUrl(api.type.demo, api.name.demo.saveAndUpdateInspect);
  return $http.post(url, { data: { _cfg: { showTip: true, showOkTip: true }, ...params } });
}

export function postDelete(query: IObj<any>) {
  const url = api.getUrl(api.type.demo, api.name.demo.deleteInspectInfoById, query);
  return $http.post(url, { data: { _cfg: { showTip: true, showOkTip: true } } });
}

export function getImportUrl() {
  return api.getUrl(api.type.demo, api.name.demo.placeInspectImport);
}

export function fileExport(params: IObj<any>, filename: string) {
  const url = api.getUrl(api.type.demo, api.name.demo.placeInspectExport, params);
  return fileDownloader(url, { filename });
}
