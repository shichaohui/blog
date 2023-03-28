---
title: 可添加 Header 可下拉刷新的 RecyclerView
date: 2016-01-28 20:13
tags:
 - Android
 - RecyclerView
 - 自定义 View
categories:
 - Android
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

下拉刷新的 `RecyclerView`，兼有上拉加载更多、添加头部、定制脚部功能，下拉刷新使用 `SwipeRefreshLayout`。

[代码在这](https://github.com/shichaohui/RefreshRecyclerView)

效果图

![效果图](https://img-blog.csdn.net/20160128223854806)

## 用法

不想看我啰嗦的直接看[MainActivity.java](https://github.com/shichaohui/RefreshRecyclerView/blob/master/MainActivity.java)

### 添加 Header 和 Footer

`Footer` 有默认的，就是效果图上的那个，当然也可以使用以下方法定制 `Footer`。

```java
refreshView.setHeader(R.layout.header); // 添加布局作为Header
refreshView.setHeader(view); // 添加View作为Header

refreshView.setFooter(R.layout.footer); // 添加布局作为Footer
refreshView.setFooter(view); // 添加view作为Footer
```

### 刷新和加载更多

设置监听：

```java
// 设置刷新监听
refreshView.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
    @Override
    public void onRefresh() {
          
        ... // 可以在这里执行数据的刷新
          
    }
});
// 设置加载更多监听
refreshView.setOnLoadMoreListener(new RefreshRecycleView.OnLoadMoreListener() {
    @Override
    public void onLoadMore() {
         
        ... // 可以在这里执行加载更多数据
         
    }
});
```

刷新完成后取消刷新动画：

```java
refreshView.setRefreshing(false);
```

打开和关闭可加载更多状态：

```java
refreshView.setLoadMoreEnable(false); // 不可再加载更多, 可以在没有更多数据时使用
refreshView.setLoadMoreEnable(true); // 打开加载更多
```

### 适配器

`RefreshRecyclerView.RefreshAdapter` 是对 `Header`、`Footer` 等功能的支持，所以定制自己的适配器时要继承 `RefreshRecyclerView.RefreshAdapter`，而不是继承 `RecyclerView.Adapter` 了。

`RefreshRecyclerView.RefreshAdapter` 提供了两个抽象方法用来绑定视图和数据：

```java
/**
 * 创建ViewHolder, 用来代替onCreateViewHolder()方法, 用法还是一样的
 *
 * @param parent   父控件
 * @param viewType 类型
 * @return ViewHolder的子类实例
 */
public abstract VH onCreateHolder(ViewGroup parent, int viewType);

/**
 * 给ViewHolder绑定数据, 用来代替onBindViewHolder(), 用法一样
 *
 * @param holder   ViewHolder的子类实例
 * @param position 位置
 */
public abstract void onBindHolder(VH holder, int position);
```

为了支持 `Header` 和 `Footer`，`RefreshRecyclerView.RefreshAdapter` 已重写 `getItemViewType(int position)` 方法，因此，为了不影响显示不同类型的子视图，`RefreshRecyclerView.RefreshAdapter` 还提供了以下两个方法，有需要的话进行重写就可以了。

```java
/**
 * 自定义获取子视图类型的方法
 *
 * @param position 位置
 * @return 类型
 */
public int getItemType(int position) {
    // 重写此方法，计算并返回自己的子视图类型
    return -1;
}

/**
 * 设置子视图类型, 如果有新的子视图类型, 直接往参数viewTypes中添加即可, 每个类型的值都要>3, 且不能重复
 *
 * @param viewTypes 子视图类型列表
 */
public void setItemTypes(List<Integer> viewTypes) {
    // 重写此方法，向viewTypes中添加自己的子视图类型，类型值必须大于3
}
```

具体的使用方法可以参考[MainActivity.java](https://github.com/shichaohui/RefreshRecyclerView/blob/master/MainActivity.java)

除了这些方法外就是 `RecyclerView` 的方法了，如 `setLayoutManager(LayoutManager layout)` 等。

如果以上方法不够用，比如要设置动画，我这里提供的类中并没有公开这个方法，要公开也很简单，参考 `setAdapter()` 方法的形式就可以了。

这里还有一个问题：就是 `onBindHolder(VH holder, int position)` 方法的 `position` 是减去了 `Header` 的数量的（不然无法跟数据集合中的 `position` 对应），所以在使用 `RecyclerView` 的需要以 `position` 为参数的方法时，需要把 `Header` 的数量加上（这里只能有 1 个 `Header`，所以 ＋1 就行了）。