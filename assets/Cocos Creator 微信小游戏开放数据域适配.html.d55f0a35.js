import{_ as t,o,c,b as n,d as e,e as s,a as i,r as l}from"./app.2f78326a.js";const p={},r=n("p",null,"\u9996\u5148\u796D\u51FA\u5B98\u65B9\u6587\u6863",-1),d={href:"https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/open-data.html#%E5%BC%80%E6%94%BE%E6%95%B0%E6%8D%AE%E5%9F%9F",target:"_blank",rel:"noopener noreferrer"},u={href:"https://docs.cocos.com/creator/manual/zh/publish/publish-wechatgame-sub-domain.html",target:"_blank",rel:"noopener noreferrer"},_=i(`<blockquote><p><strong>\u5907\u6CE8\uFF1A</strong> \u5F00\u653E\u6570\u636E\u57DF\u7B80\u79F0\u4E3A\u5B50\u57DF\uFF0C\u5E38\u89C4\u6E38\u620F\u5185\u5BB9\u4E3A\u4E3B\u57DF</p></blockquote><h2 id="\u9002\u914D\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#\u9002\u914D\u6B65\u9AA4" aria-hidden="true">#</a> \u9002\u914D\u6B65\u9AA4</h2><ol start="0"><li>\u4E3B\u57DF\u4E2D\u521B\u5EFA\u4E00\u4E2A\u8282\u70B9\u4F5C\u4E3A\u5B50\u57DF\u5BB9\u5668\uFF0C\u4E3A\u5BB9\u5668\u8282\u70B9\u6DFB\u52A0 <code>WXSubContextView</code> \u7EC4\u4EF6\u7528\u4E8E\u8BBE\u7F6E\u5B50\u57DF\u89C6\u7A97\u4EE5\u53CA\u66F4\u65B0\u5B50\u57DF\u8D34\u56FE\u3002</li><li>\u521B\u5EFA\u5B50\u57DF\u9879\u76EE\uFF0C\u6839\u636E\u81EA\u8EAB\u9700\u6C42\u5236\u4F5C UI \u7684\u5C55\u793A\u3002</li></ol><h2 id="\u9002\u914D\u8981\u70B9" tabindex="-1"><a class="header-anchor" href="#\u9002\u914D\u8981\u70B9" aria-hidden="true">#</a> \u9002\u914D\u8981\u70B9</h2><ul><li>\u5B50\u57DF\u573A\u666F\u7684 <code>Canvas</code> \u7EC4\u4EF6\u8BBE\u8BA1\u5206\u8FA8\u7387\u5FC5\u987B\u4E0E\u4E3B\u57DF\u4E2D\u5BB9\u5668\u8282\u70B9\u7684\u5BBD\u9AD8\u6BD4\u76F8\u540C\u4EE5\u9632\u62C9\u4F38\u3002</li><li>\u82E5\u4E3B\u57DF\u4E2D\u5BB9\u5668\u8282\u70B9\u4F7F\u7528 <code>Widget</code> \u9002\u914D\u7236\u8282\u70B9\uFF0C\u6216\u8005\u5176\u4ED6\u539F\u56E0\u5BFC\u81F4\u5BB9\u5668\u8282\u70B9\u5C3A\u5BF8\u6539\u53D8\uFF0C\u5FC5\u987B\u5728\u5C3A\u5BF8\u6539\u53D8\u540E\u66F4\u65B0\u5B50\u57DF\u89C6\u7A97\u3002</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u7ACB\u5373\u5BF9\u9F50\uFF0C\u4E0D\u8C03\u7528\u8BE5\u51FD\u6570\u7684\u8BDD\uFF0C\u5C06\u4F1A\u7B49\u5230\u4E0B\u4E00\u5E27\u5BF9\u9F50</span>
widget<span class="token punctuation">.</span><span class="token function">updateAlignment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u91CD\u7F6E\u5B50\u57DF\u89C6\u7A97</span>
wxSubContextView<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5B50\u57DF\u5E94\u5F53\u5C3D\u91CF\u663E\u793A\u6700\u5C11\u5185\u5BB9\uFF0C\u6BD4\u5982\u6392\u884C\u699C\u9875\u9762\u4EC5\u5728\u5B50\u57DF\u663E\u793A\u6392\u884C\u699C\u5217\u8868\uFF0C\u6807\u9898\u4E4B\u7C7B\u7684\u9759\u6001\u5185\u5BB9\u653E\u5728\u4E3B\u57DF\u663E\u793A\u3002</li><li>\u82E5\u5B50\u57DF\u4E3A\u9759\u6001\u9875\u9762\uFF0C\u4E0D\u9700\u8981\u6BCF\u5E27\u66F4\u65B0\u8D34\u56FE\uFF0C\u53EF\u4EE5\u7981\u7528\u7EC4\u4EF6\u6765\u963B\u6B62\u6BCF\u5E27\u66F4\u65B0\uFF0C\u5E76\u5728\u9700\u8981\u7684\u65F6\u5019\u8C03\u7528 <code>update</code> \u51FD\u6570\u66F4\u65B0\u3002</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>wxSubContextView<span class="token punctuation">.</span>enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
wxSubContextView<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u89E3\u51B3\u5207\u6362\u9875\u9762\u65F6\u5148\u663E\u793A\u65E7\u6570\u636E\u540E\u5237\u65B0\u6570\u636E\u7684\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3\u5207\u6362\u9875\u9762\u65F6\u5148\u663E\u793A\u65E7\u6570\u636E\u540E\u5237\u65B0\u6570\u636E\u7684\u95EE\u9898" aria-hidden="true">#</a> \u89E3\u51B3\u5207\u6362\u9875\u9762\u65F6\u5148\u663E\u793A\u65E7\u6570\u636E\u540E\u5237\u65B0\u6570\u636E\u7684\u95EE\u9898</h2><p>\u7531\u4E8E\u5B50\u57DF\u6BCF\u5E27\u90FD\u5728\u7ED8\u5236\uFF0C\u6240\u4EE5\u5F53\u5207\u6362\u5B50\u57DF\u9875\u9762\u65F6\uFF0C\u53EF\u80FD\u4F1A\u5148\u628A\u65E7\u7684\u6570\u636E\u5237\u65B0\u5230\u4E3B\u57DF\uFF0C\u7136\u540E\u624D\u52A0\u8F7D\u5230\u65B0\u7684\u6570\u636E\u8FDB\u884C\u5237\u65B0\u3002 \u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u9700\u8981\u5728\u5207\u6362\u9875\u9762\u524D\uFF08\u6216\u5173\u95ED\u9875\u9762\u65F6\uFF09\u9690\u85CF\u5B50\u57DF\u663E\u793A\u7684\u573A\u666F\uFF08\u52A0\u8F7D\u4E00\u4E2A\u7A7A\u7684\u573A\u666F\uFF09\u5373\u53EF\u3002</p>`,10);function h(m,v){const a=l("ExternalLinkIcon");return o(),c("div",null,[r,n("p",null,[n("a",d,[e("\u5FAE\u4FE1\u5C0F\u6E38\u620F\u5F00\u653E\u6570\u636E\u57DF"),s(a)])]),n("p",null,[n("a",u,[e("Creator \u63A5\u5165\u5FAE\u4FE1\u5C0F\u6E38\u620F\u7684\u5F00\u653E\u6570\u636E\u57DF"),s(a)])]),_])}const b=t(p,[["render",h],["__file","Cocos Creator \u5FAE\u4FE1\u5C0F\u6E38\u620F\u5F00\u653E\u6570\u636E\u57DF\u9002\u914D.html.vue"]]);export{b as default};
