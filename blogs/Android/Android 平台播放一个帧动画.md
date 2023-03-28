---
title: Android 平台播放一个帧动画
date: 2015-07-11 13:11
tags:
 - Android
 - Animation
 - 动画
categories:
 - Android
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

众所周知，`Android` 中动画分为两种，一是 `Tween` 动画，主要通过 `ObjectAnimation`（如 `TranslateAnimation` ）实现，可实现平移、旋转、缩放、淡入淡出等动画效果；还有一种是 `Frame` 动画，即帧动画，通过不播放连续的图片实现。本博客为大家讲解Frame动画的实现。

帧动画具有非常大的灵活性，几乎可以表现任何想表现的内容，而它类似与电影的播放模式，很适合于表演细腻的动画。

实现帧动画 `AnimationDrawable` 类的支持，它是 `Drawable` 类的间接子类。这个类主要有一下几种方法：

* `public void start()` ：开始播放逐帧动画。
* `public void stop()` ：停止播放逐帧动画。
* `public void addFrame(Drawable frame,int duration)` ：为 `AnimationDrawable` 添加一帧，并设置持续时间。
* `public int getDuration(int i)` ：得到指定 `index` 的帧的持续时间。
* `public Drawable getFrame(int index)` ：得到指定 `index` 的帧 `Drawable`。
* `public int getNumberOfFrames()` ：得到当前 `AnimationDrawable` 的所有帧数量。
* `public boolean isOneShot()` ：当前 `AnimationDrawable` 是否执行一次，返回 `true` 执行一次，`false` 循环播放。
* `public boolean isRunning()` ：当前 `AnimationDrawable` 是否正在播放。
* `public void setOneShot(boolean oneShot)` ：设置 `AnimationDrawable` 是否执行一次，`true` 执行一次，`false` 循环播放。

要获得一个帧动画可以通过 `xml` 文件和代码编写两种方式，下面贴出一个使用两种方式实现帧动画的小程序。

程序效果图：

![帧动画效果](https://img-blog.csdn.net/20150711130119461)

**MainActivity.java:**

```java
import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private ImageView imgView = null; // 播放动画的View
    private AnimationDrawable animDrawable = null; // 动画图片

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 设置点击事件
        findViewById(R.id.btn_use_xml).setOnClickListener(this);
        findViewById(R.id.btn_use_code).setOnClickListener(this);
        findViewById(R.id.btn_start_forever).setOnClickListener(this);
        findViewById(R.id.btn_stop).setOnClickListener(this);

        imgView = (ImageView) findViewById(R.id.img_view);

    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_use_xml:
                imgView.setBackgroundResource(R.drawable.frame_anim);
                animDrawable = (AnimationDrawable) imgView.getBackground();
                break;
            case R.id.btn_use_code:
                createAnimDrawable();
                imgView.setBackgroundDrawable(animDrawable);
                break;
            case R.id.btn_start_forever:
                // 设置动画次数为一次
                // animDrawable.setOneShot(true);
                // 设置动画次数为非一次，即不断循环
                animDrawable.setOneShot(false);
                animDrawable.start();
                break;
            case R.id.btn_stop:
                animDrawable.stop();
                break;
            default:
                break;
        }
    }

    // 代码创建帧动画
    private void createAnimDrawable() {
        animDrawable = new AnimationDrawable();
        animDrawable.addFrame(getResources().getDrawable(R.mipmap.utsing1), 50);
        animDrawable.addFrame(getResources().getDrawable(R.mipmap.utsing2), 50);
        animDrawable.addFrame(getResources().getDrawable(R.mipmap.utsing3), 50);
        animDrawable.addFrame(getResources().getDrawable(R.mipmap.utsing4), 50);
        animDrawable.addFrame(getResources().getDrawable(R.mipmap.utsing5), 50);
        animDrawable.addFrame(getResources().getDrawable(R.mipmap.utsing6), 50);
        animDrawable.addFrame(getResources().getDrawable(R.mipmap.utsing7), 50);
        animDrawable.addFrame(getResources().getDrawable(R.mipmap.utsing8), 50);
        animDrawable.addFrame(getResources().getDrawable(R.mipmap.utsing9), 50);
    }

}
```

**activity_main.xml**

包含两个切换设置动画形式的按钮、播放/暂停按钮和一个用来显示动画的 `ImageView` 。

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp">

    <LinearLayout
        android:id="@+id/ll1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <Button
            android:id="@+id/btn_use_xml"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="使用xml设置动画" />

        <Button
            android:id="@+id/btn_use_code"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="使用代码设置动画" />
    </LinearLayout>

    <LinearLayout
        android:id="@+id/ll2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/ll1">

        <Button
            android:id="@+id/btn_start_forever"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="开始" />

        <Button
            android:id="@+id/btn_stop"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="停止" />

    </LinearLayout>

    <ImageView
        android:id="@+id/img_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/ll2"
        android:layout_centerHorizontal="true" />

</RelativeLayout>
```

**frame_anim.xml**

实现帧动画的 `xml` 文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<animation-list xmlns:android="http://schemas.android.com/apk/res/android" >
    <item android:drawable="@mipmap/movie_1" android:duration="50" />
    <item android:drawable="@mipmap/movie_2" android:duration="50" />
    <item android:drawable="@mipmap/movie_3" android:duration="50" />
    <item android:drawable="@mipmap/movie_4" android:duration="50" />
</animation-list>
```