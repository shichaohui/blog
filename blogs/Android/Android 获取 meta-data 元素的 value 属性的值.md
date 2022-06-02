---
title: 获取 meta-data 元素的 value 属性的值
date: 2015-10-20 15:09
tags:
 - Android
 - meta-data
categories:
 - Android
---

# 获取 meta-data 元素的 value 属性的值

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2015-10-20 15:09</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2015-10-20 15:09</span>
</div>
<br/>

获取 `<meta-data>` 元素的 `value` 属性的值，有注释不解释。

```java
import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.ServiceInfo;
/**
 * Created by shichaohui on 15/10/13.
 * <br/>
 * meta-data工具类.
 */
public class MetaDataUtils {
    /**
     * 获取application节点中的meta-data元素的value属性值.
     *
     * @param context 上下文
     * @param key     meta-data元素的name属性值.
     * @return application节点中的meta-data元素的value属性值
     */
    public static String getApplicationData(Context context, String key) {
        try {
            ApplicationInfo appInfo = context.getPackageManager()
                    .getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
            return appInfo.metaData.getString(key);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }
    /**
     * 获取activity节点中的meta-data元素的value属性值.
     *
     * @param context 上下文
     * @param key     meta-data元素的name属性值.
     * @return activity节点中的meta-data元素的value属性值
     */
    public static String getActivityData(Activity context, String key) {
        try {
            ActivityInfo info = context.getPackageManager()
                    .getActivityInfo(context.getComponentName(), PackageManager.GET_META_DATA);
            return info.metaData.getString(key);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }
    /**
     * 获取service节点中的meta-data元素的value属性值.
     *
     * @param context 上下文
     * @param cls     meta-data所在的Service.
     * @param key     meta-data元素的name属性值.
     * @return service节点中的meta-data元素的value属性值
     */
    public static String getServiceData(Context context, Class<?> cls, String key) {
        try {
            ServiceInfo info = context.getPackageManager()
                    .getServiceInfo(new ComponentName(context, cls), PackageManager.GET_META_DATA);
            return info.metaData.getString(key);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }
    /**
     * 获取receiver节点中的meta-data元素的value属性值.
     *
     * @param context 上下文
     * @param cls     meta-data所在的Service.
     * @param key     meta-data元素的name属性值.
     * @return receiver节点中的meta-data元素的value属性值
     */
    public static String getReceiverData(Context context, Class<?> cls, String key) {
        try {
            ActivityInfo info = context.getPackageManager()
                    .getReceiverInfo(new ComponentName(context, cls), PackageManager.GET_META_DATA);
            return info.metaData.getString(key);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```