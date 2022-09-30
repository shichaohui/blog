import{_ as n,o as a,c as s,a as t}from"./app.81ed69ec.js";const e={},p=t(`<p>\u5F00\u542F\u5168\u5C40\u7684\u60AC\u6D6E\u7A97\uFF08\u5373\u8986\u76D6\u5728\u6240\u6709 <code>Activity</code> \u4E0A\u7684\u60AC\u6D6E\u7A97\uFF09\u9700\u8981\u4F7F\u7528 <code>Application</code> \u7684 <code>Window</code> \uFF0C\u5373\u4F7F\u7528 <code>Application Context</code>\u83B7\u53D6 <code>WindowManager</code>\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">WindowManager</span> manager <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">WindowManager</span><span class="token punctuation">)</span> applicationContext<span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span>WINDOW_SERVICE<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5982\u679C\u4F7F\u7528 <code>Activity Context</code> \u83B7\u53D6 <code>WindowManager</code>\uFF0C\u5219\u60AC\u6D6E\u7A97\u53EA\u80FD\u663E\u793A\u5728\u5F53\u524D <code>Activity</code>\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">WindowManager</span> manager <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">WindowManager</span><span class="token punctuation">)</span> activityContext<span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span>WINDOW_SERVICE<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u7533\u8BF7\u6743\u9650\u65B9\u5F0F\u5F00\u542F\u60AC\u6D6E\u7A97" tabindex="-1"><a class="header-anchor" href="#\u7533\u8BF7\u6743\u9650\u65B9\u5F0F\u5F00\u542F\u60AC\u6D6E\u7A97" aria-hidden="true">#</a> \u7533\u8BF7\u6743\u9650\u65B9\u5F0F\u5F00\u542F\u60AC\u6D6E\u7A97:</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">WindowManager</span> manager <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">WindowManager</span><span class="token punctuation">)</span> context<span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span>WINDOW_SERVICE<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">TextView</span> textView <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TextView</span><span class="token punctuation">(</span><span class="token class-name">MainActivity</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
textView<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token string">&quot;\u60AC\u6D6E\u7A97\u6D4B\u8BD5&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span> lp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">(</span>
        <span class="token class-name">ViewGroup<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>WRAP_CONTENT<span class="token punctuation">,</span>
        <span class="token class-name">ViewGroup<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>WRAP_CONTENT<span class="token punctuation">,</span>
        <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>TYPE_SYSTEM_ALERT<span class="token punctuation">,</span>
        <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>FLAG_NOT_FOCUSABLE
                <span class="token operator">|</span> <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>FLAG_NOT_TOUCHABLE
                <span class="token operator">|</span> <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>FLAG_KEEP_SCREEN_ON<span class="token punctuation">,</span>
        <span class="token class-name">PixelFormat</span><span class="token punctuation">.</span>TRANSLUCENT
                <span class="token operator">|</span> <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>FIRST_SYSTEM_WINDOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
manager<span class="token punctuation">.</span><span class="token function">addView</span><span class="token punctuation">(</span>textView<span class="token punctuation">,</span> lp<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u6DFB\u52A0\u6743\u9650" tabindex="-1"><a class="header-anchor" href="#\u6DFB\u52A0\u6743\u9650" aria-hidden="true">#</a> \u6DFB\u52A0\u6743\u9650\uFF1A</h4><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>android.permission.SYSTEM_ALERT_WINDOW<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u4E0D\u9700\u6743\u9650\u5F00\u542F\u60AC\u6D6E\u7A97" tabindex="-1"><a class="header-anchor" href="#\u4E0D\u9700\u6743\u9650\u5F00\u542F\u60AC\u6D6E\u7A97" aria-hidden="true">#</a> \u4E0D\u9700\u6743\u9650\u5F00\u542F\u60AC\u6D6E\u7A97</h2><p>\u5C06\u4E0A\u9762\u4EE3\u7801\u4E2D\u7684 <code>WindowManager.LayoutParams.TYPE_SYSTEM_ALERT</code> \u6539\u6210 <code>WindowManager.LayoutParams.TYPE_TOAST</code> \u5373\u53EF\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">WindowManager</span> manager <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">WindowManager</span><span class="token punctuation">)</span> context<span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span>WINDOW_SERVICE<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">TextView</span> textView <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TextView</span><span class="token punctuation">(</span><span class="token class-name">MainActivity</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
textView<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token string">&quot;\u60AC\u6D6E\u7A97\u6D4B\u8BD5&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span> lp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">(</span>
        <span class="token class-name">ViewGroup<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>WRAP_CONTENT<span class="token punctuation">,</span>
        <span class="token class-name">ViewGroup<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>WRAP_CONTENT<span class="token punctuation">,</span>
        <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>TYPE_TOAST<span class="token punctuation">,</span>
        <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>FLAG_NOT_FOCUSABLE
                <span class="token operator">|</span> <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>FLAG_NOT_TOUCHABLE
                <span class="token operator">|</span> <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>FLAG_KEEP_SCREEN_ON<span class="token punctuation">,</span>
        <span class="token class-name">PixelFormat</span><span class="token punctuation">.</span>TRANSLUCENT
                <span class="token operator">|</span> <span class="token class-name">WindowManager<span class="token punctuation">.</span>LayoutParams</span><span class="token punctuation">.</span>FIRST_SYSTEM_WINDOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
manager<span class="token punctuation">.</span><span class="token function">addView</span><span class="token punctuation">(</span>textView<span class="token punctuation">,</span> lp<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),o=[p];function c(i,l){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","Android \u5F00\u542F\u60AC\u6D6E\u7A97.html.vue"]]);export{r as default};
