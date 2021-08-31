const letsencrypt = require('./letsencrypt');
const nginx = require('./Nginx');
const sentry = require('./Sentry');

module.exports = {
  title: '运维',
  children: [letsencrypt, nginx, sentry]
};
