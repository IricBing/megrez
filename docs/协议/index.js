const application = require('./应用层');
const iot = require('./物联网');

module.exports = {
  title: '协议',
  children: [application, iot]
};
