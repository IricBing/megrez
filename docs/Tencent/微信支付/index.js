const provider = require('./服务商支付');
const dockingProcess = require('./对接流程');
const payPlatform = require('./微信商户平台');

module.exports = {
  title: '微信支付',
  path: '/Tencent/微信支付/',
  children: [payPlatform, dockingProcess, provider]
};
