---
title: 面试题－Java API 篇
date: 2015-11-18 17:23
tags:
 - Java
categories:
 - Java
---

# 面试题－Java API 篇

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2015-11-18 17:23</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2015-11-18 17:23</span>
</div>
<br/>

最近得空，就去一些招聘网站做了些面试题，为方便大家共同学习，`Java API` 相关的就在这篇博客里记录一下，以后有空会持续更新，大家有更好的答案也可以留言告诉我。

[面试题－Java算法篇 传送门](http://blog.csdn.net/u014165119/article/details/49908451)

[面试题－Android篇 传送门](http://blog.csdn.net/u014165119/article/details/49908549)

## 1. HashMap 和 Hashtable 的区别 

* `Hashtable` 继承自 `Dictiionary` 而 `HashMap` 继承自 `AbstractMap`。
* `HashMap` 允许将 `null` 作为一个 `entry` 的 `key` 或者 `value`，而 `Hashtable` 不允许。
* `Hashtable` 使用 `contains` 方法去查看是否包含某一对象，`HashMap` 使用 `containsvalue` 和 `containsKey`。
* 最大的不同是，`Hashtable` 的方法是 `Synchronize` 的，而 `HashMap` 不是，在多个线程访问 `Hashtable` 时，不需要自己为它的方法实现同步，而 `HashMap` 就必须为之提供外同步（`Collections.synchronizedMap`）。 

## 2. Collection 和 Collections 的区别 

`Collection` 是一个集合接口。它提供了对集合对象进行基本操作的通用接口方法。`Collection` 接口在 `Java` 类库中有很多具体的实现。`Collection` 接口的意义是为各种具体的集合提供了最大化的统一操作方式；

`Collections` 是一个包装类。它包含有各种有关集合操作的静态多态方法。此类不能实例化，就像一个工具类，服务于 `Java` 的 `Collection` 框架。

## 3. sleep() 和 wait() 有什么区别? 

`sleep()` 方法是属于 `Thread` 类中的。而 `wait()` 方法是属于 `Object` 类中的。

`sleep()` 方法导致了程序暂停执行指定的时间，让出 `cpu` 该其他线程，但是他的监控状态依然保持者，当指定的时间到了又会自动恢复运行状态。在调用 `sleep()` 方法的过程中，线程不会释放对象锁。

而当调用 `wait()` 方法的时候，线程会放弃对象锁，进入等待此对象的等待锁定池，只有针对此对象调用 `notify()` 方法后本线程才进入对象锁定池准备获取对象锁进入运行状态。