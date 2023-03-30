---
title: 重写 TimePickerDialog 以解决多次添加的问题
date: 2015-10-10 17:35
tags:
 - Android
 - TimePickerDialog
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

使用 `TimePickerDialog` 时，点击对话框的确定按钮，会添加两条数据，原因是 `OnTimeSetListener` 中的 `onTimeSe()` 执行了两次，点击确定按钮时执行一次，对话框取消时，`TimePickerDialog` 的 `onStop()` 方法中也执行了一次。解决方法：重写 `TimePickerDialog` 类，并覆盖 `onStop()`。

```java
import android.app.TimePickerDialog;
import android.content.Context;

public class MyTimePickerDialog extends TimePickerDialog {

	public MyTimePickerDialog(Context context, OnTimeSetListener callBack,
			int hourOfDay, int minute, boolean is24HourView) {
		super(context, callBack, hourOfDay, minute, is24HourView);
		// TODO Auto-generated constructor stub
	}

	public MyTimePickerDialog(Context context, int theme,
			OnTimeSetListener callBack, int hourOfDay, int minute,
			boolean is24HourView) {
		super(context, theme, callBack, hourOfDay, minute, is24HourView);
		// TODO Auto-generated constructor stub
	}

	@Override
	protected void onStop() {
		// TODO Auto-generated method stub
		
		// 注释掉，防止onTimeSet()执行两次
		// super.onStop();
	}

}
```