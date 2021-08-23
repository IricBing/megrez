# http转https配置

`核心思想：` 使用 `301` 状态码进行重定向配置。

**示例**

```nginx
server {
  listen 80;	
  server_name xxx.xxx.cn;
  return 301 https://xxx.xxx.cn$request_uri;
}
```
