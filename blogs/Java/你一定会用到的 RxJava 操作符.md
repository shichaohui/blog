---
title: 你一定会用到的 RxJava 操作符
date: 2016-09-19 09:20
tags:
 - RxJava
categories:
 - Java
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容。</small>

**阅读本文前请先了解 [RxJava](https://github.com/ReactiveX/RxJava)  的基本使用。**

参考文档： 

* [RxJava JavaDoc](http://reactivex.io/RxJava/javadoc) 
* [ReactiveX 文档中文翻译](https://www.gitbook.com/book/mcxiaoke/rxdocs/details)

[定义链接]: http://
[Observable]: http://reactivex.io/RxJava/javadoc/rx/Observable.html

----------------

## 1 [Observable] 的创建

### 1.1 from( )

转换集合为一个每次发射集合中一个元素的 [Observable] 对象。可用来遍历集合。

**方法列表：**

* [public static &lt;T&gt; Observable&lt;T&gt; from(Future&lt;? extends T&gt; future)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#from(java.util.concurrent.Future))

* [public static &lt;T&gt; Observable&lt;T&gt; from(Future&lt;? extends T&gt; future, long timeout, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#from(java.util.concurrent.Future,%20long,%20java.util.concurrent.TimeUnit))

* [public static &lt;T&gt; Observable&lt;T&gt; from(Future&lt;? extends T&gt; future, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#from(java.util.concurrent.Future,%20rx.Scheduler))

* [public static &lt;T&gt; Observable&lt;T&gt; from(Iterable&lt;? extends T&gt; iterable)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#from(java.lang.Iterable))

* [public static &lt;T&gt; Observable&lt;T&gt; from(T[] array)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#from(T[]))

**栗子：**

```java
// 1. 遍历集合
Observable<String> observable = Observable.from(new String[]{"hello", "hi"});
```

```java
// 2. 使用 Future 创建 Observable，Future 表示一个异步计算的结果。
FutureTask<String> futureTask = new FutureTask<String>(new Callable<String>() {
    @Override
    public String call() throws Exception {
        // TODO 执行异步操作并返回数据
        return "hihi";
    }
});

Scheduler.Worker worker = Schedulers.io().createWorker();
worker.schedule(new Action0() {
    @Override
    public void call() {
        futureTask.run();
    }
});

Observable<String> observable = Observable.from(futureTask);
```

### 1.2 just( )

转换一个或多个 Object 为依次发射这些 Object 的 [Observable] 对象。

**方法列表：**

* [public static &lt;T&gt; Observable&lt;T&gt; just(final T value)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T))

* [public static &lt;T&gt; Observable&lt;T&gt; just(T t1, T t2)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T,%20T))

* [public static &lt;T&gt; Observable&lt;T&gt; just(T t1, T t2, T t3)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T,%20T,%20T))

* [public static &lt;T&gt; Observable&lt;T&gt; just(T t1, T t2, T t3, T t4)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T,%20T,%20T,%20T))

* [public static &lt;T&gt; Observable&lt;T&gt; just(T t1, T t2, T t3, T t4, T t5)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T,%20T,%20T,%20T,%20T))

* [public static &lt;T&gt; Observable&lt;T&gt; just(T t1, T t2, T t3, T t4, T t5, T t6)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T,%20T,%20T,%20T,%20T,%20T))

* [public static &lt;T&gt; Observable&lt;T&gt; just(T t1, T t2, T t3, T t4, T t5, T t6, T t7)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T,%20T,%20T,%20T,%20T,%20T,%20T))

* [public static &lt;T&gt; Observable&lt;T&gt; just(T t1, T t2, T t3, T t4, T t5, T t6, T t7, T t8)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T,%20T,%20T,%20T,%20T,%20T,%20T,%20T))

* [public static &lt;T&gt; Observable&lt;T&gt; just(T t1, T t2, T t3, T t4, T t5, T t6, T t7, T t8, T t9)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T,%20T,%20T,%20T,%20T,%20T,%20T,%20T,%20T))

* [public static &lt;T&gt; Observable&lt;T&gt; just(T t1, T t2, T t3, T t4, T t5, T t6, T t7, T t8, T t9, T t10)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#just(T,%20T,%20T,%20T,%20T,%20T,%20T,%20T,%20T,%20T))

**栗子：**

```java
Observable<String> observable = Observable.just("hello");

// 使用 just() 遍历几个元素
Observable<String> observable = Observable.just("hello", "hi", "...");
       
// 使用 from() 方法遍历，效果和 just() 一样。
String[] stringArrs = new String[]{"hello", "hi", "..."};
Observable<String> observable = Observable.from(stringArrs);
```

`just()` 方法可传入 1~10 个参数，也就说当元素个数小于等于 10 的时候既可以使用  `just() ` 也可以使用 `from()`，否则只能用 `from()` 方法。

### 1.3 create( )

返回一个在被 `OnSubscribe` 订阅时执行特定方法的 [Observable] 对象。

**方法列表：**

* [public static &lt;T&gt; Observable&lt;T&gt; create(OnSubscribe&lt;T&gt; f)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#create(rx.Observable.OnSubscribe))

* [@Beta public static &lt;S, T&gt; Observable&lt;T&gt;create(SyncOnSubscribe&lt;S, T&gt; syncOnSubscribe)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#create(rx.observables.SyncOnSubscribe))

* [@Experimental public static &lt;S, T&gt; Observable&lt;T&gt; create(AsyncOnSubscribe&lt;S, T&gt; asyncOnSubscribe)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#create(rx.observables.AsyncOnSubscribe))

**栗子：**

```java
Observable.OnSubscribe<String> onSubscribe = new Observable.OnSubscribe< String >() {
    @Override
    public void call(Subscriber<? super String > subscriber) {
         // onNext() 方法可执行多次
        subscribe.onNext("hello");
        subscribe.onCompleted();
    }
};
Observable<Object> observable = Observable.create(onSubscribe);
```

此方法不常用，大多数时候都是使用 `just( )`、`form( )` 等方法，如上面那串代码就可以写成：

```java
Observable<Object> observable = Observable.just("hello");
```

### 1.4 interval( )

返回一个每隔指定的时间间隔就发射一个序列号的 [Observable] 对象，可用来做倒计时等操作。

**方法列表：**

* [public static Observable&lt;Long&gt; interval(long interval, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#interval(long,%20java.util.concurrent.TimeUnit))

* [public static Observable&lt;Long&gt; interval(long interval, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#interval(long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

* [public static Observable&lt;Long&gt; interval(long initialDelay, long period, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#interval(long,%20long,%20java.util.concurrent.TimeUnit))

* [public static Observable&lt;Long&gt; interval(long initialDelay, long period, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#interval(long,%20long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

**栗子：**

```java
// 每隔 1 s 发送一个序列号，序列号从 0 开始，每次累加 1。
Observable<Long> observable = Observable.interval(1, TimeUnit.SECONDS);
```

### 1.5 timer( )

创建一个在指定延迟时间后发射一条数据（<span color="#999999"> 固定值：0 </span>）的 [Observable] 对象，可用来做定时操作。

**方法列表：**

* [public static Observable&lt;Long&gt; timer(long delay, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#timer(long,%20java.util.concurrent.TimeUnit))

* [public static Observable&lt;Long&gt; timer(long delay, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#timer(long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

**栗子：**

```java
// 定时 3 s
Observable<Long> observable = Observable.timer(3, TimeUnit.SECONDS);
```

### 1.6 range( )

创建一个发射指定范围内的连续整数的 [Observable] 对象。

**方法列表：**

* [public static Observable&lt;Integer&gt; range(int start, int count)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#range(int,%20int))

* [public static Observable&lt;Integer&gt; range(int start, int count, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#range(int,%20int,%20rx.Scheduler))

**栗子：**

```java
// 依次发射 5、6、7
Observable<Integer> observable = Observable.range(5, 3);
```

### 1.7 empty()

创建一个不发射任何数据就发出 `onCompleted()` 通知的 [Observable] 对象。

**方法列表：**

* [public static &lt;T&gt; Observable&lt;T&gt; empty()](http://reactivex.io/RxJava/javadoc/rx/Observable.html#empty())

**栗子：**

```java
// 发出一个 onCompleted() 通知
Observable<Object> observable = Observable.empty();
```

### 1.8 error( )

创建不发射任何数据就发出 `onError` 通知的 [Observable] 对象。

**方法列表：**

* [public static &lt;T&gt; Observable&lt;T&gt; error(Throwable exception)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#error(java.lang.Throwable))

**栗子：**

```java
// 发出一个 onError() 通知
Observable<Object> observable = Observable.error(new Throwable("message"));
```

### 1.9 never()

创建一个不发射任何数据和通知的 [Observable] 对象。

**方法列表：**

* [public static &lt;T&gt; Observable&lt;T&gt; never()](http://reactivex.io/RxJava/javadoc/rx/Observable.html#never())

**栗子：**

```java
Observable<Object> observable = Observable.never();
```

### 1.10 defer( )

在订阅的时候才会创建 Observable 对象；每一次订阅都创建一个新的 [Observable] 对象。

**方法列表：**

* [public static &lt;T&gt; Observable&lt;T&gt; defer(Func0&lt;Observable&lt;T&gt;&gt; observableFactory)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#defer(rx.functions.Func0))

**栗子：**

```java
Observable<String> observable = Observable.defer(new Func0<Observable<String>>() {
    @Override
    public Observable<String> call() {
        return Observable.just("string");
    }
});
```

## 2 重做

### 2.1 repeat( )

使Observable 对象在发出 `onNext()` 通知之后重复发射数据。重做结束才会发出 `onComplete()` 通知，若重做过程中出现异常则会中断并发出 `onError()` 通知。

**方法列表：**

* [public final Observable&lt;T&gt; repeat()](http://reactivex.io/RxJava/javadoc/rx/Observable.html#repeat())

* [public final Observable&lt;T&gt; repeat(final long count) ](http://reactivex.io/RxJava/javadoc/rx/Observable.html#repeat(long))

* [public final Observable&lt;T&gt; repeat(Scheduler scheduler) ](http://reactivex.io/RxJava/javadoc/rx/Observable.html#repeat(rx.Scheduler))

* [public final Observable&lt;T&gt; repeat(final long count, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#repeat(long,%20rx.Scheduler))

**栗子：**

```java
Observable<String> observable = Observable.just("string");
// 无限重复执行
observable.repeat();
// 重复执行 5 次
observable.repeat(5);
```

### 2.2 repeatWhen( )

使Observable 对象在发出 `onNext()` 通知之后有条件的重复发射数据。重做结束才会发出 `onCompleted()` 通知，若重做过程中出现异常则会中断并发出 `onError()` 通知。

**方法列表：**

* [public final Observable&lt;T&gt; repeatWhen(final Func1&lt;? super Observable&lt;? extends Void&gt;, ? extends Observable&lt;?&gt;&gt; notificationHandler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#repeatWhen(rx.functions.Func1))

* [public final Observable&lt;T&gt; repeatWhen(final Func1&lt;? super Observable&lt;? extends Void&gt;, ? extends Observable&gt;?&gt; notificationHandler, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#repeatWhen(rx.functions.Func1,%20rx.Scheduler))

**栗子：**

```java
observable.repeatWhen(new Func1<Observable<? extends Void>, Observable<?>>() {
    @Override
    public Observable<?> call(Observable<? extends Void> observable) {
        // 重复 3 次, 每次间隔 1 s
        return observable.zipWith(Observable.range(1, 3), new Func2<Void, Integer, Integer>() {
            @Override
            public Integer call(Void aVoid, Integer integer) {
                return integer;
             }
        }).flatMap(integer -> Observable.timer(1, TimeUnit.SECONDS));
    }
});
```

## 3 重试

### 3.1 retry( )

在执行 [Observable]对象的序列出现异常时，不直接发出 `onError()` 通知，而是重新订阅该 [Observable]对象，直到重做过程中未出现异常，则会发出 `onNext()` 和 `onCompleted()` 通知；若重做过程中也出现异常，则会继续重试，直到达到重试次数上限，超出次数后发出最新的 `onError()` 通知。

**方法列表：**

* [public final Observable&lt;T&gt; retry()](http://reactivex.io/RxJava/javadoc/rx/Observable.html#retry())

* [public final Observable&lt;T&gt; retry(final long count)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#retry(long))

* [public final Observable&lt;T&gt; retry(Func2&lt;Integer, Throwable, Boolean&gt; predicate)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#retry(rx.functions.Func2))

**栗子：**

```java
Observable<Integer> observable = Observable.create(new Observable.OnSubscribe<Integer>() {
    @Override
    public void call(Subscriber<? super Integer> subscriber) {
        System.out.println(".......");
        int a = 1 / 0;
        subscriber.onNext(a);
        subscriber.onCompleted();
    }
});
// 无限次的重试
observable.retry();
// 重试 3 次
observable.retry(3);
// 使用谓语函数决定是否重试
observable.retry(new Func2<Integer, Throwable, Boolean>() {
    @Override
    public Boolean call(Integer integer, Throwable throwable) {
        // 参数 integer 是订阅的次数; 参数 throwable 是抛出的异常
        // 返回值为 true 表示重试, 返回值为 false 表示不重试
        return false;
    }
});
```

### 3.2 retryWhen( )

**作用：** 有条件的执行重试。

**方法列表：**

* [public final Observable&lt;T&gt; retryWhen(final Func1&lt;? super Observable&lt;? extends Throwable&gt;, ? extends Observable&lt;?&gt;&gt; notificationHandler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#retryWhen(rx.functions.Func1))

* [public final Observable&lt;T&gt; retryWhen(final Func1&lt;? super Observable&lt;? extends Throwable&gt;, ? extends Observable&lt;?&gt;&gt;notificationHandler, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#retryWhen(rx.functions.Func1,%20rx.Scheduler))

**栗子：**

```java
// 重试 3 次，每次间隔 1 s
observable.retryWhen(new Func1<Observable<? extends Throwable>, Observable<?>>() {
    @Override
    public Observable<?> call(Observable<? extends Throwable> observable) {
        return observable.zipWith(Observable.range(1, 3), new Func2<Throwable, Integer, Object>() {
            @Override
            public Object call(Throwable throwable, Integer integer) {
                return integer;
            }
        }).flatMap(new Func1<Object, Observable<?>>() {
            @Override
            public Observable<?> call(Object o) {
                return Observable.timer(1, TimeUnit.SECONDS);
            }
        });
    }
});
```

## 4 变换

### 4.1 map( )

把源 [Observable] 发射的元素应用于指定的函数，并发送该函数的结果。

**方法列表：**

* [public final &lt;R&gt; Observable&lt;R&gt; map(Func1&lt;? super T, ? extends R&gt; func)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#map(rx.functions.Func1))

**栗子：**

```java
Observable.just(2)
        .map(new Func1<Integer, String>() {
            @Override
            public String call(Integer integer) {
                return String.valueOf(String.format("原始数据的两倍为: %s", integer * 2));
            }
        });
```

### 4.2 flatMap( )

转换源 [Observable] 对象为另一个 [Observable] 对象。

**方法列表：**

* [public final &lt;R&gt; Observable&lt;R&gt; flatMap(Func1&lt;? super T, ? extends Observable&lt;? extends R&gt;&gt; func)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#flatMap(rx.functions.Func1))

* [@Beta public final &lt;R&gt; Observable&lt;R&gt; flatMap(Func1&lt;? super T, ? extends Observable&lt;? extends R&gt;&gt; func, int maxConcurrent)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#flatMap(rx.functions.Func1,%20int))

* [public final &lt;R&gt; Observable&lt;R&gt; flatMap(Func1&lt;? super T, ? extends Observable&lt;? extends R&gt;&gt; onNext, Func1&lt;? super Throwable, ? extends Observable&lt;? extends R&gt;&gt; onError, Func0&lt;? extends Observable&lt;? extends R&gt;&gt; onCompleted)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#flatMap(rx.functions.Func1,%20rx.functions.Func1,%20rx.functions.Func0))

* [@Beta public final &lt;R&gt; Observable&lt;R&gt; flatMap(Func1&lt;? super T, ? extends Observable&lt;? extends R&gt;&gt; onNext, Func1&lt;? super Throwable, ? extends Observable&lt;? extends R&gt;&gt; onError, Func0&lt;? extends Observable&lt;? extends R&gt;&gt; onCompleted, int maxConcurrent)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#flatMap(rx.functions.Func1,%20rx.functions.Func1,%20rx.functions.Func0,%20int))

* [public final &lt;U, R&gt; Observable&lt;R&gt; flatMap(final Func1&lt;? super T, ? extends Observable&lt;? extends U&gt;&gt; collectionSelector, final Func2&lt;? super T, ? super U, ? extends R&gt; resultSelector)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#flatMap(rx.functions.Func1,%20rx.functions.Func2))

* [@Beta public final &lt;U, R&gt; Observable&lt;R&gt; flatMap(final Func1&lt;? super T, ? extends Observable&lt;? extends U&gt;&gt; collectionSelector, final Func2&lt;? super T, ? super U, ? extends R&gt; resultSelector, int maxConcurrent)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#flatMap(rx.functions.Func1,%20rx.functions.Func2,%20int))

**栗子：**

```java
Observable.just(2)
        .flatMap(new Func1<Integer, Observable<Long>>() {
            @Override
            public Observable<Long> call(Integer integer) {
                // 转换为一个定时 integer 秒的 Observable 对象
                return Observable.timer(integer, TimeUnit.SECONDS);
            }
        });
```

## 5 过滤

### 5.1 filter( )

只发射满足指定谓词的元素。

**方法列表：**

* [public final Observable&lt;T&gt; filter(Func1&lt;? super T, Boolean&gt; predicate)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#filter(rx.functions.Func1))

**栗子：**

```java
Observable.just(-1, -2, 0, 1, 2)
        .filter(new Func1<Integer, Boolean>() {
            @Override
            public Boolean call(Integer integer) {
                return integer > 0;
            }
        });
```

### 5.2 first( )

返回一个仅仅发射源 [Observable] 发射的第一个［满足指定谓词的］元素的 [Observable]，如果如果源 [Observable] 为空，则会抛出一个 `NoSuchElementException`。

**方法列表：**

* [public final Observable&lt;T&gt; first()](http://reactivex.io/RxJava/javadoc/rx/Observable.html#first())

* [public final Observable&lt;T&gt; first(Func1&lt;? super T, Boolean&gt; predicate)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#first(rx.functions.Func1))

**栗子：**

```java
// 发射第一个元素
Observable.just(-1, -2, 0, 1, 2).first();

// 发射满足条件的第一个元素
Observable.just(-1, -2, 0, 1, 2)
        .first(new Func1<Integer, Boolean>() {
            @Override
            public Boolean call(Integer integer) {
                return integer > 0;
            }
        });

// 会抛出 NoSuchElementException 异常
Observable.empty().first();
```

### 5.3 last( )

返回一个仅仅发射源 [Observable] 发射的倒数第一个［满足指定谓词的］元素的 [Observable]，如果如果源 [Observable] 为空，则会抛出一个 `NoSuchElementException`。

**方法列表：**

* [public final Observable&lt;T&gt; last()](http://reactivex.io/RxJava/javadoc/rx/Observable.html#last())

* [public final Observable&lt;T&gt; last(Func1&lt;? super T, Boolean&gt; predicate)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#last(rx.functions.Func1))

**栗子：**

```java
// 发射倒数第一个元素
Observable.just(-1, -2, 0, 1, 2).first();

// 发射满足条件的倒数第一个元素
Observable.just(-1, -2, 0, 1, 2)
        .first(new Func1<Integer, Boolean>() {
            @Override
            public Boolean call(Integer integer) {
                return integer < 0;
            }
        });

// 会抛出 NoSuchElementException 异常
Observable.empty().last();
```

### 5.4 skip( )

跳过前面指定数量或指定时间内的元素，只发射后面的元素。

**方法列表：**

* [public final Observable&lt;T&gt; skip(int count)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#skip(int))

* [public final Observable&lt;T&gt; skip(long time, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#skip(long,%20java.util.concurrent.TimeUnit))

* [public final Observable&lt;T&gt; skip(long time, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#skip(long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

**栗子：**

```java
Observable.just(-1, -2, 0, 1, 2)
        .skip(2) // 跳过前两条数据
```

### 5.5 skipLast( )

跳过前面指定数量或指定时间内的元素，只发射后面的元素。指定时间时会延迟源 [Observable] 发射的任何数据。

**方法列表：**

* [public final Observable&lt;T&gt; skipLast(int count)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#skipLast(int))

* [public final Observable&lt;T&gt; skipLast(long time, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#skipLast(long,%20java.util.concurrent.TimeUnit))

* [public final Observable&lt;T&gt; skipLast(long time, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#skipLast(long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

**栗子：**

```java
Observable.just(-1, -2, 0, 1, 2)
        .skip(2) // 跳过后两条数据
```

### 5.6 take( )

只发射前面指定数量或指定时间内的元素。

**方法列表：**

* [public final Observable&lt;T&gt; take(final int count)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#take(int))

* [public final Observable&lt;T&gt; take(long time, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#take(long,%20java.util.concurrent.TimeUnit))

* [public final Observable&lt;T&gt; take(long time, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#take(long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

**栗子：**

```java
Observable.just(-1, -2, 0, 1, 2).take(3); // 只发射前三条数据
```

### 5.7 takeLast( )

只发射后面指定数量或指定时间内的元素。指定时间时会延迟源 [Observable] 发射的任何数据。

**方法列表：**

* [public final Observable&lt;T&gt; takeLast(final int count)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#takeLast(int))

* [public final Observable&lt;T&gt; takeLast(int count, long time, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#takeLast(int,%20long,%20java.util.concurrent.TimeUnit))

* [public final Observable&lt;T&gt; takeLast(int count, long time, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#takeLast(int,%20long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

* [public final Observable&lt;T&gt; takeLast(long time, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#takeLast(long,%20java.util.concurrent.TimeUnit))

* [public final Observable&lt;T&gt; takeLast(long time, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#takeLast(long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

**栗子：**

```java
Observable.just(-1, -2, 0, 1, 2).takeLast(3); // 只发射后三条数据
```

### 5.8 sample( )

定期发射 [Observable] 发射的最后一条数据。

**方法列表：**

* [public final Observable&lt;T&gt; sample(long period, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#sample(long,%20java.util.concurrent.TimeUnit))

* [public final Observable&lt;T&gt; sample(long period, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#sample(long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

* [public final &lt;U&gt; Observable&lt;T&gt; sample(Observable&lt;U&gt; sampler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#sample(rx.Observable))

**栗子：**

```java
Observable.interval(300, TimeUnit.MILLISECONDS)
        .sample(2, TimeUnit.SECONDS)
```

### 5.9 elementAt( )

只发射指定索引的元素。

**方法列表：**

* [public final Observable&lt;T&gt; elementAt(int index)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#elementAt(int))

**栗子：**

```java
Observable.just(-1, -2, 0, 1, 2).elementAt(2); // 发射索引为 2 的数据
```

### 5.10 elementAtOrDefault( )

只发射指定索引的元素，若该索引对应的元素不存在，则发射默认值。

**方法列表：**

* [public final Observable&lt;T&gt; elementAtOrDefault(int index, T defaultValue)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#elementAtOrDefault(int,%20T))

**栗子：**

```java
Observable.just(-1, -2, 0, 1, 2).elementAtOrDefault(9, -5); // 发射索引为 9的数据，若不存在，则发射 -5
```

### 5.11 ignoreElements( )

不发射任何数据，直接发出 `onCompleted()` 通知。

**方法列表：**

* [public final Observable&lt;T&gt; ignoreElements()](http://reactivex.io/RxJava/javadoc/rx/Observable.html#ignoreElements())

**栗子：**

```java
Observable.just(-1, -2, 0, 1, 2).ignoreElements()
```

### 5.12 distinct( )

过滤重复的元素，过滤规则是：只允许还没有发射过的元素通过。

**方法列表：**

* [public final Observable&lt;T&gt; distinct()](http://reactivex.io/RxJava/javadoc/rx/Observable.html#distinct())

* [public final &lt;U&gt; Observable&lt;T&gt; distinct(Func1&lt;? super T, ? extends U&gt; keySelector)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#distinct(rx.functions.Func1))

**栗子：**

```java
// 直接过滤
Observable.just(-1, -2, 0, 1, 2, 1).distinct();

// 通过生成的 key 值过滤
Observable.just(-1, -2, 0, 1, 2, 1).distinct(new Func1<Integer, Integer>() {
    @Override
    public Integer call(Integer integer) {
        // 随机生成 key
        return integer * (int)(Math.random() * 10);
    }
});
```

### 5.13 debounce( )

源 [Observable] 每产生结果后，如果在规定的间隔时间内没有产生新的结果，则发射这个结果，否则会忽略这个结果。该操作符会过滤掉发射速率过快的数据项。

**方法列表：**

* [public final Observable&lt;T&gt; debounce(long timeout, TimeUnit unit)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#debounce(long,%20java.util.concurrent.TimeUnit))

* [public final Observable&lt;T&gt; debounce(long timeout, TimeUnit unit, Scheduler scheduler)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#debounce(long,%20java.util.concurrent.TimeUnit,%20rx.Scheduler))

* [public final &lt;U&gt; Observable&lt;T&gt; debounce(Func1&lt;? super T, ? extends Observable&lt;U&gt;&gt; debounceSelector)](http://reactivex.io/RxJava/javadoc/rx/Observable.html#debounce(rx.functions.Func1))

**栗子：**

```java
Observable<Integer> observable = Observable.create(new Observable.OnSubscribe<Integer>() {
    @Override
    public void call(Subscriber<? super Integer> subscriber) {
        try {
            //产生结果的间隔时间分别为100、200、300...900毫秒
            for (int i = 1; i < 10; i++) {
                subscriber.onNext(i);
                Thread.sleep(i * 100);
            }
            subscriber.onCompleted();
        } catch (Exception e) {
            subscriber.onError(e);
        }
    }
});
observable.debounce(400, TimeUnit.MILLISECONDS)  // 超时时间为400毫秒
```

该栗子产生结果为：依次打印5、6、7、8。

## 附：功能实现

### 延时遍历

```java
// 遍历
Observable<Integer> traverseObservable = Observable.just(3, 4, 5, 6);
// 计时
Observable<Long> intervalObservable = Observable.interval(1, TimeUnit.SECONDS);
        
Func2<Long, Integer, Integer> func2 = new Func2<Long, Integer, Integer>() {
    @Override
    public Integer call(Long aLong, Integer integer) {
        return integer;
    }
};

intervalObservable.zipWith(traverseObservable, func2)
        .toBlocking()
        .subscribe(new Subscriber<Integer>() {
            @Override
            public void onCompleted() {
                System.out.println("onCompleted");
            }

           @Override
           public void onError(Throwable e) {
               e.printStackTrace();
            }

            @Override
            public void onNext(Integer integer) {
                System.out.println(integer);
            }
        });
```

### 倒计时

```java
int startTime = 10;

Observable.interval(0, 1, TimeUnit.SECONDS)
        .take(startTime + 1) // 接收 startTime + 1 次
        .map(new Func1<Long, Long>() {
            @Override
            public Long call(Long time) {
                // 1 2 3...转换为...3 2 1
                return startTime - time;
            }
        })
        .toBlocking()
        .subscribe(new Subscriber<Long>() {
            @Override
            public void onCompleted() {
                System.out.println("倒计时结束");
            }

            @Override
            public void onError(Throwable e) {
                System.out.println("倒计时出现异常");
                e.printStackTrace();
            }

            @Override
            public void onNext(Long aLong) {
                System.out.println(String.format("倒计时: %s s", aLong));
            }
       });
```