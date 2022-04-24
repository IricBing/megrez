const withSentence = require('./WITH');
const fromSentence = require('./FROM');
const sampleSentence = require('./SAMPLE');
const arrayJoin = require('./ARRAY_JOIN');

module.exports = {
  title: '数据查询',
  path: '/数据库/ClickHouse/基础篇/数据查询/',
  children: [withSentence, fromSentence, sampleSentence, arrayJoin]
};
