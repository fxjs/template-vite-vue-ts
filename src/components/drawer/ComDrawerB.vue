<template>
  <n-drawer
    ref="drawerRef"
    :placement="placement"
    :show-mask="showMask"
    :mask-closable="maskNeedClosable"
    @maskClick="handleMaskClick"
  >
    <div :class="$style['btn-close']" @click="handleClose">
      <IconClose :class="$style['icon']" />
    </div>
    <div :class="$style['header']">
      <slot name="header">
        <img class="pl-[24px] text-[18px]" src="./assets/title-icon.png" alt="" />
        <span class="pl-[10px] text-[18px]">{{ title }}</span>
      </slot>
    </div>
    <n-drawer-content
      :class="$style['override-drawer-content']"
      :key="contentKey"
      :native-scrollbar="false"
      :style="`height: calc(100% - 50px - ${contentPaddingBottom}px)`"
      :bodyContentStyle="`--n-body-padding: 0`"
    >
      <slot></slot>
      <div v-if="showAction" class="fixed right-0" :style="`bottom: ${footerPaddingBottom}px`">
        <slot name="footer">
          <n-flex class="px-[24px]" :size="actionSize">
            <n-button v-if="!hideNegative" type="tertiary" @click="handleNegative" :loading="negativeLoading">
              {{ negativeText }}
            </n-button>
            <n-button v-if="!hidePositive" type="primary" @click="handlePositive" :loading="positiveLoading">
              {{ positiveText }}
            </n-button>
          </n-flex>
        </slot>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
import { CdChromeClose as IconClose } from '@kalimahapps/vue-icons';
import { ref, computed } from 'vue';

const drawerRef = ref();

const props = defineProps({
  footerHeight: {
    type: Number,
    default: 34,
  },
  footerPaddingTop: {
    type: Number,
    default: 20,
  },
  footerPaddingBottom: {
    type: Number,
    default: 25,
  },
  contentKey: String,
  title: String,
  actionSize: {
    type: Array,
    default: () => [20, 0],
  },
  showAction: {
    type: Boolean,
    default: false,
  },
  negativeText: {
    type: String,
    default: '取消',
  },
  // 设置为false时候不自动关闭弹窗
  closeOnNegative: {
    type: Boolean,
    default: true,
  },
  positiveText: {
    type: String,
    default: '保存',
  },
  closeOnPositive: {
    type: Boolean,
    default: false,
  },
  hideNegative: {
    type: Boolean,
    default: false,
  },
  hidePositive: {
    type: Boolean,
    default: false,
  },
  negativeLoading: {
    type: Boolean,
    default: false,
  },
  positiveLoading: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String,
    default: 'right',
  },
  showMask: {
    type: [Boolean, String],
    default: 'transparent',
  },
  maskNeedClosable: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['handleNegative', 'handlePositive']);
const contentPaddingBottom = computed(() => {
  let pb = 0;
  if (props.showAction) {
    pb = props.footerHeight + props.footerPaddingTop + props.footerPaddingBottom;
  }

  return pb;
});

function handleClose() {
  drawerRef.value?.handleEsc();
}
function handleNegative() {
  props.closeOnNegative && handleClose();
  emits('handleNegative');
}

function handlePositive() {
  props.closeOnPositive && handleClose();
  emits('handlePositive');
}

function handleMaskClick() {
  if (props.maskNeedClosable) {
    handleClose();
  }
}

defineExpose({
  close: handleClose,
});

defineOptions({ name: 'ComDrawerB' });
</script>

<style module lang="scss">
.btn-close {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 5px;
  transition: transform 0.3s;
  cursor: pointer;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.9;
    transform: rotate3d(0, 0, 1, -90deg);
  }
  &:active {
    opacity: 0.95;
  }

  .icon {
    font-size: 20px;
    color: #7a7a7a;
  }
}

.header {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  background-size: contain;
  border-bottom: 1px solid #e0e0e6;
}

.override-drawer-content {
  :global(.n-drawer-body-content-wrapper:has(.n-data-table-table)) {
    height: calc(100% - 50px);
  }
}
</style>
