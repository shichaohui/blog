import{_ as o,p as i,q as t,s as n,R as a,t as s,Y as l,n as c}from"./framework-a25df3d5.js";const d={},r={href:"https://shichaohui.github.io/",target:"_blank",rel:"noopener noreferrer"},p=n("p",null,[a("使用 "),n("code",null,"lambda"),a(" 可以大大简化代码：")],-1),u={href:"http://www.oschina.net/question/12_59047",target:"_blank",rel:"noopener noreferrer"},v={href:"http://blog.csdn.net/wangboxian/article/details/41963205",target:"_blank",rel:"noopener noreferrer"},m=n("code",null,"Android",-1),b=n("code",null,"lambda",-1),_=n("code",null,"java 8",-1),h={href:"http://www.androiddevtools.cn/",target:"_blank",rel:"noopener noreferrer"},k=l(`<p><code>Android Studio</code> 中使用 <code>lambda</code> 只需要在 <code>build.gradle</code> 文件中进行以下配置并 <code>rebuild</code> 即可：</p><ul><li>根节点加入以下代码</li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;me.tatarka.retrolambda&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>android</code> 节点中加入</li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>compileOptions <span class="token punctuation">{</span>
    sourceCompatibility JavaVersion<span class="token punctuation">.</span>VERSION_1_8
    targetCompatibility JavaVersion<span class="token punctuation">.</span>VERSION_1_8
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function g(f,y){const e=c("ExternalLinkIcon");return i(),t("div",null,[n("blockquote",null,[n("p",null,[n("small",null,[a("转载请注明出处，"),n("a",r,[a("点击此处"),s(e)]),a(" 查看更多精彩内容。")])])]),p,n("p",null,[n("a",u,[a("Java 8 的 lambda 表达式"),s(e)])]),n("p",null,[n("a",v,[a("Lambda表达式详细总结"),s(e)])]),n("p",null,[m,a(" 中使用 "),b,a(" 需要 "),_,a(" 的支持，"),n("a",h,[a("下载地址"),s(e)])]),k])}const V=o(d,[["render",g],["__file","Android zhongshiyong lambda biaodashi.html.vue"]]);export{V as default};
