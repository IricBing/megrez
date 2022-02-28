const init = require('./集群初始化');
const uninstall = require('./卸载');
const rollUpdate = require('./滚动升级');
const privateImageRegistry = require('./私有容器镜像仓库');

module.exports = {
  title: '实践篇',
  children: [init, uninstall, privateImageRegistry, rollUpdate]
};
