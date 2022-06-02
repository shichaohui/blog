---
title: Android Studio 指定 DEBUG 和 RELEASE 版本打包时的 APK 文件名
date: 2016-03-17 10:18
tags:
 - Android
 - Android Studio
categories:
 - Android
---

# Android Studio 指定 DEBUG 和 RELEASE 版本打包时的APK文件名

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2016-03-17 10:18</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2016-03-17 10:18</span>
</div>
<br/>

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