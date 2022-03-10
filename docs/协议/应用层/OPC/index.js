const ua = require('./UA');
const resource = require('./资料汇总');

module.exports = {
  title: 'OPC',
  path: '/协议/应用层/OPC/',
  children: [resource, ua]
};
