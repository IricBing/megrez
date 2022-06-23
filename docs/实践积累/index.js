const csv = require('./csv文件');
const ipRegion = require('./ip地理信息');
const email = require('./邮件');
const produceTools = require('./生产力工具');
const encryptAndDecrypt = require('./加密解密');
const localNetFileTransfer = require('./局域网文件传输');
const iconfont = require('./阿里巴巴矢量图库');
const ocr = require('./图片文字识别');
const imageEnhance = require('./图片增强');
const tftpServer = require('./TFTP服务器搭建');
const cloudDisk = require('./云盘');
const cpuVirtualize = require('./CPU虚拟化');
const asciiArt = require('./ASCII艺术');

module.exports = {
  title: '实践积累',
  children: [
    produceTools,
    email,
    csv,
    encryptAndDecrypt,
    ipRegion,
    localNetFileTransfer,
    iconfont,
    ocr,
    imageEnhance,
    tftpServer,
    cloudDisk,
    cpuVirtualize,
    asciiArt
  ]
};
