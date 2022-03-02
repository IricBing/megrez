const http = require('./HTTP');
const mqtt = require('./MQTT');
const tcpip = require('./TCPIP');
const udp = require('./UDP');
const bluetooth = require('./蓝牙');
const grpc = require('./GRPC');
const opc = require('./OPC');

module.exports = {
  title: '应用层',
  children: [tcpip, http, mqtt, udp, grpc, bluetooth, opc]
};
