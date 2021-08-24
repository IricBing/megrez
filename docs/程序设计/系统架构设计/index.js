const smsAuthCode = require('./短信验证码设计');
const graphAuthCode = require('./图形验证码设计');
const behaviourAuthCode = require('./行为验证码设计');
const auth = require('./认证设计');
const permission = require('./权限设计');
const distributedLock = require('./分布式锁设计');
const schedule = require('./计划任务设计');

module.exports = {
  title: '系统架构设计',
  children: [auth, permission, distributedLock, schedule, smsAuthCode, graphAuthCode, behaviourAuthCode]
};
