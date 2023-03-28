---
title: Flutter 自定义缩放控件
date: 2019-09-18 16:09
tags:
 - Flutter
categories:
 - Flutter
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

最近在学习 `Flutter`，俗话说的好，纸上得来终觉浅，所以动手撸了一个 [gank.io](https://gank.io) 的 APP，有兴趣的可以 [到 GitHub 看看源码](https://github.com/shichoahui/Gank)。

本文将与大家分享项目中自定义的缩放控件 [GestureZoomBox](https://github.com/shichaohui/gesture_zoom_box) 。

## 功能

- 双击缩放。
- 双指缩放。
- 以双击位置/双指位置作为缩放中心。
- 限制缩放/拖动范围，超过范围自动回弹。
- 作为父级 Widget 直接嵌套，无侵入。

![demo_big_image.gif](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xODM3MzY4LTU5NDcxNDY5NTQ3MGU2MTMuZ2lm)

## 核心原理

### 手势识别

[GestureDetector](https://book.flutterchina.club/chapter8/gesture.html)

`Flutter` 已经提供了 `GestureDetector` 处理手势（点击、双击、缩放、拖动），我们只要将可缩放内容作为 `GestureDetector` 的 `child` 并设置相应手势回调即可。

> Pan and scale callbacks cannot be used simultaneous because scale is a superset of pan. Simply use the scale callbacks instead.

这是源码中的注释，大意是“缩放是平移的超集，两者不能同时使用，只需使用缩放回调即可”。因此我们只需要用到以下回调：

```dart
/// 双击事件回调，用来处理双击缩放。
final GestureTapCallback onDoubleTap;

/// 缩放值或者拖动位置发生改变。在这里根据每次的变化量进行缩放/拖动处理。
final GestureScaleUpdateCallback onScaleUpdate;

/// 缩放/拖动结束。用来检测并处理超过边界的情况。
final GestureScaleEndCallback onScaleEnd;
```

### 缩放和平移

使用 `Transform` 进行缩放和平移处理。

```dart
// 当前缩放值
double _scale = 1.0;

// 当前偏移值
Offset _offset = Offset.zero;

...

// 使用 Transform 包裹 child ，以便进行平移和缩放处理
Transform(
  transform: Matrix4.identity()
    ..translate(_offset.dx, _offset.dy)
    ..scale(_scale, _scale),
  child: widget.child,
  alignment: Alignment.center,
)
```

## 使用方法

### 添加依赖

```yaml
dependencies:
  gesture_zoom_box: ^0.0.2
```

### 导包

```dart
import 'package:gesture_zoom_box/gesture_zoom_box.dart';
```

### 使用控件

```dart
GestureZoomBox(
    maxScale: 5.0,
    doubleTapScale: 2.0,
    duration: Duration(milliseconds: 200),
    onPressed: () => Navigator.pop(context),
    child: Image.network(widget.imageUrl),
)
```

## 项目地址

[GitHub](https://github.com/shichaohui/gesture_zoom_box) | [Pub](https://pub.dev/packages/gesture_zoom_box)