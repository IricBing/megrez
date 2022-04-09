const ready = require('./准备字典数据');
const metadata = require('./扩展字典配置文件的元素组成');
const dataStructure = require('./扩展字典的数据结构');
const type = require('./扩展字典的类型');
const dataSource = require('./扩展字典的数据源');
const updateStrategy = require('./扩展字典的数据更新策略');
const basicOperation = require('./扩展字典的基本操作');

module.exports = {
  title: '外部扩展字典',
  path: '/数据库/ClickHouse/基础篇/数据字典/外部扩展字典/',
  children: [ready, metadata, dataStructure, type, dataSource, updateStrategy, basicOperation]
};
