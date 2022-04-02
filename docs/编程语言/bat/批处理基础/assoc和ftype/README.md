# assoc 和 ftype

## 功能

文件关联。

`assoc` 设置 `⽂件扩展名` 关联，关联到 `⽂件类型` 。

`ftype` 设置 `⽂件类型` 关联，关联到 `执⾏程序和参数` 。

## 什么是文件关联

当你双击⼀个 `.txt` ⽂件时， `windows` 并不是根据 `.txt` 直接判断⽤ `notepad.exe` 打开 ⽽是先判断 `.txt` 属于 `txtfile` **⽂件类型** 再调⽤ `txtfile` 关联的命令⾏ `txtfile=%SystemRoot%\system32\NOTEPAD.EXE %1`

可以在文件夹选项→文件类型里修改这两种关联。

## 用法

### assoc

显示所有**文件扩展名**关联。

```batch
:: 显⽰.txt代表的'⽂件类型'，结果显⽰ .txt=txtfile
assoc .txt

:: 显⽰.doc代表的'⽂件类型'，结果显⽰ .doc=Word.Document.8
assoc .doc

:: 显⽰.exe代表的'⽂件类型'，结果显⽰ .exe=exefile
assoc .exe

:: 设置.txt为word类型的⽂档，可以看到.txt⽂件的图标都变了
assoc .txt=Word.Document.8

:: 恢复.txt的正确关联
assoc .txt=txtfile
```

### ftype

显⽰所有**⽂件类型**关联

```batch
:: 显⽰exefile类型关联的命令⾏，结果显⽰ exefile="%1" %*
ftype exefile

:: 恢复 exefile 的正确关联
ftype exefile="%1" %*
```