const install = require('./安装');
const baseOperate = require('./基本操作');
const dataType = require('./数据类型');

module.exports = {
  title: '基础篇',
  children: [install, baseOperate, dataType]
};
