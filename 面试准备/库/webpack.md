参考：https://juejin.cn/post/6844903614469636103

后续都是基于该文章和爪哇课程作出的总结

#### 模块化规范
common.js, Es Module, AMD(Asynchronous module definition)异步的模块化规范，AMD需要一个符合AMD规范的加载器脚本
- common.js和AMD是居于语言上层的模块化规范，由运行环境定义，且，相互之间不能通用规范，例如浏览器环境无法使用Common.js,node无法使用AMD

#### webpack 原理

什么是打包？babel可以将高版本的js语法编译成低版本语法，保证代码能够运行，而打包工具的作用，就是将模块化的细节磨平，无论是AMD还是commonJS模块。经过打包后，都能直接运行在WEB或者nodeJs环境当中

webpack 具体打包过程：
1、初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2、开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3、确定入口：根据配置中的 entry 找出所有的入口文件；
4、编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5、完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6、输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7、输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

- 依赖树通过正则取出
- 模块作用域通过函数作用域实现
- 懒加载通过jsonp方式实现
- webpack会读取编译依赖树上的每一个文件（loader），并保存编译结果，最终根据chunk写入不同的文件

#### Compilation
- compiler和companation：
    - compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

    - compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用
- 插件是由「具有 apply 方法的 prototype 对象」所实例化出来的，apply方法传入compiler对象，通过compiler对象可以注册一些hooks事件回调
- weback在初始化阶段会执行一侧apply方法，这时候可以注册我们想要的回调事件

#### loader
- loader 就是一个方法，入参为source（源文件代码） ，返回转译后的代码，例如,json-loader,其`return `module.exports = \`${JSON.parse(source)}\`;`
- loader 通过loader-utils获取webpack配置在当前loader上的参数` loaderUtils.getOptions(this);`
- loader 可以通过调用this.callback返回数据，且此时必须return undefined，
```
this.callback(
    // 当无法转换原内容时，给 Webpack 返回一个 Error
    err: Error | null,
    // 原内容转换后的内容
    content: string | Buffer,
    // 用于把转换后的内容得出原内容的 Source Map，方便调试
    sourceMap?: SourceMap,
    // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
    // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
    abstractSyntaxTree?: AST
);
```