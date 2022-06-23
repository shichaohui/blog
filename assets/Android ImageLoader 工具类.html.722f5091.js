import{_ as a,r as e,o as p,c as t,b as n,d as o,e as c,a as i}from"./app.5e319a5d.js";const l={},u={href:"https://github.com/nostra13/Android-Universal-Image-Loader",target:"_blank",rel:"noopener noreferrer"},k=c("Universal Image Loader \u9879\u76EE\u4E3B\u9875"),d=i(`<p>\u4E3A\u4E86\u66F4\u52A0\u65B9\u4FBF\u7684\u4F7F\u7528 <code>ImageLoader</code>\uFF0C\u6574\u7406\u51FA\u6765\u4E00\u4E2A\u5DE5\u5177\u7C7B <code>ImageLoaderHelper.java</code>\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">Context</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>graphics<span class="token punctuation">.</span></span><span class="token class-name">Bitmap</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>nostra13<span class="token punctuation">.</span>universalimageloader<span class="token punctuation">.</span>cache<span class="token punctuation">.</span>disc<span class="token punctuation">.</span>naming<span class="token punctuation">.</span></span><span class="token class-name">Md5FileNameGenerator</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>nostra13<span class="token punctuation">.</span>universalimageloader<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">DisplayImageOptions</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>nostra13<span class="token punctuation">.</span>universalimageloader<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">ImageLoader</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>nostra13<span class="token punctuation">.</span>universalimageloader<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">ImageLoaderConfiguration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>nostra13<span class="token punctuation">.</span>universalimageloader<span class="token punctuation">.</span>core<span class="token punctuation">.</span>assist<span class="token punctuation">.</span></span><span class="token class-name">QueueProcessingType</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * Created by shichaohui on 15/9/10.
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/&gt;</span></span>
 * ImageLoader\u8F85\u52A9\u7C7B.
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ImageLoaderHelper</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ImageLoader</span> mImageLoader<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> ImageLoader\u5B9E\u4F8B
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ImageLoader</span> <span class="token function">getImageLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mImageLoader <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            mImageLoader <span class="token operator">=</span> <span class="token class-name">ImageLoader</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> mImageLoader<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u521B\u5EFADisplayImageOptions\u5B9E\u4F8B
     *
     * <span class="token keyword">@param</span> <span class="token parameter">defaultImageResId</span> \u9ED8\u8BA4\u56FE\u7247\u7684\u8D44\u6E90id
     * <span class="token keyword">@return</span> DisplayImageOptions\u5B9E\u4F8B
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">DisplayImageOptions</span> <span class="token function">createImageOptions</span><span class="token punctuation">(</span><span class="token keyword">int</span> defaultImageResId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DisplayImageOptions<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">showImageOnLoading</span><span class="token punctuation">(</span>defaultImageResId<span class="token punctuation">)</span> <span class="token comment">//\u8BBE\u7F6E\u56FE\u7247\u5728\u4E0B\u8F7D\u671F\u95F4\u663E\u793A\u7684\u56FE\u7247</span>
                <span class="token punctuation">.</span><span class="token function">showImageOnFail</span><span class="token punctuation">(</span>defaultImageResId<span class="token punctuation">)</span> <span class="token comment">//\u8BBE\u7F6E\u56FE\u7247\u52A0\u8F7D/\u89E3\u7801\u8FC7\u7A0B\u4E2D\u9519\u8BEF\u65F6\u5019\u663E\u793A\u7684\u56FE\u7247</span>
                <span class="token punctuation">.</span><span class="token function">showImageForEmptyUri</span><span class="token punctuation">(</span>defaultImageResId<span class="token punctuation">)</span> <span class="token comment">//\u8BBE\u7F6E\u56FE\u7247Uri\u4E3A\u7A7A\u6216\u662F\u9519\u8BEF\u7684\u65F6\u5019\u663E\u793A\u7684\u56FE\u7247</span>
                <span class="token punctuation">.</span><span class="token function">cacheInMemory</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">//\u8BBE\u7F6E\u4E0B\u8F7D\u7684\u56FE\u7247\u7F13\u5B58\u5728\u5185\u5B58\u4E2D</span>
                <span class="token punctuation">.</span><span class="token function">cacheOnDisk</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">//\u8BBE\u7F6E\u4E0B\u8F7D\u7684\u56FE\u7247\u7F13\u5B58\u5728SD\u5361\u4E2D</span>
                <span class="token punctuation">.</span><span class="token function">bitmapConfig</span><span class="token punctuation">(</span><span class="token class-name">Bitmap<span class="token punctuation">.</span>Config</span><span class="token punctuation">.</span>RGB_565<span class="token punctuation">)</span> <span class="token comment">//\u8BBE\u7F6E\u56FE\u7247\u7684\u89E3\u7801\u7C7B\u578B</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u6784\u5EFA</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u521D\u59CB\u5316ImageLoader
     *
     * <span class="token keyword">@param</span> <span class="token parameter">context</span> \u4E0A\u4E0B\u6587
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">initImageLoader</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ImageLoaderConfiguration<span class="token punctuation">.</span>Builder</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ImageLoaderConfiguration<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">threadPriority</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span>NORM_PRIORITY <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">denyCacheImageMultipleSizesInMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">diskCacheFileNameGenerator</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Md5FileNameGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">diskCacheSize</span><span class="token punctuation">(</span><span class="token number">50</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 50 MiB</span>
        config<span class="token punctuation">.</span><span class="token function">tasksProcessingOrder</span><span class="token punctuation">(</span><span class="token class-name">QueueProcessingType</span><span class="token punctuation">.</span>LIFO<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Initialize ImageLoader with configuration.</span>
        <span class="token class-name">ImageLoader</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u5E94\u7528\u7684\u5165\u53E3 <code>Activity</code> \u6216\u8005\u91CD\u5199\u7684 <code>Application</code> \u4E2D\u521D\u59CB\u5316\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">ImageLoaderHelper</span><span class="token punctuation">.</span><span class="token function">initImageLoader</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// this\u4E3AActivity\u6216\u8005Application\u7684Context</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u63A5\u7740\u5C31\u53EF\u4EE5\u5728\u4EFB\u610F\u9700\u8981\u7684\u5730\u65B9\u4F7F\u7528 <code>ImageLoader</code> \u52A0\u8F7D\u56FE\u7247\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">ImageLoaderHelper</span><span class="token punctuation">.</span><span class="token function">getImageLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">displayImage</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> imageView<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5982\u679C\u9700\u8981\u589E\u52A0\u914D\u7F6E\uFF0C\u53EF\u4F7F\u7528 <code>DisplayImageOptions</code>\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">ImageLoaderHelper</span><span class="token punctuation">.</span><span class="token function">getImageLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">displayImage</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> imageView<span class="token punctuation">,</span> 
        <span class="token class-name">ImageLoaderHelper</span><span class="token punctuation">.</span><span class="token function">createImageOptions</span><span class="token punctuation">(</span>\u56FE\u7247\u8D44\u6E90ID<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u66F4\u8BE6\u7EC6\u7684\u914D\u7F6E\u53EF\u53C2\u8003\uFF1Ahttp://blog.csdn.net/vipzjyno1/article/details/23206387</p>`,9);function r(m,v){const s=e("ExternalLinkIcon");return p(),t("div",null,[n("p",null,[n("a",u,[k,o(s)])]),d])}var b=a(l,[["render",r],["__file","Android ImageLoader \u5DE5\u5177\u7C7B.html.vue"]]);export{b as default};
