# Chocolatey
* [官方网站](https://chocolatey.org/)

## 介绍

`Chocolatey` 是一个 `Windows` 的包管理器，类似于 `Mac` 的 `brew` ， `Ubuntu` 的 `apt` ，当然，这个就比较小众啦。

## 安装

### Step1. 检查PowerShell环境

以**管理员身份**打开 `PowerShell` ，运行如下命令：

```shell
$ Get-ExecutionPolicy
```

如果返回值为： `Restricted` ，输入 `$ Set-ExecutionPolicy AllSigned` 或 `$ Set-ExecutionPolicy Bypass -Scope Process` 命令，如下所示：

```shell
$ Set-ExecutionPolicy AllSigned

Execution Policy Change
The execution policy helps protect you from scripts that you do not trust. Changing the execution policy might expose
you to the security risks described in the about_Execution_Policies help topic at
https:/go.microsoft.com/fwlink/?LinkID=135170. Do you want to change the execution policy?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): Y
```

### Step2. 安装

输入如下命令进行安装：

```shell
$ Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Step3. 检验安装结果

如果上一步没有输出错误，输入 `$ choco` 命令进行检验，如输出如下，即表示安装完成

```shell
$  choco
Chocolatey v0.10.15
Please run 'choco -?' or 'choco <command> -?' for help menu.
```
