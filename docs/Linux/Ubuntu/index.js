const v2004 = require('./20.04');
const v2204 = require('./22.04');
const baseUsage = require('./基本使用');
const baseKnowledge = require('./基础知识');
const practice = require('./实践积累');
const snap = require('./snap');

module.exports = {
  title: 'Ubuntu',
  children: [baseUsage, baseKnowledge, practice, v2004, v2204, snap]
};
