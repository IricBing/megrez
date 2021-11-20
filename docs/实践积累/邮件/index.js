const buildBySelf = require('./自建邮件服务器');

module.exports = {
  title: '邮件',
  children: [
    buildBySelf,
    {
      title: 'QQ邮箱开通SMTP服务',
      path: '/实践积累/邮件/QQ邮箱开通SMTP服务/'
    }
  ]
};
