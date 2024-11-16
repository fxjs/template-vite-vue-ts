import { $Config } from '@tanzerfe/http';
import useToastCtx from '@/common/shareContext/useToastCtx.ts';
import { useAuthStore } from '@/store/auth';

export function setupApi() {
  const store = useAuthStore();

  $Config.getToken = () => store.userInfo.token;
  $Config.$toastDark = useToastCtx({ theme: 'dark' });
  $Config.$toastLight = useToastCtx({ theme: 'light' });
}
