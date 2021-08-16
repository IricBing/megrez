const nodejs = require('../NodeJS');
const container = require('../容器');
const windows = require('../Windows');
const ide = require('../IDE');
const web = require('../Web');
const go = require('../Go');

module.exports = {
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-disable-url-encode'));
    }
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          const dayjs = require('dayjs');
          dayjs.locale('zh-CN');
          return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    ]
  ],
  title: 'Iric',
  description: '个人文档',
  themeConfig: {
    logo: '/logo.jpg',
    lastUpdated: '上次更新',
    nav: [
      { text: '首页', link: '/' },
      { text: '开始', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/IricBing/megrez' }
    ],
    sidebar: [nodejs, web, go, container, windows, ide]
  }
};
