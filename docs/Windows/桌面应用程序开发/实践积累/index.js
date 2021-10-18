const httpServer = require('./HttpServer');
const sqlite = require('./SQLite');
const virtualPort = require('./虚拟串口');
const httpClient = require('./HttpClient');
const mqttnet = require('./MQTTnet');
const installProject = require('./安装工程');

module.exports = {
  title: '实践积累',
  children: [installProject, httpServer, httpClient, sqlite, virtualPort, mqttnet]
};
