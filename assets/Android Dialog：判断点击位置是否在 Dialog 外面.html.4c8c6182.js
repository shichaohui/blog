import{_ as n,o as s,c as a,a as t}from"./app.81ed69ec.js";const p={},o=t(`<p>\u91CD\u5199 <code>Dialog</code> \u7684 <code>onTouchEvent</code> \u65B9\u6CD5\u5373\u53EF\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">onTouchEvent</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NonNull</span> <span class="token class-name">MotionEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//\u89E6\u6478\u5916\u90E8\u5F39\u7A97</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isOutOfBounds</span><span class="token punctuation">(</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// do somthing</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onTouchEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u70B9\u51FB\u4F4D\u7F6E\u662F\u5426\u5728\u5BF9\u8BDD\u6846\u5916\u90E8\u533A\u57DF</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isOutOfBounds</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">MotionEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> event<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> y <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> event<span class="token punctuation">.</span><span class="token function">getY</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> slop <span class="token operator">=</span> <span class="token class-name">ViewConfiguration</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getScaledWindowTouchSlop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Window</span> window <span class="token operator">=</span> <span class="token function">getWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>window <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">View</span> decorView <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getDecorView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>x <span class="token operator">&lt;</span> <span class="token operator">-</span>slop<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>y <span class="token operator">&lt;</span> <span class="token operator">-</span>slop<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>x <span class="token operator">&gt;</span> <span class="token punctuation">(</span>decorView<span class="token punctuation">.</span><span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> slop<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token operator">||</span> <span class="token punctuation">(</span>y <span class="token operator">&gt;</span> <span class="token punctuation">(</span>decorView<span class="token punctuation">.</span><span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> slop<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),e=[o];function c(l,i){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","Android Dialog\uFF1A\u5224\u65AD\u70B9\u51FB\u4F4D\u7F6E\u662F\u5426\u5728 Dialog \u5916\u9762.html.vue"]]);export{k as default};
