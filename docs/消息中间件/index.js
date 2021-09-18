const emqx = require('./Emqx');
const kafka = require('./Kafka');

module.exports = {
  title: '消息中间件',
  children: [emqx, kafka]
};
