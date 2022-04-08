# mermaid

首先在 `body` 中引入 `mermaid.js` 文件。

```html
<!-- mermaid支持 -->
<script src="https://cdn.9xing.cn/mermaid/8.13.4/mermaid.min.js"></script>
```

> [!warning|label: 注意]
> `mermaid.js` 文件的引入要放在**配置脚本之前**。

配置：

```html
<script>
    var mermaidNum = 0;
    mermaid.initialize({
        startOnLoad: false
    });

    window.$docsify = {
        markdown: {
            renderer: {
                code: function(code, lang) {
                    if (lang === 'mermaid') {
                        return '<div class="mermaid">' + mermaid.render('mermaid-svg-' + mermaidNum++, code) + '</div>';
                    }
                    return this.origin.code.apply(this, arguments);
                }
            }
        },
    }
</script>
```
