<template>
  <div class="px-[40px] pt-[40px]" :class="$style.detail">
    <p>
      <span>单位名称：</span><span>{{ detail.dwmc }}</span>
    </p>
    <p>
      <span>单位地址：</span><span>{{ detail.dwdz }}</span>
    </p>
    <p>
      <span>行政区划：</span><span>{{ detail.xzqhmc }}</span>
    </p>
    <p>
      <span>检查情况：</span><span>{{ detail.jcqkmc }}</span>
    </p>
    <p>
      <span>预定检查日期：</span><span>{{ detail.jhjcrq }}</span>
    </p>
    <p>
      <span>检查日期：</span><span>{{ detail.jcrq }}</span>
    </p>
    <p>
      <span>检查单位：</span><span>{{ detail.jcdwmc }}</span>
    </p>
    <p>
      <span>检查结果：</span><span>{{ detail.jcjgmc }}</span>
    </p>
    <p>
      <span>手机号：</span><span>{{ detail.xfzrrsjhm }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, Ref } from 'vue';
import { getDetail } from '../../fetchData.ts';
import { IActionData, IDetailRes } from '../../type.ts';
import { PROVIDE_KEY } from '../../constant.ts';
import { trimObjEmpty } from '@/utils/obj.ts';

const currentAction = inject(PROVIDE_KEY.currentAction) as Ref<IActionData>; // inject
const actionData = computed(() => currentAction.value.data);
const detail = ref<Partial<IDetailRes>>({});

async function getDetailData() {
  const { id } = actionData.value || {};
  const { data = {} } = await getDetail({ id });

  detail.value = trimObjEmpty(data);
}

getDetailData();

defineOptions({ name: 'DemoAsideDetail' });
</script>

<style module lang="scss">
.detail {
  p {
    line-height: 2;
    margin-bottom: 15px;
    display: grid;
    grid-template-columns: auto 1fr;

    > span {
      &:nth-child(1) {
        min-width: 70px;
        text-align: right;
      }
      &:nth-child(2) {
        color: var(--skin-t6);
        padding-left: 10px;
        word-break: break-all;
      }
    }
  }
}
</style>
