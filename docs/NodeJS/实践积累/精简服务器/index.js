const tcp = require('./TCP');
const udp = require('./UDP');
const mqtt = require('./MQTT');
const http = require('./HTTP');

module.exports = {
  title: '精简服务器',
  children: [tcp, udp, http, mqtt]
};
