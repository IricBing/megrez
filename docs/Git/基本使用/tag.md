# tag

## 查询tag

```bash
$ git tag
$ git tag -l 'v0.1.*'
```

## 创建tag

```bash
$ git tag v0.1.1-light # 轻量标签

$ git tag -a v0.1.1 -m "0.0.1版本"    #附注标签

$ git tag -a v0.1.1 [sha-1]    # commit 标签
```

> [!warning|label: 三种标签的异同]
> 创建轻量标签不需要传递参数，直接指定标签名称即可。创建附注标签时，参数 `-a` 即 `annotated` 的缩写，指定标签类型，后附标签名。参数 `-m` 指定标签说明，说明信息会保存在标签对象中。

## 切换tag

```bash
$ git checkout v0.0.1
```

> [!warning|label:注意]
> 此时处于一个**空的分支**上。

## 删除tag

```bash
$ git tag -d v0.1.1   # 删除本地tag
$ git push origin :v0.1.1   # 删除远程tag
```

## tag发布

```bash
$ git push origin v0.1.1    # 发布单独标签
$ git push origin --tags    # 发布全部标签
```
