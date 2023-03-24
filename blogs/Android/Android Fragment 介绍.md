---
title: Fragment 介绍
date: 2015-05-23 16:15
tags:
 - Android
 - Fragment
categories:
 - Android
---

## Fragment 简介

`Fragment` 为大量不同型号、尺寸、分辨率的设备提供了一种统一的UI优化方案。

`Fragment` 允许将 `Activity` 拆分成多个完全独立封装的可重用的组件，每个组件有它自己的生命周期。

每个 `Fragment` 都是独立的模块，并与它绑定的 `Activity` 紧密联系在一起。多个 `Activity` 可以共用一个 `Fragment` 。

`Fragment` 展现了良好的适应性和动态构建 UI 的能力，可以在一个正在显示的 `Activity` 中添加、删除或替换 `Fragment` 。

## 创建 Fragment

可以通过集成 `Fragment` 类来创建一个 `Fragment` ，大多数情况下需要为 `Fragment` 分配一个 UI，也可以为 `Activity` 创建一个没有UI但提供后台行为的 `Fragment` 。如果 `Fragment` 需要 UI，可以重新 `OnCreateView` 方法来填充并返回所需要的 `View`。

代码示例：

```java
import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class MyFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        // 创建或者填充Fragment的UI，并且返回它。
        // 如果这个Fragment没有UI则返回null
        return inflater.inflate(R.layout.my_fragment, container, false);
    }
    
}  
```

## FragmentManager 介绍

每个 `Activity` 都包含一个 `FragmentManager` 来管理它所包含的 `Fragment` 。可以通过使用 `getFragmentManager` 方法来访问 `FragmentManager` ：

```java
FragMentManager fragmentManager = getFragMentManager();
```

`FragmentManager` 提供了很多方法来访问当前添加到 `Activity` 上的 `Fragment` 、通过执行 `FragmentManager` 来添加、删除和替换 `Fragment` 。

## 向 Activity 中添加 Fragment

想要把一个 `Fragment` 添加到一个 `Activity` 中，最简单的方法是在 `Activity` 布局中使用 `fragment` 标签来包含它，如下所示：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical" >
    
    <fragment 
        android:name="包名.Fragment类名"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/my_fragment"/>
</LinearLayout>
```

一旦一个 `Fragment` 被填充后，它就成为一个 `ViewGroup` ，会在 `Activity` 内显示和管理它所包含的 UI。

如果想要在运行时通过添加、删除或者替换 `Fragment` 的方式修改 UI，更好的方法是在布局文件中添加 `ViewGroup` 作为 `Fragment` 的容器，然后在代码中使用 `FragmentTransaction` 来创建相应的 `Fragment` 并添加到 `ViewGroup` 中。

## 使用 FragmentTransaction

在程序运行时，`FragmentTransaction` 可以用来在一个 `Activity` 内添加、删除或替换 `Fragment` 。它同样也支持显示过渡动画的规范以及是否在 back 栈中包含 `Transaction` 。

一个新的 `FragmentTransaction` 是通过使用 `Activity` 的 `FragmentManager` 中的 `beginTransaction` 方法创建的。在设置显示动画之前，可以根据要求使用 `add` 、 `remove` 、和 `replace` 方法来修改布局，并设置恰当的 back 栈行为。当准备执行改变时，调用 `commit` 方法将事务添加到 UI 队列。

```java
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        
// 添加、删除或者替换Fragment
// 指定动画
// 如果需要的话，添加到back栈中
        
fragmentTransaction.commit();  
```

调用 `commit()` 后,事务并不会马上执行。它会在 `activity` 的 UI 线程（其实就是主线程）中等待直到线程能执行的时候才执行（废话）。如果必要，可以在 UI 线程中调用 `fragmentManager.executePendingTransactions()` 方法来立即执行事务。

## 添加、删除和替换 Fragment

添加一个新的 `UIFragment` 时，需要指定要添加的 `Fragment` 实例和将要放置它的容器 `View` 。另外，还可以为这个 `Fragment` 指定一个 `tag` 标识，后面通过这个标识，可以使用 `findFragmentByTag` 方法找到相应的 `Fragment` 。

```java
// 添加Fragment到容器View
fragmentTransaction.add(容器View的id, Fragment实例);
// 添加Fragment到容器View，并给Fragment指定tag
fragmentTransaction.add(容器View的id, Fragment实例, tag);  
```

查找 `Fragment` 通常可以通过 `FragmentManager` 的 `findFrafmentById` 或者 `findFragmentByTag` 方法来实现：

```java
Fragment fragment_id = fragmentManager.findFragmentById(fragment组件的id);
Fragment fragment_tag = fragmentManager.findFragmentByTag(Fragment实例的tag);
```

想要删除一个 `Fragment` ，首先需要找到对这个 `Fragment` 的引用，然后把找到的 `Fragment` 实例作为参数传给 `FragmentTransaction` 的 `remove` 方法。

```java
fragmentTransaction.remove(Fragment实例);
```

除了添加和删除操作外，还可以使用 `replace` 方法替换 `Fragment` ，指定要替换的 `Fragment` 的父容器的 `id`、一个新的 `Fragment` 和 `tag` 标识。

```java
// 替换容器View中的Fragment
fragmentTransaction.replace(容器View的id, Fragment实例);
// 替换容器View中的Fragment，并给新的Fragment指定tag
fragmentTransaction.replace(容器View的id, Fragment实例, tag);  
```

**注意：** 在添加、删除和替换操作之后，都需要调用 `fragmentTransaction.commit()` 方法提交事务

## Fragment back 栈的管理

假设现在我们有两个 `Fragment`：Fragment01 和 Fragment02，我们现在从 Fragment01 的界面跳到 Fragment02，然后按 Back 键，发现程序是直接退出了，而不是返回到 Fragment01。如果现在想实现以下功能：从 Fragment01 的界面跳到 Fragment02，然后按 Back 键，会返回到 Fragment01。这个功能该怎么实现呢？这其实就利用到了返回栈的知识。

其实很简单，`FragmentTransaction` 中提供了一个 `addToBackStack()` 方法，可以将一个事务添加到返回栈中。

```java
FragmentManager fragmentManager = getFragmentManager();
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        
// 添加、删除或者替换Fragment
// 指定动画
// 添加到back栈中，参数用于描述返回栈的状态，一般传null即可
fragmentTransaction.addToBackStack(null);
        
fragmentTransaction.commit();  
```

## 对 Fragment 设置切换动画

`FragmentTransaction` 类中定义了一些默认的动画，可以对任何 `FragmentTransaction` 使用 `setTransition` 方法，并传入一个 `FragmentTransaction.TRANSIT_*` 常量：

```java
fragmentTransaction.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN);  
```

也可以通过 `setCustomAnimations` 方法对 `FragmentTransaction` 设置自定义的动画：

```java
fragmentTransaction.setCustomAnimations(Fragment进入的动画资源id, Fragment退出的动画资源id);  
```