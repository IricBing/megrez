# Docker 安装

[官方文档](https://docs.microsoft.com/zh-cn/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-powershell)

一键运行命令：

```bash
$ docker run  -d -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<YourStrong@Passw0rd>" -p 1433:1433 --name sql1 -hostname sql1 mcr.microsoft.com/mssql/server:2019-latest
```

docker-compose配置

```yaml

```