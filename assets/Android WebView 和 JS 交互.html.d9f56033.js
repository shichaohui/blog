import{_ as a,o as n,c as e,a as s}from"./app.2f78326a.js";const t={},c=s(`<h2 id="android-\u8C03\u7528-js" tabindex="-1"><a class="header-anchor" href="#android-\u8C03\u7528-js" aria-hidden="true">#</a> Android \u8C03\u7528 js</h2><p>\u8C03\u7528\u65B9\u5F0F\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>mWebView<span class="token punctuation">.</span><span class="token function">loadUrl</span><span class="token punctuation">(</span><span class="token string">&quot;javascript:method()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5176\u4E2D <code>method()</code> \u662F js \u4E2D\u7684\u4E00\u4E2A\u65B9\u6CD5\u3002</p><h2 id="js\u8C03\u7528android" tabindex="-1"><a class="header-anchor" href="#js\u8C03\u7528android" aria-hidden="true">#</a> js\u8C03\u7528Android</h2><p>\u8C03\u7528\u65B9\u5F0F\uFF1A</p><ul><li>\u9996\u5148\u5728Java\u7C7B\u4F5C\u4E3A\u88AB\u8C03\u7528\u5BF9\u8C61\uFF0C\u8FD9\u91CC\u53EB\u505A <code>JavaScriptInterfaceObject</code> \uFF0C\u5176\u4E2D\u6709\u4E2A\u65B9\u6CD5\u53EB <code>method()</code> \uFF1B</li><li>\u5176\u6B21\u4F7F\u7528\u4EE5\u4E0B\u65B9\u6CD5\u6CE8\u5165\u5BF9\u8C61\u5230 js\u3002</li></ul><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>mWebView<span class="token punctuation">.</span><span class="token function">addJavaScriptInterface</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">JavaScriptInterfaceObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;myObject&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u6700\u540E\u5728js\u4E2D\u4F7F\u7528\u8BE5\u5BF9\u8C61\uFF1A</li></ul><div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre class="language-JavaScript"><code>&lt;a onClick=&quot;myObject.method()&quot;&gt;\u8FD9\u91CC\u53EF\u4EE5\u662F\u94FE\u63A5\u4E5F\u53EF\u4EE5\u662F\u6309\u94AE\u6216\u8005\u5176\u4ED6\u4E1C\u897F&lt;/a&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,10),i=[c];function o(d,l){return n(),e("div",null,i)}const r=a(t,[["render",o],["__file","Android WebView \u548C JS \u4EA4\u4E92.html.vue"]]);export{r as default};
