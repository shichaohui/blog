import{_ as i,o,c as t,b as n,d as e,e as s,a as l,r as c}from"./app.7761d003.js";const d={},r=n("p",null,[e("\u4F7F\u7528 "),n("code",null,"lambda"),e(" \u53EF\u4EE5\u5927\u5927\u7B80\u5316\u4EE3\u7801\uFF1A")],-1),p={href:"http://www.oschina.net/question/12_59047",target:"_blank",rel:"noopener noreferrer"},u={href:"http://blog.csdn.net/wangboxian/article/details/41963205",target:"_blank",rel:"noopener noreferrer"},v=n("code",null,"Android",-1),m=n("code",null,"lambda",-1),_=n("code",null,"java 8",-1),b={href:"http://www.androiddevtools.cn/",target:"_blank",rel:"noopener noreferrer"},k=l(`<p><code>Android Studio</code> \u4E2D\u4F7F\u7528 <code>lambda</code> \u53EA\u9700\u8981\u5728 <code>build.gradle</code> \u6587\u4EF6\u4E2D\u8FDB\u884C\u4EE5\u4E0B\u914D\u7F6E\u5E76 <code>rebuild</code> \u5373\u53EF\uFF1A</p><ul><li>\u6839\u8282\u70B9\u52A0\u5165\u4EE5\u4E0B\u4EE3\u7801</li></ul><div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;me.tatarka.retrolambda&#39;</span>

buildscript <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    dependencies <span class="token punctuation">{</span>
        classpath <span class="token string">&#39;me.tatarka:gradle-retrolambda:2.5.0&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>android</code> \u8282\u70B9\u4E2D\u52A0\u5165</li></ul><div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>compileOptions <span class="token punctuation">{</span>
    sourceCompatibility JavaVersion<span class="token punctuation">.</span>VERSION_1_8
    targetCompatibility JavaVersion<span class="token punctuation">.</span>VERSION_1_8
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function g(h,f){const a=c("ExternalLinkIcon");return o(),t("div",null,[r,n("p",null,[n("a",p,[e("Java 8 \u7684 lambda \u8868\u8FBE\u5F0F"),s(a)])]),n("p",null,[n("a",u,[e("Lambda\u8868\u8FBE\u5F0F\u8BE6\u7EC6\u603B\u7ED3"),s(a)])]),n("p",null,[v,e(" \u4E2D\u4F7F\u7528 "),m,e(" \u9700\u8981 "),_,e(" \u7684\u652F\u6301\uFF0C"),n("a",b,[e("\u4E0B\u8F7D\u5730\u5740"),s(a)])]),k])}const y=i(d,[["render",g],["__file","Android \u4E2D\u4F7F\u7528 lambda \u8868\u8FBE\u5F0F.html.vue"]]);export{y as default};
