import{_ as t,p as i,q as p,s as n,R as s,t as e,a0 as c,n as o}from"./framework-8abcb967.js";const l={},r={href:"https://github.com/vitejs/vite",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/facebook/react",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noopener noreferrer"},v=c(`<h2 id="什么是-vite" tabindex="-1"><a class="header-anchor" href="#什么是-vite" aria-hidden="true">#</a> 什么是 Vite？</h2><p><code>Vite</code>（法语意思是 “快”，发音为 <code>/vit/</code>，类似 <code>veet</code>）是一种全新的面向未来的前端开发服务器和构建工具。<br><code>Vite</code> 利用浏览器原生 <code>ES Module</code> 去解析 <code>imports</code>，在服务器端按需编译返回，跳过了打包的概念，服务器随起随用。同时不仅支持 <code>Vue</code> 和 <code>React</code>，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 <code>rollup</code> 打包。</p><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用 npm 创建 React 模板的项目 my-vite-app</span>
<span class="token function">npm</span> init @vitejs/app my-vite-app <span class="token parameter variable">--template</span> react

<span class="token comment"># 使用 npm 创建 React + TypeScript 模板的项目 my-vite-app</span>
<span class="token function">npm</span> init @vitejs/app my-vite-app <span class="token parameter variable">--template</span> react-ts


<span class="token comment"># 使用 yarn 创建 React 模板的项目 my-vite-app</span>
<span class="token function">yarn</span> create @vitejs/app my-vite-app <span class="token parameter variable">--template</span> react

<span class="token comment"># 使用 yarn 创建 React + TypeScript 模板的项目 my-vite-app</span>
<span class="token function">yarn</span> create @vitejs/app my-vite-app <span class="token parameter variable">--template</span> react-ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装-antd" tabindex="-1"><a class="header-anchor" href="#安装-antd" aria-hidden="true">#</a> 安装 Antd</h2><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 antd</span>
<span class="token function">yarn</span> <span class="token function">add</span> antd
<span class="token comment"># 安装 less</span>
<span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> <span class="token function">less</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token operator">...</span>
  css<span class="token operator">:</span> <span class="token punctuation">{</span>
    preprocessorOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
      less<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 支持内联 JavaScript</span>
        javascriptEnabled<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token comment">// 重写 less 变量，定制样式</span>
        modifyVars<span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token string-property property">&#39;@primary-color&#39;</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入样式" tabindex="-1"><a class="header-anchor" href="#导入样式" aria-hidden="true">#</a> 导入样式</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// App.tsx</span>

<span class="token keyword">import</span> <span class="token string">&#39;antd/dist/antd.less&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-css-预处理器" tabindex="-1"><a class="header-anchor" href="#使用-css-预处理器" aria-hidden="true">#</a> 使用 CSS 预处理器</h2><p>安装即可，无需插件，Vite 默认支持。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> sass <span class="token function">less</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用-css-module" tabindex="-1"><a class="header-anchor" href="#使用-css-module" aria-hidden="true">#</a> 使用 CSS Module</h2><p>修改 CSS 文件名为 CSS Module 格式即可，无需配置，Vite 默认支持。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>index<span class="token punctuation">.</span>css <span class="token operator">--</span><span class="token operator">&gt;</span> index<span class="token punctuation">.</span>module<span class="token punctuation">.</span>css
index<span class="token punctuation">.</span>scss <span class="token operator">--</span><span class="token operator">&gt;</span> index<span class="token punctuation">.</span>module<span class="token punctuation">.</span>scss
index<span class="token punctuation">.</span>less <span class="token operator">--</span><span class="token operator">&gt;</span> index<span class="token punctuation">.</span>module<span class="token punctuation">.</span>less
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全局样式配置" tabindex="-1"><a class="header-anchor" href="#全局样式配置" aria-hidden="true">#</a> 全局样式配置</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token operator">...</span>
  css<span class="token operator">:</span> <span class="token punctuation">{</span>
    preprocessorOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
      scss<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 自动导入全局样式</span>
        additionalData<span class="token operator">:</span> <span class="token string">&quot;@import &#39;@/styles/base.scss&#39;;&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路径别名" tabindex="-1"><a class="header-anchor" href="#路径别名" aria-hidden="true">#</a> 路径别名</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token operator">...</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    alias<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;@&quot;</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> Mine <span class="token keyword">from</span> <span class="token string">&quot;@/pages/Mine&quot;</span>
<span class="token keyword">import</span> Avatar <span class="token keyword">from</span> <span class="token string">&quot;@/components/Avatar&quot;</span>
<span class="token keyword">import</span> utils <span class="token keyword">from</span> <span class="token string">&quot;@/utils&quot;</span>
<span class="token keyword">import</span> baseStyle <span class="token keyword">from</span> <span class="token string">&quot;@/styles/base.scss&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="调试" tabindex="-1"><a class="header-anchor" href="#调试" aria-hidden="true">#</a> 调试</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 直接运行调试</span>
<span class="token function">yarn</span> dev

<span class="token comment"># 打包</span>
<span class="token function">yarn</span> build

<span class="token comment"># 预览打包结果</span>
<span class="token function">yarn</span> serve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建发布包" tabindex="-1"><a class="header-anchor" href="#构建发布包" aria-hidden="true">#</a> 构建发布包</h2><p>如果是发布到服务器根目录，那么无需配置，直接 <code>yarn build</code> 打包即可。</p><p>如果是发布到服务器子目录，如：website，那么需要配置两个点：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 配置公共路径，否则会出现资源找不到的问题</span>
  base<span class="token operator">:</span> <span class="token string">&quot;/website&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 路由配置</span>

<span class="token comment">// 配置路由根路径，否则路由跳转后浏览器上显示的地址不包含服务器子目录</span>
<span class="token operator">&lt;</span>BrowserRouter basename<span class="token operator">=</span><span class="token string">&quot;/website&quot;</span><span class="token operator">&gt;</span>
	<span class="token operator">...</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>BrowserRouter<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="踩坑" tabindex="-1"><a class="header-anchor" href="#踩坑" aria-hidden="true">#</a> 踩坑</h2>`,30),m={href:"https://blog.csdn.net/u014165119/article/details/114241036",target:"_blank",rel:"noopener noreferrer"};function k(b,h){const a=o("ExternalLinkIcon");return i(),p("div",null,[n("blockquote",null,[n("p",null,[n("a",r,[s("Vite2"),e(a)]),s("、"),n("a",d,[s("React"),e(a)]),s("、"),n("a",u,[s("Antd"),e(a)])])]),v,n("p",null,[n("a",m,[s("Vite2 + React + Antd 踩坑指南"),e(a)])])])}const f=t(l,[["render",k],["__file","shiyong Vite2 goujian React _ Antd xiangmu.html.vue"]]);export{f as default};
