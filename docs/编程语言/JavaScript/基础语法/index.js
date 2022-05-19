const array = require('./数组');
const obj = require('./对象');
const reg = require('./正则');
const es2016 = require('./ES2016plus');
const set = require('./Set');
const map = require('./Map');

module.exports = {
  title: '基础语法',
  children: [obj, array, set, map, reg, es2016]
};
