# e-mail

## 功能用途

通过**邮箱**来推送 `Pipeline` 的执行结果。

## 集成

使用插件[Email](http://plugins.drone.io/drillster/drone-email/)

### 发件人信息准备

首先准备一个邮箱，用来做**发件人**，需要开启 `SMTP` 服务。

::: tip 提示
邮箱有很多种，免费的，收费的等等，每种邮箱的开启方式千差万别，这里以**QQ邮箱**演示，相应操作请参考笔记：[QQ邮箱开通SMTP服务](../../../../实践积累/邮件/QQ邮箱开通SMTP服务/README.md)
:::

### 配置示例

```yml
---
kind: pipeline
type: docker
name: build

# ……

---
kind: pipeline
type: ssh
name: deploy

# ……

depends_on:
  - build
---
kind: pipeline
type: docker
name: notify

clone:
  disable: true

steps:
  - name: email
    image: drillster/drone-email
    settings:
      subject: 'Drone build: [{{ build.status }}] {{ repo.name }} ({{ repo.branch }}) #{{ build.number }}'
      host: smtp.qq.com
      port: 465
      from:
        from_secret: email_user
      username:
        from_secret: email_user
      password:
        from_secret: email_password
      recipients: xxxx@qq.com
      # recipients_only: true
    when:
      branch:
        - master
      status:
        - success
        - changed
        - failure

depends_on:
  - deploy
```