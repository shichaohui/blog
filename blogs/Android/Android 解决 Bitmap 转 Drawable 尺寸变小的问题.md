---
title: 解决 Bitmap 转 Drawable 尺寸变小的问题
date: 2015-10-10 17:32
tags:
 - Android
 - Bitmap
 - Drawable
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

```java
// bitmap转drawable
Drawable drawable = new BitmapDrawable(context.getResources(), bitmap);
```