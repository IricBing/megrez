const relationFunction = require('./相关函数');
const replace = require('./替换');

module.exports = {
  title: '模式匹配',
  path: '/编程语言/Lua/基础篇/模式匹配/',
  children: [
    relationFunction,
    {
      title: '模式',
      path: '/编程语言/Lua/基础篇/模式匹配/模式'
    },
    {
      title: '捕获',
      path: '/编程语言/Lua/基础篇/模式匹配/捕获'
    },
    replace,
    {
      title: '诀窍',
      path: '/编程语言/Lua/基础篇/模式匹配/诀窍'
    }
  ]
};
