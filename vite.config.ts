import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import { injectVersionInfoPlugin } from './plugins/vite/vite-plugin-inject-version-info';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8181,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/css/variables.scss";`,
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()],
      directoryAsNamespace: true,
    }),
    injectVersionInfoPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      src: resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    cssCodeSplit: true,
  },
});
