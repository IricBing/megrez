# 变量

我们可以使用 `SET(set)` 来定义变量，语法如下：

```cmake
SET(VAR [VALUE] [CACHE TYPE DOCSTRING [FORCE]])
```

示例：

```cmake
SET (SRC_LST main.c other.c)
```

说明：用变量代替值，例子中定义 `SRC_LST` 代替后面的字符串。

我们可以使用 `${NAME}` 来获取变量的名称。

## 常用变量

|环境变量名|描述|
|-----|-----|
| `CMAKE_BINARY_DIR` <br/> `PROJECT_BINARY_DIR` <br/> `<projectname>_BINARY_DIR` |如果是 `in source` 编译，指得就是工程顶层目录，如果是 `out-of-source` 编译，指的是工程编译发生的目录。 `PROJECT_BINARY_DIR` 跟其他指令稍有区别。现在，你可以理解为他们是一致的。|
| `CMAKE_SOURCE_DIR` <br/> `PROJECT_SOURCE_DIR` <br/> `<projectname>_SOURCE_DIR` |工程顶层目录。|
| `CMAKE_CURRENT_SOURCE_DIR` |当前处理的 `CMakeLists.txt` 所在的路径。|
| `CMAKE_CURRRENT_BINARY_DIR` |如果是 `in-source` 编译，它跟 `CMAKE_CURRENT_SOURCE_DIR` 一致；如果是 `out-of-source` 编译，他指的是 `target` 编译目录。|
| `EXECUTABLE_OUTPUT_PATH` <br/> `LIBRARY_OUTPUT_PATH` |最终目标文件存放的路径。|
| `PROJECT_NAME` |通过 `PROJECT` 指令定义的项目名称。|

## 系统信息

|系统信息变量名|描述|
|-----|-----|
| `CMAKE_MAJOR_VERSION` | `CMAKE` **主版本**号，比如 `2.4.6` 中的 `2` |
| `CMAKE_MINOR_VERSION` | `CMAKE` **次版本**号，比如 `2.4.6` 中的 `4` |
| `CMAKE_PATCH_VERSION` | `CMAKE` **补丁**等级，比如 `2.4.6` 中的 `6` |
| `CMAKE_SYSTEM` |系统名称，比如 `Linux-2.6.22` |
| `CMAKE_SYSTEM_NAME` |不包含版本的系统名，比如 `Linux` |
| `CMAKE_SYSTEM_VERSION` |系统版本，比如 `2.6.22` |
| `CMAKE_SYSTEM_PROCESSOR` |处理器名称，比如 `i686` |
| `UNIX` |在所有的类 `UNIX` 平台为 `TRUE` ，包括 `OS X` 和 `cygwin` |
| `WIN32` |在所有的 `win32` 平台为 `TRUE` ，包括 `cygwin` |

## 编译选项

|编译控制开关名|描述|
|-----|-----|
| `BUILD_SHARED_LIBS` |	使用 `ADD_LIBRARY` 时生成**动态库**。|
| `BUILD_STATIC_LIBS` 	|使用 `ADD_LIBRARY` 时生成**静态库**。|
| `CMAKE_C_FLAGS` 	|设置 `C` 编译选项, 也可以通过指令 `ADD_DEFINITIONS()` 添加。|
| `CMAKE_CXX_FLAGS` 	|设置 `C++` 编译选项, 也可以通过指令 `ADD_DEFINITIONS()` 添加。|
