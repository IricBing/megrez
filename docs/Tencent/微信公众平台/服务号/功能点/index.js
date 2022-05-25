const recommendedAttentionAfterPayment = require('./支付后推荐关注');
const templateMessage = require('./模板消息');
const subscribeNotify = require('./订阅通知');

module.exports = {
  title: '功能点',
  children: [recommendedAttentionAfterPayment, templateMessage, subscribeNotify]
};
