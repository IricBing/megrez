const dockerImageCache = require('./Docker镜像缓存');
const aliImageRepo = require('./阿里云容器镜像仓库');
const timezone = require('./时区问题');

module.exports = {
  title: '实践积累',
  children: [
    dockerImageCache,
    timezone,
    aliImageRepo,
    {
      title: '文件操作',
      path: '/运维/Drone/实践积累/文件操作/'
    }
  ]
};
