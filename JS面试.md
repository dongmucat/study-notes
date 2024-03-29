## JavaScript

### var let const 区别

#### var

- 在**ES5**中，顶层对象的属性和全局变量是等价的，用`var`声明的变量既是全局变量，也是顶层变量
- 函数级作用域，在整个函数中都能起到作用，`var`为函数级作用域主要是因为以前内存小，如果每次声明块级作用域则会占用很大的内存，内存可能会爆掉
- 存在变量提升
- 可以重复声明同一变量（会覆盖）

#### let

- 块级作用域，只在语句块中起到作用，比如`for`循环语句中
- 不存在变量提升
- 存在`TDZ`(暂时性死区)：只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。在`let`命令声明变量之前，都属于该变量的“死区”。总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
- 同一个作用域不可使用 `let` 重复声明同一个变量

#### const

- 声明一个变量为只读的常量，但是只能保证基本数据类型的值不能改变，对与复合数据类型，则不能改变。`const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动
- 其他与`let`相似

### Map Object 区别

- `Object`的键只能是**字符串**或者**Symbol**，`Map`的键值可以是**任意值**
- Map的键值对数量可以通过size属性获取，`Object`则需要通过`Object.keys(obj).length`类似的方式获取
- `Map `中的元素的顺序遵循插入的顺序，而 `Object `的则没有这一特性
- `Map`在存储大量元素、或者频繁的增加删除的时候性能表现更好

### ?.和??区别

- `?.`是可选链操作符，例如`let b = a?.name`，如果能访问到`name`，就会返回`name`的值；如果访问不到，则返回`undefined`而不会引起报错
- 形如`one ?? two`。使用`??`的时候只有`one`为`null`或`undefined`的时候才会返回`two`（空字符串不行），其他情况都会返回`one`

### ! 和 !! 区别

- 使用`!`是取反操作，会变量转换成布尔类型，`null`、`undefined`和`''`取反都为`true`，其余都为`false`
- 使用`!!`是将表达式强制转化为布尔类型的运算，运算结果为`true`或`false`，表达式是什么值，结果就是对应的bool值

### || 和 && 区别

- 使用`&&`的时候，只要有一个为假就为假。如果整体为`true`，则返回第二个的值；如果整体为`false`，就会返回第一个为假的值
- 使用`||`的时候，只要有一个为真就为真。如果第一个为真，则会返回第一个的值；其他情况都会则返回第二个的值

### ES5 function 和 ES6 class

> 在es5以前，主要通构造函数和原型链的方式定义一个类，本质上是一个function；而在es6中我们可以通过class关键字来定义一个类

- `class`必须`new`调用，不能直接执行；而`function`可以使用`new`也可以直接执行
- `class`不存在变量提升；而`function`存在变量提升
- 通过`new`一个`class`生成的实例，无法遍历到它原型链上的属性和方法
- `new.target`属性，通过这个属性，我们可以拿到`new`命令作用于的那个构造函数
- `class`有`static`静态方法，那么`static`方法需要使用这个类名去调用，而且`static`方法不会出现在实例上。如果`static`方法中包含`this`关键词，则这里的`this`指的是这个类而不是实例。`static`声明的属性和方法都会被子类所继承

### == 和 === 比较流程

首先说`==`：

- 首先会判断两者类型是否相同。相同的话比大小，类型不相同的话，那么就会进行类型转换
- `undefined`和`null`互相比较返回`true`, 和自身比较也返回`true`, 其他情况返回`false`
- `NaN`，`{}`，`[]`和任意值比较都是返回`false`
- 如果一个值是布尔值，先把它转化成数字再进行比较，`true`转化成`1`，`false`转化成`0`
- 如果是字符串和数字比较则会把字符串转化成对应的数字，如果是英文字母则会转化成`NaN`
- 如果一个值是对象，另一个值是数字或字符串，将会先使用toString()和valueOf()将对象转换为原始值，然后再进行比较

再说`===`：

- 判断两者类型和值是否相同，类型不一致，直接返回`false`；否则继续比较两值的大小，如果是引用类型则指向的地址是否相等

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

  ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44dde1c56e32490e92d7375e158096ba~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

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

### ES3规范执行上下文

#### 类型

- 全局执行上下文
- 函数执行上下文
- eval执行上下文

#### 属性

- 变量对象(VO or AO)，注意只有`var`声明的变量才能存放到AO中
- 作用域链(Scope chain)
- this

#### 变量对象

##### 函数的所有形参 (如果是函数上下文)

- 由名称和对应值组成的一个变量对象的属性被创建
- 没有实参，属性值设为 undefined

##### 函数声明

- 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
- 如果变量对象已经存在相同名称的属性，则完全替换这个属性

##### 变量声明

- 由名称和对应值（undefined）组成一个变量对象的属性被创建；
- 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

#### 作用域链

##### 含义

查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

##### 原因

这是因为函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！

#### this规范深入

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

### ES6规范执行上下文

#### 类型

- 全局执行上下文
- 函数执行上下文
- eval执行上下文

#### 两个环境

- 词法环境`LexicalEnvironment`
- 变量环境`VariableEnvironment`

#### 词法环境LexicalEnvironment

词法环境是`ECMA`中的一个规范，简单来说，词法环境就是建立了标识符---->变量引用地址的映射表，`LexicalEnvironment`只存储函数声明和`let/const`声明的变量

##### 词法环境LexicalEnvironment的类型

- 全局环境(`GlobalEnvironment`)：在`JS`运行开始的时候，浏览器就会创建全局执行上下文的时候就会有这个全局环境
- 函数环境(`FunctionEnvironment`)：每一次调用函数时都会产生函数环境，在`ER`中也会记录该函数的`length`和`arguments`属性，而且函数环境的`outer`引用会指向调用起该函数的父环境
- 模块环境(`ModuleEnvironment`)：模块环境中可以读取到例如`module`、`export`变量。模块环境的`outer`引用指向全局环境

##### 词法环境LexicalEnvironment两个部分的构成

- 环境记录`EnvironmentRecord`：存放变量和函数声明的地方，其中`this`也在这里
- 外层引用`outer`：提供了访问父级词法环境的引用，可能为`null`

##### 环境记录EnvironmentRecord

###### 两种类型

- declarative EnvironmentRecord（一般来说都是declarative）
- object EnvironmentRecord（一般来说由with语句触发，特殊地，全局ER类型为declarative和object混合，但是视作为object）

##### 小结

```
词法环境 = EnvironmentRecord + outer
词法环境分类 = 全局 or 函数 or 模块
EnvironmentRecord分类 = declarative or object
GlobalEnvironmentRecord = declarative + object
```

#### 变量环境VariableEnvironment

在`ES6`中提倡使用`let/const`去声明变量，但是为了兼顾`ES3`中的`var`的写法以及让他们做一个区分，于是使用变量环境去存储使用`var`声明的变量。变量环境大体上是和词法环境差不多的。只不过用`var`声明的变量一开始的值为`undefined`，并且存在变量提升

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

#### 闭包与内存泄漏

内部函数引用了外部函数的局部变量，然后通过`return`将内部函数暴露在了全局作用域并用一个引用去接收，这样的形式，外部函数的执行上下文被摧毁了但是它的局部变量仍然没有被摧毁，这个时候其实也就会造成了内存泄漏。但其实闭包不一定会造成内存泄漏，只是我们在一些情况下很可能造成循环引用的情况，比如`DOM`引用，这样的不正当使用就会造成内存泄漏，这里可以用`null`解决

#### 检查内存泄漏

> performance 面板 和 memory 面板可以找到泄露的现象和位置

### Common JS与ES6 Modules规范的区别

- CommonJS模块是运行时加载，因为像`require`这一些函数需要在执行阶段的时候才会被实例化；ES6 Modules是编译时输出接口，因为`import`和`export`这些关键词在编译阶段就做了模块解析
- CommonJS运行在服务端，同步加载；ES6 Modules运行在浏览器，异步加载
- CommonJS输出是值的拷贝；ES6 Modules输出的是值的引用，被输出模块的内部的改变会影响引用的改变
- CommonJs导入的模块路径可以是一个表达式，因为它使用的是`require()`方法；而ES6 Modules只能是字符串
- CommonJS `this`指向当前模块，ES6 Modules `this`指向`undefined`
- 且ES6 Modules中没有这些顶层变量：`arguments`、`require`、`module`、`exports`、`__filename`、`__dirname`

### 内存泄漏

- 意外的全局变量：由于使用了未声明的变量，而意外创建了一个全局变量而无法被回收
- 被遗忘的计时器
- 脱离DOM的引用： 获取一个 DOM 元素的引用，而后面这个元素被删除，由于一直保留了对这个元素的引用，所以它也无法被回收
- 闭包：不合理的使用会导致某些变量一直留在内存中

### JS垃圾回收

> 垃圾回收就是需要定期找出不再用到的变量，然后释放它所占用的内存

#### 标记清理（常用）

> 这个过程分为两个，一个是标记，另一个是清理

##### 过程

- 首先说标记，标记的方式有很多种，比如当变量进入上下文时，反转某一位；或者可以维护“在上下文中”和“不在上下文中”的两个变量列表，具体怎么实现不重要，重要的是这个策略。

- 然后说清理，垃圾收集器在运行的时候会给内存中所有的变量都加上一个标记，假设内存里的对象都是垃圾，全部标记为0；然后垃圾收集器会遍历各个根对象，把不是垃圾的节点更改为1；然后清除标记为0的垃圾，释放所占用的内存

##### 优点

实现简单，就是打上标记这个动作，用或不用只有两种状态，这样的话就可以用一位二进制就能实现

##### 缺点

标记清除算法有一个很大的缺点，就是在清除之后，剩余对象的位置是不变的，也就会导致空闲内存空间是不连续的。而关于这个问题，使用**标记整理算法**就可以有效解决，这个算法其实就是把所有活着的对象向一端移动，最后释放掉边界的内存

#### 引用计数（不常用）

> 这个其实是最先的一种垃圾回收算法，其思路就是对每个值都记录它被引用的次数

##### 过程

- 当声明了一个变量并且将一个引用类型赋值给该变量的时候这个值的引用次数就为 1
- 如果同一个值又被赋给另一个变量，那么引用数加 1
- 当这个变量的值被其他值给覆盖了，那么这个值的引用次数就减1
- 当这个值的引用次数变为0的时候，就说明这个值就没法被访问了，因此可以进行回收

```javascript
let a = new Object() 	// 此对象的引用计数为 1（a引用）
let b = a 		// 此对象的引用计数是 2（a引用,b引用）
a = null  		// 此对象的引用计数为 1（b引用）
b = null 	 	// 此对象的引用计数为 0（无引用）
...			// GC 回收此对象
```

##### 缺点

首先是计数器会占很大的位置，然后是无法解决循环引用的问题

### V8垃圾回收

> V8垃圾回收算法也是基于**标记清理算法**的，不过做了一些优化

#### 分代收集

> 在V8中会将堆分成两个区域

- **新生代**：存放的是生存时间短的对象，通常大小只支持**1~8M**的容量，副垃圾回收器负责新生代区
- **老生代**：存放的是生存时间久的对象，支持的容量大很多，主垃圾回收器负责老生代区

#### 新生代回收

> 新生代中用 **Scavenge** 算法来处理，也就是把新生代空间对半划分为两个区域，**一半是对象区域**，**一半是空闲区域**，一般来说，新加入的对象都会存放到对象区域

![](http://songnian.gitee.io/imgs/imgs/V8新生代Scavenge.png)

##### 回收过程

- 为 **对象区域** 中的垃圾做 **标记**
- 标记完成之后，就进入 **垃圾清理阶段**，**副垃圾回收器** 会把这些 **存活** 的对象 **复制** 到 **空闲区域** 中
- 由于上一步的操作，使得不会有 **内存碎片** 产生，也没必要进行 **内存整理**
- 完成复制后，**对象区域** 与 **空闲区域** 进行角色 **翻转**，即原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域

#### 老生代回收

老生代回收算法就是用了标记整理法结合，这个算法的标记阶段和标记清除算法没有什么不同，只是标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存

#### 全停顿

全停顿实际上就是主线程一旦执行垃圾回收程序，其他正在执行的js脚本都会被暂停下来，直到垃圾回收程序执行结束，这样的话垃圾回收就会占用了很多时间

#### 增量标记

增量标记算法的出现就是为了解决全停顿耗时过多的问题，**增量标记算法**，把一个完整的垃圾回收任务 **拆分为很多小任务**，这些小任务执行时间比较短，可以 **穿插** 在其他的 **JavaScript** 任务中间执行

### Promise

> Promise是异步编程的一种解决方案，可以解决回调地狱的问题，它有三个状态，分别是pending、fulfilled、rejected，一旦状态改变就不会再变，任何时候都会得到这个结果

#### 流程图

![](http://songnian.gitee.io/imgs/imgs/Promise.png)

#### 常见方法

- **resolve**：将pending状态变为fulfilled状态，返回一个fulfilled状态的promise对象
- **reject**：将pending状态变为rejected状态，返回一个rejected状态的promise对象
- **all**：接收一个promise数组，如果里面的promise的状态全为fulfilled，则返回Promise的resolve的回调的value的数组，如果当中有一个的状态为rejected，则立即返回promise，且状态更改为rejected
- **any**：接收一个promise数组，如果里面的promise的状态全为rejected，则返回Promise的rejected的回调的err的数组，如果当中有一个的状态为fulfilled，则立即返回promise，且状态更改为fulfilled
- **race**：当传入的所有的promise其中有任何一个状态变成fulfilled或者rejected，则执行相应的回调

#### 一些特性

##### 值穿透

> 值穿透指的是，链式调用的参数不是函数时，会发生值穿透，就传入的非函数值忽略，传入的是之前的函数参数

```javascript
// 正常
Promise.resolve(1)
    .then(() => { return 2 })
    .then(() => { return 3 })
    .then(console.log)
	//输出 3

