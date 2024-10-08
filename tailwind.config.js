import pluginCustomOpacity from './plugins/tailwind/plugin-custom-opacity';

const customClassStyle = {
  'flex-ac': 'flex justify-around items-center',
  'flex-sc': 'flex justify-start items-center',
  'flex-ec': 'flex justify-end items-center',
  'flex-bc': 'flex justify-between items-center',
  'flex-cc': 'flex justify-center items-center',
};

const customColors = {
  skin: {
    // 主色调
    c1: 'var(--skin-c1-rgb)',
    c2: 'var(--skin-c2-rgb)',
    c3: 'var(--skin-c3-rgb)',
    c4: 'var(--skin-c4-rgb)',
    c5: 'var(--skin-c5-rgb)',
    // 背景色
    bg0: 'var(--skin-bg0)',
    bg1: 'var(--skin-bg1)',
    bg2: 'var(--skin-bg2)',
    bg3: 'var(--skin-bg3)',
    bg4: 'var(--skin-bg4)',
    // 文本色
    t1: 'var(--skin-t1)',
    t2: 'var(--skin-t2)',
    t3: 'var(--skin-t3)',
    t4: 'var(--skin-t4)',
    t5: 'var(--skin-t5)',
    t6: 'var(--skin-t6)',
    t7: 'var(--skin-t7)',
    t8: 'var(--skin-t8)',
    t9: 'var(--skin-t9)',
    t10: 'var(--skin-t10)',
    // 边框色
    bd1: 'var(--skin-bd1)',
    bd2: 'var(--skin-bd2)',
    // 分隔线颜色
    divide: 'var(--skin-divide)',
  },
};

module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...customColors,
      },
    },
  },
  shortcuts: {
    ...customClassStyle,
  },
  plugins: [pluginCustomOpacity],
};
