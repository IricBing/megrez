const cAPI = require('./C语言API');
const threadWithCoroutine = require('./使用协程实现多线程');

module.exports = {
  title: '进阶篇',
  children: [cAPI, threadWithCoroutine]
};
