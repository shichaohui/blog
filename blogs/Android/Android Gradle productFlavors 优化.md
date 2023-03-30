---
title: Android Gradle productFlavors 优化
date: 2019-07-08 17:55
tags:
 - Android
 - productFlavors
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容。</small>

平时的多渠道打包配置方式：

```groovy
android {
    ......
    productFlavors {
        flavorName1 {
            manifestPlaceholders.put("JPUSH_CHANNEL", "channel_1")
            buildConfigField("int", "fieldXxx", "1")
            ......
        }
        flavorName2 {
            manifestPlaceholders.put("JPUSH_CHANNEL", "channel_2")
            buildConfigField("int", "fieldXxx", "2")
            ......
        }
        .......
    }
}
```

这种方式没啥问题，只是写起来太烦了，一堆的重复代码，我不爽，我要封装一下：

```groovy
android {
    ......
    productFlavors {
        ext.flavor = { _flavor, _jPushChannel, _fieldXxx ->
            _flavor.manifestPlaceholders.put("JPUSH_CHANNEL", _jPushChannel)
            _flavor.buildConfigField("int", "fieldXxx", _fieldXxx)
        }
        flavorName1 {
            flavor(flavorName1, "channel_1", "1")
        }
        flavorName2 {
            flavor(flavorName2, "channel_2", "2")
        }
    }
}
```

封装完成，编译运行也没有问题。

但是每个渠道要写 3 行代码，写两遍渠道名，还是不爽，我要一行搞定：

```groovy
android {
    ......
    productFlavors {
        ext.flavor = { _flavor, _jPushChannel, _fieldXxx ->
            _flavor.manifestPlaceholders.put("JPUSH_CHANNEL", _jPushChannel)
            _flavor.buildConfigField("int", "fieldXxx", _fieldXxx)
        }
        flavor(flavorName1, "channel_1", "1")
        flavor(flavorName2, "channel_2", "2")
    }
}
```

完美~

配置越多，越能体现这种写法的优势。