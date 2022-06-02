---
title: 带头尾和动画的下拉刷新 RecyclerView
date: 2015-08-06 19:52
tags:
 - Android
 - RecyclerView
 - 自定义 View
categories:
 - Android
---

# 带头尾和动画的下拉刷新 RecyclerView

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2015-08-06 19:52</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2015-08-06 19:52</span>
</div>
<br/>

项目地址：https://github.com/shichaohui/AnimRefreshRecyclerView

项目中包含一个demo（普通 `Android` 工程）和 `Android Library`，感兴趣的同学可以自己下载源码和 Demo。

感谢[bingaicao1](http://blog.csdn.net/bingaicao1)提供的帮助。

效果预览，嗯...看起来有点卡，截图软件的问题：

![带动画的下拉刷新RecyclerView](https://img-blog.csdnimg.cn/img_convert/8846a50682d278a90abff04909803006.gif)

**上图中演示了三种不同的布局和下拉效果，三种布局和三种下拉效果可以通过 Header 的设置任意组合。**

图中普通列表是 `ListView` 样式，没有设置 `Header` 和 `Footer`，使用默认的下拉刷新和上拉加载。

宫格列表使用的是自定义 `Header` 和 `Footer` 的下拉刷新和上拉上拉加载，并设置了下拉使放大的图片。

瀑布流列表使用的是自定义 `Header` 和 `Footer` 的下拉刷新和上拉上拉加载，没有设置了下拉使放大的图片，使用默认的刷新动画。

## 引入

Gradle:

```xml
dependencies {
    compile 'com.android.support:recyclerview-v7:23.1.0'
    compile 'com.sch.rfview:AnimRefreshRecyclerView:1.0.6@aar'
}
```

`Eclipse` 的同学们可以自己下载源码拷贝 `java` 文件到自己的工程（别忘了引用 `RecyclerView` 的包哦）。

代码中的配置参考下面的用法代码片段，除了 `RecyclerView` 自带的方法，其他方法都是可选的。

## 根据列表的不同效果选择不同的布局管理器

```java
// 使用重写后的线性布局管理器
mRecyclerView.setLayoutManager(new AnimRFLinearLayoutManager(this));

// 使用重写后的格子布局管理器
mRecyclerView.setLayoutManager(new AnimRFGridLayoutManager(this, 2));

// 使用重写后的瀑布流布局管理器
mRecyclerView.setLayoutManager(new AnimRFStaggeredGridLayoutManager(3, StaggeredGridLayoutManager.VERTICAL));
```

## 根据不同的布局管理器设置分割线

```java
// 设置列表布局的分割线
mRecyclerView.addItemDecoration(new DividerItemDecoration(context,
        mAnimRFLinearLayoutManager.getOrientation(), true));

// 设置网格或者瀑布流布局的分割线
mRecyclerView.addItemDecoration(new DividerGridItemDecoration(context, true));
```

## 设置Header和Footer

```java
// 头部
headerView = LayoutInflater.from(this).inflate(R.layout.header_view, null);
// 脚部
footerView = LayoutInflater.from(this).inflate(R.layout.footer_view, null);

// 添加头部和脚部，如果不添加就使用默认的头部和脚部（头部可以有多个）
mRecyclerView.addHeaderView(headerView);
// 设置头部的最大拉伸倍率，默认1.5f，必须写在setHeaderImage()之前
mRecyclerView.setScaleRatio(2.0f);
// 设置下拉时拉伸的图片，不设置就使用默认的
mRecyclerView.setHeaderImage((ImageView) headerView.findViewById(R.id.iv_hander));
mRecyclerView.addFootView(footerView);
```
可以通过`addHeaderView()`和`setHeaderImage()`方法任意组合下拉效果，可以调用多次`addHeaderView()`方法添加多个头部，但是`setHeaderImage()`方法最多被调用一次。
最多调用一次`addFootView()`方法，即最多设置一个FooterView。

## 其他设置

```java
// 设置刷新动画的颜色（可选）
mRecyclerView.setColor(Color.RED, Color.WHITE);
// 设置头部恢复动画的执行时间，默认500毫秒（可选）
mRecyclerView.setHeaderImageDurationMillis(1200);
// 设置拉伸到最高时头部的透明度，默认0.5f（可选）
mRecyclerView.setHeaderImageMinAlpha(0.6f);

// 设置适配器
mRecyclerView.setAdapter(new MyAdapter());

// 设置刷新和加载更多数据的监听，分别在onRefresh()和onLoadMore()方法中执行刷新和加载更多操作
mRecyclerView.setLoadDataListener(new AnimRFRecyclerView.LoadDataListener() {
    @Override
    public void onRefresh() {
	    // 开启线程刷新数据
        new Thread(new MyRunnable()).start();
    }

    @Override
    public void onLoadMore() {
	    // 开启线加载更多数据
        new Thread(new MyRunnable()).start();
    }
});
```

## 手动刷新

如果想第一次进入界面时就显示加载数据的动画，需要使用手动刷新的方法。此方法需要在其他设置完成后调用,具体使用可以[看这里](https://github.com/shichaohui/AnimRefreshRecyclerView/blob/master/app/src/main/java/com/sch/rfview/example/fragment/LinearFragment.java)

```java
mRecyclerView.setRefresh(true);
```

## 在刷新和加载过更多完成之后调用代码停止动画

```java
// 刷新完成后调用，必须在UI线程中
mRecyclerView.refreshComplate();

// 加载更多完成后调用，必须在UI线程中
mRecyclerView.loadMoreComplate();
```

## 禁止刷新

如果不想使用自带的刷新效果，而想要使用 `SwipRefreshLayout` 做刷新，可使用以下代码禁止自带的刷新效果

```
mRecyclerView.setRefreshEnable(false);
```

**Tips：**

* 若在使用过程中发现 `adapter.notifyDataSetChange()` 等更新数据的方法无效，可使用 `recyclerView.getAdapter()` 获取当前使用的 `Adapter`，并使用获取到到 `Adapter` 更新数据。
