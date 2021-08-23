# 部署vue单页面

`核心思想：` 就是所有找不到资源的请求都转发到index.html页面上。

**示例：**

``` Nginx
server {
	listen 80;
	server_name vue.example.com;

	return 301 https://vue.example.com$request_uri;
}

server {
	listen 443 ssl;
	server_name vue.example.com;

	ssl_certificate /home/ubuntu/certs/T.example.com/public.crt;
	ssl_certificate_key /home/ubuntu/certs/T.example.com/private.key;
	
	root /home/ubuntu/code/iotmanagement/admin/dist;
	index index.html;

	location / {
		try_files $uri $uri/ /index.html;    #核心思想                   
	}
}
```

::: tip 提示
`vue.example.com` 为示例域名。
:::
