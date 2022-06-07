---
title: 面试题－Java 算法篇
date: 2015-11-18 15:59
tags:
 - Java
categories:
 - Java
---

最近得空，就去一些招聘网站做了些面试题，为方便大家共同学习，`Java` 相关的算法就在这篇博客里记录一下，以后有空会持续更新，大家有更好的写法也可以留言告诉我。

[面试题－Android 篇 传送门](http://blog.csdn.net/u014165119/article/details/49908549)

[面试题－Java API 篇 传送门](http://blog.csdn.net/u014165119/article/details/49910119)

## 1. 使用递归完成以下输出

```
*
**
***
****
*****
```

```java
/**
 * 打印星号, 第一行1个, 以后每行增加一个
 *
 * @param row 行数
 */
public void printStart(int row) {

    if (row <= 0) {
        System.out.println("行数应大于0");
        return;
    }

    if (row == 1) {
        System.out.println("*");
        return;
    }

    printStart(row - 1);

    for (int i = 0; i < row; i++) {
        System.out.print("*");
    }
    System.out.println();

}
```

## 2. 给定一个长字符串，找出现次数最多的字符

```java
/**
 * 找出现次数最多的字符
 *
 * @param source 源字符串
 * @return
 */
public List<Character> findMaxChars(String source) {

    List<Character> maxChars = new ArrayList<>();
    int maxCount = 0;

    // 保存所有字符和出现次数
    Map<Character, Integer> map = new HashMap<>();

    // 字符串遍历
    for (Character character : source.toCharArray()) {

        map.put(character, map.get(character) == null ? 1 : map.get(character) + 1);

        if (map.get(character) > maxCount) {
            maxChars.clear();
            maxChars.add(character);
            maxCount = map.get(character);
        } else if (map.get(character) == maxCount) {
            maxChars.add(character);
            maxCount = map.get(character);
        }

    }

    return maxChars;

}
```

## 3. 用递归编写求和或者求阶乘的函数

**求和：**

```java
public int sum(int number) {
    if (number == 1) {
        return 1;
    } else {
        return number + sum(--number);
    }
}
```

**求阶乘：**

```java
public int factorial(int number) {
    if (number == 1) {
        return 1;
    } else {
        return number * factorial(--number);
    }
}
```

## 4. 按照指定格式输出内容

已知：字符串数组String items[n]={"a","1","b","2","c","3","d","4",...}
输出：
a=1;
b=2;
c=3;
...

```java
public class MyClass {

    public static void main(String[] args) {

        MyClass myClass = new MyClass();

        String[] items = new String[]{"a", "1", "b", "2", "c", "3", "d", "4"};

        myClass.formatPrint(items);

    }

    public void formatPrint(String[] items) {

        if ((items.length & 1) != 0) {
            System.out.println("数组中元素个数应为偶数.");
            return;
        }

        StringBuilder builder = new StringBuilder("");
        for (int i = 0; i < items.length; i++) {
            if ((i & 1) == 0) { // 偶数
                builder.delete(0, builder.length());
                builder.append(items[i]);
                builder.append("=");
            } else { // 奇数
                builder.append(items[i]);
                builder.append(";");
                System.out.println(builder.toString());
            }

        }

    }

}
```