# 进程模型

`Electron` 继承了来自 `Chromium` 的多进程架构，这使得此框架在架构上非常相似于一个现代的网页浏览器。 `Chrome` 浏览器的进程模型如下所示：

![chrome进程模型](assets/images/chrome进程模型.png)

`Chrome` 浏览器中的每个标签页在自己的进程中渲染，同时又又一个总的浏览器进程来控制这些标签页的进程以及整个应用程序的生命周期。

`Electron` 应用程序的结构非常相似， `Electron` 中有两个进程，分别为**主进程**和**渲染进程**，与 `Chrome` 的对应关系如下：

|Chrome|Electron|
|-----|-----|
|浏览器进程|主进程|
|标签页进程|渲染进程|

## 主进程

每个 `Electron` 应用都有一个**单一的主进程**，作为应用程序的**入口点**。 主进程在 ` Node.js` 环境中运行，这意味着它具有 `require` 模块和使用所有 `Node.js API` 的能力。

### 窗口管理

主进程的主要目的是使用 `BrowserWindow` 模块创建和管理应用程序窗口。

`BrowserWindow` 类的每个实例创建一个应用程序窗口，且在**单独的渲染器进程**中加载一个网页。 可以从主进程用 `window` 的 `webContent` 对象与网页内容进行交互。

`main.js` 文件示意：

```js
const {
    BrowserWindow
} = require('electron')

const win = new BrowserWindow({
    width: 800,
    height: 1500
})
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

> [!warning|label: 注意]
> 渲染器进程也是为 `web embeds` 而被创建的，例如 `BrowserView` 模块。 嵌入式网页内容也可访问 `webContents` 对象。

由于 `BrowserWindow` 模块是一个 `EventEmitter` ， 所以可以为各种用户事件(例如，最小化或最大化窗口)添加处理程序。

当一个 `BrowserWindow` 实例被销毁时，与其相应的渲染器进程也会被终止。

### 应用程序生命周期

主进程还能通过 `Electron` 的 `app` 模块来控制您应用程序的生命周期。 该模块提供了一整套的事件和方法。

`main.js` 文件示意：

```js
// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})
```

### 原生 API

为了使 `Electron` 的功能不仅仅限于对网页内容的封装，主进程也添加了自定义的 `API` 来与用户的作业系统进行交互。 `Electron` 有着多种控制原生桌面功能的模块，例如菜单、对话框以及托盘图标。

## 渲染进程

每个 `Electron` 应用都会为每个打开的 `BrowserWindow` (与每个网页嵌入)生成一个单独的渲染器进程。 洽如其名，渲染器负责**渲染**网页内容。 所以实际上，运行于渲染器进程中的代码是须遵照网页标准的 (至少就目前使用的 `Chromium` 而言是如此) 。

因此，一个浏览器窗口中的所有的用户界面和应用功能，都应与在网页开发上使用相同的工具和规范来进行攥写。

此外，渲染器无权直接访问 `require` 或其他 ` Node.js API` 。 为了在渲染器中直接包含 `NPM` 模块，必须使用与在 `web` 开发時相同的打包工具 (例如 `webpack` 或 `parcel` )

> [!warming|label: 注意]
> 渲染器进程可以生成一个完整的 `Node.js` 环境以便于开发。 在过去这是默认的，但如今此功能考虑到安全问题已经**被禁用**。

## 预加载脚本

**预加载**（ `preload` ）脚本包含了那些执行于渲染器进程中，且**先于**网页内容开始加载的代码 。 这些脚本虽运行于渲染器的环境中，却因能访问 `Node.js API` 而拥有了更多的权限。

预加载脚本可以在 `BrowserWindow` 构造方法中的 `webPreferences` 选项里被附加到主进程。

`main.js` 文件示意：

```js
const {
    BrowserWindow
} = require('electron')
//...
const win = new BrowserWindow({
    webPreferences: {
        preload: 'path/to/preload.js'
    }
})
//...
```

由于预加载脚本与渲染器共享同一个全局 `Window` 接口，并且可以访问 `Node.js API` ，因此它通过在 `window` 全局中暴露任意您的网络内容可以随后使用的 `API` 来增强渲染器。
