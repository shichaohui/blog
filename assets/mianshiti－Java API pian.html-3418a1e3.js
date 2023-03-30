import{_ as d,p as t,q as l,s as e,R as o,t as a,Y as n,n as i}from"./framework-a25df3d5.js";const s={},r={href:"https://shichaohui.github.io/",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,[o("最近得空，就去一些招聘网站做了些面试题，为方便大家共同学习，"),e("code",null,"Java API"),o(" 相关的就在这篇博客里记录一下，以后有空会持续更新，大家有更好的答案也可以留言告诉我。")],-1),p={href:"http://blog.csdn.net/u014165119/article/details/49908451",target:"_blank",rel:"noopener noreferrer"},_={href:"http://blog.csdn.net/u014165119/article/details/49908549",target:"_blank",rel:"noopener noreferrer"},u=n('<h2 id="_1-hashmap-和-hashtable-的区别" tabindex="-1"><a class="header-anchor" href="#_1-hashmap-和-hashtable-的区别" aria-hidden="true">#</a> 1. HashMap 和 Hashtable 的区别</h2><ul><li><code>Hashtable</code> 继承自 <code>Dictiionary</code> 而 <code>HashMap</code> 继承自 <code>AbstractMap</code>。</li><li><code>HashMap</code> 允许将 <code>null</code> 作为一个 <code>entry</code> 的 <code>key</code> 或者 <code>value</code>，而 <code>Hashtable</code> 不允许。</li><li><code>Hashtable</code> 使用 <code>contains</code> 方法去查看是否包含某一对象，<code>HashMap</code> 使用 <code>containsvalue</code> 和 <code>containsKey</code>。</li><li>最大的不同是，<code>Hashtable</code> 的方法是 <code>Synchronize</code> 的，而 <code>HashMap</code> 不是，在多个线程访问 <code>Hashtable</code> 时，不需要自己为它的方法实现同步，而 <code>HashMap</code> 就必须为之提供外同步（<code>Collections.synchronizedMap</code>）。</li></ul><h2 id="_2-collection-和-collections-的区别" tabindex="-1"><a class="header-anchor" href="#_2-collection-和-collections-的区别" aria-hidden="true">#</a> 2. Collection 和 Collections 的区别</h2><p><code>Collection</code> 是一个集合接口。它提供了对集合对象进行基本操作的通用接口方法。<code>Collection</code> 接口在 <code>Java</code> 类库中有很多具体的实现。<code>Collection</code> 接口的意义是为各种具体的集合提供了最大化的统一操作方式；</p><p><code>Collections</code> 是一个包装类。它包含有各种有关集合操作的静态多态方法。此类不能实例化，就像一个工具类，服务于 <code>Java</code> 的 <code>Collection</code> 框架。</p><h2 id="_3-sleep-和-wait-有什么区别" tabindex="-1"><a class="header-anchor" href="#_3-sleep-和-wait-有什么区别" aria-hidden="true">#</a> 3. sleep() 和 wait() 有什么区别?</h2><p><code>sleep()</code> 方法是属于 <code>Thread</code> 类中的。而 <code>wait()</code> 方法是属于 <code>Object</code> 类中的。</p><p><code>sleep()</code> 方法导致了程序暂停执行指定的时间，让出 <code>cpu</code> 该其他线程，但是他的监控状态依然保持者，当指定的时间到了又会自动恢复运行状态。在调用 <code>sleep()</code> 方法的过程中，线程不会释放对象锁。</p><p>而当调用 <code>wait()</code> 方法的时候，线程会放弃对象锁，进入等待此对象的等待锁定池，只有针对此对象调用 <code>notify()</code> 方法后本线程才进入对象锁定池准备获取对象锁进入运行状态。</p>',9);function b(f,m){const c=i("ExternalLinkIcon");return t(),l("div",null,[e("blockquote",null,[e("p",null,[e("small",null,[o("转载请注明出处，"),e("a",r,[o("点击此处"),a(c)]),o(" 查看更多精彩内容。")])])]),h,e("p",null,[e("a",p,[o("面试题－Java算法篇 传送门"),a(c)])]),e("p",null,[e("a",_,[o("面试题－Android篇 传送门"),a(c)])]),u])}const v=d(s,[["render",b],["__file","mianshiti－Java API pian.html.vue"]]);export{v as default};
