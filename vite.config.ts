import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { injectVersionInfoPlugin } from './plugins/vite/vite-plugin-inject-version-info';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
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
    AutoImport({
      resolvers: [
        TDesignResolver({
          library: 'mobile-vue',
        }),
      ],
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'mobile-vue',
        }),
      ],
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
