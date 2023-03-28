---
title: Android Dialog：判断点击位置是否在 Dialog 外面
date:  2017-08-30 09:26
tags:
 - Android
 - Dialog
categories:
 - Android
---

> 转载请注明出处，[点击此处](https://shichaohui.github.io/)可了解 [StoneHui](https://shichaohui.github.io/) 更多信息

重写 `Dialog` 的 `onTouchEvent` 方法即可。

```java
@Override
public boolean onTouchEvent(@NonNull MotionEvent event) {
    //触摸外部弹窗
    if (isOutOfBounds(getContext(), event)) {
        // do somthing
    }
    return super.onTouchEvent(event);
}

// 点击位置是否在对话框外部区域
private boolean isOutOfBounds(Context context, MotionEvent event) {
    final int x = (int) event.getX();
    final int y = (int) event.getY();
    final int slop = ViewConfiguration.get(context).getScaledWindowTouchSlop();
    Window window = getWindow();
    if (window == null) return true;
    final View decorView = window.getDecorView();
    return (x < -slop) || (y < -slop) || (x > (decorView.getWidth() + slop))
                || (y > (decorView.getHeight() + slop));
}
```