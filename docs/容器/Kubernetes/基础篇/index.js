const pod = require('./Pod');
const service = require('./Service');
const core = require('./核心组件运行机制');
const security = require('./集群安全机制');
const network = require('./网络原理');
const sharedStorage = require('./共享存储原理');
const ingress = require('./Ingress');
const secret = require('./Secret');

module.exports = {
  title: '基础篇',
  children: [pod, service, ingress, core, security, network, sharedStorage, secret]
};
