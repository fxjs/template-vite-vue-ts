<template>
  <n-dropdown
    trigger="hover"
    placement="bottom"
    size="large"
    :show-arrow="true"
    :options="options"
    :theme-overrides="dropDownTheme()"
    @select="handleSelect"
  >
    <div :class="$style['avatar']">
      <img src="../assets/avatar.png" alt="avatar" />
      <n-ellipsis v-if="userName" class="!max-w-[60px]" :tooltip="false" :title="userName.length > 5 ? userName : ''">
        {{ userName }}
      </n-ellipsis>
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import { dropDownTheme } from '@/views/header/theme/dropDownTheme';
import { useAuthStore } from '@/store/auth';
import { $dialog } from '@/common/shareContext';

const emits = defineEmits(['show-downloadApp', 'action']);

defineComponent({ name: 'avatarComp' });

const auth = useAuthStore();
const userInfo = auth.userInfo;
const userName = userInfo.nickName || userInfo.userName || '';

const options = ref([
  { label: '退出登录', key: 'logout' },
  { label: getSysVersion(), key: 'sysVersion', disabled: true },
]);

function getSysVersion() {
  let v2 = window.$SYS_CFG.version.buildTime?.replace(/\/|\s/g, '.').replace(/^\d{4}\.|[^0-9.]/g, '');
  let ver = window.$SYS_CFG.version.version || (v2 ? `0.${v2}` : '') || '0.0.0.000000';

  // 大写V开头
  if (!/^v/i.test(ver)) {
    ver = 'V' + ver;
  } else {
    ver = ver.replace('v', 'V');
  }

  return ver;
}

function handleSelect(key: string) {
  if (key === 'logout') {
    $dialog.info({
      title: '提示',
      content: '确定退出登录吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        auth.logout();
      },
    });
  }
}
</script>

<style module lang="scss">
.avatar {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  column-gap: 12px;
  user-select: none;
}
</style>
