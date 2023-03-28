---
title: 降域 & postMessage
date: 2020-12-24 21:23
tags:
 - FrontEnd
categories:
 - FrontEnd
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

前置知识点： [同源策略 & 跨域](https://blog.csdn.net/u014165119/article/details/111355519)

## iframe 跨域

由于同源策略的限制，使用 `iframe` 标签引入非同源的资源，在外部操作 `iframe` 中的 `DOM` 元素将会被浏览器阻止并报错。  
假设有两个域名：`blog.sch.com`、`game.sch.com`。  

在 blog 的页面中加载 game 的页面，并操作其中的 `DOM` 元素。

```html
<body>
    <div>This is outside window.</div>
    <iframe src="https://game.sch.com"></iframe>
    <script>
        const frame = document.querySelector('iframe')
        const frameDoc = frame.contentWindow.document
        // 操作非同源的 iframe 中的 DOM 元素
        frameDoc.body.innerHTML = 'This is iframe'
    </script>
</body>
```

浏览器报错如下：

> Uncaught DOMException: Blocked a frame with origin "https://game.sch.com" from accessing a cross-origin frame.

## 解决方案 1：降域

降域是通过将不同域的 `document.domain` 指定为其共同父域从而使其同源的跨域解决方案。  

`blog.sch.com`、`game.sch.com` 具有共同的父域 `sch.com`。  

那么将两个域名下的页面的域修改为 `sch.com` 即可解决跨域问题。

```javascript
document.domain = 'sch.com'
```

**注意事项：**

* `document.domain` 指定的域必须为当前域或者其父域。
* 子域与父域跨域时，父域也必须指定 `document.domain`。

**缺点：** 只能用在具有相同父域的情况下。

那么当两个主域名完全不同时，应该怎么办呢？这就要用到 `postMessage` 了。

## 解决方案2：postMessage

`postMessage` 是 `HTML5` 中新增的函数，可以用来向 `window` 发送消息。

```javascript
window.postMessage(message, targetOrigin)
```

**message** 是要发送的消息（可以是对象）。  

**targetOrigin** 的值可以是 `*` 或者一个 `URI`，用来指定可以接收该消息的域，`*` 表示可以发送到任意 `window`，如果 `window` 的域和 targetOrigin 不配，将不会发送该消息。

而有发送就会有接收，否则没有任何意义。我们可以通过向 `window` 添加 `message` 事件监听器获取发送的消息。

```javascript
window.addEventListener('message', (event) => {
    const { origin, source, data } = event
})
```

**origin** 是消息发送者的域，可以验证消息的发送者是否可被信任。  

**source** 是消息发送者的 `window` 对象，可以使用 `source.postMessage` 向发送者回传消息。  

**data** 是消息内容。

