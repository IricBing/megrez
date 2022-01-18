# 终端使用代理

> [!tip]
> 支持 `CMD` 和 `Powershell` 。

```powershell
# 使用 http 类型代理
set http_proxy=http://127.0.0.1:1088
set https_proxy=http://127.0.0.1:1088

# 使用 socks 类型代理
netsh winhttp set proxy proxy-server="socks=127.0.0.1:1080" bypass-list="localhost"
netsh winhttp show proxy
netsh winhttp reset proxy

# 使用 socks 类型代理
set http_proxy=socks5://127.0.0.1:1088
set https_proxy=socks5://127.0.0.1:1088
```
