import { api } from '@/api';
import { useAutoLoading } from '@/common/hooks/useAutoLoading.ts';
import { $http } from '@tanzerfe/http';
import { ref, Ref } from 'vue';

type UploaderResult = [(formData: FormData) => Promise<any>, Ref<boolean>, Ref<number>];

/**
 * 文件上传
 * 使用：
 * async customUpload(file: File, insertFn: any) {
 *   const formData = new FormData();
 *   formData.append('uploadfile', file);
 *   uploadFn(formData).then(async (res: any) => {});
 * }
 */
export function useUpload(uploadFileURL?: string, cjry?: string): UploaderResult {
  const uploadProgress = ref(0);
  const [uploading, submit] = useAutoLoading();
  function uploadFn(formData: FormData): Promise<any> {
    const url = uploadFileURL || api.getUrl(api.type.demo, api.name.demo.uploadfile);
    return submit(
      $http.post(url, {
        data: Object.assign(formData, { _cfg: { showTip: true, showOkTip: true } }),
        params: { cjry }, //增加参数创建人
        onUploadProgress: (_progress) => {
          uploadProgress.value = Math.floor((_progress.loaded / _progress.total) * 100);
        },
      })
    );
  }
  return [uploadFn, uploading, uploadProgress];
}
