---
title: CSS 渐变边框及动画
date: 2023-07-18 17:06
tags:
 - FrontEnd
categories:
 - FrontEnd
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

用 CSS 实现渐变边框及动画，下面对关键点进行解释说明，查看完整代码及预览效果请 [点击这里](https://code.juejin.cn/pen/7252604713613393977)。

简单说明原理：使用伪元素 `::before` 绘制一个渐变色，然后使用伪元素 `::after` 绘制背景，使其遮住渐变色的一部分，仅保留边框部分，然后添加旋转动画即可。

## DOM 结构

```html
<div class="container"></div>
```

```css
.container {
  border-radius: var(--border-radius);
  overflow: hidden;
}
```

`overflow: hidden` 防止内部元素溢出。

## 渐变背景

使用 `::before` 伪元素实现一个径向渐变背景。

```css
.container::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 150%;
  padding-bottom: 150%;
  background: conic-gradient(from 180deg at 50% 50%,#e92a67 0deg,#a853ba 112.5deg,#2a8af6 228.75deg,rgba(42,138,246,0) 360deg);
  z-index: -1;
}
```

这里没有直接设置伪元素高度，而是使用 `width: 200%; padding-bottom: 200%;` 绘制一个正方形，并且尺寸大于父元素，防止动画时背景不能完全覆盖父元素。

### 渐变边框

使用 `::after` 伪元素作为遮罩及背景，遮住 `::before` 伪元素使其仅展示出边框区域。

```css
.container::after {
  content: "";
  position: absolute;
  inset: var(--border-size);
  background: var(--bg-color);
  border-radius: var(--border-radius);
  z-index: -1;
}
```

### 添加动画

给 `:before` 添加旋转动画。

```css
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
    
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

.container::before {
  ...,
  animation: rotate 3s linear infinite;
}
```

### 边框追逐效果

通过设置分区的渐变背景即可完成边框上多线条相互追逐的炫酷效果。

```css
.container {
  --border-color: conic-gradient(from 180deg at 50% 50%,#e92a67 0deg, transparent 90deg, transparent 180deg, #2a8af6 180deg, transparent 270deg);
}
```