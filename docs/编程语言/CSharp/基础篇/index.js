const start = require('./入门知识');
const array = require('./数组');
const baseLanguage = require('./基础语法');
const delegateAndEvent = require('./委托和事件');
const objectAndClass = require('./类和对象');
const collection = require('./集合');

module.exports = {
  title: '基础篇',
  children: [start, baseLanguage, objectAndClass, array, collection, delegateAndEvent]
};
