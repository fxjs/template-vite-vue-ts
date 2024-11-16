import { ACTION } from './constant';
import { IObj, IPageRes } from '@/types';

export interface IActionData {
  action: ACTION;
  data: IObj<any>;
}

// 分页列表数据类型
export interface IPageItem {
  id: string;
  dwmc: string;
  dwdz: string;
  jcqk: string;
  jcjg: string;
}
export type IPageListRes = IPageRes<IPageItem>;

// 详情
export interface IDetailRes {
  dwdz: string;
  dwmc: string;
  id: string;
  jcdw: string;
  jcdwmc: string;
  jcjg: string;
  jcjgmc: string;
  jcqk: string;
  jcqkmc: string;
  jcrq: string;
  jhjcrq: string;
  xfaqglr: string;
  xfaqglrsjhm: string;
  xfzrr: string;
  xfzrrsjhm: string;
  xzqh: string;
  xzqhmc: string;
}
