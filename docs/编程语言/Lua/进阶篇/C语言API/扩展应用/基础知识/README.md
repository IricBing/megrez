# 基础知识

让我们想象一个简单的需要配置的场景：假设我们的 `C` 程序有一个窗口，并希望用户能够指定窗口的初始大小。显然，对于这种简单的任务，有许多比使用 `Lua` 语言更简单的方法，例如使用环境变量或使用基于键值对的配置文件。但即使是使用一个简单的文本文件，我们也需要对其进行解析。因此，我们决定使用一个 `Lua` 配置文件（也即一个普通的文本文件，只不过他是一个 `Lua` 程序）。下面所示的是这种文件最简单的形式，它可以包含如下内容：

```lua
-- 定义窗口大小
width = 200
height = 300
```

现在，我们必须使用Lua API来指挥Lua语言解析该文件，并获取全局变量width和height的值。

```c
int getglobint (lua_State *L, const char *var) {
  int insnum, result;
  lua_getglobal(L, var);
  result = (int)lua_tointegerx(L, -1, &isnum);
  if (!isnum) error(L, "'%s' should be a number\n", var);
  lua_pop(L, 1);  // 从栈中移除结果
  return result;
}

void load (lua_State *L, const char *fname, int *w, int *h) {
  if(luaL_loadfile(L, fname) || lua_pcall(L, 0, 0, 0)) {
    error(L, "cannot run config. file: %s", lua_tostring(L, -1));
  }
  *w = getglobint(L, "width");
  *h = getglobint(L, "height");
}
```
