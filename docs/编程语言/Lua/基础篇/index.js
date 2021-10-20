const environment = require('./环境配置');
const start = require('./语言入门');
const number = require('./Number');

module.exports = {
  title: '基础篇',
  children: [
    {
      title: '版本介绍',
      path: '/编程语言/Lua/基础篇/版本介绍'
    },
    environment,
    start,
    number
  ]
};
