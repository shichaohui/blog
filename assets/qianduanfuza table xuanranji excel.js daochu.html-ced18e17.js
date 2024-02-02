import{_ as l,p as i,q as o,s as n,R as s,t as e,Y as t,n as p}from"./framework-a25df3d5.js";const c={},u={href:"https://shichaohui.github.io/",target:"_blank",rel:"noopener noreferrer"},r=n("p",null,"现在我们有一个如图（甚至更复杂）的表格需要展示到页面上，并提供下载为 excel 文件的功能。",-1),d={href:"https://imgse.com/i/pill3nI",target:"_blank",rel:"noopener noreferrer"},v=n("img",{src:"https://z1.ax1x.com/2023/11/06/pill3nI.png",alt:"效果图.png"},null,-1),k={href:"https://element-plus.org/zh-CN/component/table.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/exceljs/exceljs",target:"_blank",rel:"noopener noreferrer"},b={href:"https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/exceljs/exceljs",target:"_blank",rel:"noopener noreferrer"},h=t(`<h2 id="功能列表" tabindex="-1"><a class="header-anchor" href="#功能列表" aria-hidden="true">#</a> 功能列表</h2><ul><li>单元格展示文字</li><li>单元格文字尺寸</li><li>单元格文字是否加粗</li><li>单元格文字颜色</li><li>单元格水平对齐方式</li><li>单元格自定义展示内容（复杂样式、图片等）</li><li>单元格合并</li><li>指定行高</li><li>单元格背景色</li><li>是否展示单元格对角线</li><li>是否展示边框</li></ul><h2 id="定义单元格数据结构" tabindex="-1"><a class="header-anchor" href="#定义单元格数据结构" aria-hidden="true">#</a> 定义单元格数据结构</h2><p>首先我们需要定义单元格和表格行的数据结构。</p><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>/**
 * 表格单元格配置
 */
export interface TableCell {
  /** 展示文案 */
  text?: string;
  /** 文字尺寸，默认 14 */
  fontSize?: number;
  /** 文字是否加粗 */
  bold?: boolean;
  /** 文字颜色，默认 #000000 */
  color?: string;
  /** 水平对齐方式，默认 center */
  align?: &quot;left&quot; | &quot;center&quot; | &quot;right&quot;;
  /** 所占行数，默认 1 */
  rowspan?: number;
  /** 所占列数，默认 1 */
  colspan?: number;
  /** 高度，若一行中有多个单元格设置高度，将使用其中的最大值 */
  height?: number;
  /** 背景颜色 */
  bgColor?: string;
  /** 是否绘制对角线 */
  diagonal?: boolean;
  /** 是否绘制边框，默认 true */
  border?: (&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;)[];
  /** 动态属性 */
  [key: string]: any;
}

/**
 * 表格行。undefined 标识被合并的单元格
 */
export type TableRow = (TableCell | undefined)[];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>TableCell</code> 表示一个单元格，定义了单元格的基本配置，如展示文案、对齐方式、单元格合并、颜色、字体大小、边框等，可根据实际需求进行扩展。</p><p><code>TableRow</code> 是由多个单元格组成的表格行，<code>undefined</code> 用于标识被合并的单元格。</p><h2 id="表格渲染" tabindex="-1"><a class="header-anchor" href="#表格渲染" aria-hidden="true">#</a> 表格渲染</h2><p>基于如上表格单元格和行的定义，我们可以编写一个组件用于渲染表格。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>custom_table<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>colgroup</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>col</span>
          <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(width, index) in colWidthList<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>index<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ width: \`\${width}px\` }<span class="token punctuation">&quot;</span></span>
        <span class="token punctuation">/&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>colgroup</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span>
        <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(row, rowIndex) in data<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>rowIndex<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ height: calcRowHeight(row) }<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span>
          <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(cell, colIndex) in row.filter((item) =&gt; !!item)<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>colIndex<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[
            &#39;table-cell&#39;,
            ...getCellBorderClass(cell),
            { &#39;table-cell--diagonal&#39;: cell?.diagonal },
          ]<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
            fontSize: \`\${cell?.fontSize || 14}px\`,
            fontWeight: cell?.bold ? &#39;bold&#39; : &#39;initial&#39;,
            color: cell?.color || &#39;#000000&#39;,
            textAlign: cell?.align || &#39;center&#39;,
            background: cell?.bgColor || &#39;#ffffff&#39;,
            ...cellStyle?.(cell),
          }<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">:rowspan</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cell?.rowspan<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">:colspan</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cell?.colspan<span class="token punctuation">&quot;</span></span>
        <span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cell<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:cell</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>cell<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ cell?.text }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> computed<span class="token punctuation">,</span> CSSProperties <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> TableCell<span class="token punctuation">,</span> TableRow <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/utils/excel-helper&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Props</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** 表格数据 */</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> TableRow<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token doc-comment comment">/** 表格列宽。number[] 精确指定每列的宽度；number 表示所有列统一使用指定宽度 */</span>
  colWidth<span class="token operator">?</span><span class="token operator">:</span> number <span class="token operator">|</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token doc-comment comment">/** 自定义指定单元格的样式 */</span>
  cellStyle<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">cell<span class="token operator">?</span><span class="token operator">:</span> TableCell</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> CSSProperties<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">withDefaults</span><span class="token punctuation">(</span>defineProps<span class="token operator">&lt;</span>Props<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Slots</span> <span class="token punctuation">{</span>
  cell<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> cell<span class="token operator">?</span><span class="token operator">:</span> TableCell <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

defineSlots<span class="token operator">&lt;</span>Slots<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 列宽</span>
<span class="token keyword">const</span> colWidthList <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>props<span class="token punctuation">.</span>colWidth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>colWidth<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> props<span class="token punctuation">.</span>colWidth<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">?.</span>length<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>colWidth<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 计算行高</span>
<span class="token keyword">const</span> <span class="token function-variable function">calcRowHeight</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">row</span><span class="token operator">:</span> TableRow</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> heightList <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token operator">?.</span>height <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> <span class="token operator">...</span>heightList<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 获取边框样式</span>
<span class="token keyword">const</span> <span class="token function-variable function">getCellBorderClass</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">cell<span class="token operator">?</span><span class="token operator">:</span> TableCell</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> border <span class="token operator">=</span> cell<span class="token operator">?.</span>border <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token string">&quot;top&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;right&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;bottom&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;left&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> border<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">table-cell--border-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.custom_table</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> fit-content<span class="token punctuation">;</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> -webkit-fill-available<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>

  <span class="token selector">table</span> <span class="token punctuation">{</span>
    <span class="token property">flex-shrink</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">border-collapse</span><span class="token punctuation">:</span> collapse<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">td</span> <span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 8px 6px 6px<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">white-space</span><span class="token punctuation">:</span> break-spaces<span class="token punctuation">;</span>
    <span class="token property">word-break</span><span class="token punctuation">:</span> break-all<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.table-cell</span> <span class="token punctuation">{</span>
    <span class="token selector">&amp;--border-top</span> <span class="token punctuation">{</span>
      <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid #606266<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">&amp;--border-right</span> <span class="token punctuation">{</span>
      <span class="token property">border-right</span><span class="token punctuation">:</span> 1px solid #606266<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">&amp;--border-bottom</span> <span class="token punctuation">{</span>
      <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid #606266<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">&amp;--border-left</span> <span class="token punctuation">{</span>
      <span class="token property">border-left</span><span class="token punctuation">:</span> 1px solid #606266<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">&amp;--diagonal</span> <span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>

      <span class="token selector">&amp;::before</span> <span class="token punctuation">{</span>
        <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
        <span class="token property">inset</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=<span class="token punctuation">)</span></span>
          no-repeat 100% center <span class="token important">!important</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该组件接收表格数据（data）、表格列宽（colWidth）、自定义指定单元格样式的回调函数（cellStyle）等参数。</p><p>该组件对外公开名为 cell 的插槽，可自定义单元格的渲染内容。</p><h2 id="生成-excel-文件" tabindex="-1"><a class="header-anchor" href="#生成-excel-文件" aria-hidden="true">#</a> 生成 excel 文件</h2>`,13),x={href:"https://github.com/exceljs/exceljs",target:"_blank",rel:"noopener noreferrer"},f={id:"安装-exceljs",tabindex:"-1"},q=n("a",{class:"header-anchor",href:"#安装-exceljs","aria-hidden":"true"},"#",-1),w={href:"https://github.com/exceljs/exceljs",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> exceljs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="根据表格配置生成-excel-文件" tabindex="-1"><a class="header-anchor" href="#根据表格配置生成-excel-文件" aria-hidden="true">#</a> 根据表格配置生成 excel 文件</h3><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>import ExcelJS, { Workbook, Worksheet } from &quot;exceljs&quot;;

/**
 * 生成 excel 文件
 */
export async function generateExcel(
  rowList: TableRow[],
  colWidth: number | number[] = []
): Promise&lt;ExcelJS.Workbook&gt; {
  // 创建表
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(&quot;Sheet1&quot;);
  // 插入表头和数据
  rowList.forEach((row) =&gt;
    worksheet.addRow(row.map((cell) =&gt; cell?.text || &quot;&quot;))
  );
  // 合并单元格
  rowList.forEach((rowItem, rowIndex) =&gt; {
    rowItem.forEach((cellItem, colIndex) =&gt; {
      if (!cellItem) {
        return;
      }
      const colNoStart = convertColumnNo(colIndex);
      const colNoEnd = convertColumnNo(colIndex + (cellItem.colspan || 1) - 1);
      const rowNoStart = rowIndex + 1;
      const rowNoEnd = rowNoStart + (cellItem.rowspan || 1) - 1;
      worksheet.mergeCells(\`\${colNoStart}\${rowNoStart}:\${colNoEnd}\${rowNoEnd}\`);
    });
  });
  // 设置列宽
  let colWidthList: number[];
  if (Array.isArray(colWidth)) {
    colWidthList = colWidth;
  } else {
    colWidthList = new Array(rowList[0].length).fill(colWidth);
  }
  colWidthList.forEach((width, index) =&gt; {
    worksheet.getColumn(index + 1).width = width / 7.8;
  });
  // 设置默认行高
  worksheet.properties.defaultRowHeight = 28;
  // 设置单元格样式
  rowList.forEach((rowItem, rowIndex) =&gt; {
    const row = worksheet.getRow(rowIndex + 1);
    let maxHeight = worksheet.properties.defaultRowHeight;
    rowItem.forEach((cellItem, colIndex) =&gt; {
      if (!cellItem) {
        return;
      }
      const cell = row.getCell(colIndex + 1);
      maxHeight = Math.max(maxHeight, cellItem.height || 0);
      // 文字样式
      cell.font = {
        name: &quot;等线&quot;,
        size: ((cellItem.fontSize || 14) * 11) / 14, // Excel 字体大小为 11
        bold: cellItem.bold,
        color: { argb: (cellItem.color || &quot;#000000&quot;).slice(1) },
      };
      const border = cellItem?.border || [&quot;top&quot;, &quot;right&quot;, &quot;bottom&quot;, &quot;left&quot;];
      // 设置边框
      cell.border = {
        top: border.includes(&quot;top&quot;) ? { style: &quot;thin&quot; } : undefined,
        right: border.includes(&quot;right&quot;) ? { style: &quot;thin&quot; } : undefined,
        bottom: border.includes(&quot;bottom&quot;) ? { style: &quot;thin&quot; } : undefined,
        left: border.includes(&quot;left&quot;) ? { style: &quot;thin&quot; } : undefined,
        diagonal: { up: false, down: cellItem?.diagonal, style: &quot;thin&quot; },
      };
      // 设置居中&amp;自动换行
      cell.alignment = {
        horizontal: cellItem.align || &quot;center&quot;,
        vertical: &quot;middle&quot;,
        wrapText: true,
      };
      // 设置背景
      if (cellItem.bgColor) {
        cell.fill = {
          type: &quot;pattern&quot;,
          pattern: &quot;solid&quot;,
          fgColor: { argb: cellItem.bgColor.slice(1) },
        };
      }
    });
    row.height = maxHeight;
  });
  return workbook;
}

/**
 * 转换数字列号为字母列号
 * @param num
 */
function convertColumnNo(num: number) {
  const codeA = &quot;A&quot;.charCodeAt(0);
  const codeZ = &quot;Z&quot;.charCodeAt(0);
  const length = codeZ - codeA + 1;
  let result = &quot;&quot;;
  while (num &gt;= 0) {
    result = String.fromCharCode((num % length) + codeA) + result;
    num = Math.floor(num / length) - 1;
  }
  return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用 <code>generateExcel</code> 函数传入表格配置即可生成一个 excel 工作簿对象 <code>ExcelJS.Workbook</code>。</p><h3 id="下载-excel-文件" tabindex="-1"><a class="header-anchor" href="#下载-excel-文件" aria-hidden="true">#</a> 下载 excel 文件</h3><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>/**
 * 下载为 excel 文件
 * @param workbook excel 工作簿对象
 * @param fileName 文件名
 */
export async function downloadExcel(workbook: ExcelJS.Workbook, fileName: string) {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: &quot;arraybuffer&quot; });
  const link = document.createElement(&quot;a&quot;);
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用 <code>downloadExcel</code> 函数传入 <code>ExcelJS.Workbook</code> 对象和文件名即可下载为 excel 文件。</p><h3 id="图片等内容处理" tabindex="-1"><a class="header-anchor" href="#图片等内容处理" aria-hidden="true">#</a> 图片等内容处理</h3><p>当前 <code>generateExcel</code> 函数并未处理图片等复杂内容。</p><p>由于这些内容具有不确定性，因此，我们定义一个专门处理这些内容的回调函数。</p><p><strong>函数声明</strong></p><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>/**
 * 渲染图片等非普通文本的数据
 */
export type RenderAdditionalData = (
  /** 行号 */
  rowIndex: number,
  /** 列号 */
  colIndex: number,
  /** excel 工作簿对象 */
  workbook: ExcelJS.Workbook,
  /** excel 工作表对象 */
  worksheet: ExcelJS.Worksheet
) =&gt; Promise&lt;void&gt; | void;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将图片等内容的处理插入到 <code>generateExcel</code> 函数：</p><div class="language-TypeScript line-numbers-mode" data-ext="TypeScript"><pre class="language-TypeScript"><code>async function generateExcel(
  rowList: TableRow[],
  colWidth: number | number[] = [],
  renderAdditionalData?: RenderAdditionalData
): Promise&lt;ExcelJS.Workbook&gt; {
  ...
  // 合并单元格
  rowList.forEach((rowItem, rowIndex) =&gt; {
    ...
  });

  // 渲染图片等非普通文本的数据
  if(renderAdditionalData) {
    for (let rowIndex = 0; rowIndex &lt; rowList.length; rowIndex++) {
      const rowItem = rowList[rowIndex];
      for (let colIndex = 0; colIndex &lt; rowItem.length; colIndex++) {
        if (!rowItem[colIndex]) {
          continue;
        }
        await renderAdditionalData(rowIndex, colIndex, workbook, worksheet);
      }
    }
  }

  // 设置默认行高
  worksheet.properties.defaultRowHeight = 28;
  ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),I={href:"https://github.com/exceljs/exceljs",target:"_blank",rel:"noopener noreferrer"},_=n("p",null,"至此，即可完成复杂 excel 表格的渲染和导出。",-1);function S(E,C){const a=p("ExternalLinkIcon");return i(),o("div",null,[n("blockquote",null,[n("p",null,[n("small",null,[s("转载请注明出处，"),n("a",u,[s("点击此处"),e(a)]),s(" 查看更多精彩内容")])])]),r,n("p",null,[n("a",d,[v,e(a)])]),n("p",null,[s("前端表格渲染我们一般会使用 "),n("a",k,[s("element-ui"),e(a)]),s(" 等组件库提供的 table 组件，这些组件一般都是以列的维度进行渲染，而我们使用的 excel 生成工具（如 "),n("a",m,[s("exceljs"),e(a)]),s("）却是以行的维度进行生成，这就导致页面渲染和 excel 生成的数据结构无法匹配。")]),n("p",null,[s("为了解决这个问题，达到使用一套代码兼容页面渲染和 excel 生成的目的，我们需要统一使以行的维度进行数据的组织，然后分别使用原生 "),n("a",b,[s("table"),e(a)]),s(" 元素和 "),n("a",g,[s("exceljs"),e(a)]),s(" 进行页面渲染和 excel 文件生成。")]),h,n("p",null,[s("我们通过 "),n("a",x,[s("exceljs"),e(a)]),s(" 完成 excel 文件的生成。")]),n("h3",f,[q,s(" 安装 "),n("a",w,[s("exceljs"),e(a)])]),y,n("p",null,[n("a",I,[s("exceljs"),e(a)]),s(" 对图片的渲染请查询官方文档。")]),_])}const T=l(c,[["render",S],["__file","qianduanfuza table xuanranji excel.js daochu.html.vue"]]);export{T as default};
