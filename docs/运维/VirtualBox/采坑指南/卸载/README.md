# 卸载

首先，将终端切换为`bash`环境，之后执行如下命令：

```bash
$ sudo apt autoremove --purge virtualbox*
```

> [!warning|label:警告]
> `zsh`终端不可以执行这个命令！

卸载校验：

```bash
$ dpkg -l 'virtualbox*' | grep ^i
```

如果卸载完全，则不会有任何输出