import{_ as i,p as a,q as c,s as t,R as e,t as n,Y as o,n as l}from"./framework-a25df3d5.js";const r={},s=o('<p>两个月前为了方便编写 <code>Kotlin</code> 代码，下载了 <code>Android Studio 3.0</code> 预览版，撸代码、Build、安装、一切正常。到了提交代码的时候懵逼了，<code>Terminal</code> 中输入中文居然变成了 <code>Unicode</code> 编码，就像这样：</p><p><img src="https://upload-images.jianshu.io/upload_images/1837368-a3b87d659c999b36.png?imageMogr2/auto-orient/strip|imageView2/2/w/791/format/webp" alt="Terminal 中文异常"></p><p>然后拿 <code>Mac</code> 的 <code>Terminal</code> 试了一下，发现显示中文没有问题的，因此认为是 <code>Android Studio</code> 的问题，但是百度 Google 翻了几遍也没找到答案，后来也就不了了之，期待着 <code>Android Studio</code> 更新时可以解决该问题。</p><p>之后每次提交代码都是在编辑器中写好再黏贴进来，次数多了也是痛苦到原地爆炸。</p>',4),p={href:"https://q.cnblogs.com/q/78486/",target:"_blank",rel:"noopener noreferrer"},g=o('<p><img src="https://upload-images.jianshu.io/upload_images/1837368-a5c3222bb5074e11.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt="最佳答案"></p><p>本着要做就做最好的原则，肯定是修改 <code>~/.vimrc</code> 文件，遗憾的是，找遍了整个 <code>~/</code> 目录只有一个 <code>.viminfo</code> 文件，虽然文件名不一样，但是也不想放弃啊，打开文件看看，有这么两句：</p><p><img src="https://upload-images.jianshu.io/upload_images/1837368-f8cc588a437836aa.png?imageMogr2/auto-orient/strip|imageView2/2/w/708/format/webp" alt="encoding"></p><p>嗯？（黑人问号脸）<code>encoding</code> 是 <code>Latin1</code>？改成 <code>utf-8</code> ，<code>Terminal</code> 输入中文，/(ㄒoㄒ)/~~ 还是不正常，改回 <code>Latin1</code> 吧，省的出什么乱七八糟的问题。再次打开 <code>.viminfo</code>，<code>encoding</code> 不知道什么时候已经自动变回 <code>Latin1</code> 了（哭笑不得）。</p><p>继续观察 <code>~/</code> 目录，发现几个 <code>.zshxx</code> 文件，想到我电脑上安装了 <code>zsh</code> 代替了 <code>bash</code>，会不会与此有关呢？</p><p><img src="https://upload-images.jianshu.io/upload_images/1837368-4c97d6214c590710.png?imageMogr2/auto-orient/strip|imageView2/2/w/340/format/webp" alt=".zshxx"></p><p>怀着试试看的态度，打开 <code>.zshrc</code> 和 <code>.zshrc-e</code> 两个文件（因为它们的名字和 <code>.vimrc</code> 最像），观察文件内容，发现两个文件都有配置 <code>encoding</code> 的代码，但是被注释掉了。</p><p><img src="https://upload-images.jianshu.io/upload_images/1837368-8c55fe5d2a61697c.png?imageMogr2/auto-orient/strip|imageView2/2/w/812/format/webp" alt="被注释的 encoding"></p><p><code># You may need to manually set your language environment</code>，嗯，我确实需要修改语言环境，怀着试试看的态度，打开第二行的注释（就是删掉 # 号，你不会不知道吧），重启 <code>Android Studio</code> <code>Terminal</code> ，输入中文，一切都回归正常了。O(∩_∩)O哈哈~</p><p><img src="https://upload-images.jianshu.io/upload_images/1837368-22d6f6b08eed5a92.png?imageMogr2/auto-orient/strip|imageView2/2/w/625/format/webp" alt="Terminal 中文正常"></p><p><code>Mac</code> 显示隐藏文件的步骤：</p><ol><li><code>Terminal</code> 中执行命令：<code>defaults write com.apple.finder AppleShowAllFiles -bool true</code></li><li>长按 <code>option</code> 键的同时鼠标长点击 <code>Finder</code> 图标直到出现一个菜单，点击菜单中的“重新开启”即可。</li></ol><table><thead><tr><th>Tables</th><th style="text-align:center;">Are</th><th style="text-align:right;">Cool</th></tr></thead><tbody><tr><td>col 3 is</td><td style="text-align:center;">right-aligned</td><td style="text-align:right;">$1600</td></tr><tr><td>col 2 is</td><td style="text-align:center;">centered</td><td style="text-align:right;">$12</td></tr><tr><td>zebra stripes</td><td style="text-align:center;">are neat</td><td style="text-align:right;">$1</td></tr></tbody></table><table><thead><tr><th style="text-align:left;">文件</th><th style="text-align:left;">函数</th><th style="text-align:left;">漏洞</th><th style="text-align:left;">解决</th></tr></thead><tbody><tr><td style="text-align:left;">文件</td><td style="text-align:left;">函数</td><td style="text-align:left;">漏洞</td><td style="text-align:left;">解决</td></tr></tbody></table>',14);function m(h,u){const d=l("ExternalLinkIcon");return a(),c("div",null,[s,t("p",null,[e("今天偶然看到一个问答："),t("a",p,[e("mac终端中vim中文乱码问题"),n(d)]),e("，采用的最佳答案如下：")]),g])}const f=i(r,[["render",m],["__file","Mac Android Studio Terminal zhongwenxianshiyichang.html.vue"]]);export{f as default};
