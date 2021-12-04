# sass-loader 版本过高

## 问题描述

执行`yarn dev:mp-weixin`命令后报如下提示：

```bash
 ERROR  Failed to compile with 1 error                                                                                                                                              3:26:41 PM

 error  in ./src/App.vue?vue&type=style&index=0&lang=scss&

TypeError: this.getOptions is not a function


 @ ./src/App.vue?vue&type=style&index=0&lang=scss& 1:0-783 1:799-802 1:804-1584 1:804-1584
 @ ./src/App.vue
 @ ./src/main.js

 ERROR  Build failed with errors.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

## 解决方法

降低`sass-loader`版本，目前最新为`12.x`，降低到`10.x`即可，笔记记录时间：`2021-8-19`