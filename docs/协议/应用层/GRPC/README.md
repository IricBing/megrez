# GRPC

## gRPC 是什么？

gRPC 由 `google 开发` ，是一款 `语言中立、平台中立、开源` 的[远程过程调用(RPC)系统](RPC.md)。基于 `HTTP2协议标准` 设计开发，默认采用[Protocol Buffers](https://developers.google.com/protocol-buffers/)数据序列化协议， `支持多种开发语言` 。gRPC提供了一种简单的方法来精确的定义服务，并且为客户端和服务端自动生成可靠的功能库。

在gRPC中，客户端应用程序可以直接在不同机器上的服务器应用程序上调用方法，就像它是本地对象一样，使您更容易创建分布式应用程序和服务。 与许多RPC系统一样，gRPC基于定义服务的思想，指定可以使用其参数和返回类型远程调用的方法。 在服务器端，服务器实现此接口并运行gRPC服务器来处理客户端调用。 在客户端，客户端有一个stub（简称为一些语言的客户端），提供与服务器相同的方法。

![GRPC原理图](assets/images/GRPC原理图.png)

gRPC客户端和服务器可以在各种环境中运行和交互，从Google内部的服务器到您自己的应用，并且可以使用 `任何gRPC支持的语言` 编写。

## 服务类型

gRPC 提供四类服务方法：

### 单项 RPC（又称一元RPC）

客户端发送一个请求给服务端，从服务端获取一个应答，就像一次普通的函数调用。

``` protobuf
rpc SayHello(HelloRequest) returns (HelloResponse){
}
```

### 服务器流RPC

客户端发送一个请求给服务端，可获取一个数据流用来读取一系列消息。客户端从返回的数据流里一直读取直到没有更多消息为止。

``` protobuf
rpc LotsOfReplies(HelloRequest) returns (stream HelloResponse){
}
```

### 客户端流式 RPC

客户端用提供的一个数据流写入并发送一系列消息给服务端。一旦客户端完成消息写入，就等待服务端读取这些消息并返回应答。

``` protobuf
rpc LotsOfGreetings(stream HelloRequest) returns (HelloResponse) {
}
```

### 双向流式 RPC

两边都可以分别通过一个读写数据流来发送一系列消息。这两个数据流操作是相互独立的，所以客户端和服务端能 `按其希望的任意顺序读写` ，例如：服务端可以在写应答前等待所有的客户端消息，或者它可以先读一个消息再写一个消息，或者是读写相结合的其他方式。每个数据流里消息的顺序会被保持。

``` protobuf
rpc BidiHello(stream HelloRequest) returns (stream HelloResponse){
}
```

## 使用API

从.proto文件中的服务定义开始，gRPC提供了生成客户机和服务器端代码的protocol buffer编译器插件。 gRPC用户通常在客户端调用这些API，并在服务器端实现相应的API。

* **在服务器端**，服务器实现服务声明的方法，并运行gRPC服务器来处理客户端调用。 gRPC基础设施解码传入请求，执行服务方法和编码服务响应。
* **在客户端**，客户端具有称为stub的本地方法定义（对于一些语言，首选项是客户端），其实现与服务相同的方法。 然后，客户端可以直接在本地对象上调用这些方法，将调用的参数包含在适当的protocol buffer消息类型中 - gRPC在将请求发送到服务器并返回服务器的protocol buffer响应之后。

## 同步和异步

同步RPC调用阻塞，直到响应从服务器返回是与RPC渴望的过程调用最接近（差不多这个意思）。 另一方面，网络本质上是异步的，并且在许多情况下，能够在不阻塞当前线程的情况下启动RPC是有用的。

大多数语言中的gRPC编程表面都包含同步和异步语言。

## 生命周期

### 单项 RPC（又称一元RPC）

客户端发出单个请求，获得单个响应。

* 一旦客户端通过桩调用一个方法，服务端会得到相关通知 ，通知包括客户端的元数据，方法名，允许的响应期限（如果可以的话）
* 服务端既可以在任何响应之前直接发送回初始的元数据，也可以等待客户端的请求信息，到底哪个先发生，取决于具体的应用。
* 一旦服务端获得客户端的请求信息，就会做所需的任何工作来创建或组装对应的响应。如果成功的话，这个响应会和包含状态码以及可选的状态信息等状态明细及可选的追踪信息返回给客户端 。
* 假如状态是 OK 的话，客户端会得到应答，这将结束客户端的调用。

### 服务端流式 RPC

服务端流式 RPC 除了在得到客户端请求信息后发送回一个应答流之外，与我们的简单例子一样。在发送完所有应答后，服务端的状态详情(状态码和可选的状态信息)和可选的跟踪元数据被发送回客户端，以此来完成服务端的工作。客户端在接收到所有服务端的应答后也完成了工作。

### 客户端流式 RPC

客户端流式 RPC 也基本与我们的简单例子一样，区别在于客户端通过发送一个请求流给服务端，取代了原先发送的单个请求。服务端通常（但并不必须）会在接收到客户端所有的请求后发送回一个应答，其中附带有它的状态详情和可选的跟踪数据。

### 双向流式 RPC

双向流式 RPC ，调用由客户端调用方法来初始化，而服务端则接收到客户端的元数据，方法名和截止时间。服务端可以选择发送回它的初始元数据或等待客户端发送请求。

下一步怎样发展取决于应用，因为客户端和服务端能在任意顺序上读写 - 这些流的操作是完全独立的。例如服务端可以一直等直到它接收到所有客户端的消息才写应答，或者服务端和客户端可以像"乒乓球"一样：服务端后得到一个请求就回送一个应答，接着客户端根据应答来发送另一个请求，以此类推。

### 截止时间

gRPC 允许客户端在调用一个远程方法前指定一个最后期限值。这个值指定了在客户端可以等待服务端多长时间来应答，超过这个时间值 RPC 将结束并返回 `DEADLINE_EXCEEDED` 错误。在服务端可以查询这个期限值来看是否一个特定的方法已经过期，或者还剩多长时间来完成这个方法。

### RPC 终止

在 gRPC 里，客户端和服务端对调用成功的判断是独立的、本地的，他们的结论可能不一致。这意味着，比如你有一个 RPC 在服务端成功结束("我已经返回了所有应答!")，到那时在客户端可能是失败的("应答在最后期限后才来到!")。也可能在客户端把所有请求发送完前，服务端却判断调用已经完成了。

### 取消 RPC

无论客户端还是服务端均可以再任何时间取消一个 RPC 。一个取消会立即终止 RPC 这样可以避免更多操作被执行。它不是一个"撤销"， 在取消前已经完成的不会被回滚。当然，通过同步调用的 RPC 不能被取消，因为直到 RPC 结束前，程序控制权还没有交还给应用。

### 元数据集

元数据是 `一个特殊 RPC 调用对应的信息(授权详情])` ，这些信息 `以键值对的形式存在` ，一般键的类型是字符串，值的类型一般也是字符串(当然也可以是二进制数据)。元数据对 gRPC 本事来说是不透明的 - 它让客户端提供调用相关的信息给服务端，反之亦然。

对于元数据的访问是 `语言相关` 的。

### 频道

在创建客户端存根时，一个 gRPC 频道提供一个特定主机和端口服务端的连接。客户端可以通过指定频道参数来修改 gRPC 的默认行为，比如打开关闭消息压缩。一个频道具有状态，包含 `已连接` 和 `空闲` 。

gRPC 如何处理关闭频道是 `语言相关的` 。有些语言可允许询问频道状态。
