const catVersionInfo = require('./查看版本信息');
const restart = require('./重启');
const upgrade = require('./升级');
const log = require('./日志');

module.exports = {
  title: '运维篇',
  children: [catVersionInfo, restart, upgrade, log]
};
