const firstExample = require('./第一个示例');
const stack = require('./栈');
const errorHandler = require('./使用C_API进行错误处理');
const memoryAllocation = require('./内存分配');

module.exports = {
  title: '总览',
  path: '/编程语言/Lua/进阶篇/C语言API/总览/',
  children: [firstExample, stack, errorHandler, memoryAllocation]
};
