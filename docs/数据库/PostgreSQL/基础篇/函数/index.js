const mathFunction = require('./数学函数');
const stringFunction = require('./字符串函数');
const dateAndTimeFunction = require('./日期和时间函数');
const systemInfoFunction = require('./系统信息函数')

module.exports = {
  title: '函数',
  children: [
    mathFunction,
    stringFunction,
    dateAndTimeFunction,
    {
      title: '条件判断函数',
      path: '/数据库/PostgreSQL/基础篇/函数/条件判断函数'
    },
    systemInfoFunction
  ]
};
