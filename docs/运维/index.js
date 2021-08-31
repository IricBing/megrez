const letsencrypt = require('./letsencrypt');
const nginx = require('./Nginx');
const sentry = require('./Sentry');
const vercel = require('./Vercel');

module.exports = {
  title: '运维',
  children: [letsencrypt, nginx, sentry, vercel]
};
