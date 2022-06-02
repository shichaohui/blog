---
title: Android ImageLoader 工具类
date: 2015-11-02 18:07
tags:
 - Android
 - ImageLoader
categories:
 - Android
---

# Android ImageLoader 工具类

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2015-11-02 18:07</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2015-11-02 18:07</span>
</div>
<br/>

[Universal Image Loader 项目主页](https://github.com/nostra13/Android-Universal-Image-Loader)

为了更加方便的使用 `ImageLoader`，整理出来一个工具类 `ImageLoaderHelper.java`。

```java
import android.content.Context;
import android.graphics.Bitmap;

import com.nostra13.universalimageloader.cache.disc.naming.Md5FileNameGenerator;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;
import com.nostra13.universalimageloader.core.assist.QueueProcessingType;

/**
 * Created by shichaohui on 15/9/10.
 * <br/>
 * ImageLoader辅助类.
 */
public class ImageLoaderHelper {

    private static ImageLoader mImageLoader;

    /**
     * @return ImageLoader实例
     */
    public static ImageLoader getImageLoader() {
        if (mImageLoader == null) {
            mImageLoader = ImageLoader.getInstance();
        }
        return mImageLoader;
    }

    /**
     * 创建DisplayImageOptions实例
     *
     * @param defaultImageResId 默认图片的资源id
     * @return DisplayImageOptions实例
     */
    public static DisplayImageOptions createImageOptions(int defaultImageResId) {
        return new DisplayImageOptions.Builder()
                .showImageOnLoading(defaultImageResId) //设置图片在下载期间显示的图片
                .showImageOnFail(defaultImageResId) //设置图片加载/解码过程中错误时候显示的图片
                .showImageForEmptyUri(defaultImageResId) //设置图片Uri为空或是错误的时候显示的图片
                .cacheInMemory(true) //设置下载的图片缓存在内存中
                .cacheOnDisk(true) //设置下载的图片缓存在SD卡中
                .bitmapConfig(Bitmap.Config.RGB_565) //设置图片的解码类型
                .build(); // 构建
    }

    /**
     * 初始化ImageLoader
     *
     * @param context 上下文
     */
    public static void initImageLoader(Context context) {
        ImageLoaderConfiguration.Builder config = new ImageLoaderConfiguration.Builder(context);
        config.threadPriority(Thread.NORM_PRIORITY - 2);
        config.denyCacheImageMultipleSizesInMemory();
        config.diskCacheFileNameGenerator(new Md5FileNameGenerator());
        config.diskCacheSize(50 * 1024 * 1024); // 50 MiB
        config.tasksProcessingOrder(QueueProcessingType.LIFO);

        // Initialize ImageLoader with configuration.
        ImageLoader.getInstance().init(config.build());
    }

}
```

在应用的入口 `Activity` 或者重写的 `Application` 中初始化。

```java
ImageLoaderHelper.initImageLoader(this); // this为Activity或者Application的Context
```

接着就可以在任意需要的地方使用 `ImageLoader` 加载图片。

```java
ImageLoaderHelper.getImageLoader().displayImage(url, imageView);
```

如果需要增加配置，可使用 `DisplayImageOptions`。

```java
ImageLoaderHelper.getImageLoader().displayImage(url, imageView, 
        ImageLoaderHelper.createImageOptions(图片资源ID));
```

更详细的配置可参考：http://blog.csdn.net/vipzjyno1/article/details/23206387