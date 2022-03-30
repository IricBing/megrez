# 自省机制 (Introspective Facility)

调试库中的主要**自省函数**是 `getinfo` ，该函数的第一个参数可以是一个**函数**或一个**栈层次**。当为某个函数 `foo` 调用 `debug.getinfo(foo)` 时，该函数会返回一个包含与该函数有关的一些数据的**表**。这个表可能具有以下字段：

|字段|含义|
|-----|-----|
| `source` |该字段用于说明**函数定义的位置**。如果函数定义在一个字符串中（通过调用 `load` ），那么 `source` 就是这个字符串；如果函数定义在一个文件中，那么 `source` 就是使用 `@` 作为前缀的文件名。|
| `short_src` |该字段是 `source` 的**精简版本**（最多 `60` 个字符），对于错误信息十分有用。|
| `linedefined` |该字段是该函数定义在源代码中第一行的**行号**。|
| `lastlinedefined` |该字段是该函数定义在源代码中最后一行的**行号**。|
| `what` |该字段用于说明**函数的类型**。如果 `foo` 是一个普通的 `Lua` 函数，则为 `"Lua"` ；如果是一个 `C` 函数，则为 `"C"` ；如果是一个 `Lua` 语言代码段的主要组成部分，则为 `"main"` 。|
| `name` |该字段是该函数的一个适当的**名称**，例如保存该函数的全局变量的名称。|
| `namewhat` |该字段用于说明 `name` 字段的含义，可能是 `"global"` 、 `"local"` 、 `"method"` 、 `"filed"` 或 `""` （空字符串）。空字符串表示 `Lua` 语言找不到该函数的名称。|
| `nups` |该字段是**函数上值的个数**。|
| `nparams` |该字段是该**函数的参数个数**。|
| `isvararg` |该字段表明该函数是否为**可变长参数函数**（一个**布尔值**）。|
| `activelines` |该字段是一个包含该函数所有**活跃行**的集合。活跃行（active line）是指除**空行**和**只包含注释**的行外的其他行（该字段的典型用法是用于设置**断点**。大多数调试器不允许在活跃行外设置断点，因此非活跃行是不可达的）。|
| `func` |该字段是该**函数本身**。|

当 `foo` 是一个 `C` 函数时， `Lua` 语言没有多少关于该函数的信息。对于这种函数，只有字段 `what` 、 `name` 、 `namewhat` 、 `nups` 和 `func` 是有意义的。

当使用一个数字 `n` 作为参数调用函数 `debug.getinfo(n)` 时，可以得到有关相应栈层次上活跃函数的数据。**栈层次**（ `stack level` ）是一个**数字**，代表某个时刻上活跃的特定函数。调用 `getinfo` 的函数 `A` 的层次是 `1` ，而调用 `A` 的函数的层次是 `2` ，以此类推（层次 `0` 是 `C` 函数 `getinfo` 自己）。如果 `n` **大于**栈中的活跃函数的数量，那么函数 `debug.getinfo` 返回 `nil` 。

当通过带有栈层次的 `debug.info` 查询一个活跃函数时，返回的表中还有两个额外字段：
* `currentline`：表示当前函数正在执行的代码所在的行
* `istailcall`：一个**布尔值**。如果为真，则表示函数是被**尾调用**所调起（在这种情况下，函数的真实调用者不再位于栈中）。

字段 `name` 有些特殊。请注意，由于函数在 `Lua` 语言中是第一类值，因此函数既可以没有名称也可以有多个名称。 `Lua` 语言会通过检查调用该函数的代码来看函数是如何被调用的，进而尝试找到该函数的名称。这种方法只有在以一个数字为参数调用 `getinfo` 时才会起作用，即我们只能获取关于某一具体调用的信息。

函数 `getinfo` 的效率不高。 `Lua` 语言以一种不影响程序执行的形式来保存调试信息，至于获取这些调试信息的效率则是次要的。为了实现更好的性能，函数 `getinfo` 有一个可选的第二参数，该参数用于指定**希望获取那些信息**。通过这个参数，函数 `getinfo` 就不会浪费时间取收集用户不需要的数据。这个参数是一个**字符串**，其中每个字母代表选择一组字段，如下表所示：

|参数|含义|
|-----|-----|
| `n` |选择 `name` 和 `namewhat` |
| `f` |选择 `func` |
| `S` |选择 `source` 、 `short_src` 、 `what` 、 `linedefined` 和 `lastlinedefined` |
| `l` |选择 `currentline` |
| `L` |选择 `activelines` |
| `u` |选择 `nup` 、 `nparams` 和 `isvararg` |

下面这个函数演示了函数 `debug.getinfo` 的用法，它打印出了活跃栈的**栈回溯**：

```lua
function traceback ()
  for level = 1, math.huge do
    local info = debug.getinfo(level, "S1")
    if not info then break end
    if info.what == "C" then      -- 是否是C函数？
      print(string.format("%d\tC function", level))
    else    -- Lua 函数
      print(string.format("%d\t[%s]:%d", level, info.short_src, info.currentline))
    end
  end
end
```

要改进这个函数并不难，只需要让函数 `getinfo` 返回更多数据即可。事实上，调试库也提供了这样一个改进版本，即函数 `traceback` 。与我们的版本不同的是，函数 `debug.traceback` 不会打印结果，而是返回一个（可能会很长的）包含栈回溯的字符串：

```lua
> print(debug.traceback())
stack traceback:
	stdin:1: in main chunk
	[C]: in ?
```
