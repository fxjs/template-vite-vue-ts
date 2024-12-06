export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-mobile-forever': {
      appSelector: '#app',
      viewportWidth: 375,
      maxDisplayWidth: 600,
      border: true,
      exclude: [/\/index.html/], // 忽略
    },
  },
};
