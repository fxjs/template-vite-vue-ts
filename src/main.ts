import { createApp } from 'vue';
import App from './App.vue';
import { setupAssets } from '@/plugins/setupAssets.ts';
import { setupStore } from '@/plugins/setupStore.ts';
import { setupApi } from '@/plugins/setupApi.ts';
import { setupRouter } from '@/plugins/setupRouter.ts';

async function setupApp() {
  const app = createApp(App);

  // import assets: js、css
  setupAssets();

  // register store
  setupStore(app);

  // api
  setupApi();

  // register module router
  setupRouter(app);

  app.mount('#app');
}

setupApp().then();
