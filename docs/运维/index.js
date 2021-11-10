const letsencrypt = require('./letsencrypt');
const nginx = require('./Nginx');
const haproxy = require('./HAProxy');
const sentry = require('./Sentry');
const vercel = require('./Vercel');
const frp = require('./frp');
const ab = require('./ApacheBench');
const nmap = require('./Nmap');
const virtualBox = require('./VirtualBox');
const adb = require('./adb');
const drone = require('./Drone');
const jenkins = require('./Jenkins');
const VMwareESXi = require('./VMwareESXi');
const freeSSL = require('./FreeSSL');

module.exports = {
  title: '运维',
  children: [letsencrypt, freeSSL, nginx, frp, drone, haproxy, jenkins, sentry, vercel, ab, nmap, virtualBox, VMwareESXi, adb]
};