// 值穿透
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)
    // 输出 1
```

### Event loop

#### 为什么js是单线程？

javascript作为浏览器的脚本语言，主要的用途就是跟用户交互和操作DOM。假如不是单线程的话，当一个线程给某个DOM添加内容，而另外一个线程在删除这个DOM，那么情况就变得很复杂了，因此javascript应当就是个单线程

#### 同步与异步

javascript实现了处理同步任务和异步任务，当遇到同步任务的时候就会交给主线程直接解决，当遇到异步任务的时候，就会把这些任务暂时放在任务队列里面，而异步任务又分为宏任务和微任务，分别会有对应的两个任务队列。总的来说，执行的时候，执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。优先级来说同步优先于异步，微任务优先于宏任务。

#### 宏任务和微任务

- 宏任务(macro)：script(整体代码)、setTimout、setInterval、I/O、交互事件、UI渲染
- 微任务(micro)：promise.then、nextTick、await后面的语句（需要等到await有处理结果后，后面的语句才能加入任务队列）

### Proxy与Reflect

#### Proxy

`Proxy`代理就是通过`Proxy`拦截对一个对象的基本操作，对于一些复合的操作，`Proxy `是拦截不到的，因为它不是深度监测，比如`p.a.b`触发的是`key`为`a`的`get`函数

```javascript
const data = {
	name: "jack",
};
const p = new Proxy(data, {
	//拦截属性取值操作
	get(target, key, receiver) {
		// ...
		console.log("receiver === p ? ", receiver === p); // false
		console.log("receiver === obj ? ", receiver === obj); // true
		console.log("this === obj ? ", this === obj); // false
		return target[key];
	},
	//拦截属性设置操作
	set(target, key, value) {
		//...
		target[key] = value;
		return target[key];
	},
});
const obj = {};
// 设置obj继承与parent的代理对象p
Object.setPrototypeOf(obj, p);
console.log(obj.name); // jack
```

其中`get`陷阱中的`receiver `存在的意义就是为了正确的在陷阱中传递上下文，请注意这里的`this`指向的是`handler`对象

#### Reflect

`Reflect`是一个全局内置的对象，它提供拦截`JavaScript`操作的方法。但是，`Reflect`本身不是个函数对象，因此其不是一个构造函数，不能使用new进行调用。`Reflect`的所有属性和方法都是静态的

```javascript
Reflect.get(target, key,receiver)//在一个对象上读取值
Reflect.set(target, key,value)//在一个对象上设置属性
```

```javascript
const p = new Proxy(data, {
  get(target, property, receiver) {
    // obj继承data，想要返回obj自身的属性值就执行下面这句
    return Reflect.get(target, property, receiver);
    //  等价于 return target[property].call(receiver);
    // 想返回data中的属性值就执行下面这句
    // return Reflect.get(target, property);
    // 等价于return target[property];
  }
});
```

#### 总结

在`Vue3`中使用`Proxy`来实现响应式数据，具体就是通过`Proxy`拦截和修改对象的基本操作。在代理过程中，会出现`get`中的`this`指向问题，这个时候就需要使用`Reflect`的方法第三个参数`receiver`来解决，相当于用`call`改变了`this`指向。

### DOM事件和事件委托

#### DOM事件

- 事件捕捉：从外向内找到监听函数的过程
- 事件冒泡：从内向外的过程，默认情况下事件执行也在这个阶段
- e.target： 用户操作的元素 
- e.currentTarget：程序员监听的元素
- e.stopPropagation()：取消冒泡

#### 事件委托

> 就是当事件触发时，把要做的事委托给父元素来处理

**优点**：节约内存，减少监听，能为之后新增的DOM元素依然添加事件

### XHR和Fecth的区别

- `XHR`可以监控进度和中断请求，而`Fetch`请求不可以
- `Fetch`只对网络错误或者跨域报错，对于`http`状态码错误不报错
- `Fetch`不支持超时控制，不支持`abort`
- 默认情况下`Fetch`不发送`cookie`，除非手动配置`credentials `属性
- `Fetch`的语法更简洁，更语义化，并且基于`Promise`