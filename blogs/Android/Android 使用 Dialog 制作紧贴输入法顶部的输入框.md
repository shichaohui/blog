---
title: Android 使用 Dialog 制作紧贴输入法顶部的输入框
date: 2017-08-30 17:29
tags:
 - Android
 - Dialog
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容。</small>

## 效果预览

![紧贴输入法](https://s1.ax1x.com/2023/03/24/ppBJEIH.png)

## 特性

为保证输入法的软键盘和 `Dialog` 同时显示、同时隐藏， `AboveInputMethodDialog` 已经完成了如下处理：

* `Dialog` 显示时软键盘自动弹出。
* 点击空白处，同时隐藏软键盘和 `Dialog`。
* 点击软键盘上的收起按钮，同时隐藏软键盘和 `Dialog`。
* 点击系统返回键，同时隐藏软键盘和 `Dialog`。
* 切换到其他 `APP` 再返回，软键盘自动恢复弹出状态。
* `Home` 键退出 `APP` 再返回，软键盘自动恢复弹出状态。
* 息屏再亮屏，软键盘自动恢复弹出状态。

## 实现方式

1. copy 下面的完整代码（加动画是为了体验更好一点）。
2. 写一个类继承 `AboveInputMethodDialog` 并实现两个抽象方法。
3. 生成第 2 步自定义的对象并 `show()` 出来。

## 完整代码

`AboveInputMethodDialog.java`

```java
import android.app.Dialog;
import android.content.Context;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewConfiguration;
import android.view.Window;
import android.view.WindowManager.LayoutParams;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;

import com.paoword.www.paoword.R;

/**
 * Created by StoneHui on 2017/8/26.
 * <p>
 * 在输入法顶部的对话框
 */
public abstract class AboveInputMethodDialog extends Dialog implements View.OnLayoutChangeListener {

    private int[] decorViewOutLocation = new int[2];
    private InputMethodManager inputMethodManager;

    // 最小偏移量
    private int dialogMinOffset;

    public AboveInputMethodDialog(Context context) {
        super(context, R.style.transparentBackgroundDiaolg);

        setContentView(getContextViewResource());

        updateWindow();

        setCancelable(true);
        setCanceledOnTouchOutside(false);

        inputMethodManager = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        clearInputMethodStatusListener();
        if (!hasFocus || getWindow() == null) {
            // 失去焦点就隐藏输入法
            hideInputMethod(getEditText());
        } else {
            // 获得焦点就显示输入法
            View decorView = getWindow().getDecorView();
            decorView.postDelayed(() -> {
                listenInputMethodStatus();
                showInputMethod(getEditText());
            }, 100L);
        }
    }

    @Override
    public boolean onTouchEvent(@NonNull MotionEvent event) {
        //触摸外部弹窗
        if (isOutOfBounds(getContext(), event)) {
            dismiss();
            return true;
        }
        return super.onTouchEvent(event);
    }

    @Override
    public void dismiss() {
        // 因为已经对输入法状态做了监听，隐藏输入法时会自动隐藏对话框。
        // 如果直接隐藏对话框，输入法状态监听不到，下次显示对话框会有异常。
        hideInputMethod(getEditText());
    }

    // 监听输入法状态
    private void listenInputMethodStatus() {
        if (getWindow() != null) {
            View decorView = getWindow().getDecorView();
            decorView.getLocationOnScreen(decorViewOutLocation);
            dialogMinOffset = decorViewOutLocation[1] / 3;
            decorView.addOnLayoutChangeListener(this);
        }
    }

    // 清理输入法状态监听
    private void clearInputMethodStatusListener() {
        if (getWindow() != null) {
            getWindow().getDecorView().removeOnLayoutChangeListener(this);
        }
    }

    @Override
    public void onLayoutChange(View v, int left, int top, int right, int bottom, int oldLeft, int oldTop, int oldRight, int oldBottom) {
        /*
         * 根据编辑框的位置变化确定输入法是否隐藏。
         * 如果编辑框的位置相对于上次的位置向上偏移，说明输入法弹出。否则说明输入法收起。
         */
        int oldY = decorViewOutLocation[1];
        v.getLocationOnScreen(decorViewOutLocation);
        // decorView 向下偏移，且偏移量足够大才认为是输入法隐藏，此时关闭当前对话框
        if (oldY < decorViewOutLocation[1] && decorViewOutLocation[1] - oldY > dialogMinOffset) {
            super.dismiss();
        }
    }

    // 更新弹窗样式
    private void updateWindow() {
        Window window = getWindow();
        if (window != null) {
            //获取对话框当前的参数值
            LayoutParams params = window.getAttributes();
            params.gravity = Gravity.BOTTOM;
            params.width = LayoutParams.MATCH_PARENT;
            window.setAttributes(params);

            window.setWindowAnimations(R.style.anim_dialog_slide_from_bottom);
        }
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

    // 显示输入法
    private void showInputMethod(EditText editText) {
        inputMethodManager.showSoftInput(editText, -1);
    }

    // 隐藏输入法
    private void hideInputMethod(EditText editText) {
        inputMethodManager.hideSoftInputFromWindow(editText.getWindowToken(), 0);
    }

    /**
     * 获取内容视图的资源id
     */
    @LayoutRes
    protected abstract int getContextViewResource();

    /**
     * 返回当前 Dialog 中的 EditText。
     */
    @Nullable
    protected abstract EditText getEditText();

}
```

`transparentBackgroundDiaolg`

```xml
<!-- 全透明弹框背景 -->
<style name="transparentBackgroundDiaolg" parent="@android:style/Theme.Dialog">
    <item name="android:windowFrame">@null</item><!--边框-->
    <item name="android:windowIsFloating">true</item><!--是否浮现在activity之上-->
    <item name="android:windowIsTranslucent">false</item><!--半透明-->
    <item name="android:windowNoTitle">true</item><!--无标题-->
    <item name="android:windowBackground">@color/transparent</item><!--背景透明-->
    <item name="android:backgroundDimEnabled">false</item><!--模糊-->
</style>
```

`slide_bottom_fade_in.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:duration="300" android:fromYDelta="100.0%p" android:toYDelta="0.0" />
    <alpha android:fromAlpha="0.0" android:toAlpha="1.0" android:duration="300" />
</set>
```

`slide_bottom_fade_out.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:duration="300" android:fromYDelta="0.0" android:toYDelta="100.0%p" />
    <alpha android:fromAlpha="1.0" android:toAlpha="0.0" android:duration="300" />
</set>
```

`anim_dialog_slide_from_bottom`

```xml
<style name="anim_dialog_slide_from_bottom" parent="android:Animation">
    <item name="android:windowEnterAnimation">@anim/slide_bottom_fade_in</item>
    <item name="android:windowExitAnimation">@anim/slide_bottom_fade_out</item>
</style>
```