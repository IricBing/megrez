const subscriber = require('./订阅号');
const server = require('./服务号');

module.exports = {
  title: '微信公众平台',
  path: '/Tencent/微信公众平台/',
  children: [server, subscriber]
};
