const ble = require('./低功耗蓝牙');

module.exports = {
  title: '蓝牙',
  path: '/协议/应用层/蓝牙/',
  children: [
    {
      title: '版本',
      path: '/协议/应用层/蓝牙/版本'
    },
    ble
  ]
};
