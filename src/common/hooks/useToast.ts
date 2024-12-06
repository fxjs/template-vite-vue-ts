import { themeStore } from '@/theme/ThemeStore.ts';
import { h } from 'vue';
import { Toast, ToastOptions } from 'tdesign-mobile-vue';
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';

export const useToast = (opts: { theme: 'light' | 'dark' }): IToast => {
  const mergeOpt = (o1: any, o2: any) => {
    return Object.assign({}, o1, typeof o2 === 'string' ? undefined : o2);
  };

  const error = (options: Partial<ToastOptions> | string) => {
    const message = typeof options === 'string' ? options : options.message;
    Toast(
      mergeOpt(
        {
          theme: 'error',
          direction: 'column',
          message,
        },
        options
      )
    );
  };

  const success = (options: Partial<ToastOptions> | string) => {
    const message = typeof options === 'string' ? options : options.message;
    Toast(
      mergeOpt(
        {
          theme: 'success',
          direction: 'column',
          message,
        },
        options
      )
    );
  };

  const warning = (options: Partial<ToastOptions> | string) => {
    const message = typeof options === 'string' ? options : options.message;
    Toast(
      mergeOpt(
        {
          icon: () => h(ErrorCircleIcon),
          direction: 'column',
          message,
        },
        options
      )
    );
  };

  return {
    clear: Toast.clear,
    error,
    loading: Toast.loading,
    success,
    warning,
  };
};

export const $toast = useToast({ theme: themeStore.themeRef.value.theme });

interface IToast {
  clear: () => void;
  error: (options: Partial<ToastOptions> | string) => void;
  loading: (options?: Partial<ToastOptions> | string) => void;
  success: (options: Partial<ToastOptions> | string) => void;
  warning: (options: Partial<ToastOptions> | string) => void;
}
