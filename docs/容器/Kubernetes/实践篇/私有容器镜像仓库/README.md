# 私有容器镜像仓库

对于公司的正式服务来讲，一般不会将镜像公开发布到互联网上，大多数都采用自建或者购买云厂商的服务的方式来保存自己的镜像。这就需要生产服务器在拉取镜像的时候经过**认证**才行。

在纯 `docker` 的环境下，直接使用 `$ docker login` 命令登录，之后就会将用户信息存储下来，后续就可以拉取任意私有仓库了。但是在 `k8s` 的环境下是不行的，不能直接使用 `$ docker login` 来认证。而是需要使用 `k8s` 提供的 `Secret` 功能来实现。
