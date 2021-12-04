# 配置Python环境

## 配置文件部分

### `.vscode/extensions.json` 文件

```json
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker",
    "wayou.vscode-todo-highlight",
    "gruntfuggly.todo-tree",
    "njpwerner.autodocstring",
    "aaron-bond.better-comments",
    "kevinrose.vsc-python-indent",
    "spywhere.guides",
    "obkoro1.korofileheader"
  ]
}
```

## 插件配置

### Python Docstring Generator

`Python Docstring Generator` 这个插件默认是采用 `Google` 的注释风格，但是主流用户习惯了 `numpy` 的风格，为了避免采坑，我们选择跟随主流，将 `Python` 的注释风格改为 `numpy` 风格。

在**设置页面**输入 `autoDoc` ，找到该插件的 `Auto Docstring: Docstring Format` 配置，选择 `numpy` ，如下所示：

![PythonDocstring插件配置numpy风格](assets/images/PythonDocstring插件配置numpy风格.png)

### koroFileHeader

`koroFileHeader` 插件默认是支持**所有类型**文件的头部注释，但是我们通常只需要 `Python` 项目有这个东西，其他诸如 `vue` 文件， `js/ts` 文件都没有这种需求，因此需要将其配置一下，让其只支持 `Python` 文件。

在**设置页面**输入 `fileheader` ，并打开全局配置 `json` 文件，如下所示：

![进入kora1FileHeader插件配置方式](assets/images/进入kora1FileHeader插件配置方式.png)

按照此插件官方的[配置文档](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE)，需要找到如下配置：

```json
{
  "fileheader.configObj": {
    "supportAutoLanguage": [ ] // 设置过后只有该数组里面的文件 才会自动添加头部注释
  }
}
```

最终配置如下：

![kora1FileHeader插件白名单配置](assets/images/kora1FileHeader插件白名单配置.png)

### YAPF

要把 `Python` 代码写漂亮，必须遵循 `PEP8 Python` 编码规范：《[PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)》。但记住 `PEP8` 规范，是一件非常痛苦的事情，还好 `Google` 发布了一个自动整理 `Python` 代码，让其符合 `PEP8` 规范的工具： `YAPF` 。

安装：

```bash
$ pip install yapf
```

配置：

打开设置页面，输入： `python.formatting.provider` ，将代码风格选择为 `yapf` ，如下所示：

![YAPF代码风格配置](assets/images/YAPF代码风格配置.png)

## 支持MiniConda

多数情况下我们会使用 `MiniConda` 来管理 `Python` 版本并创建**虚拟环境**，因此需要配置 `Python` 的路径，这样才能实现**代码嗅探**功能。但是网上找了很久也没有找到满意的解决办法，只能找到一个临时能用的办法了。

因为 `conda` 会有多套环境，所以无法写死，又没有 `nvm` 中 `.nvmrc` 文件那种配置，所以很难做到全局自动适配。因此我们将配置写到项目的 `.vscode/settings.json` 文件中。

下一个问题， `Linux` 、 `Windows` 的路径还是不一样的，而且 `VSCode` 又没有这个条件配置功能（这个issue从16年开始存在，至今无解。。。），所以只能割舍同步配置功能了，让 `git` **忽略** `.vscode/settings.json` 文件，每个人根据自己的系统自己写自己的配置。

示例配置： `Windows`

```json
{
  "python.defaultInterpreterPath": "E:\\ProgramData\\Miniconda3\\envs\\gas",
  "python.autoComplete.extraPaths":[
    "E:\\ProgramData\\Miniconda3\\envs\\gas\\Lib\\site-packages"
  ],
  "python.autoComplete.addBrackets": true,
  "python.analysis.extraPaths": [
    "E:\\ProgramData\\Miniconda3\\envs\\gas\\Lib\\site-packages"
  ],
  "python.analysis.completeFunctionParens": true,
}
```

示例配置： `Linux`

```json
{
  "python.defaultInterpreterPath": "~/miniconda3/envs/gas/bin",
  "python.autoComplete.extraPaths":[
    "~/miniconda3/envs/gas/lib/python3.7/site-packages"
  ],
  "python.autoComplete.addBrackets": true,
  "python.analysis.extraPaths": [
    "~/miniconda3/envs/gas/lib/python3.7/site-packages"
  ],
  "python.analysis.completeFunctionParens": true,
}
```

> [!tip|label: 提示]
> 这样配置后， `vscode` 打开后就能直接用 `conda` 环境了，类似于 `.nvmrc` 文件那种效果，但是有一个小瑕疵，就是**第一个**默认终端不会进入 `conda` 环境中，删除这个终端，重新打开就好了。
