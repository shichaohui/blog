import{_ as n,o as s,c as a,a as e}from"./app.81ed69ec.js";const p={},t=e(`<blockquote><p><code>AIDL</code>(Android Interface Definition Language) \u662F\u4E00\u79CD <code>IDL</code> \u8BED\u8A00\uFF0C\u7528\u4E8E\u751F\u6210\u53EF\u4EE5\u5728 <code>Android</code> \u8BBE\u5907\u4E0A\u4E24\u4E2A\u8FDB\u7A0B\u4E4B\u95F4\u8FDB\u884C\u8FDB\u7A0B\u95F4\u901A\u4FE1\uFF08<code>IPC</code>\uFF09\u7684\u4EE3\u7801\u3002</p></blockquote><p><em>\u4EE5\u4E0B\u7684\u6587\u4EF6\u521B\u5EFA\u8FC7\u7A0B\u662F\u57FA\u4E8EAndroid Studio\u3002</em></p><h2 id="_1-\u521B\u5EFA-aidl-\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_1-\u521B\u5EFA-aidl-\u6587\u4EF6" aria-hidden="true">#</a> 1. \u521B\u5EFA.aidl \u6587\u4EF6</h2><p>\u8BE5\u6587\u4EF6\u7ED3\u6784\u7C7B\u4F3C\u4E0E <code>Java</code> \u4E2D\u7684\u63A5\u53E3\uFF0C\u5B9A\u4E49\u4E86\u53EF\u7528\u7684\u65B9\u6CD5\u548C\u6570\u636E\u7684\u63A5\u53E3\u3002</p><p>\u53F3\u952E\u70B9\u51FB\u7A0B\u5E8F\u5305 --&gt; <code>new</code> --&gt; <code>AIDL</code> --&gt; <code>AIDL File</code> \u521B\u5EFA <code>IMyAidlInterface.aidl</code> \u6587\u4EF6\uFF0C\u8FD9\u65F6<code> Android Studio</code> \u4F1A\u81EA\u52A8\u521B\u5EFA\u4E00\u4E2A\u548C <code>java</code> \u540C\u7EA7\u7684\u76EE\u5F55 <code>aidl</code>\uFF0C\u5E76\u5728\u6B64\u76EE\u5F55\u4E0B\u751F\u6210\u5305\u548C <code>.aidl</code> \u6587\u4EF6\u3002\u5982\u56FE\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/img_convert/2ccc3345299eb0fa87d62777e3a002d0.png" alt=".aidl\u6587\u4EF6\u6240\u5728\u76EE\u5F55\u7ED3\u6784"></p><p>\u73B0\u5728\u5B9A\u4E49\u4E00\u4E2A\u6C42\u548C\u7684\u65B9\u6CD5\uFF0C\u4FEE\u6539\u540E\u7684 <code>IMyAidlInterface</code> \u6587\u4EF6\u5982\u4E0B\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">IMyAidlInterface</span> <span class="token punctuation">{</span>

    <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u751F\u6210-aidl-\u6587\u4EF6\u5BF9\u5E94\u7684-java-\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-\u751F\u6210-aidl-\u6587\u4EF6\u5BF9\u5E94\u7684-java-\u6587\u4EF6" aria-hidden="true">#</a> 2. \u751F\u6210 .aidl \u6587\u4EF6\u5BF9\u5E94\u7684 .java \u6587\u4EF6</h2><p>\u901A\u8FC7 Build --&gt; Rebuild Project \u91CD\u65B0\u6784\u5EFA\u9879\u76EE\u751F\u6210.aidl\u6587\u4EF6\u5BF9\u5E94\u7684.java\u6587\u4EF6\uFF0C\u5982\u56FE\u6240\u793A\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/img_convert/7ca148e6c95ba037a144a466b95de00b.png" alt="\u5BF9\u5E94\u7684.java\u6587\u4EF6\u6240\u5728\u76EE\u5F55\u7ED3\u6784"></p><h2 id="_3-\u521B\u5EFA\u5171\u4EABservice" tabindex="-1"><a class="header-anchor" href="#_3-\u521B\u5EFA\u5171\u4EABservice" aria-hidden="true">#</a> 3. \u521B\u5EFA\u5171\u4EABService</h2><p>\u521B\u5EFA\u4E00\u4E2A <code>Service</code> \u7528\u4E8E\u548C\u5176\u4ED6\u8FDB\u7A0B\u5171\u4EAB\u6570\u636E\u548C\u65B9\u6CD5</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">Intent</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>os<span class="token punctuation">.</span></span><span class="token class-name">IBinder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>os<span class="token punctuation">.</span></span><span class="token class-name">RemoteException</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyService</span> <span class="token keyword">extends</span> <span class="token class-name">Service</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">MyService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">IBinder</span> <span class="token function">onBind</span><span class="token punctuation">(</span><span class="token class-name">Intent</span> intent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> mBinder<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">IMyAidlInterface<span class="token punctuation">.</span>Stub</span> mBinder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IMyAidlInterface<span class="token punctuation">.</span>Stub</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">RemoteException</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Stub</code> \u662F\u751F\u6210 <code>IMyAidlInterface.java</code> \u65F6\u81EA\u52A8\u751F\u6210\u7684\u4E00\u4E2A\u62BD\u8C61\u5185\u90E8\u7C7B\uFF0C\u7EE7\u627F\u81EA <code>Binder</code>\u3002</p><p>\u7531\u4E8E\u5728\u5176\u4ED6\u8FDB\u7A0B\u4E2D\u5E76\u4E0D\u80FD\u77E5\u9053\u8FD9\u4E2A <code>Service</code> \u7684\u540D\u5B57\uFF0C\u6240\u4EE5\u542F\u52A8\u8FD9\u4E2A <code>Service</code> \u7684\u65F6\u5019\u9700\u8981\u4F7F\u7528\u9690\u5F0F\u7684 <code>Intent</code>\uFF0C\u56E0\u6B64\u9700\u8981\u7ED9 <code>Service</code> \u6DFB\u52A0\u8FC7\u6EE4\u5668\uFF1A</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>service</span>
    <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>.MyService<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>enabled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>exported</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>intent-filter</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>action</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.mm.action.aidl<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>intent-filter</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>service</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u5728\u542F\u52A8 <code>Service</code> \u7684\u65F6\u5019\u4F7F\u7528 <code>com.mm.action.aidl</code> \u4F5C\u4E3A <code>Action</code> \u5373\u53EF\u3002</p><h2 id="_4-\u542F\u52A8\u5171\u4EAB-service" tabindex="-1"><a class="header-anchor" href="#_4-\u542F\u52A8\u5171\u4EAB-service" aria-hidden="true">#</a> 4. \u542F\u52A8\u5171\u4EAB Service</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">ServiceConnection</span> connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServiceConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onServiceConnected</span><span class="token punctuation">(</span><span class="token class-name">ComponentName</span> name<span class="token punctuation">,</span> <span class="token class-name">IBinder</span> service<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u83B7\u53D6\u5B9A\u4E49\u7684\u63A5\u53E3</span>
        <span class="token class-name">IMyAidlInterface</span> aidlInterface <span class="token operator">=</span> <span class="token class-name">IMyAidlInterface<span class="token punctuation">.</span>Stub</span><span class="token punctuation">.</span><span class="token function">asInterface</span><span class="token punctuation">(</span>service<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u8C03\u7528\u63A5\u53E3\u4E2D\u7684\u65B9\u6CD5</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>aidlInterface<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">RemoteException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onServiceDisconnected</span><span class="token punctuation">(</span><span class="token class-name">ComponentName</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// \u4F7F\u7528bindService\u542F\u52A8Service</span>
<span class="token function">bindService</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Intent</span><span class="token punctuation">(</span><span class="token string">&quot;com.mm.action.aidl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> connection<span class="token punctuation">,</span> BIND_AUTO_CREATE<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6709\u4E86\u4EE5\u4E0A\u7684\u8FD9\u4E9B\u914D\u7F6E\uFF0C\u5C31\u80FD\u5148\u8FD0\u884C\u5F53\u524D\u9879\u76EE\u6D4B\u8BD5\u4E00\u4E0B\u4E86\uFF0C\u5982\u679C\u80FD\u6B63\u786E\u6253\u5370\u6570\u5B57\u7684\u548C\uFF0C\u5219\u4EE5\u4E0A\u914D\u7F6E\u5C31\u6CA1\u6709\u95EE\u9898\u4E86\u3002</p><h2 id="_5-\u5728\u5176\u4ED6\u9879\u76EE\u4E2D\u5171\u4EAB-service" tabindex="-1"><a class="header-anchor" href="#_5-\u5728\u5176\u4ED6\u9879\u76EE\u4E2D\u5171\u4EAB-service" aria-hidden="true">#</a> 5. \u5728\u5176\u4ED6\u9879\u76EE\u4E2D\u5171\u4EAB Service</h2><p>\u65B0\u5EFA\u4E00\u4E2A\u9879\u76EE\uFF0C\u62F7\u8D1D\u4E0A\u9762\u7684 <code>.aidl</code> \u6587\u4EF6\u5230\u9879\u76EE\u7684\u540C\u540D\u76EE\u5F55\u4E0B\uFF0C\u7136\u540E <code>Rebuild</code> \u4E00\u4E0B\u751F\u6210\u5BF9\u5E94\u7684 <code>.java</code> \u6587\u4EF6\uFF0C\u7136\u540E\u6839\u636E\u4E0A\u9762\u542F\u52A8 <code>Service</code> \u7684\u65B9\u6CD5\u542F\u52A8\u5373\u53EF\u3002\u53D1\u5E03\u5E94\u7528\u65F6\uFF0C\u5171\u4EAB <code>Service</code> \u7684APK\u8981\u4F7F\u7528\u540C\u4E00\u4E2A\u7B7E\u540D\uFF0C\u5426\u5219\u65E0\u6CD5\u6B63\u5E38\u5171\u4EAB\u3002</p><h2 id="_6-\u4F20\u9012\u590D\u6742\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#_6-\u4F20\u9012\u590D\u6742\u5BF9\u8C61" aria-hidden="true">#</a> 6. \u4F20\u9012\u590D\u6742\u5BF9\u8C61</h2><h3 id="_6-1" tabindex="-1"><a class="header-anchor" href="#_6-1" aria-hidden="true">#</a> 6.1</h3><p>\u4F7F\u7528 <code>AIDL</code> \u53EF\u4EE5\u76F4\u63A5\u4F20\u9012\u57FA\u672C\u6570\u636E\u7C7B\u578B\uFF08<code>int</code> <code>long</code> <code>float</code> <code>double</code>\uFF09\u3001<code>String</code>\u3001<code>List</code> \u548C <code>Map</code>\uFF0C\u5982\u679C\u8981\u4F20\u9012\u590D\u6742\u5BF9\u8C61\uFF0C\u9700\u8981\u4F7F\u8BE5\u5BF9\u8C61\u5B9E\u73B0 <code>Parcelable</code> \u63A5\u53E3\uFF0C\u5E76\u521B\u5EFA\u540C\u540D\u7684 <code>.aidl</code> \u6587\u4EF6\u3002</p><p>\u73B0\u5728\u6211\u4EEC\u521B\u5EFA <code>Person.aidl</code> \u548C <code>Person.java</code></p><h4 id="person-aidl" tabindex="-1"><a class="header-anchor" href="#person-aidl" aria-hidden="true">#</a> Person.aidl\uFF1A</h4><div class="language-aidl ext-aidl line-numbers-mode"><pre class="language-aidl"><code>package ***;

parcelable Person;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="person-java" tabindex="-1"><a class="header-anchor" href="#person-java" aria-hidden="true">#</a> Person.java \uFF1A</h4><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>os<span class="token punctuation">.</span></span><span class="token class-name">Parcel</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>os<span class="token punctuation">.</span></span><span class="token class-name">Parcelable</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * Created by shichaohui on 15/11/4.
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token keyword">implements</span> <span class="token class-name">Parcelable</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">describeContents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">writeToParcel</span><span class="token punctuation">(</span><span class="token class-name">Parcel</span> dest<span class="token punctuation">,</span> <span class="token keyword">int</span> flags<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dest<span class="token punctuation">.</span><span class="token function">writeString</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">Parcel</span> in<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">readString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Creator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span> CREATOR <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Creator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">Person</span> <span class="token function">createFromParcel</span><span class="token punctuation">(</span><span class="token class-name">Parcel</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">newArray</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2" tabindex="-1"><a class="header-anchor" href="#_6-2" aria-hidden="true">#</a> 6.2</h3><p>\u4FEE\u6539 <code>IMyAidlInterface.aidl</code>\uFF0C\u6DFB\u52A0\u4E00\u4E2A\u83B7\u53D6 <code>Person</code> \u7684\u65B9\u6CD5\uFF0C\u4FEE\u6539\u540E\u7684 <code>IMyAidlInterface.aidl</code> \u6587\u4EF6\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">com<span class="token punctuation">.</span></span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">.</span>androidtest<span class="token punctuation">.</span>Person<span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">IMyAidlInterface</span> <span class="token punctuation">{</span>

    <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Person</span> <span class="token function">getPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u4E00\u5B9A\u8981\u8BB0\u5F97 <code>import Person.java</code> \u6240\u5728\u7684\u5305\uFF0C\u4E0D\u7136\u4F1A\u6784\u5EFA\u5931\u8D25\u3002</p><h3 id="_6-3" tabindex="-1"><a class="header-anchor" href="#_6-3" aria-hidden="true">#</a> 6.3</h3><p>\u4FEE\u6539 <code>MyService</code>\uFF0C\u5B9E\u73B0 <code>getPerson()</code> \u65B9\u6CD5\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyService</span> <span class="token keyword">extends</span> <span class="token class-name">Service</span> <span class="token punctuation">{</span>

    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

    <span class="token class-name">IMyAidlInterface<span class="token punctuation">.</span>Stub</span> mBinder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IMyAidlInterface<span class="token punctuation">.</span>Stub</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

       <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token class-name">Person</span> <span class="token function">getPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">RemoteException</span> <span class="token punctuation">{</span>
            <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            person<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;nammmmme&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> person<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u540E\u5C31\u53EF\u4EE5\u548C\u4F7F\u7528 <code>sum()</code> \u65B9\u6CD5\u4E00\u6837\u4F7F\u7528 <code>getPerson()</code> \u65B9\u6CD5\u4E86\u3002</p>`,39),c=[t];function o(i,l){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","Android \u4F7F\u7528 AIDL \u5B9E\u73B0\u8FDB\u7A0B\u95F4\u901A\u4FE1.html.vue"]]);export{d as default};
