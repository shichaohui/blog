---
title: 使用 ViewFlipper 实现图片轮播
date: 2015-05-23 16:08
tags:
 - Android
 - ViewFlipper
 - 自定义 View
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容。</small>

ViewFlipper 和 AdapterViewFlipper 有较大的相似性，它们可以控制组件切换的动画效果。它们的区别是：ViewFlipper 需要通过 addView(View v) 方法或者在布局文件中添加多个 View，而 AdapterViewFlipper 只需要传入一个 Adapter，Adapter 将会负责提供多个 View。  ViewFlipper 不能手动滚动。

不多说，上代码

## 主布局（activity_main.xml）

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >
    <ViewFlipper
        android:id="@+id/vf_banner"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true" >
        <ImageView
            android:layout_width="match_parent"
            android:layout_height="300dp"
            android:src="#ff0000" />
        <ImageView
            android:layout_width="match_parent"
            android:layout_height="300dp"
            android:src="#00ff00" />
        <ImageView
            android:layout_width="match_parent"
            android:layout_height="300dp"
            android:src="#0000ff" />
    </ViewFlipper>
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_below="@id/vf_banner"
        android:layout_marginTop="20dp" >
        <Button
            android:id="@+id/btn_prev"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="上一个"
            android:textSize="14sp" />
        <Button
            android:id="@+id/btn_auto"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="自动播放"
            android:textSize="14sp" />
        <Button
            android:id="@+id/btn_stop"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="停止播放"
            android:textSize="14sp" />
        <Button
            android:id="@+id/btn_next"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="下一个"
            android:textSize="14sp" />
    </LinearLayout>
</RelativeLayout>  
```

## 图片切换时的各种动画

* 从左边进入的动画：push_left_in.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" >
    <translate
        android:duration="500"
        android:fromXDelta="-100%p"
        android:toXDelta="0" />
</set>  
```

* 从左边退出的动画：push_left_out.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" >
    <translate
        android:duration="500"
        android:fromXDelta="0"
        android:toXDelta="-100%p" />
</set>  
```

* 从右边进入的动画：push_right_in.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" >
    <translate
        android:duration="500"
        android:fromXDelta="100%p"
        android:toXDelta="0" />
</set>  
```

* 从右边退出的动画：push_right_out.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" >
    <translate
        android:duration="500"
        android:fromXDelta="0"
        android:toXDelta="100%p" />
</set>  
```

## 主 Activity（MainActivity.java）

```java
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ViewFlipper;

public class MainActivity extends Activity implements OnClickListener {

	private ViewFlipper vf_banner = null;
	private Button btn_prev = null;
	private Button btn_next = null;
	private Button btn_auto = null;
	private Button btn_stop = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		vf_banner = (ViewFlipper) findViewById(R.id.vf_banner);
		btn_prev = (Button) findViewById(R.id.btn_prev);
		btn_next = (Button) findViewById(R.id.btn_next);
		btn_auto = (Button) findViewById(R.id.btn_auto);
		btn_stop = (Button) findViewById(R.id.btn_stop);

		btn_prev.setOnClickListener(this);
		btn_next.setOnClickListener(this);
		btn_auto.setOnClickListener(this);
		btn_stop.setOnClickListener(this);
		
		vf_banner.setFlipInterval(3000); // 设置自动播放的时间间隔
		
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.btn_prev:
			vf_banner.setInAnimation(this, R.anim.push_right_in);
			vf_banner.setOutAnimation(this, R.anim.push_left_out);
			// 显示上一个View
			vf_banner.showPrevious();
			break;
			
		case R.id.btn_next:
			vf_banner.setInAnimation(this, R.anim.push_left_in);
			vf_banner.setOutAnimation(this, R.anim.push_right_out);
			// 显示下一个View
			vf_banner.showNext();
			break;
			
		case R.id.btn_auto:
			vf_banner.setInAnimation(this, R.anim.push_left_in);
			vf_banner.setOutAnimation(this, R.anim.push_right_out);
			// 自动播放
			vf_banner.startFlipping();
			break;
			
		case R.id.btn_stop:
			// 停止播放
			vf_banner.stopFlipping();
			break;

		default:
			break;
		}
	}

}
```