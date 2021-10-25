const v2004 = require('./20.04');
const baseUsage = require('./基本使用');
const baseKnowledge = require('./基础知识');
const snap = require('./snap');

module.exports = {
  title: 'Ubuntu',
  children: [baseUsage, baseKnowledge, v2004, snap]
};
