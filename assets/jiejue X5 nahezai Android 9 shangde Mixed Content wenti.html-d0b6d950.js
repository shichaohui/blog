import{_ as c,p,q as l,s as a,R as n,t as s,a2 as d,Y as e,n as t}from"./framework-a25df3d5.js";const u={},r=e(`<blockquote><p>I/chromium: [INFO:CONSOLE(0)] &quot;Mixed Content: The page at &#39;https://xxx&#39; was loaded over HTTPS, but requested an insecure image &#39;http://xxx&#39;. This request has been blocked; the content must be served over HTTPS.&quot;, source: https://xxx) (0)</p></blockquote><blockquote><p>I/chromium: [INFO:CONSOLE(43)] &quot;Mixed Content: The page at &#39;https://xxx&#39; was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint &#39;http:xxx)&#39;. This request has been blocked; the content must be served over HTTPS.&quot;, source: https://xxx.js) (43)</p></blockquote><h2 id="昨天晚上前端小姐姐找我" tabindex="-1"><a class="header-anchor" href="#昨天晚上前端小姐姐找我" aria-hidden="true">#</a> 昨天晚上前端小姐姐找我</h2><p>告诉我华为 <code>P30</code> 上部分用户的头像显示不出来，</p><p>还告诉我是 <code>HTTPS</code> 页面加载 <code>HTTP</code> 图片，</p><p>拿出我的 <code>P30Pro</code>，一顿操作和分析后提取出了上面两条信息，</p><p>再一顿搜索之后加入下面这段代码：</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>Build<span class="token punctuation">.</span>VERSION<span class="token punctuation">.</span>SDK_INT <span class="token operator">&gt;=</span> Build<span class="token punctuation">.</span>VERSION_CODES<span class="token punctuation">.</span>LOLLIPOP<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    settings<span class="token punctuation">.</span>mixedContentMode <span class="token operator">=</span> android<span class="token punctuation">.</span>webkit<span class="token punctuation">.</span>WebSettings<span class="token punctuation">.</span>MIXED_CONTENT_COMPATIBILITY_MODE
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而并没有解决问题。</strong></p><h2 id="找-x5-内核的技术人员反馈" tabindex="-1"><a class="header-anchor" href="#找-x5-内核的技术人员反馈" aria-hidden="true">#</a> 找 X5 内核的技术人员反馈</h2><p>X5 方让我提供内核版本信息，</p><p>使用我们的 APP 加载官方调试页面 http://debugtbs.qq.com，</p><p>居然 Toast 提示“加载失败，请检查网络”。</p>`,13),k=e('<p>按照官网加入 <code>android:networkSecurityConfig</code> 解决网络问题。</p><h2 id="神奇的事情发生了" tabindex="-1"><a class="header-anchor" href="#神奇的事情发生了" aria-hidden="true">#</a> 神奇的事情发生了</h2><p>带着这段代码运行了一下 APP，</p><p>发现不仅网络问题解决了，HTTP 的头像居然也显示出来了。</p><p>为了防止出现乌龙，</p><p>用各种姿势测试这段代码，发现果然有效。</p><p>但仅针对 X5 内核有效，系统内核还是不行。</p><p>重新加入 <code>settings.mixedContentMode</code> 再次测试，</p><p>完美运行。</p><h2 id="最终解决方案" tabindex="-1"><a class="header-anchor" href="#最终解决方案" aria-hidden="true">#</a> 最终解决方案</h2>',10),h={href:"https://x5.tencent.com/tbs/technical.html#/detail/sdk/1/b1b4cd06-f71e-47ab-b15f-f92fa9fe81da",target:"_blank",rel:"noopener noreferrer"},m=a("code",null,"network_security_config.xml",-1),b=e(`<div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>network-security-config</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>base-config</span> <span class="token attr-name">cleartextTrafficPermitted</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>network-security-config</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>&lt;application
    ....
    android:networkSecurityConfig=&quot;@xml/network_security_config&quot;
    ....
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤2：解决系统内核混合加载问题</strong></p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>Build<span class="token punctuation">.</span>VERSION<span class="token punctuation">.</span>SDK_INT <span class="token operator">&gt;=</span> Build<span class="token punctuation">.</span>VERSION_CODES<span class="token punctuation">.</span>LOLLIPOP<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    settings<span class="token punctuation">.</span>mixedContentMode <span class="token operator">=</span> android<span class="token punctuation">.</span>webkit<span class="token punctuation">.</span>WebSettings<span class="token punctuation">.</span>MIXED_CONTENT_COMPATIBILITY_MODE
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function v(x,g){const o=t("RouterLink"),i=t("ExternalLinkIcon");return p(),l("div",null,[r,a("p",null,[n("一顿搜索后发现官网有这个问题的"),s(o,{to:"/Android/%5Bhttps:/x5.tencent.com/tbs/technical.html#/detail/sdk/1/b1b4cd06-f71e-47ab-b15f-f92fa9fe81da%5D(https:/x5.tencent.com/tbs/technical.html#/detail/sdk/1/b1b4cd06-f71e-47ab-b15f-f92fa9fe81da)"},{default:d(()=>[n("解决方案")]),_:1}),n("。")]),k,a("p",null,[a("strong",null,[n("步骤1："),a("a",h,[n("解决 Android 9 上的网络问题"),s(i)])]),n(" 添加 "),m,n(" 文件并设置给 application：")]),b])}const f=c(u,[["render",v],["__file","jiejue X5 nahezai Android 9 shangde Mixed Content wenti.html.vue"]]);export{f as default};