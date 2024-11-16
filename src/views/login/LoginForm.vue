<template>
  <div :class="$style['form-wrap']">
    <div :class="$style['form-title']">
      <n-gradient-text :gradient="{ from: '#fff', to: '#5fbaff' }" style="--n-font-weight: 600">登录</n-gradient-text>
    </div>
    <n-config-provider :theme="darkTheme">
      <n-tabs v-model:value="loginMode" animated pane-style="padding-top: 30px;" :theme-overrides="overrideTabsTheme()">
        <n-tab-pane :name="1" tab="账号">
          <n-form
            ref="formRefM1"
            class="com-autofill-none-dark"
            :model="formValM1"
            :rules="rulesM1"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
            size="large"
          >
            <n-form-item label="" path="username">
              <n-input v-model:value="formValM1.username" placeholder="请输入账号" clearable>
                <template #prefix><IconUser /></template>
              </n-input>
            </n-form-item>
            <n-form-item label="" path="pwd" style="margin-top: 15px">
              <n-input v-model:value="formValM1.pwd" :type="passwordType" maxlength="16" placeholder="请输入密码">
                <template #prefix><IconLock style="font-size: 18px" /></template>
                <template #suffix>
                  <div class="cursor-pointer">
                    <img
                      src="./assets/no-see.png"
                      v-if="passwordType === 'password'"
                      @click="changeType('text')"
                      alt=""
                    />
                    <img
                      src="./assets/see-pre.png"
                      v-if="passwordType === 'text'"
                      @click="changeType('password')"
                      alt=""
                    />
                  </div>
                </template>
              </n-input>
            </n-form-item>

            <div class="h-[30px]">
              <n-checkbox v-model:checked="isRememberInfo" :theme-overrides="overrideCheckboxTheme()">
                记住登录状态
              </n-checkbox>
            </div>
          </n-form>
        </n-tab-pane>
      </n-tabs>

      <!-- submit -->
      <div :class="$style['btn-login']">
        <n-button type="primary" :loading="loading" @click="handleValidateSubmit" size="large" class="!text-white">
          登录
        </n-button>
      </div>
    </n-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { BxSolidLock as IconLock } from '@kalimahapps/vue-icons';
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';
import { FaUserLarge as IconUser } from '@kalimahapps/vue-icons';
import { FormInst, FormRules, NConfigProvider } from 'naive-ui';
import { onKeyStroke } from '@vueuse/core';
import { overrideCheckboxTheme, overrideTabsTheme } from './overrideTheme';
import { encryptAes, decryptAes, encryptSm2GM, encryptMd5 } from '@/utils/crypto.ts';
import { useAuthStore } from '@/store/auth';
import { useAutoLoading } from '@/common/hooks/useAutoLoading.ts';
import { LS } from '@/utils/storages.ts';
import pkg from '../../../package.json';

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
const formRefM1 = ref<FormInst | null>(null);
const formRefM2 = ref<FormInst | null>(null);
const isRememberInfo = ref(!!loginCacheRes.n); // 有缓存默认勾选

const loginMode = ref<1 | 2>(1); // 登录方式（1-账号密码登录 ；2-短信登录；）
const formValM1 = ref({
  username: loginCacheRes.n || null,
  pwd: loginCacheRes.p || null,
});

const rulesM1: FormRules = {
  username: {
    required: true,
    trigger: ['blur'],
    message: '账号不能为空',
  },
  pwd: {
    required: true,
    trigger: ['blur'],
    message: '密码不能为空',
  },
};

const formValM2 = ref({
  phone: null,
  captcha: null,
});

const authStore = useAuthStore();

function handleValidateSubmit() {
  if (loginMode.value === 1) {
    formRefM1.value?.validate((errors) => {
      if (!errors) {
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

  if (loginMode.value === 2) {
    formRefM2.value?.validate((errors) => {
      if (!errors) {
        if (loading.value) return;
        const params = {
          loginMode: loginMode.value,
          loginName: formValM2.value.phone,
          smsCode: formValM2.value.captcha,
        };

        submit(authStore.login(params));
      }
    });
  }
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
  width: 478px;
  height: 600px;
  padding: 35px 45px;
  border-radius: 4px;
  align-self: end;

  background: rgba(6, 34, 76, 0.7);
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  border: 2px solid #2c5ba8;
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
