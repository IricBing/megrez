# 在Docker环境下生成证书

一键生成命令


```bash
$ docker run -it --rm --name certbot \
    -v $PWD:/etc/letsencrypt \
    certbot/certbot \
    certonly --manual --preferred-challenges=dns-01 \
    --server=https://acme-v02.api.letsencrypt.org/directory
```

::: tip 提示
操作与Linux环境下一致，就不在赘述了，具体可以查看[Linux下生成证书](./Linux下生成证书.md)
:::
