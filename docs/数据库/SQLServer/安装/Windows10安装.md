# Windows10 安装

> [!tip|label: 提示]
> 本次安装基于 `SQL Server 2019 Express` 版本。

在官网下载即可，[官网下载页面](https://www.microsoft.com/zh-cn/sql-server/sql-server-downloads#)

如下所示：

![SQLServerExpress版下载](assets/images/SQLServerExpress版下载.png)

之后双击安装，注意选择自定义安装，接下来更改安装地址即可。

![自定义安装SQLServer](assets/images/自定义安装SQLServer.png)

## 安装注意事项

在安装的时候，不要安装什么 `Java` 、 `R` 、 `Python` 支持、分析啥的，只勾选一个**全文和语义提取搜索**即可。选择认证的时候注意选择 `WIndows` 身份认证和 `SQLServer` 身份验证两种认证。

## 后续操作

### 开启TCP/IP协议支持

按照上述方式安装完成之后，会发现通过代码等方式连接不上，只能在 `SSMS` 中通过 `windows` 身份验证和 `SQL Server` 身份验证中的**默认地址**来连接，这是因为默认是关闭 `TCP/IP` 连接的，需要我们主动开启。

打开 `SQL Server Configuration Manager` 软件，选择左侧菜单栏中的**SQL Server xxx 网络配置**，选择**MSSQLSERVER的协议**，之后选择 `TCP/IP` ，开启它，并在 `ip` 配置中拉到最后，在 `All IP` 哪里将**动态端口**设置为**0**或者**空**，端口设置为 `1433` ，之后重启 `SQL Server` 服务。
