# kubectl get

`kubectl get` 命令用来显示资源，输出资源的重要信息，可以使用 `label` 和 `--selector` 参数来进行过滤。

## 语法

```bash
$ kubectl get [(-o|--output=)json|yaml|name|go-template|go-template-file|template|templatefile|jsonpath|jsonpath-as-json|jsonpath-file|custom-columns-file|custom-columns|wide] (TYPE[.VERSION][.GROUP] [NAME | -l label] | TYPE[.VERSION][.GROUP]/NAME ...) [flags]
```
