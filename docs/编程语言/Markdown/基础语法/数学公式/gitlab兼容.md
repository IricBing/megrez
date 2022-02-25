# gitlab 兼容

`Gitlab` 是支持的，但是需要做出一定的调整，单行显示，方式从 `$...$` 改变为如下写法

```markdown
$`...`$
```

多行显示改成如下写法：

```markdown
    ```math
    $`...`$
    ```

```

测试单行显示：$\sum_{i=0}^N\int_{a}^{b}g(t, i)\text{d}t$

测试分行显示：

```math
\sum_{i=0}^N\int_{a}^{b}g(t, i)\text{d}t
```