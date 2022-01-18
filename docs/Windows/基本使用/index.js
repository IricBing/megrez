const watchPortListen = require('./查看端口占用');
const terminalProxy = require('./终端使用代理');

module.exports = {
  title: '基本使用',
  children: [watchPortListen, terminalProxy]
};
