import{_ as e,p as t,q as i,s as n,R as s,t as o,Y as l,n as r}from"./framework-a25df3d5.js";const c={},p={href:"https://shichaohui.github.io/",target:"_blank",rel:"noopener noreferrer"},d=l(`<h2 id="process-is-not-defined" tabindex="-1"><a class="header-anchor" href="#process-is-not-defined" aria-hidden="true">#</a> process is not defined</h2><p><strong>报错：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Uncaught ReferenceError: process is not defined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解决方案：</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 使用 i<wbr>mport.meta.env 替换 p<wbr>rocess.env</span>
process<span class="token punctuation">.</span>env <span class="token operator">--</span><span class="token operator">&gt;</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># .env</span>

<span class="token comment"># 字段名必须以 VITE_ 开头，否则不会暴露到 i<wbr>mport.meta.env 中</span>
VITE_APP_VERSION <span class="token operator">=</span> <span class="token string">&quot;1.0.0&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="property-env-does-not-exist-on-type-importmeta" tabindex="-1"><a class="header-anchor" href="#property-env-does-not-exist-on-type-importmeta" aria-hidden="true">#</a> Property &#39;env&#39; does not exist on type &#39;ImportMeta&#39;</h2><p><strong>报错：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Property &#39;env&#39; does not exist on type &#39;ImportMeta&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解决方案：</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># tsconfig.json

<span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;vite/client&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    ...
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="interoprequiredefault-is-not-a-function" tabindex="-1"><a class="header-anchor" href="#interoprequiredefault-is-not-a-function" aria-hidden="true">#</a> _interopRequireDefault is not a function</h2><p><strong>报错：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Uncaught TypeError: _interopRequireDefault is not a function
    at Form.js:24
    at chunk.2VCUNPV2.js?v=9e816b32:4
    at dep:antd_lib_form_Form:1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解决方案：</strong></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// useForm 从错误的包导入，导致报错</span>
<span class="token comment">// import { useForm } from &#39;antd/lib/form/Form&#39;</span>
<span class="token comment">// import { useForm } from &#39;antd/es/form/Form&#39;</span>
<span class="token comment">// const [form] = useForm()</span>

<span class="token comment">// 通过 Form 调用，不会出现导包错误的问题</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Form <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;antd&#39;</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span>form<span class="token punctuation">]</span> <span class="token operator">=</span> Form<span class="token punctuation">.</span><span class="token function">useForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="global-is-not-defined" tabindex="-1"><a class="header-anchor" href="#global-is-not-defined" aria-hidden="true">#</a> global is not defined</h2><p><strong>报错：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Uncaught ReferenceError: global is not defined
    at setImmediate.js:15
    at chunk.2VCUNPV2.js?v=e11687d4:4
    at editOnBeforeInput.js:25
    at chunk.2VCUNPV2.js?v=e11687d4:4
    at DraftEditorEditHandler.js:16
    at chunk.2VCUNPV2.js?v=e11687d4:4
    at DraftEditor.react.js:32
    at chunk.2VCUNPV2.js?v=e11687d4:4
    at Draft.js:24
    at chunk.2VCUNPV2.js?v=e11687d4:4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解决方案：</strong></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- index.html --&gt;</span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  ...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
      global <span class="token operator">=</span> globalThis
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    ...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21);function u(v,m){const a=r("ExternalLinkIcon");return t(),i("div",null,[n("blockquote",null,[n("p",null,[n("small",null,[s("转载请注明出处，"),n("a",p,[s("点击此处"),o(a)]),s(" 查看更多精彩内容")])])]),d])}const g=e(c,[["render",u],["__file","Vite2 _ React _ Antd caikangzhinan.html.vue"]]);export{g as default};
