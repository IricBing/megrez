const vs = require('./VisualStudio');
const androidStudio = require('./AndroidStudio');
const vscode = require('./VSCode');

module.exports = {
  title: 'IDE',
  children: [vscode, vs, androidStudio]
};
