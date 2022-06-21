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

### 常见的Plugin有哪些？

- html-webpack-plugin：简化HTML文件创建
- webpack-bundle-analyzer：可视化Webpack的输出
- clean-webpack-plugin：可以用于构建前清理dist文件夹
- ignore-plugin：忽略部分文件

### 自定义Loader

编写`Loader`一般要遵循单一原则，每个`Loader`只做一种转义工作。每个`Loader`函数可以拿到源文件内容`source`，其中`this.query`能拿到`webpack.config.js`中的`options`，我们可以调用`this.callback()`方法返回处理结果，如果是想要异步操作就可以用`this.async()`

```javascript
// webpack.config.js module 代码片段
{
        test: /\.js/,
        use: [
            {
                loader: 'replaceLoader',
                options: {
                    name: "jack",
                },
            },
        ],
},
// 自定义 loader 代码片段
module.exports = function(source) {
	// 获取options
    const options = this.query;
    //调用this.async()这个API，来给异步代码使用
    const callback = this.async();
    setTimeout(() => {
        const result = source.replace('monday', options.name);
        callback(null, result);
    }, 5000);
}
```

### 自定义Plugin

对于自定义`Plugin`，主要的关键就是监听`Webpack`编译阶段中的事件，然后在这些生命周期钩子函数中去做需要去做的事情，在自己写的`Plugin`中的`apply`方法能接收到`compiler`实例，其中有`tap`和`call`，可以简单理解为`监听`和`触发`

```javascript
compiler.hooks.钩子函数.tap() // 监听
compiler.hooks.钩子函数.call() //触发
```

### source-map

- `source-map`是从`已转换的代码`映射到`原始的源文件`，如果浏览器支持的话，调试的时候能自动地将错误映射到源文件
- 代码中引入 `//# sourceMappingURL=xxx.js.map`启用
- `js`和`css`都可以有

### 文件指纹

- Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的`Hash `值就会更改，这一点其实不是很好，因为一旦一个文件发生了变化，所有的文件名字都会发生变化，起不到缓存的效果
- chunkHash：和`webpack`构建相应的`chunk`有关，不同的`entry`会生成不同的`chunkHash`值
- ContentHash：根据文件内容来定义`Hash`，文件内容不变，则`contentHash `不变

### Tree Shaking

> **Tree Shaking 只支持 ES Module的引入方式，不支持 Common JS 的引入方式**

#### 定义

用于移除`js`中的未引用代码，比如引用了其他模块的代码，但是没有使用，`Tree Shaking`可以将它移除掉。

#### 原理

`usedExports` 用于在`Webpack `编译过程中启动标记功能，它会将每个模块中没有被使用过的导出内容标记为 `unused`，当生成产物时，被标记的变量对应的导出语句会被删除

#### 如何使用

- 生产环境：默认使用`Tree shaking`

- 开发环境：

  ```javascript
  module.exports = {
    mode: 'development',
      // 重要
    optimization: {
      usedExports: true,
    }
  };
  ```

  

