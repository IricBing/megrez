const letsencrypt = require('./letsencrypt');
const nginx = require('./Nginx');

module.exports = {
  title: '运维',
  children: [letsencrypt, nginx]
};
