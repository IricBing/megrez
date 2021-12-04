# helm pull

从仓库下载并在本地目录解压(可选)，[官方文档](https://helm.sh/zh/docs/helm/helm_pull/)

## 简介

从包仓库中检索包并下载到本地。

对于要获取检查，修改或重新打包的包很有用，还可以用于在不安装 `chart` 的情况下对 `chart` 进行加密验证。

下载 `chart` 之后有解压的选项，会为 `chart` 创建一个目录并解压到这个目录中。

如果指定了 `--verify` 参数，请求的 `chart` 必须有出处文件，且必须通过验证。任意部分的失败都会导致错误，且 `chart` 不会在本地保存。

## 语法

```bash
$ helm pull [chart URL | repo/chartname] [...] [flags]
```

具体示意参考[官方文档](https://helm.sh/zh/docs/helm/helm_pull/)

## 常用用法

下载压缩文件

```bash
$ helm pull ingress-nginx/ingress-nginx
```

下载并自动解压（不保留压缩文件）

```bash
$ helm pull --untar ingress-nginx/ingress-nginx
```
