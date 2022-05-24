# 安装SimHei字体

`SimHei` 字体字体注意用于 `Python` 编程的中文字体支持， `matplotlib` 库一般设置使用这个字体（不设置中文无法显示）

## Step1. 下载字体

[SimHei字体](https://megrez-file.virtualbing.fun/Linux/Ubuntu/20.04/%E7%B3%BB%E7%BB%9F%E9%85%8D%E7%BD%AE/%E5%AE%89%E8%A3%85SimHei%E5%AD%97%E4%BD%93SimHei.ttf)

来源：[站长字体](https://font.chinaz.com/161017462260.htm)

## Step2. 安装

```bash
$ sudo cp SimHei.ttf /usr/share/fonts/SimHei.ttf
$ sudo mkfontscale      # 生成字体的索引信息
$ sudo mkfontdir        # 生成字体的索引信息
$ sudo fc-cache -fv     # 更新字体缓存
```

## Step3. 重启
