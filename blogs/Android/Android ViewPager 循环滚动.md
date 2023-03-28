---
title: ViewPager 循环滚动
date: 2015-06-11 15:47
tags:
 - Android
 - ViewPager
categories:
 - Android
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

这个功能其实很简单，看代码。

先定义一个 `View` 的集合和一个 `View` 里面显示图片的 id 的数组，都用集合也可以。

```java
private List<View> viewList = new ArrayList<View>();
private int[] ids = { R.drawable.pic_1, R.drawable.pic_2, R.drawable.pic_3 };
```

接着创建 `View`。

```java
private void createView() {
	// 创建一个跟最后一个一样的放在前面
	viewList.add(createImageView(ids[ids.length - 1]));
	for (int i = 0; i < ids.length; i++) {
		viewList.add(createImageView(ids[i]));
	}
	// 创建一个跟第一个一样的放在后面
	viewList.add(createImageView(ids[0]));
}
```

多生成两个辅助的 `View`，这样的一个 `View` 集合使用 `ViewPage` 显示之后，图片 1 往回滚动就会显示图片3，图片 3 正常滚动就会显示图片 1。

看起来是不是循环了呢？有人想说：你这不是瞎比比么，这样图片 3 滚到图片 1 再继续滚不还是动不了了吗？这样的问题当然要解决了，不然就不叫循环了。

```java
OnPageChangeListener myOnPageChangeListener = new OnPageChangeListener() {

	@Override
	public void onPageSelected(int arg0) {
	}

	@Override
	public void onPageScrolled(int arg0, float arg1, int arg2) {
		// 无限循环滑动
		if (ids.length > 1) {// 多于一个view才会循环跳转
			if (arg0 == 0 && arg2 == 0) {
				// 切换循环更加流畅，不会出现生硬的切换感觉
				arg0 = ids.length;
				viewpager.setCurrentItem(arg0, false);
			} else if (arg0 > ids.length) {
				viewpager.setCurrentItem(1, false);
			}
		}
	}

	@Override
	public void onPageScrollStateChanged(int arg0) {
	}
};
```

把这个监听实例设置给 `ViewPage` 实例就好啦。

`setCurrentItem(arg0, false);` `false` 表示无动画滚动，就是直接改变正在显示的 `View`。
所以... 看出来了吧，到了最后一个的时候立刻无动画进入第一个，由于第一个和最后一个是一模一样的，所以看起来就像直接从最后一个有动画进入了第一个，就是循环啦。

下面贴出一份完整的代码

**布局文件：**

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <android.support.v4.view.ViewPager
        android:id="@+id/view_pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

**Java代码：**

```java
import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

public class MainActivity extends Activity {

	private ViewPager viewpager = null;
	private List<View> viewList = new ArrayList<View>();
	private int[] ids = { R.drawable.pic_1, R.drawable.pic_2, R.drawable.pic_3 };

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		init();
		initViewPagerData();
	}

	private void init() {
		// 初始化界面
		viewpager = (ViewPager) findViewById(R.id.view_pager);
		// 添加事件
		viewpager.setOnPageChangeListener(myOnPageChangeListener);
	}

	private void initViewPagerData() {
		
		createView();

		viewpager.setAdapter(pagerAdapter);
		viewpager.setCurrentItem(1, false);
	}

	private void createView() {
		// 创建一个跟最后一个一样的放在前面
		viewList.add(createImageView(ids[ids.length - 1]));
		for (int i = 0; i < ids.length; i++) {
			viewList.add(createImageView(ids[i]));
		}
		// 创建一个跟第一个一样的放在后面
		viewList.add(createImageView(ids[0]));
	}

	private ImageView createImageView(int id) {
		ImageView view = new ImageView(this);
		view.setBackgroundResource(id);
		return view;
	}

	OnPageChangeListener myOnPageChangeListener = new OnPageChangeListener() {

		@Override
		public void onPageSelected(int arg0) {
		}

		@Override
		public void onPageScrolled(int arg0, float arg1, int arg2) {
			// 无限循环滑动
			if (ids.length > 1) {// 多于一个view才会循环跳转
				if (arg0 == 0 && arg2 == 0) {
					// 切换循环更加流畅，不会出现生硬的切换感觉
					arg0 = ids.length;
					viewpager.setCurrentItem(arg0, false);
				} else if (arg0 > ids.length) {
					viewpager.setCurrentItem(1, false);
				}
			}
		}

		@Override
		public void onPageScrollStateChanged(int arg0) {
		}
	};

	PagerAdapter pagerAdapter = new PagerAdapter() {

		@Override
		public boolean isViewFromObject(View arg0, Object arg1) {
			return arg0 == arg1;
		}

		@Override
		public int getCount() {
			return viewList.size();
		}

		public Object instantiateItem(ViewGroup container, int position) {
			((ViewPager) container).addView(viewList.get(position));
			return viewList.get(position);
		};

		public void destroyItem(ViewGroup container, int position, Object object) {
			((ViewPager) container).removeView(viewList.get(position));
		};

	};

}
```