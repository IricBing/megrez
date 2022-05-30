const log = require('./日志');
const crossPlatform = require('./跨平台构建');

module.exports = {
  title: '基本使用',
  children: [
    crossPlatform,
    {
      title: '镜像管理',
      path: '/容器/Docker/基本使用/镜像管理'
    },
    {
      title: '容器管理',
      path: '/容器/Docker/基本使用/容器管理'
    },
    log
  ]
};
