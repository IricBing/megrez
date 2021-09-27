const letsencrypt = require('./letsencrypt');
const nginx = require('./Nginx');
const sentry = require('./Sentry');
const vercel = require('./Vercel');
const frp = require('./frp');
const ab = require('./ApacheBench');
const nmap = require('./Nmap');

module.exports = {
  title: '运维',
  children: [letsencrypt, nginx, frp, sentry, vercel, ab, nmap]
};
