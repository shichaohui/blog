import{_ as n,p as s,q as a,a0 as t}from"./framework-94b9cb5f.js";const p={},e=t(`<p>继承 <code>View</code> 实现的一个刮刮卡效果的控件。</p><p><strong>使用方法：</strong></p><ul><li>和普通控件的使用方法一样实例化这个 <code>View</code>；</li><li>使用 <code>setCardContent()</code> 方法设置设置卡片底层的图片和顶层的遮罩图片，可以使用 <code>Bitmap</code> 实例和资源 id 两种方式设置；</li><li>使用 <code>setComplate()</code> 方法设置刮掉多少后自动清理剩余的遮罩（可选）。</li></ul><p>如果底层不想使用图片想用文本，把对应的 <code>Bitmap</code> 改成文本或者添加一个设置文本的方法，并修改 <code>onDraw()</code> 方法即可。</p><p>代码注释很多，很容易看明白</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">Context</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">Bitmap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">Bitmap</span><span class="token punctuation">.</span><span class="token class-name">Config</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">BitmapFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">Canvas</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">Paint</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">Path</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">PorterDuff</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">PorterDuffXfermode</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">Rect</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">AttributeSet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Log</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">MotionEvent</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">View</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ScratchcardView</span> <span class="token keyword">extends</span> <span class="token class-name">View</span> <span class="token punctuation">{</span>

	<span class="token doc-comment comment">/** 画路径的画笔 */</span>
	<span class="token keyword">private</span> <span class="token class-name">Paint</span> scratchPaint <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Paint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token doc-comment comment">/** 刮的路径（通过手指滑动产生） */</span>
	<span class="token keyword">private</span> <span class="token class-name">Path</span> scratchPath <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token doc-comment comment">/** 画遮罩层的画布 */</span>
	<span class="token keyword">private</span> <span class="token class-name">Canvas</span> scratchCanvas<span class="token punctuation">;</span>
	<span class="token doc-comment comment">/** 保存被刮时剩余部分的遮罩 */</span>
	<span class="token keyword">private</span> <span class="token class-name">Bitmap</span> scratchBitmap<span class="token punctuation">;</span>

	<span class="token doc-comment comment">/** 一个跟当前View一样大小的矩形 */</span>
	<span class="token keyword">private</span> <span class="token class-name">Rect</span> mRect <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token doc-comment comment">/** 是否刮完的标识 */</span>
	<span class="token keyword">private</span> <span class="token keyword">boolean</span> isComplete<span class="token punctuation">;</span>
	<span class="token doc-comment comment">/** 刮掉多少后算完成（0-100） */</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> complate <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">Context</span> mContext <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token doc-comment comment">/** 当前View的宽度 */</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> width <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token doc-comment comment">/** 当前View的高度 */</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> height <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

	<span class="token doc-comment comment">/** 卡片底层隐藏的图片 */</span>
	<span class="token keyword">private</span> <span class="token class-name">Bitmap</span> bmpSecret <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token doc-comment comment">/** 作为遮罩的图片 */</span>
	<span class="token keyword">private</span> <span class="token class-name">Bitmap</span> bmpScratch <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">ScratchcardView</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">ScratchcardView</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">AttributeSet</span> attrs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">ScratchcardView</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">AttributeSet</span> attrs<span class="token punctuation">,</span> <span class="token keyword">int</span> defStyleAttr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> defStyleAttr<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>mContext <span class="token operator">=</span> context<span class="token punctuation">;</span>
		<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		scratchPaint<span class="token punctuation">.</span><span class="token function">setAntiAlias</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 设置画笔不填充</span>
		scratchPaint<span class="token punctuation">.</span><span class="token function">setStyle</span><span class="token punctuation">(</span><span class="token class-name">Paint<span class="token punctuation">.</span>Style</span><span class="token punctuation">.</span><span class="token constant">STROKE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 设置圆角</span>
		scratchPaint<span class="token punctuation">.</span><span class="token function">setStrokeJoin</span><span class="token punctuation">(</span><span class="token class-name">Paint<span class="token punctuation">.</span>Join</span><span class="token punctuation">.</span><span class="token constant">ROUND</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		scratchPaint<span class="token punctuation">.</span><span class="token function">setStrokeCap</span><span class="token punctuation">(</span><span class="token class-name">Paint<span class="token punctuation">.</span>Cap</span><span class="token punctuation">.</span><span class="token constant">ROUND</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 绘制时取下层和本层绘制的非交集部分</span>
		scratchPaint<span class="token punctuation">.</span><span class="token function">setXfermode</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PorterDuffXfermode</span><span class="token punctuation">(</span><span class="token class-name">PorterDuff<span class="token punctuation">.</span>Mode</span><span class="token punctuation">.</span><span class="token constant">DST_OUT</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 设置画笔宽度</span>
		scratchPaint<span class="token punctuation">.</span><span class="token function">setStrokeWidth</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		scratchPath <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token function">post</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

			<span class="token annotation punctuation">@Override</span>
			<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				width <span class="token operator">=</span> <span class="token function">getWidth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				height <span class="token operator">=</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				mRect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> width<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 初始化一个bitmap保存被刮时剩余部分的遮罩</span>
				scratchBitmap <span class="token operator">=</span> <span class="token class-name">Bitmap</span><span class="token punctuation">.</span><span class="token function">createBitmap</span><span class="token punctuation">(</span>width<span class="token punctuation">,</span> height<span class="token punctuation">,</span> <span class="token class-name">Config</span><span class="token punctuation">.</span><span class="token constant">ARGB_8888</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				scratchCanvas <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Canvas</span><span class="token punctuation">(</span>scratchBitmap<span class="token punctuation">)</span><span class="token punctuation">;</span>
				scratchCanvas<span class="token punctuation">.</span><span class="token function">drawBitmap</span><span class="token punctuation">(</span>bmpScratch<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> mRect<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 设置刮刮卡的内容
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">secretContent</span>
	 *            底层保密的图片
	 * <span class="token keyword">@param</span> <span class="token parameter">scratchContent</span>
	 *            顶层的遮罩图片
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setCardContent</span><span class="token punctuation">(</span><span class="token class-name">Bitmap</span> secretContent<span class="token punctuation">,</span> <span class="token class-name">Bitmap</span> scratchContent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>bmpSecret <span class="token operator">=</span> secretContent<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>bmpScratch <span class="token operator">=</span> scratchContent<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 设置刮刮卡的内容
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">secretId</span>
	 *            底层保密的图片id
	 * <span class="token keyword">@param</span> <span class="token parameter">scratchId</span>
	 *            顶层的遮罩图片的id
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setCardContent</span><span class="token punctuation">(</span><span class="token keyword">int</span> secretId<span class="token punctuation">,</span> <span class="token keyword">int</span> scratchId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		bmpSecret <span class="token operator">=</span> <span class="token class-name">BitmapFactory</span><span class="token punctuation">.</span><span class="token function">decodeResource</span><span class="token punctuation">(</span>mContext<span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
				secretId<span class="token punctuation">)</span><span class="token punctuation">;</span>
		bmpScratch <span class="token operator">=</span> <span class="token class-name">BitmapFactory</span><span class="token punctuation">.</span><span class="token function">decodeResource</span><span class="token punctuation">(</span>mContext<span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
				scratchId<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 设置刮掉多少后自动清理剩余的遮罩
	 * 
	 * <span class="token keyword">@param</span> <span class="token parameter">complate</span>
	 *            已清理的百分比（0-100），默认100
	 */</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setComplate</span><span class="token punctuation">(</span><span class="token keyword">int</span> complate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>complate <span class="token operator">=</span> complate<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">onDraw</span><span class="token punctuation">(</span><span class="token class-name">Canvas</span> canvas<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		canvas<span class="token punctuation">.</span><span class="token function">drawBitmap</span><span class="token punctuation">(</span>bmpSecret<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> mRect<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isComplete<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			scratchCanvas<span class="token punctuation">.</span><span class="token function">drawPath</span><span class="token punctuation">(</span>scratchPath<span class="token punctuation">,</span> scratchPaint<span class="token punctuation">)</span><span class="token punctuation">;</span>
			canvas<span class="token punctuation">.</span><span class="token function">drawBitmap</span><span class="token punctuation">(</span>scratchBitmap<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">onTouchEvent</span><span class="token punctuation">(</span><span class="token class-name">MotionEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">float</span> x <span class="token operator">=</span> event<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">float</span> y <span class="token operator">=</span> event<span class="token punctuation">.</span><span class="token function">getY</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">switch</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span><span class="token function">getAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token class-name">MotionEvent</span><span class="token punctuation">.</span><span class="token constant">ACTION_DOWN</span><span class="token operator">:</span>
			scratchPath<span class="token punctuation">.</span><span class="token function">moveTo</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token class-name">MotionEvent</span><span class="token punctuation">.</span><span class="token constant">ACTION_MOVE</span><span class="token operator">:</span>
			scratchPath<span class="token punctuation">.</span><span class="token function">lineTo</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token class-name">MotionEvent</span><span class="token punctuation">.</span><span class="token constant">ACTION_UP</span><span class="token operator">:</span>
			<span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>mRunnable<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token function">invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 统计擦除区域任务
	 */</span>
	<span class="token keyword">private</span> <span class="token class-name">Runnable</span> mRunnable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> mPixels<span class="token punctuation">;</span>

		<span class="token annotation punctuation">@Override</span>
		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

			<span class="token comment">// 已清理的区域的面积</span>
			<span class="token keyword">int</span> wipeArea <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
			<span class="token comment">// 总面积</span>
			<span class="token keyword">int</span> totalArea <span class="token operator">=</span> width <span class="token operator">*</span> height<span class="token punctuation">;</span>

			mPixels <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>totalArea<span class="token punctuation">]</span><span class="token punctuation">;</span>

			<span class="token comment">// 拿到所有的像素信息</span>
			scratchBitmap<span class="token punctuation">.</span><span class="token function">getPixels</span><span class="token punctuation">(</span>mPixels<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> width<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> width<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 遍历统计擦除的区域</span>
			<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> width<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> height<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token keyword">int</span> index <span class="token operator">=</span> i <span class="token operator">+</span> j <span class="token operator">*</span> width<span class="token punctuation">;</span>
					<span class="token keyword">if</span> <span class="token punctuation">(</span>mPixels<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
						wipeArea<span class="token operator">++</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 根据所占百分比，进行一些操作</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>wipeArea <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> totalArea <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">int</span> percent <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>wipeArea <span class="token operator">*</span> <span class="token number">100</span> <span class="token operator">/</span> totalArea<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>percent <span class="token operator">&gt;</span> complate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token class-name">Log</span><span class="token punctuation">.</span><span class="token function">e</span><span class="token punctuation">(</span><span class="token string">&quot;TAG&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;清除区域达到&quot;</span> <span class="token operator">+</span> complate <span class="token operator">+</span> <span class="token string">&quot;%，下面自动清除&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					isComplete <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
					<span class="token function">postInvalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","Android zidingyi View shixianguaguakaxiaoguo.html.vue"]]);export{k as default};
