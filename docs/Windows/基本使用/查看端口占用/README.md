# 查看端口占用

```bash
$ netstat -ano|findstr "1080"
  TCP    127.0.0.1:1966         127.0.0.1:1080         SYN_SENT        24156
  TCP    127.0.0.1:1967         127.0.0.1:1080         SYN_SENT        24156

$ tasklist|findstr "24156"
chrome.exe                   24156 Console                    2     39,140 K
```