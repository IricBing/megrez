const simple = require('./最简版本');
const multiThread = require('./多线程版本');
const eventLoop = require('./事件循环版本');

module.exports = {
  title: 'TCP 服务端',
  path: '/C/实践积累/网络通信/TCP/服务端/',
  children: [simple, multiThread, eventLoop]
};
