const environment = require('./环境配置');
const pip = require('./pip');
const coreLib = require('./核心库');
const lib = require('./常用库');
const practice = require('./实践积累');

module.exports = {
  title: 'Python',
  path: '/编程语言/Python/',
  children: [environment, pip, coreLib, lib, practice]
};
