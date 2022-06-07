---
title: WebView 和 JS 交互
date: 2015-05-23 16:14
tags:
 - Android
 - WebView
categories:
 - Android
---

## Android 调用 js

调用方式：

```java
mWebView.loadUrl("javascript:method()");
``` 

其中 `method()` 是 js 中的一个方法。

## js调用Android

调用方式：  

* 首先在Java类作为被调用对象，这里叫做 `JavaScriptInterfaceObject` ，其中有个方法叫 `method()` ；  
* 其次使用以下方法注入对象到 js。

```java
mWebView.addJavaScriptInterface(new JavaScriptInterfaceObject(), "myObject")
``` 

* 最后在js中使用该对象：  

```JavaScript
<a onClick="myObject.method()">这里可以是链接也可以是按钮或者其他东西</a>
```