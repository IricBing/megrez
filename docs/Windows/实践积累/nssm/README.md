# nssm

> [!tip]
> 这个项目似乎处于**停滞**状态了，截止到今天**2022年3月1日**，其发布的 `latest` 版本还是在 `2014` 年发布的， `pre-release` 版本也是在 `2017` 年发布的。不过亲测在Windows10的环境下还是可以正常使用的。

[GitHub](https://github.com/kirillkovalenko/nssm)

[官网](https://nssm.cc/)

`NSSM` 是一个服务封装程序，它可以将普通 `exe` 程序封装成服务，使之像 `windows` 服务一样运行。同类型的工具还有微软自己的 `srvany` ，不过 `nssm` 更加简单易用，并且功能强大。它的特点如下：

* 支持普通`exe`程序（控制台程序或者带界面的`Windows`程序都可以）。
* 安装简单，修改方便。
* 可以重定向输出（并且支持`Rotation`）。
* 可以自动守护封装了的服务，程序挂掉了后可以自动重启。
* 可以自定义环境变量。
* 这里面的每一个功能都非常实用，使用`NSSM`来封装服务可以大大简化我们的开发流程了。
* 开发的时候是一个普通程序，降低了开发难度，调试起来非常方便。
* 安装简单，并且可以随时修改服务属性，更新也更加方便。
* 可以利用控制台输出直接实现一个简单的日志系统。
* 不用考虑再加一个服务实现服务守护功能。

## 快速上手

服务安装：

```bash
$ nssm.exe install 
$ nssm.exe install <service_name>

e.g.
$ nssm.exe install JS906
```

启动服务

```bash
$ nssm.exe start <service_name>

e.g.
$ nssm.exe start JS906
```

停止服务

```bash
$ nssm.exe stop <service_name>

e.g.
$ nssm.exe stop JS906
```

重启服务

```bash
$ nssm.exe restart <service_name>

e.g.
$ nssm.exe restart JS906
```

移除服务

```bash
$ nssm.exe remove <service_name> confirm

e.g.
$ nssm.exe remove JS906 confirm
```
