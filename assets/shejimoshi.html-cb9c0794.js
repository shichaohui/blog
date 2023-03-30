import{_ as i,p as l,q as h,s as e,R as t,t as r,Y as n,n as o}from"./framework-a25df3d5.js";const s={},d={href:"https://shichaohui.github.io/",target:"_blank",rel:"noopener noreferrer"},p=n('<h2 id="一、简介" tabindex="-1"><a class="header-anchor" href="#一、简介" aria-hidden="true">#</a> 一、简介</h2><p>设计模式代表了软件开发的最佳实践，是软件开发人员在软件开发过程中面临的一般问题的解决方案，是一套反复使用的、多人知晓的、经过分类编目的代码设计经验的总结。</p><p>使用设计模式的目的是重用代码、让代码更易理解、保证代码的可靠性和可维护性。</p><p>学习这些模式有助于经验不足的开发人员通过一种简单快捷的方式来学习软件设计。</p><h2 id="二、设计原则" tabindex="-1"><a class="header-anchor" href="#二、设计原则" aria-hidden="true">#</a> 二、设计原则</h2><h3 id="开闭原则" tabindex="-1"><a class="header-anchor" href="#开闭原则" aria-hidden="true">#</a> 开闭原则</h3><p>对扩展开发，对修改关闭。</p><p>在对程序进行扩展的时候不能修改原有代码，实现热插拔的效果。要想实现这样的效果，需要使用接口和抽象类。</p><p><strong>优点：</strong> 提高代码的复用性和可维护性。</p><h3 id="单一职责原则" tabindex="-1"><a class="header-anchor" href="#单一职责原则" aria-hidden="true">#</a> 单一职责原则</h3><p>单一职责原则规定一个类或者函数应该只有一个引起它发生变化的原因，否则类或者函数应该被拆分。</p><p><strong>优点：</strong> 降低系统的复杂度，提高可读性和可维护性，降低变更带来的风险。</p><h3 id="接口隔离原则" tabindex="-1"><a class="header-anchor" href="#接口隔离原则" aria-hidden="true">#</a> 接口隔离原则</h3><p>客户端不应该被迫依赖它不需要的函数，一个类对另一个类的依赖应该建立在最小的接口上，而不要试图建立一个功能复杂的庞大的接口供所有依赖它的类去调用。</p><p><strong>优点：</strong> 提高类的内聚性，降低类之间的耦合。减少冗余代码。提高系统的灵活性和可维护性。</p><h3 id="依赖倒置原则" tabindex="-1"><a class="header-anchor" href="#依赖倒置原则" aria-hidden="true">#</a> 依赖倒置原则</h3><p>细节应该依赖抽象，抽象不应该依赖细节。高层模块应该依赖低层模块，低层模块不应该依赖高层模块。</p><p>其核心思想就是针对接口编程。</p><p><strong>优点：</strong> 降低耦合，提高代码的复用性，减少并行开发的风险。</p><h3 id="里氏代换原则" tabindex="-1"><a class="header-anchor" href="#里氏代换原则" aria-hidden="true">#</a> 里氏代换原则</h3><p>继承类必须保证基类所拥有的特性在子类中依然成立，使得所有基类出现的地方都可以使用子类替换。</p><p>里氏代换原则是继承复用的基础，反应的是基类与子类的关系。</p><p>里氏代换原则是对开闭原则的补充，使用开闭原则的关闭步骤就是抽象化，而基类与子类的继承关系就是抽象化的具体实现，所以里氏代换原则是实现抽象化的具体步骤的规范。</p><p><strong>优点：</strong> 克服了继承中重写父类导致的复用性变差的问题，降低代码出错的可能性。</p><h3 id="迪米特法则-最少知识原则" tabindex="-1"><a class="header-anchor" href="#迪米特法则-最少知识原则" aria-hidden="true">#</a> 迪米特法则（最少知识原则）</h3><p>一个类应该尽可能少的与其他类发生相互作用。</p><p>从依赖者角度来说，只依赖应该依赖的对象。</p><p>从被依赖者的角度来说，只暴露应该暴露的方法。</p><p><strong>优点：</strong> 降低耦合，提高模块的相互独立性。</p><h3 id="合成复用原则" tabindex="-1"><a class="header-anchor" href="#合成复用原则" aria-hidden="true">#</a> 合成复用原则</h3><p>合成复用原则要求在软件复用时，尽量使用合成或聚合等关联关系来实现，其次才考虑使用继承关系实现。</p><h2 id="三、分类" tabindex="-1"><a class="header-anchor" href="#三、分类" aria-hidden="true">#</a> 三、分类</h2><p>根据设计模式的参考书 <strong>Design Patterns - Elements of Reusable Object-Oriented Software（中文译名：设计模式 - 可复用的面向对象软件元素）</strong> 中所提到的，总共有 23 种设计模式。这些模式可以分为三类：创建型模式（Creational Patterns）、结构型模式（Structural Patterns）、行为型模式（Behavioral Patterns）。</p><h3 id="创建型模式" tabindex="-1"><a class="header-anchor" href="#创建型模式" aria-hidden="true">#</a> 创建型模式</h3><p>创建型模式提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是直接使用 new 创建对象。这使得系统在指定条件下判断需要创建的对象时更加灵活。</p>',35),c={href:"https://blog.csdn.net/u014165119/article/details/102590569",target:"_blank",rel:"noopener noreferrer"},u=e("li",null,"抽象工厂模式（Abstract Factory Pattern）",-1),_=e("li",null,"建造者模式（Builder Pattern）",-1),P=e("li",null,"单例模式（Singleton Pattern）",-1),f=e("li",null,"原型模式（Prototype Pattern）",-1),b=n('<h3 id="结构型模式" tabindex="-1"><a class="header-anchor" href="#结构型模式" aria-hidden="true">#</a> 结构型模式</h3><p>结构型模式关注类与对象之间的组合。</p><ul><li>适配器模式（Adapter Pattern）</li><li>桥接模式（Bridge Pattern）</li><li>过滤器模式（Filter、Criteria Pattern）</li><li>组合模式（Composite Pattern）</li><li>装饰器模式（Decorate Pattern）</li><li>代理模式（Proxy Pattern）</li><li>外观模式（Facade Pattern）</li><li>享元模式（Flyweight Pattern）</li></ul><h3 id="行为型模式" tabindex="-1"><a class="header-anchor" href="#行为型模式" aria-hidden="true">#</a> 行为型模式</h3><p>行为型模式关注的是对象之间的通信。</p><ul><li>责任链模式（Chain of Responsibility Pattern）</li><li>命令模式（Common Pattern）</li><li>解释器模式（Interpreter Pattern）</li><li>迭代器模式（Iterator Pattern）</li><li>中介者模式（Mediator Pattern）</li><li>备忘录模式（Memento Pattern）</li><li>观察者模式（Observer Pattern）</li><li>状态模式（State Pattern）</li><li>空对象模式（Null Object Pattern）</li><li>策略模式（Strategy Pattern）</li><li>模板模式（Template Pattern）</li><li>访问者模式（Visitor Pattern）</li></ul>',6);function g(x,m){const a=o("ExternalLinkIcon");return l(),h("div",null,[e("blockquote",null,[e("p",null,[e("small",null,[t("转载请注明出处，"),e("a",d,[t("点击此处"),r(a)]),t(" 查看更多精彩内容。")])])]),p,e("ul",null,[e("li",null,[e("a",c,[t("工厂模式（Factory Pattern）"),r(a)])]),u,_,P,f]),b])}const y=i(s,[["render",g],["__file","shejimoshi.html.vue"]]);export{y as default};
