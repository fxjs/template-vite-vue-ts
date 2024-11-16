<template>
  <div v-if="mode === 'detail'">
    <n-space>
      <div class="relative" v-for="(item, idx) of valueRef" :key="idx">
        <video class="video-pre" :src="getFileURL(item.fjCflj)" width="100"></video>
        <AkVideo :class="$style['play-icon']" @click="handlePlay(item)" />
      </div>
    </n-space>
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
  <n-modal :mask-closable="false" v-model:show="showModal">
    <div :class="$style['video-dialog']">
      <div :class="$style.header">
        <span>{{ curVideo.fjMc || '视频' }}</span>
        <div class="p-[5px] bg-[#E8E8E8] rounded cursor-pointer" @click="handleClose">
          <img class="w-[12px] h-[12px]" src="./assets/close.png" alt="" />
        </div>
      </div>
      <div class="h-[660px]">
        <art-player :url="getFileURL(curVideo.fjCflj)" v-if="curVideo.fjCflj"></art-player>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import { useToastCtx } from '@/common/shareContext';
import ArtPlayer from '@/components/player/artPlayer.vue';
import { IUploadRes } from '@/components/upload/type';
import { AkVideo } from '@kalimahapps/vue-icons';
import { UploadFileInfo } from 'naive-ui';
import { computed, ref } from 'vue';

defineOptions({ name: 'VideoUpload' });

interface IItem {
  fjMc: string;
  fjCflj: string;
  fjTywysbm: string;
}
interface Props {
  data: IItem[];
  mode?: string; // detail为展示视频 其他为上传视频
  max?: number; // 限制上传数量
  size?: number; // 限制文件大小
  accept?: string; // 文件类型
  tips?: string; // 上传提示
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  data: () => [],
  max: 3,
  accept: '.mp4, .mpeg, .wmv, .mov',
});
const emits = defineEmits(['update']);
const $toast = useToastCtx();
const valueRef = computed<any[]>(() => props.data);
const actionURL = api.getUrl(api.type.demo, api.name.demo.uploadfile);
const curVideo = ref<any>(null);
const showModal = ref(false);

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
    fileResMap.set(item.fjTywysbm, item);
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

// 播放视频
function handlePlay(item: any) {
  curVideo.value = item;
  showModal.value = true;
}

// 关闭视频弹窗
function handleClose() {
  curVideo.value = {};
  showModal.value = false;
}

function getFileURL(filePath: string) {
  return window.$SYS_CFG.apiBaseFile + filePath;
}
</script>

<style module lang="scss">
.play-icon {
  @apply text-white text-[48px] absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer;
}

.video-dialog {
  @apply w-[1018px];

  .header {
    @apply w-full h-[50px] px-[20px] bg-[#f4f9ff] text-[16px] text-[#1F2225] flex items-center justify-between;
  }
}
</style>
