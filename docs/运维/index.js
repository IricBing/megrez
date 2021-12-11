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
const prometheus = require('./Prometheus');
const grafana = require('./Grafana');

module.exports = {
  title: '运维',
  children: [letsencrypt, freeSSL, nginx, frp, drone, prometheus, grafana, haproxy, jenkins, sentry, vercel, nmap, pressTest, virtualBox, VMwareESXi, adb]
};
