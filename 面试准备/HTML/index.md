#### DOCTYPE

  <!DOCTYPE> 声明必须是 HTML 文档的第一行, 不是 HTML 标签，它是一条指令，告诉浏览器编写页面所用的标记的版本。HTML5中的!doctype是不区分大小写的。

  在 HTML 4.01 中，<!DOCTYPE> 声明引用 DTD，因为 HTML 4.01 基于 SGML。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容。

HTML5 不基于 SGML，所以不需要引用 DTD。

SGML: 标准通用标记语言（Standard Generalized Markup Language，SGML） 国际上定义电子文档和内容描述(超文本格式)的标准。E它源于1969年IBM公司开发的文档描述语言GML，GML主要用来解决不同系统中文档格式不同的问题。后经过多年发展，1986年经ISO批准为国际标准ISO8897，并被称为SGML。由于它的复杂，因而难以普及。https://wiki.mbalib.com/wiki/SGML

XML:   可扩展标记语言（英语：Extensible Markup Language，简称：XML），XML是SGML的一个子集，比SGML要简单，但是能实现SGML的大部分功能。历史：SGML复杂和学习成本高，而HTML, 1、不能解决所有解释数据的问题 - 像是影音档或化学公式、音乐符号等其他形态的内容；２、性能问题 - 需要下载整份文件，才能开始对文件做搜索；２、扩展性、弹性、易读性均不佳。

HTML:  HTML是SGML的一个实例，它的DTD作为标准被固定下来。

XHTML：可扩展超文本标记语言（英语：eXtensible HyperText Markup Language，XHTML），为了解决HTML语法要求松散的问题，它的语法要求更严格。从继承关系上讲，HTML是一种基于标准通用标记语言（SGML）的应用，是一种非常灵活的置标语言，而XHTML则基于可扩展标记语言（XML），XML是SGML的一个子集。

HTML5：如今的HTML5标准制定了两种实现语法HTML和XHTML。HTML不再基于任何特定的标记语言系统，它有自己完整的标准。而XHTML是XML的一个应用，XHTML5不需要DTD。

另外，当HTML5文档使用text/html MIME类型传输时，它将被Web浏览器是为HTML文档处理。当使用XML MIME类型，例如application/xhtml+xml传输时，它将被Web浏览器视为XML文档，由XML处理器进行分析。

历史
SGML——1986年国际标准化组织出版发布了一个信息管理方面的国际标准（ISO 8879:1986信息处理）。\
HTML 2.0——1995年11月作为RFC 1866发布\
XML 1.0——1998年，W3C发布了XML1.0规范，使用它来简化Internet的文档信息传输\
XHTML 1.0——2000年成为W3C的推荐标准\
HTML5——2014年，W3C宣布，该标准制定完成\

注意：HTML 1.0在1993年6月作为互联网工程工作小组（IETF）工作草案发布，并非标准。

####  meta标签

提供给页面的一些元信息（名称/值对)。

属性值：

- charset: 此特性声明当前文档所使用的字符编码，但该声明可以被任何一个元素的 lang 特性的值覆盖。与<meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">等效

- name：名称/值对中的名称。author、description、keywords、generator、revised、referrer、robots、viewport。 把 content 属性关联到一个名称。

- http-equiv：content-type、expires、refresh、set-cookie、content-security-policy、Strict-Transport-Security、等等。把content属性关联到http头部。同时存在name和http-equiv属性时，优先使用http-equiv

- content ： 名称/值对中的值， 可以是任何有效的字符串。 始终要和 name 属性或 http-equiv 属性一起使用

- scheme ： 用于指定要用来翻译属性值的方案

#### html 语义化

语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化），便于开发者阅读和写出更优雅的代码的同时，让浏览器的爬虫和机器很好的解析。

- 用正确的标签做正确的事情。

- 有利于SEO，有助于爬虫抓取更多的有效信息，爬虫是依赖于标签来确定上下文和各个关键字的权重。

- 语义化的HTML在没有CSS的情况下也能呈现较好的内容结构与代码结构

