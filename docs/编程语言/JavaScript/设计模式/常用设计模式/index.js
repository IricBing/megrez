const 单例模式 = require('./单例模式/');
const 策略模式 = require('./策略模式/');
const 代理模式 = require('./代理模式/');
const 迭代器模式 = require('./迭代器模式/');
const pub_sub = require('./发布-订阅模式/');
const 命令模式 = require('./命令模式/');
const 组合模式 = require('./组合模式/');
const 模板方法模式 = require('./模板方法模式/');
const 享元模式 = require('./享元模式/');
const 职责链模式 = require('./职责链模式/');
const 中介者模式 = require('./中介者模式/');
const 装饰者模式 = require('./装饰者模式/');
const 状态模式 = require('./状态模式/');
const 适配器模式 = require('./适配器模式/');
const 观察者模式 = require('./观察者模式/');

module.exports = {
  title: '常用设计模式',
  children: [
    单例模式,
    策略模式,
    代理模式,
    迭代器模式,
    pub_sub,
    命令模式,
    组合模式,
    模板方法模式,
    享元模式,
    职责链模式,
    中介者模式,
    装饰者模式,
    状态模式,
    适配器模式,
    观察者模式
  ]
};
