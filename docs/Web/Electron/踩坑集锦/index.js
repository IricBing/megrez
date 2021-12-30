const start = require('./启动相关');
const nosupportPnpm = require('./不支持pnpm');

module.exports = {
  title: '踩坑集锦',
  children: [start, nosupportPnpm]
};
