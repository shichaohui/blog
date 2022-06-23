import{_ as o,r as c,o as i,c as l,b as s,d as e,e as n,a as t}from"./app.5e319a5d.js";const p={},u=n("\u6700\u8FD1\u5728\u5B66\u4E60 "),r=s("code",null,"Flutter",-1),d=n("\uFF0C\u4FD7\u8BDD\u8BF4\u7684\u597D\uFF0C\u7EB8\u4E0A\u5F97\u6765\u7EC8\u89C9\u6D45\uFF0C\u6240\u4EE5\u52A8\u624B\u64B8\u4E86\u4E00\u4E2A "),k={href:"https://gank.io",target:"_blank",rel:"noopener noreferrer"},m=n("gank.io"),h=n(" \u7684 APP\uFF0C\u6709\u5174\u8DA3\u7684\u53EF\u4EE5 "),v={href:"https://github.com/shichoahui/Gank",target:"_blank",rel:"noopener noreferrer"},b=n("\u5230 GitHub \u770B\u770B\u6E90\u7801"),_=n("\u3002"),g=n("\u672C\u6587\u5C06\u4E0E\u5927\u5BB6\u5206\u4EAB\u9879\u76EE\u4E2D\u81EA\u5B9A\u4E49\u7684\u7F29\u653E\u63A7\u4EF6 "),f={href:"https://github.com/shichaohui/gesture_zoom_box",target:"_blank",rel:"noopener noreferrer"},x=n("GestureZoomBox"),y=n(" \u3002"),G=t('<h2 id="\u529F\u80FD" tabindex="-1"><a class="header-anchor" href="#\u529F\u80FD" aria-hidden="true">#</a> \u529F\u80FD</h2><ul><li>\u53CC\u51FB\u7F29\u653E\u3002</li><li>\u53CC\u6307\u7F29\u653E\u3002</li><li>\u4EE5\u53CC\u51FB\u4F4D\u7F6E/\u53CC\u6307\u4F4D\u7F6E\u4F5C\u4E3A\u7F29\u653E\u4E2D\u5FC3\u3002</li><li>\u9650\u5236\u7F29\u653E/\u62D6\u52A8\u8303\u56F4\uFF0C\u8D85\u8FC7\u8303\u56F4\u81EA\u52A8\u56DE\u5F39\u3002</li><li>\u4F5C\u4E3A\u7236\u7EA7 Widget \u76F4\u63A5\u5D4C\u5957\uFF0C\u65E0\u4FB5\u5165\u3002</li></ul><p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xODM3MzY4LTU5NDcxNDY5NTQ3MGU2MTMuZ2lm" alt="demo_big_image.gif"></p><h2 id="\u6838\u5FC3\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#\u6838\u5FC3\u539F\u7406" aria-hidden="true">#</a> \u6838\u5FC3\u539F\u7406</h2><h3 id="\u624B\u52BF\u8BC6\u522B" tabindex="-1"><a class="header-anchor" href="#\u624B\u52BF\u8BC6\u522B" aria-hidden="true">#</a> \u624B\u52BF\u8BC6\u522B</h3>',5),z={href:"https://book.flutterchina.club/chapter8/gesture.html",target:"_blank",rel:"noopener noreferrer"},T=n("GestureDetector"),D=t(`<p><code>Flutter</code> \u5DF2\u7ECF\u63D0\u4F9B\u4E86 <code>GestureDetector</code> \u5904\u7406\u624B\u52BF\uFF08\u70B9\u51FB\u3001\u53CC\u51FB\u3001\u7F29\u653E\u3001\u62D6\u52A8\uFF09\uFF0C\u6211\u4EEC\u53EA\u8981\u5C06\u53EF\u7F29\u653E\u5185\u5BB9\u4F5C\u4E3A <code>GestureDetector</code> \u7684 <code>child</code> \u5E76\u8BBE\u7F6E\u76F8\u5E94\u624B\u52BF\u56DE\u8C03\u5373\u53EF\u3002</p><blockquote><p>Pan and scale callbacks cannot be used simultaneous because scale is a superset of pan. Simply use the scale callbacks instead.</p></blockquote><p>\u8FD9\u662F\u6E90\u7801\u4E2D\u7684\u6CE8\u91CA\uFF0C\u5927\u610F\u662F\u201C\u7F29\u653E\u662F\u5E73\u79FB\u7684\u8D85\u96C6\uFF0C\u4E24\u8005\u4E0D\u80FD\u540C\u65F6\u4F7F\u7528\uFF0C\u53EA\u9700\u4F7F\u7528\u7F29\u653E\u56DE\u8C03\u5373\u53EF\u201D\u3002\u56E0\u6B64\u6211\u4EEC\u53EA\u9700\u8981\u7528\u5230\u4EE5\u4E0B\u56DE\u8C03\uFF1A</p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code><span class="token comment">/// \u53CC\u51FB\u4E8B\u4EF6\u56DE\u8C03\uFF0C\u7528\u6765\u5904\u7406\u53CC\u51FB\u7F29\u653E\u3002</span>
<span class="token keyword">final</span> <span class="token class-name">GestureTapCallback</span> onDoubleTap<span class="token punctuation">;</span>

<span class="token comment">/// \u7F29\u653E\u503C\u6216\u8005\u62D6\u52A8\u4F4D\u7F6E\u53D1\u751F\u6539\u53D8\u3002\u5728\u8FD9\u91CC\u6839\u636E\u6BCF\u6B21\u7684\u53D8\u5316\u91CF\u8FDB\u884C\u7F29\u653E/\u62D6\u52A8\u5904\u7406\u3002</span>
<span class="token keyword">final</span> <span class="token class-name">GestureScaleUpdateCallback</span> onScaleUpdate<span class="token punctuation">;</span>

<span class="token comment">/// \u7F29\u653E/\u62D6\u52A8\u7ED3\u675F\u3002\u7528\u6765\u68C0\u6D4B\u5E76\u5904\u7406\u8D85\u8FC7\u8FB9\u754C\u7684\u60C5\u51B5\u3002</span>
<span class="token keyword">final</span> <span class="token class-name">GestureScaleEndCallback</span> onScaleEnd<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u7F29\u653E\u548C\u5E73\u79FB" tabindex="-1"><a class="header-anchor" href="#\u7F29\u653E\u548C\u5E73\u79FB" aria-hidden="true">#</a> \u7F29\u653E\u548C\u5E73\u79FB</h3><p>\u4F7F\u7528 <code>Transform</code> \u8FDB\u884C\u7F29\u653E\u548C\u5E73\u79FB\u5904\u7406\u3002</p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code><span class="token comment">// \u5F53\u524D\u7F29\u653E\u503C</span>
double _scale <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>

<span class="token comment">// \u5F53\u524D\u504F\u79FB\u503C</span>
<span class="token class-name">Offset</span> _offset <span class="token operator">=</span> <span class="token class-name">Offset</span><span class="token punctuation">.</span>zero<span class="token punctuation">;</span>

<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment">// \u4F7F\u7528 Transform \u5305\u88F9 child \uFF0C\u4EE5\u4FBF\u8FDB\u884C\u5E73\u79FB\u548C\u7F29\u653E\u5904\u7406</span>
<span class="token class-name">Transform</span><span class="token punctuation">(</span>
  transform<span class="token punctuation">:</span> <span class="token class-name">Matrix4</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token function">translate</span><span class="token punctuation">(</span>_offset<span class="token punctuation">.</span>dx<span class="token punctuation">,</span> _offset<span class="token punctuation">.</span>dy<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token function">scale</span><span class="token punctuation">(</span>_scale<span class="token punctuation">,</span> _scale<span class="token punctuation">)</span><span class="token punctuation">,</span>
  child<span class="token punctuation">:</span> widget<span class="token punctuation">.</span>child<span class="token punctuation">,</span>
  alignment<span class="token punctuation">:</span> <span class="token class-name">Alignment</span><span class="token punctuation">.</span>center<span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4F7F\u7528\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u65B9\u6CD5" aria-hidden="true">#</a> \u4F7F\u7528\u65B9\u6CD5</h2><h3 id="\u6DFB\u52A0\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#\u6DFB\u52A0\u4F9D\u8D56" aria-hidden="true">#</a> \u6DFB\u52A0\u4F9D\u8D56</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">dependencies</span><span class="token punctuation">:</span>
  <span class="token key atrule">gesture_zoom_box</span><span class="token punctuation">:</span> ^0.0.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5BFC\u5305" tabindex="-1"><a class="header-anchor" href="#\u5BFC\u5305" aria-hidden="true">#</a> \u5BFC\u5305</h3><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:gesture_zoom_box/gesture_zoom_box.dart&#39;</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u4F7F\u7528\u63A7\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u63A7\u4EF6" aria-hidden="true">#</a> \u4F7F\u7528\u63A7\u4EF6</h3><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code><span class="token class-name">GestureZoomBox</span><span class="token punctuation">(</span>
    maxScale<span class="token punctuation">:</span> <span class="token number">5.0</span><span class="token punctuation">,</span>
    doubleTapScale<span class="token punctuation">:</span> <span class="token number">2.0</span><span class="token punctuation">,</span>
    duration<span class="token punctuation">:</span> <span class="token class-name">Duration</span><span class="token punctuation">(</span>milliseconds<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    onPressed<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token class-name">Navigator</span><span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">,</span>
    child<span class="token punctuation">:</span> <span class="token class-name">Image</span><span class="token punctuation">.</span><span class="token function">network</span><span class="token punctuation">(</span>widget<span class="token punctuation">.</span>imageUrl<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u9879\u76EE\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u5730\u5740" aria-hidden="true">#</a> \u9879\u76EE\u5730\u5740</h2>`,15),N={href:"https://github.com/shichaohui/gesture_zoom_box",target:"_blank",rel:"noopener noreferrer"},S=n("GitHub"),w=n(" | "),M={href:"https://pub.dev/packages/gesture_zoom_box",target:"_blank",rel:"noopener noreferrer"},B=n("Pub");function U(W,E){const a=c("ExternalLinkIcon");return i(),l("div",null,[s("p",null,[u,r,d,s("a",k,[m,e(a)]),h,s("a",v,[b,e(a)]),_]),s("p",null,[g,s("a",f,[x,e(a)]),y]),G,s("p",null,[s("a",z,[T,e(a)])]),D,s("p",null,[s("a",N,[S,e(a)]),w,s("a",M,[B,e(a)])])])}var H=o(p,[["render",U],["__file","Flutter \u81EA\u5B9A\u4E49\u7F29\u653E\u63A7\u4EF6.html.vue"]]);export{H as default};
