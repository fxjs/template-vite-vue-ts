<template>
  <n-form
    ref="formInstRef"
    :model="formData"
    :rules="rules"
    label-placement="left"
    label-width="110"
    require-mark-placement="left"
    class="pt-[30px] px-[20px]"
  >
    <n-form-item label="单位名称" path="dwmc">
      <n-input v-model:value="formData.dwmc" clearable maxlength="50" show-count />
    </n-form-item>

    <n-form-item label="单位地址" path="dwdz">
      <n-input v-model:value="formData.dwdz" clearable maxlength="50" show-count />
    </n-form-item>

    <n-form-item label="行政区划" path="xzqh">
      <n-cascader
        v-model:value="formData.xzqh"
        :show-path="false"
        :options="xzqhOpt"
        value-field="dictValue"
        label-field="dictLabel"
        children-field="childDictDataList"
        clearable
        cascader
        filterable
        :max-tag-count="1"
        :menuProps="{ class: 'n__checkbox-icon-circle' }"
      />
    </n-form-item>

    <n-form-item label="检查情况" path="jcqk">
      <n-radio-group v-model:value="formData.jcqk">
        <n-space>
          <n-radio v-for="item in inspectStatusOpt" :key="item.dictValue" :value="item.dictValue">
            {{ item.dictLabel }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>

    <n-form-item label="预定检查日期">
      <n-date-picker
        class="w-full"
        v-model:formatted-value="formData.jhjcrq"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="请选择日期"
        clearable
      >
      </n-date-picker>
    </n-form-item>

    <n-form-item label="检查日期">
      <n-date-picker
        class="w-full"
        v-model:formatted-value="formData.jcrq"
        type="date"
        placeholder="请选择日期"
        clearable
      >
      </n-date-picker>
    </n-form-item>

    <n-form-item label="检查单位">
      <n-cascader
        v-model:value="formData.jcdw"
        :show-path="false"
        :options="deptTree"
        value-field="deptId"
        label-field="deptName"
        children-field="childDeptList"
        clearable
        filterable
        :menuProps="{ class: 'n__checkbox-icon-circle' }"
      />
    </n-form-item>

    <n-form-item label="检查结果">
      <n-radio-group v-model:value="formData.jcjg">
        <n-space>
          <n-radio v-for="item in inspectResultOpt" :key="item.dictValue" :value="item.dictValue">
            {{ item.dictLabel }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>

    <n-form-item label="安全责任人">
      <n-input v-model:value="formData.xfzrr" clearable maxlength="30" show-count />
    </n-form-item>

    <n-form-item label="手机号">
      <n-input
        v-model:value="formData.xfzrrsjhm"
        :allow-input="onlyAllowNumber"
        @blur="validatePhoneNum('xfzrrsjhm', 0)"
        :status="validatePhoneNum('xfzrrsjhm', 1)"
        clearable
        maxlength="11"
        show-count
      />
    </n-form-item>

    <n-form-item label="安全管理人">
      <n-input v-model:value="formData.xfaqglr" clearable maxlength="30" show-count />
    </n-form-item>

    <n-form-item label="手机号">
      <n-input
        v-model:value="formData.xfaqglrsjhm"
        :allow-input="onlyAllowNumber"
        @blur="validatePhoneNum('xfaqglrsjhm', 0)"
        :status="validatePhoneNum('xfaqglrsjhm', 1)"
        clearable
        maxlength="11"
        show-count
      />
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { $dict } from '@/views/common/dict/dict.ts';
import { $toast } from '@/common/shareContext';
import { ACTION, PROVIDE_KEY } from '../../constant.ts';
import { computed, inject, ref, Ref, watch } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { getDetail, postSave } from '../../fetchData.ts';
import { IActionData } from '../../type.ts';
import { isMobilePhone, onlyAllowNumber } from '@/utils/validate.ts';

const props = defineProps({
  show: Boolean,
});

const currentAction = inject(PROVIDE_KEY.currentAction) as Ref<IActionData>; // inject
const isEdit = computed(() => currentAction.value.action === ACTION.EDIT);
const actionData = computed(() => currentAction.value.data);

const initForm = () => {
  return {
    id: isEdit.value ? actionData.value.id : undefined, // 主键
    dwmc: '', //  // 单位名称
    dwdz: '', //  // 单位地址
    xzqh: <string | null>null, // 行政区划
    jcqk: '', // 检查情况
    jhjcrq: <string | null>null, // 预定检查日期
    jcrq: <string | null>null, // 检查日期
    jcdw: <string | null>null, // 检查单位
    jcjg: '', // 检查结果
    xfzrr: '', // 责任人
    xfzrrsjhm: '', // 责任人手机号码
    xfaqglr: '', // 安全管理人
    xfaqglrsjhm: '', // 安全管理人手机号码
  };
};

const { xzqhOpt } = $dict.useXzqh();
const { deptTree } = $dict.useDeptTree(); // 部门树
const { inspectStatusOpt } = $dict.useInspectStatus();
const { inspectResultOpt } = $dict.useInspectResult();

const formInstRef = ref<FormInst | null>(null);
const formData = ref(initForm()); // 表单数据

const rules: FormRules = {
  dwmc: { required: true, message: '请输入单位名称', trigger: 'blur' },
  dwdz: { required: true, message: '请输入单位地址', trigger: 'blur' },
  xzqh: { required: true, message: '请选择行政区划', trigger: ['blur', 'change'] },
  jcqk: { required: true, message: '请选择检查情况', trigger: ['blur'] },
};

/**
 * 详情
 */
async function getDetailData() {
  const { id } = actionData.value || {};
  const { data } = await getDetail({ id });
  const { dwmc, dwdz, xzqh, jcqk, jhjcrq, jcrq, jcdw, jcjg, xfzrr, xfzrrsjhm, xfaqglr, xfaqglrsjhm } = data || {};

  // 赋初始值
  formData.value = {
    id,
    dwmc, //  // 单位名称
    dwdz, //  // 单位地址
    xzqh: xzqh || null, // 行政区划
    jcqk, // 检查情况
    jhjcrq: jhjcrq || null, // 预定检查日期
    jcrq: jcrq || null, // 检查日期
    jcdw: jcdw || null, // 检查单位
    jcjg, // 检查结果
    xfzrr, // 责任人
    xfzrrsjhm, // 责任人手机号码
    xfaqglr, // 安全管理人
    xfaqglrsjhm, // 安全管理人手机号码
  };
}

function handleShow() {
  if (isEdit.value) {
    getDetailData();
  }
}

function handleSubmit() {
  return new Promise((resolve, reject) => {
    formInstRef.value?.validate(async (errors) => {
      if (!errors) {
        const params = Object.assign({}, formData.value);

        postSave(params)
          .then(() => {
            resolve('submitted');
            reset();
          })
          .catch(reject);
      } else {
        if (errors.length) {
          try {
            const first = errors[0][0];
            if (first.message) {
              $toast.error(first.message);
            }
          } catch (e) {}
        }
        reject(errors);
      }
    });
  });
}

/**
 * 验证手机号
 * @param k 字段
 * @param flag 0-清空动作 1-表单状态
 */
function validatePhoneNum(k: 'xfzrrsjhm' | 'xfaqglrsjhm', flag: 0 | 1) {
  const v = formData.value[k] || '';

  // flag 为 0 时，如果输入无效，清空表单值
  if (flag === 0 && v && !isMobilePhone(v)) {
    formData.value[k] = '';
  }

  // flag 为 1 时，返回错误状态
  if (flag === 1) {
    return v.length === 11 && !isMobilePhone(v) ? 'error' : '';
  }
}

function reset() {
  formData.value = initForm();
}

// on show
watch(
  () => props.show,
  (val) => {
    if (val) {
      handleShow();
    } else {
      reset();
    }
  },
  { immediate: true }
);

defineExpose({
  handleSubmit,
});

defineOptions({ name: 'DemoAsideModify' });
</script>

<style module lang="scss"></style>
