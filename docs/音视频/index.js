const ffmpeg = require('./FFmpeg');
const streamMedia = require('./流媒体服务');

module.exports = {
  title: '音视频',
  children: [ffmpeg, streamMedia]
};