- 方便其他设备的解析

- 便于团队开发和维护

#### 浏览器架构

- 用户界面
- 主进程
- 内核(渲染进程)
    - 渲染引擎
    -JS 引擎
      -执行栈
    - 事件触发线程
      - 消息队列
        - 微任务
        - 宏任务
    - 网络异步线程
    - 定时器线程
- 第三方插件进程
- GPU进程

####  HTML5有哪些新特性，移除了哪些元素？如何处理HTML5新标签的浏览器兼容问题？

新特性：

(1)	用于绘画的canvas元素；\
(2)	用于媒介回放的video和audio元素；\
(3)	对本地离线存储有更好的支持，localStorage长期存储数据，浏览器关闭后数据不丢失；sessionStorage的数据在浏览器关闭后自动删除；\
(4)	语意化更好的内容元素，比如header,nav,section,article,footer；\
(5)	新的表单控件：calendar,date,time,email,url,search；\
(6)	新的技术webworker,websockt、Geolocation；\
(7) 不再基于SGML，不再基于任何特定的标记语言系统，它有自己完整的标准

移除元素：

(1) 纯表现的元素：basefont,big,center,font,s,strike,tt,u;
(2) 对可用性产生负面影响的元素：frame,frameset,noframes;

处理兼容性问题：

IE8/IE7/IE6支持document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签，浏览器支持新标签后，还需要添加标签默认的样式。

#### src href

它们之间的主要区别可以用这样一句话来概括：src用于替代这个元素，而href用于建立这个标签与外部资源之间的关系。

- src是指向外部资源的位置，指向的内容会嵌入到文档中当前标签所在的位置，在请求src资源时会将其指向的资源下载并应用到文档内，如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，知道将该资源加载、编译、执行完毕，所以一般js脚本会放在底部而不是头部。


- href是指网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。

#### css加载会造成阻塞吗

- css加载不会阻塞DOM树的解析
- css加载会阻塞DOM树的渲染
- css加载会阻塞后面js语句的执行、

因此，为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:

1. 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
2. 对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
3. 合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
4. 减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

原理\
浏览器渲染时，步骤为：１、HTML解析文件，生成DOM Tree，解析CSS文件生成CSSOM Tree，２、将Dom Tree和CSSOM Tree结合，生成Render Tree(渲染树)，３、根据Render Tree渲染绘制，将像素渲染到屏幕上。\
所以，DOM解析和CSS解析是两个并行的进程，所以这也解释了为什么CSS加载不会阻塞DOM的解析。然而，由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以他必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成(或者CSS资源加载失败)后，才能开始渲染。因此，CSS加载是会阻塞Dom的渲染的。
由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕。所以css会阻塞后面js的执行。

另外，　DOMContentLoaded与onLoad事件。DOMContentLoaded当页面的内容解析完成后，onLoad则触发该事件，等待页面的所有资源都加载完成才会触发，这些资源包括css、js、图片视频等。

如果页面中同时存在css和js，并且存在js在css后面，则DOMContentLoaded事件会在css加载完后才执行。
其他情况下，DOMContentLoaded都不会等待css加载，并且DOMContentLoaded事件也不会等待图片、视频等其他资源加载。

#### async defer

async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。多个async脚本是不能保证加载顺序的。==“下载完就执行”==，乱序执行

defer要等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行。多个defer脚本会按照它们在页面出现的顺序加载。==“渲染完再执行”==

#### 浏览器内多个标签页之间的通信

localstorge、cookie+setInterval、服务器、postmessage、BroadcastChannel

- postmessage: 缺点是只能与自己打开的页面完成通讯，应面相对较窄；但优点是在跨域场景中依然可以使用该方案。

- localstorge: API简单直观，兼容性好，除了跨域场景下需要配合其他方案，无其他缺点

- 和localStorage方案基本一致，额外需要初始化。和localStorage方案没特别区别，都是同域、API简单，BroadcastChannel方案兼容性差些（chrome > 58），但比localStorage方案生命周期短（不会持久化），相对干净些。

