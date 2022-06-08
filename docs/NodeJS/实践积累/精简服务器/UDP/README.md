# 精简 UDP 服务器

> [!tip|label: 提示]
> 使用的 `NodeJS` 版本为： `v16.14.2`

## 实现方案

`NodeJS` 已经内置了[dgram](https://nodejs.org/api/dgram.html)库，就和我们实现精简 `TCP` 服务器一样，可以直接实现精简 `UDP` 服务器。

## 服务端实现

新建 `server.mjs` 文件，写入以下代码：

```js
import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    server.send('hello client!', rinfo.port, rinfo.address, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + rinfo.address + ':' + rinfo.port);
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(1903);
// Prints: server listening 0.0.0.0:1903
```

## 客户端实现

新建 `client.mjs` 文件，写入如下代码：

```js
import dgram from 'node:dgram';

const PORT = 1903;
const HOST = '127.0.0.1';

const client = dgram.createSocket('udp4');

client.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

// 直接模式
client.send('hello server!', PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST + ':' + PORT);
});

// 广播模式
client.bind(function() {
    client.setBroadcast(true);
    client.send('hello everyone!', 1903, '255.255.255.255', function(err) {
        if (err) throw err;
        console.log('msg has been sent');
    });
});
```
