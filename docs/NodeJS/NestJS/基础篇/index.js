const dynamicModule = require('./动态模块');
const event = require('./事件');
const controllers = require('./Controllers');
const providers = require('./Providers');
const pipes = require('./Pipes');
const middleware = require('./Middleware');

module.exports = {
  title: '基础篇',
  children: [controllers, middleware, providers, pipes, dynamicModule, event]
};
