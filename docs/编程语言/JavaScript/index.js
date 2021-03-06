const grammar = require('./基础语法');
const experience = require('./实践积累');
const designPatten = require('./设计模式');
const rxjs = require('./RxJS');
const stereotypedWriting = require('./八股文');

module.exports = {
  title: 'JavaScript',
  path: '/编程语言/JavaScript/',
  children: [grammar, experience, designPatten, rxjs, stereotypedWriting]
};
