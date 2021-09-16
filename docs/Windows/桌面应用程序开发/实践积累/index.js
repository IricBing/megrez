const httpServer = require('./HttpServer');
const sqlite = require('./SQLite');
const virtualPort = require('./虚拟串口');
const httpClient = require('./HttpClient');
const mqttnet = require('./MQTTnet');

module.exports = {
  title: '实践积累',
  children: [httpServer, httpClient, sqlite, virtualPort, mqttnet]
};
