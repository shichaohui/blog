import{_ as n,o as s,c as a,a as t}from"./app.81ed69ec.js";const p={},e=t(`<p>\u8FD9\u4E2A\u529F\u80FD\u5176\u5B9E\u5F88\u7B80\u5355\uFF0C\u770B\u4EE3\u7801\u3002</p><p>\u5148\u5B9A\u4E49\u4E00\u4E2A <code>View</code> \u7684\u96C6\u5408\u548C\u4E00\u4E2A <code>View</code> \u91CC\u9762\u663E\u793A\u56FE\u7247\u7684 id \u7684\u6570\u7EC4\uFF0C\u90FD\u7528\u96C6\u5408\u4E5F\u53EF\u4EE5\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">View</span><span class="token punctuation">&gt;</span></span> viewList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">View</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ids <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token class-name">R</span><span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>pic_1<span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>pic_2<span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>pic_3 <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u7740\u521B\u5EFA <code>View</code>\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">createView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521B\u5EFA\u4E00\u4E2A\u8DDF\u6700\u540E\u4E00\u4E2A\u4E00\u6837\u7684\u653E\u5728\u524D\u9762</span>
	viewList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">createImageView</span><span class="token punctuation">(</span>ids<span class="token punctuation">[</span>ids<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> ids<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		viewList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">createImageView</span><span class="token punctuation">(</span>ids<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// \u521B\u5EFA\u4E00\u4E2A\u8DDF\u7B2C\u4E00\u4E2A\u4E00\u6837\u7684\u653E\u5728\u540E\u9762</span>
	viewList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">createImageView</span><span class="token punctuation">(</span>ids<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u591A\u751F\u6210\u4E24\u4E2A\u8F85\u52A9\u7684 <code>View</code>\uFF0C\u8FD9\u6837\u7684\u4E00\u4E2A <code>View</code> \u96C6\u5408\u4F7F\u7528 <code>ViewPage</code> \u663E\u793A\u4E4B\u540E\uFF0C\u56FE\u7247 1 \u5F80\u56DE\u6EDA\u52A8\u5C31\u4F1A\u663E\u793A\u56FE\u72473\uFF0C\u56FE\u7247 3 \u6B63\u5E38\u6EDA\u52A8\u5C31\u4F1A\u663E\u793A\u56FE\u7247 1\u3002</p><p>\u770B\u8D77\u6765\u662F\u4E0D\u662F\u5FAA\u73AF\u4E86\u5462\uFF1F\u6709\u4EBA\u60F3\u8BF4\uFF1A\u4F60\u8FD9\u4E0D\u662F\u778E\u6BD4\u6BD4\u4E48\uFF0C\u8FD9\u6837\u56FE\u7247 3 \u6EDA\u5230\u56FE\u7247 1 \u518D\u7EE7\u7EED\u6EDA\u4E0D\u8FD8\u662F\u52A8\u4E0D\u4E86\u4E86\u5417\uFF1F\u8FD9\u6837\u7684\u95EE\u9898\u5F53\u7136\u8981\u89E3\u51B3\u4E86\uFF0C\u4E0D\u7136\u5C31\u4E0D\u53EB\u5FAA\u73AF\u4E86\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">OnPageChangeListener</span> myOnPageChangeListener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OnPageChangeListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onPageSelected</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg0<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onPageScrolled</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg0<span class="token punctuation">,</span> <span class="token keyword">float</span> arg1<span class="token punctuation">,</span> <span class="token keyword">int</span> arg2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u65E0\u9650\u5FAA\u73AF\u6ED1\u52A8</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>ids<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// \u591A\u4E8E\u4E00\u4E2Aview\u624D\u4F1A\u5FAA\u73AF\u8DF3\u8F6C</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>arg0 <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> arg2 <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token comment">// \u5207\u6362\u5FAA\u73AF\u66F4\u52A0\u6D41\u7545\uFF0C\u4E0D\u4F1A\u51FA\u73B0\u751F\u786C\u7684\u5207\u6362\u611F\u89C9</span>
				arg0 <span class="token operator">=</span> ids<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
				viewpager<span class="token punctuation">.</span><span class="token function">setCurrentItem</span><span class="token punctuation">(</span>arg0<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>arg0 <span class="token operator">&gt;</span> ids<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				viewpager<span class="token punctuation">.</span><span class="token function">setCurrentItem</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onPageScrollStateChanged</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg0<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u628A\u8FD9\u4E2A\u76D1\u542C\u5B9E\u4F8B\u8BBE\u7F6E\u7ED9 <code>ViewPage</code> \u5B9E\u4F8B\u5C31\u597D\u5566\u3002</p><p><code>setCurrentItem(arg0, false);</code> <code>false</code> \u8868\u793A\u65E0\u52A8\u753B\u6EDA\u52A8\uFF0C\u5C31\u662F\u76F4\u63A5\u6539\u53D8\u6B63\u5728\u663E\u793A\u7684 <code>View</code>\u3002 \u6240\u4EE5... \u770B\u51FA\u6765\u4E86\u5427\uFF0C\u5230\u4E86\u6700\u540E\u4E00\u4E2A\u7684\u65F6\u5019\u7ACB\u523B\u65E0\u52A8\u753B\u8FDB\u5165\u7B2C\u4E00\u4E2A\uFF0C\u7531\u4E8E\u7B2C\u4E00\u4E2A\u548C\u6700\u540E\u4E00\u4E2A\u662F\u4E00\u6A21\u4E00\u6837\u7684\uFF0C\u6240\u4EE5\u770B\u8D77\u6765\u5C31\u50CF\u76F4\u63A5\u4ECE\u6700\u540E\u4E00\u4E2A\u6709\u52A8\u753B\u8FDB\u5165\u4E86\u7B2C\u4E00\u4E2A\uFF0C\u5C31\u662F\u5FAA\u73AF\u5566\u3002</p><p>\u4E0B\u9762\u8D34\u51FA\u4E00\u4EFD\u5B8C\u6574\u7684\u4EE3\u7801</p><p><strong>\u5E03\u5C40\u6587\u4EF6\uFF1A</strong></p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LinearLayout</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res/android<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">xmlns:</span>tools</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/tools<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>orientation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>vertical<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>android.support.v4.view.ViewPager</span>
        <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/view_pager<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>LinearLayout</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Java\u4EE3\u7801\uFF1A</strong></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">Activity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>os<span class="token punctuation">.</span></span><span class="token class-name">Bundle</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>support<span class="token punctuation">.</span>v4<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">PagerAdapter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>support<span class="token punctuation">.</span>v4<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">ViewPager</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>support<span class="token punctuation">.</span>v4<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">ViewPager</span><span class="token punctuation">.</span><span class="token class-name">OnPageChangeListener</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">View</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">ViewGroup</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">ImageView</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainActivity</span> <span class="token keyword">extends</span> <span class="token class-name">Activity</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">ViewPager</span> viewpager <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">View</span><span class="token punctuation">&gt;</span></span> viewList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">View</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ids <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token class-name">R</span><span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>pic_1<span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>pic_2<span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>pic_3 <span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token class-name">Bundle</span> savedInstanceState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">setContentView</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>activity_main<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">initViewPagerData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u521D\u59CB\u5316\u754C\u9762</span>
		viewpager <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ViewPager</span><span class="token punctuation">)</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>view_pager<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// \u6DFB\u52A0\u4E8B\u4EF6</span>
		viewpager<span class="token punctuation">.</span><span class="token function">setOnPageChangeListener</span><span class="token punctuation">(</span>myOnPageChangeListener<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">initViewPagerData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		
		<span class="token function">createView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		viewpager<span class="token punctuation">.</span><span class="token function">setAdapter</span><span class="token punctuation">(</span>pagerAdapter<span class="token punctuation">)</span><span class="token punctuation">;</span>
		viewpager<span class="token punctuation">.</span><span class="token function">setCurrentItem</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">createView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u521B\u5EFA\u4E00\u4E2A\u8DDF\u6700\u540E\u4E00\u4E2A\u4E00\u6837\u7684\u653E\u5728\u524D\u9762</span>
		viewList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">createImageView</span><span class="token punctuation">(</span>ids<span class="token punctuation">[</span>ids<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> ids<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			viewList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">createImageView</span><span class="token punctuation">(</span>ids<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// \u521B\u5EFA\u4E00\u4E2A\u8DDF\u7B2C\u4E00\u4E2A\u4E00\u6837\u7684\u653E\u5728\u540E\u9762</span>
		viewList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">createImageView</span><span class="token punctuation">(</span>ids<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">private</span> <span class="token class-name">ImageView</span> <span class="token function">createImageView</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">ImageView</span> view <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ImageView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		view<span class="token punctuation">.</span><span class="token function">setBackgroundResource</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> view<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token class-name">OnPageChangeListener</span> myOnPageChangeListener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OnPageChangeListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token annotation punctuation">@Override</span>
		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onPageSelected</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg0<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token punctuation">}</span>

		<span class="token annotation punctuation">@Override</span>
		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onPageScrolled</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg0<span class="token punctuation">,</span> <span class="token keyword">float</span> arg1<span class="token punctuation">,</span> <span class="token keyword">int</span> arg2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// \u65E0\u9650\u5FAA\u73AF\u6ED1\u52A8</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>ids<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// \u591A\u4E8E\u4E00\u4E2Aview\u624D\u4F1A\u5FAA\u73AF\u8DF3\u8F6C</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>arg0 <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> arg2 <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token comment">// \u5207\u6362\u5FAA\u73AF\u66F4\u52A0\u6D41\u7545\uFF0C\u4E0D\u4F1A\u51FA\u73B0\u751F\u786C\u7684\u5207\u6362\u611F\u89C9</span>
					arg0 <span class="token operator">=</span> ids<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
					viewpager<span class="token punctuation">.</span><span class="token function">setCurrentItem</span><span class="token punctuation">(</span>arg0<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>arg0 <span class="token operator">&gt;</span> ids<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					viewpager<span class="token punctuation">.</span><span class="token function">setCurrentItem</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token annotation punctuation">@Override</span>
		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onPageScrollStateChanged</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg0<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token class-name">PagerAdapter</span> pagerAdapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PagerAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token annotation punctuation">@Override</span>
		<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isViewFromObject</span><span class="token punctuation">(</span><span class="token class-name">View</span> arg0<span class="token punctuation">,</span> <span class="token class-name">Object</span> arg1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> arg0 <span class="token operator">==</span> arg1<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token annotation punctuation">@Override</span>
		<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> viewList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">instantiateItem</span><span class="token punctuation">(</span><span class="token class-name">ViewGroup</span> container<span class="token punctuation">,</span> <span class="token keyword">int</span> position<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">ViewPager</span><span class="token punctuation">)</span> container<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addView</span><span class="token punctuation">(</span>viewList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span> viewList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">;</span>

		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroyItem</span><span class="token punctuation">(</span><span class="token class-name">ViewGroup</span> container<span class="token punctuation">,</span> <span class="token keyword">int</span> position<span class="token punctuation">,</span> <span class="token class-name">Object</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">ViewPager</span><span class="token punctuation">)</span> container<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">removeView</span><span class="token punctuation">(</span>viewList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","Android ViewPager \u5FAA\u73AF\u6EDA\u52A8.html.vue"]]);export{k as default};
