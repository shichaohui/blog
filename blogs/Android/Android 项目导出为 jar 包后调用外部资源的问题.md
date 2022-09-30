---
title: Android 项目导出为 jar 包后调用外部资源的问题
date: 2015-06-02 12:04
tags:
 - Android
 - jar
 - Resource
categories:
 - Android
---

**将一个项目导出为jar包**

很简单，步骤：右键点击目标项目 --> 选择 `Export...` --> 选择 `Java` --> 选中 `Jar file` --> 点击 `Next` 按钮 --> 将勾选全部去掉只保留 `src` --> 下面有个框框可以选择导出路径 --> `Finish`。

* 如果项目中没有使用到资源（如图片、布局文件）直接导出即可。
* 如果有资源文件那么直接导出也不会报错。但是在使用的时候会报一些 id 找不到之类的错误。

本文将介绍几种项目导出为 `jar` 包后仍能调用资源的方式。

## 第一种：通过反射动态获取资源 id

参考另一篇文章：http://blog.csdn.net/u014165119/article/details/46302695

把原来的 `R.id.×××` 、`R.layout.×××` 等资源 `id` 获取方式改为 `MResource.getViewIdByName(Context context, String name)` 、`MResource.getLayoutIdByName(Context context, String name)` 等方式，之后正常导出 `jar` 包。使用 `jar` 包时把资源一起拷贝到新项目对应的位置即可。

## 第二种:使用 library 库的方式（1）

只需要把要封装 `jar` 包的项目改为 `library`，并在要使用 `jar` 包的项目中引用此项目，并把 `library` 中的 `AndroidManifest.xml` 文件中的内容添加到使用 `library` 的项目的 `AndroidManifest.xml` 文件中。

**将普通Android项目变成library：** 右键点击要变的项目 --> 选择 `Properties` --> 在弹出框的左上角选择 `Android` --> 勾选 `Is Library` 单选框 --> `OK`。

**引用library：** 右键点击要变的项目 --> 选择 `Properties` --> 在弹出框的左上角选择 `Android` --> 点击 `Add...` 按钮 --> 在弹出框中选中要使用的 `library` --> `OK`。

注意：这种方式使用起来比较简单，但是会暴露源码，如果要给其他公司使用就不行了。

## 第三种：使用 library 库的方式（2）

步骤：
1. 把要封装 `jar` 包的项目设置为 `library` 库（`Is Library`）。
2. 将项目 `Clean` 一次。步骤：工具栏点击 `Project` --> 选择 `Clean...` --> 选中项目 --> `OK`。
3. 使用 `Export` 导出 `jar` 包（只导出 `src` 目录下的源码）。
4. 将导出的 `jar` 文件复制到项目的 `libs` 文件夹下，并删除 `src` 下的源码。
5. 在使用 `library` 的项目中 **引用library**。
6. 把 `library` 中的 `AndroidManifest.xml` 文件中的内容添加到使用 `library` 的项目的 `AndroidManifest.xml` 文件中。

这种方式是 `library` 和 `jar` 包结合使用，既隐藏了源码，又简单方便。

**注意：** 使用第二、第三中方式时，布局文件等资源的名字在 `library` 库和引用 `library` 库的项目中不能有相同的。

## 第四种 Android Studio AAR文件

[Android Studio 打包及引用AAR](http://www.androidchina.net/2467.html)
[Eclipse 中使用AAR](http://blog.csdn.net/u013308121/article/details/46717499)