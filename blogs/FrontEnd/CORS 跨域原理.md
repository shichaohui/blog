---
title: CORS 跨域原理
date: 2020-12-22 12:37
tags:
 - FrontEnd
 - CORS
 - 跨域
categories:
 - FrontEnd
---

> [同源策略 & 跨域](https://blog.csdn.net/u014165119/article/details/111355519)

## 什么是 CORS？

> `CORS` 全称 `Cross-Origin Resource Sharing`，即跨域资源共享。

`CORS` 是一种基于 [HTTP Header](https://developer.mozilla.org/en-US/docs/Glossary/Header) 的机制，该机制通过允许服务器标示除了它自己以外的其它域。服务器端配合浏览器实现 `CORS` 机制，可以突破浏览器对跨域资源访问的限制，实现跨域资源请求。

## CORS 验证机制

`CORS` 的验证机制分两种模式：简单请求和预检请求。

### 简单请求

简单请求模式下浏览器直接发送请求，并在请求头中携带 `Origin`。 服务器端接到请求后，会根据自己的跨域规则，通过响应头 `Access-Control-Allow-Origin` 来返回验证结果。

请求满足以下所有条件即为简单请求：

1. 请求方法

 - `GET`
 - `POST`
 - `HEAD` 
  
2. `Content-Type` 字段值

 - `text/plain`
 - `multipart/form-data`
 - `application/x-www-form-urlencoded`
  
3. 手动设置的 `Header` 字段只能为自定义字段和 [Fetch](https://fetch.spec.whatwg.org) 规范定义的 `CORS` 安全字段。

 - Accept
 - Accept-Language
 - Content-Language
 - Content-Type
 - DPR
 - Downlink
 - Save-Data
 - Viewport-Width
 - Width

### 预检请求

需要预检的请求必须首先使用 `OPTIONS` 方法发起一个预检请求到服务器，服务器基于预检请求的信息来判断是否接受接下来的实际请求。

**预检请求 `Header`：**

* `Access-Control-Request-Method`

指明实际请求所使用的 `HTTP` 方法。

* `Access-Control-Request-Headers`

指明实际请求所携带的字段。

**预检响应 `Header`：**

* `Access-Control-Allow-Origin`

指明允许访问的域。

* `Access-Control-Allow-Methods`

指明允许的 `HTTP` 请求方法。

* `Access-Control-Allow-Headers`

指明允许携带的字段。

* `Access-Control-Max-Age`

指明该响应的有效时间，在有效时间内，浏览器无须为同一请求再次发起预检请求。

浏览器检查预检响应信息，如果预检通过就发送实际请求。

使用预检请求可以避免跨域请求对服务器的数据产生未预期的影响。

## HTTP Header

### 请求 Header

* `Origin: <origin>` 

指明请求所在域。

* `Access-Control-Request-Method: <method>` 

指明请求所使用的 `HTTP` 方法。

* `Access-Control-Request-Headers: <field-name>[, <field-name>]*`

指明请求所携带的字段。

### 响应 Header

* `Access-Control-Allow-Origin: <origin> | *`

`origin` 值指定了允许访问该资源的域，`*` 表示允许任意域的请求。
* `Access-Control-Expose-Headers: <field-name>[, <field-name>]*`
* 
指明允许浏览器访问的字段。

* `Access-Control-Max-Age: <delta-seconds>`

指明该响应的有效时间，在有效时间内，浏览器无须为同一请求再次发起预检请求。