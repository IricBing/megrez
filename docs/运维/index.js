const letsencrypt = require('./letsencrypt');
const nginx = require('./Nginx');
const haproxy = require('./HAProxy');
const sentry = require('./Sentry');
const vercel = require('./Vercel');
const frp = require('./frp');
const nmap = require('./Nmap');
const virtualBox = require('./VirtualBox');
const adb = require('./adb');
const drone = require('./Drone');
const jenkins = require('./Jenkins');
const VMwareESXi = require('./VMwareESXi');
const freeSSL = require('./FreeSSL');
const pressTest = require('./压力测试');
const monitor = require('./监控');
const sideRoute = require('./旁路由');

module.exports = {
  title: '运维',
  children: [letsencrypt, freeSSL, nginx, frp, drone, monitor, haproxy, jenkins, sentry, vercel, nmap, pressTest, virtualBox, VMwareESXi, adb, sideRoute]
};
