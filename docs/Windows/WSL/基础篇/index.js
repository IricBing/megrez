const baseCMD = require('./基本命令');
const vs = require('./WSL1vsWSL2');
const explorer = require('./文件管理器');

module.exports = {
  title: '基础篇',
  children: [baseCMD, explorer, vs]
};
