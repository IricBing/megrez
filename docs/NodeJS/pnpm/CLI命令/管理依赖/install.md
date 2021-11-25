# pnpm install

别名： `i`

`pnpm install` 用于安装项目**所有**依赖。在 `CI` 环境中, 如果存在需要更新的 `lockfile` 会安装失败。

在 `workspace` 内, `pnpm install` 下载项目所有依赖. 如果想禁用这个行为, 将 `recursive-install` 设置为 `false` 。

## 基础用法

|命令|含义|
|-----|-----|
| `pnpm i --offline` |仅从 `store` 中**离线**下载|
| `pnpm i --frozen-lockfile` |不更新 `pnpm-lock.yaml` 文件|
| `pnpm i --lockfile-only` |只更新 `pnpm-lock.yaml` |

## 选项

### --offline​

* 默认值： `false`
* 类型： `Boolean`

如果为 `true` ，则 `pnpm` 将仅使用在 `store` 中已有的包。 如果本地找不到包, 则会安装失败

### --prefer-offline​

添加于: `v1.28.0`

* 默认值： `false`
* 类型： `Boolean`

如果为 `true` ，缺失的数据将会从服务器获取，并绕过缓存数据的过期检查。 想强制使用离线模式, 请使用 `--offline`

### --ignore-scripts​

* 默认值： `false`
* 类型： `Boolean`

不执行任何项目中 `package.json` 和它的依赖项中定义的任何脚本。

> [!tip|label: 提示]
> 该标记不会阻止执行 `.pnpmfile.cjs`

### --prod, -P​

如果 `NODE_ENV` 环境变量被设置为 `production` 则 `pnpm` 不会下载 `devDependencies` 中的任何包。使用这个指令 `pnpm` 会忽略 `NODE_ENV` 并用该指令替代其生产状态。

### --dev, -D​

不管 `NODE_ENV` 的值, 只下载 `devDependencies` 依赖。

### --no-optional​

不安装 `optionalDependencies` 依赖。

### --lockfile-only​

添加于: `v1.26.0` (原名 `shrinkwrap-only` )

* 默认值： `false`
* 类型：`Boolean`

使用时, 仅更新 `pnpm-lock.yaml` 和 `package.json` 不检查 `node_modules` 和下载依赖项。

### --fix-lockfile​

添加于： `v6.15.0`

自动修复损坏的 `lock` 文件入口。

### --frozen-lockfile​

添加于: `v1.37.1` (原名 `frozen-shrinkwrap` )

* 默认值：
  + 非 `CI`: `false`
  + `CI`: `true`, 如果存在 `lock` 文件
* 类型：`Boolean`

如果设置 `true` , `pnpm` 不会生成 `lockfile` 且如果 `lockfile` 跟 `manifest` 不同步/ 文件需要更新或不存在 `lockfile` 则会安装失败。

### --reporter=\<name\>​

* 默认值：
  + `TTY stdout`: `default`
  + 非 `TTY stdout`: `append-only`
* 类型：`default`, `append-only`, `ndjson`, `silent`

允许您选择将调试信息记录到终端, 以了解安装进度。

* `silent` - 除了致命 `errors` 否则不输出记录信息。
* `default` - 标准为 `TTY` 的默认输出。
* `append-only` (添加于 `v1.29.1`) - 始终末尾追加输出。 没有光标操作
* `ndjson` - 最详细报告。 打印所有`ndjson` 格式日志

### --use-store-server​

添加于: `v1.30.0`

* 默认值： `false`
* 类型：`Boolean`

后台开启 `store server` 。安装完成后, `store server` 会持续运行. 执行 `pnpm server stop` 来停止 `store server` .

### --shamefully-hoist​

* 默认值： `false`
* 类型：`Boolean`

创建一个扁平 `node_modules` 目录结构, 类似于 `npm` 或 `yarn`

> [!warning|label: 警告]
> 这是非常不推荐的。
