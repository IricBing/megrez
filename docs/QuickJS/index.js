const environment = require('./环境篇');
const txikijs = require('./txiki.js');
const quickWebServer = require('./QuickWebServer');
const source = require('./源码解读');

module.exports = {
  title: 'QuickJS',
  path: '/QuickJS/',
  children: [environment, source, txikijs, quickWebServer]
};
