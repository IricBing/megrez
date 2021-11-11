# CLI 命令

与 `npm` 不同的是， `pnpm` 会**校验所有的参数**。 比如， `pnpm install --foo` 会执行失败，因为 `--foo` 不是 `pnpm install` 的有效参数。

但是，某些依赖关系可能使用 `npm_config_` 环境变量，其中 从 `CLI` 选项中填充。 在这种情况下，你有以下选择：

* 设置明确的环境变量：`npm_config_foo=true pnpm install`
* 用 `--config.`强制使用未知选项: `pnpm install --config.foo`
