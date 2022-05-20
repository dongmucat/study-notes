## Vue面试

### Vue工作原理

首先当一个Vue实例被创建的时候，Vue会遍历data中的属性，通过`Observer`类来转换成`getter/setter`的形式来追踪变化，当外界通过`Watcher`读取数据时，会触发`getter`从而`Dep`会将`Watcher`添加到依赖中，当数据发生了变化时候，会触发`setter`，从而向`Dep`中的依赖，也就是`Watcher`发送通知，`Watcher`接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新

### Vue双向数据绑定原理

#### 原理图

![](./imgs/Vue双向数据绑定原理.png)

#### 初始化阶段

- 第一个是数据监听，`Vue`会遍历`data`中的属性，通过`Observer`类来转换成`getter/setter`的形式来追踪变化
- 第二是页面渲染，`Compile`解析模板指令，将模板中的指令替换成数据，然后初始化视图，并订阅`Watcher`来更新视图，此时`Watcher`会将自己添加到`Dep`中

#### 数据更新阶段

当数据发生变化的时候，会触发`Obersever`的`setter`，从而`Dep`会调用`notify`方法遍历通知所有的`Watcher`，`Watcher`收到通知后，也会对视图进行相应的更新

### Vue模板编译原理(简)

> Vue需要将template转换成js的函数，这样浏览器可以执行这个函数并渲染出HTML元素。这个过程可以简要分为三个阶段：解析，优化，生成

- 解析阶段：使用大量的正则表达式对template字符串进行解析，转化成抽象语法树AST
- 优化阶段：遍历AST，找到一些静态节点，等到下一次重新渲染的时候直接跳过，优化性能
- 生成阶段：最终的AST转化成render

### Vue2生命周期

> 实际上有四个类，初始化，挂载，更新，摧毁

- beforeCreated：一个组件创建的开始，这个时候data、methods、computed、watch都不能用
- Created：组件实例已经完全创建，这个时候一般用于向后端获取数据
- beforeMount：表示当前虚拟DOM已经创建完成，但是还没有挂载
- mounted：表示挂载完成，此时可以访问到真实DOM
- beforeUpdate：组件数据更新之前调用， 此时页面中显示的数据还是旧的，但 data 是最新的，页面尚未和最新的数据保持同步
- update：组件数据更新之后，此时页面和data中的数据都已经保持了同步
- beforeDestroy：组件销毁前调用，此时实例上的数据都还保持正常使用
- destroyed：组件销毁后调用，此时实例上的东西都不能用了

### Vue3生命周期

> Vue3能兼容vue2的生命周期，但在写composition api的时候钩子的名字会发生一点变化

被替换

- beforeCreate -> setup()
- created -> setup()

重命名

- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> **onBeforeUnmount**
- destroyed -> **onUnmounted**

### v-model原理

实际上`v-model`是一个语法糖，他做了单向绑定数据`v-bind`和触发输入事件`input`

### 什么是MVVM？

#### 原理图

![](./imgs/MVVM.png)

#### 含义

- M：Model，对应数据层的模型
- V：View，对应视图UI模型
- VM：ViewModel，一个抽象层，可以将Model和View连接了起来，实现了通信

#### 优点

- 低耦合：View和Model都可以独立于对方的变化和修改
- 可复用性：一个ViewModel里面的视图逻辑可以让很多个View使用
- 独立开发：开发人员专注于ViewModel开发，设计人员可以专注于UI开发
- 方便测试：可以方便对ViewModel进行测试

### 什么是MVC？

#### 原理图

![](./imgs/MVC.png)

#### 含义

- M：Model，是应用程序中用于处理应用程序数据逻辑的部分
- V：View，是应用程序中处理数据显示的部分
- C：Controller，是应用程序中处理用户交互的部分，从View读取数据，向Model发送数据

#### 优点

- 低耦合性
- 可复用性高
- 部署快
- 可维护性高
- 有利于软件工程化

### computed与watch区别

- computed是计算属性，而watch用于监听属性发生变化
- computed不支持异步，而watch支持异步
- computed有缓存而watch没有缓存
- computed必须要有返回值且默认第一次就进行计算，watch可以没有返回值并且默认第一次加载不会做监听，除非加上immediate设置为true

### computed与methods区别

- computed是计算属性依赖于属性，而methods是函数，两者其实不同
- computed有缓存，多次使用只调用一次，而methods使用n次就会调用n次

### v-for中key

#### key的作用

v-for默认使用就地复用的策略，当列表数据修改的时候，vue会根据key来判断节点如何进行复用或者重新渲染，因此key主要用于提高渲染速度

#### 为什么不建议使用index

index不是唯一标识，因此会导致DOM渲染速度降低，而且会出现复用错误的情况。因此最好用唯一标识符做key

### v-if和v-show区别

- v-if会根据条件去渲染DOM，是惰性的；而v-show都会去渲染DOM，v-show只是简单的控制了一下css的display

- v-show更适合频繁切换的场景；v-if适合比较少的切换场景

### data为什么不是一个对象而是一个函数？

如果是对象的话，当组件复用的时候 ，指向的都是是一个内存地址 ， 当其中一个组件修改data的数据时 ， 其他的组件中的data数据也会被修改 。 如果是函数的话 , 每次生成的就是一个新的副本 ，那么就不会出现这个问题

### SPA和MPA的区别

- SPA是单页面应用，是一个主页面和多个组件组成，一开始只需要加载一次资源，所有的内容都包含在主页面，因此跳转就是切换对应的组件，速度很快，仅仅刷新局部资源。缺点就是首屏加载时间可能会长，还有不利于SEO
- MPA是多页面应用，由多个页面组成，每个页面必须重新重复地加载资源，因此跳转速度比较慢，体验可能会不好，优点是利于SEO