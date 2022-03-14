# CMake
* [官网](https://cmake.org/)

## 起源

你或许听过好几种 `Make` 工具，例如 `GNU Make` ， `QT` 的 `qmake` ，微软的 `MS nmake` ， `BSD Make` （ `pmake` ）， `Makepp` ，等等。这些 `Make` 工具遵循着**不同的规范和标准**，所执行的 `Makefile` 格式也千差万别。这样就带来了一个严峻的问题：如果软件想跨平台，必须要保证能够在不同平台编译。而如果使用上面的 `Make` 工具，就得为每一种标准写一次 `Makefile` ，这将是一件让人抓狂的工作。

`CMake` 就是针对上面问题所设计的工具。

## 是什么

`CMake` 允许开发者编写一种**平台无关**的 `CMakeList.txt` 文件来定制整个编译流程，然后再根据目标用户的平台进一步生成所需的本地化 `Makefile` 和工程文件，如 `Unix` 的 `Makefile` 或 `Windows` 的 `Visual Studio` 工程。从而做到“**Write once, run everywhere**”。显然， `CMake` 是一个比上述几种 `make` 更高级的编译配置工具。一些使用 `CMake` 作为项目架构系统的知名开源项目有 `VTK` 、 `ITK` 、 `KDE` 、 `OpenCV` 、 `OSG` 等。

在 `linux` 平台下使用 `CMake` 生成 `Makefile` 并编译的流程如下：

```mermaid
graph TD;
  A[编写 `CMake` 配置文件 CMakeLists.txt] --> B["执行命令 cmake PATH 或者 ccmake PATH 生成 Makefile"];
  B --> C["使用 make 命令进行编译"];
```
