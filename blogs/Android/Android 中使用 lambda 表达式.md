---
title: Android 中使用 lambda 表达式
date: 2015-10-10 17:34
tags:
 - Android
 - lambda
categories:
 - Android
---

# Android 中使用 lambda 表达式

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2015-10-10 17:34</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2015-10-10 17:34</span>
</div>
<br/>

使用 `lambda` 可以大大简化代码：

http://www.oschina.net/question/12_59047

http://blog.csdn.net/wangboxian/article/details/41963205

`Android` 中使用 `lambda` 需要 `java 8` 的支持，下载地址：http://www.androiddevtools.cn/

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