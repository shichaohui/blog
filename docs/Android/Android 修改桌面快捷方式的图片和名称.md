---
title: Android 修改桌面快捷方式的图片和名称
date: 2015-07-16 20:47
tags:
 - Android
 - Launcher
 - 桌面图标
categories:
 - Android
---

项目要求在应用运行过程中生成了桌面快捷方式，这个很简单，网上很多资料，但是除了这个还要在应用中修改这些快捷方式的图标和名字，找了很久没有找到方法。

怎么办呢......

正在苦恼的时候突然想到：查询快捷方式的时候使用 `getContentResolver().query()` 方法查询的，这不就是 `ContentProvider` 提供数据的么，既然如此，那除了 `query（）` 方法，肯定还有 `update()` 方法的，找了一下果然有，然后开始测试，发现果然能修改。

修改之前需要知道名称和图片的列表和数据类型，方法为：通过打印 `query()` 方法查询出来的数据，直接按 `String` 类型打印，错了的话，在报错信息中能找到真正的类型，从而得知快捷方式名称的列名为 `title` 类型为 `String`，图片的列名为 `icon` 类型为 `Blob`，`Bolb` 类型保存的是二进制数据，因此修改的时候需要把数据转换成 `byte[]` 才能保存，有了这些东西之后，就能修改图片和名称了。

```java
/**
 * 根据图标名字更新图标的图片和名字
 * @param oldName
 * @param newName
 * @param bitmap
 */
public void updateShortcut(String oldName, String newName, Bitmap bitmap) {
    // Bitmap --> byte[]
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);
    
    ContentValues values = new ContentValues();
    values.put("icon", baos.toByteArray());
    values.put("title", newName);
        
    // 图标的数据表路径
    String url = null;
    String pName = getAuthorityFromPermission();
    if (pName != null && !"".equals(pName)) {
		return "content://" + pName + "/favorites?notify=true";
	}
	pName = getLauncherPackageName();
	if (pName != null && !"".equals(pName)) {
		return "content://" + pName + ".settings/favorites?notify=true";
	}
	if (Build.VERSION.SDK_INT < 19) {
		return "content://com.android.launcher2.settings/favorites?notify=true";
	} else {
		return "content://com.android.launcher3.settings/favorites?notify=true";
	}
    // 修改
    context.getContentResolver().update(Uri.parse(url), values,
            String.format("title=\"%s\"", oldName), null);
}  
```

由于很多厂商对 `Launcher` 做了定制，因此 `Launcher` 的包名就不一定是 `com.android.launcher2` 了，因此需要使用如下方法获取手机当前 `Launcher` 包名。

```java
/**
 * 获取Launcher的包名
 * 
 * @return
 */
private static String getAuthorityFromPermission() {
    String permission = "com.android.launcher.permission.READ_SETTINGS"; // 权限
    List<PackageInfo> packs = context.getPackageManager()
            .getInstalledPackages(PackageManager.GET_PROVIDERS);
    if (packs != null) {
        for (PackageInfo pack : packs) {
            ProviderInfo[] providers = pack.providers;
            if (providers != null) {
                for (ProviderInfo provider : providers) {
                    if (permission.equals(provider.readPermission))
                        return provider.authority;
                    if (permission.equals(provider.writePermission))
                        return provider.authority;
                }
            }
        }
    }
    return null;
}  
```