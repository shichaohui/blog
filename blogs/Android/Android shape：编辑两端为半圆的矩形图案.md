---
title: Android Shape：编辑两端为半圆的矩形图案
date: 2017-08-25 10:23
tags:
 - Android
 - Shape
categories:
 - Android
---

一个 drawable 文件完成不同尺寸的端半圆矩形图案绘制。

## 预期效果

![预期效果](https://s1.ax1x.com/2023/03/24/ppBJmRI.png)

## 编辑 drawable 资源

shape_auto_end_semicircle.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape
    xmlns:android="http://schemas.android.com/apk/res/android">

    <solid android:color="@android:color/holo_blue_bright"/>

    <size android:height="9999dp"/>

    <corners android:radius="9999dp"/>

</shape>
```

## 使用 drawable 资源

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android:id="@+id/layout_root"
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

    <View
        android:layout_width="20dp"
        android:layout_height="20dp"
        android:background="@drawable/shape_auto_end_semicircle"/>

    <View
        android:layout_width="20dp"
        android:layout_height="40dp"
        android:layout_marginTop="10dp"
        android:background="@drawable/shape_auto_end_semicircle"/>

    <View
        android:layout_width="60dp"
        android:layout_height="20dp"
        android:layout_marginTop="10dp"
        android:background="@drawable/shape_auto_end_semicircle"/>

    <View
        android:layout_width="100dp"
        android:layout_height="25dp"
        android:layout_marginTop="10dp"
        android:background="@drawable/shape_auto_end_semicircle"/>

    <View
        android:layout_width="140dp"
        android:layout_height="30dp"
        android:layout_marginTop="10dp"
        android:background="@drawable/shape_auto_end_semicircle"/>

</LinearLayout>
```