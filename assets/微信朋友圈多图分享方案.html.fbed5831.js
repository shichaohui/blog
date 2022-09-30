import{_ as i,o,c as p,b as n,d as s,e,a as t,r as c}from"./app.81ed69ec.js";const l={},u={href:"https://github.com/shichaohui/WXShareMultiImage",target:"_blank",rel:"noopener noreferrer"},r={href:"https://github.com/shichaohui/WXShareMultiImage",target:"_blank",rel:"noopener noreferrer"},d=t(`<p><img src="https://upload-images.jianshu.io/upload_images/1837368-1120a9be278804d9.jpeg?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="\u65E0\u6CD5\u5206\u4EAB\u5230\u5FAE\u4FE1"></p><p>\u524D\u4E9B\u65E5\u5B50\u5FAE\u4FE1\u66F4\u65B0\u5230\u4E86 v6.7.3 \u7248\u672C\uFF0C\u4F20\u7EDF\u7684\u591A\u56FE\u5206\u4EAB\u65B9\u5F0F\u5DF2\u7ECF\u65E0\u6548\u4E86\u3002</p><h2 id="\u5FAE\u4FE1-v6-7-3-\u7248\u672C\u4EE5\u524D\u7684\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#\u5FAE\u4FE1-v6-7-3-\u7248\u672C\u4EE5\u524D\u7684\u65B9\u6848" aria-hidden="true">#</a> \u5FAE\u4FE1 v6.7.3 \u7248\u672C\u4EE5\u524D\u7684\u65B9\u6848</h2><p>\u5FAE\u4FE1\u5728 v6.7.3 \u4EE5\u524D\u7684\u7248\u672C\u63D0\u4F9B\u4E86\u4ECE\u7CFB\u7EDF\u76F8\u518C\u5206\u4EAB\u591A\u56FE\u5230\u670B\u53CB\u5708\u7684\u63A5\u53E3\uFF0C\u5177\u4F53\u4F7F\u7528\u5982\u4E0B\uFF1A</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">val</span> intent <span class="token operator">=</span> <span class="token function">Intent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
intent<span class="token punctuation">.</span>action <span class="token operator">=</span> Intent<span class="token punctuation">.</span>ACTION_SEND_MULTIPLE
intent<span class="token punctuation">.</span>component <span class="token operator">=</span> <span class="token function">ComponentName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;com.tencent.mm&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;com.tencent.mm.ui.tools.ShareToTimeLineUI&quot;</span></span><span class="token punctuation">)</span>
intent<span class="token punctuation">.</span>type <span class="token operator">=</span> &quot;image<span class="token comment">/*&quot;
intent.putStringArrayListExtra(Intent.EXTRA_TEXT, arrayListOf(text))
intent.putExtra(&quot;Kdescription&quot;, text)
// \u4F20\u9012\u591A\u5F20\u56FE\u7247\u7684 Uri \u3002
intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, uriList)
startActivity(intent)
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528\u4EE5\u4E0A\u4EE3\u7801\uFF0C\u5728\u5FAE\u4FE1 v6.7.3 \u4EE5\u524D\u53EF\u4EE5\u6B63\u5E38\u5206\u4EAB\uFF0C\u4F46\u662F\u5982\u679C\u7528\u6237\u628A\u5FAE\u4FE1\u66F4\u65B0\u5230 v6.7.3 \u7248\u672C\uFF0C\u518D\u4F7F\u7528\u8BE5\u5206\u6848\u5206\u4EAB\u591A\u56FE\u5C31\u53EA\u80FD\u770B\u5230\u4E0A\u9762\u90A3\u5F20\u56FE\u4E86\u3002</p><h2 id="\u8DF3\u8F6C\u5FAE\u4FE1-v6-7-3-\u56FE\u6587\u5206\u4EAB\u754C\u9762" tabindex="-1"><a class="header-anchor" href="#\u8DF3\u8F6C\u5FAE\u4FE1-v6-7-3-\u56FE\u6587\u5206\u4EAB\u754C\u9762" aria-hidden="true">#</a> \u8DF3\u8F6C\u5FAE\u4FE1 v6.7.3 \u56FE\u6587\u5206\u4EAB\u754C\u9762</h2><p>\u867D\u7136 v6.7.3 \u4E0D\u80FD\u76F4\u63A5\u5206\u4EAB\u591A\u56FE\u4E86\uFF0C\u4F46\u662F\u63A5\u53E3\u5176\u5B9E\u8FD8\u662F\u4FDD\u7559\u4E86\u7684\uFF0C\u53EA\u8981\u5728\u4F20\u9012\u53C2\u6570 <code>Intent.EXTRA_STREAM</code> \u65F6 urilList \u4E2D\u53EA\u643A\u5E26 1 \u5F20\u56FE\u7247\uFF0C\u8FD8\u662F\u53EF\u4EE5\u8DF3\u8F6C\u5230\u670B\u53CB\u5708\u56FE\u6587\u5206\u4EAB\u754C\u9762\u7684\u3002\u5982\u4E0B\uFF1A</p><p><img src="https://upload-images.jianshu.io/upload_images/1837368-ea7d1727938784a6.jpeg?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="\u5FAE\u4FE1\u56FE\u6587\u5206\u4EAB\u754C\u9762"></p>`,9),k={href:"https://github.com/shichaohui/WXShareMultiImage",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,"\u6B64\u754C\u9762\u548C\u4ECE\u670B\u53CB\u5708\u4E2D\u901A\u8FC7\u9009\u62E9\u56FE\u7247\u540E\u8DF3\u8F6C\u7684\u754C\u9762\u662F\u4E00\u6A21\u4E00\u6837\u7684\uFF0C\u4E0D\u4EC5\u53EF\u4EE5\u5206\u4EAB\u56FE\u7247\uFF0C\u8FD8\u53EF\u4EE5\u53D1\u9001\u6587\u5B57\u3001\u5B9A\u4F4D\u3001\u540C\u6B65\u5230QQ\u7A7A\u95F4\u3002",-1),m=n("p",null,[s("\u4F46\u662F\uFF0C\u4EC5\u4EC5\u6253\u5F00\u56FE\u6587\u5206\u4EAB\u754C\u9762\u662F\u4E0D\u884C\u7684\uFF0C\u56E0\u4E3A\u6211\u4EEC\u8981\u7684\u662F\u591A\u56FE\u5206\u4EAB\uFF0C\u800C\u8FD9\u91CC\u53EA\u4F20\u5165\u4E86 1 \u5F20\u56FE\u7247\u3002\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u9700\u8981\u7528\u5230 "),n("code",null,"AccessibilityService"),s("\u3002")],-1),h=n("h2",{id:"\u4F7F\u7528\u65E0\u969C\u788D\u670D\u52A1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4F7F\u7528\u65E0\u969C\u788D\u670D\u52A1","aria-hidden":"true"},"#"),s(" \u4F7F\u7528\u65E0\u969C\u788D\u670D\u52A1")],-1),b={href:"https://developer.android.com/guide/topics/ui/accessibility/",target:"_blank",rel:"noopener noreferrer"},g=t(`<blockquote><p>\u65E0\u969C\u788D\u670D\u52A1\u662F\u4E00\u4E2A\u4E3A\u6B8B\u75BE\u4EBA\u6216\u53EF\u80FD\u6682\u65F6\u65E0\u6CD5\u4E0E\u8BBE\u5907\u5B8C\u5168\u4E92\u52A8\u7684\u4EBA\u63D0\u4F9B\u7528\u6237\u754C\u9762\u6269\u5C55\u529F\u80FD\u7684\u670D\u52A1\u3002</p></blockquote><p>\u4ECEAndroid4.0\uFF08API\u7EA7\u522B14\uFF09\u5F00\u59CB\uFF0C\u65E0\u969C\u788D\u670D\u52A1\u53EF\u4EE5\u4EE3\u8868\u7528\u6237\u64CD\u4F5C\uFF0C\u5305\u542B\u6539\u53D8\u8F93\u5165\u7126\u70B9\u548C\u9009\u62E9\uFF08\u6FC0\u6D3B\uFF09\u7528\u6237\u754C\u9762\u5143\u7D20\u3002\u5728Android4.1\uFF08API\u7EA7\u522B16\uFF09\uFF0C\u64CD\u4F5C\u7684\u8303\u56F4\u88AB\u6269\u5C55\u81F3\u5305\u542B\u6EDA\u52A8\u5217\u8868\u548C\u4E0E\u6587\u672C\u57DF\u4EA4\u4E92\u3002\u65E0\u969C\u788D\u670D\u52A1\u4E5F\u53EF\u91C7\u53D6\u5168\u5C40\u64CD\u4F5C\uFF0C\u5982\u5BFC\u822A\u5230\u4E3B\u754C\u9762\u3001\u6309\u8FD4\u56DE\u6309\u94AE\u3001\u6253\u5F00\u5C4F\u5E55\u901A\u77E5\u548C\u6700\u8FD1\u5E94\u7528\u5217\u8868\u3002Android4.1\u4E5F\u5305\u542B\u65B0\u7126\u70B9\u7C7B\u578B\uFF0C\u65E0\u969C\u788D\u7126\u70B9\uFF0C\u8BE5\u7126\u70B9\u7C7B\u578B\u53EF\u8BA9\u6240\u6709\u89C6\u89C9\u5143\u7D20\u80FD\u591F\u88AB\u65E0\u969C\u788D\u670D\u52A1\u6240\u9009\u62E9\u3002</p><p>\u8FD9\u4E9B\u65B0\u7684\u80FD\u529B\u8BA9\u5F00\u53D1\u8005\u80FD\u591F\u5F00\u53D1\u66FF\u4EE3\u5BFC\u822A\u6A21\u5F0F\uFF0C\u5982\u624B\u52BF\u5BFC\u822A\uFF0C\u63D0\u9AD8\u6B8B\u969C\u7528\u6237\u5BF9Android\u8BBE\u5907\u7684\u63A7\u5236\u3002</p><p>\u901A\u8FC7\u4F7F\u7528\u65E0\u969C\u788D\u670D\u52A1\uFF0C\u53EF\u4EE5\u76D1\u542C\u7528\u6237\u624B\u673A\u754C\u9762\u548C\u4E8B\u4EF6\uFF0C\u5E76\u5728\u7279\u5B9A\u4E8B\u4EF6\u4EA7\u751F\u65F6\u4EE3\u66FF\u7528\u6237\u6267\u884C\u4E00\u4E9B\u64CD\u4F5C\u3002\u56E0\u6B64\u6211\u4EEC\u53EA\u8981\u77E5\u9053\u5206\u6790\u670B\u53CB\u5708\u56FE\u6587\u5206\u4EAB\u754C\u9762\u7684\u4E8B\u4EF6\uFF0C\u627E\u5230\u5408\u9002\u7684\u4E8B\u4EF6\u5E2E\u52A9\u7528\u6237\u81EA\u52A8\u586B\u5199\u6587\u5B57\u3001\u81EA\u52A8\u9009\u62E9\u56FE\u7247\u5373\u53EF\u3002</p><p><strong>\u6CE8\u610F\uFF1A\u7531\u4E8E\u65E0\u969C\u788D\u670D\u52A1\u529F\u80FD\u5F3A\u5927\uFF0C\u56E0\u6B64 Android \u7CFB\u7EDF\u5BF9\u5176\u8FDB\u884C\u4E86\u9650\u5236\uFF0C\u5FC5\u987B\u7528\u6237\u624B\u52A8\u6253\u5F00 APP \u5F00\u53D1\u7684\u65E0\u969C\u788D\u670D\u52A1\uFF0C\u624D\u80FD\u4EA7\u751F\u4F5C\u7528\u3002</strong></p><h3 id="\u4E8B\u4EF6\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#\u4E8B\u4EF6\u5206\u6790" aria-hidden="true">#</a> \u4E8B\u4EF6\u5206\u6790</h3><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">class</span> WXShareMultiImageService <span class="token operator">:</span> <span class="token function">AccessibilityService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onAccessibilityEvent</span><span class="token punctuation">(</span>event<span class="token operator">:</span> AccessibilityEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u5F53\u7A97\u53E3\u53D1\u751F\u7684\u4E8B\u4EF6\u662F\u6211\u4EEC\u914D\u7F6E\u76D1\u542C\u7684\u4E8B\u4EF6\u65F6,\u4F1A\u56DE\u8C03\u6B64\u65B9\u6CD5.\u4F1A\u88AB\u8C03\u7528\u591A\u6B21</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onInterrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//\u5F53\u670D\u52A1\u8981\u88AB\u4E2D\u65AD\u65F6\u8C03\u7528.\u4F1A\u88AB\u8C03\u7528\u591A\u6B21</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6BCF\u6B21\u4EA7\u751F\u7684\u4E8B\u4EF6\u90FD\u4F1A\u53D1\u9001\u5230 <code>onAccessibilityEvent</code> \u51FD\u6570\uFF0C\u901A\u8FC7\u6253\u5370 <code>AccessibilityEvent</code> \u7684\u5185\u5BB9\u5206\u6790\u4E8B\u4EF6\uFF0C\u53D1\u73B0\u4EE5\u4E0B\u4E8B\u4EF6\uFF1A</p><ul><li>\u6253\u5F00\u56FE\u6587\u5206\u4EAB\u754C\u9762\u65F6\u4EA7\u751F\u7684\u4E8B\u4EF6:</li></ul><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    eventType <span class="token operator">:</span> AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
    className <span class="token operator">:</span> com.tencent.mm.plugin.sns.ui.SnsUploadUI
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u70B9\u51FB\u6DFB\u52A0\u56FE\u7247\u7684 + \u53F7\u4EA7\u751F\u7684\u4E8B\u4EF6\uFF1A</li></ul><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    eventType <span class="token operator">:</span> AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED
    className <span class="token operator">:</span> android.widget.ListView
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u6253\u5F00\u56FE\u7247\u9009\u62E9\u754C\u9762\u7684\u4E8B\u4EF6\uFF1A</li></ul><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    eventType <span class="token operator">:</span> AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
    className <span class="token operator">:</span> com.tencent.mm.plugin.gallery.ui.AlbumPreviewUI
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5206\u6790\u56FE\u6587\u5206\u4EAB\u754C\u9762\u7684-ui" tabindex="-1"><a class="header-anchor" href="#\u5206\u6790\u56FE\u6587\u5206\u4EAB\u754C\u9762\u7684-ui" aria-hidden="true">#</a> \u5206\u6790\u56FE\u6587\u5206\u4EAB\u754C\u9762\u7684 UI</h3><p>\u4F7F\u7528 Android SDK \u7684 <code>uiautomatorviewer</code> \u5DE5\u5177\u5206\u6790 UI\uFF0C\u627E\u5230\u5982\u4E0B\u89C6\u56FE\uFF1A</p><ul><li>\u6587\u5B57\u7F16\u8F91\u6846\uFF08EditText\uFF09\u3002</li><li>\u5DF2\u9009\u56FE\u7247\u5217\u8868\uFF08GridView\uFF09\uFF0C\u6700\u540E\u4E00\u4E2A Item \u662F\u3010\u6DFB\u52A0\u56FE\u7247\u6309\u94AE\u3011\u3002</li><li>\u6DFB\u52A0\u56FE\u7247\u65B9\u5F0F\u5217\u8868\uFF08ListView\uFF09\uFF0C\u6700\u540E\u4E00\u4E2A Item \u662F\u3010\u4ECE\u76F8\u518C\u9009\u62E9\u3011\u3002</li><li>\u5F85\u9009\u56FE\u7247\u5217\u8868\uFF08GridView\uFF09\u3002</li><li>\u590D\u9009\u6846\uFF08CheckBox\uFF09\uFF0C\u5176\u5B9E\u70B9\u51FB\u7684\u4E0D\u662F CheckBox\uFF0C\u800C\u662F\u53E6\u4E00\u4E2A\u4E0D\u53EF\u89C1\u7684 View\u3002</li><li>\u3010\u5B8C\u6210\u3011\u9009\u62E9\u6309\u94AE\u3002</li></ul><p><code>AccessibilityService</code> \u4E2D\u83B7\u53D6\u89C6\u56FE\u8282\u70B9\u7684 3 \u79CD\u65B9\u5F0F\uFF1A</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token comment">// \u901A\u8FC7 id  \u83B7\u53D6\u8282\u70B9\u3002</span>
rootNodeInfo<span class="token punctuation">.</span><span class="token function">findAccessibilityNodeInfosByViewId</span><span class="token punctuation">(</span>idString<span class="token punctuation">)</span>

<span class="token comment">// \u901A\u8FC7\u6587\u672C\u83B7\u53D6\u8282\u70B9\u3002</span>
rootNodeInfo<span class="token punctuation">.</span><span class="token function">findAccessibilityNodeInfosByText</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>

<span class="token comment">// \u904D\u5386\u5B50\u8282\u70B9\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u3002</span>
<span class="token keyword">fun</span> <span class="token function">findNodeInfo</span><span class="token punctuation">(</span>rootNodeInfo<span class="token operator">:</span> AccessibilityNodeInfo<span class="token operator">?</span><span class="token punctuation">,</span> className<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> AccessibilityNodeInfo<span class="token operator">?</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u904D\u5386\uFF0C\u5177\u4F53\u5185\u5BB9\u8BF7\u67E5\u770B\u6E90\u7801\u3002</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5FAE\u4FE1\u6BCF\u4E2A\u7248\u672C\u7684\u89C6\u56FE id \u90FD\u4E0D\u4E00\u6837\uFF0C\u4E3A\u4E86\u7248\u672C\u517C\u5BB9\uFF0C\u4E0D\u80FD\u4F7F\u7528 id \u83B7\u53D6\u8282\u70B9\u3002</p><p>\u901A\u8FC7 text \u6587\u672C\u83B7\u53D6\u8282\u70B9\u53EA\u5BF9\u6709 text \u5C5E\u6027\u4E14\u6709\u503C\u7684\u8282\u70B9\u6709\u6548\u3002</p><p>\u56E0\u6B64\u5927\u591A\u6570\u8282\u70B9\u901A\u8FC7\u904D\u5386\u5B50\u8282\u70B9\u7684\u5F62\u5F0F\u83B7\u53D6\u3002</p><h3 id="\u81EA\u52A8\u7C98\u8D34" tabindex="-1"><a class="header-anchor" href="#\u81EA\u52A8\u7C98\u8D34" aria-hidden="true">#</a> \u81EA\u52A8\u7C98\u8D34</h3><p>\u5C06\u5F85\u5206\u4EAB\u7684\u6587\u5B57\u590D\u5236\u5230\u7CFB\u7EDF\u526A\u5207\u677F\uFF0C\u5982\u679C\u7528\u6237\u6253\u5F00\u4E86\u65E0\u969C\u788D\u670D\u52A1\uFF0C\u670D\u52A1\u5C06\u81EA\u52A8\u7C98\u8D34\u6587\u5B57\u5230\u8F93\u5165\u6846\uFF0C\u5426\u5219\u7528\u6237\u4E5F\u53EF\u4EE5\u624B\u52A8\u957F\u6309\u8F93\u5165\u6846\u7C98\u8D34\u3002</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">val</span> editText <span class="token operator">=</span> <span class="token function">findNodeInfo</span><span class="token punctuation">(</span>rootInActiveWindow<span class="token punctuation">,</span> EditText<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>Build<span class="token punctuation">.</span>VERSION<span class="token punctuation">.</span>SDK_INT <span class="token operator">&gt;=</span> Build<span class="token punctuation">.</span>VERSION_CODES<span class="token punctuation">.</span>JELLY_BEAN_MR2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u7C98\u8D34\u526A\u5207\u677F\u5185\u5BB9</span>
    editText<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">performAction</span><span class="token punctuation">(</span>AccessibilityNodeInfo<span class="token punctuation">.</span>ACTION_FOCUS<span class="token punctuation">)</span>
    editText<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">performAction</span><span class="token punctuation">(</span>AccessibilityNodeInfo<span class="token punctuation">.</span>ACTION_PASTE<span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    editText<span class="token operator">?</span><span class="token punctuation">.</span>text <span class="token operator">=</span> ClipboardUtil<span class="token punctuation">.</span><span class="token function">getPrimaryClip</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u81EA\u52A8\u9009\u56FE" tabindex="-1"><a class="header-anchor" href="#\u81EA\u52A8\u9009\u56FE" aria-hidden="true">#</a> \u81EA\u52A8\u9009\u56FE</h3><p>\u7528\u6237\u70B9\u51FB\u5206\u4EAB\u65F6\u4E0B\u8F7D\u5E76\u8BB0\u5F55\u56FE\u7247\uFF0C\u5982\u679C\u7528\u6237\u6253\u5F00\u4E86\u65E0\u969C\u788D\u670D\u52A1\uFF0C\u670D\u52A1\u5C06\u4EE3\u66FF\u7528\u6237\u81EA\u52A8\u9009\u62E9\u56FE\u7247\uFF0C\u5426\u5219\u7528\u6237\u4E5F\u53EF\u4EE5\u8FDB\u5165\u76F8\u518C\u624B\u52A8\u9009\u62E9\u56FE\u7247\u3002</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token comment">// \u4EE5\u4E0B\u51E0\u4E2A\u6B65\u9AA4\u662F\u5F02\u6B65\u7684\uFF0C\u8FD9\u91CC\u53EA\u662F\u4E3A\u4E86\u65B9\u4FBF\u624D\u5199\u5728\u4E86\u4E00\u8D77\u3002</span>

<span class="token comment">// \u7B2C\u4E00\u6B65\uFF1A \u81EA\u52A8\u70B9\u51FB\u6DFB\u52A0\u56FE\u7247\u7684 + \u53F7\u6309\u94AE\u3002</span>
<span class="token keyword">val</span> gridView <span class="token operator">=</span> <span class="token function">findNodeInfo</span><span class="token punctuation">(</span>rootInActiveWindow<span class="token punctuation">,</span> GridView<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
gridView<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">getChild</span><span class="token punctuation">(</span>gridView<span class="token punctuation">.</span>childCount <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">performAction</span><span class="token punctuation">(</span>AccessibilityNodeInfo<span class="token punctuation">.</span>ACTION_CLICK<span class="token punctuation">)</span>

<span class="token comment">// \u7B2C\u4E8C\u6B65\uFF1A\u70B9\u51FB\u3010\u4ECE\u76F8\u518C\u9009\u62E9\u3011\u6309\u94AE\u3002</span>
listView<span class="token punctuation">.</span><span class="token function">findAccessibilityNodeInfosByText</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\u4ECE\u76F8\u518C\u9009\u62E9&quot;</span></span><span class="token punctuation">)</span>
        <span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token operator">?</span><span class="token punctuation">.</span>parent
        <span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">performAction</span><span class="token punctuation">(</span>AccessibilityNodeInfo<span class="token punctuation">.</span>ACTION_CLICK<span class="token punctuation">)</span>

<span class="token comment">// \u7B2C\u4E09\u6B65\uFF1A\u9009\u62E9\u56FE\u7247\u3002</span>
<span class="token keyword">val</span> gridView <span class="token operator">=</span> <span class="token function">findNodeInfo</span><span class="token punctuation">(</span>rootInActiveWindow<span class="token punctuation">,</span> GridView<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token keyword">in</span> ShareInfo<span class="token punctuation">.</span><span class="token function">getSelectedImageCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">..</span>ShareInfo<span class="token punctuation">.</span><span class="token function">getWaitingImageCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">findNodeInfo</span><span class="token punctuation">(</span>gridView<span class="token punctuation">.</span><span class="token function">getChild</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> View<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
            <span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">performAction</span><span class="token punctuation">(</span>AccessibilityNodeInfo<span class="token punctuation">.</span>ACTION_CLICK<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u7B2C\u56DB\u6B65\uFF1A\u70B9\u51FB\u3010\u5B8C\u6210\u3011\u6309\u94AE\u3002</span>
rootInActiveWindow<span class="token punctuation">.</span><span class="token function">findAccessibilityNodeInfosByText</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;\u5B8C\u6210&quot;</span></span><span class="token punctuation">)</span>
        <span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">performAction</span><span class="token punctuation">(</span>AccessibilityNodeInfo<span class="token punctuation">.</span>ACTION_CLICK<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),_={id:"\u8BE6\u7EC6\u5185\u5BB9\u8BF7-\u67E5\u770B\u6E90\u7801-\u3002",tabindex:"-1"},f=n("a",{class:"header-anchor",href:"#\u8BE6\u7EC6\u5185\u5BB9\u8BF7-\u67E5\u770B\u6E90\u7801-\u3002","aria-hidden":"true"},"#",-1),I={href:"https://github.com/shichaohui/WXShareMultiImage",target:"_blank",rel:"noopener noreferrer"},A=n("p",null,"\u4E3A\u4E86\u65B9\u4FBF\u5927\u5BB6\u4F7F\u7528\u65B0\u7684\u5206\u4EAB\u65B9\u6848\uFF0C\u6211\u8FD9\u91CC\u5DF2\u7ECF\u5C01\u88C5\u6210\u7EC4\u4EF6 \uFF0C\u5E76\u53D1\u5E03\u6E90\u7801\u5230 Github\u3002",-1),y=n("p",null,"https://github.com/shichaohui/WXShareMultiImage",-1),N=n("h2",{id:"\u5B8C\u6574\u7684\u591A\u56FE\u5206\u4EAB\u6D41\u7A0B",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5B8C\u6574\u7684\u591A\u56FE\u5206\u4EAB\u6D41\u7A0B","aria-hidden":"true"},"#"),s(" \u5B8C\u6574\u7684\u591A\u56FE\u5206\u4EAB\u6D41\u7A0B")],-1),w=n("p",null,[n("img",{src:"https://upload-images.jianshu.io/upload_images/1837368-39d6871246afc082.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1240",alt:"\u6D41\u7A0B\u56FE"})],-1),x={id:"\u4E0B\u8F7D-demo",tabindex:"-1"},T=n("a",{class:"header-anchor",href:"#\u4E0B\u8F7D-demo","aria-hidden":"true"},"#",-1),E={href:"https://github.com/shichaohui/WXShareMultiImage/blob/master/demo.apk",target:"_blank",rel:"noopener noreferrer"},S={id:"github-\u67E5\u770B\u6E90\u7801",tabindex:"-1"},C=n("a",{class:"header-anchor",href:"#github-\u67E5\u770B\u6E90\u7801","aria-hidden":"true"},"#",-1),V={href:"https://github.com/shichaohui/WXShareMultiImage",target:"_blank",rel:"noopener noreferrer"},L=t('<h2 id="\u4F18\u7F3A\u70B9" tabindex="-1"><a class="header-anchor" href="#\u4F18\u7F3A\u70B9" aria-hidden="true">#</a> \u4F18\u7F3A\u70B9</h2><p><strong>\u4F18\u70B9</strong></p><ol start="0"><li>\u53EF\u81EA\u52A8\u7C98\u8D34\u5206\u4EAB\u6587\u5B57\u3002</li><li>\u53EF\u81EA\u52A8\u9009\u62E9\u6307\u5B9A\u7684\u591A\u5F20\u56FE\u7247\u3002</li><li>\u670D\u52A1\u4E0D\u53EF\u7528\u65F6\u4F1A\u81EA\u52A8\u964D\u7EA7\uFF0C\u7531\u7528\u6237\u624B\u52A8\u9009\u62E9\u56FE\u7247\u3002</li></ol><p><strong>\u7F3A\u70B9</strong></p><ol start="0"><li>\u65E0\u6CD5\u83B7\u53D6\u5206\u4EAB\u7ED3\u679C\u3002</li><li>\u9700\u7528\u6237\u624B\u52A8\u6253\u5F00\u670D\u52A1\u3002</li><li>\u90E8\u5206\u673A\u578B\u5728\u5173\u95EDAPP\u65F6\u4F1A\u81EA\u52A8\u5173\u95ED\u670D\u52A1\u3002</li><li>\u5FAE\u4FE1\u66F4\u65B0\u670B\u53CB\u5708\u56FE\u6587\u5206\u4EAB\u754C\u9762\u53EF\u80FD\u5BFC\u81F4\u65B9\u6848\u5931\u6548\u3002</li></ol>',5);function j(W,O){const a=c("ExternalLinkIcon");return o(),p("div",null,[n("p",null,[n("a",u,[s("Github \u67E5\u770B\u6E90\u7801"),e(a)])]),n("blockquote",null,[n("p",null,[s("\u672C\u5E93\u7ECF\u8FC7\u51E0\u4E2A\u7248\u672C\u7684\u5347\u7EA7\uFF0C\u5F53\u524D\u7684\u5206\u4EAB\u903B\u8F91\u548C\u672C\u6587\u4E2D\u7565\u6709\u4E0D\u540C\uFF0C\u4F46\u6574\u4F53\u601D\u60F3\u662F\u4E00\u81F4\u7684\uFF0C\u5B9E\u9645\u65B9\u6848\u8BF7"),n("a",r,[s("\u9605\u8BFB\u6E90\u7801"),e(a)]),s("\u3002")])]),d,n("blockquote",null,[n("p",null,[s("\u5FAE\u4FE1 v7.0.x \u4E0D\u80FD\u4F7F\u7528 Intent.ACTION_SEND_MULTIPLE \u5206\u4EAB\u4E86\uFF0C\u53EA\u80FD\u4F7F\u7528 Intent.ACTION_SEND\uFF0C\u5177\u4F53\u89E3\u51B3\u65B9\u6848\u8BF7"),n("a",k,[s("\u9605\u8BFB\u6E90\u7801"),e(a)]),s("\u3002")])]),v,m,h,n("p",null,[n("a",b,[s("AccessibilityService \u5B98\u65B9\u6587\u6863"),e(a)])]),g,n("h2",_,[f,s(" \u8BE6\u7EC6\u5185\u5BB9\u8BF7 "),n("a",I,[s("\u67E5\u770B\u6E90\u7801"),e(a)]),s(" \u3002")]),A,y,N,w,n("h2",x,[T,s(),n("a",E,[s("\u4E0B\u8F7D Demo"),e(a)])]),n("h2",S,[C,s(),n("a",V,[s("Github \u67E5\u770B\u6E90\u7801"),e(a)])]),L])}const M=i(l,[["render",j],["__file","\u5FAE\u4FE1\u670B\u53CB\u5708\u591A\u56FE\u5206\u4EAB\u65B9\u6848.html.vue"]]);export{M as default};
