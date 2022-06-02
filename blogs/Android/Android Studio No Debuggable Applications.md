---
title: Android Studio No Debuggable Applications
date: 2016-05-03 17:01
tags:
 - Android
 - Android Studio
categories:
 - Android
---

# Android Studio No Debuggable Applications

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2016-05-03 17:01</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2016-05-03 17:01</span>
</div>
<br/>

今天换了台手机进行测试，但是手机连上之后却不能选择要输出 log 的应用（选应用的位置显示 `No Debuggable Applications`），导致 `logcat` 中不断打印出一行行 log，而从这茫茫 log 中找出自己需要的 log 是恨痛苦的，咋办咧？Google 呗。  

通过谷歌发现，大家解决此问题的方式大都是这样：

> 从` Android Studio` 的工具栏依次选择 `Tools` -> `Android` ->` Enable ADB Integration`。 如果 `Enable ADB Integration` 已经被选中，则先取消选中再重新选中。然后就不会出现 `No Debuggable Applications` 的提示了，可以选择显示指定 app 的 log 了。

既然大家都这么写，那么这种方式应该是能解决问题的。

然并卵... 我不断的重复上述步骤并重启 `Android Studio`，它并不能解决我的问题。继续 Google 了发现了[这篇文章](http://blog.csdn.net/liang9zi/article/details/41958897)，它通过在 `app/build.gradle` 中添加 `debuggable true` 解决问题：

```groovy
android {

    ...

    buildTypes {
        release {
            debuggable true
        }
    }
}
```

看到这里我突然想起来，我设置的是运行时自动运行 `release` 的包，赶紧尝试了一下，果然解决了问题。

估计第一种方式只对 `debug` 包有用，如果要调试 `release` 包，要使用第二种方法。当然，第二种方法有一个前提就是 `Enable ADB Integration` 要打开，也就是第一种方法的步骤要先执行一遍。