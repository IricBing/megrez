# 项目初始化——基于vscode

## Step1. 基于脚手架新建工程

```shell
$ npm install -g @vue/cli   # 安装脚手架

$ vue create -p dcloudio/uni-preset-vue demo    # 生成项目，名称叫demo
```

## Step2. 优化vscode对uni-app的支持

安装类型包

```shell
$ yarn add -D @types/uni-app @types/html5plus
```

下载资源文件：[Github 地址](https://github.com/zhetengbiji/uniapp-snippets-vscode)

将 `css.code-snippets` 、 `js.code-snippets` 、 `vue-html.code-snippets` 三个文件放到 `.vscode` 文件夹下即可。

## Step3. 修改gitignore规则

删除原来的`.vscode`规则，添加如下规则：

```shell
# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# VSCode uniapp 代码块
!.vscode/css.code-snippets
!.vscode/js.code-snippets
!.vscode/vue-html.code-snippets
```