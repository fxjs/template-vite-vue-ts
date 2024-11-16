export interface IUpload {
  id: string;
  name: string;
  percentage: number;
  status: 'pending' | 'uploading' | 'error' | 'finished' | 'removed';
  url: null | string;
  file: File;
  thumbnailUrl: null | string;
  type: string;
  fullPath: string;
  batchId: string;
  res: IUploadRes | null;
}

export interface IUploadRes {
  fjTywysbm: string;
  fjMc: string;
  fjCflj: string;
  fjDx: string;
  fjWjhz: string;
  fjLxdm: string;
  ywLx: string;
  ywTywysbm: string;
  ywSj: string;
  cjsj: string;
  cjrWybs: string;
  gxsj: string;
  gxrWybs: string;
  bbh: string;
  scbs: string;
  [property: string]: any;
  fileName: string;
  filePath: string;
  id: string;
  url: string;
}
