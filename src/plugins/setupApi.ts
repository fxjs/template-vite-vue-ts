import { $Config } from '@tanzerfe/http';
import { useToastCtx } from '@/common/shareContext';

export function setupApi() {
  $Config.getToken = () => undefined; // 配置获取token的方法
  $Config.$toastDark = useToastCtx({ theme: 'dark' });
  $Config.$toastLight = useToastCtx({ theme: 'light' });
}
