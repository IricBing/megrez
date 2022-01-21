const csv = require('./csv文件');
const ipRegion = require('./ip地理信息');
const email = require('./邮件');
const produceTools = require('./生产力工具');
const encryptAndDecrypt = require('./加密解密');
const localNetFileTransfer = require('./局域网文件传输');
const iconfont = require('./阿里巴巴矢量图库');

module.exports = {
  title: '实践积累',
  children: [produceTools, email, csv, encryptAndDecrypt, ipRegion, localNetFileTransfer, iconfont]
};
