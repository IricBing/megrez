const pluginDevelop = require('./插件开发');

module.exports = {
  title: 'VSCode',
  children: [
    {
      title: '优秀插件',
      path: '/IDE/VSCode/优秀插件'
    },
    {
      title: '配置Fira Code字体',
      path: '/IDE/VSCode/配置FiraCode字体'
    },
    {
      title: 'region用法',
      path: '/IDE/VSCode/region用法'
    },
    pluginDevelop
  ]
};
