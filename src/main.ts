import { createApp } from 'vue';
import App from './App.vue';
import { setupApi, setupAssets, setupRouter } from '@/plugins';

async function setupApp() {
  const app = createApp(App);

  // import assets: js、css
  setupAssets();

  // api
  setupApi();

  // register module router
  await setupRouter(app);

  app.mount('#app');
}

setupApp().then();
