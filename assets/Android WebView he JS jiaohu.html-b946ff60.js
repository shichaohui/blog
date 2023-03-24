import{_ as a,p as n,q as e,Y as s}from"./framework-a25df3d5.js";const t={},i=s(`<h2 id="android-调用-js" tabindex="-1"><a class="header-anchor" href="#android-调用-js" aria-hidden="true">#</a> Android 调用 js</h2><p>调用方式：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>mWebView<span class="token punctuation">.</span><span class="token function">loadUrl</span><span class="token punctuation">(</span><span class="token string">&quot;javascript:method()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中 <code>method()</code> 是 js 中的一个方法。</p><h2 id="js调用android" tabindex="-1"><a class="header-anchor" href="#js调用android" aria-hidden="true">#</a> js调用Android</h2><p>调用方式：</p><ul><li>首先在Java类作为被调用对象，这里叫做 <code>JavaScriptInterfaceObject</code> ，其中有个方法叫 <code>method()</code> ；</li><li>其次使用以下方法注入对象到 js。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>mWebView<span class="token punctuation">.</span><span class="token function">addJavaScriptInterface</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">JavaScriptInterfaceObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;myObject&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>最后在js中使用该对象：</li></ul><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>&lt;a onClick=&quot;myObject.method()&quot;&gt;这里可以是链接也可以是按钮或者其他东西&lt;/a&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,10),c=[i];function d(o,l){return n(),e("div",null,c)}const r=a(t,[["render",d],["__file","Android WebView he JS jiaohu.html.vue"]]);export{r as default};