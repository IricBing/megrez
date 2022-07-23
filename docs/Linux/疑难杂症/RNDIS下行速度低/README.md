# RNDIS 下行速度低

* [参考文章](https://www.cnblogs.com/sinpo828/p/13411262.html)

## 现象

[rndis](https://docs.microsoft.com/zh-cn/windows-hardware/drivers/network/overview-of-remote-ndis--rndis-) 是微软定义的一套通讯方案。类似的协议还有 `qmi` 、 `mbim` 、 `ecm` 、 `ncm` 等。

`rndis` 协议足够简单，可靠。所以最近在使用一款 `quectel` 公司模块时采用的就是 `rndis` 模式。在 `linux` 下 对应驱动是 `rndis_host` 驱动。 `windows 10` 下自带 `rndis` 驱动！
拿到模块首先测速度！ 发现模块下行速度 `Windows` 上速度比 `Linux` 高很多，而且上行速度则差不多！ 单独对比 `Linux` ，发现上行又比下行高很多。。。问题很奇怪！

## 产生原因

分析下行收包逻辑：

```c
/*
 * DATA -- host must not write zlps
 */
int rndis_rx_fixup(struct usbnet *dev, struct sk_buff *skb)
{
	int tm = 0;
	/* This check is no longer done by usbnet */
	if (skb->len < dev->net->hard_header_len)
		return 0;

	/* peripheral may have batched packets to us... */
	while (likely(skb->len)) {
		struct rndis_data_hdr	*hdr = (void *)skb->data;
		struct sk_buff		*skb2;
		u32			msg_type, msg_len, data_offset, data_len;

		msg_type = le32_to_cpu(hdr->msg_type);
		msg_len = le32_to_cpu(hdr->msg_len);
		data_offset = le32_to_cpu(hdr->data_offset);
		data_len = le32_to_cpu(hdr->data_len);

		/* don't choke if we see oob, per-packet data, etc */
		if (unlikely(msg_type != RNDIS_MSG_PACKET || skb->len < msg_len
				|| (data_offset + data_len + 8) > msg_len)) {
			dev->net->stats.rx_frame_errors++;
			netdev_dbg(dev->net, "bad rndis message %d/%d/%d/%d, len %d\n",
				   le32_to_cpu(hdr->msg_type),
				   msg_len, data_offset, data_len, skb->len);
			return 0;
		}
		skb_pull(skb, 8 + data_offset);

		/* at most one packet left? */
		if (likely((data_len - skb->len) <= sizeof *hdr)) {
			skb_trim(skb, data_len);
			break;
		}

		/* try to return all the packets in the batch */
		skb2 = skb_clone(skb, GFP_ATOMIC);
		if (unlikely(!skb2))
			break;
		skb_pull(skb, msg_len - sizeof *hdr);
		skb_trim(skb2, data_len);
		usbnet_skb_return(dev, skb2);
	}

	/* caller will usbnet_skb_return the remaining packet */
	return 1;
}
EXPORT_SYMBOL_GPL(rndis_rx_fixup);
```

收包代码稍微复杂点，因为收包需要考虑到聚合报文的情况！因此起了一个while循环判断。while 里面就是剥离rndis 报文头，并调用网卡收包函数的过程！

这里对 `skb` 有两次偏移操作：
1. `skb_pull(skb, 8 + data_offset);` 这一步从`skb` 去除当前消息的 `rndis` 报文头！
2. `skb_pull(skb, msg_len - sizeof *hdr);` 因为`skb payload` 部分已经在`skb2` 有了一份`clone`，那么`skb` 当前的`payload` 就不重要了。因此，这里实际要做的是继续从`skb`剥离当前`rndis` 报文的数据部分（报文头已经剥离掉了）。这一步操作后，`skb` 将指向下一个`rndis` 报文的 `rndis` 报文头！

但是这里第 `2` 步逻辑错了，这里直接减去 `rndis` 报文头是**错的**！ 因为 `rndis` 报文的 `payload` 之前并不一定全是协议头， `payload` 的偏移是头部 `offset` 定义的。

## 解决方案

方案很简单，修改偏移计算逻辑！

```c
/*
 * DATA -- host must not write zlps
 */
int rndis_rx_fixup(struct usbnet *dev, struct sk_buff *skb)
{
	int tm = 0;
	/* This check is no longer done by usbnet */
	if (skb->len < dev->net->hard_header_len)
		return 0;

	/* peripheral may have batched packets to us... */
	while (likely(skb->len)) {
		struct rndis_data_hdr	*hdr = (void *)skb->data;
		struct sk_buff		*skb2;
		u32			msg_type, msg_len, data_offset, data_len;

		msg_type = le32_to_cpu(hdr->msg_type);
		msg_len = le32_to_cpu(hdr->msg_len);
		data_offset = le32_to_cpu(hdr->data_offset);
		data_len = le32_to_cpu(hdr->data_len);

		/* don't choke if we see oob, per-packet data, etc */
		if (unlikely(msg_type != RNDIS_MSG_PACKET || skb->len < msg_len
				|| (data_offset + data_len + 8) > msg_len)) {
			dev->net->stats.rx_frame_errors++;
			netdev_dbg(dev->net, "bad rndis message %d/%d/%d/%d, len %d\n",
				   le32_to_cpu(hdr->msg_type),
				   msg_len, data_offset, data_len, skb->len);
			return 0;
		}
		skb_pull(skb, 8 + data_offset);

		/* at most one packet left? */
		if (likely((data_len - skb->len) <= sizeof *hdr)) {
			skb_trim(skb, data_len);
			break;
		}

		/* try to return all the packets in the batch */
		skb2 = skb_clone(skb, GFP_ATOMIC);
		if (unlikely(!skb2))
			break;
		skb_pull(skb, msg_len - data_offset - 8); // here is what I fixed
		skb_trim(skb2, data_len);
		usbnet_skb_return(dev, skb2);
	}

	/* caller will usbnet_skb_return the remaining packet */
	return 1;
}
EXPORT_SYMBOL_GPL(rndis_rx_fixup);

```

> [!warning|label: 注意]
> 这里的修改仅是规避方案，根本原因还是模块侧封包逻辑的问题。
