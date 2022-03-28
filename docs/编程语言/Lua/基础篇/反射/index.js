const introspective = require('./自省机制');

module.exports = {
  title: '反射 (Reflection)',
  path: '/编程语言/Lua/基础篇/反射/',
  children: [
    introspective,
    {
      title: '钩子 (Hook)',
      path: '/编程语言/Lua/基础篇/反射/钩子'
    },
    {
      title: '调优 (Profile)',
      path: '/编程语言/Lua/基础篇/反射/调优'
    },
    {
      title: '沙盒 (Sandbox)',
      path: '/编程语言/Lua/基础篇/反射/沙盒'
    }
  ]
};
