const application = require('./应用层');
const iot = require('./物联网');
const bus = require('./总线协议');
const openSource = require('./开源协议');

module.exports = {
  title: '协议',
  children: [openSource, application, iot, bus]
};
