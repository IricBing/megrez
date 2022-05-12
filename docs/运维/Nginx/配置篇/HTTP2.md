# HTTP2

## 配置综述

由于 `HTTP2` 必须要依赖 `SSL` ，所以必须启用 `SSL` 才行。

配置也很简单，只需要在 `listen` 语句中增加 `http2` 标志即可： `listen 443 ssl http2;`

## 示例

```nginx
server {
	listen 80;
	server_name www.example.com;

	return 301 https://www.example.com$request_uri;
}

server {
	listen 443 ssl http2;
	server_name www.example.com;

	ssl_certificate public.crt;
	ssl_certificate_key private.key;

	ssl_ciphers EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
}
```
