import plugin from 'tailwindcss/plugin';

/**
 * windicss插件功能：自定义皮肤支持设置透明度
 * @rule 格式 接收 --skin-xxx-rgb 的配置
 * @opacity 0,10,20...100
 */
module.exports = plugin(({ addUtilities, theme }) => {
  const cs = theme('colors.skin', {});
  const colors = Object.fromEntries(Object.entries(cs).filter(([_, v]) => /-rgb\)$/.test(v)));

  const colorUtilities = Object.keys(colors).reduce((acc, colorName) => {
    const colorValue = colors[colorName];

    acc[`.bg-skin-${colorName}`] = { backgroundColor: `rgba(${colorValue}, 1)` };
    acc[`.text-skin-${colorName}`] = { color: `rgba(${colorValue}, 1)` };
    acc[`.border-skin-${colorName}`] = { borderColor: `rgba(${colorValue}, 1)` };

    for (let i = 0; i <= 100; i += 10) {
      const opacity = i / 100;

      acc[`.bg-skin-${colorName}\\/${i}`] = { backgroundColor: `rgba(${colorValue}, ${opacity})` };
      acc[`.text-skin-${colorName}\\/${i}`] = { color: `rgba(${colorValue}, ${opacity})` };
      acc[`.border-skin-${colorName}\\/${i}`] = { borderColor: `rgba(${colorValue}, ${opacity})` };
    }

    return acc;
  }, {});

  addUtilities(colorUtilities, { variants: ['responsive', 'hover'] });
});
