import{_ as n,o as s,c as e,a}from"./app.7761d003.js";const t={},i=a(`<h2 id="process-is-not-defined" tabindex="-1"><a class="header-anchor" href="#process-is-not-defined" aria-hidden="true">#</a> process is not defined</h2><p><strong>\u62A5\u9519\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Uncaught ReferenceError: process is not defined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u89E3\u51B3\u65B9\u6848\uFF1A</strong></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// \u4F7F\u7528 i<wbr>mport.meta.env \u66FF\u6362 p<wbr>rocess.env</span>
process<span class="token punctuation">.</span>env <span class="token operator">--</span><span class="token operator">&gt;</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># .env</span>

<span class="token comment"># \u5B57\u6BB5\u540D\u5FC5\u987B\u4EE5 VITE_ \u5F00\u5934\uFF0C\u5426\u5219\u4E0D\u4F1A\u66B4\u9732\u5230 i<wbr>mport.meta.env \u4E2D</span>
VITE_APP_VERSION <span class="token operator">=</span> <span class="token string">&quot;1.0.0&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="property-env-does-not-exist-on-type-importmeta" tabindex="-1"><a class="header-anchor" href="#property-env-does-not-exist-on-type-importmeta" aria-hidden="true">#</a> Property &#39;env&#39; does not exist on type &#39;ImportMeta&#39;</h2><p><strong>\u62A5\u9519\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Property &#39;env&#39; does not exist on type &#39;ImportMeta&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u89E3\u51B3\u65B9\u6848\uFF1A</strong></p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code># tsconfig.json

<span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;vite/client&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    ...
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="interoprequiredefault-is-not-a-function" tabindex="-1"><a class="header-anchor" href="#interoprequiredefault-is-not-a-function" aria-hidden="true">#</a> _interopRequireDefault is not a function</h2><p><strong>\u62A5\u9519\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Uncaught TypeError: _interopRequireDefault is not a function
    at Form.js:24
    at chunk.2VCUNPV2.js?v=9e816b32:4
    at dep:antd_lib_form_Form:1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u89E3\u51B3\u65B9\u6848\uFF1A</strong></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// useForm \u4ECE\u9519\u8BEF\u7684\u5305\u5BFC\u5165\uFF0C\u5BFC\u81F4\u62A5\u9519</span>
<span class="token comment">// import { useForm } from &#39;antd/lib/form/Form&#39;</span>
<span class="token comment">// import { useForm } from &#39;antd/es/form/Form&#39;</span>
<span class="token comment">// const [form] = useForm()</span>

<span class="token comment">// \u901A\u8FC7 Form \u8C03\u7528\uFF0C\u4E0D\u4F1A\u51FA\u73B0\u5BFC\u5305\u9519\u8BEF\u7684\u95EE\u9898</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Form <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;antd&#39;</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span>form<span class="token punctuation">]</span> <span class="token operator">=</span> Form<span class="token punctuation">.</span><span class="token function">useForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="global-is-not-defined" tabindex="-1"><a class="header-anchor" href="#global-is-not-defined" aria-hidden="true">#</a> global is not defined</h2><p><strong>\u62A5\u9519\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Uncaught ReferenceError: global is not defined
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u89E3\u51B3\u65B9\u6848\uFF1A</strong></p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token comment">&lt;!-- index.html --&gt;</span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  ...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
      global <span class="token operator">=</span> globalThis
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    ...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),o=[i];function l(c,p){return s(),e("div",null,o)}const d=n(t,[["render",l],["__file","Vite2 + React + Antd \u8E29\u5751\u6307\u5357.html.vue"]]);export{d as default};
