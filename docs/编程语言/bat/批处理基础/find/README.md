# find

## 功能

在文件中搜索字符串。

## 用法

```batch
FIND [/V] [/C] [/N] [/I] [/OFF[LINE]] "string" [[drive:][path]filename[...]]
```

参数说明：

* `/V`: 显⽰所有未包含指定字符串的⾏。 
* `/C`: 仅显⽰包含字符串的⾏数。 
* `/N`: 显⽰⾏号。 
* `/I`: 搜索字符串时忽略⼤⼩写。 
* `/OFF[LINE]`: 不要跳过具有脱机属性集的⽂件。 
* `"string"`: 指定要搜索的⽂字串， 
* `[drive:][path]filename`: 指定要搜索的⽂件。 

> [!tip|label: 提示]
> 如果没有指定路径， `FIND` 将搜索键⼊的或者由另⼀命令产⽣的⽂字。 

## 与type命令结合

`Find` 常和 `type` 命令结合使⽤，常用用法如下：

```batch
:: 挑选包含string的⾏
Type [drive:][path]filename | find "string" [>tmpfile]

:: 剔除⽂件中包含string的⾏
Type [drive:][path]filename | find /v "string"

:: 显⽰⽂件⾏数
Type [drive:][path]filename | find /c
```

> [!tip|label: 提示]
> 以上⽤法将去除 `find` 命令⾃带的提⽰语（⽂件名提⽰）

### 示例

```batch
@echo off 
echo 111 >test.txt 
echo 222 >>test.txt 
find "111" test.txt 
del test.txt
pause
```

运行输出：

```txt
---------- TEST.TXT
111
```

```batch
@echo off 
echo 111 >test.txt 
echo 222 >>test.txt 
type test.txt|find "111" 
del test.txt 
pause
```

运行输出：

```txt
111
```
