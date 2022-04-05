# pushd 和 popd

## 功能

切换当前⽬录

## 用法示例

```batch
@echo off 
:: #在 C:\ 建⽴ mp3 ⽂件夹 
c: & cd\ & md mp3 

:: 在 D:\ 建⽴ mp4 ⽂件夹 
md d:\mp4 

:: 更改当前⽬录为 d:\mp4
cd /d d:\mp4 

:: 保存当前⽬录，并切换当前⽬录为c:\mp3
pushd c:\mp3  

:: 恢复当前⽬录为刚才保存的 d:\mp4
popd 
```

> [!tip|label: 提示]
> ⼀般⽤处不⼤，在当前⽬录名不确定时，会有点帮助。（dos编程中很有⽤）
