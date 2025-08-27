import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import { envConfigPlugin, manifestPlugin, injectVersionInfoPlugin } from '@tanzerfe/plugins-vite';

const outputDir = 'dist';

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
    Components({
      resolvers: [NaiveUiResolver()],
      directoryAsNamespace: true,
    }),
    manifestPlugin({
      output: outputDir,
    }),
    injectVersionInfoPlugin(),
    envConfigPlugin({
      outputDir: outputDir + '/com',
      obfuscate: true,
    }),
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
    manifest: true,
  },
});
