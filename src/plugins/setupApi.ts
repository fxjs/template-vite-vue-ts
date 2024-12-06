import { $Config } from '@tanzerfe/http';
import { useAuthStore } from '@/store/auth';
import { useToast } from '@/common/hooks/useToast.ts';

export function setupApi() {
  const store = useAuthStore();

  $Config.getToken = () => store.userInfo.token;
  $Config.$toastDark = useToast({ theme: 'dark' });
  $Config.$toastLight = useToast({ theme: 'light' });
}
