# mode 配置系统设备

## 功能

配置系统设备。

## 用法

### 串口

```batch
$ MODE COMm[:] [BAUD=b] [PARITY=p] [DATA=d] [STOP=s] [to=on|off] [xon=on|off] [odsr=on|off] [octs=on|off] [dtr=on|off|hs] [rts=on|off|hs|tg] [idsr=on|off]
```

### 设备状态

```batch
$ MODE [device] [/STATUS]
```

### 打印重定向

```batch
$ MODE LPTn[:]=COMm[:]
```

### 选定代码页

```batch
$ MODE CON[:] CP SELECT=yyy
```

### 代码页状态

```batch
$ MODE CON[:] CP [/STATUS]
```

### 显⽰模式

```batch
$ MODE CON[:] [COLS=c] [LINES=n]
```

### 击键率

```batch
$ MODE CON[:] [RATE=r DELAY=d]
```

## 示例

```batch
$ mode con cols=113 lines=15 & color 9f
```

解析：此命令设置 `DOS` 窗⼝⼤⼩： `15` ⾏， `113` 列
