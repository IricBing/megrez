const environment = require('./环境配置');
const start = require('./语言入门');
const number = require('./Number');
const string = require('./String');
const table = require('./Table');
const func = require('./Function');
const iteratorAndFor = require('./迭代器和泛型for');
const objectOriented = require('./面向对象编程');
const metaTable = require('./元表和元方法')

module.exports = {
  title: '基础篇',
  children: [
    {
      title: '版本介绍',
      path: '/编程语言/Lua/基础篇/版本介绍'
    },
    environment,
    start,
    number,
    {
      title: 'nil（空）',
      path: '/编程语言/Lua/基础篇/nil/'
    },
    {
      title: 'Boolean（布尔）',
      path: '/编程语言/Lua/基础篇/Boolean/'
    },
    string,
    table,
    func,
    iteratorAndFor,
    metaTable,
    objectOriented
  ]
};
