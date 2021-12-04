# SSH Runner

[官方文档](https://docs.drone.io/runner/ssh/overview/)

## Step1. pull容器镜像

```bash
$ docker pull drone/drone-runner-ssh
```

## Step2. 运行容器镜像

```bash {2-4}
$ docker run --detach \
  --env=DRONE_RPC_PROTO=https \
  --env=DRONE_RPC_HOST=drone.company.com \
  --env=DRONE_RPC_SECRET=共享秘钥 \
  --publish=3000:3000 \
  --restart always \
  --name ssh-runner \
  drone/drone-runner-ssh
```

::: tip 提示
默认端口为 `3000` ，记得别冲突了。[更多配置参数](https://docs.drone.io/runner/docker/configuration/reference/)
:::

## Step3. 验证

```bash
$ docker logs ssh-runner
time="2021-10-28T01:54:11Z" level=info msg="starting the server" addr=":3000"
time="2021-10-28T01:54:13Z" level=info msg="successfully pinged the remote server"
time="2021-10-28T01:54:13Z" level=info msg="polling the remote server" capacity=10 endpoint="https://drone.iricbing.xyz" kind=pipeline type=ssh
```