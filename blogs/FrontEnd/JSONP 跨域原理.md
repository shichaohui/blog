---
title: JSONP 跨域原理
date: 2020-12-17 11:06
tags:
 - FrontEnd
 - 跨域
categories:
 - FrontEnd
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

前置知识点： [同源策略 & 跨域](https://blog.csdn.net/u014165119/article/details/111355519)

## 什么是 JSONP？

> **JSONP**（**JSON with Padding**）是资料格式[JSON](https://zh.wikipedia.org/wiki/JSON "JSON")的一种“使用模式”，可以让网页从别的网域获取资料。 —— [维基百科](https://zh.wikipedia.org/wiki/JSONP)

## JSONP 核心原理

* `script` 标签不受同源策略影响。
* 动态插入到 `DOM` 中的 `script` 脚本可以立即得到执行。

## 实现步骤

1. 客户端创建一个 `JavaScript` 函数，用来接收服务端返回的数据。

```javascript
function onResponse(data) {
    // do something
}
```

2. 客户端动态插入 `script` 标签执行请求。

```javascript
var script = document.createElement('script')
script.src = 'protocal://domain:port/path?callback=onResponse'
document.head.appendChild(script)
document.head.removeChild(script)
```

3. 服务端将数据和 js 回调函数名拼接为函数调用的字符串并返回给客户端。

```javascript
app.get('/path', function(request, response) {
    var data = getData()
    var callback = request.query.callback
    var result = `${callback}(${JSON.stringify(data)});`
    response.send(result)
})
```

4. 客户端接收到 `script` 标签响应并自动执行回调函数。

## JSONP 的缺点
* 只能使用 `GET` 请求。
* 动态插入的 `script` 脚本可能被注入恶意代码。