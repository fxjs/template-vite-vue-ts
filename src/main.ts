import { createApp } from 'vue';
import App from './App.vue';
import { setupAssets, setupRouter } from '@/plugins';

async function setupApp() {
  const app = createApp(App);

  // import assets: js、css
  setupAssets();

  // register module router
  await setupRouter(app);

  app.mount('#app');
}

setupApp().then();
