const emqx = require('./Emqx');
const kafka = require('./Kafka');
const gmqtt = require('./Gmqtt');

module.exports = {
  title: '消息中间件',
  children: [emqx, kafka, gmqtt]
};
