const develop = require('./开发');
const functional = require('./功能点');

module.exports = {
  title: '服务号',
  path: '/Tencent/微信公众平台/服务号/',
  children: [develop, functional]
};
