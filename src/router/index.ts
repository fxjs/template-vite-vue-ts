import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

const Router = createRouter({
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
  routes,
  history: createWebHashHistory(),
});

export default Router;
