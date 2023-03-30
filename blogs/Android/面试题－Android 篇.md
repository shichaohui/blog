---
title: 面试题－Android 篇
date: 2015-11-18 16:05
tags:
 - Android
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容。</small>

最近得空，就去一些招聘网站做了些面试题，为方便大家共同学习，`Android` 相关的就在这篇博客里记录一下，以后有空会持续更新，大家有更好的答案也可以留言告诉我。

[面试题－Java算法篇 传送门](http://blog.csdn.net/u014165119/article/details/49908451)

[面试题－Java API篇 传送门](http://blog.csdn.net/u014165119/article/details/49910119)

### 1. Android 中五种数据存储方式分别是什么？详细说下他们的特点？

* 使用 `SharedPreferences` 存储数

`SharedPreferences` 是 `Android` 平台上一个轻量级的存储类，它的本质是基于 `XML` 文件存储 `key-value` 键值对数据，通常用来存储一些简单的配置信息，它提供了基础类型（如 `int`，`long`）和 `String` 的保存，`SharedPreferences` 对象本身只能获取数据而不支持存储和修改，存储修改是通过 `Editor` 对象实现。

* 文件存储数据

关于文件存储，`Activity` 提供了 `openFileOutput()` 方法可以用于把数据输出到文件中，具体的实现过程与在 `J2SE` 环境中保存数据到文件中是一样的。

文件可用来存放大量数据，如文本、图片、音频等。

使用文件存储数据可以将数据保存在 SD 卡，以减少手机内存的占用，访问 SD 卡中需要以下权限：

```xml
<!-- 在SDCard中创建与删除文件权限 -->
<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
<!-- 往SDCard写入数据权限 -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/> 
```

* SQLite 数据库存储数据

`SQLite` 是轻量级嵌入式数据库引擎，它支持 `SQL` 语言，并且只利用很少的内存就有很好的性能。此外它还是开源的，任何人都可以使用它。`SQLite` 通过利用虚拟机和虚拟数据库引擎（`VDBE`），使调试、修改和扩展 `SQLite` 的内核变得更加方便。

Android提供了一个名为 `SQLiteDatabase` 的类，该类封装了一些操作数据库的 `API`，使用该类可以完成对数据进行添加（`Create`）、查询（`Retrieve`）、更新（`Update`）和删除（`Delete`）操作（这些操作简称为 `CRUD`）。

* 使用 `ContentProvider` 存储数据

`ContentProvider` 是所有应用程序之间数据存储和检索的一个桥梁，它的作用就是使得各个应用程序之间实现数据共享。`Android` 为常见的一些数据提供了 `ContentProvider`（包括音频、视频、图片和通讯录）。

每个 `Content Providers` 都会对外提供一个公共的 `URI`（包装成 `Uri` 对象），如果应用程序有数据需要共享时，就需要使用 `Content Providers` 为这些数据定义一个 `URI`，然后其他的应用程序就可以通过 `Content Providers`传入这个 `URI` 来对数据进行操作。`URI` 由 3 个部分组成: `content://`、数据的路径、标识 ID（可选）。

* 网络存储数据

前面介绍的几种存储都是将数据存储在本地设备上，除此之外，还可以通过网络来实现数据的存储和获取，我们可以调用 `WebService` 返回的数据或是解析 `HTTP` 协议实现网络数据交互。

访问网络需要添加以下权限：

```xml
<uses-permission android:name="android.permission.INTERNET" />  
```

### 2. SharedPreferences 与 SQLite 数据库的区别

见题1

### 3. 什么是ANR如何避免它

`ANR`（Application Not Responding），意思是应用没有响应。`

`Android` 通常会在如下情况报出 `ANR` 错误：

* 主线程（事件处理线程 / UI 线程） 在 5 秒内没有响应输入事件
* `BroadcastReceiver` 没有在 10 秒内完成返回

因此，为了避免 `ANR`，不要在主线程执行耗时操作，如访问网络（Android4.0以上版本在主线程访问网络会直接报出异常 `NetworkOnMainThreadException`）、数据库存储等，这些耗时的操作可以新开一个线程去执行，如果要在新线程中处理 UI，可以使用 `Handler`。

### 4. android 中的动画有哪几类，它们的特点和区别是什么？ 

* 补间动画

补间动画有四种：位移动画（`TranslateAnimation`）、旋转动画（`RotateAnimation`）、透明度渐变动画（`AlphaAnimation`）、缩放动画（`ScaleAnimation`）。

使用补间动画时只需要指定动画的开始状态和结束状态，`Android` 会自动计算中间的动画效果并完成动画。

* 逐帧动画

逐帧动画使用多张图片作为一个动画的帧，并通过一定顺序播放这些帧以形成动画。

* 属性动画

属性动画是 Android3.0 新增的动画，目的是弥补补间动画的不足，并提高动画的扩展性，这里有个不错的系列博客，我就不多扯了。

[Android属性动画完全解析(上)，初识属性动画的基本用法](http://blog.csdn.net/guolin_blog/article/details/43536355)

[Android属性动画完全解析(中)，ValueAnimator和ObjectAnimator的高级用法](http://blog.csdn.net/guolin_blog/article/details/43816093)

[Android属性动画完全解析(下)，Interpolator和ViewPropertyAnimator的用法](http://blog.csdn.net/guolin_blog/article/details/44171115)

### 5. res/raw 与 assets 目录的区别 

相同点：两者目录下的文件在打包后会原封不动的保存在 apk 包中，不会被编译成二进制。

不同点：

* `res/raw` 中的文件会被映射到 `R.java` 文件中，访问的时候直接使用资源 ID 即 `R.id.filename`；`assets` 文件夹下的文件不会被映射到 `R.java` 中，访问的时候需要 `AssetManager` 类。
* `res/raw` 不可以有目录结构，而 `assets` 则可以有目录结构，也就是 `assets` 目录下可以再建立文件夹。

### 6. 简述 Handler 机制原理 

`Handler` 是一个消息分发对象，而消息分发，有赖于消息循环（`Looper`），每一个线程中最多有一个 `Looper`（子线程如果没有创建 `Looper`，将会使用主线程的 `Looper`，主线程在创建时自动创建一个 `Looper`），`Looper` 阻塞线程，等待消息构成循环，有了消息，分配到对应的 `Handler`，让他进一步分发处理。

### 7. 说说 View 的刷新机制

在 `Android` 的布局体系中，父 `View` 负责刷新、布局显示子 `View`；而当子 `View` 需要刷新时，则是通知父 `View` 来完成。

### 8. Activity 和 Task 的启动模式有哪些?每种含义是什么?

* `standard`：默认的启动模式，每次激活 `Activity` 时（`startActivity`），都创建 `Activity` 实例，并放入任务栈。
* `singleTop`：如果某个 `Activity` 自己激活自己，即任务栈栈顶就是该 `Activity`，则不需要创建，其余情况都要创建 `Activity` 实例；
* `singleInstance`：如果应用 1 的任务栈中创建了 `MainActivity` 实例，如果应用 2 也要激活 `MainActivity`，则不需要创建，两应用共享该 `Activity` 实例；
* `singleTask`：如果要激活的那个 `Activity` 在任务栈中存在该实例，则不需要创建，只需要把此 `Activity` 放入栈顶，并把该 `Activity` 以上的 `Activity` 实例都 `pop`；

详见：[Activity的四种启动模式](http://blog.csdn.net/zapzqc/article/details/8493481)

`SingTask` 的可以用来退出整个应用：将主 `Activity` 设为 `SingTask` 模式，然后在要退出的 `Activity` 中转到主 `Activity`，然后重写主 `Activity` 的 `onNewIntent` 函数，并在函数中加上一句 `finish` 即可。