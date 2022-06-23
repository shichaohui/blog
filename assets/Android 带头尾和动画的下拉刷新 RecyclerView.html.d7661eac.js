import{_ as c,r as p,o,c as i,b as n,d as e,e as a,a as t}from"./app.5e319a5d.js";const l={},u=n("p",null,"\u9879\u76EE\u5730\u5740\uFF1Ahttps://github.com/shichaohui/AnimRefreshRecyclerView",-1),d=n("p",null,[a("\u9879\u76EE\u4E2D\u5305\u542B\u4E00\u4E2Ademo\uFF08\u666E\u901A "),n("code",null,"Android"),a(" \u5DE5\u7A0B\uFF09\u548C "),n("code",null,"Android Library"),a("\uFF0C\u611F\u5174\u8DA3\u7684\u540C\u5B66\u53EF\u4EE5\u81EA\u5DF1\u4E0B\u8F7D\u6E90\u7801\u548C Demo\u3002")],-1),r=a("\u611F\u8C22"),k={href:"http://blog.csdn.net/bingaicao1",target:"_blank",rel:"noopener noreferrer"},m=a("bingaicao1"),v=a("\u63D0\u4F9B\u7684\u5E2E\u52A9\u3002"),b=t(`<p>\u6548\u679C\u9884\u89C8\uFF0C\u55EF...\u770B\u8D77\u6765\u6709\u70B9\u5361\uFF0C\u622A\u56FE\u8F6F\u4EF6\u7684\u95EE\u9898\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/img_convert/8846a50682d278a90abff04909803006.gif" alt="\u5E26\u52A8\u753B\u7684\u4E0B\u62C9\u5237\u65B0RecyclerView"></p><p><strong>\u4E0A\u56FE\u4E2D\u6F14\u793A\u4E86\u4E09\u79CD\u4E0D\u540C\u7684\u5E03\u5C40\u548C\u4E0B\u62C9\u6548\u679C\uFF0C\u4E09\u79CD\u5E03\u5C40\u548C\u4E09\u79CD\u4E0B\u62C9\u6548\u679C\u53EF\u4EE5\u901A\u8FC7 Header \u7684\u8BBE\u7F6E\u4EFB\u610F\u7EC4\u5408\u3002</strong></p><p>\u56FE\u4E2D\u666E\u901A\u5217\u8868\u662F <code>ListView</code> \u6837\u5F0F\uFF0C\u6CA1\u6709\u8BBE\u7F6E <code>Header</code> \u548C <code>Footer</code>\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u7684\u4E0B\u62C9\u5237\u65B0\u548C\u4E0A\u62C9\u52A0\u8F7D\u3002</p><p>\u5BAB\u683C\u5217\u8868\u4F7F\u7528\u7684\u662F\u81EA\u5B9A\u4E49 <code>Header</code> \u548C <code>Footer</code> \u7684\u4E0B\u62C9\u5237\u65B0\u548C\u4E0A\u62C9\u4E0A\u62C9\u52A0\u8F7D\uFF0C\u5E76\u8BBE\u7F6E\u4E86\u4E0B\u62C9\u4F7F\u653E\u5927\u7684\u56FE\u7247\u3002</p><p>\u7011\u5E03\u6D41\u5217\u8868\u4F7F\u7528\u7684\u662F\u81EA\u5B9A\u4E49 <code>Header</code> \u548C <code>Footer</code> \u7684\u4E0B\u62C9\u5237\u65B0\u548C\u4E0A\u62C9\u4E0A\u62C9\u52A0\u8F7D\uFF0C\u6CA1\u6709\u8BBE\u7F6E\u4E86\u4E0B\u62C9\u4F7F\u653E\u5927\u7684\u56FE\u7247\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u7684\u5237\u65B0\u52A8\u753B\u3002</p><h2 id="\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165" aria-hidden="true">#</a> \u5F15\u5165</h2><p>Gradle:</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code>dependencies {
    compile &#39;com.android.support:recyclerview-v7:23.1.0&#39;
    compile &#39;com.sch.rfview:AnimRefreshRecyclerView:1.0.6@aar&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Eclipse</code> \u7684\u540C\u5B66\u4EEC\u53EF\u4EE5\u81EA\u5DF1\u4E0B\u8F7D\u6E90\u7801\u62F7\u8D1D <code>java</code> \u6587\u4EF6\u5230\u81EA\u5DF1\u7684\u5DE5\u7A0B\uFF08\u522B\u5FD8\u4E86\u5F15\u7528 <code>RecyclerView</code> \u7684\u5305\u54E6\uFF09\u3002</p><p>\u4EE3\u7801\u4E2D\u7684\u914D\u7F6E\u53C2\u8003\u4E0B\u9762\u7684\u7528\u6CD5\u4EE3\u7801\u7247\u6BB5\uFF0C\u9664\u4E86 <code>RecyclerView</code> \u81EA\u5E26\u7684\u65B9\u6CD5\uFF0C\u5176\u4ED6\u65B9\u6CD5\u90FD\u662F\u53EF\u9009\u7684\u3002</p><h2 id="\u6839\u636E\u5217\u8868\u7684\u4E0D\u540C\u6548\u679C\u9009\u62E9\u4E0D\u540C\u7684\u5E03\u5C40\u7BA1\u7406\u5668" tabindex="-1"><a class="header-anchor" href="#\u6839\u636E\u5217\u8868\u7684\u4E0D\u540C\u6548\u679C\u9009\u62E9\u4E0D\u540C\u7684\u5E03\u5C40\u7BA1\u7406\u5668" aria-hidden="true">#</a> \u6839\u636E\u5217\u8868\u7684\u4E0D\u540C\u6548\u679C\u9009\u62E9\u4E0D\u540C\u7684\u5E03\u5C40\u7BA1\u7406\u5668</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u4F7F\u7528\u91CD\u5199\u540E\u7684\u7EBF\u6027\u5E03\u5C40\u7BA1\u7406\u5668</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setLayoutManager</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AnimRFLinearLayoutManager</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u4F7F\u7528\u91CD\u5199\u540E\u7684\u683C\u5B50\u5E03\u5C40\u7BA1\u7406\u5668</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setLayoutManager</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AnimRFGridLayoutManager</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u4F7F\u7528\u91CD\u5199\u540E\u7684\u7011\u5E03\u6D41\u5E03\u5C40\u7BA1\u7406\u5668</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setLayoutManager</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AnimRFStaggeredGridLayoutManager</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token class-name">StaggeredGridLayoutManager</span><span class="token punctuation">.</span>VERTICAL<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6839\u636E\u4E0D\u540C\u7684\u5E03\u5C40\u7BA1\u7406\u5668\u8BBE\u7F6E\u5206\u5272\u7EBF" tabindex="-1"><a class="header-anchor" href="#\u6839\u636E\u4E0D\u540C\u7684\u5E03\u5C40\u7BA1\u7406\u5668\u8BBE\u7F6E\u5206\u5272\u7EBF" aria-hidden="true">#</a> \u6839\u636E\u4E0D\u540C\u7684\u5E03\u5C40\u7BA1\u7406\u5668\u8BBE\u7F6E\u5206\u5272\u7EBF</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u8BBE\u7F6E\u5217\u8868\u5E03\u5C40\u7684\u5206\u5272\u7EBF</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">addItemDecoration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DividerItemDecoration</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span>
        mAnimRFLinearLayoutManager<span class="token punctuation">.</span><span class="token function">getOrientation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u7F51\u683C\u6216\u8005\u7011\u5E03\u6D41\u5E03\u5C40\u7684\u5206\u5272\u7EBF</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">addItemDecoration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DividerGridItemDecoration</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u8BBE\u7F6Eheader\u548Cfooter" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6Eheader\u548Cfooter" aria-hidden="true">#</a> \u8BBE\u7F6EHeader\u548CFooter</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u5934\u90E8</span>
headerView <span class="token operator">=</span> <span class="token class-name">LayoutInflater</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">inflate</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>header_view<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u811A\u90E8</span>
footerView <span class="token operator">=</span> <span class="token class-name">LayoutInflater</span><span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">inflate</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>footer_view<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u6DFB\u52A0\u5934\u90E8\u548C\u811A\u90E8\uFF0C\u5982\u679C\u4E0D\u6DFB\u52A0\u5C31\u4F7F\u7528\u9ED8\u8BA4\u7684\u5934\u90E8\u548C\u811A\u90E8\uFF08\u5934\u90E8\u53EF\u4EE5\u6709\u591A\u4E2A\uFF09</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">addHeaderView</span><span class="token punctuation">(</span>headerView<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u8BBE\u7F6E\u5934\u90E8\u7684\u6700\u5927\u62C9\u4F38\u500D\u7387\uFF0C\u9ED8\u8BA41.5f\uFF0C\u5FC5\u987B\u5199\u5728setHeaderImage()\u4E4B\u524D</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setScaleRatio</span><span class="token punctuation">(</span><span class="token number">2.0f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u8BBE\u7F6E\u4E0B\u62C9\u65F6\u62C9\u4F38\u7684\u56FE\u7247\uFF0C\u4E0D\u8BBE\u7F6E\u5C31\u4F7F\u7528\u9ED8\u8BA4\u7684</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setHeaderImage</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">ImageView</span><span class="token punctuation">)</span> headerView<span class="token punctuation">.</span><span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>iv_hander<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">addFootView</span><span class="token punctuation">(</span>footerView<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u901A\u8FC7<code>addHeaderView()</code>\u548C<code>setHeaderImage()</code>\u65B9\u6CD5\u4EFB\u610F\u7EC4\u5408\u4E0B\u62C9\u6548\u679C\uFF0C\u53EF\u4EE5\u8C03\u7528\u591A\u6B21<code>addHeaderView()</code>\u65B9\u6CD5\u6DFB\u52A0\u591A\u4E2A\u5934\u90E8\uFF0C\u4F46\u662F<code>setHeaderImage()</code>\u65B9\u6CD5\u6700\u591A\u88AB\u8C03\u7528\u4E00\u6B21\u3002 \u6700\u591A\u8C03\u7528\u4E00\u6B21<code>addFootView()</code>\u65B9\u6CD5\uFF0C\u5373\u6700\u591A\u8BBE\u7F6E\u4E00\u4E2AFooterView\u3002</p><h2 id="\u5176\u4ED6\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u8BBE\u7F6E" aria-hidden="true">#</a> \u5176\u4ED6\u8BBE\u7F6E</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u8BBE\u7F6E\u5237\u65B0\u52A8\u753B\u7684\u989C\u8272\uFF08\u53EF\u9009\uFF09</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setColor</span><span class="token punctuation">(</span><span class="token class-name">Color</span><span class="token punctuation">.</span>RED<span class="token punctuation">,</span> <span class="token class-name">Color</span><span class="token punctuation">.</span>WHITE<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u8BBE\u7F6E\u5934\u90E8\u6062\u590D\u52A8\u753B\u7684\u6267\u884C\u65F6\u95F4\uFF0C\u9ED8\u8BA4500\u6BEB\u79D2\uFF08\u53EF\u9009\uFF09</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setHeaderImageDurationMillis</span><span class="token punctuation">(</span><span class="token number">1200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u8BBE\u7F6E\u62C9\u4F38\u5230\u6700\u9AD8\u65F6\u5934\u90E8\u7684\u900F\u660E\u5EA6\uFF0C\u9ED8\u8BA40.5f\uFF08\u53EF\u9009\uFF09</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setHeaderImageMinAlpha</span><span class="token punctuation">(</span><span class="token number">0.6f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u9002\u914D\u5668</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setAdapter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u5237\u65B0\u548C\u52A0\u8F7D\u66F4\u591A\u6570\u636E\u7684\u76D1\u542C\uFF0C\u5206\u522B\u5728onRefresh()\u548ConLoadMore()\u65B9\u6CD5\u4E2D\u6267\u884C\u5237\u65B0\u548C\u52A0\u8F7D\u66F4\u591A\u64CD\u4F5C</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">setLoadDataListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AnimRFRecyclerView<span class="token punctuation">.</span>LoadDataListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	    <span class="token comment">// \u5F00\u542F\u7EBF\u7A0B\u5237\u65B0\u6570\u636E</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyRunnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onLoadMore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	    <span class="token comment">// \u5F00\u542F\u7EBF\u52A0\u8F7D\u66F4\u591A\u6570\u636E</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyRunnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u624B\u52A8\u5237\u65B0" tabindex="-1"><a class="header-anchor" href="#\u624B\u52A8\u5237\u65B0" aria-hidden="true">#</a> \u624B\u52A8\u5237\u65B0</h2>`,21),h=a("\u5982\u679C\u60F3\u7B2C\u4E00\u6B21\u8FDB\u5165\u754C\u9762\u65F6\u5C31\u663E\u793A\u52A0\u8F7D\u6570\u636E\u7684\u52A8\u753B\uFF0C\u9700\u8981\u4F7F\u7528\u624B\u52A8\u5237\u65B0\u7684\u65B9\u6CD5\u3002\u6B64\u65B9\u6CD5\u9700\u8981\u5728\u5176\u4ED6\u8BBE\u7F6E\u5B8C\u6210\u540E\u8C03\u7528,\u5177\u4F53\u4F7F\u7528\u53EF\u4EE5"),w={href:"https://github.com/shichaohui/AnimRefreshRecyclerView/blob/master/app/src/main/java/com/sch/rfview/example/fragment/LinearFragment.java",target:"_blank",rel:"noopener noreferrer"},f=a("\u770B\u8FD9\u91CC"),g=t(`<div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>mRecyclerView<span class="token punctuation">.</span><span class="token function">setRefresh</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5728\u5237\u65B0\u548C\u52A0\u8F7D\u8FC7\u66F4\u591A\u5B8C\u6210\u4E4B\u540E\u8C03\u7528\u4EE3\u7801\u505C\u6B62\u52A8\u753B" tabindex="-1"><a class="header-anchor" href="#\u5728\u5237\u65B0\u548C\u52A0\u8F7D\u8FC7\u66F4\u591A\u5B8C\u6210\u4E4B\u540E\u8C03\u7528\u4EE3\u7801\u505C\u6B62\u52A8\u753B" aria-hidden="true">#</a> \u5728\u5237\u65B0\u548C\u52A0\u8F7D\u8FC7\u66F4\u591A\u5B8C\u6210\u4E4B\u540E\u8C03\u7528\u4EE3\u7801\u505C\u6B62\u52A8\u753B</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u5237\u65B0\u5B8C\u6210\u540E\u8C03\u7528\uFF0C\u5FC5\u987B\u5728UI\u7EBF\u7A0B\u4E2D</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">refreshComplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u52A0\u8F7D\u66F4\u591A\u5B8C\u6210\u540E\u8C03\u7528\uFF0C\u5FC5\u987B\u5728UI\u7EBF\u7A0B\u4E2D</span>
mRecyclerView<span class="token punctuation">.</span><span class="token function">loadMoreComplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7981\u6B62\u5237\u65B0" tabindex="-1"><a class="header-anchor" href="#\u7981\u6B62\u5237\u65B0" aria-hidden="true">#</a> \u7981\u6B62\u5237\u65B0</h2><p>\u5982\u679C\u4E0D\u60F3\u4F7F\u7528\u81EA\u5E26\u7684\u5237\u65B0\u6548\u679C\uFF0C\u800C\u60F3\u8981\u4F7F\u7528 <code>SwipRefreshLayout</code> \u505A\u5237\u65B0\uFF0C\u53EF\u4F7F\u7528\u4EE5\u4E0B\u4EE3\u7801\u7981\u6B62\u81EA\u5E26\u7684\u5237\u65B0\u6548\u679C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mRecyclerView.setRefreshEnable(false);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Tips\uFF1A</strong></p><ul><li>\u82E5\u5728\u4F7F\u7528\u8FC7\u7A0B\u4E2D\u53D1\u73B0 <code>adapter.notifyDataSetChange()</code> \u7B49\u66F4\u65B0\u6570\u636E\u7684\u65B9\u6CD5\u65E0\u6548\uFF0C\u53EF\u4F7F\u7528 <code>recyclerView.getAdapter()</code> \u83B7\u53D6\u5F53\u524D\u4F7F\u7528\u7684 <code>Adapter</code>\uFF0C\u5E76\u4F7F\u7528\u83B7\u53D6\u5230\u5230 <code>Adapter</code> \u66F4\u65B0\u6570\u636E\u3002</li></ul>`,8);function y(_,R){const s=p("ExternalLinkIcon");return o(),i("div",null,[u,d,n("p",null,[r,n("a",k,[m,e(s)]),v]),b,n("p",null,[h,n("a",w,[f,e(s)])]),g])}var x=c(l,[["render",y],["__file","Android \u5E26\u5934\u5C3E\u548C\u52A8\u753B\u7684\u4E0B\u62C9\u5237\u65B0 RecyclerView.html.vue"]]);export{x as default};
