const systemConfig = require('./系统配置');
const installApp = require('./软件安装');

module.exports = {
  title: '20.04',
  children: [systemConfig, installApp]
};
