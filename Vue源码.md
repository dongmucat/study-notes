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

![](./imgs/watcher类工作流程.jpg)

##### 读流程

- `Data`通过`observer`转换成了`getter/setter`的形式来追踪变化。
- 当外界通过`Watcher`读取数据时，会触发`getter`从而将`Watcher`添加到依赖中。

##### 写流程

- 当数据发生了变化时，会触发`setter`，从而向`Dep`中的依赖（即Watcher）发送通知。
- `Watcher`接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有可能触发用户的某个回调函数等。

#### Array的变化侦测

##### 收集依赖

- 数组的数据的依赖也在`getter`和`setter`中收集
- 在`defineReactive`函数中，首先获取数据对应的`Observer`实例`childOb`，然后在`getter`中调用`Observer`实例上依赖管理器，从而将依赖收集起来

##### 拦截器

> 在`Vue`中创建了一个数组方法拦截器，它拦截在数组实例与`Array.prototype`之间，在拦截器内重写了操作数组的一些方法，比如可以通知变化等

![](./imgs/拦截器.png)

##### 通知依赖

> 我们应该在拦截器里通知依赖，要想通知依赖，首先要能访问到依赖
>
> 我们只要能访问到被转化成响应式的数据`value`即可
>
> `vaule`上的`__ob__`就是其对应的`Observer`类实例，有了`Observer`类实例我们就能访问到它上面的依赖管理器，然后只需调用依赖管理器的`dep.notify()`方法，让它去通知依赖更新即可

##### 深度监测

- 对于`Array`型数据，调用了`observeArray()`方法，该方法内部会遍历数组中的每一个元素，然后通过调用`observe`函数将每一个元素都转化成可侦测的响应式数据

##### 新增元素检测

- 如果向数组里新增一个元素的话，我们也需要将新增的这个元素转化成可侦测的响应式数据，操作是只需拿到新增的这个元素，然后调用`observe`函数将其转化即可

- 可以向数组内新增元素的方法有3个，分别是：`push`、`unshift`、`splice`，我们可以在这三个方法中分别处理即可

##### 不足之处？Vue.set和Vue.delete来救

> 我们在日常开发中，还可以通过数组的下标来操作数据，而这样的修改是无法被拦截器侦测到的，为了解决这一问题，`Vue`增加了两个全局API:`Vue.set`和`Vue.delete`

### 虚拟DOM

#### 前言

##### 什么是虚拟DOM？

所谓虚拟DOM，就是用一个js中的对象来描述一个DOM节点

##### 为什么要有虚拟DOM？

如果直接操作真实的DOM会非常耗时，因为一个真正的DOM是非常庞大的。我们可以利用计算时间来换取直接操作DOM所消耗的时间。即当数据发生变化时，可以比变化前后的虚拟DOM节点，通过`diff`算法来计算需要更新的地方

#### VNode类

> VNode类可以实例化出不同类型的虚拟DOM节点

##### VNode类内置变量（参数）

```javascript
export default class VNode {
  constructor (
    tag?: string,//表示当前节点的标签名
    data?: VNodeData,//VNodeData类型的数据
    children?: ?Array<VNode>,//子节点数组
    text?: string,//当前节点文本
    elm?: Node,//当前节点对应的真实DOM
    context?: Component,//当前组件节点对应的Vue实例
    componentOptions?: VNodeComponentOptions,//当前组件的Option选项
    asyncFactory?: Function
  ) {
    this.tag = tag                                /*当前节点的标签名*/
    this.data = data        /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.children = children  /*当前节点的子节点，是一个数组*/
    this.text = text     /*当前节点的文本*/
    this.elm = elm       /*当前虚拟节点对应的真实dom节点*/
    this.ns = undefined            /*当前节点的名字空间*/
    this.context = context          /*当前组件节点对应的Vue实例*/
    this.fnContext = undefined       /*函数式组件对应的Vue实例*/
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key           /*节点的key属性，被当作节点的标志，用以优化*/
    this.componentOptions = componentOptions   /*组件的option选项*/
    this.componentInstance = undefined       /*当前节点对应的组件的实例*/
    this.parent = undefined           /*当前节点的父节点*/
    this.raw = false         /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.isStatic = false         /*静态节点标志*/
    this.isRootInsert = true      /*是否作为跟节点插入*/
    this.isComment = false             /*是否为注释节点*/
    this.isCloned = false           /*是否为克隆节点*/
    this.isOnce = false                /*是否有v-once指令*/
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  get child (): Component | void {
    return this.componentInstance
  }
}
```

