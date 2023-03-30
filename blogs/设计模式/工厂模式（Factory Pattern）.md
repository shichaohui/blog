---
title: 工厂模式（Factory Pattern）
date: 2019-10-16 17:53
tags:
 - 设计模式
 - 工厂模式
categories:
 - 设计模式
---

> <small>转载请注明出处，[点击此处](https://shichaohui.github.io/) 查看更多精彩内容。</small>

## 模式定义

工厂模式属于创建型模式，它提供了一种创建对象的最佳方式。

在工厂模式中，创建对象时不会对外暴露创建逻辑，并且通过一个共同的接口指向创建对象。

根据实现方式的不同，工厂模式可以分为简单工厂模式、工厂方法模式。

## 简单工厂模式

简单工厂模式又称为静态工厂方法模式。大家经常使用的机械键盘有各种轴的，如红轴、青轴、茶轴等等。现在有一个厂商可以生产红轴和青轴键盘，使用代码该如何表现呢？

```kotlin
interface Keyboard {
    fun input()
}

class RedAxisKeyboard : Keyboard {
    override fun input() {
        println("Red axis keyboard inputting ...")
    }
}

class GreenAxisKeyboard : Keyboard {
    override fun input() {
        println("Green axis keyboard inputting ...")
    }
}

object Factory {
    fun make(axis: String): Keyboard? {
        return when (axis) {
            "red" -> RedAxisKeyboard()
            "green" -> GreenAxisKeyboard()
            else -> null
        }
    }
}

fun main() {
    Factory.make("red")?.input()
    Factory.make("green")?.input()
}
```

在客户端调用 `Factory.make(type)` 传入 "red" or "green" 字符串就可以创建相应的对象。

这就是简单工厂模式，使用类图表示如下：

| ![image-20191016163751004](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnODA0cDF1Y25jajMwZHowNWVxMzEuanBn?x-oss-process=image/format,png) |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                 简单工厂模式类图                                                                                  |

相信不用我说大家也能看出来这种写法的弊端：

* 传参容易出错（可以使用枚举或者在工厂类中为每个产品提供创建函数解决该问题）。
* 新增或者减少产品时需要修改工厂类（违反了开闭原则）。

## 工厂方法模式

为了解决增减产品带来的问题，可以将工厂抽象化，为每个产品建立单独的工厂，这就是工厂方法模式。

| ![image-20191016172114663](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnODA1eWN1b3ZtajMwa2IwNWtteGkuanBn?x-oss-process=image/format,png) |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                 工厂方法模式类图                                                                                  |

使用工厂方法模式改造键盘的生产：

```kotlin
abstract class AbsKeyboardFactory {
    abstract fun make(): Keyboard
}

object RedAxisKeyboardFactory : AbsKeyboardFactory() {
    override fun make(): Keyboard = RedAxisKeyboard()
}

object GreenAxisKeyboardFactory : AbsKeyboardFactory() {
    override fun make(): Keyboard = GreenAxisKeyboard()
}

fun main() {
    RedAxisKeyboardFactory.make().input()
    GreenAxisKeyboardFactory.make().input()
}
```

工厂改造完成后，新增产品只要新建工厂即可，比如新增茶轴键盘的制造：

```kotlin
class TeaAxisKeyboard : Keyboard {
    override fun input() {
        println("Tea axis keyboard inputting ...")
    }
}

object TeaAxisKeyboardFactory : AbsKeyboardFactory() {
    override fun make(): Keyboard = TeaAxisKeyboard()
}

fun main() {
    TeaAxisKeyboardFactory.make().input()
}
```

通过使用工厂方法模式，每个工厂负责一个产品的创建工作，在新增产品的时候就不需要再修改原有的代码，更易维护，降低了变更带来的风险。