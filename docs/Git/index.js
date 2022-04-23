const baseUsage = require('./基本使用');
const advanceUsage = require('./进阶用法');
const gitlab = require('./Gitlab');
const github = require('./GitHub');
const gitea = require('./Gitea');
const ecological = require('./生态');

module.exports = {
  title: 'Git',
  children: [baseUsage, advanceUsage, ecological, gitlab, github, gitea]
};
