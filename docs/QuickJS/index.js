const environment = require('./环境篇');
const txikijs = require('./txiki.js');
const quickWebServer = require('./QuickWebServer');

module.exports = {
  title: 'QuickJS',
  path: '/QuickJS/',
  children: [environment, txikijs, quickWebServer]
};
