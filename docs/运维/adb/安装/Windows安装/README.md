# Windows 安装

## 环境

* `Windows 10`
* 非安卓开发者，没有安装`Android Studio`

## 步骤

### Step1. 下载压缩包

下载地址:https://dl.google.com/android/repository/platform-tools-latest-windows.zip

解压到应用程序目录，**不需要安装**。

### Step2. 配置环境变量

在**系统变量**的 `Path` 变量中新建一条，写入 `adb` 文件夹的路径，配置完成。

## 测试

新打开一个终端，输入测试命令：

```bash
$ adb --version
Android Debug Bridge version 1.0.41
Version 33.0.2-8557947
Installed as D:\_pg\platform-tools\adb.exe
```
