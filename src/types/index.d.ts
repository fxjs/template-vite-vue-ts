export type Nullable<T> = T | null;

export type Voidable<T> = T | undefined;

export type Indexable<T> = {
  [key: string]: T;
};

export type Hash<T> = Indexable<T>;

export type IObj<T> = Indexable<T>;

export type IFunction<T> = (...args: any[]) => T;

export type emptyable<T> = T | Indexable<any>;

export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type IPageRes<T> = {
  rows: T[];
  pageNo: number;
  pageSize: number;
  pages: number;
  total: number;
};

export interface IDict {
  dictLabel: string;
  dictValue: string;
  [prop: string]: string;
}

export interface IBreadData {
  name: string;
  clickable?: boolean;
  routeRaw?: {
    name?: string;
    path?: string;
    params?: IObj<any>;
    query?: IObj<any>;
  };
}

// IFileRes
export interface IFileRes {
  businessData?: string; // 业务数据
  businessId?: string; // 业务ID
  businessType?: string; // 业务类型
  fileName?: string; // 文件名称
  filePath?: string; // 文件存放路径
  fileSize?: string; // 文件大小
  id?: string; // 主键
  isDel?: string; // 是否删除：0-未删除 1-已删除
  suffix?: string; // 文件后缀
  uploadDate?: Date; // 上传日期
}
