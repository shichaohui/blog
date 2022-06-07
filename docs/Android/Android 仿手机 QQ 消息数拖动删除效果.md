---
title: 仿手机 QQ 消息数拖动删除效果
date: 2015-10-09 17:37
tags:
 - Android
 - 自定义 View
categories:
 - Android
---

仿手机 QQ 消息数拖动删除效果，本效果的实现由[这里](http://www.eoeandroid.com/forum.php?mod=viewthread&tid=909319)的项目修改而来，原项目使用稍显麻烦，且只能使用在 `ListView` 及 `ScrollView` 中。

![效果图](https://img-blog.csdnimg.cn/img_convert/494a913ba39f4d9cbeb4d651946c206c.gif)

### 用法：

复制[/app/src/main/java/com/sch/dragdelete/DragDeleteTextView.java](https://github.com/shichaohui/DragDeleteTextView/blob/master/app/src/main/java/com/sch/dragdelete/DragDeleteTextView.java)，和[/app/src/main/res/drawable/clean_anim.xml](https://github.com/shichaohui/DragDeleteTextView/blob/master/app/src/main/res/drawable/clean_anim.xml)，以及使用到的图片[/app/src/main/res/mipmap-xhdpi/](https://github.com/shichaohui/DragDeleteTextView/tree/master/app/src/main/res/mipmap-xhdpi)到自己项目中的对应位置。

`DragDeleteTextView` 类的用法与 `TextView` 完全一致，获取 `DragDeleteTextView` 的实例之后，可以调用 `setConnectedColor(int connectedColor)` 方法设置拖动 `View` 与原位置的连接线的颜色，默认红色。