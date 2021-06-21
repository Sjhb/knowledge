### 是什么

Puppeteer是一个node库，基于DevTools Protocol，提供一组high-level API来控制Chrome或者Chromium,默认使用无头浏览器，也可以设置为使用非无头浏览器

### 安装

1、npm i puppeteer，会下载一个chromium
2、npm i puppeteer-core 核心库

### 知识点

puppeteer能用来干什么
    1、爬虫，优势：可爬spa，劣势：chromium吃资源没，怎么爬？
    2、自动化测试，怎么做自动化测试：操作页面dom
    3、生成截图和pdf，服务端渲染服务、pdf生成等等
    4、其他功能，例如在论坛上发送文章
    5、SSR，怎么做：把页面渲染出来，通过page.content()获取到html，再返回，具体细节还是需要看场景
    6、测试浏览器拓展

puppeteer 原理
    基于DevTools Protocol，即调试协议，具体就是通过websocket连接node服务和无头浏览器，然后通过websocket会话消息进行通信