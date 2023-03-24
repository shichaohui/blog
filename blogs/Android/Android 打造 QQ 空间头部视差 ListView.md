---
title: 打造 QQ 空间头部视差 ListView
date: 2015-07-31 14:36
tags:
 - Android
 - ListView
 - 自定义 View
categories:
 - Android
---

QQ 空间相信大家都用过，是否觉得它的下拉刷新很酷呢？今天就来自己实现这个控件。

本文主要是讲思想和一些 api，想要使用此效果到项目中的同学请点击这里 [带动画的下拉刷新RecyclerView](http://blog.csdn.net/u014165119/article/details/47321943)

### 效果图

![效果图](https://img-blog.csdn.net/20150731131924079)
	
对实现过程不感兴趣的童鞋可以直接到文章底部粘帖代码，代码中有详细注释。
	
要实现这样的效果，需要重写 `ListView` 控件，并在 `ListView` 中处理下拉事件。

首先我们进行 `ListView` 最基础的操作，就是设置适配器显示头部布局和一个列表出来，这些操作相信大家都会写，直接贴出代码：

### activity_main.xml

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.example.sch.headzoomlistviewdemo.HeadZoomListView
        android:id="@+id/list_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</RelativeLayout>
```

上面这个是 `Activity` 的内容布局，其中包含一个自定义的 `ListView` 控件 `com.example.sch.headzoomlistviewdemo.HeadZoomListView`。

### list_view_header.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <ImageView
        android:id="@+id/iv_hander"
        android:scaleType="centerCrop"
        android:layout_width="match_parent"
        android:layout_height="162dp"
        android:src="@mipmap/banner1" />

</RelativeLayout>
```

此布局做为 `ListView` 的头部，里面只包含一个 `ImageView`，可以看到给 `ImageView` 设置了 `android:scaleType="centerCrop"` 属性，表示按比例扩大此 `ImageView` 的图片资源的 size 并居中显示，使得图片长(宽)等于或大于 `View` 的长(宽) ，但是此属性只有在 `ImageView` 使用 `android:src=""` 属性或者 `setImageBitmap()` 或者 `setImageResource()` 方法设置图片时才有效，使用 `background` 设置背景是无效的。

`android:scaleType` 的各种值的含义可以参考 [ImageView.ScaleType设置图解](http://blog.csdn.net/larryl2003/article/details/6919513)

### MainActivity.java

```java
package com.example.sch.headzoomlistviewdemo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by shichaohui on 2015/7/31 0031.
 */
public class MainActivity extends AppCompatActivity {

    private HeadZoomListView mListView;
    private View headerView;
    private List<String> datas;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initData();

        mListView = (HeadZoomListView) this.findViewById(R.id.list_view);
        headerView = LayoutInflater.from(this).inflate(R.layout.list_view_header, null);

        mListView.addHeaderView(headerView);
        mListView.setAdapter(new ArrayAdapter<>(this,
                android.R.layout.simple_expandable_list_item_1, datas));

    }

    /**
     * 初始化数据
     */
    private void initData() {
        datas = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            datas.add("条目  " + (i + 1));
        }
    }

}
```

接着就是我们的重头戏 **自定义ListView** 了，首先回顾我们需要实现的效果：

* 在顶部继续下拉时头部拉伸；
* 拉伸之后手指上推减小拉伸高度；
* 拉伸时即时更改背景图的透明度；
* 松手后自动弹回原位置。

根据要实现的效果，我们可以推出需要的参数如下：

```java
private ImageView headerImage;
private int headerImageHeight = -1; // 默认高度
private int headerImageMaxHeight = -1; // 最大高度
private float scaleRatio = 1.5f; // 最大拉伸比例
private int headerImageScaleHeight = -1; // 被拉伸的高度
private float headerImageMinAlpha = 0.5f; // 拉伸到最高时头部的透明度
private long durationMillis = 1000; // 头部恢复动画的执行时间
```

由于 `ListView` 中并不能直接获取 `Header`，所以我们需要定义一个函数，由调用者传入头部的背景 `ImageView`，并计算相关属性：

```java
/**
 * 设置头部图片
 *
 * @param headerImage 头部中的背景ImageView
 */
public void setHeaderImage(ImageView headerImage) {
    this.headerImage = headerImage;
    headerImageHeight = headerImage.getHeight();
    headerImageMaxHeight = (int) (headerImageHeight * scaleRatio);
    // 防止第一次拉伸的时候headerImage.getLayoutParams().height = 0
    headerImage.getLayoutParams().height = headerImageHeight;
}
```

为了计算的准确性，我们需要在 `View` 显示出来后才调用 `setHeaderImage()`，因此需要重写 `MainActivity` 的 `onWindowFocusChanged()` 方法：

```java
@Override
public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    mListView.setHeaderImage((ImageView) headerView.findViewById(R.id.iv_hander));
}
```

为了增加扩展性，还增加以下几个方法：

```java
/**
 * 设置头部的最大拉伸倍率，默认1.5f
 *
 * @param scaleRatio 头部的最大拉伸倍率，必须大于1，小于1则默认为1.5f
 */
public void setScaleRatio(float scaleRatio) {
    this.scaleRatio = scaleRatio;
}

/**
 * 设置拉伸到最高时头部的透明度，默认0.5f
 *
 * @param headerImageMinAlpha 拉伸到最高时头部的透明度，0.0~1.0
 */
public void setHeaderImageMinAlpha(float headerImageMinAlpha) {
    this.headerImageMinAlpha = headerImageMinAlpha;
}

/**
 * 设置头部恢复动画的执行时间，默认1000毫秒
 *
 * @param durationMillis 头部恢复动画的执行时间，单位：毫秒
 */
public void setHeaderImageDurationMillis(long durationMillis) {
    this.durationMillis = durationMillis;
}
```

接下来重写 `ListView` 的 `overScrollBy()` 方法处理下拉/上拉过度事件：

```java
@Override
protected boolean overScrollBy(int deltaX, int deltaY, int scrollX, int scrollY,
                                   int scrollRangeX, int scrollRangeY, int maxOverScrollX,
                                   int maxOverScrollY, boolean isTouchEvent) {
    // deltaY为拉伸过度时每毫秒拉伸的距离，正数表示向上拉伸多度，负数表示向下拉伸过度
    if (deltaY < 0 && headerImage.getLayoutParams().height < headerImageMaxHeight
            || deltaY > 0 && headerImage.getLayoutParams().height > headerImageHeight) {
        // 修改宽高
        headerImage.getLayoutParams().height -= deltaY;
        // 重新设置View的宽高
        headerImage.requestLayout();
     }
     return true;
}
```

当 `ListView` 到达边界并继续拉的时候（这里称为"下拉/上拉过度"）就会触发此方法，其中参数 `deltaY` 表示每毫秒拉动的距离，下拉时此参数是负数，上拉过度时是正数。

因此，满足条件 `deltaY < 0 && headerImage.getLayoutParams().height < headerImageMaxHeight` （下拉且没有到达最大高度）的时候，需要增大 `headerImage` 的宽度，但是此时 `deltaY` 是负数，因此使用 `-=` 修改高度。条件 `deltaY > 0 && headerImage.getLayoutParams().height > headerImageHeight` 表示上拉过度且已被拉伸的时候，需要减小 `headerImage` 的宽度，但是此时 `deltaY` 是正数，因此也使用 `-=` 修改高度。

`headerImage.requestLayout();` 会重新测量 `View` 的宽高，不调用此方法上面的修改也就不会更新到界面上。

实现下拉一段高度后上推减小 `headerImage` 的拉伸高度效果，需要重写 `onScrollChanged()` 方法，重写 `onTouchEvent()` 也可以，只是太难控制，且效果不太好：

```java
@Override
protected void onScrollChanged(int l, int t, int oldl, int oldt) {
    super.onScrollChanged(l, t, oldl, oldt);

    if (headerImage == null) {
        return;
    }
    View view = (View) headerImage.getParent();
    // 上推的时候减小高度至默认高度
    if (view.getTop() < 0 && headerImage.getLayoutParams().height > headerImageHeight) {
        headerImage.getLayoutParams().height += view.getTop();
        // 重新计算尺寸布局
        view.layout(view.getLeft(), 0, view.getRight(), view.getBottom());
        headerImage.requestLayout();
    }

}
```

`view.layout(view.getLeft(), 0, view.getRight(), view.getBottom());` 遍历视图树，重新测量并设置头部的高度和子布局的位置。

重新测量的时候，`View` 使用 `requestLayout()` 方法，`ViewGroup` 使用 `layout()` 方法，`layout()` 方法中的四个参数前两个表示 `ViewGroup` 左上角坐标和右下角坐标。

接着实现松手时的动画：

```java
@Override
public boolean onTouchEvent(MotionEvent ev) {

    switch (ev.getAction()) {
        case MotionEvent.ACTION_UP:
        case MotionEvent.ACTION_CANCEL:
            if (headerImage.getLayoutParams().height > headerImageHeight) {  
			    // 使用动画恢复默认高度  
			    headerImage.clearAnimation();  
			    headerImage.startAnimation(new ResetAnimaton());  
			    return true;  
			}
    }

    return super.onTouchEvent(ev);
}
/**
 * 自定义恢复时的动画
 */
class ResetAnimaton extends Animation {

    public ResetAnimaton() {
        setDuration(durationMillis);
        // 计算开始动画时的拉伸高度
        headerImageScaleHeight = headerImage.getLayoutParams().height - headerImageHeight;
    }

    @Override
    protected void applyTransformation(float interpolatedTime, Transformation t) {
        // interpolatedTime从动画开始到结束，由0.0~1.0
        if (headerImage.getLayoutParams().height - headerImageHeight > 0) {
            // 计算新高度
            headerImage.getLayoutParams().height -= headerImageScaleHeight * interpolatedTime;
            // 计算新拉伸高度
            headerImageScaleHeight -= headerImageScaleHeight * interpolatedTime;
            // 重新布局
            headerImage.requestLayout();
        }
    }
}
```

最后加入拉伸时透明度的变化：

```java
@Override
protected void onScrollChanged(int l, int t, int oldl, int oldt) {
    super.onScrollChanged(l, t, oldl, oldt);

	...
    
    updateHeaderAlpha();

}

/**
 * 更新头部的透明度
 */
private void updateHeaderAlpha() {
    // 当前拉伸高度
    int scallHeight = headerImage.getLayoutParams().height - headerImageHeight;
    if (scallHeight > 0) {
        // 新的透明度(1 - 当前拉伸高度 / 最大拉伸高度 * (1 - 目标透明度))
        headerImage.setAlpha(1 - (float) scallHeight
                / (headerImageMaxHeight - headerImageHeight) * (1 - headerImageMinAlpha));
    }
}
```

### 贴完整代码

#### MainActivity.java

```java
package com.example.sch.headzoomlistviewdemo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by shichaohui on 2015/7/31 0031.
 */
public class MainActivity extends AppCompatActivity {

    private HeadZoomListView mListView;
    private View headerView;
    private List<String> datas;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initData();

        mListView = (HeadZoomListView) this.findViewById(R.id.list_view);
        headerView = LayoutInflater.from(this).inflate(R.layout.list_view_header, null);

        mListView.addHeaderView(headerView);
        mListView.setScaleRatio(2.0f);
        mListView.setHeaderImageDurationMillis(800);
        mListView.setHeaderImageMinAlpha(0.3f);
        mListView.setAdapter(new ArrayAdapter<>(this,
                android.R.layout.simple_expandable_list_item_1, datas));

    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        mListView.setHeaderImage((ImageView) headerView.findViewById(R.id.iv_hander));
    }

    /**
     * 初始化数据
     */
    private void initData() {
        datas = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            datas.add("条目  " + (i + 1));
        }
    }

}
```

#### HeadZoomListView.java

```java
package com.example.sch.headzoomlistviewdemo;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.Transformation;
import android.widget.ImageView;
import android.widget.ListView;

/**
 * 下拉头部缩放ListView
 * <br/>
 * Created by shichaohui on 2015/7/31 0031.
 */
public class HeadZoomListView extends ListView {

    private ImageView headerImage;
    private int headerImageHeight = -1; // 默认高度
    private int headerImageMaxHeight = -1; // 最大高度
    private int headerImageScaleHeight = -1; // 被拉伸的高度
    private float scaleRatio = 1.5f; // 最大拉伸比例
    private float headerImageMinAlpha = 0.5f; // 拉伸到最高时头部的透明度
    private long durationMillis = 1000; // 头部恢复动画的执行时间

    public HeadZoomListView(Context context) {
        super(context);
    }

    public HeadZoomListView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public HeadZoomListView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    /**
     * 设置头部图片
     *
     * @param headerImage 头部中的背景ImageView
     */
    public void setHeaderImage(ImageView headerImage) {
        this.headerImage = headerImage;
        headerImageHeight = headerImage.getHeight();
        headerImageMaxHeight = (int) (headerImageHeight * scaleRatio);
        // 防止第一次拉伸的时候headerImage.getLayoutParams().height = 0
        headerImage.getLayoutParams().height = headerImageHeight;
    }

    /**
     * 设置头部的最大拉伸倍率，默认1.5f
     *
     * @param scaleRatio 头部的最大拉伸倍率，必须大于1，小于1则默认为1.5f
     */
    public void setScaleRatio(float scaleRatio) {
        this.scaleRatio = scaleRatio;
    }

    /**
     * 设置拉伸到最高时头部的透明度，默认0.5f
     *
     * @param headerImageMinAlpha 拉伸到最高时头部的透明度，0.0~1.0
     */
    public void setHeaderImageMinAlpha(float headerImageMinAlpha) {
        this.headerImageMinAlpha = headerImageMinAlpha;
    }

    /**
     * 设置头部恢复动画的执行时间，默认1000毫秒
     *
     * @param durationMillis 头部恢复动画的执行时间，单位：毫秒
     */
    public void setHeaderImageDurationMillis(long durationMillis) {
        this.durationMillis = durationMillis;
    }

    @Override
    protected boolean overScrollBy(int deltaX, int deltaY, int scrollX, int scrollY,
                                   int scrollRangeX, int scrollRangeY, int maxOverScrollX,
                                   int maxOverScrollY, boolean isTouchEvent) {
        // deltaY为拉伸过度时每毫秒拉伸的距离，正数表示向上拉伸多度，负数表示向下拉伸过度
        if (deltaY < 0 && headerImage.getLayoutParams().height < headerImageMaxHeight
                || deltaY > 0 && headerImage.getLayoutParams().height > headerImageHeight) {
            // 修改宽高
            headerImage.getLayoutParams().height -= deltaY;
            // 重新设置View的宽高
            headerImage.requestLayout();
        }

        return true;
    }

    @Override
    protected void onScrollChanged(int l, int t, int oldl, int oldt) {
        super.onScrollChanged(l, t, oldl, oldt);

        if (headerImage == null) {
            return;
        }
        View view = (View) headerImage.getParent();
        // 上推的时候减小高度至默认高度
        if (view.getTop() < 0 && headerImage.getLayoutParams().height > headerImageHeight) {
            headerImage.getLayoutParams().height += view.getTop();
            // 重新计算尺寸布局
            view.layout(view.getLeft(), 0, view.getRight(), view.getBottom());
            headerImage.requestLayout();
        }

        updateHeaderAlpha();

    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {

        switch (ev.getAction()) {
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                if (headerImage.getLayoutParams().height > headerImageHeight) {  
				    // 使用动画恢复默认高度  
				    headerImage.clearAnimation();  
				    headerImage.startAnimation(new ResetAnimaton());  
				    return true;  
				}
        }

        return super.onTouchEvent(ev);
    }

    /**
     * 更新头部的透明度
     */
    private void updateHeaderAlpha() {
        // 当前拉伸高度
        int scallHeight = headerImage.getLayoutParams().height - headerImageHeight;
        if (scallHeight > 0) {
            // 新的透明度(1 - 当前拉伸高度 / 最大拉伸高度 * (1 - 目标透明度))
            headerImage.setAlpha(1 - (float) scallHeight
                    / (headerImageMaxHeight - headerImageHeight) * (1 - headerImageMinAlpha));
        }
    }

    /**
     * 自定义恢复时的动画
     */
    class ResetAnimaton extends Animation {

        public ResetAnimaton() {
            setDuration(durationMillis);
            // 计算开始动画时的拉伸高度
            headerImageScaleHeight = headerImage.getLayoutParams().height - headerImageHeight;
        }

        @Override
        protected void applyTransformation(float interpolatedTime, Transformation t) {
            // interpolatedTime从动画开始到结束，由0.0~1.0
            if (headerImage.getLayoutParams().height - headerImageHeight > 0) {
                // 计算新高度
                headerImage.getLayoutParams().height -= headerImageScaleHeight * interpolatedTime;
                // 计算新拉伸高度
                headerImageScaleHeight -= headerImageScaleHeight * interpolatedTime;
                // 重新布局
                headerImage.requestLayout();
            }
        }
    }

}
```

布局文件在文章开头有贴出，这里就不重复了。
