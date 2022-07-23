# API 风格

* [官方文档](https://staging-cn.vuejs.org/guide/introduction.html#api-*styles)

> [!note|label: 写在前面]
> 我们使用**组合式** `API` ，所有笔记均以组合式 `API` 为范例。

## 选项式 API

> [!tip|label: 提示]
> 选项式就认为是 `Vue2.x` 的风格即可。

使用**选项式API**，我们可以用包含多个选项的对象来描述组件的逻辑，例如 `data` 、 `methods` 和 `mounted` 。选项所定义的属性都会暴露在函数内部的 `this` 上，它会指向当前的组件实例。

```html
<script>
    export default {
        // data() 返回的属性将会成为响应式的状态
        // 并且暴露在 `this` 上
        data() {
            return {
                count: 0
            }
        },

        // methods 是一些用来更改状态与触发更新的函数
        // 它们可以在模板中作为事件监听器绑定
        methods: {
            increment() {
                this.count++
            }
        },

        // 生命周期钩子会在组件生命周期的各个不同阶段被调用
        // 例如这个函数就会在组件挂载完成后被调用
        mounted() {
            console.log(`The initial count is ${this.count}.`)
        }
    }
</script>

<template>
    <button @click="increment">Count is: {{ count }}</button>
</template>
```

## 组合式 API

通过**组合式** `API` ，我们可以使用导入的 `API` 函数来描述组件逻辑。在单文件组件中，**组合式** `API` 通常会与 `<script setup>` 搭配使用。这个 `setup attribute` 是一个**标识**，告诉 `Vue` 需要在编译时进行转换，来减少使用组合式 `API` 时的样板代码。例如， `<script setup>` 中的导入和顶层变量 `/` 函数都能够在模板中直接使用。

下面是使用了**组合式** `API` 与 `<script setup>` 改造后和上面的模板完全一样的组件：

```html
<script setup>
    import {
        ref,
        onMounted
    } from 'vue'

    // 响应式状态
    const count = ref(0)

    // 用来修改状态、触发更新的函数
    function increment() {
        count.value++
    }

    // 生命周期钩子
    onMounted(() => {
        console.log(`The initial count is ${count.value}.`)
    })
</script>

<template>
    <button @click="increment">Count is: {{ count }}</button>
</template>
```
