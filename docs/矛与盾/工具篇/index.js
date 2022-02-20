const fiddler = require('./Fiddler');
const burpsuite = require('./burpsuite');
const wireshart = require('./Wireshark');

module.exports = {
  title: '工具篇',
  children: [fiddler, burpsuite, wireshart]
};
