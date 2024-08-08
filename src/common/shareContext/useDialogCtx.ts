import { DialogOptions } from 'naive-ui';
import useMndCtx from './useMndCtx';

export default function useDialogCtx(dialogOptions?: DialogOptions) {
  const ins = useMndCtx().dialog;
  const createOpt = (): DialogOptions => {
    return {
      title: '温馨提醒',
      showIcon: true,
      ...dialogOptions,
    };
  };

  // 包装一层用于自定义
  return {
    info: (options?: DialogOptions) => ins.info({ ...createOpt(), ...options }),
    success: (options?: DialogOptions) => ins.success({ ...createOpt(), ...options }),
    warning: (options?: DialogOptions) => ins.warning({ ...createOpt(), ...options }),
    error: (options?: DialogOptions) => ins.error({ ...createOpt(), ...options }),
    destroyAll: () => ins.destroyAll(),
  };
}
