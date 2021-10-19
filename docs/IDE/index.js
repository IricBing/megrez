const vs = require('./VisualStudio');
const androidStudio = require('./AndroidStudio');
const vscode = require('./VSCode');
const pycharm = require('./PyCharm');

module.exports = {
  title: 'IDE',
  children: [vscode, vs, pycharm, androidStudio]
};
