# Docker 安装

[官方文档](https://docs.microsoft.com/zh-cn/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-powershell)

一键运行命令：

```bash
$ docker run  -d -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<YourStrong@Password>" -p 1433:1433 --name mssql -hostname mssql mcr.microsoft.com/mssql/server:2019-latest
```

`docker-compose` 配置

```yaml
version: "3.8"
services:
  mssql:
    image: mcr.microsoft.com/mssql/server:2019-latest
    container_name: mssql
    hostname: mssql
    restart: always
    environment:
      ACCEPT_EULA: Y
      SA_PASSWORD: m5tgb6tfc%^
    ports:
      - 31433:1433
```

> [!warning|label: 注意]
> 在 `windows` 环境下， `1433` 端口可能不给使用。
