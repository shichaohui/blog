import{_ as t,o as i,c as p,b as n,d as s,e,a as c,r as o}from"./app.81ed69ec.js";const l={},r={href:"https://github.com/vitejs/vite",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/facebook/react",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noopener noreferrer"},v=c(`<h2 id="\u4EC0\u4E48\u662F-vite" tabindex="-1"><a class="header-anchor" href="#\u4EC0\u4E48\u662F-vite" aria-hidden="true">#</a> \u4EC0\u4E48\u662F Vite\uFF1F</h2><p><code>Vite</code>\uFF08\u6CD5\u8BED\u610F\u601D\u662F \u201C\u5FEB\u201D\uFF0C\u53D1\u97F3\u4E3A <code>/vit/</code>\uFF0C\u7C7B\u4F3C <code>veet</code>\uFF09\u662F\u4E00\u79CD\u5168\u65B0\u7684\u9762\u5411\u672A\u6765\u7684\u524D\u7AEF\u5F00\u53D1\u670D\u52A1\u5668\u548C\u6784\u5EFA\u5DE5\u5177\u3002<br><code>Vite</code> \u5229\u7528\u6D4F\u89C8\u5668\u539F\u751F <code>ES Module</code> \u53BB\u89E3\u6790 <code>imports</code>\uFF0C\u5728\u670D\u52A1\u5668\u7AEF\u6309\u9700\u7F16\u8BD1\u8FD4\u56DE\uFF0C\u8DF3\u8FC7\u4E86\u6253\u5305\u7684\u6982\u5FF5\uFF0C\u670D\u52A1\u5668\u968F\u8D77\u968F\u7528\u3002\u540C\u65F6\u4E0D\u4EC5\u652F\u6301 <code>Vue</code> \u548C <code>React</code>\uFF0C\u8FD8\u641E\u5B9A\u4E86\u70ED\u66F4\u65B0\uFF0C\u800C\u4E14\u70ED\u66F4\u65B0\u7684\u901F\u5EA6\u4E0D\u4F1A\u968F\u7740\u6A21\u5757\u589E\u591A\u800C\u53D8\u6162\u3002\u9488\u5BF9\u751F\u4EA7\u73AF\u5883\u5219\u53EF\u4EE5\u628A\u540C\u4E00\u4EFD\u4EE3\u7801\u7528 <code>rollup</code> \u6253\u5305\u3002</p><h2 id="\u521B\u5EFA\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u9879\u76EE" aria-hidden="true">#</a> \u521B\u5EFA\u9879\u76EE</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4F7F\u7528 npm \u521B\u5EFA React \u6A21\u677F\u7684\u9879\u76EE my-vite-app</span>
<span class="token function">npm</span> init @vitejs/app my-vite-app --template react

<span class="token comment"># \u4F7F\u7528 npm \u521B\u5EFA React + TypeScript \u6A21\u677F\u7684\u9879\u76EE my-vite-app</span>
<span class="token function">npm</span> init @vitejs/app my-vite-app --template react-ts


<span class="token comment"># \u4F7F\u7528 yarn \u521B\u5EFA React \u6A21\u677F\u7684\u9879\u76EE my-vite-app</span>
<span class="token function">yarn</span> create @vitejs/app my-vite-app --template react

<span class="token comment"># \u4F7F\u7528 yarn \u521B\u5EFA React + TypeScript \u6A21\u677F\u7684\u9879\u76EE my-vite-app</span>
<span class="token function">yarn</span> create @vitejs/app my-vite-app --template react-ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B89\u88C5-antd" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-antd" aria-hidden="true">#</a> \u5B89\u88C5 Antd</h2><h3 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5B89\u88C5 antd</span>
<span class="token function">yarn</span> <span class="token function">add</span> antd
<span class="token comment"># \u5B89\u88C5 less</span>
<span class="token function">yarn</span> <span class="token function">add</span> -D <span class="token function">less</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token operator">...</span>
  css<span class="token operator">:</span> <span class="token punctuation">{</span>
    preprocessorOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
      less<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u652F\u6301\u5185\u8054 JavaScript</span>
        javascriptEnabled<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token comment">// \u91CD\u5199 less \u53D8\u91CF\uFF0C\u5B9A\u5236\u6837\u5F0F</span>
        modifyVars<span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token string-property property">&#39;@primary-color&#39;</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5BFC\u5165\u6837\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u5BFC\u5165\u6837\u5F0F" aria-hidden="true">#</a> \u5BFC\u5165\u6837\u5F0F</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// App.tsx</span>

<span class="token keyword">import</span> <span class="token string">&#39;antd/dist/antd.less&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4F7F\u7528-css-\u9884\u5904\u7406\u5668" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-css-\u9884\u5904\u7406\u5668" aria-hidden="true">#</a> \u4F7F\u7528 CSS \u9884\u5904\u7406\u5668</h2><p>\u5B89\u88C5\u5373\u53EF\uFF0C\u65E0\u9700\u63D2\u4EF6\uFF0CVite \u9ED8\u8BA4\u652F\u6301\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> -D sass <span class="token function">less</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u4F7F\u7528-css-module" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-css-module" aria-hidden="true">#</a> \u4F7F\u7528 CSS Module</h2><p>\u4FEE\u6539 CSS \u6587\u4EF6\u540D\u4E3A CSS Module \u683C\u5F0F\u5373\u53EF\uFF0C\u65E0\u9700\u914D\u7F6E\uFF0CVite \u9ED8\u8BA4\u652F\u6301\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>index<span class="token punctuation">.</span>css <span class="token operator">--</span><span class="token operator">&gt;</span> index<span class="token punctuation">.</span>module<span class="token punctuation">.</span>css
index<span class="token punctuation">.</span>scss <span class="token operator">--</span><span class="token operator">&gt;</span> index<span class="token punctuation">.</span>module<span class="token punctuation">.</span>scss
index<span class="token punctuation">.</span>less <span class="token operator">--</span><span class="token operator">&gt;</span> index<span class="token punctuation">.</span>module<span class="token punctuation">.</span>less
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5168\u5C40\u6837\u5F0F\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40\u6837\u5F0F\u914D\u7F6E" aria-hidden="true">#</a> \u5168\u5C40\u6837\u5F0F\u914D\u7F6E</h2><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token operator">...</span>
  css<span class="token operator">:</span> <span class="token punctuation">{</span>
    preprocessorOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
      scss<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u81EA\u52A8\u5BFC\u5165\u5168\u5C40\u6837\u5F0F</span>
        additionalData<span class="token operator">:</span> <span class="token string">&quot;@import &#39;@/styles/base.scss&#39;;&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u8DEF\u5F84\u522B\u540D" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u5F84\u522B\u540D" aria-hidden="true">#</a> \u8DEF\u5F84\u522B\u540D</h2><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token operator">...</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    alias<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;@&quot;</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> Mine <span class="token keyword">from</span> <span class="token string">&quot;@/pages/Mine&quot;</span>
<span class="token keyword">import</span> Avatar <span class="token keyword">from</span> <span class="token string">&quot;@/components/Avatar&quot;</span>
<span class="token keyword">import</span> utils <span class="token keyword">from</span> <span class="token string">&quot;@/utils&quot;</span>
<span class="token keyword">import</span> baseStyle <span class="token keyword">from</span> <span class="token string">&quot;@/styles/base.scss&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u8C03\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u8C03\u8BD5" aria-hidden="true">#</a> \u8C03\u8BD5</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u76F4\u63A5\u8FD0\u884C\u8C03\u8BD5</span>
<span class="token function">yarn</span> dev

<span class="token comment"># \u6253\u5305</span>
<span class="token function">yarn</span> build

<span class="token comment"># \u9884\u89C8\u6253\u5305\u7ED3\u679C</span>
<span class="token function">yarn</span> serve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6784\u5EFA\u53D1\u5E03\u5305" tabindex="-1"><a class="header-anchor" href="#\u6784\u5EFA\u53D1\u5E03\u5305" aria-hidden="true">#</a> \u6784\u5EFA\u53D1\u5E03\u5305</h2><p>\u5982\u679C\u662F\u53D1\u5E03\u5230\u670D\u52A1\u5668\u6839\u76EE\u5F55\uFF0C\u90A3\u4E48\u65E0\u9700\u914D\u7F6E\uFF0C\u76F4\u63A5 <code>yarn build</code> \u6253\u5305\u5373\u53EF\u3002</p><p>\u5982\u679C\u662F\u53D1\u5E03\u5230\u670D\u52A1\u5668\u5B50\u76EE\u5F55\uFF0C\u5982\uFF1Awebsite\uFF0C\u90A3\u4E48\u9700\u8981\u914D\u7F6E\u4E24\u4E2A\u70B9\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// \u914D\u7F6E\u516C\u5171\u8DEF\u5F84\uFF0C\u5426\u5219\u4F1A\u51FA\u73B0\u8D44\u6E90\u627E\u4E0D\u5230\u7684\u95EE\u9898</span>
  base<span class="token operator">:</span> <span class="token string">&quot;/website&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// \u8DEF\u7531\u914D\u7F6E</span>

<span class="token comment">// \u914D\u7F6E\u8DEF\u7531\u6839\u8DEF\u5F84\uFF0C\u5426\u5219\u8DEF\u7531\u8DF3\u8F6C\u540E\u6D4F\u89C8\u5668\u4E0A\u663E\u793A\u7684\u5730\u5740\u4E0D\u5305\u542B\u670D\u52A1\u5668\u5B50\u76EE\u5F55</span>
<span class="token operator">&lt;</span>BrowserRouter basename<span class="token operator">=</span><span class="token string">&quot;/website&quot;</span><span class="token operator">&gt;</span>
	<span class="token operator">...</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>BrowserRouter<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u8E29\u5751" tabindex="-1"><a class="header-anchor" href="#\u8E29\u5751" aria-hidden="true">#</a> \u8E29\u5751</h2>`,30),m={href:"https://blog.csdn.net/u014165119/article/details/114241036",target:"_blank",rel:"noopener noreferrer"};function k(b,h){const a=o("ExternalLinkIcon");return i(),p("div",null,[n("blockquote",null,[n("p",null,[n("a",r,[s("Vite2"),e(a)]),s("\u3001"),n("a",d,[s("React"),e(a)]),s("\u3001"),n("a",u,[s("Antd"),e(a)])])]),v,n("p",null,[n("a",m,[s("Vite2 + React + Antd \u8E29\u5751\u6307\u5357"),e(a)])])])}const f=t(l,[["render",k],["__file","\u4F7F\u7528 Vite2 \u6784\u5EFA React + Antd \u9879\u76EE.html.vue"]]);export{f as default};
