const catVersionInfo = require('./查看版本信息');
const restart = require('./重启');

module.exports = {
  title: '运维篇',
  children: [catVersionInfo, restart]
};
