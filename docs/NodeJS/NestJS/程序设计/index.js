const configModuleDesign = require('./配置模块设计');
const requestContext = require('./请求上下文');
const systemLog = require('./系统日志');
const userActivityLog = require('./用户活动日志');
const httpAuth = require('./HTTP认证');

module.exports = {
  title: '程序设计',
  children: [configModuleDesign, requestContext, systemLog, userActivityLog, httpAuth]
};
