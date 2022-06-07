---
title: 解决 ScrollView 滚动条不在最顶部的问题
date: 2015-10-10 17:38
tags:
 - Android
 - ScrollView
categories:
 - Android
---

`ScrollView` 中嵌套 `GridView` （已重写），就是那种按照网上的方法。`GridView` 重写以下方法解决不能完全显示的问题。

```java
/** 重新方法，使其不会出现滚动条，以解决被嵌套进ScrollView不能正常显示的问题 */
@Override
public void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    int expandSpec = MeasureSpec.makeMeasureSpec(Integer.MAX_VALUE >> 2,
            MeasureSpec.AT_MOST);
    super.onMeasure(widthMeasureSpec, expandSpec);
}  
```

之后，`GridView` 显示没有问题了，但是 `ScrollView` 的滚动条不处于最顶部的位置。可以通过给 `ScrollView` 最顶部组件添加以下属性的方法解决。

```xml
android:focusable="true"
android:focusableInTouchMode="true"  
```