const projectConfig = require('./工程配置');
const usageStandard = require('./使用规范');
const publishRock = require('./发布rock');

module.exports = {
  title: '使用规范',
  children: [usageStandard, projectConfig, publishRock]
};
