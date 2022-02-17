const mp = require('./微信公众平台');
const pay = require('./微信支付');

module.exports = {
  title: '腾讯生态',
  children: [mp, pay]
};
