# NPM

## 功能用途

自动推送 `NPM` 包。

## 集成

使用插件[NPM](http://plugins.drone.io/drone-plugins/drone-npm/)

> [!tip|label: 提示]
> 还有一个[npm-auth](http://plugins.drone.io/robertstettner/drone-npm-auth/)的插件，那个插件是用来进行仓库**认证**的，不是用来发包的。

### 配置示例

```yaml
kind: pipeline
type: docker
name: publish

steps:
  - name: build
    image: node:16.13.0-alpine
    commands:
      - npm i pnpm -g --registry=http://registry.npmmirror.com
      - pnpm i --frozen-lockfile --ignore-scripts
      - pnpm build:npm
      - rm .npmrc

  - name: publish
    image: plugins/npm
    settings:
      username:
        from_secret: npm_user
      password:
        from_secret: npm_password
      email:
        from_secret: npm_email

  - name: email
    image: drillster/drone-email
    settings:
      subject: 'NPM publish {{tag}}: [{{ build.status }}] {{ repo.name }} #{{ build.number }}'
      host: smtp.qq.com
      port: 465
      from:
        from_secret: email_user
      username:
        from_secret: email_user
      password:
        from_secret: email_password
      recipients: 1248063520@qq.com
      recipients_only: true
    when:
      status:
        - success
        - changed
        - failure

trigger:
  event:
    - tag
```

> [!warning|label: 注意]
> 在发布 `NPM` 包的时候， `.npmrc` 文件会指定 `NPM` 仓库地址，要特殊注意这个文件！
