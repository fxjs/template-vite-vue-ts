<template>
  <div class="w-full">
    <n-upload
      :key="Math.random()"
      response-type="json"
      name="uploadfile"
      :accept="props.accept"
      :action="actionURL"
      :default-file-list="defaultFileList"
      :max="max"
      :on-before-upload="handleBeforeUpload"
      :on-finish="handleUploadFinish"
      :on-update:file-list="handleUpdate"
      :show-remove-button="isModifyMode"
      :show-trigger="isModifyMode"
    >
      <n-button>点击上传</n-button>
    </n-upload>
    <div class="text-skin-t6 text-[12px]" v-if="props.tips">{{ props.tips }}</div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { IUploadRes } from '@/components/upload/type';
import { UploadFileInfo } from 'naive-ui';
import { computed } from 'vue';
import { $toast } from '@/common/shareContext';

defineOptions({ name: 'FileUpload' });

interface IItem {
  fileName: string;
  filePath: string;
  id: string;
}
interface Props {
  data: IItem[];
  mode?: 'detail' | 'add' | 'edit'; // detail为展示 其他为上传
  max?: number; // 限制上传数量
  size?: number; // 限制文件大小
  accept?: string; // 文件类型
  tips?: string; // 上传提示
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  max: 5,
  accept: '',
});
const emits = defineEmits(['update']);
const valueRef = computed<any[]>(() => props.data);
const isModifyMode = computed(() => props.mode !== 'detail');
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

console.log(defaultFileList.value, 'defaultFileList');

const fileResMap: Map<any, IUploadRes> = new Map(); // 上传结果map

// 上传前校验(文件大小、类型)
function handleBeforeUpload(options: { file: UploadFileInfo }) {
  const { file } = options;
  if (!file.file) return false;
  const fileExt = file.name.slice(file.name.lastIndexOf('.') + 1);
  if (props.accept && !props.accept.includes(fileExt)) {
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
