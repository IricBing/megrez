const nestjs = require('./nestjs');
module.exports = {
  title: 'Jenkins',
  path: '/运维/Jenkins/',
  children: [
    {
      title: 'Docker安装',
      path: '/运维/Jenkins/Docker安装'
    },
    {
      title: '换源',
      path: '/运维/Jenkins/换源'
    },
    {
      title: 'Jenkins中使用Docker',
      path: '/运维/Jenkins/使用Docker'
    },
    {
      title: '配置ssh key',
      path: '/运维/Jenkins/配置ssh_key'
    },
    {
      title: '集成私有Gitlab',
      path: '/运维/Jenkins/集成私有Gitlab'
    },
    {
      title: '构建历史优化',
      path: '/运维/Jenkins/构建历史优化'
    },
    nestjs
  ]
};
