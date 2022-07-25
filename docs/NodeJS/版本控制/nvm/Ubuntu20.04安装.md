# Ubuntu 20.04 安装nvm

[GitHub nvm项目地址](https://github.com/nvm-sh/nvm)

## 安装必要基础软件

```bash
$ sudo apt install build-essential libssl-dev
```

## 安装

### 自动化脚本安装

> [!warning|label: 注意]
> 自动化安装可能不成功，因为使用了 `raw.githubusercontent.com` 域名。同时 `不要直接复制这个安装命令` ，可能nvm出了更高的版本，去GitHub上看最新的安装命令！

* `curl` 方式：

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash   # 注意将v0.36.0替换成最新版本
```

* `wget` 方式：

```bash
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash    # 注意将v0.36.0替换成最新版本
```

### Git手动安装

#### Step1. 切换到用户目录

```bash
$ cd ~
```

#### Step2. Clone 项目到本地

```bash
$ git clone https://github.com/nvm-sh/nvm.git .nvm
```

#### Step3. 切换发布分支

```bash
$ cd .nvm
$ git checkout v0.36.0  # 注意将v0.36.0替换成最新版本
```

#### Step4. 激活nvm

如果是zsh终端，使用如下命令：

```bash
$ sh nvm.sh
```

如果是bash终端，使用如下命令：

```bash
$ . nvm.sh
```

## 配置nvm环境

> [!tip|label: 提示]
> 本笔配置的是 `zsh` 环境， `bash` 环境请参考[官方文档](https://github.com/nvm-sh/nvm#bash)

```bash
$ vim ~/.zshrc
```

在文件的最后增加一下内容：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node

# 支持 .nvmrc 分项目配置node版本功能

autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

保存并退出，加载 `.zshrc` 文件改动

```bash
$ source ~/.zshrc
```
