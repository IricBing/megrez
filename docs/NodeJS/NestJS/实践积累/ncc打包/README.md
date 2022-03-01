# ncc打包

`ncc` 项目地址：

* [GitHub](https://github.com/vercel/ncc)

`ncc` 打包的主要目的是将 `js` 文件**合并为一个文件**，达到代码保护的目的，同时，这一个文件已经包含了 `node_modules` 中依赖包的代码，也就是说这个文件可以直接通过 `node` 来运行，不需要再安装依赖了。
