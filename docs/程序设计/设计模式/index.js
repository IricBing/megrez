const create = require('./创建型模式');
const struct = require('./结构型模式');
const behavior = require('./行为型模式');
const j2ee = require('./J2EE模式');

module.exports = {
  title: '设计模式',
  path: '/程序设计/设计模式/',
  children: [create, struct, behavior, j2ee]
};
