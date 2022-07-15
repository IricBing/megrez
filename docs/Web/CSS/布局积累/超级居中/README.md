# 超级居中

![效果](assets/images/效果.gif)

首先指定 `grid` 作为 `display` 方法，然后在同一个元素上写入 `place-items: center` 。 `place-items` 是同时设置 `align-items` 和 `justify-items` 的快速方法。通过将其设置为 `center` ， `align-items` 和 `justify-items` 都将设置为 `center` 。

```css
.parent {
    display: grid;
    place-items: center;
}
```

这使得内容能够在父级内**完美居中**，而不管内部大小。
