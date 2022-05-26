## ES6相关

### var let const 区别

#### var

- 在**ES5**中，顶层对象的属性和全局变量是等价的，用`var`声明的变量既是全局变量，也是顶层变量
- 函数级作用域，在整个函数中都能起到作用
- 存在变量提升
- 可以重复声明同一变量（会覆盖）

#### let

- 块级作用域，只在语句块中起到作用，比如`for`循环语句中
- 不存在变量提升
- 存在`TDZ`(暂时性死区)：只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。，在`let`命令声明变量之前，都属于该变量的“死区”。
- 同一个作用域不可使用 `let` 重复声明同一个变量

#### const

- 声明一个变量为只读的常量，但是只能保证基本数据类型的值不能改变，对与复合数据类型，则不能改变。`const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动
- 其他与`let`相似

### Map Object 区别

- `Object`的键只能是**字符串**或者**Symbol**，`Map`的键值可以是**任意值**
- Map的键值对数量可以通过size属性获取，`Object`则需要通过`Object.keys(obj).length`类似的方式获取
- `Map `中的元素的顺序遵循插入的顺序，而 `Object `的则没有这一特性
- `Map`在存储大量元素、或者频繁的增加删除的时候性能表现更好

### 基本数据类型

> 总结：四基两空，还有一个bigint

- number
- string
- bool
- symbol
- null
- undefined
- bigint

### 引用数据类型

- Object
- Function
- Date
- Array
- Map
- Set
- .....

### this 指针及其使用场景

> **原理：this 永远指向最后调用它的那个对象！**

#### 场景一：全局环境下的this

- 在非严格模式下，`this`指向的是`window`对象
- 在严格模式下，`this`值为`undefined`

#### 场景二：构造函数

- 当函数作为构造函数的时候，`this`指向的是`new`出来的新对象

#### 场景三：函数作为对象的一个属性

- 函数作为对象的一个属性被调用的时候,`this`指向的是该对象

#### 场景四

- 函数用`apply() call() bind()`调用时,`this`指向的是传入的对象

### call apply bind之间的区别

- `call`与`apply`之间的区别只有一个，那就是`call`接收的是**具体参数**，`apply`接受的是**包含参数的一个数组**。参数确定或者顺序确定可以用`call`，其余最好用`apply`

- `call/apply`改变了函数的`this`上下文后马上**执行该函数**

- `bind`则是返回改变了`this`上下文后的函数的一份拷贝，**不执行该函数**

### 原型与原型链

- 构造函数身上有一个`prototype`属性，指向构造函数的原型对象
- 通过构造函数new出来的实例对象会有一个`__proto__`属性，指向它的构造函数的原型对象的`prototype`,而这个`__proto__`属性是由浏览器提供的
- 原型链在执行查找时是一层一层向上的，原型链的终点是`null`
- `Object `的原型对象也有`__proto__`属性指向`null`
- ![](./imgs/原型与原型链.png)

### 箭头函数与普通函数的区别

- 箭头函数没有`prototype`，因此它没有`this`属性
- 不能使用`new`关键词来实例化对象，会报错，因为箭头函数没有`constructor`
- 当箭头函数外层有普通函数的时候，其`this`会指向定义时所在的第一个普通函数
- 当箭头函数外层没有普通函数的时候，在**非严格模式**和**严格模式**下`this`的值都是`window`，注意在对象中使用箭头函数的情况
- 箭头函数外层有普通函数时，`arguments`继承自**外层普通函数**的`arguments`

- 箭头函数中的`this`指向的是定义时的`this`对象，而不是执行时的`this`对象

### 静态作用域

- JavaScript采用的是静态作用域，也称是词法作用域
- 某个标识符属于哪个作用域或者作用域链关系，其实在书写时已经决定了

### 执行上下文栈

- 执行上下文栈初始化的时候，会最先压入一个`全局执行上下文`，并且只有当整个程序执行结束后，执行上下文栈才会被清空
- 每当执行一个函数的时候，就会创建一个`执行上下文`并且压入执行上下文栈中，当函数执行完毕的时候就会将它弹出

### 执行上下文

#### 类型

- 全局执行上下文
- 函数执行上下文
- eval执行上下文

#### 属性

- 变量对象(VO or AO)，注意只有`var`声明的变量才能存放到AO中
- 作用域链(Scope chain)
- this

### 变量对象

#### 函数的所有形参 (如果是函数上下文)

- 由名称和对应值组成的一个变量对象的属性被创建
- 没有实参，属性值设为 undefined

#### 函数声明

- 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
- 如果变量对象已经存在相同名称的属性，则完全替换这个属性

#### 变量声明

- 由名称和对应值（undefined）组成一个变量对象的属性被创建；
- 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

### 作用域链

#### 含义

查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

#### 原因

这是因为函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！

### this规范深入

> **1.Let *ref* be the result of evaluating MemberExpression.**
>
> **6.If Type(*ref*) is Reference, then**
>
> ```javascript
>   a.If IsPropertyReference(ref) is true, then
> 
>       i.Let thisValue be GetBase(ref).
> 
>   b.Else, the base of ref is an Environment Record
> 
>       i.Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref).
> ```
>
> **7.Else, Type(*ref*) is not Reference.**
>
> ```javascript
>   a. Let thisValue be undefined.
> ```

**MemberExpression**简单理解可以为()左边的部分

### 闭包

#### 闭包的定义

> 闭包是指有权访问另一个函数作用域中的自由变量的函数

#### 闭包变量存储的位置

> 闭包中的变量存储的位置是堆内存

#### 闭包作用

- 保护私有变量
- 防止全局变量污染严重
- 实现单例模式
- 自执行函数
- 节流防抖
- 回调函数
- 柯里化

#### 闭包的弊端

> 容易导致内存泄漏

#### 检查内存泄漏

> performance 面板 和 memory 面板可以找到泄露的现象和位置

### Common JS与ES6 Modules规范的区别

- CommonJS模块是运行时加载，ES6 Modules是编译时输出接口
- CommonJS输出是值的拷贝；ES6 Modules输出的是值的引用，被输出模块的内部的改变会影响引用的改变
- CommonJs导入的模块路径可以是一个表达式，因为它使用的是`require()`方法；而ES6 Modules只能是字符串
- CommonJS `this`指向当前模块，ES6 Modules `this`指向`undefined`
- 且ES6 Modules中没有这些顶层变量：`arguments`、`require`、`module`、`exports`、`__filename`、`__dirname`

### 内存泄漏

- 意外的全局变量：由于使用了未声明的变量，而意外创建了一个全局变量而无法被回收
- 被遗忘的计时器
- 脱离DOM的引用： 获取一个 DOM 元素的引用，而后面这个元素被删除，由于一直保留了对这个元素的引用，所以它也无法被回收
- 闭包：不合理的使用会导致某些变量一直留在内存中

### Promise

> Promise是异步编程的一种解决方案，可以解决回调地狱的问题，它有三个状态，分别是pending、fulfilled、rejected，一旦状态改变就不会再变，任何时候都会得到这个结果

#### 流程图

![](./imgs/Promise.png)

#### 常见方法

- **resolve**：将pending状态变为fulfilled状态，返回一个fulfilled状态的promise对象
- **reject**：将pending状态变为rejected状态，返回一个rejected状态的promise对象
- **all**：接收一个promise数组，如果里面的promise的状态全为fulfilled，则返回Promise的resolve的回调的value的数组，如果当中有一个的状态为rejected，则立即返回promise，且状态更改为rejected
- **any**：接收一个promise数组，如果里面的promise的状态全为rejected，则返回Promise的rejected的回调的err的数组，如果当中有一个的状态为fulfilled，则立即返回promise，且状态更改为fulfilled
- **race**：当传入的所有的promise其中有任何一个状态变成fulfilled或者rejected，则执行相应的回调

### Event loop

#### 为什么js是单线程？

javascript作为浏览器的脚本语言，主要的用途就是跟用户交互和操作DOM。假如不是单线程的话，当一个线程给某个DOM添加内容，而另外一个线程在删除这个DOM，那么情况就变得很复杂了，因此javascript应当就是个单线程

#### 同步与异步

javascript实现了处理同步任务和异步任务，当遇到同步任务的时候就会交给主线程直接解决，当遇到异步任务的时候，就会把这些任务暂时放在任务队列里面，而异步任务又分为宏任务和微任务，分别会有对应的两个任务队列。总的来说，执行的时候，同步优先于异步，微任务优先于宏任务

#### 宏任务和微任务

- 宏任务(macro)：script(整体代码)、setTimout、setInterval、I/O、交互事件、UI渲染
- 微任务(micro)：promise.then、nextTick、await后面的语句（需要等到await有处理结果后，后面的语句才能加入任务队列）



