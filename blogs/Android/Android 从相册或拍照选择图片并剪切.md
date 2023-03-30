---
title: 从相册或拍照选择图片并剪切
date: 2015-05-23 16:12
tags:
 - Android
 - Camera
categories:
 - Android
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容。</small>

## 预计实现功能

1. 从相册选取图片并进行剪切。
2. 打开相机拍摄图片并进行剪切。

demo地址：https://github.com/shichaohui/CropImage

## 技术使用

1. 分别使用 `Intent` 打开相机、相册、和剪切程序。详见代码
2. 内存卡保存相机拍摄的图片，并在最后删除。

## 逻辑

1. 进入图片库 --> 选择图片 --> 进入剪切程序 --> 剪切完成回到主页。
2. 进入图片库 --> 选择图片 --> 进入剪切程序 --> 未剪切直接退回到主页。
3. 进入图片库 --> 未选择图片直接退回到主页。
4. 进入相机 --> 拍照 --> 选中图片 --> 进入剪切程序 --> 剪切完成回到主页。
5. 进入相机 --> 拍照 --> 选中图片 --> 进入剪切程序 --> 未剪切直接退回到主页。
6. 进入相机 --> 拍照 <--> 取消图片 --> 直接退回到主页。

逻辑 4、5、6 执行完成之后都要删除相机产生的图片。

## 主要代码

### activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <Button
        android:id="@+id/btn_01"
        android:layout_width="match_parent"
        android:layout_height="50dip"
        android:text="相册" />

    <Button
        android:id="@+id/btn_02"
        android:layout_width="match_parent"
        android:layout_height="50dip"
        android:text="拍照" />

    <ImageView
        android:id="@+id/imageID"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

</LinearLayout>
```

### MainActivity.java

```java
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;

public class MainActivity extends Activity implements OnClickListener {

	private CropImage cropImage = null;
	private Button btn_01 = null;
	private Button btn_02 = null;
	private ImageView imageView = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		cropImage = new CropImage(this);

		btn_01 = (Button) findViewById(R.id.btn_01);
		btn_02 = (Button) findViewById(R.id.btn_02);
		imageView = (ImageView) findViewById(R.id.imageID);

		btn_01.setOnClickListener(this);
		btn_02.setOnClickListener(this);

	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		Bitmap bitmap = cropImage.onResult(requestCode, resultCode, data);
		if (bitmap != null) {
			System.out.println(bitmap.getWidth() + "___" + bitmap.getHeight());
			imageView.setImageBitmap(bitmap);
		}
		super.onActivityResult(requestCode, resultCode, data);
	}

	@Override
	public void onClick(View view) {
		switch (view.getId()) {
		case R.id.btn_01:
			cropImage.openAlbums();
			break;

		case R.id.btn_02:
			cropImage.openCamera();
			break;

		default:
			break;
		}
	}

}
```

### 工具类 CropImage.java

```java
import java.io.ByteArrayOutputStream;
import java.io.File;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.provider.MediaStore.Images.Media;
import android.widget.Toast;

/**
 * <p>
 * 功能：
 * <ul>
 * <li>打开照相机拍照并剪切</li>
 * <li>从相册选择图片并剪切</li>
 * </ul>
 * 图片剪切后的大小默认130*130像素<br>
 * 请在使用本类实例的Activity的onActivityResult方法中调用本类实例的onResult方法，以获取剪切后的Bitmap实例
 * </p>
 * 
 * @author shichaohui@meiriq.com
 * 
 */
public class CropImage {

	private Context context = null;

	private static final int FLAG_CAMERA = 1; // 打开相机
	private static final int FLAG_ALBUMS = 2; // 打卡图片库
	private static final int FLAG_CROP = 3; // 执行剪切

	private static final String IMAGE_UNSPECIFIED = "image/*"; // 图片的MIME类型

	private String filePath = ""; // 照相时图片的保存路径
	private String fileName = "/temp.jpg"; // 照相时图片的保存名字

