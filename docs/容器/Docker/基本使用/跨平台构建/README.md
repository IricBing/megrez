# 跨平台构建

## 准备

首先需要安装 `buildx` ， `buildx` 在 `Docker Desktop` 中已经内置了，但是在 `Linux` 下通过 `apt` 安装的没有内置，转至笔记：[Ubuntu 20.04 安装 buildx](../../安装/Ubuntu20.04安装/buildx安装.md)

## 创建构建环境

```bash
$ docker buildx create --name mybuilder
$ docker buildx use mybuilder
$ docker buildx ls  # 查看构建环境
```

## 构建

```bash
$ docker buildx build --platform linux/amd64,linux/arm64,linux/arm -t demo .
```