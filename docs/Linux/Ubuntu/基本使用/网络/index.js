const nc = require('./nc');
const iperf = require('./iperf');

module.exports = {
  title: '网络',
  children: [nc, iperf]
};
