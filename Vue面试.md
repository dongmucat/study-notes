## Vue面试

### Vue工作原理

首先当一个Vue实例被创建的时候，Vue会遍历data中的属性，通过`Observer`类来转换成`getter/setter`的形式来追踪变化，当外界通过`Watcher`读取数据时，会触发`getter`从而`Dep`会将`Watcher`添加到依赖中，当数据发生了变化时候，会触发`setter`，从而向`Dep`中的依赖，也就是`Watcher`发送通知，`Watcher`接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新

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