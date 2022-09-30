---
title: Retrofit2.0 使用详解
date: 2015-10-20 18:15
tags:
 - Java
 - Retrofit
 - RxJava
categories:
 - Java
---

[Retrofit2.0 项目主页](https://github.com/square/retrofit)

[Retrofit2.0 官方文档](http://square.github.io/retrofit/)

## 简介

`Retrofit` 是由[Square公司](https://github.com/square)出品的针对于 `Android` 和 `Java` 的类型安全的 `Http` 客户端，网络服务基于[OkHttp](https://github.com/square/okhttp) 。

[Retrofit2.0: 有史以来最大的改进](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0915/3460.html)

## 使用 Retrofit2.0

[下载 v2.0.0-beta2 JAR](http://repo1.maven.org/maven2/com/squareup/retrofit/retrofit/2.0.0-beta2/retrofit-2.0.0-beta2.jar)

### Gradle :

```
compile 'com.squareup.retrofit:retrofit:2.0.0-beta2'
```

### Maven :

```
<dependency>
  <groupId>com.squareup.retrofit</groupId>
  <artifactId>retrofit</artifactId>
  <version>2.0.0-beta2</version>
</dependency>
```

## 用法介绍

转换 `HTTP API` 为 `Java` 接口

```java
public interface GitHubService {
  @GET("users/{user}/repos")
  Call<List<Repo>> listRepos(@Path("user") String user);
}
```

使用类 `Retrofit` 生成接口 `GitHubService` 的实现

```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.github.com/")
    .build();

GitHubService service = retrofit.create(GitHubService.class);
```

之后就可以直接调用生成的 `GitHubServcie` 实例去发送同步或异步的请求给Web服务器

```java
Call<List<Repo>> repos = service.listRepos("octocat");
```

`baseUrl` 和注解中 `url` 连接的 `/` 最好写在 `baseUrl` 的后面，而不是注解中 `url` 的前面，否则可能会出现不可预知的错误。

## API 声明

接口函数的注解和参数表明如何去处理请求

### 请求方法

每一个函数都必须有提供请求方式和相对 `URL` 的 `Http` 注解，`Retrofit` 提供了 5 种内置的注解：`GET`、`POST`、`PUT`、`DELETE` 和 `HEAD`，在注解中指定的资源的相对 `URL` 。

```java
@GET("users/list")
```

也可以在 `URL` 中指定查询参数

```
@GET("users/list?sort=desc")
```

### URL处理

请求的 `URL` 可以在函数中使用替换块和参数进行动态更新，替换块是 `{ and }` 包围的字母数字组成的字符串，相应的参数必须使用相同的字符串被 `@Path` 进行注释。

```java
@GET("group/{id}/users")
List<User> groupList(@Path("id") int groupId);
```

也可以添加查询参数

```java
@GET("group/{id}/users")
List<User> groupList(@Path("id") int groupId, @Query("sort") String sort);
```

复杂的查询参数可以使用 `Map` 进行组合

```java
@GET("group/{id}/users")
List<User> groupList(@Path("id") int groupId, @QueryMap Map<String, String> options);
```

### 请求体

可以通过 `@Body` 注解指定一个对象作为 `Http` 请求的请求体。

```java
@POST("users/new")
Call<User> createUser(@Body User user);
```

该对象将会被 `Retroofit` 实例指定的转换器转换，如果没有添加转换器，则只有 `RequestBody` 可用。（转换器的添加在后面介绍）

### FORM ENCODED 和 MULTIPART

函数也可以声明为发送 `form-encoded` 和 `multipart` 数据。

当函数有 `@FormUrlEncoded` 注解的时候，将会发送 `form-encoded` 数据，每个键-值对都要被含有名字的 `@Field` 注解和提供值的对象所标注。

```java
@FormUrlEncoded
@POST("user/edit")
Call<User> updateUser(@Field("first_name") String first, @Field("last_name") String last);
```

当函数有 `@Multipart` 注解的时候，将会发送 `multipart` 数据，Parts都使用 `@Part` 注解进行声明。

```java
@Multipart
@PUT("user/photo")
Call<User> updateUser(@Part("photo") RequestBody photo, @Part("description") RequestBody description);
```

`Multipart` `parts` 要使用 `Retrofit` 的众多转换器之一或者实现 `RequestBody` 来处理自己的序列化。

### Header处理

可以使用 `@Headers` 注解给函数设置静态的 `header`。

```java
@Headers("Cache-Control: max-age=640000")
@GET("widget/list")
Call<List<Widget>> widgetList();
```

```java
@Headers({
    "Accept: application/vnd.github.v3.full+json",
    "User-Agent: Retrofit-Sample-App"
})
@GET("users/{username}")
Call<User> getUser(@Path("username") String username);
```

需要注意的是：`header` 不能被互相覆盖。所有具有相同名字的 `header` 将会被包含到请求中。

可以使用 `@Header` 注解动态的更新一个请求的 `header`。必须给 `@Header` 提供相应的参数，如果参数的值为空 `header` 将会被忽略，否则就调用参数值的 `toString()` 方法并使用返回结果。

```java
@GET("user")
Call<User> getUser(@Header("Authorization") String authorization)
```

使用[OkHttp拦截器](https://github.com/square/okhttp/wiki/Interceptors)可以指定需要的 `header` 给每一个 `Http` 请求。

```java
OkHttpClient client = new OkHttpClient();
client.networkInterceptors().add(new Interceptor() {
    @Override
    public com.squareup.okhttp.Response intercept(Chain chain) throws IOException {

        com.squareup.okhttp.Response response = chain.proceed(chain.request());

        // Do anything with response here

        return response;
    }
});
Retrofit retrofit = new Retrofit.Builder()
        .baseUrl(BASE_URL)
        ...
        .client(client)
        .build();
```

### 同步 VS 异步

每一个 `Call` 实例可以同步（`call.excute()`）或者异步（`call.enquene(CallBack<?> callBack`）的被执行，每一个实例仅仅能够被使用一次，但是可以通过 `clone()` 函数创建一个新的可用的实例。

也可以使用 `CallBack` 定义一个异步方法：

```java
@GET("user/{id}/photo")
void getUserPhoto(@Path("id") int id, Callback<Photo> cb);
```

在 `Android` 上，回调被执行在主线程；在 `JVM` 上，回调被执行在发送 `Http` 请求的线程。

## Retrofit 配置

`Retrofit` 是通过 `API` 接口转换成的可调用的对象，默认有一些合理的配置，这些配置也可以进行定制。

### 转换器

默认情况下，`Retrofit` 只能够反序列化 `Http` 体为 `OkHttp` 的 `ResponseBody` 类型，并且只能够接受 `ResponseBody` 类型的参数作为 `@body`。

添加转换器可以支持其他的类型，为了方便的适应流行的序列化库，`Retrofit` 提供了六个兄弟模块：

* [Gson](https://github.com/google/gson) : com.squareup.retrofit:converter-gson
* [Jackson](http://wiki.fasterxml.com/JacksonHome): com.squareup.retrofit:converter-jackson
* [Moshi](https://github.com/square/moshi/): com.squareup.retrofit:converter-moshi
* [Protobuf](https://developers.google.com/protocol-buffers/): com.squareup.retrofit:converter-protobuf
* [Wire](https://github.com/square/wire): com.squareup.retrofit:converter-wire
* [Simple XML](http://simple.sourceforge.net/): com.squareup.retrofit:converter-simplexml

### 自定义转换器

如果需要使用 `Retrofit` 不支持开箱即用的内容格式(如`YAML`、`txt`、自定义格式)和 `API` 进行通信，或者想要使用不同的库实现已经存在的格式，你可以很方便的创建自己的转换器。创建方式：新建一个类继承[Converter.Factory](https://github.com/square/retrofit/blob/master/retrofit/src/main/java/retrofit/Converter.java)类，并在构建 `Retrofit` 实例时传入转换器实例。

```java
 Retrofit retrofit = new Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addCallAdapterFactory(RxJavaCallAdapterFactory.create()) // 使用RxJava作为回调适配器
        .addConverterFactory(GsonConverterFactory.create()) // 使用Gson作为数据转换器
        .build();
```

使用 [RxJava](https://github.com/ReactiveX/RxJava和 `Gson` 转换器需要添加依赖。

```java
// Retrofit适配RxJava
compile 'com.squareup.retrofit:adapter-rxjava:2.0.0-beta1'
// Retrofit Gson数据转换器
compile 'com.squareup.retrofit:converter-gson:2.0.0-beta1'
```

## 配合 RxJava 使用

在 `Rxjava` 下，你可以用 `Observable` 定义异步函数：

```java
@GET("user/{id}/photo")
Observable<Photo> getUserPhoto(@Path("id") int id);
```

现在你可以做很多事情，不光可以获取数据还可以改变数据。

`Retrofit` 支持 `Observable` 导致了将多个 `REST` 调用组合在一起变得简单了。例如，我们有一个调用去获取照片，第二个调用去获取原生数据，我们可以将结果一起打包。

```java
Observable.zip(
    service.getUserPhoto(id),
    service.getPhotoMetadata(id),
    (photo, metadata) -> createPhotoWithData(photo, metadata))
    .subscribe(photoWithData -> showPhoto(photoWithData));
```

通过 `RxJava` + `Retrofit` 可以让多个 `REST` 调用组合成一个变得更简单。

[RxJava项目主页](https://github.com/ReactiveX/RxJava)

[RxAndroid项目主页](https://github.com/ReactiveX/RxAndroid)

#### RxJava 教程

* [给 Android 开发者的 RxJava 详解](http://gank.io/post/560e15be2dca930e00da1083#toc_12)
* [深入浅出RxJava（一：基础篇）](http://blog.csdn.net/lzyzsd/article/details/41833541)
* [深入浅出RxJava(二：操作符)](http://blog.csdn.net/lzyzsd/article/details/44094895)
* [深入浅出RxJava三--响应式的好处](http://blog.csdn.net/lzyzsd/article/details/44891933)
* [深入浅出RxJava四-在Android中使用响应式编程](http://blog.csdn.net/lzyzsd/article/details/45033611)

## Retrofit 代码混淆配置

```
-dontwarn retrofit.**
-keep class retrofit.** { *; }
-keepattributes Signature
-keepattributes Exceptions
```