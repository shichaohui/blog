---
title: BRVAH 树形列表详解の使用篇
date: 2019-08-22 11:19
tags:
 - Android
 - BRVAH
 - BaseRecyclerViewAdapterHelper
categories:
 - Android
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

![demo preview](https://s1.ax1x.com/2023/03/24/ppBG881.png)

[BaseRecyclerViewAdapterHelper](https://github.com/CymChad/BaseRecyclerViewAdapterHelper)

## 简单 Demo

### 定义 Item

为减少篇幅，这里省略了构造函数和 `getter/setter` 方法。

```java
/**
 * 省份（一级列表）
 */
public class Province extends AbstractExpandableItem<City> implements MultiItemEntity {

    private String name;

    @Override
    public int getLevel() {
        return 0;
    }

    @Override
    public int getItemType() {
        return R.layout.item_province;
    }

}

/**
 * 城市（二级列表）
 */
public class City extends AbstractExpandableItem<Town> implements MultiItemEntity {

    private String name;

    @Override
    public int getLevel() {
        return 1;
    }

    @Override
    public int getItemType() {
        return R.layout.item_city;
    }

}

/**
 * 乡镇（三级列表）
 */
public class Town implements MultiItemEntity {

    @Override
    public int getItemType() {
        return R.layout.item_town;
    }
  
}
```

* 所有带子列表的 Item 都要实现接口 [IExpandable&lt;T&gt;](https://github.com/CymChad/BaseRecyclerViewAdapterHelper/blob/master/library/src/main/java/com/chad/library/adapter/base/entity/IExpandable.java) 。抽象类  [AbstractExpandableItem&lt;T&gt;](https://github.com/CymChad/BaseRecyclerViewAdapterHelper/blob/master/library/src/main/java/com/chad/library/adapter/base/entity/AbstractExpandableItem.java) 已经实现了该接口并做了常用接口封装，推荐直接继承它。
* `getLevel()` 函数的返回值必须从 0 开始，子列表的 `level` 必须大于父列表的 `level` 。
* 为了使不同 Item 使用不同布局，需要实现接口  [MultiItemEntity](https://github.com/CymChad/BaseRecyclerViewAdapterHelper/blob/master/library/src/main/java/com/chad/library/adapter/base/entity/MultiItemEntity.java) 。

### 布局 Item

`item_province.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="40dp"
    android:padding="10dp">

    <TextView
        android:id="@+id/tvProvince"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical" />

    <!-- 标识该 Item 的子列表是否展开，图片是 → ，通过旋转控制状态 -->
    <ImageView
        android:id="@+id/ivExpandIcon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical|end"
        android:src="@mipmap/arrow_r" />

</FrameLayout>
```

`item_city.xml`

城市也含有子列表，布局与 `Province` 一样，仅仅 id 不同。

`item_town.xml`

乡镇没有子列表，布局很简单，只有一个 `TextView`。

>  **技巧：**可以通过设置子列表的 `margin_start` 控制不同级别列表的缩进效果。

### 定义 Adapter

```java
/**
 * 地区适配器
 */
public class LocationAdapter extends BaseMultiItemQuickAdapter<MultiItemEntity, BaseViewHolder> {

    public LocationAdapter(List<MultiItemEntity> data) {
        super(data);
      
        // 指定 type 对应的布局资源
        addItemType(R.layout.item_province, R.layout.item_province);
        addItemType(R.layout.item_city, R.layout.item_city);
        addItemType(R.layout.item_town, R.layout.item_town);
      
        setOnItemClickListener();
    }
  
    // 设置 Item 点击事件监听器
    private void setOnItemClickListener() {
        OnItemClickListener onItemClickListener = new OnItemClickListener() {
            @Override
            public void onItemClick(BaseQuickAdapter adapter, View view, int position) {
                MultiItemEntity item = getItem(position);
                if (!(item instanceof AbstractExpandableItem)) {
                    return;
                }
                if (((AbstractExpandableItem) item).isExpanded()) {
                    // 收起被点击 Item 的子列表
                    collapse(position + getHeaderLayoutCount());
                } else {
                    // 展开被点击 Item 的子列表
                    expand(position + getHeaderLayoutCount());
                }
            }
        };
        setOnItemClickListener(onItemClickListener);
    }

    @Override
    protected void convert(@NonNull BaseViewHolder helper, MultiItemEntity item) {
        switch (helper.getItemViewType()) {
            case R.layout.item_province:
                showProvince(helper, (Province) item);
                break;
            case R.layout.item_city:
                showCity(helper, (City) item);
                break;
            case R.layout.item_town:
                showTown(helper, (Town) item);
                break;
            default:
                break;
        }
    }

    private void showProvince(@NonNull BaseViewHolder helper, Province province) {
        helper.setText(R.id.tvProvince, province.getName());
        helper.getView(R.id.ivExpandIcon).setRotation(province.isExpanded() ? 90 : 0);
    }

    private void showCity(@NonNull BaseViewHolder helper, City city) {
        helper.setText(R.id.tvCity, city.getName());
        helper.getView(R.id.ivExpandIcon).setRotation(city.isExpanded() ? 90 : 0);
    }

    private void showTown(@NonNull BaseViewHolder helper, Town town) {
        helper.setText(R.id.tvTown, town.getName());
    }

}
```

* 继承 [BaseMultiItemQuickAdapter&lt;T, VH&gt;](https://github.com/CymChad/BaseRecyclerViewAdapterHelper/blob/master/library/src/main/java/com/chad/library/adapter/base/BaseMultiItemQuickAdapter.java) 。

* 在构造函数中使用 `addItemType(type, layoutId)` 函数指定每种 Item 类型对应的布局资源。

* 在使用点击事件时要注意：回调函数的 `position` 参数是相对于数据列表的位置，而不是 UI 上的位置。因此，如果为 `Adapter` 添加了头布局，使用 `collpase(pos)` `expand(pos)` 等函数操作子列表时 `position` 参数必须加上头布局的数量。

  ```java
  expand(adapterPosition + getHeaderLayoutCount());
  
  collapse(adapterPosition + getHeaderLayoutCount());
  ```


### 使用 Adapter

```java
private void initAdapter() {
    List<? extends MultiItemEntity> dataList = mockData(10);
    mAdapter = new LocationAdapter((List<MultiItemEntity>) dataList);
    mRecyclerView.setAdapter(mAdapter);
}

// 模拟数据
private List<? extends MultiItemEntity> mockData(int pageSize) {
    Random mRandom = new Random();
    List<Province> provinceList = new ArrayList<>();
    for (int i = 0; i < pageSize; i++) {
        // 省份
        Province province = new Province(String.format("Province %s", pageSize + i));
        provinceList.add(province);
        int cityCount = mRandom.nextInt(5);
        for (int j = 0; j < cityCount; j++) {
            // 城市
            City city = new City(String.format("City %s-%s", i, j));
            province.addSubItem(city);
            int townCount = mRandom.nextInt(5);
            for (int k = 0; k < townCount; k++) {
                // 乡镇
                city.addSubItem(new Town(String.format("Town %s-%s-%s", i, j, k)));
            }
        }
    }
    return provinceList;
}
```

## 复杂用法

### 展开所有直接和间接子列表

```java
adapter.expandAll();
```

### 默认展开某一个列表

```java
mRecyclerView.setAdapter(mAdapter);

// 展开指定 position 的 Item 的直接子列表。
mAdapter.expand(position); 
// 展开指定 position 的 Item 的所有直接和间接子列表。
mAdapter.expandAll(position, true);
```

### 最多同时展开一个子列表

```java
List data = adapter.getData();
// 记录要展开子列表的 Item
IExpandable willExpandItem = (IExpandable) data.get(position);
// 遍历关闭已经展开的子列表
for (int i = getHeaderLayoutCount(); i < data.size(); i++) {
    IExpandable expandable = (IExpandable) data.get(i);
    if (expandable.isExpanded()) {
        adapter.collapse(i);
    }
}
// 展开被点击的 Item 的子列表
adapter.expand(data.indexOf(willExpandItem) + getHeaderLayoutCount());
```

由于在收起子列表会导致数据源发生变化，所以:

1. 每次循环都要重新获取 `data.size()` 。
2. 收起列表后，原本的 `position` 不能直接使用，需要重新获取 `position` 。

### 添加数据

#### 添加到一级列表

```java
Province province = new Province("Province new");
mAdapter.addData(province);
```

#### 添加到子列表

```java
// 添加新的 Town 到某个 City
Town town = new Town("Town new");
city.addSubItem(town);
// 如果该 City 的子列表已经展开，渲染新数据到 UI
int cityIndex = mAdapter.getData().indexOf(city);
if (cityIndex >= 0 && city.isExpanded()) {
    mAdapter.addData(cityIndex + city.getSubItems().size(), town);
}
```

### 删除数据

#### 删除一级列表数据

```java
int provinceIndex = mAdapter.getData().indexOf(province);
mAdapter.remove(provinceIndex);
```

#### 删除子列表数据

```java
public void removeItem(MultiItemEntity item) {
    int index = mAdapter.getData().indexOf(item);
    if (index >= 0) {
        // 已经加载到 Adapter 中的直接删除
        mAdapter.remove(index);
    } else {
        // 未加载到 Adapter 中的，通过父级删除
        removeFromParent(mAdapter.getData(), item);
    }
}

// 从数据列表或子列表中查找指定 Item 的父级并删除 Item
public void removeFromParent(List<MultiItemEntity> dataList, MultiItemEntity removeItem) {
    if (dataList == null || dataList.isEmpty()) {
        return;
    }
    if (dataList.contains(removeItem)) {
        dataList.remove(removeItem);
        return;
    }
    for (MultiItemEntity entity : dataList) {
        if (entity instanceof IExpandable) {
            removeFromParent(((IExpandable) entity).getSubItems(), removeItem);
        }
    }
}
```

### 加载更多

上拉加载到更多数据后，自行将新的数据拼到 `Adapter` 的数据源（`mAdapter.getData()`）的后面即可。

如果可以确定每次加载到的都是完整的一级列表，那么直接添加即可。

```java
// 模拟加载更多
List<MultiItemEntity> newList = new ArrayList<>();
newList.add(new Province("province new"));

// 添加数据到列表
mAdapter.addData(newList);
```

如果每次加载时数据可能中断，如某个子列表分多次加载完毕，那么用树形列表不太合适，需求/设计可能存在缺陷。如果非要这么做，请自行拼接加载到的新数据和原数据并刷新 UI。

### 展开最底部的 Item

展开最底部的 Item 子列表时，用户可能需要滑动才能看到展开的数据，因此要处理一下：自动向上滚动一段距离以展示新的数据。

```java
// 展开
mAdapter.expand(position);
// 滚动到下一个 Item，如果已经显示，则不会发生滚动
mRecyclerView.smoothScrollToPosition(position + 1);
```

### 多布局用法

树形多布局与普通多布局用法相同，比如添加直辖市类型的 Item（直辖市与省份同级）。

```java
/**
 * 直辖市（一级列表）
 */
public class Municipality extends AbstractExpandableItem<Town> implements MultiItemEntity {

    private String name;

    @Override
    public int getLevel() {
        return 0;
    }

    @Override
    public int getItemType() {
        return R.layout.item_municipality;
    }

}

// 在 Adapter 中添加新的 Type 并处理数据。
addItemType(R.layout.item_municipality, R.layout.item_municipality);
```

## 易错点

### 关于 position

`expand(position)` `collapse(position)` 等相关函数的 `position` 参数的值必须加上头布局的数量。

```java
expand(position + getHeaderLayoutCount());

collapse(position + getHeaderLayoutCount());
```

### 关于 Item 实体类

实现  `AbstractExpandableItem#getLevel()` 函数，函数返回值必须从 0 开始，子列表的 `level` 值必须大于父列表的 `level` 值。

## BRVAH Demo 

`BRVAH` 项目中的 Demo。

* 普通多布局：[MultipleItemUseActivity](https://github.com/CymChad/BaseRecyclerViewAdapterHelper/blob/master/app/src/main/java/com/chad/baserecyclerviewadapterhelper/MultipleItemUseActivity.java)

* 树形列表： [ExpandableUseActivity](https://github.com/CymChad/BaseRecyclerViewAdapterHelper/blob/master/app/src/main/java/com/chad/baserecyclerviewadapterhelper/ExpandableUseActivity.java)


