import { setupApi, setupAssets, setupRouter, setupStore } from '@/plugins';
import { createApp } from 'vue';
import App from './App.vue';

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
