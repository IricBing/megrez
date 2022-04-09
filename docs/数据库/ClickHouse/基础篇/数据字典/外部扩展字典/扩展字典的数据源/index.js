const databaseType = require('./数据库类型');

module.exports = {
  title: '扩展字典的数据源',
  path: '/数据库/ClickHouse/基础篇/数据字典/外部扩展字典/扩展字典的数据源/',
  children: [
    {
      title: '文件类型',
      path: '/数据库/ClickHouse/基础篇/数据字典/外部扩展字典/扩展字典的数据源/文件类型'
    },
    databaseType,
    {
      title: '其他类型',
      path: '/数据库/ClickHouse/基础篇/数据字典/外部扩展字典/扩展字典的数据源/其他类型'
    }
  ]
};
