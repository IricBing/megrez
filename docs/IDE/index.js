const vs = require('./VirtualStudio');
const androidStudio = require('./AndroidStudio');
const vscode = require('./VSCode');

module.exports = {
  title: 'IDE',
  children: [vscode, vs, androidStudio]
};
