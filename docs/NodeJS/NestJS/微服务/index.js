const grpc = require('./GRPC');
const mqtt = require('./MQTT');
const kafka = require('./Kafka');

module.exports = {
  title: '微服务',
  children: [grpc, mqtt, kafka]
};
