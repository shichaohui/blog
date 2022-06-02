---
title: Android 文件下载（断点、多任务并行下载）
date: 2015-06-08 12:40
tags:
 - Android
 - 文件下载
categories:
 - Android
---

# Android 文件下载（断点、多任务并行下载）

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2015-06-08 12:40</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2015-06-08 12:40</span>
</div>
<br/>

以下代码是基于百度云网盘：http://pan.baidu.com/s/1dD1Xo8T 中的 demo 进行优化及功能添加。

以下代码实现功能有：多线程下载、多任务并行下载以及下载进度和下载速度的显示等功能。

**实现思路：** 根据线程数分割待下载文件；利用 `HttpURLConnection` 实现各部分文件的下载；利用 `RandomAccessFile` 实现下载内容的保存；各线程下载任务信息保存在数据库，以便暂停和恢复下载。

demo 已上传到 Github：https://github.com/shichaohui/FileDownloadDemo.git 欢迎下载。

**效果图：**

![效果图](https://img-blog.csdnimg.cn/img_convert/7c43a3307fd02e7734131538d7b28987.png)

## 主要代码

### DownLoadHelper.java:

```java
package com.example.test;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * 利用数据库来记录下载信息
 * 
 * @author shichaohui@meiriq.com
 */
public class DownLoadHelper extends SQLiteOpenHelper {

	private static final String DB_NAME = "download.db";
	private static final String TB_NAME = "download_info";
	private static final int DOWNLOAD_VERSION = 1;

	public DownLoadHelper(Context context) {
		super(context, DB_NAME, null, DOWNLOAD_VERSION);
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
		db.execSQL("create table "
				+ TB_NAME
				+ "(_id integer PRIMARY KEY AUTOINCREMENT, thread_id integer, "
				+ "start_pos integer, end_pos integer, compelete_size integer,url char)");
	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

	}

}

```

这个类没什么好说的，就是创建数据库和数据表。

### DownlaodSqlTool.java

```java
package com.example.test;

import java.util.ArrayList;
import java.util.List;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

/**
 * 数据库操作工具类
 * 
 * @author shichaohui@meiriq.com
 */
public class DownlaodSqlTool {
	
	private static DownlaodSqlTool instance = null;
	private DownLoadHelper dbHelper = null;

	private DownlaodSqlTool(Context context) {
		dbHelper = new DownLoadHelper(context);
	}

	private static synchronized void syncInit(Context context) {
		if (instance == null) {
			instance = new DownlaodSqlTool(context);
		}
	}

	public static DownlaodSqlTool getInstance(Context context) {
		if (instance == null) {
			syncInit(context);
		}
		return instance;
	}
	
	/** 将下载的进度等信息保存到数据库 */
	public void insertInfos(List<DownloadInfo> infos) {
		SQLiteDatabase database = dbHelper.getWritableDatabase();
		for (DownloadInfo info : infos) {
			String sql = "insert into download_info(thread_id,start_pos, end_pos,compelete_size,url) values (?,?,?,?,?)";
			Object[] bindArgs = { info.getThreadId(), info.getStartPos(),
					info.getEndPos(), info.getCompeleteSize(), info.getUrl() };
			database.execSQL(sql, bindArgs);
		}
	}

	/** 获取下载的进度等信息 */
	public List<DownloadInfo> getInfos(String urlstr) {
		List<DownloadInfo> list = new ArrayList<DownloadInfo>();
		SQLiteDatabase database = dbHelper.getWritableDatabase();
		String sql = "select thread_id, start_pos, end_pos,compelete_size,url from download_info where url=?";
		Cursor cursor = database.rawQuery(sql, new String[] { urlstr });
		while (cursor.moveToNext()) {
			DownloadInfo info = new DownloadInfo(cursor.getInt(0),
					cursor.getInt(1), cursor.getInt(2), cursor.getInt(3),
					cursor.getString(4));
			list.add(info);
		}
		cursor.close();
		return list;
	}

	/** 更新数据库中的下载信息 */
	public void updataInfos(int threadId, int compeleteSize, String urlstr) {
		SQLiteDatabase database = dbHelper.getWritableDatabase();
		String sql = "update download_info set compelete_size=? where thread_id=? and url=?";
		Object[] bindArgs = { compeleteSize, threadId, urlstr };
		database.execSQL(sql, bindArgs);
	}

	/** 关闭数据库 */
	public void closeDb() {
		dbHelper.close();
	}

	/** 删除数据库中的数据 */
	public void delete(String url) {
		SQLiteDatabase database = dbHelper.getWritableDatabase();
		database.delete("download_info", "url=?", new String[] { url });
	}
}
```

单例模式的数据库操作类，主要实现数据的增删改查等操作。

### DownloadInfo.java

```java
package com.example.test;

/**
 * 保存每个下载线程下载信息类
 * 
 * @author shichaohui@meiriq.com
 */
public class DownloadInfo {

	private int threadId; // 下载线程的id
	private int startPos; // 开始点
	private int endPos; // 结束点
	private int compeleteSize; // 完成度
	private String url; // 下载文件的URL地址

	/**
	 * 
	 * @param threadId
	 *            下载线程的id
	 * @param startPos
	 *            开始点
	 * @param endPos
	 *            结束点
	 * @param compeleteSize
	 *            // 已下载的大小
	 * @param url
	 *            下载地址
	 */
	public DownloadInfo(int threadId, int startPos, int endPos,
			int compeleteSize, String url) {
		this.threadId = threadId;
		this.startPos = startPos;
		this.endPos = endPos;
		this.compeleteSize = compeleteSize;
		this.url = url;
	}

	public DownloadInfo() {
	}

	/** 获取下载地址 */
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	/** 获取下载线程的Id */
	public int getThreadId() {
		return threadId;
	}

	public void setThreadId(int threadId) {
		this.threadId = threadId;
	}

	/** 获取下载的开始位置 */
	public int getStartPos() {
		return startPos;
	}

	public void setStartPos(int startPos) {
		this.startPos = startPos;
	}

	/** 获取下载的结束位置 */
	public int getEndPos() {
		return endPos;
	}

	public void setEndPos(int endPos) {
		this.endPos = endPos;
	}

	/** 获取已下载的大小 */
	public int getCompeleteSize() {
		return compeleteSize;
	}

	public void setCompeleteSize(int compeleteSize) {
		this.compeleteSize = compeleteSize;
	}

	@Override
	public String toString() {
		return "DownloadInfo [threadId=" + threadId + ", startPos=" + startPos
				+ ", endPos=" + endPos + ", compeleteSize=" + compeleteSize
				+ "]";
	}
}

```

下载实体类，针对于单个下载线程，保存下载线程对应的文件相关信息，比如当前下载线程负责下载的部分是从文件的哪个点开始的（`startPos`）、哪个点结束的（`endPos`）以及当前已经下载了多少（`compeleteSize`）等信息。

### DownloadingInfo.java

```java
package com.example.test;

/**
 * 某一任务正在下载时的信息
 * 
 * @author shichaohui@meiriq.com
 * 
 */
public class DownloadingInfo {

	private String kbps = "0"; // 每秒下载速度
	private int secondSize = 0; // 一秒钟累计下载量
	private int fileSize = 0; // 文件大小

	public String getKbps() {
		return kbps;
	}

	public void setKbps(String kbps) {
		this.kbps = kbps;
	}

	public int getSecondSize() {
		return secondSize;
	}

	public void setSecondSize(int secondSize) {
		this.secondSize = secondSize;
	}

	public int getFileSize() {
		return fileSize;
	}

	public void setFileSize(int fileSize) {
		this.fileSize = fileSize;
	}

	@Override
	public String toString() {
		return "DownloadingInfo [kbps=" + kbps + ", secondSize=" + secondSize
				+ ", fileSize=" + fileSize + "]";
	}

}

```

这也是一个下载相关的实体类，针对于一个下载任务（包括多个下载线程）。保存下载任务的下载进度、速度等用于客户端显示的数据。

### DownloadHttpTool.java

```java
package com.example.test;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;

/**
 * 利用Http协议进行多线程下载具体实现类
 * 
 * @author shichaohui@meiriq.com
 */
public class DownloadHttpTool {

	private final int THREAD_COUNT = 2; // 线程数量
	private String urlstr = ""; // URL地址
	private Context mContext = null;
	private List<DownloadInfo> downloadInfos = null; // 保存下载信息的类
	/** 下载文件保存路径 */
	public static String filePath = ""; // 目录
	private String fileName = ""; // 文件名
	private String fileNameTmp = ""; // 临时文件名
	/** 临时文件名后缀 */
	public static final String FILE_TMP_SUFFIX = ".tmp";
	private int fileSize = 0; // 文件大小
	private DownlaodSqlTool sqlTool = null; // 文件信息保存的数据库操作类
	private DownloadComplated downloadComplated = null;
	private int totalCompelete = 0;// 所有线程已下载的总数
	private List<DownloadThread> threads = null; // 下载线程
	private Handler handler = null;

	// 利用枚举表示下载的几种状态
	private enum Download_State {
		Downloading, Pause, Ready, Compeleted, Exception;
	}

	private Download_State state = Download_State.Ready; // 当前下载状态

	/**
	 * @param context
	 *            上下文对象
	 * @param downloadComplated
	 */
	public DownloadHttpTool(Context context, Handler handler,
			DownloadComplated downloadComplated) {
		super();
		this.mContext = context;
		this.handler = handler;
		this.downloadComplated = downloadComplated;
		sqlTool = DownlaodSqlTool.getInstance(mContext);
		if ("".equals(filePath)) {
			// TODO 根据有无sdcard设置路径
			filePath = Environment.getExternalStorageDirectory()
					.getAbsolutePath() + "/meiriq-download";
		}
		threads = new ArrayList<DownloadThread>();
	}

	/**
	 * 开始下载
	 * 
	 * @param url
	 *            下载地址
	 */
	public void start(String urlstr) {
		this.urlstr = urlstr;
		String[] ss = urlstr.split("/");
		fileName = ss[ss.length - 1];
		fileNameTmp = fileName + FILE_TMP_SUFFIX;

		new AsyncTask<Void, Void, Void>() {

			@Override
			protected Void doInBackground(Void... arg0) {
				// 下载之前首先异步线程调用ready方法做下载的准备工作
				ready();
				Message msg = new Message();
				msg.what = 1;
				msg.arg1 = fileSize;
				msg.obj = DownloadHttpTool.this.urlstr;
				handler.sendMessage(msg);
				return null;
			}

			@Override
			protected void onPostExecute(Void result) {
				super.onPostExecute(result);
				// 开始下载
				startDownload();
			}
		}.execute();
	}

	/** 在开始下载之前需要调用ready方法进行配置 */
	private void ready() {
		if (new File(filePath + "/" + fileName).exists()) {
			downloadComplated.onComplated(urlstr);
			return;
		}
		totalCompelete = 0;
		downloadInfos = sqlTool.getInfos(urlstr);
		if (downloadInfos.size() == 0) { // 数据库中没有相关信息
			initFirst();
		} else {
			File file = new File(filePath + "/" + fileNameTmp);
			if (!file.exists()) {
				sqlTool.delete(urlstr);
				initFirst();
			} else {
				fileSize = downloadInfos.get(downloadInfos.size() - 1)
						.getEndPos();
				for (DownloadInfo info : downloadInfos) {
					totalCompelete += info.getCompeleteSize();
				}
			}
		}
	}

	/** 开始下载 */
	private void startDownload() {
		if (downloadInfos != null) {
			if (state == Download_State.Downloading) {
				return;
			}
			state = Download_State.Downloading;
			for (DownloadInfo info : downloadInfos) { // 开启线程下载
				DownloadThread thread = new DownloadThread(info.getThreadId(),
						info.getStartPos(), info.getEndPos(),
						info.getCompeleteSize(), info.getUrl());
				thread.start();
				threads.add(thread);
			}
		}
	}

	/** 暂停当前下载任务 */
	public void pause() {
		state = Download_State.Pause;
	}

	/** 删除当前下载任务 */
	public void delete() {
		compeleted();
		File file = new File(filePath + "/" + fileNameTmp);
		file.delete();
	}

	/** 完成下载 */
	private void compeleted() {
		state = Download_State.Compeleted;
		sqlTool.delete(urlstr);
		downloadComplated.onComplated(urlstr);
	}

	/** 获取目标文件大小 */
	public int getFileSize() {
		return fileSize;
	}

	/** 获取当前下载的大小 */
	public int getTotalCompeleteSize() {
		return totalCompelete;
	}

	/** 第一次下载时进行的初始化 */
	private void initFirst() {
		URL url = null;
		RandomAccessFile accessFile = null;
		HttpURLConnection connection = null;
		try {
			url = new URL(urlstr);
			connection = (HttpURLConnection) url.openConnection();
			connection.setConnectTimeout(5000);
			connection.setRequestMethod("GET");
			fileSize = connection.getContentLength();
			if (fileSize < 0) {
				return;
			}

			File fileParent = new File(filePath);
			if (!fileParent.exists()) {
				fileParent.mkdir();
			}
			File file = new File(fileParent, fileNameTmp);
			if (!file.exists()) {
				file.createNewFile();
			}
			// 随机访问文件
			accessFile = new RandomAccessFile(file, "rwd");
			accessFile.setLength(fileSize);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (accessFile != null) {
				try {
					accessFile.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (connection != null) {
				connection.disconnect();
			}
		}
		// 计算每个线程需要下载的大小
		int range = fileSize / THREAD_COUNT;
		// 保存每个线程的下载信息
		downloadInfos = new ArrayList<DownloadInfo>();
		for (int i = 0; i < THREAD_COUNT - 1; i++) {
			DownloadInfo info = new DownloadInfo(i, i * range, (i + 1) * range
					- 1, 0, urlstr);
			downloadInfos.add(info);
		}
		// 最后一个线程和前面的处理有点不一样
		DownloadInfo info = new DownloadInfo(THREAD_COUNT - 1,
				(THREAD_COUNT - 1) * range, fileSize - 1, 0, urlstr);
		downloadInfos.add(info);
		// 插入到数据库
		sqlTool.insertInfos(downloadInfos);
	}

	interface DownloadComplated {

		/**
		 * 下载完成回调
		 * 
		 * @param urlString
		 */
		void onComplated(String urlString);

	}

	/** 自定义下载线程 */
	private class DownloadThread extends Thread {

		private int threadId = 0; // 线程Id
		private int startPos = 0; // 在文件中的开始的位置
		private int endPos = 0; // 在文件中的结束的位置
		private int compeleteSize = 0; // 已完成下载的大小
		private String urlstr = ""; // 下载地址

		/**
		 * 
		 * @param threadId
		 *            线程Id
		 * @param startPos
		 *            在文件中的开始的位置
		 * @param endPos
		 *            在文件中的结束的位置
		 * @param compeleteSize
		 *            已完成下载的大小
		 * @param urlstr
		 *            下载地址
		 */
		public DownloadThread(int threadId, int startPos, int endPos,
				int compeleteSize, String urlstr) {
			this.threadId = threadId;
			this.startPos = startPos;
			this.endPos = endPos;
			this.urlstr = urlstr;
			this.compeleteSize = compeleteSize;
		}

		@Override
		public void run() {
			HttpURLConnection connection = null;
			RandomAccessFile randomAccessFile = null;
			InputStream is = null;
			try {
				randomAccessFile = new RandomAccessFile(filePath + "/"
						+ fileNameTmp, "rwd");
				randomAccessFile.seek(startPos + compeleteSize);
				URL url = new URL(urlstr);
				connection = (HttpURLConnection) url.openConnection();
				connection.setConnectTimeout(5000);
				connection.setRequestMethod("GET");
				// 设置请求的数据的范围
				connection.setRequestProperty("Range", "bytes="
						+ (startPos + compeleteSize) + "-" + endPos);
				is = connection.getInputStream();
				byte[] buffer = new byte[6 * 1024]; // 6K的缓存
				int length = -1;
				while ((length = is.read(buffer)) != -1) {
					randomAccessFile.write(buffer, 0, length); // 写缓存数据到文件
					compeleteSize += length;
					synchronized (this) { // 加锁保证已下载的正确性
						totalCompelete += length;
						Message msg = new Message();
						msg.what = 0;
						msg.arg1 = length;
						msg.arg2 = totalCompelete;
						msg.obj = urlstr;
						handler.sendMessage(msg);
					}
					// 非正在下载状态时跳出循环
					if (state != Download_State.Downloading) {
						break;
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("异常退出____" + urlstr);
				state = Download_State.Exception;
			} finally {
				// 不管发生了什么事，都要保存下载信息到数据库
				sqlTool.updataInfos(threadId, compeleteSize, urlstr);
				if (threads.size() == 1) { // 当前线程是此url对应下载任务唯一一个正在执行的线程
					try {
						if (is != null) {
							is.close();
						}
						if (randomAccessFile != null) {
							randomAccessFile.close();
						}
						if (connection != null) {
							connection.disconnect();
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					if (state == Download_State.Downloading) { // 此时此线程的下载任务正常完成（没有被人为或异常中断）
						File file = new File(filePath + "/" + fileNameTmp);
						file.renameTo(new File(filePath + "/" + fileName));
					}
					if (state != Download_State.Pause) {
						compeleted();
					}
				}
				threads.remove(this);
			}
		}
	}
}
```

一个 `DownloadHttpTool` 的实例表示一个下载任务，一个下载任务中可以有多个下载线程，可以通过修改常量 `THREAD_COUNT` 的方式修改一个下载任务的下载线程数。文件的保存路径是在 `sdcard` 中的 `meiriq-download` 文件夹，也可以修改到其他路径。

此类中在下载开始的时候首先会执行 `ready()` 方法获取文件相关的信息，之后执行 `startDownload()` 开启下载线程执行下载。

下载时使用 `HttpURLConnection` 类的 `setRequestProperty` 方法指定请求头字段实现文件的随机下载（下载从某一个点开始到某一个点结束之际的内容），使用 `RandomAccessFile` 实现文件的随机访问（可以从某一个点开始写入数据）。

为了保证下载速度，写入数据库的操作并不是每次写入文件之后都执行，而是在下载出现异常或者暂停等操作之后才写入数据库。所有下载任务全部结束后执行关闭数据流等操作。

### DownloadUtil.java

```java
package com.example.test;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import android.content.Context;
import android.os.Handler;
import android.os.Message;

import com.example.test.DownloadHttpTool.DownloadComplated;

/**
 * 将下载方法封装在此类 提供开始、暂停、删除以及重置的方法。<br>
 * 通过修改常量{@link DownloadUtil#MAX_COUNT}可改变最大并行下载任务量
 * 
 * @author shichaohui@meiriq.com
 */
public class DownloadUtil {

	private static DownloadUtil instance = null;
	private Context context = null;
	private List<String> downloadList = null;
	private Map<String, DownloadHttpTool> downloadMap = null;
	private int currentUrlIndex = -1;
	private final int MAX_COUNT = 2; // 最大并行下载量
	private int currentCount = 0; // 当前并行下载量
	private final String FLAG_FREE = "free"; // 标记downloadMap中空闲的DownloadHttpTool实例
	private OnDownloadListener onDownloadListener = null;

	private Handler mHandler = new Handler() {

		@Override
		public void handleMessage(Message msg) {
			super.handleMessage(msg);
			String url = msg.obj.toString();
			if (msg.what == 0) {
				if (onDownloadListener != null) {
					onDownloadListener
							.downloadProgress(url, msg.arg2, msg.arg1);
				}
			} else if (msg.what == 1) {
				if (onDownloadListener != null) {
					onDownloadListener.downloadStart(url, msg.arg1);
				}
			} else if (msg.what == 2) {
				onDownloadListener.downloadEnd(url);
			}
		}

	};

	private DownloadUtil(Context context) {
		this.context = context;
		downloadList = new ArrayList<String>();
		downloadMap = new HashMap<String, DownloadHttpTool>();
	}

	private static synchronized void syncInit(Context context) {
		if (instance == null) {
			instance = new DownloadUtil(context);
		}
	}

	public static DownloadUtil getInstance(Context context) {
		if (instance == null) {
			syncInit(context);
		}
		return instance;
	}

	/**
	 * 下载之前的准备工作，并自动开始下载
	 * 
	 * @param context
	 */
	public void prepare(String urlString) {
		downloadList.add(urlString);
		if (currentCount < MAX_COUNT) {
			start();
		} else {
			System.out.println("等待下载____" + urlString);
		}
	}

	/**
	 * 开始下载
	 */
	private synchronized void start() {
		if (++currentUrlIndex >= downloadList.size()) {
			currentUrlIndex--;
			return;
		}
		currentCount++;
		String urlString = downloadList.get(currentUrlIndex);
		System.out.println("开始下载____" + urlString);
		DownloadHttpTool downloadHttpTool = null;
		if (downloadMap.size() < MAX_COUNT) { // 保证downloadMap.size() <= 2
			downloadHttpTool = new DownloadHttpTool(context, mHandler,
					downloadComplated);
			if (downloadMap.containsKey(urlString)) {
				downloadMap.remove(urlString);
			}
			downloadMap.put(urlString, downloadHttpTool);
		} else {
			downloadHttpTool = downloadMap.get(FLAG_FREE);
			downloadMap.remove(FLAG_FREE);
			downloadMap.put(urlString, downloadHttpTool);
		}
		downloadHttpTool.start(urlString);
	}

	/** 暂停当前下载任务 */
	public void pause(String urlString) {
		paused(urlString, new Paused() {

			@Override
			public void onPaused(DownloadHttpTool downloadHttpTool) {
				downloadHttpTool.pause();
			}
		});
	}

	/** 暂停所有的下载任务 */
	public void pauseAll() {
		// 如果需要边遍历集合边删除数据，需要从后向前遍历，否则会出异常（Caused by:
		// java.util.ConcurrentModificationException）
		String[] keys = new String[downloadMap.size()];
		downloadMap.keySet().toArray(keys);
		for (int i = keys.length - 1; i >= 0; i--) {
			pause(keys[i]);
		}
		instance = null;
	}

	/**
	 * 恢复当前下载任务
	 * 
	 * @param urlString
	 *            要恢复下载的文件的地址
	 */
	public void resume(String urlString) {
		prepare(urlString);
	}

	/** 恢复所有的下载任务 */
	public void resumeAll() {
		for (Entry<String, DownloadHttpTool> entity : downloadMap.entrySet()) {
			prepare(entity.getKey());
		}
	}

	/** 删除当前下载任务 */
	public void delete(String urlString) {
		boolean bool = paused(urlString, new Paused() {

			@Override
			public void onPaused(DownloadHttpTool downloadHttpTool) {
				downloadHttpTool.pause();
				downloadHttpTool.delete();
			}
		});
		if (!bool) { // 下载任务不存在，直接删除临时文件
			File file = new File(DownloadHttpTool.filePath + "/"
					+ urlString.split("/")[urlString.split("/").length - 1]
					+ DownloadHttpTool.FILE_TMP_SUFFIX);
			System.out.println(file.delete());
		}
	}

	interface Paused {

		void onPaused(DownloadHttpTool downloadHttpTool);

	}

	/**
	 * 暂停
	 * 
	 * @param urlString
	 * @param paused
	 * @return 下载任务是否存在的标识
	 */
	private boolean paused(String urlString, Paused paused) {
		if (downloadMap.containsKey(urlString)) {
			currentCount--;
			DownloadHttpTool downloadHttpTool = downloadMap.get(urlString);
			paused.onPaused(downloadHttpTool);
			if (!downloadMap.containsKey(FLAG_FREE)) { // 保证key == FLAG_FREE的数量
														// = 1
				downloadMap.put(FLAG_FREE, downloadHttpTool);
			}
			downloadMap.remove(urlString);
			start();
			return true;
		}
		return false;
	}

	DownloadComplated downloadComplated = new DownloadComplated() {

		@Override
		public void onComplated(String urlString) {
			System.out.println("下载完成____" + urlString);
			Message msg = new Message();
			msg.what = 2;
			msg.obj = urlString;
			mHandler.sendMessage(msg);
			pause(urlString);
			// 满足此条件说明全部下载结束
			if (downloadMap.size() == 1 && downloadMap.containsKey(FLAG_FREE)) {
				System.out.println("全部下载结束");
			}
		}
	};

	/** 设置下载监听 */
	public void setOnDownloadListener(OnDownloadListener onDownloadListener) {
		this.onDownloadListener = onDownloadListener;
	}

	/** 下载回调接口 */
	public interface OnDownloadListener {

		/**
		 * 下载开始回调接口
		 * 
		 * @param url
		 * @param fileSize
		 *            目标文件大小
		 */
		public void downloadStart(String url, int fileSize);

		/**
		 * 下载进度回调接口
		 * 
		 * @param
		 * @param downloadedSize
		 *            已下载大小
		 * @param lenth
		 *            本次下载大小
		 */
		public void downloadProgress(String url, int downloadedSize, int length);

		/**
		 * 下载完成回调
		 * 
		 * @param url
		 */
		public void downloadEnd(String url);

	}

}
```

一个单例的类封了**开始**、**暂停**、**继续**、**删除**等下载任务相关操作方法，管理所有下载任务；利用 `Handler` 实现下载进度等信息的更新；常量 `FLAG_FREE` 标识空闲下载任务；可通过修改常量 `MAX_COUNT` 的值的方式修改最大并行下载任务数。

该类管理下载任务的方式：获取该类实例后调用 `prepare(String urlString)` 方法添加下载任务，如果没有达到最大并行下载数，则会执行 `start()` 开始下载，否则等待其他下载任务下载完成后下载；当一个任务被暂停、删除或者下载完成后执行 `start()` 开始新的下载。集合 `downloadMap` 保存所有的下载任务，最多 `MAX_COUNT` 个。当一个下载任务完成后 `downloadMap` 中对应的下载任务变为 `FLAG_FREE` 以便后来的任务重复使用，如果 `FLAG_FREE` 的任务已存在则直接删除此任务。

### MainActivity.java 

```java
package com.example.test;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Timer;
import java.util.TimerTask;

import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.example.test.DownloadUtil.OnDownloadListener;

public class MainActivity extends FragmentActivity implements OnClickListener {

	private ListView listView = null;
	private List<String> urls = null;
	private DownloadUtil downloadUtil = null;
	private final String TAG_PROGRESS = "_progress";
	private final String TAG_TOTAL = "_total";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		listView = (ListView) findViewById(R.id.listview);

		urls = new ArrayList<String>();
		urls.add("http://pc1.gamedog.cn/big/game/dongzuo/102631/shenmiaotw2_yxdog.apk");
		urls.add("http://pc1.gamedog.cn/big/game/yizhi/67450/baoweiluobo_an_yxdog.apk");
		urls.add("http://pc1.gamedog.cn/big/game/yizhi/161623/zhiwudzjs2gqb_an.apk");

		listView.setAdapter(myAdapter);

		downloadUtil = DownloadUtil.getInstance(this);

		downloadUtil.setOnDownloadListener(new OnDownloadListener() {

			String text = "已下载%sM / 共%sM \n占比%s  \n下载速度%skb/s";
			DecimalFormat decimalFormat = new DecimalFormat("#.##"); // 小数格式化
			Timer timer = null;
			Map<String, DownloadingInfo> downloadingInfos = new HashMap<String, DownloadingInfo>();

			@Override
			public void downloadStart(String url, int fileSize) {
				DownloadingInfo info = new DownloadingInfo();
				info.setFileSize(fileSize);
				downloadingInfos.put(url, info);
				((ProgressBar) listView.findViewWithTag(url + TAG_PROGRESS))
						.setMax(fileSize);
			}

			@Override
			public synchronized void downloadProgress(String url,
					int downloadedSize, int length) {
				DownloadingInfo info = downloadingInfos.get(url);
				if (info != null) {
					((ProgressBar) listView.findViewWithTag(url + TAG_PROGRESS))
							.setProgress(downloadedSize);
					((TextView) listView.findViewWithTag(url + TAG_TOTAL)).setText(String.format(
							text,
							decimalFormat
									.format(downloadedSize / 1024.0 / 1024.0),
							decimalFormat.format(info.getFileSize() / 1024.0 / 1024.0),
							(int) (((float) downloadedSize / (float) info
									.getFileSize()) * 100) + "%", info
									.getKbps()));
					info.setSecondSize(info.getSecondSize() + length);
				}
				if (timer == null) {
					timer = new Timer();
					timer.schedule(new TimerTask() {

						@Override
						public void run() {
							DownloadingInfo info = null;
							for (Entry<String, DownloadingInfo> entry : downloadingInfos
									.entrySet()) {
								info = entry.getValue();
								if (info != null) {
									info.setKbps(decimalFormat.format(info
											.getSecondSize() / 1024.0));
									info.setSecondSize(0);
								}
							}
						}
					}, 0, 1000);
				}
			}

			@Override
			public void downloadEnd(String url) {
				DownloadingInfo info = downloadingInfos.get(url);
				if (info != null) {
					((ProgressBar) listView.findViewWithTag(url + TAG_PROGRESS))
							.setProgress(info.getFileSize());
					((TextView) listView.findViewWithTag(url + TAG_TOTAL))
							.setText(String.format(
									text,
									decimalFormat.format(info.getFileSize() / 1024.0 / 1024.0),
									decimalFormat.format(info.getFileSize() / 1024.0 / 1024.0),
									"100%", info.getKbps()));
					downloadingInfos.remove(url);
				}
			}

		});

	}

	BaseAdapter myAdapter = new BaseAdapter() {

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {

			Holder holder = null;
			if (convertView == null) {
				convertView = LayoutInflater.from(MainActivity.this).inflate(
						R.layout.list_item, null);
				holder = new Holder();
				holder.tv_url = (TextView) convertView.findViewById(R.id.url);
				holder.progressBar = (ProgressBar) convertView
						.findViewById(R.id.progressBar);
				holder.textView_total = (TextView) convertView
						.findViewById(R.id.textView_total);
				holder.button_start = (Button) convertView
						.findViewById(R.id.button_start);
				holder.button_pause = (Button) convertView
						.findViewById(R.id.button_pause);
				holder.button_resume = (Button) convertView
						.findViewById(R.id.button_resume);
				holder.button_delete = (Button) convertView
						.findViewById(R.id.button_delete);

				convertView.setTag(holder);

				setClick(holder);

			} else {
				holder = (Holder) convertView.getTag();
			}

			holder.tv_url.setText(urls.get(position));

			holder.progressBar.setTag(urls.get(position) + TAG_PROGRESS);
			holder.textView_total.setTag(urls.get(position) + TAG_TOTAL);
			holder.button_start.setTag(urls.get(position));
			holder.button_pause.setTag(urls.get(position));
			holder.button_resume.setTag(urls.get(position));
			holder.button_delete.setTag(urls.get(position));

			return convertView;
		}

		private void setClick(Holder holder) {
			holder.button_start.setOnClickListener(MainActivity.this);
			holder.button_pause.setOnClickListener(MainActivity.this);
			holder.button_resume.setOnClickListener(MainActivity.this);
			holder.button_delete.setOnClickListener(MainActivity.this);
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public Object getItem(int position) {
			return urls.get(position);
		}

		@Override
		public int getCount() {
			return urls.size();
		}

		class Holder {
			TextView tv_url = null;
			ProgressBar progressBar = null;
			TextView textView_total = null;
			Button button_start = null;
			Button button_pause = null;
			Button button_resume = null;
			Button button_delete = null;
		}
	};

	@Override
	public void onClick(View view) {
		String url = view.getTag() == null ? "" : view.getTag().toString();
		switch (view.getId()) {
		case R.id.button_start:
			downloadUtil.prepare(url);
			break;
		case R.id.button_pause:
			downloadUtil.pause(url);
			break;
		case R.id.button_resume:
			downloadUtil.resume(url);
			break;
		case R.id.button_delete:
			downloadUtil.delete(url);
			break;

		default:
			break;
		}
	}

}
```

使用 `ListView` 展示待下载任务列表。使用 `List<String>` 集合 urls 保存下载地址。使用 `View.setTag(url+TAG_PROGRESS/TAG_TOTAL)` 的方式标记各个任务对应的 `View` 。在显示数据的时候使用 `findViewWithTag(url+TAG_PROGRESS/TAG_TOTAL)` 的方式取得对应的 `View` ；使用 `Timer` 定时器，每隔1s刷新一次下载速度。

### activity_main.xml

```xml
<LinearLayout xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <ListView 
        android:id="@+id/listview"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

</LinearLayout>
```

### list_item.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="10dp" >

    <TextView
        android:id="@+id/url"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/url" />

    <TextView
        android:id="@+id/textView_total"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/progressBar"
        android:layout_margin="10dp"
        android:lines="3"
        android:text="下载进度" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/textView_total" >

        <Button
            android:id="@+id/button_start"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="开始"
            android:textSize="12sp" />

        <Button
            android:id="@+id/button_pause"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="暂停"
            android:textSize="12sp" />

        <Button
            android:id="@+id/button_resume"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="继续"
            android:textSize="12sp" />

        <Button
            android:id="@+id/button_delete"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="删除"
            android:textSize="12sp" />
    </LinearLayout>

</RelativeLayout>
```

最后添加连接网络和操作 `sdcard` 的权限：

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

此代码是使用数据库和 `RandomAccessFile` 类实现断点下载，除此方法外，还可以用临时文件的方式实现断点下载，具体方法：同以上代码使用`HttpURLConnection` 和 `setRequestProperty` 方法实现文件的部分下载，然后每一部分保存为一个临时文件，待全部下载完成后，将所有相关临时文件写入到一个文件，并删除临时文件即可。