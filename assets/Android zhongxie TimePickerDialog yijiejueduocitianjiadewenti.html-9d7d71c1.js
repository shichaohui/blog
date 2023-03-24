import{_ as n,p as s,q as a,Y as e}from"./framework-a25df3d5.js";const t={},o=e(`<p>使用 <code>TimePickerDialog</code> 时，点击对话框的确定按钮，会添加两条数据，原因是 <code>OnTimeSetListener</code> 中的 <code>onTimeSe()</code> 执行了两次，点击确定按钮时执行一次，对话框取消时，<code>TimePickerDialog</code> 的 <code>onStop()</code> 方法中也执行了一次。解决方法：重写 <code>TimePickerDialog</code> 类，并覆盖 <code>onStop()</code>。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">TimePickerDialog</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">Context</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyTimePickerDialog</span> <span class="token keyword">extends</span> <span class="token class-name">TimePickerDialog</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token class-name">MyTimePickerDialog</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">OnTimeSetListener</span> callBack<span class="token punctuation">,</span>
			<span class="token keyword">int</span> hourOfDay<span class="token punctuation">,</span> <span class="token keyword">int</span> minute<span class="token punctuation">,</span> <span class="token keyword">boolean</span> is24HourView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> callBack<span class="token punctuation">,</span> hourOfDay<span class="token punctuation">,</span> minute<span class="token punctuation">,</span> is24HourView<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// TODO Auto-generated constructor stub</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">MyTimePickerDialog</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token keyword">int</span> theme<span class="token punctuation">,</span>
			<span class="token class-name">OnTimeSetListener</span> callBack<span class="token punctuation">,</span> <span class="token keyword">int</span> hourOfDay<span class="token punctuation">,</span> <span class="token keyword">int</span> minute<span class="token punctuation">,</span>
			<span class="token keyword">boolean</span> is24HourView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> theme<span class="token punctuation">,</span> callBack<span class="token punctuation">,</span> hourOfDay<span class="token punctuation">,</span> minute<span class="token punctuation">,</span> is24HourView<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// TODO Auto-generated constructor stub</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">onStop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// TODO Auto-generated method stub</span>
		
		<span class="token comment">// 注释掉，防止onTimeSet()执行两次</span>
		<span class="token comment">// super.onStop();</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[o];function p(i,l){return s(),a("div",null,c)}const d=n(t,[["render",p],["__file","Android zhongxie TimePickerDialog yijiejueduocitianjiadewenti.html.vue"]]);export{d as default};
