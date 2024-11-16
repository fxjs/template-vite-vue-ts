<template>
  <div :class="$style['wrap']">
    <n-form :show-feedback="false" label-placement="left">
      <n-grid class="flex-1" :cols="4" :x-gap="20" :y-gap="20">
        <n-form-item-gi label="单位名称">
          <n-input v-model:value="filterForm.dwmc" clearable />
        </n-form-item-gi>
        <n-form-item-gi label="单位地址">
          <n-input v-model:value="filterForm.dwdz" clearable />
        </n-form-item-gi>
        <n-form-item-gi label="行政区划">
          <n-cascader
            v-model:value="filterForm.xzqh"
            :show-path="false"
            :options="xzqhOpt"
            value-field="dictValue"
            label-field="dictLabel"
            children-field="childDictDataList"
            clearable
            multiple
            cascader
            filterable
            :max-tag-count="1"
          />
        </n-form-item-gi>
        <n-form-item-gi label="检查情况">
          <n-select
            v-model:value="filterForm.jcqk"
            :options="inspectStatusOpt"
            label-field="dictLabel"
            value-field="dictValue"
            clearable
          />
        </n-form-item-gi>

        <n-form-item-gi label="检查单位">
          <n-cascader
            v-model:value="filterForm.jcdw"
            :show-path="false"
            :options="deptTree"
            value-field="deptId"
            label-field="deptName"
            children-field="childDeptList"
            clearable
            filterable
            :menuProps="{ class: 'n__checkbox-icon-circle' }"
          />
        </n-form-item-gi>

        <n-form-item-gi label="检查日期">
          <n-date-picker
            type="daterange"
            start-placeholder="请选择日期"
            end-placeholder="请选择日期"
            @update-formatted-value="onDatePickerUpdate"
            clearable
          >
          </n-date-picker>
        </n-form-item-gi>

        <n-form-item-gi label="检查结果">
          <n-select
            v-model:value="filterForm.jcjg"
            :options="inspectResultOpt"
            label-field="dictLabel"
            value-field="dictValue"
            clearable
          />
        </n-form-item-gi>

        <n-form-item-gi>
          <div class="w-full flex justify-end gap-[10px]">
            <n-button type="primary" @click="doHandle(ACTION.SEARCH)">
              {{ ACTION_LABEL.SEARCH }}
            </n-button>
            <n-button type="primary" :loading="exportLoading" @click="handleExport">
              {{ ACTION_LABEL.EXPORT }}
            </n-button>
            <n-button type="primary" @click="doHandle(ACTION.ADD)">
              {{ ACTION_LABEL.ADD }}
            </n-button>

            <n-upload
              class="!w-[auto]"
              @before-upload="beforeUpload"
              :custom-request="handleUpload"
              :show-file-list="false"
            >
              <n-button type="primary">
                {{ ACTION_LABEL.IMPORT }}
              </n-button>
            </n-upload>

            <n-button type="primary" @click="handleDownload()">
              {{ ACTION_LABEL.DOWNLOAD }}
            </n-button>
          </div>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { $dict } from '@/views/common/dict/dict.ts';
import { $toast } from '@/common/shareContext';
import { ACTION, ACTION_LABEL } from '../constant';
import { fileDownloaderUrl } from '@/views/common/response';
import { fileExport, getImportUrl } from '../fetchData.ts';
import { onMounted, ref } from 'vue';
import { trimObjNull } from '@/utils/obj.ts';
import { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui';
import { useAutoLoading } from '@/common/hooks/useAutoLoading.ts';
import { useUpload } from '@/common/hooks/useUpload.ts';

const emits = defineEmits(['action']);

const filterForm = ref(initForm());
const { xzqhOpt } = $dict.useXzqh();
const { deptTree } = $dict.useDeptTree(); // 部门树
const { inspectStatusOpt } = $dict.useInspectStatus();
const { inspectResultOpt } = $dict.useInspectResult();
const [exportLoading, wrapExportFn] = useAutoLoading();

function initForm() {
  return {
    dwmc: '', // 单位名称
    dwdz: '', // 单位地址
    xzqh: [], // 行政区划
    jcdw: null, // 检查单位
    jcjg: null, // 检查结果
    jcqk: null, // 检查情况(字典-inspectStatus)
    startTime: '',
    endTime: '',
  };
}

function onDatePickerUpdate(value: string[] | null) {
  filterForm.value.startTime = value ? value[0] : '';
  filterForm.value.endTime = value ? value[1] : '';
}

function getFilterForm() {
  // xzqh转成逗号分隔的字符串给接口
  const xzqhStr = filterForm.value.xzqh.join(',');
  return Object.assign({}, trimObjNull(filterForm.value), { xzqh: xzqhStr });
}

function doHandle(action: ACTION) {
  emits('action', {
    action: action,
    data: getFilterForm(),
  });
}

function handleExport() {
  wrapExportFn(fileExport(getFilterForm(), '公众聚集场所投入使用前安全检查'));
}

function handleDownload() {
  fileDownloaderUrl('/template/公众聚集场所投入使用前安全检查.xlsx');
}

// 导入 ->
const isEnd = ref(false);
const [uploadFn, uploading] = useUpload(getImportUrl());

function handleUpload({ file, onFinish }: UploadCustomRequestOptions) {
  isEnd.value = false;
  uploading.value = true;
  const formData = new FormData();
  formData.append('file', file.file as File);
  uploadFn(formData)
    .then(() => doHandle(ACTION.SEARCH))
    .finally(() => {
      uploading.value = false;
      isEnd.value = true;
      onFinish();
    });
}

function beforeUpload(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  const isExcel = data.file.name.endsWith('.xlsx');
  if (!isExcel) {
    $toast.error('请上传格式为xlsx的文件');
  }
  return isExcel;
}
// <-

onMounted(() => {
  doHandle(ACTION.SEARCH);
});

defineOptions({ name: 'DemoFilter' });
</script>

<style module lang="scss">
.wrap {
  width: 100%;
  padding-bottom: 20px;
}
</style>
