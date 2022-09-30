import{_ as d,o as t,c as l,b as e,d as o,e as a,a as n,r as s}from"./app.81ed69ec.js";const i={},r=e("p",null,[o("\u6700\u8FD1\u5F97\u7A7A\uFF0C\u5C31\u53BB\u4E00\u4E9B\u62DB\u8058\u7F51\u7AD9\u505A\u4E86\u4E9B\u9762\u8BD5\u9898\uFF0C\u4E3A\u65B9\u4FBF\u5927\u5BB6\u5171\u540C\u5B66\u4E60\uFF0C"),e("code",null,"Java API"),o(" \u76F8\u5173\u7684\u5C31\u5728\u8FD9\u7BC7\u535A\u5BA2\u91CC\u8BB0\u5F55\u4E00\u4E0B\uFF0C\u4EE5\u540E\u6709\u7A7A\u4F1A\u6301\u7EED\u66F4\u65B0\uFF0C\u5927\u5BB6\u6709\u66F4\u597D\u7684\u7B54\u6848\u4E5F\u53EF\u4EE5\u7559\u8A00\u544A\u8BC9\u6211\u3002")],-1),h={href:"http://blog.csdn.net/u014165119/article/details/49908451",target:"_blank",rel:"noopener noreferrer"},p={href:"http://blog.csdn.net/u014165119/article/details/49908549",target:"_blank",rel:"noopener noreferrer"},_=n('<h2 id="_1-hashmap-\u548C-hashtable-\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#_1-hashmap-\u548C-hashtable-\u7684\u533A\u522B" aria-hidden="true">#</a> 1. HashMap \u548C Hashtable \u7684\u533A\u522B</h2><ul><li><code>Hashtable</code> \u7EE7\u627F\u81EA <code>Dictiionary</code> \u800C <code>HashMap</code> \u7EE7\u627F\u81EA <code>AbstractMap</code>\u3002</li><li><code>HashMap</code> \u5141\u8BB8\u5C06 <code>null</code> \u4F5C\u4E3A\u4E00\u4E2A <code>entry</code> \u7684 <code>key</code> \u6216\u8005 <code>value</code>\uFF0C\u800C <code>Hashtable</code> \u4E0D\u5141\u8BB8\u3002</li><li><code>Hashtable</code> \u4F7F\u7528 <code>contains</code> \u65B9\u6CD5\u53BB\u67E5\u770B\u662F\u5426\u5305\u542B\u67D0\u4E00\u5BF9\u8C61\uFF0C<code>HashMap</code> \u4F7F\u7528 <code>containsvalue</code> \u548C <code>containsKey</code>\u3002</li><li>\u6700\u5927\u7684\u4E0D\u540C\u662F\uFF0C<code>Hashtable</code> \u7684\u65B9\u6CD5\u662F <code>Synchronize</code> \u7684\uFF0C\u800C <code>HashMap</code> \u4E0D\u662F\uFF0C\u5728\u591A\u4E2A\u7EBF\u7A0B\u8BBF\u95EE <code>Hashtable</code> \u65F6\uFF0C\u4E0D\u9700\u8981\u81EA\u5DF1\u4E3A\u5B83\u7684\u65B9\u6CD5\u5B9E\u73B0\u540C\u6B65\uFF0C\u800C <code>HashMap</code> \u5C31\u5FC5\u987B\u4E3A\u4E4B\u63D0\u4F9B\u5916\u540C\u6B65\uFF08<code>Collections.synchronizedMap</code>\uFF09\u3002</li></ul><h2 id="_2-collection-\u548C-collections-\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#_2-collection-\u548C-collections-\u7684\u533A\u522B" aria-hidden="true">#</a> 2. Collection \u548C Collections \u7684\u533A\u522B</h2><p><code>Collection</code> \u662F\u4E00\u4E2A\u96C6\u5408\u63A5\u53E3\u3002\u5B83\u63D0\u4F9B\u4E86\u5BF9\u96C6\u5408\u5BF9\u8C61\u8FDB\u884C\u57FA\u672C\u64CD\u4F5C\u7684\u901A\u7528\u63A5\u53E3\u65B9\u6CD5\u3002<code>Collection</code> \u63A5\u53E3\u5728 <code>Java</code> \u7C7B\u5E93\u4E2D\u6709\u5F88\u591A\u5177\u4F53\u7684\u5B9E\u73B0\u3002<code>Collection</code> \u63A5\u53E3\u7684\u610F\u4E49\u662F\u4E3A\u5404\u79CD\u5177\u4F53\u7684\u96C6\u5408\u63D0\u4F9B\u4E86\u6700\u5927\u5316\u7684\u7EDF\u4E00\u64CD\u4F5C\u65B9\u5F0F\uFF1B</p><p><code>Collections</code> \u662F\u4E00\u4E2A\u5305\u88C5\u7C7B\u3002\u5B83\u5305\u542B\u6709\u5404\u79CD\u6709\u5173\u96C6\u5408\u64CD\u4F5C\u7684\u9759\u6001\u591A\u6001\u65B9\u6CD5\u3002\u6B64\u7C7B\u4E0D\u80FD\u5B9E\u4F8B\u5316\uFF0C\u5C31\u50CF\u4E00\u4E2A\u5DE5\u5177\u7C7B\uFF0C\u670D\u52A1\u4E8E <code>Java</code> \u7684 <code>Collection</code> \u6846\u67B6\u3002</p><h2 id="_3-sleep-\u548C-wait-\u6709\u4EC0\u4E48\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#_3-sleep-\u548C-wait-\u6709\u4EC0\u4E48\u533A\u522B" aria-hidden="true">#</a> 3. sleep() \u548C wait() \u6709\u4EC0\u4E48\u533A\u522B?</h2><p><code>sleep()</code> \u65B9\u6CD5\u662F\u5C5E\u4E8E <code>Thread</code> \u7C7B\u4E2D\u7684\u3002\u800C <code>wait()</code> \u65B9\u6CD5\u662F\u5C5E\u4E8E <code>Object</code> \u7C7B\u4E2D\u7684\u3002</p><p><code>sleep()</code> \u65B9\u6CD5\u5BFC\u81F4\u4E86\u7A0B\u5E8F\u6682\u505C\u6267\u884C\u6307\u5B9A\u7684\u65F6\u95F4\uFF0C\u8BA9\u51FA <code>cpu</code> \u8BE5\u5176\u4ED6\u7EBF\u7A0B\uFF0C\u4F46\u662F\u4ED6\u7684\u76D1\u63A7\u72B6\u6001\u4F9D\u7136\u4FDD\u6301\u8005\uFF0C\u5F53\u6307\u5B9A\u7684\u65F6\u95F4\u5230\u4E86\u53C8\u4F1A\u81EA\u52A8\u6062\u590D\u8FD0\u884C\u72B6\u6001\u3002\u5728\u8C03\u7528 <code>sleep()</code> \u65B9\u6CD5\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u7EBF\u7A0B\u4E0D\u4F1A\u91CA\u653E\u5BF9\u8C61\u9501\u3002</p><p>\u800C\u5F53\u8C03\u7528 <code>wait()</code> \u65B9\u6CD5\u7684\u65F6\u5019\uFF0C\u7EBF\u7A0B\u4F1A\u653E\u5F03\u5BF9\u8C61\u9501\uFF0C\u8FDB\u5165\u7B49\u5F85\u6B64\u5BF9\u8C61\u7684\u7B49\u5F85\u9501\u5B9A\u6C60\uFF0C\u53EA\u6709\u9488\u5BF9\u6B64\u5BF9\u8C61\u8C03\u7528 <code>notify()</code> \u65B9\u6CD5\u540E\u672C\u7EBF\u7A0B\u624D\u8FDB\u5165\u5BF9\u8C61\u9501\u5B9A\u6C60\u51C6\u5907\u83B7\u53D6\u5BF9\u8C61\u9501\u8FDB\u5165\u8FD0\u884C\u72B6\u6001\u3002</p>',9);function u(b,f){const c=s("ExternalLinkIcon");return t(),l("div",null,[r,e("p",null,[e("a",h,[o("\u9762\u8BD5\u9898\uFF0DJava\u7B97\u6CD5\u7BC7 \u4F20\u9001\u95E8"),a(c)])]),e("p",null,[e("a",p,[o("\u9762\u8BD5\u9898\uFF0DAndroid\u7BC7 \u4F20\u9001\u95E8"),a(c)])]),_])}const v=d(i,[["render",u],["__file","\u9762\u8BD5\u9898\uFF0DJava API \u7BC7.html.vue"]]);export{v as default};
