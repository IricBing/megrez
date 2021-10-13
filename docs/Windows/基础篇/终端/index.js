const cmd = require('./CMD');
const powershell = require('./PowerShell');
const cmder = require('./Cmder');

module.exports = {
  title: '终端',
  children: [cmd, powershell, cmder]
};
