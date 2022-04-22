## Vue源码

### 变化侦测

#### Object的变化侦测

> Object.defineProperty() 来观测对象数据的读和写

##### Observer类

- 调用`defineReactive`递归将一个对象所有属性都转化成可观测的对象
- 在其构造函数中给`value`新增一个`__ob__`属性，指向该`value`的`Observer`实例，可以避免重复操作
- 只有`object`类型的数据才会调用`walk`将每一个属性转换成`getter/setter`的形式来侦测变化

##### Dep类

> 谁用到了数据，谁就是依赖(watcher)，Dep来就是管理这些依赖的管理工具。并且在get中收集依赖，在set中通知依赖更新

- 在构造函数中创建了`subs`数组，用来存放依赖
- 定义了几个实例方法用来对依赖进行添加，删除，通知等操作

##### Watcher类

> 谁用到了数据，谁就是依赖，我们就为谁创建一个watcher实例，在之后数据变化时，我们不直接去通知依赖更新，而是通知依赖对应的`Watch`实例，由`Watcher`实例去通知真正的视图

![](E:\陈松年笔记\study-notes\imgs\watcher类工作流程.jpg)

##### 读流程

- `Data`通过`observer`转换成了`getter/setter`的形式来追踪变化。
- 当外界通过`Watcher`读取数据时，会触发`getter`从而将`Watcher`添加到依赖中。

##### 写流程

- 当数据发生了变化时，会触发`setter`，从而向`Dep`中的依赖（即Watcher）发送通知。
- `Watcher`接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有可能触发用户的某个回调函数等。