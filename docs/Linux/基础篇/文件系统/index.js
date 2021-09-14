const fileFormat = require('./文件格式');
const nfs = require('./nfs');
const encodeFormat = require('./编码格式');

module.exports = {
  title: '文件系统',
  children: [fileFormat, nfs, encodeFormat]
};
