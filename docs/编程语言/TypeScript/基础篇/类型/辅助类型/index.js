const partial = require('./Partial');
const required = require('./Required');
const readonly = require('./Readonly');
const record = require('./Record');
const pick = require('./Pick');
const omit = require('./Omit');

module.exports = {
  title: '辅助类型',
  path: '/编程语言/TypeScript/基础篇/类型/辅助类型/',
  children: [partial, required, readonly, record, pick, omit]
};
