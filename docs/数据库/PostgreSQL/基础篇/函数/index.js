const mathFunction = require('./数学函数');
const stringFunction = require('./字符串函数');
const dateAndTimeFunction = require('./日期和时间函数');

module.exports = {
  title: '函数',
  children: [mathFunction, stringFunction, dateAndTimeFunction]
};