##### VNode能够描述的节点类型

- 注释节点

  - isComment：用于标识是否是注释节点
  - text：注释信息

- 文本节点

  - text：文本信息

- 克隆节点

  - 复制一份已存在的节点，用于模板编译优化

- 元素节点

  > 更贴近真实的DOM元素，有`tag`，`class`属性等

- 组件节点

  > 相比于元素节点，有两个特殊的属性

  - componentOptions :组件的`option`选项，如组件的`props`等
  - componentInstance :当前组件节点对应的`Vue`实例

- 函数式组件节点

  > 相比于元素节点，有两个特殊属性

  - fnContext:函数式组件对应的`Vue`实例
  - fnOptions: 组件的`option`选项

##### VNode类的作用

其实`VNode`的作用是相当大的。我们在视图渲染之前，把写好的`template`模板先编译成`VNode`并缓存下来，等到数据发生变化页面需要重新渲染的时候，我们把数据发生变化后生成的`VNode`与前一次缓存下来的`VNode`进行对比，找出差异，然后有差异的`VNode`对应的真实`DOM`节点就是需要重新渲染的节点，最后根据有差异的`VNode`创建出真实的`DOM`节点再插入到视图中，最终完成一次视图更新。

#### DOM-Diff概论

> 找出前后虚拟DOM的差异过程就是DOM-diff过程

##### Patch

> 在`Vue`中，把 `DOM-Diff`过程叫做`patch`过程，以新的VNode为基准，改造旧的oldVNode使之成为跟新的VNode一样

##### 创建节点

> 创建节点是新的`VNode`有而旧的`VNode`没有。`VNode`类可以描述6种类型的节点，而实际上只有3种类型的节点能够被创建并插入到`DOM`中，它们分别是：元素节点、文本节点、注释节点

![](E:\陈松年笔记\study-notes\imgs\Patch创建节点.png)

##### 删除节点

> 如果某些节点再新的`VNode`中没有而在旧的`VNode`中有，那么就需要把这些节点从旧的`VNode`中删除。删除节点非常简单，只需在要删除节点的父元素上调用`removeChild`方法即可

##### 更新节点

> 更新节点就是当某些节点在新的`VNode`和旧的`VNode`中都有时，我们就需要细致比较一下，找出不一样的地方进行更新

![](E:\陈松年笔记\study-notes\imgs\Patch更新节点.png)

##### 总结

> 整个`patch`过程干了三件事，分别是：创建节点，删除节点，更新节点，其中更新子节点比较复杂

##### patchVnode流程

> 同级比较，不能跨级，文本节点和子节点是不会同时存在，以新`vnode`为基准

- 找到对应真实的`dom`，称为`el`
- 如果新`vnode`和旧`vnode`指向一同个对象则直接返回
- 如果新旧`vnode`都有本文节点并且不相等，那么`el`的本文节点将替换成`vnode`的文本节点
- 如果新的`vnode`没有子节点，而旧的`vnode`有子节点，则删除`el`的子节点
- 如果新的`vnode`有子节点，而旧的`vnode`没有子节点，则添加`vnode`子节点真实化后添加到`el`
- 如果两者都有子节点，则执行`updateChildren`函数进一步比较子节点

##### updateChildren流程

> 一层一层地递归比较

- 将新的`vnode`的子节点和旧的`vnode`的子节点取出来
- 新的`vnode`的子节点和旧的`vnode`的子节点各有两个头尾指针`StartIdx`和`endIdx`，也有说他们是(新前，新后，旧前，旧后)，他们之间有4种比较，如果当中两个匹配得上，则真实DOM的相应节点会移动到新`vnode`的位置
- 如果上述4种比较都没有匹配到，就会用`key`进行比较：
  - 如果没有`key`，则直接将指向新的`vnode`的子节点，插入`真实DOM`
  - 如果有`key`，旧的`vnode`的子节点会根据`key`生成一个`hash`表，遍历新的vode的子节点，让它`key`与`hash`表进行匹配，匹配成功后会进行相应的更新处理