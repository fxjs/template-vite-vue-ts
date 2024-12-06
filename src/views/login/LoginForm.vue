<template>
  <div :class="$style['form-wrap']">
    <t-form
      ref="formRefM1"
      :data="formValM1"
      :rules="rulesM1"
      show-error-message
      scroll-to-first-error="auto"
      @submit="handleValidateSubmit"
      :requiredMark="false"
      :label-width="0"
    >
      <t-form-item name="username">
        <t-input v-model:value="formValM1.username" borderless placeholder="请输入账号/手机号码"></t-input>
      </t-form-item>

      <t-form-item name="pwd">
        <t-input v-model:value="formValM1.pwd" borderless type="password" :clearable="false" placeholder="请输入密码">
          <template #suffixIcon>
            <BrowseOffIcon />
          </template>
        </t-input>
      </t-form-item>
    </t-form>

    <!-- submit -->
    <div :class="$style['btn-login']">
      <t-button theme="primary" :loading="loading" @click="handleValidateSubmit" size="large" class="!text-white">
        登录
      </t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { encryptAes, decryptAes, encryptSm2GM, encryptMd5 } from '@/utils/crypto.ts';
import { useAuthStore } from '@/store/auth';
import { useAutoLoading } from '@/common/hooks/useAutoLoading.ts';
import { LS } from '@/utils/storages.ts';
import pkg from '../../../package.json';
import { BrowseOffIcon } from 'tdesign-icons-vue-next';
import { Form as TForm } from 'tdesign-mobile-vue';
import { FormItem as TFormItem } from 'tdesign-mobile-vue';
import { Input as TInput } from 'tdesign-mobile-vue';
import { Button as TButton } from 'tdesign-mobile-vue';

const [loading, submit] = useAutoLoading();
const passwordType = ref<'text' | 'password'>('password');

// 账号缓存信息
interface LoginCacheType {
  n?: string; // 账号
  p?: string; // 密码
}
const secretKey = 'XYZXF';
const loginCacheKey = pkg.name.toUpperCase().replace(/-/g, '_');
const loginCacheRes: LoginCacheType = getLoginCache();
const formRefM1 = ref<any | null>(null);
const formRefM2 = ref<any | null>(null);
const isRememberInfo = ref(!!loginCacheRes.n); // 有缓存默认勾选

const loginMode = ref<1 | 2>(1); // 登录方式（1-账号密码登录 ；2-短信登录；）
const formValM1 = ref({
  username: loginCacheRes.n,
  pwd: loginCacheRes.p,
});

const rulesM1: any = {
  username: [
    {
      validator: (val: any) => val?.length > 0,
      required: true,
      trigger: 'blur',
      message: '账号不能为空',
    },
  ],
  pwd: [
    {
      validator: (val: any) => val?.length > 0,
      required: true,
      trigger: 'blur',
      message: '密码不能为空',
    },
  ],
};

const formValM2 = ref({
  phone: null,
  captcha: null,
});

const authStore = useAuthStore();

function handleValidateSubmit() {
  if (loginMode.value === 1) {
    formRefM1.value?.validate().then((res: boolean) => {
      if (res) {
        if (loading.value) return;
        const params = {
          // 国密算法
          // username: encryptSm2GM(formValM1.value.username || '', window.$SYS_CFG.gmPublicKey, 1),
          // password: encryptSm2GM(formValM1.value.pwd || '', window.$SYS_CFG.gmPublicKey, 1),
          username: formValM1.value.username || '',
          password: encryptMd5(formValM1.value.pwd || ''),
        };

        submit(authStore.login(params)).then(() => {
          // SAVE LS
          const text = JSON.stringify({
            n: formValM1.value.username,
            p: formValM1.value.pwd,
          });
          if (isRememberInfo.value) {
            LS.set(loginCacheKey, encryptAes(text, secretKey));
          } else {
            LS.delete(loginCacheKey);
          }
        });
      }
    });
  }

  // if (loginMode.value === 2) {
  //   formRefM2.value?.validate((errors: any) => {
  //     if (!errors) {
  //       if (loading.value) return;
  //       const params = {
  //         loginMode: loginMode.value,
  //         loginName: formValM2.value.phone,
  //         smsCode: formValM2.value.captcha,
  //       };
  //
  //       submit(authStore.login(params));
  //     }
  //   });
  // }
}

function getLoginCache() {
  let ret = {};
  const cipherText = LS.get<string>(loginCacheKey);
  if (cipherText) {
    const originalText = decryptAes(cipherText, secretKey);
    try {
      ret = JSON.parse(originalText);
    } catch (e) {
      ret = {};
    }
  }
  return ret;
}

function changeType(type: 'text' | 'password') {
  passwordType.value = type;
}

/**
 * 登录状态直接跳转到Mis首页
 */
function checkLoginStatus() {
  // if (store.getters['user/isLogin']) {
  //   goMisIndex();
  // }
}

// 支持按 Enter 登录
onKeyStroke(['Enter'], (e) => {
  handleValidateSubmit();
  e.preventDefault();
});

defineOptions({ name: 'loginForm' });
</script>

<style module lang="scss">
.form-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 375px;
  height: 50vh;
  padding: 35px 45px;
  border-radius: 4px;
  align-self: end;
  background: rgb(0 0 0 / 22%);
}

.form-title {
  color: #fff;
  font-size: 36px;
  letter-spacing: 3px;
  line-height: 44px;
  padding-bottom: 30px;
  text-align: left;
}

.btn-login {
  display: grid;
  margin-top: 40px;
}

.btn-rz {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
  margin-bottom: -10px;
  color: #fff;
}
</style>
