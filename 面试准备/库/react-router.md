### hashRouter
基于浏览器URL的hash部分实现，实现原理：
    - 通过浏览器的前进后退按钮，或者是window.location.hash，或者是标签改变浏览器hash
    - 浏览器hash发生更新都会触发hashchange事件，通过监听此事件条件渲染组件

### historyRouter
基于浏览器History对象实现，实现原理
    - 通过history的pushState和replaceState可以改变浏览器URL，同时不会触发页面刷新
    - history 还提供了go,forword，back等方法，实现前进、后退
    - 浏览器默认的前进后退按钮以及history的go,forword，back等方法会触发window.onpopstate事件，而pushState和replaceState方法不会触发
    - 通过监听onpopstate 以及 拦截pushState/replaceState的调用和a标签的点击事件来检测URL变化

### 比较

> hash路由优缺点

优点
- 实现简单，兼容性好（兼容到ie8）
- 绝大多数前端框架均提供了给予hash的路由实现
- 不需要服务器端进行任何设置和开发
- 除了资源加载和ajax请求以外，不会发起其他请求

缺点
- 对于部分需要重定向的操作，后端无法获取hash部分内容，导致后台无法取得url中的数据，典型的例子就是微信公众号的oauth验证
- 服务器端无法准确跟踪前端路由信息
- 对于需要锚点功能的需求会与目前路由机制冲突

> History(browser)路由 优缺点

优点
- 对于重定向过程中不会丢失url中的参数。后端可以拿到这部分数据
- 绝大多数前段框架均提供了browser的路由实现
- 后端可以准确跟踪路由信息
- 可以使用history.state来获取当前url对应的状态信息
缺点

- 兼容性不如hash路由(只兼容到IE10)
- 需要后端支持，每次返回html文档
- 实现较复杂

### React-router实现

- 监听路由变化，使用context传递路由信息，对应组件Router组件，Route组件必须被Router组件包裹
- Route组件根据传入的context判断内容是否显示