const winForm = require('./WinForm');
const wpf = require('./WPF');
const uwp = require('./UWP');
const mfc = require('./MFC')
const experience = require('./实践积累');
const hpSocket = require('./HPSocket');
const nuget = require('./NuGet')

module.exports = {
  title: '桌面应用程序开发',
  children: [
    {
      title: '方案对比',
      path: '/Windows/桌面应用程序开发/方案对比'
    },
    {
      title: '.Net Standard vs .Net Framework vs .Net Core',
      path: '/Windows/桌面应用程序开发/底层架构说明'
    },
    winForm,
    wpf,
    uwp,
    mfc,
    hpSocket,
    nuget,
    experience
  ]
};
