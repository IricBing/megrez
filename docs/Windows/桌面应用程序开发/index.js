const winForm = require('./WinForm');
const wpf = require('./WPF');
const uwp = require('./UWP');
const experience = require('./实践积累')
const hpSocket = require('./HPSocket')

module.exports = {
  title: '桌面应用程序开发',
  children: [
    {
      title: '方案对比',
      path: '/Windows/桌面应用程序开发/方案对比'
    },
    winForm,
    wpf,
    uwp,
    hpSocket,
    experience
  ]
};
