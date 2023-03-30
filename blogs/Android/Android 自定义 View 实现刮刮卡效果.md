---
title: 自定义 View 实现刮刮卡效果
date: 2015-07-02 17:33
tags:
 - Android
 - 自定义 View
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容</small>

继承 `View` 实现的一个刮刮卡效果的控件。

**使用方法：**

* 和普通控件的使用方法一样实例化这个 `View`；
* 使用 `setCardContent()` 方法设置设置卡片底层的图片和顶层的遮罩图片，可以使用 `Bitmap` 实例和资源 id 两种方式设置；
* 使用 `setComplate()` 方法设置刮掉多少后自动清理剩余的遮罩（可选）。

如果底层不想使用图片想用文本，把对应的 `Bitmap` 改成文本或者添加一个设置文本的方法，并修改 `onDraw()` 方法即可。

代码注释很多，很容易看明白

```java
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;

public class ScratchcardView extends View {

	/** 画路径的画笔 */
	private Paint scratchPaint = new Paint();
	/** 刮的路径（通过手指滑动产生） */
	private Path scratchPath = new Path();
	/** 画遮罩层的画布 */
	private Canvas scratchCanvas;
	/** 保存被刮时剩余部分的遮罩 */
	private Bitmap scratchBitmap;

	/** 一个跟当前View一样大小的矩形 */
	private Rect mRect = null;

	/** 是否刮完的标识 */
	private boolean isComplete;
	/** 刮掉多少后算完成（0-100） */
	private int complate = 100;

	private Context mContext = null;

	/** 当前View的宽度 */
	private int width = 0;
	/** 当前View的高度 */
	private int height = 0;

	/** 卡片底层隐藏的图片 */
	private Bitmap bmpSecret = null;
	/** 作为遮罩的图片 */
	private Bitmap bmpScratch = null;

	public ScratchcardView(Context context) {
		this(context, null);
	}

	public ScratchcardView(Context context, AttributeSet attrs) {
		this(context, attrs, 0);
	}

	public ScratchcardView(Context context, AttributeSet attrs, int defStyleAttr) {
		super(context, attrs, defStyleAttr);
		this.mContext = context;
		init();
	}

	private void init() {
		scratchPaint.setAntiAlias(true);
		// 设置画笔不填充
		scratchPaint.setStyle(Paint.Style.STROKE);
		// 设置圆角
		scratchPaint.setStrokeJoin(Paint.Join.ROUND);
		scratchPaint.setStrokeCap(Paint.Cap.ROUND);
		// 绘制时取下层和本层绘制的非交集部分
		scratchPaint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.DST_OUT));
		// 设置画笔宽度
		scratchPaint.setStrokeWidth(20);

		scratchPath = new Path();

		post(new Runnable() {

			@Override
			public void run() {
				width = getWidth();
				height = getHeight();
				mRect = new Rect(0, 0, width, height);
				// 初始化一个bitmap保存被刮时剩余部分的遮罩
				scratchBitmap = Bitmap.createBitmap(width, height, Config.ARGB_8888);
				scratchCanvas = new Canvas(scratchBitmap);
				scratchCanvas.drawBitmap(bmpScratch, null, mRect, null);
			}
		});
	}

	/**
	 * 设置刮刮卡的内容
	 * 
	 * @param secretContent
	 *            底层保密的图片
	 * @param scratchContent
	 *            顶层的遮罩图片
	 */
	public void setCardContent(Bitmap secretContent, Bitmap scratchContent) {
		this.bmpSecret = secretContent;
		this.bmpScratch = scratchContent;
	}

	/**
	 * 设置刮刮卡的内容
	 * 
	 * @param secretId
	 *            底层保密的图片id
	 * @param scratchId
	 *            顶层的遮罩图片的id
	 */
	public void setCardContent(int secretId, int scratchId) {
		bmpSecret = BitmapFactory.decodeResource(mContext.getResources(),
				secretId);
		bmpScratch = BitmapFactory.decodeResource(mContext.getResources(),
				scratchId);
	}

	/**
	 * 设置刮掉多少后自动清理剩余的遮罩
	 * 
	 * @param complate
	 *            已清理的百分比（0-100），默认100
	 */
	public void setComplate(int complate) {
		this.complate = complate;
	}

	@Override
	protected void onDraw(Canvas canvas) {
		canvas.drawBitmap(bmpSecret, null, mRect, null);
		if (!isComplete) {
			scratchCanvas.drawPath(scratchPath, scratchPaint);
			canvas.drawBitmap(scratchBitmap, 0, 0, null);
		}
	}

	@Override
	public boolean onTouchEvent(MotionEvent event) {
		float x = event.getX();
		float y = event.getY();
		switch (event.getAction()) {
		case MotionEvent.ACTION_DOWN:
			scratchPath.moveTo(x, y);
			break;
		case MotionEvent.ACTION_MOVE:
			scratchPath.lineTo(x, y);
			break;
		case MotionEvent.ACTION_UP:
			new Thread(mRunnable).start();
			break;
		}

		invalidate();
		return true;
	}

	/**
	 * 统计擦除区域任务
	 */
	private Runnable mRunnable = new Runnable() {
		private int[] mPixels;

		@Override
		public void run() {

			// 已清理的区域的面积
			int wipeArea = 0;
			// 总面积
			int totalArea = width * height;

			mPixels = new int[totalArea];

			// 拿到所有的像素信息
			scratchBitmap.getPixels(mPixels, 0, width, 0, 0, width, height);
			// 遍历统计擦除的区域
			for (int i = 0; i < width; i++) {
				for (int j = 0; j < height; j++) {
					int index = i + j * width;
					if (mPixels[index] == 0) {
						wipeArea++;
					}
				}
			}
			// 根据所占百分比，进行一些操作
			if (wipeArea > 0 && totalArea > 0) {
				int percent = (int) (wipeArea * 100 / totalArea);
				if (percent > complate) {
					Log.e("TAG", "清除区域达到" + complate + "%，下面自动清除");
					isComplete = true;
					postInvalidate();
				}
			}
		}

	};
}
```