<template>
  <div v-if="mode === 'detail'">
    <n-image-group show-toolbar-tooltip>
      <n-space>
        <n-image v-for="(item, idx) of valueRef" :key="idx" :src="getFileURL(item.filePath)" width="100" />
      </n-space>
    </n-image-group>
  </div>
  <div v-else class="w-full">
    <n-upload
      :key="Math.random()"
      response-type="json"
      name="uploadfile"
      :action="actionURL"
      :default-file-list="defaultFileList"
      :on-finish="handleUploadFinish"
      :on-update:file-list="handleUpdate"
      :on-before-upload="handleBeforeUpload"
      :accept="props.accept"
      :max="max"
    >
      <n-button type="primary">点击上传</n-button>
      <div class="mt-[10px] text-[#999999]" v-if="props.tips">{{ props.tips }}</div>
    </n-upload>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { useToastCtx } from '@/common/shareContext';
import { IUploadRes } from '@/components/upload/type';
import { UploadFileInfo } from 'naive-ui';
import { computed } from 'vue';

defineOptions({ name: 'ImgUpload' });

interface IItem {
  fileName: string;
  filePath: string;
  id: string;
}
interface Props {
  data: IItem[];
  mode?: string; // detail为展示图片 其他为上传图片
  max?: number; // 限制上传数量
  size?: number; // 限制文件大小
  accept?: string; // 文件类型
  tips?: string; // 上传提示
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  data: () => [],
  max: 6,
  accept: '.jpg,.jpeg,.png,.webp,.gif,.bmp,.svg',
});
const emits = defineEmits(['update']);
const $toast = useToastCtx({ theme: 'dark' });
const valueRef = computed<any[]>(() => props.data);
const actionURL = api.getUrl(api.type.demo, api.name.demo.uploadfile);

// 默认文件列表(用于编辑时回显已上传文件)
const defaultFileList = computed<UploadFileInfo[]>(() => {
  const ret: UploadFileInfo[] = [];

  for (const item of valueRef.value) {
    ret.push({
      id: item.id,
      name: item.fileName,
      url: getFileURL(item.filePath),
      status: 'finished',
    });
    fileResMap.set(item.id, item);
  }
  return ret;
});
const fileResMap: Map<any, IUploadRes> = new Map(); // 上传结果map

// 上传前校验(文件大小、类型)
function handleBeforeUpload(options: { file: UploadFileInfo }) {
  const { file } = options;
  if (!file.file) return false;
  const fileExt = file.name.slice(file.name.lastIndexOf('.') + 1);
  if (!props.accept.includes(fileExt)) {
    $toast.error(`请上传 ${props.accept} 类型的文件!`);
    return false;
  } else if (props.size && file.file.size / 1024 / 1024 > props.size) {
    $toast.error(`文件不能超过 ${props.size} MB，请重新上传!`);
    return false;
  }
  return true;
}

// 上传完成
function handleUploadFinish(options: { file: UploadFileInfo; event?: ProgressEvent }) {
  const { file, event } = options;
  const data = (<any>event?.target)?.response?.data || {};
  fileResMap.set(file.id, data);
}

// 当文件数组改变时触发的回调函数
function handleUpdate(val: UploadFileInfo[]) {
  const finishedList = val.filter((item) => item.status === 'finished');

  const res: any[] = [];
  const data: any[] = [];
  finishedList.forEach((item) => {
    const _res = fileResMap.get(item.id) || null;
    res.push(_res);
    data.push(Object.assign(item, { res: _res }));
  });

  return emits('update', res, data);
}

function getFileURL(filePath: string) {
  return window.$SYS_CFG.apiBaseFile + filePath;
}
</script>

<style scoped></style>
