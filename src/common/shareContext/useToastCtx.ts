import { MessageOptions } from 'naive-ui';
import { VNodeChild } from 'vue';
import useMndCtx from './useMndCtx';

type ContentType = string | (() => VNodeChild);

export default function useToastCtx(opts?: MessageOptions & { theme?: 'dark' | 'light' }) {
  const ins = useMndCtx().message;

  const createOpt = (): MessageOptions => {
    return {
      keepAliveOnHover: true,
      ...opts,
    };
  };

  // 包装一层用于自定义
  return {
    info: (content: ContentType, options?: MessageOptions) => ins.info(content, { ...createOpt(), ...options }),
    success: (content: ContentType, options?: MessageOptions) => ins.success(content, { ...createOpt(), ...options }),
    warning: (content: ContentType, options?: MessageOptions) => ins.warning(content, { ...createOpt(), ...options }),
    error: (content: ContentType, options?: MessageOptions) => ins.error(content, { ...createOpt(), ...options }),
    loading: (content: ContentType, options?: MessageOptions) =>
      ins.loading(content, { ...createOpt(), render: undefined, ...options }),
    destroyAll: () => ins.destroyAll(),
  };
}
