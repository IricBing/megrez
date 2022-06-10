# error: insufficient permissions for device

## 产生场景

```bash
$ adb shell
error: insufficient permissions for device: user in plugdev group; are your udev rules wrong?
See [http://developer.android.com/tools/device.html] for more information
```

## 产生原因

## 解决方案

首先查看插入的 `USB` 设备的 `ID` 号：

```bash
$ lsusb
Bus 002 Device 007: ID 2cb7:0a06 Fibocom Wireless Inc. FM650 Module
```

接下来进入 `/etc/udev/rules.d/` 文件夹下，新建规则文件：

```bash
$ cd /etc/udev/rules.d/
$ sudo vim 51-fm650.rules
```

> [!tip|label: 提示] 
> 规则文件命名规则： `${number}-${name}.rules` 。

写入如下内容：

```apacheconfig
SUBSYSTEM=="usb", ATTRS{idVendor}=="2cb7", ATTRS{idProduct}=="0a06",MODE="0666"
```

加下来保存文件，并赋予权限：

```bash
$ sudo chmod a+x 51-fm650.rules
```

## 验证

拔掉 `usb` 重新插上测试：

```bash
$ adb devices
$ adb shell
```
