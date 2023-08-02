---
title: 为 el-select 组件添加滚动加载更多的功能
date: 2023-08-02 12:06
tags:
 - FrontEnd
 - element-ui
 - el-select
 - 滚动加载更多
categories:
 - FrontEnd
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

[el-select]: https://element-plus.org/zh-CN/component/select.html

> [el-select][el-select] 是 [element-ui](https://element-plus.org/zh-CN/) 组件库提供的下拉选择菜单组件。

在项目中，我们展示到 [el-select][el-select] 的数据通常是从服务端获取的，如果服务端的查询较慢或者数据量过大，就会导致在前端的显示很慢，特别是在网络不好的时候更是如此。

所以，分页展示就是一种较好的交互体验了，可惜的是 [el-select][el-select] 组件并没有提供分页的功能。

本着不重复造轮子（懒）的原则，在网上逛了一圈，发现现有实现方案基本都是基于 [el-select][el-select] 封装了新的组件，这可能导致 [el-select][el-select] 组件的部分功能不可用，并且不是很灵活。

算啦，动手做一个吧。

## 实现效果

![效果图](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91fff690f42d40ad8bca2326b2c8ad1d~tplv-k3u1fbpfcp-watermark.image?)

## 实现思路

* 自定义一个组件 `ElSelectLoading.vue`，由用户自行插入到 [el-select][el-select] 组件菜单的底部。
* 使用 [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver) 监听当前组件是否出现在可见范围，可见时触发加载数据的事件。
* 用户监听事件加载新数据，对 [el-select][el-select] 的功能没有影响。

这个思路也适用于其他的列表监听滚动触底加载更多数据。

## 实现代码

```html
<!-- 监听 el-select 的滚动，并提供触底加载数据的回调 -->
<template>
  <el-option ref="el" class="el-select-loading" value="">
    <template v-if="hasMore">
      <el-icon class="el-select-loading__icon"><Loading /></el-icon>
      <span class="el-select-loading__tips">{{ loadingText || "正在加载" }}</span>
    </template>
    <template v-else>{{ noMoreText || "到底了~" }}</template>
  </el-option>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { ElOption } from "element-plus";

interface Props {
  // 当前页码
  page: number;
  // 是否加载中，用来过滤重复的加载
  loading: boolean;
  // 加载中的提示文案
  loadingText?: string;
  // 是否有更多数据可加载
  hasMore: boolean;
  // 没有更多数据的提示文案
  noMoreText?: string;
}

const props = defineProps<Props>();

interface Emits {
  (event: "loadMore", data: number): any;
}

const emit = defineEmits<Emits>();

const el = ref<typeof ElOption>();
const observer = ref<IntersectionObserver>();

// 组件加载成功，监听滚动
onMounted(() => {
  if (!el.value) {
    return;
  }
  const callback: IntersectionObserverCallback = (entries) => {
    if (props.loading || !props.hasMore || !entries[0].isIntersecting) {
      return;
    }
    emit("loadMore", props.page + 1);
  };
  const options: IntersectionObserverInit = {
    root: el.value.$el.parentElement?.parentElement,
    rootMargin: "0px 0px 0px 0px",
  };
  observer.value = new IntersectionObserver(callback, options);
  observer.value.observe(el.value.$el);
});

// 组件卸载成功，取消滚动监听
onUnmounted(() => {
  if (!el.value) {
    return;
  }
  observer.value?.unobserve(el.value.$el);
});
</script>

<style lang="scss" scoped>
.el-select-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: initial;
  pointer-events: none;
  color: var(--el-color-info);
  font-size: 12px;

  &__icon {
    font-size: 16px;
    animation: rotate 1.5s linear infinite;
  }

  &__tips {
    margin-left: 6px;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
```

**为什么根组件使用 `el-option` 而不是 `div` 或其他标签？**  
这是因为 [el-select][el-select] 在内部没有任何 `el-option` 的时候不会渲染菜单浮层，如果使用 `div`，组件可能会没有机会渲染。

**Props：** 

| 参数名称    | 说明                           | 类型    | 默认值   |
| ----------- | ------------------------------ | ------- | -------- |
| page        | 当前页码                       | number  | -        |
| loading     | 是否加载中，用来过滤重复的加载 | boolean | -        |
| loadingText | 加载中的提示文案               | string  | 正在加载 |
| hasMore     | 是否有更多数据可加载           | boolean | -        |
| noMoreText  | 没有更多数据的提示文案         | string  | 到底了~  |

**Emits：**

| 事件名称 | 说明                 | 回调参数          |
| -------- | -------------------- | ----------------- |
| loadMore | 触底可加载数据时触发 | (newPage: number) |

## 使用示例

```html
<template>
  <el-select placeholder="请选择" v-model="selectValue">
    <el-option
      v-for="item in selectOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
    <ElSelectLoading
      :page="page"
      :loading="loading"
      :hasMore="hasMore"
      @loadMore="handleLoadMore"
    />
  </el-select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ElSelectLoading from "@/components/ElSelectLoading.vue";

const page = ref(0);
const loading = ref(false);
const hasMore = ref(true);

const selectValue = ref<number>();
const selectOptions = ref<any[]>([]);

/**
 * 加载数据列表
 */
const loadDataList = async (newPage: number) => {
  try {
    loading.value = true;
    const res = await pageRequest();
    const list = res.data.list || [];
    if (newPage === 1) {
      selectOptions.value = [];
    }
    selectOptions.value.push(...list);
    hasMore.value = selectOptions.value.length < res.data.total;
    page.value = newPage;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

/**
 * 加载更多数据
 */
const handleLoadMore = async (newPage: number) => {
  await loadDataList(newPage);
};
</script>

<style lang="scss" scoped></style>
```

观察代码可以发现，在菜单底部插入了 `ElSelectLoading` 组件，并在加载数据时更新对应的状态。

> **注意：** 每次 `loadMore` 事件回调的新页码参数都是由组件 `props.page + 1` 得到的，因此，
> 1. `page` 参数的值应该由 0 开始。
> 2. `page.value` 的更新应该放在数据加载成功后，以防加载失败后重新加载时页码错误。

如果项目中有多个功能需要分页加载，也可以自行基于 [select][el-select] 和 `ElSelectLoading` 做封装。
