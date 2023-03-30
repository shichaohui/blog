---
title: Android 中使用 lambda 表达式
date: 2015-10-10 17:34
tags:
 - Android
 - lambda
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

使用 `lambda` 可以大大简化代码：

[Java 8 的 lambda 表达式](http://www.oschina.net/question/12_59047)

[Lambda表达式详细总结](http://blog.csdn.net/wangboxian/article/details/41963205)

`Android` 中使用 `lambda` 需要 `java 8` 的支持，[下载地址](http://www.androiddevtools.cn/)

`Android Studio` 中使用 `lambda` 只需要在 `build.gradle` 文件中进行以下配置并 `rebuild` 即可：

* 根节点加入以下代码

```groovy
apply plugin: 'me.tatarka.retrolambda'

buildscript {
    repositories {
        mavenCentral()
    }

    dependencies {
        classpath 'me.tatarka:gradle-retrolambda:2.5.0'
    }
}

repositories {
    mavenCentral()
}
```

* `android` 节点中加入

```groovy
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}
```