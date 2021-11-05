# WebHook

[官方文档](https://docs.emqx.cn/enterprise/v4.3/advanced/webhook.html)

`WebHook` 是由 [emqx_web_hook](https://github.com/emqx/emqx-web-hook) 插件提供的 **将 `EMQ X` 中的钩子事件通知到某个 `Web` 服务** 的功能。

`WebHook` 的内部实现是基于 [钩子](https://docs.emqx.cn/enterprise/v4.3/advanced/hooks.html)，但它**更靠近顶层**一些。它通过在钩子上的挂载回调函数，获取到 `EMQ X` 中的各种事件，并转发至 `emqx_web_hook` 中配置的 `Web` 服务器。

::: tip 提示
`WebHook` 对于事件的处理是**单向**的，它仅支持将 `EMQ X` 中的事件推送给 `Web` 服务，并不关心 `Web` 服务的返回。 借助 `Webhook` 可以完成设备在线、上下线记录，订阅与消息存储、消息送达确认等诸多业务。
:::

## docker-compose配置

一般我们会通过 `Docker Compose` 来启动 `emqx` 服务，直接将 `webhook` 的配置写到配置文件中即可，以**本地开发环境**为例：

```yml
version: '3.8'

volumes:
  vol-emqx-data:
    name: emqx-data
  vol-emqx-etc:
    name: emqx-etc
  vol-emqx-log:
    name: emqx-log

services:
  emqx:
    image: emqx/emqx:4.3.4
    container_name: emqx
    restart: always
    network_mode: host
    pid: host
    volumes:
      - vol-emqx-data:/opt/emqx/data
      - vol-emqx-etc:/opt/emqx/etc
      - vol-emqx-log:/opt/emqx/log
      - /etc/localtime:/etc/localtime:ro
    environment:
      # webhook 插件配置
      EMQX_WEB__HOOK__URL: http://127.0.0.1:3000/emqx/webhook
      EMQX_WEB__HOOK__HEADERS__CONTENT-TYPE: application/json
      EMQX_WEB__HOOK__HEADERS__ACCEPT: '*/*'
      EMQX_WEB__HOOK__RULE__CLIENT__CONNECT__1: '{"action": "on_client_connect"}'
      EMQX_WEB__HOOK__RULE__CLIENT__CONNACK__1: '{"action": "on_client_connack"}'
      EMQX_WEB__HOOK__RULE__CLIENT__CONNECTED__1: '{"action": "on_client_connected"}'
      EMQX_WEB__HOOK__RULE__CLIENT__DISCONNECTED__1: '{"action": "on_client_disconnected"}'
      EMQX_WEB__HOOK__RULE__CLIENT__SUBSCRIBE__1: '{"action": "on_client_subscribe"}'
      EMQX_WEB__HOOK__RULE__CLIENT__UNSUBSCRIBE__1: '{"action": "on_client_unsubscribe"}'
      EMQX_WEB__HOOK__RULE__SESSION__SUBSCRIBE__1: '{"action": "on_session_subscribed"}'
      EMQX_WEB__HOOK__RULE__SESSION__UNSUBSCRIBE__1: '{"action": "on_session_unsubscribed"}'
      EMQX_WEB__HOOK__RULE__SESSION__TERMINATED__1: '{"action": "on_session_terminated"}'
      EMQX_WEB__HOOK__RULE__MESSAGE__PUBLISH__1: '{"action": "on_message_publish"}'
      EMQX_WEB__HOOK__RULE__MESSAGE__DELIVERED__1: '{"action": "on_message_delivered"}'
      EMQX_WEB__HOOK__RULE__MESSAGE__ACKED__1: '{"action": "on_message_acked"}'
```

经过上述配置，所有的事件都会转发到本地 `3000` 端口的 `/emqx/webhook` 路径上。

::: danger 警告
默认 `WebHook` 插件是**禁用**的，需要现在 `Dashboard` 控制台**开启**这个插件！！！
:::
