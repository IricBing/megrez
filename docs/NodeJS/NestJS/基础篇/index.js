const dynamicModule = require('./动态模块');
const event = require('./事件');
const controllers = require('./Controllers');
const providers = require('./Providers');

module.exports = {
  title: '基础篇',
  children: [controllers, providers, dynamicModule, event]
};
