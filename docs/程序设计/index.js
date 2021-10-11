const architectureIdea = require('./架构思想');
const systemArchitecture = require('./系统架构设计');
const dataStructure = require('./数据结构');
const designPatterns = require('./设计模式');

module.exports = {
  title: '程序设计',
  children: [architectureIdea, dataStructure, designPatterns, systemArchitecture]
};
