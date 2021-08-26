const i2c = require('./I2C');
const rs485 = require('./RS485');
const rs232 = require('./RS232');

module.exports = {
  title: '总线协议',
  children: [i2c, rs485, rs232]
};
