const language = require('./docs/编程语言');
const nodejs = require('./docs/NodeJS');
const container = require('./docs/容器');
const windows = require('./docs/Windows');
const ide = require('./docs/IDE');
const web = require('./docs/Web');
const go = require('./docs/Go');
const rust = require('./docs/Rust')
const ops = require('./docs/运维');
const database = require('./docs/数据库');
const communicationFramework = require('./docs/通信框架');
const programDesign = require('./docs/程序设计');
const git = require('./docs/Git');
const adobe = require('./docs/Adobe');
const protocol = require('./docs/协议');
const linux = require('./docs/Linux');
const mq = require('./docs/消息中间件');
const google = require('./docs/Google');
const webAssembly = require('./docs/WebAssembly');
const experience = require('./docs/实践积累');
const media = require('./docs/音视频');
const myPC = require('./docs/个人电脑');
const blockchain = require('./docs/区块链');
const ai = require('./docs/AI');
const threeDimensions = require('./docs/3D建模');
const tencent = require('./docs/Tencent')
const openSource = require('./docs/优质开源项目')

const sidebar = [
  language,
  programDesign,
  nodejs,
  web,
  webAssembly,
  git,
  rust,
  go,
  ops,
  container,
  database,
  linux,
  mq,
  communicationFramework,
  windows,
  protocol,
  openSource,
  tencent,
  media,
  ai,
  blockchain,
  experience,
  threeDimensions,
  ide,
  adobe,
  google,
  myPC
];

const tail = path => {
  if(path.endsWith('/')) return `(${path+'README.md'})`
  if(path.endsWith('.md')) return `(${path})`;
  return `(${path + '.md'})`
}

const recursion = (level, list, result) => {
  for (const item of list) {
    const content =[...new Array(level).keys()].map(i => '  ').join('') + `- ${item.path ? '[' + item.title + ']' +  tail(item.path) : item.title}`;
    result.push(content);
    if (item.children?.length) recursion(level + 1, item.children, result);
  }
};

const result = [];
recursion(0,sidebar,result)

const fs = require("fs");
fs.writeFile("./docs/_sidebar.md", result.join('\n'), error => {
  if (error) return console.log("菜单栏文件生成失败,原因是" + error.message);
  console.log("菜单栏文件生成成功！");
});
