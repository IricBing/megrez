const csv = require('./csv文件');
const ipRegion = require('./ip地理信息');
const email = require('./邮件');
const produceTools = require('./生产力工具');

module.exports = {
  title: '实践积累',
  children: [produceTools, email, csv, ipRegion]
};
