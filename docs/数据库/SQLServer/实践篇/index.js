const auth = require('./身份认证');
const forgetPassword = require('./忘记sa用户密码');

module.exports = {
  title: '实践篇',
  children: [auth, forgetPassword]
};
