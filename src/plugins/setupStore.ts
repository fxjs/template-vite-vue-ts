import { createPinia } from 'pinia';
import { resetSetupStore } from '@/store/plugins';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export function setupStore(app: any) {
  const store = createPinia();
  store.use(resetSetupStore);
  store.use(
    createPersistedState({
      storage: sessionStorage,
    })
  );

  app.use(store);
}
