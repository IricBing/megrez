# pkg

[NPM地址](https://www.npmjs.com/package/pkg)

[GitHub地址](https://github.com/vercel/pkg)

## 使用

首选需要全局安装：

```bash
$ npm i -g pkg
```

接下来打包就很容易了：

```bash
$  pkg .\dist\main.js -o start.exe
```

生成出来的 `start.exe` 文件双击就能运行了。

> [!note]
> 测试基于 `nestjs` 项目，打包时间会比较长，因为 `node` 是单线程的嘛，并且会遇到网络问题，请往下看。

## 踩坑

### PKG_CACHE_PATH

因为 `pkg` 的原理是将 `node` 也打包进去，所以在执行打包命令的时候会先去获取 `node` ，我没有找到类似于设置的地方，不能指定其获取的地址，所以就在打包的时候开了 `VPN` ，让其能够先下载下来。

也可以在本地环境变量中设置 `PKG_CACHE_PAT` H地址，并且将资源预先拷贝进去，本人未测试，网上倒是有很多文章这样做的，例如：https://blog.51cto.com/livestreaming/2600395
