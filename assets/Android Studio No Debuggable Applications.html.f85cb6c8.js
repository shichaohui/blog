import{_ as s,o as d,c,b as n,d as e,e as l,a as o,r as t}from"./app.2f78326a.js";const i={},r=o("<p>\u4ECA\u5929\u6362\u4E86\u53F0\u624B\u673A\u8FDB\u884C\u6D4B\u8BD5\uFF0C\u4F46\u662F\u624B\u673A\u8FDE\u4E0A\u4E4B\u540E\u5374\u4E0D\u80FD\u9009\u62E9\u8981\u8F93\u51FA log \u7684\u5E94\u7528\uFF08\u9009\u5E94\u7528\u7684\u4F4D\u7F6E\u663E\u793A <code>No Debuggable Applications</code>\uFF09\uFF0C\u5BFC\u81F4 <code>logcat</code> \u4E2D\u4E0D\u65AD\u6253\u5370\u51FA\u4E00\u884C\u884C log\uFF0C\u800C\u4ECE\u8FD9\u832B\u832B log \u4E2D\u627E\u51FA\u81EA\u5DF1\u9700\u8981\u7684 log \u662F\u6068\u75DB\u82E6\u7684\uFF0C\u548B\u529E\u54A7\uFF1FGoogle \u5457\u3002</p><p>\u901A\u8FC7\u8C37\u6B4C\u53D1\u73B0\uFF0C\u5927\u5BB6\u89E3\u51B3\u6B64\u95EE\u9898\u7684\u65B9\u5F0F\u5927\u90FD\u662F\u8FD9\u6837\uFF1A</p><blockquote><p>\u4ECE<code> Android Studio</code> \u7684\u5DE5\u5177\u680F\u4F9D\u6B21\u9009\u62E9 <code>Tools</code> -&gt; <code>Android</code> -&gt;<code> Enable ADB Integration</code>\u3002 \u5982\u679C <code>Enable ADB Integration</code> \u5DF2\u7ECF\u88AB\u9009\u4E2D\uFF0C\u5219\u5148\u53D6\u6D88\u9009\u4E2D\u518D\u91CD\u65B0\u9009\u4E2D\u3002\u7136\u540E\u5C31\u4E0D\u4F1A\u51FA\u73B0 <code>No Debuggable Applications</code> \u7684\u63D0\u793A\u4E86\uFF0C\u53EF\u4EE5\u9009\u62E9\u663E\u793A\u6307\u5B9A app \u7684 log \u4E86\u3002</p></blockquote><p>\u65E2\u7136\u5927\u5BB6\u90FD\u8FD9\u4E48\u5199\uFF0C\u90A3\u4E48\u8FD9\u79CD\u65B9\u5F0F\u5E94\u8BE5\u662F\u80FD\u89E3\u51B3\u95EE\u9898\u7684\u3002</p>",4),p=n("code",null,"Android Studio",-1),u={href:"http://blog.csdn.net/liang9zi/article/details/41958897",target:"_blank",rel:"noopener noreferrer"},g=n("code",null,"app/build.gradle",-1),b=n("code",null,"debuggable true",-1),_=o(`<div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>android <span class="token punctuation">{</span>

    <span class="token punctuation">...</span>

    buildTypes <span class="token punctuation">{</span>
        release <span class="token punctuation">{</span>
            debuggable <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u770B\u5230\u8FD9\u91CC\u6211\u7A81\u7136\u60F3\u8D77\u6765\uFF0C\u6211\u8BBE\u7F6E\u7684\u662F\u8FD0\u884C\u65F6\u81EA\u52A8\u8FD0\u884C <code>release</code> \u7684\u5305\uFF0C\u8D76\u7D27\u5C1D\u8BD5\u4E86\u4E00\u4E0B\uFF0C\u679C\u7136\u89E3\u51B3\u4E86\u95EE\u9898\u3002</p><p>\u4F30\u8BA1\u7B2C\u4E00\u79CD\u65B9\u5F0F\u53EA\u5BF9 <code>debug</code> \u5305\u6709\u7528\uFF0C\u5982\u679C\u8981\u8C03\u8BD5 <code>release</code> \u5305\uFF0C\u8981\u4F7F\u7528\u7B2C\u4E8C\u79CD\u65B9\u6CD5\u3002\u5F53\u7136\uFF0C\u7B2C\u4E8C\u79CD\u65B9\u6CD5\u6709\u4E00\u4E2A\u524D\u63D0\u5C31\u662F <code>Enable ADB Integration</code> \u8981\u6253\u5F00\uFF0C\u4E5F\u5C31\u662F\u7B2C\u4E00\u79CD\u65B9\u6CD5\u7684\u6B65\u9AA4\u8981\u5148\u6267\u884C\u4E00\u904D\u3002</p>`,3);function v(m,k){const a=t("ExternalLinkIcon");return d(),c("div",null,[r,n("p",null,[e("\u7136\u5E76\u5375... \u6211\u4E0D\u65AD\u7684\u91CD\u590D\u4E0A\u8FF0\u6B65\u9AA4\u5E76\u91CD\u542F "),p,e("\uFF0C\u5B83\u5E76\u4E0D\u80FD\u89E3\u51B3\u6211\u7684\u95EE\u9898\u3002\u7EE7\u7EED Google \u4E86\u53D1\u73B0\u4E86"),n("a",u,[e("\u8FD9\u7BC7\u6587\u7AE0"),l(a)]),e("\uFF0C\u5B83\u901A\u8FC7\u5728 "),g,e(" \u4E2D\u6DFB\u52A0 "),b,e(" \u89E3\u51B3\u95EE\u9898\uFF1A")]),_])}const A=s(i,[["render",v],["__file","Android Studio No Debuggable Applications.html.vue"]]);export{A as default};
