const grammar = require('./基础语法');
const experience = require('./实践积累');
const designPatten = require('./设计模式');
const quickjs = require('./QuickJS');
const rxjs = require('./RxJS');

module.exports = {
  title: 'JavaScript',
  path: '/编程语言/JavaScript/',
  children: [grammar, experience, designPatten, rxjs, quickjs]
};
