---
title: Android 使用 AIDL 实现进程间通信
date: 2015-11-04 16:59
tags:
 - Android
 - AIDL
categories:
 - Android
---

# Android 使用 AIDL 实现进程间通信

<div style="color: #999999; font-size: 12px;">
    <span>创建时间：2015-11-04 16:59</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>更新时间：2015-11-04 16:59</span>
</div>
<br/>

> `AIDL`(Android Interface Definition Language) 是一种 `IDL` 语言，用于生成可以在 `Android` 设备上两个进程之间进行进程间通信（`IPC`）的代码。

*以下的文件创建过程是基于Android Studio。*

## 1. 创建.aidl 文件

该文件结构类似与 `Java` 中的接口，定义了可用的方法和数据的接口。

右键点击程序包 --> `new` --> `AIDL` --> `AIDL File` 创建 `IMyAidlInterface.aidl` 文件，这时` Android Studio` 会自动创建一个和 `java` 同级的目录 `aidl`，并在此目录下生成包和 `.aidl` 文件。如图：

![.aidl文件所在目录结构](https://img-blog.csdnimg.cn/img_convert/2ccc3345299eb0fa87d62777e3a002d0.png)

现在定义一个求和的方法，修改后的 `IMyAidlInterface` 文件如下：

```java
package ***.***.***;

interface IMyAidlInterface {

    int sum(int a, int b);

}
```

## 2. 生成 .aidl 文件对应的 .java 文件

通过 Build --> Rebuild Project 重新构建项目生成.aidl文件对应的.java文件，如图所示：

![对应的.java文件所在目录结构](https://img-blog.csdnimg.cn/img_convert/7ca148e6c95ba037a144a466b95de00b.png)

## 3. 创建共享Service

创建一个 `Service` 用于和其他进程共享数据和方法

```java
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.os.RemoteException;

public class MyService extends Service {

    public MyService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
       return mBinder;
    }

    IMyAidlInterface.Stub mBinder = new IMyAidlInterface.Stub() {

        @Override
        public int sum(int a, int b) throws RemoteException {
            return a+b;
        }

    };

}
```

`Stub` 是生成 `IMyAidlInterface.java` 时自动生成的一个抽象内部类，继承自 `Binder`。

由于在其他进程中并不能知道这个 `Service` 的名字，所以启动这个 `Service` 的时候需要使用隐式的 `Intent`，因此需要给 `Service` 添加过滤器：

```xml
<service
    android:name=".MyService"
    android:enabled="true"
    android:exported="true">
    <intent-filter>
        <action android:name="com.mm.action.aidl" />
    </intent-filter>
</service>
```

然后在启动 `Service` 的时候使用 `com.mm.action.aidl` 作为 `Action` 即可。

## 4. 启动共享 Service

```java
ServiceConnection connection = new ServiceConnection() {
    @Override
    public void onServiceConnected(ComponentName name, IBinder service) {
        // 获取定义的接口
        IMyAidlInterface aidlInterface = IMyAidlInterface.Stub.asInterface(service);
        try {
            // 调用接口中的方法
            System.out.println(aidlInterface.sum(100, 3));
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onServiceDisconnected(ComponentName name) {
    }
};

// 使用bindService启动Service
bindService(new Intent("com.mm.action.aidl"), connection, BIND_AUTO_CREATE);
```

有了以上的这些配置，就能先运行当前项目测试一下了，如果能正确打印数字的和，则以上配置就没有问题了。

## 5. 在其他项目中共享 Service

新建一个项目，拷贝上面的 `.aidl` 文件到项目的同名目录下，然后 `Rebuild` 一下生成对应的 `.java` 文件，然后根据上面启动 `Service` 的方法启动即可。发布应用时，共享 `Service` 的APK要使用同一个签名，否则无法正常共享。

## 6. 传递复杂对象

### 6.1 

使用 `AIDL` 可以直接传递基本数据类型（`int` `long` `float` `double`）、`String`、`List` 和 `Map`，如果要传递复杂对象，需要使该对象实现 `Parcelable` 接口，并创建同名的 `.aidl` 文件。

现在我们创建 `Person.aidl` 和 `Person.java`

#### Person.aidl：

```aidl
package ***;

parcelable Person;

```

#### Person.java ：

```java
import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by shichaohui on 15/11/4.
 */
public class Person implements Parcelable {

    String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.name);
    }

    public Person() {
    }

    protected Person(Parcel in) {
        this.name = in.readString();
    }

    public static final Creator<Person> CREATOR = new Creator<Person>() {
        public Person createFromParcel(Parcel source) {
            return new Person(source);
        }

        public Person[] newArray(int size) {
            return new Person[size];
        }
    };
}
```

### 6.2 

修改 `IMyAidlInterface.aidl`，添加一个获取 `Person` 的方法，修改后的 `IMyAidlInterface.aidl` 文件：

```java
import com.***.androidtest.Person;

interface IMyAidlInterface {

    int sum(int a, int b);

    Person getPerson();
}
```

这里一定要记得 `import Person.java` 所在的包，不然会构建失败。

### 6.3 

修改 `MyService`，实现 `getPerson()` 方法：

```java
public class MyService extends Service {

    ...

    IMyAidlInterface.Stub mBinder = new IMyAidlInterface.Stub() {

       ...

        @Override
        public Person getPerson() throws RemoteException {
            Person person = new Person();
            person.setName("nammmmme");
            return person;
        }

    };

}
```

最后就可以和使用 `sum()` 方法一样使用 `getPerson()` 方法了。