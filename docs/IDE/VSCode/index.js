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
    {
      title: '创建C#控制台项目',
      path: '/IDE/VSCode/创建CSharp控制台项目'
    },
    {
      title: '配置Python环境',
      path: '/IDE/VSCode/配置Python环境/'
    },
    {
      title: '配置Lua环境',
      path: '/IDE/VSCode/配置Lua环境'
    },
    {
      title: 'Windows下使用Cmder终端',
      path: '/IDE/VSCode/Windows下使用cmder终端'
    },
    pluginDevelop
  ]
};
