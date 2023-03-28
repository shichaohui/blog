---
title: 解决 X5 内核在 Android 9 上的 Mixed Content 问题
date:  2019-07-31 18:02
tags:
 - Android
 - X5 内核
categories:
 - Android
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

> I/chromium: [INFO:CONSOLE(0)] "Mixed Content: The page at 'https://xxx' was loaded over HTTPS, but requested an insecure image 'http://xxx'. This request has been blocked; the content must be served over HTTPS.", source: https://xxx) (0)

> I/chromium: [INFO:CONSOLE(43)] "Mixed Content: The page at 'https://xxx' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http:xxx)'. This request has been blocked; the content must be served over HTTPS.", source: https://xxx.js) (43)

## 昨天晚上前端小姐姐找我

告诉我华为 `P30` 上部分用户的头像显示不出来，

还告诉我是 `HTTPS` 页面加载 `HTTP` 图片，

拿出我的 `P30Pro`，一顿操作和分析后提取出了上面两条信息，

再一顿搜索之后加入下面这段代码：

```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
    settings.mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
}
```

**然而并没有解决问题。**

## 找 X5 内核的技术人员反馈

X5 方让我提供内核版本信息，

使用我们的 APP 加载官方调试页面 http://debugtbs.qq.com，

居然 Toast 提示“加载失败，请检查网络”。

一顿搜索后发现官网有这个问题的[解决方案]([https://x5.tencent.com/tbs/technical.html#/detail/sdk/1/b1b4cd06-f71e-47ab-b15f-f92fa9fe81da](https://x5.tencent.com/tbs/technical.html#/detail/sdk/1/b1b4cd06-f71e-47ab-b15f-f92fa9fe81da)
)。

按照官网加入 `android:networkSecurityConfig` 解决网络问题。

## 神奇的事情发生了

带着这段代码运行了一下 APP，

发现不仅网络问题解决了，HTTP 的头像居然也显示出来了。

为了防止出现乌龙，

用各种姿势测试这段代码，发现果然有效。

但仅针对 X5 内核有效，系统内核还是不行。

重新加入 `settings.mixedContentMode` 再次测试，

完美运行。

## 最终解决方案

**步骤1：[解决 Android 9 上的网络问题](https://x5.tencent.com/tbs/technical.html#/detail/sdk/1/b1b4cd06-f71e-47ab-b15f-f92fa9fe81da)**
添加 `network_security_config.xml` 文件并设置给 application：

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

```xml
<application
    ....
    android:networkSecurityConfig="@xml/network_security_config"
    ....
```

**步骤2：解决系统内核混合加载问题**

```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
    settings.mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
}
```