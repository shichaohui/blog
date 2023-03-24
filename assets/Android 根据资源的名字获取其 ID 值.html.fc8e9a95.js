import{_ as n,o as s,c as a,a as t}from"./app.eb9fa6b0.js";const e={},p=t(`<div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">Context</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * \u6839\u636E\u8D44\u6E90\u7684\u540D\u5B57\u83B7\u53D6\u5176ID\u503C
 * 
 * <span class="token keyword">@author</span> shichaohui@meiriq.com
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MResource</span> <span class="token punctuation">{</span>

	<span class="token doc-comment comment">/**
	 * \u6839\u636E\u540D\u5B57\u83B7\u53D6\u5E03\u5C40\u6587\u4EF6\u7684id
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">context</span>
	 * <span class="token keyword">@param</span> <span class="token parameter">name</span>
	 *            \u5E03\u5C40\u6587\u4EF6\u7684\u540D\u5B57
	 * <span class="token keyword">@return</span>
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getLayoutIdByName</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">getIdByName</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token string">&quot;layout&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * \u6839\u636E\u540D\u5B57\u83B7\u53D6\u56FE\u7247\u7684id
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">context</span>
	 * <span class="token keyword">@param</span> <span class="token parameter">name</span>
	 *            \u56FE\u7247\u7684\u540D\u5B57
	 * <span class="token keyword">@return</span>
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getDrawableIdByName</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">getIdByName</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token string">&quot;drawable&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * \u6839\u636E\u540D\u5B57\u83B7\u53D6string.xml\u6587\u4EF6\u4E2D\u5B57\u7B26\u4E32\u7684id
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">context</span>
	 * <span class="token keyword">@param</span> <span class="token parameter">name</span>
	 *            \u5B57\u7B26\u4E32\u7684\u540D\u5B57
	 * <span class="token keyword">@return</span>
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getStringIdByName</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">getIdByName</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * \u6839\u636E\u540D\u5B57\u83B7\u53D6\u5E03\u5C40\u6587\u4EF6\u4E2D\u7EC4\u4EF6\u7684id
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">context</span>
	 * <span class="token keyword">@param</span> <span class="token parameter">name</span>
	 *            \u7EC4\u4EF6id\u5C5E\u6027\u7684\u540D\u5B57
	 * <span class="token keyword">@return</span>
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getViewIdByName</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">getIdByName</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token doc-comment comment">/**
	 * \u6839\u636E\u540D\u5B57\u83B7\u53D6\u989C\u8272\u7684id
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">context</span>
	 * <span class="token keyword">@param</span> <span class="token parameter">name</span>
	 *            \u989C\u8272\u7684\u540D\u5B57
	 * <span class="token keyword">@return</span>
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getColorIdByName</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">getIdByName</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token string">&quot;color&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token doc-comment comment">/**
	 * \u6839\u636E\u540D\u5B57\u83B7\u53D6\u5C3A\u5BF8\uFF08dimen\uFF09\u7684id
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">context</span>
	 * <span class="token keyword">@param</span> <span class="token parameter">name</span>
	 *            \u540D\u5B57
	 * <span class="token keyword">@return</span>
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getDimenIdByName</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">getIdByName</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token string">&quot;dimen&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * \u6839\u636E\u8D44\u6E90\u7C7B\u578B\u548C\u540D\u5B57\u83B7\u53D6\u8D44\u6E90id
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">context</span>
	 * <span class="token keyword">@param</span> <span class="token parameter">className</span>
	 *            \u8D44\u6E90\u7C7B\u578B\uFF0C\u5982&quot;drawable&quot;/&quot;layout&quot;/&quot;id&quot;/&quot;string&quot;\u7B49
	 * <span class="token keyword">@param</span> <span class="token parameter">name</span>
	 *            \u8D44\u6E90\u7684\u540D\u5B57
	 * <span class="token keyword">@return</span>
	 */</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getIdByName</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">String</span> className<span class="token punctuation">,</span>
			<span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">String</span> packageName <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getPackageName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Class</span> r <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token keyword">try</span> <span class="token punctuation">{</span>
			r <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>packageName <span class="token operator">+</span> <span class="token string">&quot;.R&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token punctuation">]</span> classes <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">getClasses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token class-name">Class</span> desireClass <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

			<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> classes<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>classes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					desireClass <span class="token operator">=</span> classes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
					<span class="token keyword">break</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>

			<span class="token keyword">if</span> <span class="token punctuation">(</span>desireClass <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
				id <span class="token operator">=</span> desireClass<span class="token punctuation">.</span><span class="token function">getField</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span>desireClass<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClassNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SecurityException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalAccessException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NoSuchFieldException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">return</span> id<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","Android \u6839\u636E\u8D44\u6E90\u7684\u540D\u5B57\u83B7\u53D6\u5176 ID \u503C.html.vue"]]);export{k as default};
