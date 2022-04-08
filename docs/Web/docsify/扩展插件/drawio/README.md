# drawio支持

[GitHub地址](https://github.com/KonghaYao/docsify-drawio)

首先在 `body` 中引入相关文件。

```html
<!-- drawio支持 -->
<script src="https://cdn.9xing.cn/docsify-drawio/1.0.7/viewer.min.js"></script>
<script src="https://cdn.9xing.cn/docsify-drawio/1.0.7/drawio.js"></script>
```

> [!warning|label: 注意]
> 一定要在 `window.$docsify` 后引入。

配置

```html
<script>
    window.$docsify = {
        markdown: {
            renderer: {
                code: function(code, lang) {
                    if (lang === 'drawio') {
                        if (window.drawioConverter) {
                            return window.drawioConverter(code);
                        } else {
                            return `<div class='drawio-code'>${code}</div>`;
                        }
                    }
                    return this.origin.code.apply(this, arguments);
                }
            }
        },
    }
</script>
```

使用方法：

```markdown
[系统架构图](./assets/files/系统架构图.drawio ':include :type=code')
```

示例：

[系统架构图](./assets/files/系统架构图.drawio ':include :type=code')