```javascript
// A.html
const channel = new BroadcastChannel('tabs')
channel.onmessage = evt => {
	// evt.data
}

// B.html
const channel = new BroadcastChannel('tabs')
channel.postMessage('hello')
```

- SharedWorker：SharedWorker本身并不是为了解决通讯需求的，它的设计初衷应该是类似总控，将一些通用逻辑放在SharedWorker中处理。不过因为也能实现通讯。

- Cookie: 轮询

- 服务器端

#### SVG 与 HTML5 的 canvas 各有什么优点

- canvas: 基于位图(像素)的图像,它不能够改变大小，只能缩放显示，提供2D绘制函数，是一种HTML元素类型，依赖于HTML，只能通过脚本绘制图形。更适合用来实现类似于Flash能做。

- svg: SVG是基于矢量,使用XML文档描述来绘图,很容易编辑

#### localStorage 存满了怎么办

结果：存不进去并报错（QuotaExceededError），存储收同源策略限制

解决办法：
1. 分业务而不是应用类型来做域名管理
2. 公用域名时，标记自己的业务数据，删除其他业务的数据
3. 使用IndexDB，存储上限非常大，但是要注意不要滥用

#### 行内元素和块级元素

块级元素\

- 每个块级元素默认占一行高度，一行内添加一个块级元素后无法一般无法添加其他元素（float浮动后除外）。两个块级元素连续编辑时，会在页面自动换行显示。块级元素一般可嵌套块级元素或行内元素
- 宽度是父元素的１００％
- 一般作为容器出现，用来组织结构，但并不全是如此
- 它可以容纳内联元素和其他块元素
- 常见的块状元素: h1,menu,p,div,ul,li,ol,form,table,等等

行内元素（内联元素）

- 一般都是基于语义级(semantic)的基本元素
- 只能容纳文本或其他内联元素，你要写块级元素在里面也不会报错
- 和其他元素都在一行上，一般横向排列，到最右端自动折行
- 高，高不可改变；
- 宽度就是它的文字或图片的宽度，不可改变
- 设置margin 只有左右margin有效，上下无效。
- 设置padding只有左右padding有效，上下则无效
- 常见的内联元素: a, span, b, strong,s,i,em,small,等等。

#### link,@import

- @import是 CSS 提供的语法规则，只有导入样式表的作用， link是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。
- 加载顺序区别,加载页面时，link标签引入的 CSS 被同时加载；@import引入的 CSS 将在页面加载完毕后被加载。
- 兼容性区别,@import是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link标签作为 HTML 元素，不存在兼容性问题。
- DOM可控性区别,可以通过 JS 操作 DOM ，插入link标签来改变样式；由于DOM方法是基于文档的，无法使用@import的方式插入样式。
- 权重区别:权重一直，看映入顺序

### CSS

#### px&em&rem

- px: 绝对长度单位。像素px是相对于显示器屏幕分辨率而言的。

- rem: 相对长度单位，依据ｈｔｍｌ根元素的font-size确定

- em: 相对长度单位，依据父元素的font-size确定

#### 盒子模型

在网页中，,一个元素占有空间的大小由几个部分构成，其中包括元素的内容（content），元素的内边距（padding），元素的边框（border），元素的外边距（margin）四个部分

### BFC

块级格式化上下文（block formatting context）: W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。

BFC 规定了内部的 Block Box 如何布局:

- 内部的 Box 会在垂直方向上一个接一个放置。
- Box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。
- 每个元素的 margin box 的左边，与包含块 border box 的左边相接触。
- BFC 的区域不会与 float box 重叠,文字环绕问题，给文字容器元素加上overflow:auto形成BFC,就不会有文字环绕问题了。
- BFC 是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
- 计算 BFC 的高度时，浮动元素也会参与计算。

除发条件

- 根元素
- overflow属性不为visible
- float属性不为none
- display属性为inline-block, table-cell, table-caption
- postion 属性为absolute或者fixed
- 弹性元素（display为flex或者inline-flex元素的直接子元素)
- 网格元素（display为 grid 或 inline-grid 元素的直接子元素）