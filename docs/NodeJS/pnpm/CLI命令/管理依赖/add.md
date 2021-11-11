# pnpm add \<pkg\>

安装软件包及其依赖的任何软件包。默认情况下，任何新软件包都安装为**生产依赖**项。

## 基础用法

|命令|含义|
|-----|-----|
| `pnpm add sax` |保存到 `dependencies` |
| `pnpm add -D sax` |保存到 `devDependencies` |
| `pnpm add -O sax` |保存到 `optionalDependencies` |
| `pnpm add sax@next` |安装 `next tag` |
| `pnpm add sax@3.0.0` |安装指定版本 `3.0.0` |

## 选项

### --save-prod, -P​

将指定的软件包安装为常规的 `dependencies`

### --save-dev, -D​

将指定的 `packages` 安装为 `devDependencies`

### --save-optional, -O​

将指定的 `packages` 安装为 `optionalDependencies`

### --save-exact, -E​

保存的依赖会被指定为一个确切的版本, 而不是使用 `pnpm` 的默认 `semver range operator` 配置

### --save-peer​

添加于： `v3.2.0`

使用 `--save-peer` 会添加一个或多个 `peerDependencies` 的 `package` 并安装到 `dev dependencies`

### --ignore-workspace-root-check, -W​

添加于: `v3.6.0`

除非使用 `--ignore-workspace-root-check` 或 `-W` 来标记. 否则在 `root workspace` 包添加依赖项时会失败

例如, `pnpm add debug -W`

### --global​ -g

安装**全局依赖**

### --workspace​

添加于： `v4.4.0`

仅添加在 `workspace` 找到的依赖项
