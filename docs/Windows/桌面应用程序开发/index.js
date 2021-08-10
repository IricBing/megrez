const winForm = require('./WinForm');
const wpf = require('./WPF');

module.exports = {
  title: '桌面应用程序开发',
  children: [
    {
      title: '方案对比',
      path: '/Windows/桌面应用程序开发/方案对比'
    },
    winForm,
    wpf
  ]
};
