const start = require('./启动相关');
const nosupportPnpm = require('./不支持pnpm');
const mirror = require('./镜像源相关');

module.exports = {
  title: '踩坑集锦',
  children: [mirror, start, nosupportPnpm]
};
