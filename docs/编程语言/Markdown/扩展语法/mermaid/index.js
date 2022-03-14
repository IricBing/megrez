const pie = require('./饼状图');
const graph = require('./流程图');
const sequenceDiagram = require('./序列图');
const gantt = require('./甘特图');
const classDiagram = require('./类图');
const stateDiagram = require('./状态图');
const journey = require('./用户旅程图');

module.exports = {
  title: 'mermaid',
  path: '/编程语言/Markdown/扩展语法/mermaid/',
  children: [pie, graph, sequenceDiagram, gantt, classDiagram, stateDiagram, journey]
};
