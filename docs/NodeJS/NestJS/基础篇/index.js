const dynamicModule = require('./动态模块');
const event = require('./事件');
const controllers = require('./Controllers');
const providers = require('./Providers');
const pipes = require('./Pipes');

module.exports = {
  title: '基础篇',
  children: [controllers, providers, pipes, dynamicModule, event]
};
