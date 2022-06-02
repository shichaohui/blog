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

# 解决 Bitmap 转 Drawable 尺寸变小的问题

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2015-10-10 17:32</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2015-10-10 17:32</span>
</div>
<br/>

```java
// bitmap转drawable
Drawable drawable = new BitmapDrawable(context.getResources(), bitmap);
```