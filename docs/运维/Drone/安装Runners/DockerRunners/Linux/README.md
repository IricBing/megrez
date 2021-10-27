# Linux 安装

## Step1. pull容器镜像

```shell
$ docker pull drone/drone-runner-docker:1
```

## Step2. 运行容器镜像

```shell {3-7}
$ docker run --detach \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  --env=DRONE_RPC_PROTO=https \
  --env=DRONE_RPC_HOST=drone.company.com \
  --env=DRONE_RPC_SECRET=super-duper-secret \
  --env=DRONE_RUNNER_CAPACITY=2 \
  --env=DRONE_RUNNER_NAME=my-first-runner \
  --publish=3000:3000 \
  --restart=always \
  --name=runner \
  drone/drone-runner-docker:1

```

::: tip 提示
[更多配置参数](https://docs.drone.io/runner/docker/configuration/reference/)

一般都会加入`git`配置信息用来拉取代码，

```shell
  --env=DRONE_GIT_ALWAYS_AUTH=true \
  --env=DRONE_GIT_USERNAME=xxx \
  --env=DRONE_GIT_PASSWORD=xxx \
```

:::

## Step3. 验证

```shell
$ docker logs runner
time="2021-10-27T06:44:16Z" level=info msg="starting the server" addr=":3000"
time="2021-10-27T06:44:17Z" level=info msg="successfully pinged the remote server"
time="2021-10-27T06:44:17Z" level=info msg="polling the remote server" arch=amd64 capacity=2 endpoint="https://drone-test.virtualbing.cn" kind=pipeline os=linux type=docker
```
