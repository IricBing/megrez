# 刷机

## 参考文章

* https://www.bilibili.com/read/mobile?id=12383715    （推荐）
* https://www.right.com.cn/forum/thread-8203564-1-1.html

## Step1. 刷入开发版固件

打开[官方下载网页](http://miwifi.com/miwifi_download.html)，点击 `下载` ——> `ROM` ，找到小米路由器3G，下载开发版固件，如下所示：



![开发版固件下载](assets/images/开发版固件下载.png)



> [!tip|label: 提示]
> 由于此固件已经停止更新，为了避免后续在官网上下架，在此备份了最新的一版——[miwifi_r3g_firmware_12f97_2.25.124.bin](https://megrez-file.virtualbing.fun/%E6%8A%98%E8%85%BE%2F%E5%B0%8F%E7%B1%B3%E8%B7%AF%E7%94%B1%E5%99%A8R3G%2F%E5%88%B7%E6%9C%BA%2Fmiwifi_r3g_firmware_12f97_2.25.124.bin)

接下来进入路由器管理页面，进入**常用设置**——> **系统状态**页面，选择**手动升级**，上传刚刚下载的升级包即可，如下所示：



![手动升级页面](assets/images/手动升级页面.png)



因为最新的稳定版本是 `2.28` 的，我们相当于降版本了，因此会有如下提示：



![降版本提示](assets/images/降版本提示.png)



## Step2. 开启SSH功能

上一步刷完开发版本固件之后，相当于刷机了，重启路由器后我们通过 `192.168.31.1` 进入路由器配置页面，并下载手机端 `APP` ，使用小米账号登录（没有就创建一个），然后手机连接路由器 `wifi` ，打开小米 `WiFi` 路由器就会提示绑定设备了。

接下来进入[官方开放网页](http://miwifi.com/miwifi_open.html)，点击开放，先点击**立即加入**，登录小米账号，如下所示：



![加入开放平台](assets/images/加入开放平台.png)



登录小米账号之后点击**开启SSH工具**按钮，就会检查绑定到此账号下的路由器设备，如果没有，就无法下载 `ssh` 工具，下载页面如下所示：



![下载ssh工具](assets/images/下载ssh工具.png)



记住 `root` 密码。下载好的文件：<a href="折腾/小米路由器R3G/刷机/assets/files/miwifi_ssh.bin" download="miwifi_ssh.bin">miwifi_ssh.bin</a>

> [!tip|label: 提示]
> `ssh` 工具下载会遇到一个错误： `Mixed Content: The site at 'https://d.miwifi.com/' was loaded over a secure connection, but the file at 'https://d.miwifi.com/rom/ssh/download?sn=15757%2F30048427&userId=1477505979' was redirected through an insecure connection. This file should be served over HTTPS. This download has been blocked. See https://blog.chromium.org/2020/02/protecting-users-from-insecure.html for more details.` 我们手动点击下载连接下载即可。

接下来找一个**U盘**，最好格式化成 `FAT/FAT32` 格式，之后将下载下来的<a href="折腾/小米路由器R3G/刷机/assets/files/miwifi_ssh.bin" download="miwifi_ssh.bin">miwifi_ssh.bin</a>文件放到U盘的**根目录**，并保证名称仍然是<a href="折腾/小米路由器R3G/刷机/assets/files/miwifi_ssh.bin" download="miwifi_ssh.bin">miwifi_ssh.bin</a>。
