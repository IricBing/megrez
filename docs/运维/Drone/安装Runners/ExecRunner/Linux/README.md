# Linux 安装

[官方文档](https://docs.drone.io/runner/exec/installation/linux/)

## Step1. 下载

```bash
$ curl -L https://github.com/drone-runners/drone-runner-exec/releases/latest/download/drone_runner_exec_linux_amd64.tar.gz | tar zx

$ sudo install -t /usr/local/bin drone-runner-exec
```

## Step2. 配置

> [!warning|label: 注意]
> 这里有坑，不能按照官方文档来做，因为按照它非 `root` 用户那样配置后启动不来，报权限错误，加上 `sudo` 后又变成了 `root` 用户了，所以只能用 `root` 用户配置。

首先创建配置文件 `/etc/drone-runner-exec/config`

```bash
$ sudo mkdir /etc/drone-runner-exec
$ cd /etc/drone-runner-exec
$ sudo touch config
```

接下来在配置文件中写入配置，[配置变量大全](https://docs.drone.io/runner/exec/configuration/reference/)

```ini
DRONE_RPC_PROTO=https
DRONE_RPC_HOST=drone.company.com
DRONE_RPC_SECRET=super-duper-secret
DRONE_LOG_FILE=/var/log/drone-runner-exec/log.txt
```

因为配置了 `log` 文件，需要创建 `log` 文件夹

```bash
$ sudo mkdir /var/log/drone-runner-exec
```

## Step3. 安装与运行

```bash
$ sudo drone-runner-exec service install
$ sudo drone-runner-exec service start
```

## Step4. 验证

```bash
$ cat /var/log/drone-runner-exec/log.txt

INFO[0000] starting the server
INFO[0000] successfully pinged the remote server
```
