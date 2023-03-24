---
title: Android 判断 WiFi 和移动数据网络（GPRS）是否同时打开
date: 2017-12-26 11:38
tags:
 - Android
 - WiFi
 - GPRS
categories:
 - Android
---

## 判断 WiFi 是否打开

```java
public static boolean isWiFiEnable(Context context) {
    ConnectivityManager connectivityManager = (ConnectivityManager) context.getApplicationContext()
            .getSystemService(Context.CONNECTIVITY_SERVICE);
    if (connectivityManager == null) {
        return false;
    }
    NetworkInfo info = connectivityManager.getActiveNetworkInfo();
    return !((info == null) || (!info.isAvailable())) && info.getType() == ConnectivityManager.TYPE_WIFI;
}
```

## 判断 GPRS 是否打开

```java
public static boolean isMobileEnable(Context context) {
    ConnectivityManager connectivityManager = (ConnectivityManager) context.getApplicationContext()
            .getSystemService(Context.CONNECTIVITY_SERVICE);
    if (connectivityManager == null) {
        return false;
    }
    NetworkInfo info = connectivityManager.getActiveNetworkInfo();
    return !((info == null) || (!info.isAvailable())) && info.getType() == ConnectivityManager.TYPE_MOBILE;
}
```

## 判断 WiFi 与 GPRS 同开（1）

**尝试：** 使用 `isWifiEnable()` 和 `isMobileEnable()` 联合判断。

```java
public static boolean isAllEnable(Context context) {
    return isWiFiEnable(context) && isMobileEnable(context);
}
```

**结果：** 此方式无法判断 `WiFi` 与 `GPRS` 同开。

在 `WiFi` 和 `GPRS` 同时打开时系统默认使用 `WiFi` 网络，即`networkInfo.getType()` 的返回值是 `TYPE_WIFI`，所以`isMobileEnable()`的结果一定是`false`导致判断失败。

既然在 `WiFi` 和 `GPRS` 同时打开时可以准确判断 `WiFi` 的状态，那么先使用`isWifiEnable()`判断 `WiFi` 是否打开，再想办法替代`isMobileEnable()`判断 GPRS 是否打开即可。

```java
public static boolean isAllEnable(Context context) {
    if (isWiFiEnable(context)) {
        // TODO 判断移动数据网络是否打开
    } else {
        return false;
    }
}
```

## 判断 WiFi 与 GPRS 同开（2）

观察 `ConnectivityManager` 源码发现有这么一个函数：

![ConnectivityManager#getMobileDataEnabled()](https://s1.ax1x.com/2023/03/24/ppBGcKf.png)

尝试使用反射调用该函数判断 `WiFi` 开启时 `GPRS` 的状态发现是可行的。

```java
public static boolean isMobileEnableReflex(Context context) {
    try {
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getApplicationContext()
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        Method getMobileDataEnabledMethod = ConnectivityManager.class.getDeclaredMethod("getMobileDataEnabled");
        getMobileDataEnabledMethod.setAccessible(true);
        return (Boolean) getMobileDataEnabledMethod.invoke(connectivityManager);
    } catch (Exception e) {
        e.printStackTrace();
        return false;
    }
}
```

最终，可行的判断 `WiFi` 和 `GPRS` 同开的方式如下：

```java
public static boolean isAllEnable(Context context) {
    return isWiFiEnable(context) && isMobileEnableReflex(context);
}
```