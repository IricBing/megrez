const install = require('./安装');
const base = require('./基础篇');
const plugins = require('./插件篇');

module.exports = {
  title: 'Emqx',
  path: '/消息中间件/Emqx/',
  children: [install, base, plugins]
};
