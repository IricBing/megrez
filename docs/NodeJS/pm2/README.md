# pm2

[官网地址](https://pm2.keymetrics.io/)

## pm2是做什么的？

总所周知， `nodejs` 是**单主线程**的运行环境，无法最大程度的利用 `CPU` 资源， `pm2` 的定位就是解决这个问题，让应用能够**多开部署**。同时附加一些好用的功能，例如：服务监控等。

尽管有时候我们并不会使用多开的特性，用 `pm2` 部署也会得到很多好处，例如：**自动重启**，**服务状态监控**等功能可以让我们无需增加代码的复杂度就达到期望的需求。

## ubuntu 安装

```bash
$ npm i pm2 -g
```

> [!tip|label: 提示]
> 全局安装完成后即可使用 `pm2` 命令了

## windows 安装

```bash
$ npm install -g pm2
$ npm install pm2-windows-startup -g
$ pm2-startup install
```

## 简单启动项目

```bash
$ pm2 start dist/main.js
```
