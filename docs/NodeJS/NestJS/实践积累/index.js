const authentication = require('./认证');
const email = require('./email');
const socketIOCluster = require('./socket.io集群版');
const redis = require('./redis');
const xmlSupport = require('./支持XML传参');
const official = require('./微信公众号');
const wechatPay = require('./微信支付');
const aliPay = require('./支付宝支付');
const wechatMP = require('./微信小程序');
const nccPack = require('./ncc打包');
const pkg = require('./pkg打包');

module.exports = {
  title: '实践积累',
  children: [authentication, xmlSupport, official, wechatMP, wechatPay, aliPay, email, redis, socketIOCluster, nccPack, pkg]
};
