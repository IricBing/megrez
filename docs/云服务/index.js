const oss = require('./OSS');
const cdn = require('./CDN');
const sms = require('./短信平台');

module.exports = {
  title: '云服务',
  children: [oss, cdn, sms]
};
