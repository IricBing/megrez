# flow

> [!attention|label:警告]
> 这个目前来看还不够友好，**慎用**，需要刷新页面才会出来。

> [!tip|label: 提示]
> `flowchart.js` 依赖于 `raphael.js`

支持[flowchart.js](https://github.com/adrai/flowchart.js)流程图。

首先在 `body` 中引入 `raphael.js` 和 `flowchart.js` 文件。

```html
<!-- flowchart支持 -->
<script src="https://cdn.9xing.cn/raphael/2.3.0/raphael.min.js"></script>
<script src="https://cdn.9xing.cn/flowchart/1.17.1/flowchart.min.js"></script>
```

> [!warning|label: 注意]
> `raphael.min.js` 和 `flowchart.min.js` 文件的引入要放在**配置脚本之前**。

配置：

```html
<script>
    var flownow = 0;
    var canvasnow = 0;
    window.onload = function() {
        for (var i = 0; i < flownow; i++) {
            var cd = document.getElementById('gengzi_code_' + i),
                chart;
            var code = cd.value;
            chart = flowchart.parse(code);
            chart.drawSVG('canvas' + i, {
                // 'x': 30,
                // 'y': 50,
                'line-width': 3,
                'line-length': 50,
                'text-margin': 10,
                'font-size': 14,
                'font-color': 'black',
                'line-color': 'black',
                'element-color': 'black',
                fill: 'white',
                'yes-text': 'yes',
                'no-text': 'no',
                'arrow-end': 'block',
                scale: 1,
                // style symbol types
                symbols: {
                    start: {
                        'font-color': 'red',
                        'element-color': 'green',
                        fill: 'yellow'
                    },
                    end: {
                        class: 'end-element'
                    }
                },
                // even flowstate support ;-)
                flowstate: {
                    past: {
                        fill: '#CCCCCC',
                        'font-size': 12
                    },
                    current: {
                        fill: 'yellow',
                        'font-color': 'red',
                        'font-weight': 'bold'
                    },
                    future: {
                        fill: '#FFFF99'
                    },
                    request: {
                        fill: 'blue'
                    },
                    invalid: {
                        fill: '#444444'
                    },
                    approved: {
                        fill: '#58C4A3',
                        'font-size': 12,
                        'yes-text': 'APPROVED',
                        'no-text': 'n/a'
                    },
                    rejected: {
                        fill: '#C45879',
                        'font-size': 12,
                        'yes-text': 'n/a',
                        'no-text': 'REJECTED'
                    }
                }
            });
        }
    };
</script>

<script>
    var mermaidNum = 0;
    mermaid.initialize({
        startOnLoad: false
    });

    window.$docsify = {
        markdown: {
            renderer: {
                code: function(code, lang) {
                    if (lang === 'flow') {
                        return (
                            '<div><textarea id="gengzi_code_' +
                            flownow++ +
                            '" style="width: 100%;display:none;" rows="11"  >' +
                            code +
                            "</textarea></div><div id='canvas" +
                            canvasnow++ +
                            "'></div>"
                        );
                    }
                    return this.origin.code.apply(this, arguments);
                }
            }
        },
    }
</script>
```
