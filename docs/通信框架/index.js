const hpSocket = require('./HPSocket');
const zeroMQ = require('./ZeroMQ');

module.exports = {
  title: '通信框架',
  children: [hpSocket, zeroMQ]
};
