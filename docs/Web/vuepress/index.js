const config = require('./项目配置');
const extension = require('./扩展插件');
const ecology = require('./周边生态');

module.exports = {
  title: 'vuepress',
  children: [config, extension, ecology]
};
