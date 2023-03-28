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

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

```java
// bitmap转drawable
Drawable drawable = new BitmapDrawable(context.getResources(), bitmap);
```