	private int aspectX = 1; // 剪切后的图片宽度高度比例
	private int aspectY = 1;
	private int outputX = 130; // 剪切后的图片宽度
	private int outputY = 130; // 剪切后的图片高度

	public CropImage(Context context) {
		this.context = context;
	}

	/** 打开相册，选择图片后执行剪切 */
	public void openAlbums() {
		// 打开图片库
		Intent intent = new Intent(Intent.ACTION_PICK, null);
		intent.setDataAndType(Media.EXTERNAL_CONTENT_URI, IMAGE_UNSPECIFIED);
		((Activity) context).startActivityForResult(intent, FLAG_ALBUMS);
	}

	/** 打开相机，拍照后执行剪切 */
	public void openCamera() {
		if (Environment.getExternalStorageState().equals(
				Environment.MEDIA_MOUNTED)) {
			filePath = Environment.getExternalStorageDirectory().getPath()
					+ fileName;
			// 打开照相机
			Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
			// 设置相片保存路径
			intent.putExtra(MediaStore.EXTRA_OUTPUT,
					Uri.fromFile(new File(filePath)));
			((Activity) context).startActivityForResult(intent, FLAG_CAMERA);
		} else {
			Toast.makeText(context, "存储卡不可用，请从相册选取", Toast.LENGTH_SHORT).show();
		}
	}

	/**
	 * Activity的onActivityResult方法中调用此方法，
	 * 返回已个裁剪好的Bitmap实例，此方法会返回null值，请注意null值判断
	 * 
	 * @param requestCode
	 * @param resultCode
	 * @param data
	 * @return
	 */
	public Bitmap onResult(int requestCode, int resultCode, Intent data) {
		File file = new File(filePath);
		if (requestCode == FLAG_CAMERA) {
			/* resultCode == -1说明选定了图片，否则就是没有选定图片直接退出了相机 */
			if (resultCode == -1) {
				startPhotoZoom(Uri.fromFile(file));
			} else if (file.exists()) {
				file.delete(); // 删除临时的图片文件
			}
		} else if (requestCode == FLAG_ALBUMS) {
			if (data == null) {
				return null;
			}
			Uri uri = data.getData();
			if (uri != null)
				startPhotoZoom(uri);
		} else if (requestCode == FLAG_CROP) {
			if (file.exists())
				file.delete(); // 删除临时的图片文件
			return getBitmapFromIntent(data);
		}
		return null;
	}

	/**
	 * 从Intent中解析出一个Bitmap实例
	 * 
	 * @param data
	 *            数据源
	 * @return
	 */
	private Bitmap getBitmapFromIntent(Intent data) {
		if (data == null) {
			return null;
		}
		Bitmap photo = null;
		Bundle extras = data.getExtras();
		if (extras != null) {
			photo = extras.getParcelable("data");
			ByteArrayOutputStream stream = new ByteArrayOutputStream();
			// 压缩文件
			photo.compress(CompressFormat.JPEG, 75, stream);
		}
		return photo;
	}

	/**
	 * 调用系统剪切程序剪切图片
	 * 
	 * @param uri
	 *            图片的Uri
	 */
	private void startPhotoZoom(Uri uri) {
		Intent intent = new Intent("com.android.camera.action.CROP");
		intent.setDataAndType(uri, IMAGE_UNSPECIFIED);
		intent.putExtra("crop", "true");
		// aspectX aspectY 是宽高的比例
		intent.putExtra("aspectX", aspectX);
		intent.putExtra("aspectY", aspectY);
		// outputX outputY 是裁剪图片宽高
		intent.putExtra("outputX", outputX);
		intent.putExtra("outputY", outputY);
		intent.putExtra("return-data", true);
		((Activity) context).startActivityForResult(intent, FLAG_CROP);
	}

}
```

对于使用拍照功能产生的图片，最后需要删除，所以需要加入以下权限：

```java
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
<uses-permission android:name="android.permission.MOUNT_FORMAT_FILESYSTEMS" />  
```