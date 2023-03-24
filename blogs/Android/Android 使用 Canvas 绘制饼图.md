---
title: Android 使用 Canvas 绘制饼图
date: 2016-01-18 09:26
tags:
 - Android
 - Canvas
 - 自定义 View
categories:
 - Android
---

## 效果预览

![绘制饼图](https://img-blog.csdn.net/20160118091054388)

嗯，一个很简单的饼图绘制。

## 用法

* 可以在xml文件中配置，也可以直接new一个实例出来。

```xml
<com.paoword.oa.view.SectorGraphView
        android:id="@+id/sector_graph"
        android:layout_width="120dp"
        android:layout_height="120dp" />
```

* 配置各区域的颜色和比例

```
mSectorGraph.setProportion(0.2f, 0.45f, 0.05f, 0.3f)
        .setColor(Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW)
        .draw();
```

* `setProportion()` 和 `setColor()` 的参数都是不定长参数，但是要注意两个方法的参数个数要相同，不然就抛异常。
* `setProportion()` 的参数为 0~1 的 `float` 类型，但是各参数值加到一起要等于 1，否则画出的饼图就不准确。

## 主代码

**SectorGraphView.java**

```java
package com.paoword.oa.view;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RectF;
import android.os.Build;
import android.util.AttributeSet;
import android.view.View;

/**
 * Created by shichaohui on 16/1/16.
 * <p>
 * 饼图
 */
public class SectorGraphView extends View {

    private int[] colors;
    private float[] proportions;

    private Paint mPaint;
    private Bitmap bitmap;
    private Canvas mCanvas;
    private RectF mRectf;

    private int startAngle = -90, endAngle = 270;
    private int[] colorStartAngles;

    public SectorGraphView(Context context) {
        super(context);
    }

    public SectorGraphView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public SectorGraphView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public SectorGraphView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    /**
     * 设置饼图每一块的颜色
     *
     * @param color 颜色
     */
    public SectorGraphView setColor(int... color) {
        colors = color.clone();
        return this;
    }

    /**
     * 设置饼图每一块的比例
     *
     * @param proportion 比例(0-1)
     */
    public SectorGraphView setProportion(float... proportion) {
        proportions = proportion.clone();
        return this;
    }

    /**
     * 绘制饼图
     */
    public void draw() {
        if (colors.length != proportions.length) {
            throw new IllegalArgumentException("color和proportion的数量不同!");
        } else {
            post(() -> {
                mPaint = new Paint();
                mPaint.setAntiAlias(true);

                mRectf = new RectF(0, 0, getWidth(), getHeight());

                colorStartAngles = new int[colors.length];
                colorStartAngles[0] = startAngle;
                for (int i = 1; i < colors.length; i++) {
                    colorStartAngles[i] = colorStartAngles[i - 1] + (int) (360 * proportions[i - 1]);
                }

                bitmap = Bitmap.createBitmap(getWidth(), getHeight(), Bitmap.Config.ARGB_8888);
                mCanvas = new Canvas(bitmap);

                logic();

            });
        }
    }

    private void logic() {
        new Thread(() -> {
            while (startAngle <= endAngle) {
                try {
                    Thread.sleep(2);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                for (int i = 0; i < colorStartAngles.length; i++) {
                    if (startAngle == colorStartAngles[i]) {
                        mPaint.setColor(colors[i]);
                    }
                }
                mCanvas.drawArc(mRectf, startAngle, 1, true, mPaint);
                postInvalidate();
                startAngle++;
            }
        }).start();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        if (mPaint == null) return;
        canvas.drawBitmap(bitmap, 0, 0, mPaint);
    }

}
```