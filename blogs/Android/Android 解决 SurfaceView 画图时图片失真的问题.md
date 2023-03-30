---
title: 解决 SurfaceView 画图时图片失真的问题
date: 2015-10-10 17:29
tags:
 - Android
 - SurfaceView
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

项目中使用到 `SurfaceView`，绘制图片的时候总是出现一些条纹，好像被拉伸了似的，但是使用 `View` 去绘制时却这没有这个问题，针对 `SurfaceView` 找了好久都没找到原因，后来无意中发现 `Paint` 中一个方法，问题轻松解决。

```
mPaint.setDither(true); // 防止抖动
```