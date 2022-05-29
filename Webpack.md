## Webpack面试

### Loader和Plugin的区别

- `Loader`本质是一个函数，在函数中对接收到的内容进行转换，然后返回转换后的结果。因为`Webpack`只认识`JavaScript`，所以`Loader`就相当于一个翻译官，对其他类型的资源进行转译处理工作
- `Plugin`就是插件，它可以扩展`webpack`的功能。在`Webpack`运行的生命周期会广播出许多事件，那么`Plugin`就可以监听这些事件，然后在合适的时机通过`Webpack`提供的`API`改变输出结果

### Webpack构建流程

- 初始化：启动构建，读取并且合并配置参数，然后加载 `Plugin`，实例化 `Compiler`
- 编译：从 `Entry `入口开始，针对每个`Module `串行调用对应的 `Loader `去翻译文件的内容，再找到该 `Module `依赖的 `Module`，递归地进行编译处理
- 输出：将编译后的 `Module `组合成 `Chunk`，将 `Chunk `转换成文件，输出到文件系统中

### 常见的Loader有哪些？

- babel-loader：把ES6转换成ES5
- css-loader：加载CSS
- style-loader：将CSS代码注入到JS中，通过DOM操作区加载CSS
- sass-loader：将SCSS/SASS代码转换成CSS
- less-loader：将less代码转换成CSS
- url-loader：是用来处理图片、文件等模块信息，而图片会转换成base64编码格式
- eslint-loader：用于检查JS代码
- vue-loader：用于加载vue组件