# Nginx部署热更新

> [!tip|label:提示]
> 由于时间关系，原因以及理论就不在过多的赘述了，上解决方案


## Nginx配置

```nginx
server {
  listen 80;
  server_name vue.example.com;

  return 301 https://vue.example.com$request_uri;
}

server {
  listen 443 ssl;
  server_name vue.example.com;

  ssl_certificate /home/ubuntu/certs/T.yun-ran.com/public.crt;
  ssl_certificate_key /home/ubuntu/certs/T.yun-ran.com/private.key;

  root /home/ubuntu/code/cloud/admin/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;           
    if ($request_filename ~* ^.*?.(html|htm)$){
      add_header Cache-Control no-cache,no-store,must-revalidate;
    }
  }
}
```

## Vue 中检测代码

```javascript
import axios from 'axios';
import md5 from 'md5';

const AppHashKey = 'app_hash';

/** 检查应用是否有更新 */
export const checkUpdate = () => {
    if (process.env.NODE_ENV !== 'production') return;
    const url = window.location.origin + '/index.html?hash=' + md5(Math.random().toString());
    axios
        .get(url)
        .then(({
            data
        }) => {
            if (md5(data) !== localStorage.getItem(AppHashKey)) {
                localStorage.setItem(AppHashKey, md5(data));
                window.location.reload();
            }
        })
        .catch(err => console.error(err));
};
```

## 实践方式

在**前置路由守卫**处调用。

## 方案不足

简单确实是简单，但是会造成过多的请求 `index.html` 文件，资源会占用比较多。

> [!tip|label:目标]
> 方案优化持续进行中……
