# axios

## 产生环境

在上古时期，浏览器页面在向服务器请求数据时，因为返回的是整个页面的数据，页面都会**强制刷新**一下，这对当时的用户来说体验非常的糟糕，也限制了浏览器中应用的很多可能性。

基于这个背景，**异步网络请求**应运而生—— `Ajax` （**Asynchronous JavaScript and XML**）

`Ajax` 能够让页面无刷新的请求数据。

> [!warning|label:注意]
> 此处的 `Ajax` 是一个**概念**。常说的 `Ajax` 一般指的是 `jQuery` 中的 `Ajax` 实现。


因为 `Ajax` 是一个概念，所以也就会相应的有其具体实现，如常见的： `jQuery` 封装的 `ajax` 、原生的 `XMLHttpRequest` 、 `axios` 等。各种方式各有利弊。

* 原生的`XMLHttpRequest`的配置和调用方式都很繁琐，实现异步请求十分麻烦。
* `jQuery`的`ajax`相对于原生的`ajax`是非常好用的，但是没有必要因为要用`ajax`异步网络请求而引用`jQuery`框架，当然，老项目以`jQuery`为框架的前端当然没有这个弊端了。

原生 `XMLHttpRequest` 实现 `Ajax` 请求代码：

```js
var request = new XMLHttpRequest(); // 创建XMLHttpRequest对象
//ajax是异步的，设置回调函数
request.onreadystatechange = function() { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应状态码
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return success(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            return fail(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}
// 发送请求:
request.open('GET', '/api/categories');
request.setRequestHeader("Content-Type", "application/json") //设置请求头
request.send(); //到这一步，请求才正式发出
```

## 介绍

`axios` 可以理解为 `ajax i/o system` ，**这不是一种新技术**，本质上还是对原生 `XMLHttpRequest` 的封装，可用于**浏览器**和 `nodejs` 的 `HTTP` 客户端，只不过它是基于 `Promise` 的，符合最新的 `ES` 规范。具备以下特点：

1. 在浏览器中创建`XMLHttpRequest`请求
1. 在`node.js`中发送`http`请求
1. 支持`Promise API`
1. 拦截请求和响应
1. 转换请求和响应数据
1. 取消要求
1. 自动转换`JSON`数据
1. 客户端支持防止`CSRF/XSRF`(跨域请求伪造)

## 请求方式

`axios` 是基于 `Promise` 的，因此可以使用 `Promise API`

1. `axios(config)`
1. `axios.request(config)`
1. `axios.get(url [,config])`
1. `axios.post(url [,data [,config]])`
1. `axios.put(url [,data [,config]])`
1. `axios.delete(url [,config])`
1. `axios.patch(url [,data [,config]])`
1. `axios.head(url [,config])`

示例：

```js
//执行GET请求
import axios from 'axios'

axios.default.baseURL = 'http://localhost:3000/api/products'
axios.get('/user?ID=12345') //返回的是一个Promise
    .then(res => console.log(res))
    .catch(err => console.log(err));

//可配置参数的方式
axios.get('/user', {
        params: {
            ID: 12345
        }
    }).then(res => console.log(res))
    .catch(err => console.log(err));

//发送post请求
axios.post('/user', {
        firstName: 'simon',
        lastName: 'li'
    }).then(res => console.log(res))
    .catch(err => console.log(err));

//发送多个请求(并发请求)，类似于promise.all，若一个请求出错，那就会停止请求
const get1 = axios.get('/user/12345');
const get2 = axios.get('/user/12345/permission');
axios.all([get1, get2])
    .then(axios.spread((res1, res2) => {
        console.log(res1, res2);
    }))
    .catch(err => console.log(err))
```
