# ERR_PNPM_UNEXPECTED_PKG_CONTENT_IN_STORE

## 错误产生场景

使用 `pnpm i` 安装依赖的时候。

## 产生原因

猜测是 `npm` **换源**后校验失败了。

## 解决方案

删除 `.pnpm-store` 文件夹。

```bash
$ sudo rm -r ~/.pnpm-store
```
