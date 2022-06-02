---
title: 使用 RecyclerView 实现多行水平分页的 GridView 效果和 ViewPager 效果
date: 2015-07-10 19:18
tags:
 - Android
 - RecyclerView
 - GridView
 - ViewPager
 - 自定义 View
categories:
 - Android
---

# 使用 RecyclerView 实现多行水平分页的 GridView 效果和 ViewPager 效果

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2015-07-10 19:18</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2015-07-10 19:18</span>
</div>
<br/>

前些天看到有人在论坛上问这种效果怎么实现，没写过也没用过这个功能，网上查了一下，大多是使用 `ViewPager` + `GridView` 或者 `HorizontalScrollView` + `GridView` 实现，不过貌似有点复杂，太懒，没仔细看。这两天学习 `RecyclerView` 的使用（网上有很多文章，建议大家阅读本博客的时候先去了解一下），发现 `RecyclerView` 可以实现 `GridView` 的横向滚动效果，不过没有分页，因此决定自己写一个。

Demo 已上传到[GitHub](https://github.com/shichaohui/PageRecyelerViewDemo)，[CSDN下载频道](http://download.csdn.net/detail/u014165119/8969213)，是 AS 项目，使用 AS 的同学可以直接下载或者 clone，博文最后也有贴出完整代码，使用 Eclipse 的同学可以自己新建项目并 Copy 代码。

### 效果图：

（由于这里每个Item都很相像，所以效果看起来不是很好，请见谅）

**图1：**![多行水平分页的GridView效果](https://img-blog.csdnimg.cn/img_convert/28d8fd2073a26effcd13508e781287cb.gif)

**图2：**![ViewPager效果](https://img-blog.csdnimg.cn/img_convert/3e41a1ebd64c3d8d3815eba6225b8c81.gif)

(删除的操作是在长按事件中写的)

图 1 是带页码指示器的多行横向分页的 `GridView` 效果，拖动距离不足时，还可以滚动回原来的位置（类似于 `ViewPager` 拖动距离不足的效果）；

图 2 是和 `ViewPager` 一模一样的效果，实现此效果只要设置行数和列数都为1即可。

	使用以下代码，需要导入RecyclerView的jar包或者依赖。

### 代码结构：

![代码结构](https://img-blog.csdnimg.cn/img_convert/81943893f9bd1bd11dc47394ec29f1db.png)

* `AutoGridLayoutManager` 继承自 `GridLayoutManager` 并重写了`onMeasure`方法，目的是使 `RecyclerView` 的高度自适应内容高度。
* `DimensionConvert` 是一个用来转换 px 和 pd 的工具类。
* `MainActivity` 是一个使用示例。
* `PageIndicatorView` 继承自 `LinearLayout`，存放一些小圆点作为页码指示器。
* `PageRecyclerView` 继承自 `RecyclerView`，用来完成分页等功能。

先简单讲一下实现步骤，之后贴完整的代码

### 第一步： 实现横向滚动的 GridView 效果

这个很简单，只要给 `RecyclerView` 设置横向的 `GridLayoutManager` 就可以了。但是使用过程中发现，`RecyclerView` 并不会自适应内容的高度，因此重写了 `GridLayoutManager` 的 `onMeasure` 方法（`MyGridLayoutManager.java`）；

```java
@Override
public void onMeasure(RecyclerView.Recycler recycler, RecyclerView.State state, int widthSpec, int heightSpec) {
    View view = recycler.getViewForPosition(0);
    if (view != null) {
        measureChild(view, widthSpec, heightSpec);
        int measuredWidth = View.MeasureSpec.getSize(widthSpec);
        int measuredHeight = view.getMeasuredHeight() * getSpanCount();
        setMeasuredDimension(measuredWidth, measuredHeight);
    }
}
```

### 第二步：实现自定义行数和列数功能

实现此功能需要重写 `RecyclerView`（`MyRecyclerView.java`），并添加两个成员变量 `spanRow`、`spanColumn` 和一个设置行数列数的方法 `setPageSize(int spanRow, int spanColumn)`。

之后，在 `Adapter` 中生成 `Item` 的时候就可以根据设置好的 `PageRecyclerView` 的宽度和列数计算单个 `Item` 的宽度，以达到一页正好显示固定列数的目的：

```java
@Override
public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
    if (itemWidth <= 0) {
        // 计算Item的宽度
        itemWidth = (parent.getWidth() - pageMargin * 2) / spanColumn;
    }

    RecyclerView.ViewHolder holder = mCallBack.onCreateViewHolder(parent, viewType);

    holder.itemView.measure(0, 0);
    holder.itemView.getLayoutParams().width = itemWidth;
    holder.itemView.getLayoutParams().height = holder.itemView.getMeasuredHeight();

    return holder;
}
```

可以看到上面代码中有一个 `mCallBack` 变量，这是一个接口的实现类的实例，我们需要创建 `Adapter` 实例的时候传入一个此接口的子类实例。

```java
public interface CallBack {

    /**
     * 创建VieHolder
     *
     * @param parent
     * @param viewType
     */
    RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType);

    /**
     * 绑定数据到ViewHolder
     *
     * @param holder
     * @param position
     */
    void onBindViewHolder(RecyclerView.ViewHolder holder, int position);

}
```

此接口共有两个方法，这两个方法和 `Adapter` 中需要重写的两个方法一样，用法也一样，分别用来创建 `ViewHolder` 实例和给 `ViewHolder` 中的控件绑定数据。

### 第三步：开始分页滚动

#### 1> 分页:

完成第二步之后，布局就调整好了，之后我们实现分页滚动的功能。要分页就肯定需要总页数（`totalPage`）和当前页码（`currentPage`），我们需要在设置 `Adapter` 适配器之后根据 `Item` 的总数和每页的 `Item` 数计算总页数：

```java
@Override
public void setAdapter(Adapter adapter) {
    super.setAdapter(adapter);
    // 计算总页数
    totalPage = ((int) Math.ceil(adapter.getItemCount() / (double) (spanRow * spanColumn)));
    mIndicatorView.initIndicator(totalPage);
}
```

然后就可以重写 `RecyclerView` 的 `onTouchEvent` 方法实现分页，根据 `ACTION_DOWN` 和 `ACTION_UP` 时候的坐标计算滑动方向，在 `ACTION_UP` 的时候根据滑动的方向使用 `smoothScrollBy` 方法向左或向右滑动一个 `MyRecyclerView` 的宽度就可以了。

不过这种切换页面的方式很生硬，我们要实现的 `ViewPager` 的滑动效果：要滑动超过一定的距离才能切换页码，否则滚回原来的位置。实现此功能需要一个常量，不过为了适应各种宽度的 `MyRecyclerView`，这里根据 `MyRecyclerView` 的宽度动态设置最小滚动距离：

```java
private int shortestDistance; // 超过此距离的滑动才有效

@Override
protected void onMeasure(int widthSpec, int heightSpec) {
    super.onMeasure(widthSpec, heightSpec);
    shortestDistance = getMeasuredWidth() / 3;
}
```

还需要其他的几个变量：

```java
private float downX = 0; // 手指按下的X轴坐标
private float slideDistance = 0; // 滑动的距离
private float scrollX = 0; // X轴当前的位置
```

`scrollX` 为当前滚动的位置，重写 `onScrolled` 计算滚动到的位置：

```java
@Override
public void onScrolled(int dx, int dy) {
    scrollX += dx;
    super.onScrolled(dx, dy);
}
```

之后就可以编写完整的 `onTouchEvent` 方法：

```java
@Override
public boolean onTouchEvent(MotionEvent event) {

    switch (event.getAction()) {
        case MotionEvent.ACTION_DOWN:
            downX = event.getX();
            break;
        case MotionEvent.ACTION_UP:
            slideDistance = event.getX() - downX;
            if (Math.abs(slideDistance) > shortestDistance) {
                // 滑动距离足够，执行翻页
                if (slideDistance > 0) {
                    // 上一页
                    currentPage = currentPage == 1 ? 1 : currentPage - 1;
                } else {
                    // 下一页
                    currentPage = currentPage == totalPage ? totalPage : currentPage + 1;
                }
            }
            // 执行滚动
            smoothScrollBy((int) ((currentPage - 1) * getWidth() - scrollX), 0);
            return true;
        default:
            break;
    }

    return super.onTouchEvent(event);
}
```

#### 2> 页间距

为了分页更加清晰，还需要给页与页添加间距：

首先添加一个成员变量，和 `set` 方法

```java
private int pageMargin = 0; // 页间距
/**
 * 设置页间距
 *
 * @param pageMargin 间距(px)
 */
public void setPageMargin(int pageMargin) {
    this.pageMargin = pageMargin;
}
```

然后重写Adapter的 `onBindViewHolder` 方法调整页间距：

```java
@Override
public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
    if (spanColumn == 1) {
        // 每个Item距离左右两侧各pageMargin
        holder.itemView.getLayoutParams().width = itemWidth + pageMargin * 2;
        holder.itemView.setPadding(pageMargin, 0, pageMargin, 0);
    } else {
        int m = position % (spanRow * spanColumn);
        if (m < spanRow) {
            // 每页左侧的Item距离左边pageMargin
            holder.itemView.getLayoutParams().width = itemWidth + pageMargin;
            holder.itemView.setPadding(pageMargin, 0, 0, 0);
        } else if (m >= spanRow * spanColumn - spanRow) {
            // 每页右侧的Item距离右边pageMargin
            holder.itemView.getLayoutParams().width = itemWidth + pageMargin;
            holder.itemView.setPadding(0, 0, pageMargin, 0);
        } else {
            // 中间的正常显示
            holder.itemView.getLayoutParams().width = itemWidth;
            holder.itemView.setPadding(0, 0, 0, 0);
        }
    }

}
```

#### 3> 占位Item

为了最后不足一页时也能完整显示，还需要在最后不足一页时，生成占位的 `View`，因此修改 `Adapter` 的 `onBindViewHolder` 方法和 `getItemCount` 方法：

```java
@Override
public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {

	...

    if (position < dataList.size()) {
        holder.itemView.setAlpha(1);
        mCallBack.onBindViewHolder(holder, position);
    } else {
        holder.itemView.setAlpha(0);
    }
}

@Override
public int getItemCount() {
    int m = dataList.size() % (spanRow * spanColumn);
    if (m == 0) {
        return dataList.size();
    } else {
       return dataList.size() + (spanRow * spanColumn - m);
   }
}
```

至此，分页功能就完成了，为了功能更丰满，还需要添加一个分页指示器（就是效果图中的小圆点），这个功能还是很简单的，新建一个类继承 `LinearLayout` 并根据总页数生成一些小圆点的 `View`，然后提供一个修改当前页码的方法就 OK 啦。

### 第四步：删除Item

最后还有一个删除 `Item` 的功能，实现方式还是使用系统的 `Adapter` 的 `notifyItemRemoved(int position);` 方法，由于前面分页时给部分 `Item` 设置了 `padding`，所以为了布局不会错乱，还需要更新其他改变的 `Item`：

```java
// 删除Item
notifyItemRemoved(position);
// 更新界面上发生改变的Item
notifyItemRangeChanged(position, currentPage * spanRow * spanColumn);
```

然后还要更新页码指示器，这里就不贴代码了，直接看下面的类就可以了。

使用的时候只要把指示器和 `MyRecyclerView` 按照自己的需求布局，并在切换页面的时候更新指示器就完成了。

**改：**

1. 上面分页滑动是在 `onTouchEvent()` 方法中实现的，但是后来发现，这种实现方式会导致给 `Item` 添加 `onClickListener` 、 `onLongClickListener` 、 `onTouchListener` 的时候会产生事件冲突，因此修改为在 `onScrollStateChanged()` 方法中实现，代码如下：

```java
/*
	 * 0: 停止滚动且手指移开; 1: 开始滚动; 2: 手指做了抛的动作（手指离开屏幕前，用力滑了一下）
	 */
private int scrollState = 0; // 滚动状态
@Override
public void onScrollStateChanged(int state) {
    switch (state) {
        case 2:
            scrollState = 2;
            break;
        case 1:
            scrollState = 1;
            break;
        case 0:
            if (slideDistance == 0) {
                break;
            }
            scrollState = 0;
            if (slideDistance < 0) { // 上页
                currentPage = (int) Math.ceil(scrollX / getWidth());
                if (currentPage * getWidth() - scrollX < shortestDistance) {
                    currentPage += 1;
                }
            } else { // 下页
                currentPage = (int) Math.ceil(scrollX / getWidth()) + 1;
                if (currentPage <= totalPage) {
                    if (scrollX - (currentPage - 2) * getWidth() < shortestDistance) {
                        // 如果这一页滑出距离不足，则定位到前一页
                        currentPage -= 1;
                    }
                } else {
                    currentPage = totalPage;
                }
            }
            // 执行自动滚动
            smoothScrollBy((int) ((currentPage - 1) * getWidth() - scrollX), 0);
            // 修改指示器选中项
            mIndicatorView.setSelectedPage(currentPage - 1);
            slideDistance = 0;
            break;
    }
    super.onScrollStateChanged(state);
}

@Override
public void onScrolled(int dx, int dy) {
    scrollX += dx;
    if (scrollState == 1) {
        slideDistance += dx;
    }

    super.onScrolled(dx, dy);
}
```
2. `RecyclerView` 的 `GridLayoutManager` 是从上到下从左到右排列的，而我们分页时大多需要的是从左到右从上到下排列，因此增加一个方法调整位置（此方法只适用于 3*3 排列的，还没有找到通用的方法，如果那位同学有方法，麻烦分享一下，先谢过）

```java
private void countRealPosition(int position) {
    // 为了使Item从左到右从上到下排列，需要position的值
    int m = position % (spanRow * spanColumn);
    switch (m) {
        case 1:
        case 5:
            realPosition = position + 2;
            break;
        case 3:
        case 7:
            realPosition = position - 2;
            break;
        case 2:
            realPosition = position + 4;
            break;
        case 6:
            realPosition = position - 4;
            break;
        case 0:
        case 4:
        case 8:
            realPosition = position;
            break;
    }
}
```

<<<<<<<<<<<<<<<<<<<<<<**使用方法参考MainActivity.java**>>>>>>>>>>>>>>>>>>>>

上面讲的不够详细，具体见代码>>>>>>>>>>>>>>

### 完整代码：

#### AutoGridLayoutManager.java

使用这个类替代 `GridLayoutManager` 是为了使 `RecyclerView` 及其子类能够自适应内容的高度。

```java
import android.content.Context;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.view.View;

/**
 * Created by shichaohui on 2015/7/9 0009.
 * <p>
 * 重写GridLayoutManager，在{@link RecyclerView#setLayoutManager(RecyclerView.LayoutManager)}使用
 * 此类替换{@link GridLayoutManager}，使{@link RecyclerView}能够自使用内容的高度
 * </p>
 */
public class AutoGridLayoutManager extends GridLayoutManager {

    private int measuredWidth = 0;
    private int measuredHeight = 0;

    public AutoGridLayoutManager(Context context, AttributeSet attrs,
                                 int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    public AutoGridLayoutManager(Context context, int spanCount) {
        super(context, spanCount);
    }

    public AutoGridLayoutManager(Context context, int spanCount,
                                 int orientation, boolean reverseLayout) {
        super(context, spanCount, orientation, reverseLayout);
    }

    @Override
    public void onMeasure(RecyclerView.Recycler recycler,
                          RecyclerView.State state, int widthSpec, int heightSpec) {
        if (measuredHeight <= 0) {
            View view = recycler.getViewForPosition(0);
            if (view != null) {
                measureChild(view, widthSpec, heightSpec);
                measuredWidth = View.MeasureSpec.getSize(widthSpec);
                measuredHeight = view.getMeasuredHeight() * getSpanCount();
            }
        }
        setMeasuredDimension(measuredWidth, measuredHeight);
    }

}
```

#### PageRecyclerView.java

重写 `RecyclerView` 实现分页

```java
import android.content.Context;
import android.graphics.Color;
import android.support.v4.view.PagerAdapter;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import java.util.List;
import java.util.Objects;

/**
 * Created by shichaohui on 2015/7/9 0009.
 * <p>
 * 横向分页的GridView效果
 * </p>
 * <p>
 * 默认为1行，每页3列，如果要自定义行数和列数，请在调用{@link PageRecyclerView#setAdapter(Adapter)}方法前调用
 * {@link PageRecyclerView#setPageSize(int, int)}方法自定义行数
 * </p>
 */
public class PageRecyclerView extends RecyclerView {

    private Context mContext = null;

    private PageAdapter myAdapter = null;

    private int shortestDistance; // 超过此距离的滑动才有效
    private float downX = 0; // 手指按下的X轴坐标
    private float slideDistance = 0; // 滑动的距离
    private float scrollX = 0; // X轴当前的位置

    private int spanRow = 1; // 行数
    private int spanColumn = 3; // 每页列数
    private int totalPage = 0; // 总页数
    private int currentPage = 1; // 当前页

    private int pageMargin = 0; // 页间距

    private PageIndicatorView mIndicatorView = null; // 指示器布局

    public PageRecyclerView(Context context) {
        this(context, null);
    }

    public PageRecyclerView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public PageRecyclerView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        defaultInit(context);
    }

    // 默认初始化
    private void defaultInit(Context context) {
        this.mContext = context;
        setLayoutManager(new AutoGridLayoutManager(
                mContext, spanRow, AutoGridLayoutManager.HORIZONTAL, false));
        setOverScrollMode(OVER_SCROLL_NEVER);
    }

    /**
     * 设置行数和每页列数
     *
     * @param spanRow    行数，<=0表示使用默认的行数
     * @param spanColumn 每页列数，<=0表示使用默认每页列数
     */
    public void setPageSize(int spanRow, int spanColumn) {
        this.spanRow = spanRow <= 0 ? this.spanRow : spanRow;
        this.spanColumn = spanColumn <= 0 ? this.spanColumn : spanColumn;
        setLayoutManager(new AutoGridLayoutManager(
                mContext, this.spanRow, AutoGridLayoutManager.HORIZONTAL, false));
    }

    /**
     * 设置页间距
     *
     * @param pageMargin 间距(px)
     */
    public void setPageMargin(int pageMargin) {
        this.pageMargin = pageMargin;
    }

    /**
     * 设置指示器
     *
     * @param indicatorView 指示器布局
     */
    public void setIndicator(PageIndicatorView indicatorView) {
        this.mIndicatorView = indicatorView;
    }

    @Override
    protected void onMeasure(int widthSpec, int heightSpec) {
        super.onMeasure(widthSpec, heightSpec);
        shortestDistance = getMeasuredWidth() / 3;
    }

    @Override
    public void setAdapter(Adapter adapter) {
        super.setAdapter(adapter);
        this.myAdapter = (PageAdapter) adapter;
        update();
    }

    // 更新页码指示器和相关数据
    private void update() {
        // 计算总页数
        int temp = ((int) Math.ceil(myAdapter.dataList.size() / (double) (spanRow * spanColumn)));
        if (temp != totalPage) {
            mIndicatorView.initIndicator(temp);
            // 页码减少且当前页为最后一页
            if (temp < totalPage && currentPage == totalPage) {
                currentPage = temp;
                // 执行滚动
                smoothScrollBy(-getWidth(), 0);
            }
            mIndicatorView.setSelectedPage(currentPage - 1);
            totalPage = temp;
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {

        switch (event.getAction()) {
            case MotionEvent.ACTION_MOVE:
                if (currentPage == totalPage && downX - event.getX() > 0) {
                    return true;
                }
                break;
            case MotionEvent.ACTION_DOWN:
                downX = event.getX();
                break;
            case MotionEvent.ACTION_UP:
                slideDistance = event.getX() - downX;
                if (Math.abs(slideDistance) > shortestDistance) {
                    // 滑动距离足够，执行翻页
                    if (slideDistance > 0) {
                        // 上一页
                        currentPage = currentPage == 1 ? 1 : currentPage - 1;
                    } else {
                        // 下一页
                        currentPage = currentPage == totalPage ? totalPage : currentPage + 1;
                    }
                    // 修改指示器选中项
                    mIndicatorView.setSelectedPage(currentPage - 1);
                }
                // 执行滚动
                smoothScrollBy((int) ((currentPage - 1) * getWidth() - scrollX), 0);
                return true;
            default:
                break;
        }

        return super.onTouchEvent(event);
    }

    @Override
    public void onScrolled(int dx, int dy) {
        scrollX += dx;
        super.onScrolled(dx, dy);
    }

    /**
     * 数据适配器
     */
    public class PageAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

        private List<?> dataList = null;
        private CallBack mCallBack = null;
        private int itemWidth = 0;
        private int itemCount = 0;

        /**
         * 实例化适配器
         *
         * @param data
         * @param callBack
         */
        public PageAdapter(List<?> data, CallBack callBack) {
            this.dataList = data;
            this.mCallBack = callBack;
            itemCount = dataList.size() + spanRow * spanColumn;
        }

        @Override
        public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            if (itemWidth <= 0) {
                // 计算Item的宽度
                itemWidth = (parent.getWidth() - pageMargin * 2) / spanColumn;
            }

            RecyclerView.ViewHolder holder = mCallBack.onCreateViewHolder(parent, viewType);

            holder.itemView.measure(0, 0);
            holder.itemView.getLayoutParams().width = itemWidth;
            holder.itemView.getLayoutParams().height = holder.itemView.getMeasuredHeight();

            return holder;
        }

        @Override
        public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
            if (spanColumn == 1) {
                // 每个Item距离左右两侧各pageMargin
                holder.itemView.getLayoutParams().width = itemWidth + pageMargin * 2;
                holder.itemView.setPadding(pageMargin, 0, pageMargin, 0);
            } else {
                int m = position % (spanRow * spanColumn);
                if (m < spanRow) {
                    // 每页左侧的Item距离左边pageMargin
                    holder.itemView.getLayoutParams().width = itemWidth + pageMargin;
                    holder.itemView.setPadding(pageMargin, 0, 0, 0);
                } else if (m >= spanRow * spanColumn - spanRow) {
                    // 每页右侧的Item距离右边pageMargin
                    holder.itemView.getLayoutParams().width = itemWidth + pageMargin;
                    holder.itemView.setPadding(0, 0, pageMargin, 0);
                } else {
                    // 中间的正常显示
                    holder.itemView.getLayoutParams().width = itemWidth;
                    holder.itemView.setPadding(0, 0, 0, 0);
                }
            }

            if (position < dataList.size()) {
                holder.itemView.setVisibility(View.VISIBLE);
                mCallBack.onBindViewHolder(holder, position);
            } else {
                holder.itemView.setVisibility(View.INVISIBLE);
            }

        }

        @Override
        public int getItemCount() {
            return itemCount;
        }

        /**
         * 删除Item
         * @param position 位置
         */
        public void remove(int position) {
            if (position < dataList.size()) {
                // 删除数据
                dataList.remove(position);
                itemCount--;
                // 删除Item
                notifyItemRemoved(position);
                // 更新界面上发生改变的Item
                notifyItemRangeChanged(position, currentPage * spanRow * spanColumn);
                // 更新页码指示器
                update();
            }
        }

    }

    public interface CallBack {

        /**
         * 创建VieHolder
         *
         * @param parent
         * @param viewType
         */
        RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType);

        /**
         * 绑定数据到ViewHolder
         *
         * @param holder
         * @param position
         */
        void onBindViewHolder(RecyclerView.ViewHolder holder, int position);

    }

}
```

#### PageIndicatorView.java

页码指示器 ，此类可以作为一个工具类，在 `ViewPager` 做的轮播图上也可以使用

```java
import android.content.Context;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.View;
import android.widget.LinearLayout;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by shichaohui on 2015/7/10 0010.
 * <p/>
 * 页码指示器类，获得此类实例后，可通过{@link PageIndicatorView#initIndicator(int)}方法初始化指示器
 * </P>
 */
public class PageIndicatorView extends LinearLayout {

    private Context mContext = null;
    private int dotSize = 15; // 指示器的大小（dp）
    private int margins = 4; // 指示器间距（dp）
    private List<View> indicatorViews = null; // 存放指示器

    public PageIndicatorView(Context context) {
        this(context, null);
    }

    public PageIndicatorView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public PageIndicatorView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    private void init(Context context) {
        this.mContext = context;

        setGravity(Gravity.CENTER);
        setOrientation(HORIZONTAL);

        dotSize = DimensionConvert.dip2px(context, dotSize);
        margins = DimensionConvert.dip2px(context, margins);
    }

    /**
     * 初始化指示器，默认选中第一页
     *
     * @param count 指示器数量，即页数
     */
    public void initIndicator(int count) {

        if (indicatorViews == null) {
            indicatorViews = new ArrayList<>();
        } else {
            indicatorViews.clear();
            removeAllViews();
        }
        View view;
        LayoutParams params = new LayoutParams(dotSize, dotSize);
        params.setMargins(margins, margins, margins, margins);
        for (int i = 0; i < count; i++) {
            view = new View(mContext);
            view.setBackgroundResource(android.R.drawable.presence_invisible);
            addView(view, params);
            indicatorViews.add(view);
        }
        if (indicatorViews.size() > 0) {
            indicatorViews.get(0).setBackgroundResource(android.R.drawable.presence_online);
        }
    }

    /**
     * 设置选中页
     *
     * @param selected 页下标，从0开始
     */
    public void setSelectedPage(int selected) {
        for (int i = 0; i < indicatorViews.size(); i++) {
            if (i == selected) {
                indicatorViews.get(i).setBackgroundResource(android.R.drawable.presence_online);
            } else {
                indicatorViews.get(i).setBackgroundResource(android.R.drawable.presence_invisible);
            }
        }
    }

}
```

#### DimensionConvert.java

用来转换 dip 和 px 的工具类

```java
import android.content.Context;

/**
 * Created by shichaohui on 2015/7/10 0010.
 */
public class DimensionConvert {

    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     *
     * @param context
     * @param dpValue 要转换的dp值
     */
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    /**
     * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
     *
     * @param context
     * @param pxValue 要转换的px值
     */
    public static int px2dip(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }
}
```

#### MainActivity.java

```java
import android.app.Activity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {

    private PageRecyclerView mRecyclerView = null;
    private List<String> dataList = null;
    private PageRecyclerView.PageAdapter myAdapter = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        initData();

        mRecyclerView = (PageRecyclerView) findViewById(R.id.cusom_swipe_view);
        // 设置指示器
        mRecyclerView.setIndicator((PageIndicatorView) findViewById(R.id.indicator));
        // 设置行数和列数
        mRecyclerView.setPageSize(3, 3);
        // 设置页间距
        mRecyclerView.setPageMargin(30);
        // 设置数据
        mRecyclerView.setAdapter(myAdapter = mRecyclerView.new PageAdapter(dataList, new PageRecyclerView.CallBack() {
            @Override
            public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
                View view = LayoutInflater.from(MainActivity.this).inflate(R.layout.item, parent, false);
                return new MyHolder(view);
            }

            @Override
            public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
                ((MyHolder)holder).tv.setText(dataList.get(position));
            }
        }));

    }

    private void initData() {
        dataList = new ArrayList<>();
        for (int i = 0; i < 50; i++) {
            dataList.add(String.valueOf(i));
        }
    }

    public class MyHolder extends RecyclerView.ViewHolder {

        public TextView tv = null;

        public MyHolder(View itemView) {
            super(itemView);
            tv = (TextView) itemView.findViewById(R.id.text);
            tv.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(MainActivity.this, getAdapterPosition() + "", Toast.LENGTH_SHORT).show();
                }
            });
            tv.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View v) {
                    myAdapter.remove(getAdapterPosition());
                    return true;
                }
            });
        }
    }

}
```

最后是两个布局文件：

#### activity_main.xml

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:orientation="vertical"
    android:layout_height="match_parent">

        <com.example.sch.myapplication.PageRecyclerView
            android:id="@+id/cusom_swipe_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />

        <com.example.sch.myapplication.PageIndicatorView
            android:id="@+id/indicator"
            android:layout_width="match_parent"
            android:layout_marginBottom="20dp"
            android:layout_height="wrap_content"
            android:layout_gravity="bottom"/>

</LinearLayout>
```

#### item.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/text"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_margin="10dp"
        android:background="#770000ff"
        android:gravity="center" />

</LinearLayout>
```