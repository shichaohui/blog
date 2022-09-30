import{_ as e,o,c as p,b as n,d as s,e as t,a as c,r as i}from"./app.81ed69ec.js";const l={},r={href:"https://blog.csdn.net/u014165119/article/details/1113555193",target:"_blank",rel:"noopener noreferrer"},u=n("h2",{id:"\u4EC0\u4E48\u662F-jsonp",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4EC0\u4E48\u662F-jsonp","aria-hidden":"true"},"#"),s(" \u4EC0\u4E48\u662F JSONP\uFF1F")],-1),d=n("strong",null,"JSONP",-1),k=n("strong",null,"JSON with Padding",-1),v={href:"https://zh.wikipedia.org/wiki/JSON",title:"JSON",target:"_blank",rel:"noopener noreferrer"},h={href:"https://zh.wikipedia.org/wiki/JSONP",target:"_blank",rel:"noopener noreferrer"},m=c(`<h2 id="jsonp-\u6838\u5FC3\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#jsonp-\u6838\u5FC3\u539F\u7406" aria-hidden="true">#</a> JSONP \u6838\u5FC3\u539F\u7406</h2><ul><li><code>script</code> \u6807\u7B7E\u4E0D\u53D7\u540C\u6E90\u7B56\u7565\u5F71\u54CD\u3002</li><li>\u52A8\u6001\u63D2\u5165\u5230 <code>DOM</code> \u4E2D\u7684 <code>script</code> \u811A\u672C\u53EF\u4EE5\u7ACB\u5373\u5F97\u5230\u6267\u884C\u3002</li></ul><h2 id="\u5B9E\u73B0\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u6B65\u9AA4" aria-hidden="true">#</a> \u5B9E\u73B0\u6B65\u9AA4</h2><ol><li>\u5BA2\u6237\u7AEF\u521B\u5EFA\u4E00\u4E2A <code>JavaScript</code> \u51FD\u6570\uFF0C\u7528\u6765\u63A5\u6536\u670D\u52A1\u7AEF\u8FD4\u56DE\u7684\u6570\u636E\u3002</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">onResponse</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u5BA2\u6237\u7AEF\u52A8\u6001\u63D2\u5165 <code>script</code> \u6807\u7B7E\u6267\u884C\u8BF7\u6C42\u3002</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">)</span>
script<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;protocal://domain:port/path?callback=onResponse&#39;</span>
document<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
document<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u670D\u52A1\u7AEF\u5C06\u6570\u636E\u548C js \u56DE\u8C03\u51FD\u6570\u540D\u62FC\u63A5\u4E3A\u51FD\u6570\u8C03\u7528\u7684\u5B57\u7B26\u4E32\u5E76\u8FD4\u56DE\u7ED9\u5BA2\u6237\u7AEF\u3002</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/path&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">request<span class="token punctuation">,</span> response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> callback <span class="token operator">=</span> request<span class="token punctuation">.</span>query<span class="token punctuation">.</span>callback
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>callback<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">);</span><span class="token template-punctuation string">\`</span></span>
    response<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>\u5BA2\u6237\u7AEF\u63A5\u6536\u5230 <code>script</code> \u6807\u7B7E\u54CD\u5E94\u5E76\u81EA\u52A8\u6267\u884C\u56DE\u8C03\u51FD\u6570\u3002</li></ol><h2 id="jsonp-\u7684\u7F3A\u70B9" tabindex="-1"><a class="header-anchor" href="#jsonp-\u7684\u7F3A\u70B9" aria-hidden="true">#</a> JSONP \u7684\u7F3A\u70B9</h2><ul><li>\u53EA\u80FD\u4F7F\u7528 <code>GET</code> \u8BF7\u6C42\u3002</li><li>\u52A8\u6001\u63D2\u5165\u7684 <code>script</code> \u811A\u672C\u53EF\u80FD\u88AB\u6CE8\u5165\u6076\u610F\u4EE3\u7801\u3002</li></ul>`,12);function _(b,g){const a=i("ExternalLinkIcon");return o(),p("div",null,[n("blockquote",null,[n("p",null,[n("a",r,[s("\u540C\u6E90\u7B56\u7565 & \u8DE8\u57DF"),t(a)])])]),u,n("blockquote",null,[n("p",null,[d,s("\uFF08"),k,s("\uFF09\u662F\u8D44\u6599\u683C\u5F0F"),n("a",v,[s("JSON"),t(a)]),s("\u7684\u4E00\u79CD\u201C\u4F7F\u7528\u6A21\u5F0F\u201D\uFF0C\u53EF\u4EE5\u8BA9\u7F51\u9875\u4ECE\u522B\u7684\u7F51\u57DF\u83B7\u53D6\u8D44\u6599\u3002 \u2014\u2014 "),n("a",h,[s("\u7EF4\u57FA\u767E\u79D1"),t(a)])])]),m])}const j=e(l,[["render",_],["__file","JSONP \u8DE8\u57DF\u539F\u7406.html.vue"]]);export{j as default};
