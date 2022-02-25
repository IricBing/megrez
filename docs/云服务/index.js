const oss = require('./OSS');
const cdn = require('./CDN');

module.exports = {
  title: '云服务',
  children: [oss, cdn]
};
