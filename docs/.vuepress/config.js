const nodejs = require('../NodeJS');
const container = require('../容器');
const windows = require('../Windows');
const ide = require('../IDE');
const web = require('../Web');
const go = require('../Go');
const ops = require('../运维');
const database = require('../数据库');
const hpSocket = require('../HPSocket');

module.exports = {
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-disable-url-encode'));
    }
  },
  plugins: [
    'vuepress-plugin-cat',
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          const dayjs = require('dayjs');
          dayjs.locale('zh-CN');
          return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    ],
    [
      'vuepress-plugin-nuggets-style-copy',
      {
        copyText: '复制代码',
        tip: {
          content: '复制成功'
        }
      }
    ]
  ],
  title: 'Iric',
  description: '个人文档',
  themeConfig: {
    logo: '/logo.jpg',
    lastUpdated: '上次更新',
    // algolia: {
    //   appId: 'YHAMW4458Y',
    //   apiKey: '5935f4465d8e990e92eee1919256e5b0',
    //   indexName: 'megrez',
    //   algoliaOptions: {
    //     hitsPerPage: 10,
    //     facetFilters: "",
    //   }
    // },
    nav: [
      { text: '首页', link: '/' },
      { text: '开始', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/IricBing/megrez' }
    ],
    sidebar: [nodejs, web, go, ops, container, database, hpSocket, windows, ide]
  }
};
