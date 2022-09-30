import{_ as n,o as a,c as s,a as t}from"./app.81ed69ec.js";const p={},e=t(`<p>\u83B7\u53D6 <code>&lt;meta-data&gt;</code> \u5143\u7D20\u7684 <code>value</code> \u5C5E\u6027\u7684\u503C\uFF0C\u6709\u6CE8\u91CA\u4E0D\u89E3\u91CA\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">Activity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">ComponentName</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">Context</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span>pm<span class="token punctuation">.</span></span><span class="token class-name">ActivityInfo</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span>pm<span class="token punctuation">.</span></span><span class="token class-name">ApplicationInfo</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span>pm<span class="token punctuation">.</span></span><span class="token class-name">PackageManager</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span>pm<span class="token punctuation">.</span></span><span class="token class-name">ServiceInfo</span></span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * Created by shichaohui on 15/10/13.
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/&gt;</span></span>
 * meta-data\u5DE5\u5177\u7C7B.
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MetaDataUtils</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * \u83B7\u53D6application\u8282\u70B9\u4E2D\u7684meta-data\u5143\u7D20\u7684value\u5C5E\u6027\u503C.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">context</span> \u4E0A\u4E0B\u6587
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>     meta-data\u5143\u7D20\u7684name\u5C5E\u6027\u503C.
     * <span class="token keyword">@return</span> application\u8282\u70B9\u4E2D\u7684meta-data\u5143\u7D20\u7684value\u5C5E\u6027\u503C
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getApplicationData</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">ApplicationInfo</span> appInfo <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getPackageManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">getApplicationInfo</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">getPackageName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">PackageManager</span><span class="token punctuation">.</span>GET_META_DATA<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> appInfo<span class="token punctuation">.</span>metaData<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">PackageManager<span class="token punctuation">.</span>NameNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * \u83B7\u53D6activity\u8282\u70B9\u4E2D\u7684meta-data\u5143\u7D20\u7684value\u5C5E\u6027\u503C.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">context</span> \u4E0A\u4E0B\u6587
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>     meta-data\u5143\u7D20\u7684name\u5C5E\u6027\u503C.
     * <span class="token keyword">@return</span> activity\u8282\u70B9\u4E2D\u7684meta-data\u5143\u7D20\u7684value\u5C5E\u6027\u503C
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getActivityData</span><span class="token punctuation">(</span><span class="token class-name">Activity</span> context<span class="token punctuation">,</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">ActivityInfo</span> info <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getPackageManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">getActivityInfo</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">getComponentName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">PackageManager</span><span class="token punctuation">.</span>GET_META_DATA<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> info<span class="token punctuation">.</span>metaData<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">PackageManager<span class="token punctuation">.</span>NameNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * \u83B7\u53D6service\u8282\u70B9\u4E2D\u7684meta-data\u5143\u7D20\u7684value\u5C5E\u6027\u503C.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">context</span> \u4E0A\u4E0B\u6587
     * <span class="token keyword">@param</span> <span class="token parameter">cls</span>     meta-data\u6240\u5728\u7684Service.
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>     meta-data\u5143\u7D20\u7684name\u5C5E\u6027\u503C.
     * <span class="token keyword">@return</span> service\u8282\u70B9\u4E2D\u7684meta-data\u5143\u7D20\u7684value\u5C5E\u6027\u503C
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getServiceData</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> cls<span class="token punctuation">,</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">ServiceInfo</span> info <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getPackageManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">getServiceInfo</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ComponentName</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> cls<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">PackageManager</span><span class="token punctuation">.</span>GET_META_DATA<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> info<span class="token punctuation">.</span>metaData<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">PackageManager<span class="token punctuation">.</span>NameNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * \u83B7\u53D6receiver\u8282\u70B9\u4E2D\u7684meta-data\u5143\u7D20\u7684value\u5C5E\u6027\u503C.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">context</span> \u4E0A\u4E0B\u6587
     * <span class="token keyword">@param</span> <span class="token parameter">cls</span>     meta-data\u6240\u5728\u7684Service.
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>     meta-data\u5143\u7D20\u7684name\u5C5E\u6027\u503C.
     * <span class="token keyword">@return</span> receiver\u8282\u70B9\u4E2D\u7684meta-data\u5143\u7D20\u7684value\u5C5E\u6027\u503C
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getReceiverData</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> cls<span class="token punctuation">,</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">ActivityInfo</span> info <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getPackageManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">getReceiverInfo</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ComponentName</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> cls<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">PackageManager</span><span class="token punctuation">.</span>GET_META_DATA<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> info<span class="token punctuation">.</span>metaData<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">PackageManager<span class="token punctuation">.</span>NameNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[e];function o(l,i){return a(),s("div",null,c)}const k=n(p,[["render",o],["__file","Android \u83B7\u53D6 meta-data \u5143\u7D20\u7684 value \u5C5E\u6027\u7684\u503C.html.vue"]]);export{k as default};
