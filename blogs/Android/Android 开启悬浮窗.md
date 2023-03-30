---
title: Android 开启悬浮窗
date: 2015-10-21 16:40
tags:
 - Android
 - WindowManager
 - 悬浮窗
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

开启全局的悬浮窗（即覆盖在所有 `Activity` 上的悬浮窗）需要使用 `Application` 的 `Window` ，即使用 `Application Context`获取 `WindowManager`。

```java
WindowManager manager = (WindowManager) applicationContext.getSystemService(WINDOW_SERVICE);
``` 

如果使用 `Activity Context` 获取 `WindowManager`，则悬浮窗只能显示在当前 `Activity`。

```java
WindowManager manager = (WindowManager) activityContext.getSystemService(WINDOW_SERVICE);
```

## 申请权限方式开启悬浮窗:

```java
WindowManager manager = (WindowManager) context.getSystemService(WINDOW_SERVICE);
TextView textView = new TextView(MainActivity.this);
textView.setText("悬浮窗测试");
WindowManager.LayoutParams lp = new WindowManager.LayoutParams(
        ViewGroup.LayoutParams.WRAP_CONTENT,
        ViewGroup.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.TYPE_SYSTEM_ALERT,
        WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
                | WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE
                | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
        PixelFormat.TRANSLUCENT
                | WindowManager.LayoutParams.FIRST_SYSTEM_WINDOW);
manager.addView(textView, lp);
```

#### 添加权限：

```xml
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
```

## 不需权限开启悬浮窗

将上面代码中的 `WindowManager.LayoutParams.TYPE_SYSTEM_ALERT` 改成 `WindowManager.LayoutParams.TYPE_TOAST` 即可。

```java
WindowManager manager = (WindowManager) context.getSystemService(WINDOW_SERVICE);
TextView textView = new TextView(MainActivity.this);
textView.setText("悬浮窗测试");
WindowManager.LayoutParams lp = new WindowManager.LayoutParams(
        ViewGroup.LayoutParams.WRAP_CONTENT,
        ViewGroup.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.TYPE_TOAST,
        WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
                | WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE
                | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
        PixelFormat.TRANSLUCENT
                | WindowManager.LayoutParams.FIRST_SYSTEM_WINDOW);
manager.addView(textView, lp);
```