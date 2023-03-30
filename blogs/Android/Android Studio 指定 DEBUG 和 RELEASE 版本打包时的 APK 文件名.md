---
title: Android Studio 指定 DEBUG 和 RELEASE 版本打包时的 APK 文件名
date: 2016-03-17 10:18
tags:
 - Android
 - Android Studio
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容。</small>

`build.gradle`文件的代码片段：

```groovy
android {

    ......

    //打包后应用名称
    applicationVariants.all { variant ->
        variant.outputs.each { output ->
            def outputFile = output.outputFile
            def fileName
            if (outputFile != null && outputFile.name.endsWith('.apk')) {
                if (variant.buildType.name.equals('release')) {
                    fileName = "XXX_v${defaultConfig.versionName}.apk"
                } else if (variant.buildType.name.equals('debug')) {
                    fileName = "XXX_v${defaultConfig.versionName}_debug.apk"
                }
                output.outputFile = new File(outputFile.parent, fileName)
            }
        }
    }
}
```