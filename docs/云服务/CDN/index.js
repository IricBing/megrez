const ali = require('./阿里云');
const tencent = require('./腾讯云');
const qiniu = require('./七牛云');

module.exports = {
  title: 'CDN',
  path: '/云服务/CDN/',
  children: [ali, tencent, qiniu]
};
