const array = require('./数组');
const queue = require('./队列');
const linkedList = require('./链表');
const stack = require('./栈');

module.exports = {
  title: '数据结构',
  path: '/程序设计/数据结构/',
  children: [
    {
      title: '知识架构图',
      path: '/程序设计/数据结构/知识架构图'
    },
    array,
    queue,
    linkedList,
    stack
  ]
};
