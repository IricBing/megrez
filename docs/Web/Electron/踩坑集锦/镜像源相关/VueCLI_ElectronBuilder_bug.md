# Vue CLI Electron Builder BUG

## 产生场景

通常，下载 `electron` 的时候我们都会指定下载源，一般我们都是使用 `.npmrc` 文件或者 `.yarnrc` 文件来配置，如下所示：

* `.npmrc` 文件配置：

```bash
home="https://npmmirror.com"
registry="https://registry.npmmirror.com/"

electron_mirror="https://npmmirror.com/mirrors/electron/"
electron_builder_binaries_mirror="http://npmmirror.com/mirrors/electron-builder-binaries/"
```

* `.yarnrc` 文件配置

```bash
home "https://npmmirror.com"
registry "https://registry.npmmirror.com/"
disturl "https://npmmirror.com/dist"

electron_mirror "https://cdn.npmmirror.com/binaries/electron/"
electron_builder_binaries_mirror "http://npmmirror.com/mirrors/electron-builder-binaries/"
```

我们的Electron桌面应用是使用vue cli中的electron builder插件来实现的，依赖包版本如下：

* **vue** `3.x`
* **vue cli electron builder** `2.1.1`
* **electron** `13.x`

运行时没问题，但是遇到打包的时候就出现了问题，如下所示：

```bash
To ensure your native dependencies are always matched electron version, simply add script `"postinstall": "electron-builder install-app-deps" to your `package.json`
  • writing effective config  file=dist_electron\builder-effective-config.yaml
  • packaging       platform=win32 arch=x64 electron=13.6.3 appOutDir=dist_electron\win-unpacked
  ⨯ cannot resolve https://npmmirror.com/mirrors/electron/13.6.3/electron-v13.6.3-win32-x64.zip: status code 404
github.com/develar/app-builder/pkg/download.(*Downloader).follow
        /Volumes/data/Documents/app-builder/pkg/download/downloader.go:237
github.com/develar/app-builder/pkg/download.(*Downloader).DownloadNoRetry
        /Volumes/data/Documents/app-builder/pkg/download/downloader.go:128
github.com/develar/app-builder/pkg/download.(*Downloader).Download
        /Volumes/data/Documents/app-builder/pkg/download/downloader.go:112
github.com/develar/app-builder/pkg/electron.(*ElectronDownloader).doDownload
        /Volumes/data/Documents/app-builder/pkg/electron/electronDownloader.go:192
github.com/develar/app-builder/pkg/electron.(*ElectronDownloader).Download
        /usr/local/Cellar/go/1.16.5/libexec/src/runtime/asm_amd64.s:1371
ExecError: E:\code\Thermostat3\mock-tool\node_modules\.pnpm\app-builder-bin@3.7.1\node_modules\app-builder-bin\win\x64\app-builder.exe exited with code ERR_ELECTRON_BUILDER_CANNOT_EXECUTE    
    at ChildProcess.<anonymous> (E:\code\Thermostat3\mock-tool\node_modules\.pnpm\builder-util@22.14.5\node_modules\builder-util\src\util.ts:250:14)
    at Object.onceWrapper (node:events:640:26)
    at ChildProcess.emit (node:events:520:28)
    at ChildProcess.cp.emit (E:\code\Thermostat3\mock-tool\node_modules\.pnpm\cross-spawn@7.0.3\node_modules\cross-spawn\lib\enoent.js:34:29)
    at maybeClose (node:internal/child_process:1092:16)
    at Process.ChildProcess._handle.onexit (node:internal/child_process:302:5) {
  exitCode: 1,
  alreadyLogged: false,
  code: 'ERR_ELECTRON_BUILDER_CANNOT_EXECUTE'
```

## 问题定位

从错误信息中可以看到，错误产生的原因是 `https://npmmirror.com/mirrors/electron/13.6.3/electron-v13.6.3-win32-x64.zip` 文件找不到。最终发现这个 `URL` 不正确，正确的 `URL` 是： `https://npmmirror.com/mirrors/electron/v13.6.3/electron-v13.6.3-win32-x64.zip` 。

这个问题在 `Electron` 网站上已经有了说明，[相关官方文档](https://www.electronjs.org/zh/docs/latest/tutorial/installation)

## 解决方案

基于官方文档，可以有以下两种解决办法：

### 直接修改 `ELECTRON_MIRROR` 地址

* `.npmrc` 文件配置：

```bash
home="https://npmmirror.com"
registry="https://registry.npmmirror.com/"

electron_mirror="https://npmmirror.com/mirrors/electron/v"
electron_builder_binaries_mirror="http://npmmirror.com/mirrors/electron-builder-binaries/"
```

* `.yarnrc` 文件配置

```bash
home "https://npmmirror.com"
registry "https://registry.npmmirror.com/"
disturl "https://npmmirror.com/dist"

electron_mirror "https://cdn.npmmirror.com/binaries/electron/v"
electron_builder_binaries_mirror "http://npmmirror.com/mirrors/electron-builder-binaries/"
```

### 增加 `ELECTRON_CUSTOM_DIR` 变量

* `.npmrc` 文件配置：

```bash
home="https://npmmirror.com"
registry="https://registry.npmmirror.com/"

electron_mirror="https://npmmirror.com/mirrors/electron/"
electron_custom_dir="v{{ version }}"
electron_builder_binaries_mirror="http://npmmirror.com/mirrors/electron-builder-binaries/"
```

* `.yarnrc` 文件配置

```bash
home "https://npmmirror.com"
registry "https://registry.npmmirror.com/"
disturl "https://npmmirror.com/dist"

electron_mirror "https://cdn.npmmirror.com/binaries/electron/"
electron_custom_dir "v{{ version }}"
electron_builder_binaries_mirror "http://npmmirror.com/mirrors/electron-builder-binaries/"
```
