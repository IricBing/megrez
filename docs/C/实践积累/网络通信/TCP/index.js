const server = require('./服务端');
const client = require('./客户端');

module.exports = {
  title: 'TCP',
  children: [server, client]
};
