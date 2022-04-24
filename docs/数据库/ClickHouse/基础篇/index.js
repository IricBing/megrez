const roadmap = require('./发展历程');
const defineData = require('./数据定义');
const arch = require('./架构概述');
const dataDictionary = require('./数据字典');
const dataQuery = require('./数据查询');

module.exports = {
  title: '基础篇',
  children: [roadmap, arch, defineData, dataDictionary, dataQuery]
};
