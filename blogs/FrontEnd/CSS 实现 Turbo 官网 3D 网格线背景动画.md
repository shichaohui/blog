---
title: CSS 实现 Turbo 官网 3D 网格线背景动画
date: 2023-07-18 17:08
tags:
 - FrontEnd
categories:
 - FrontEnd
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

查看 [Turbo 官网](https://turbo.build/) 时发现它的背景动画挺有意思，就自己动手实现了一下。下面对关键点进行解释说明，查看完整代码及预览效果请 [点击这里](https://code.juejin.cn/pen/7252604713613393977)。

简单说明原理：使用 `mask-image` 遮罩绘制网格，使用 `perspective` 及 `rotate` 动画设置 3D 纵深效果，并添加位移动画即可。

## DOM 结构

```html
<div class="container">
  <div class="lines"></div>
</div>
```
* `.container` 容器用来做 3D 变换。
* `.lines` 用来绘制网格线并执行动画。

## 绘制网格线

```css
.lines {
  ...,
  background-image: linear-gradient(90deg, var(--left-line-color) 45%, transparent 50%, var(--right-line-color) 55%);
  -webkit-mask-image: linear-gradient(90deg, #000 2px, transparent 0), linear-gradient(180deg, #000 2px, transparent 0);
  mask-image: linear-gradient(90deg, #000 2px, transparent 0), linear-gradient(180deg, #000 2px, transparent 0);
  -webkit-mask-size: var(--grid-size) var(--grid-size);
  mask-size: var(--grid-size) var(--grid-size);
}
```
* `background-image` 绘制一个从左向右渐变的背景。
* `mask-image` 绘制水平和垂直的线条做遮罩。
* `mask-size` 设置单个遮罩的尺寸，即网格尺寸。

## 3D 变换

配置 3D 变换使网格拥有从远处延伸到近前的效果。

```css
.container {
  ...,
  perspective: 1000px;
}

.lines {
  transform: rotateX(75deg);
}
```

## 添加动画

```css
@keyframes move {
  from {
    transform: rotateX(75deg) translateY(0);
  }

  to {
    transform: rotateX(75deg) translateY(var(--grid-size));
  }
}

.lines {
  transform: rotateX(75deg) translateY(0);
  animation: move 1s linear infinite;
}
```

设置动画 Y 轴移动一个网格的长度，并无限循环。

## 其他

设置顶部和底部遮罩，遮挡住顶部杂乱的线条，并使底部拥有淡出的效果。

```css
.container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg,  var(--bg-color) 50%, transparent);
  z-index: 1;
}

.container::after {
  content: "";
  position: absolute;
  inset: calc(100% - var(--grid-size)) 0 0;
  height: var(--grid-size);
  background: linear-gradient(180deg, transparent, var(--bg-color));
  z-index: 1;
}
```