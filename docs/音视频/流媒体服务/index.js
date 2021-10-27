const ZLMediaKit = require('./ZLMediaKit');
const NodeMediaServer = require('./NodeMediaServer');

module.exports = {
  title: '流媒体服务',
  children: [ZLMediaKit, NodeMediaServer]
};
