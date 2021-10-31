const taxeme = require('./语法特点');
const dataType = require('./基本数据类型');

module.exports = {
  title: '语言基础',
  children: [
    taxeme,
    {
      title: '变量',
      path: '/编程语言/Python/语言基础/变量'
    },
    dataType
  ]
};
