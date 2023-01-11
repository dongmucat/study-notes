## 前言

关于写此作的目的主要还是快速学习React框架的使用，此篇适合有一定基础的同学，本人之前浅学过一些Vue，对于React也是没有接触过，也是边学边写，文章可能会有很多不足，但如果你也和我一样，想快速入门React，那么可以跟着我一起出发，一起探索React。

## React基础

### React介绍

> 学习目标：了解React到底是啥？

React一个专注于构建用户界面的 JavaScript 库，和vue和angular并称前端三大框架，不夸张的说，react引领了很多新思想，虚拟DOM，Diff等，世界范围内是最流行的js前端框架，最近发布了18版本，加入了很多新特性。嗯，大概就是这样。

- React英文文档（https://reactjs.org/）


- React中文文档 （https://zh-hans.reactjs.org/）

### React环境初始化

> 学习目标：能够使用creat-react-app搭建React项目，并且能了解项目目录和每个文件的作用

- 请在微软扩展下载**React Developer Tools**

- 相信我，直接用脚手架是最快的，这里给出**creat-react-app**，如需vite或其他脚手架也可以自行搭建

```
npx create-react-app my-app // my-app是我们的项目名字
cd my-app // 进入项目
npm start // 启动！！！React来哩
```

**目录解析（列举重点）：**

- node_modules（依赖包存放的地方）
- public（存放的公共文件）
  - index.html（首页，非常重要）
  - manifest.json（用于指定应用的显示名称、图标、入口页面等信息，老外挺看重的）
  - 。。。。。。

- src（存放代码的地方）
  - App.js（根组件）
  - index.js（入口文件，非常重要，如果是React18，将会采用 ReactDOM.createRoot（）创建，不过也无妨，入口文件咱们暂时别动）
  - 。。。。。。（其余都不是很重要，可删？）
- package.json（用于项目信息以及npm脚本和安装的依赖包，非常好用）
- package-lock.json（yarn生成的，可以指定依赖版本）
- .gitignore（使用Git的时候，可以忽略一些文件，这样就可以忽略类似node_modules文件夹了）

**核心库：**`react `、`react-dom`

**常见问题：**为了便于学习，可以将index.js文件中的reportWebVitals和<React.StrictMode>删除

```javascript
// 像这样哩
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
```

### React & JSX

> 学习目标：了解JSX是什么，懂得JSX的使用

**什么是JSX？**

JSX是 JavaScript and XML的缩写，表示在 JS 代码中书写 HTML 结构，它可以帮助我们更好的在React中创建HTML结构（页面UI结构），实际上是React.createElement()的语法糖

**JSX怎么使用？**

**基础用法：**

语法：`{ JS 表达式 }`

是不是很简单？但是要注意是单层花括号，而Vue是双层花括号，作者踩过坑0_0

```javascript
// 举个栗子：
// 路径：src/App.js
function App() {
  const name = "爱吃肉的年"
  return (
    <div className="App">
      <h2>{name}</h2>
    </div>
  );
}
export default App;
```

**列表渲染：**

使用过Vue可能知道，直接用v-for就好了，那么在React中如何渲染呢？这里可以使用数组的map方法进行渲染

```javascript
// 举个栗子
function App() {
	const taskList = [
		{ id: 1, name: "吃饭" },
		{ id: 2, name: "睡觉" },
		{ id: 3, name: "打豆豆" },
	];
	return (
		<div className="App">
			<ul>
        		{/* 重要 */}	
				{taskList.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
		</div>
	);
}
export default App;
```

- 关于key，key 在 HTML 结构中是看不到的，是 React 内部用来进行性能优化时使用，初学的时候不用理会很多，记得设置key就好了，以后再了解吧。

**条件渲染：**

Vue有v-if，而React可以使用`三元表达式`或者使用` && 短路符号`

```javascript
// 举个栗子
function App() {
	// 来个flag变量
	const flag = true;
	return (
		<div className="App">
			{/* 三元表达式条件渲染字符串 */}
			{flag ? "React真有趣" : "Vue真有趣"}
			{/* &&条件渲染*/}
			{flag && <div>我要吃肉</div>}
			{/* 条件渲染标签or组件 */}
			{flag ? <div>this is div</div> : null}
		</div>
	);
}
export default App;
```

**条件样式渲染：**

样式推荐使用外部引入的方式更加优雅，或者使用`stylecomponents`，这里给出根据条件更改样式进行渲染，其他方式也类似

```css
// 请创建app.css
.title {
  color: blue;
}
```

```javascript
// App.js
import './app.css'
function App() {
  const showTitle = true
  return (
    <div className="App">
      <div className={ showTitle ? 'title' : ''}>this is a div</div>
    </div>
  )
}
export default App
```

**常见问题：**

- JSX必须有一个根节点，如果没有根节点，可以使用`<></>`（幽灵节点）替代或者使用<React.Fragment>，这个可以带key
- JSX支持多行（换行），如果需要换行，需使用`()` 包裹，防止bug出现

## React组件基础

> 关于旧时代的类组件本文章并不想过多赘述，我想，未来多年这个模式将会被函数式组件代替，因为这个函数式组件+Hooks的小快艇更符合 UI = f (state)的思想，使用起来也很棒

### 类组件

> 学习目标：能够使用类组件渲染以及能够定义和修改状态，学会受控表单

#### 快速使用

简单来说，就是一个ES6语法的类继承于React.Component

一般来说，函数组件以及类组件的名字的首字母都应该大写，这是规则。不然React会把它认为普通的HTML标签，不信您也可以试试0_0

```javascript
// 创建Hello.js
// 引入React
import React from 'react'
// 定义类组件
export default class Hello extends React.Component {
  // 继承React.Component的render函数
  render () {
    return <div>I am Hello</div>
  }
}
```

```javascript
// App.js
import Hello from "./Hello";
function App() {
	return (
		<div className="App">
			<Hello></Hello>
		</div>
	);
}
export default App;
```

#### 类组件状态

如何维持状态，如何修改状态进而渲染UI，不如我们一起来玩一个计数器游戏吧

1.首先创建**Counter.js**，然后使用**this.state**定义变量，**语法：this.state = {数据}**

```javascript
// Counter.js
import React from "react";
export default class Counter extends React.Component {
	constructor(props) {
        // super方法
		super(props);
        // 定义状态
        // 语法：this.state = {数据}
		this.state = {
			count: 0,
		};
	}
	render() {
		return <button>{this.state.count}</button>;
	}
}
```

```javascript
// 在App.js中调用
import Counter from "./Counter";
function App() {
	return (
		<div className="App">
			<Counter></Counter>
		</div>
	);
}
export default App;
```

#### **事件绑定**

> 学会目标：掌握基本的事件绑定

2.让数字跑起来！记得监听事件吗，React也提供了，规则就是小驼峰命名法，简单来说就是形如`onClick={回调函数}`，随后我们可以创建一个方法，这个方法就叫`addCount`，作为回调函数，然后再使用**this.setState**进行状态的修改，如下：

```javascript
import React from "react";
export default class Counter extends React.Component {
	constructor(props) {
		super(props);
		// 定义数据
		this.state = {
			count: 0,
		};
	}
	// 定义修改数据的方法
	addCount = () => {
        // 语法：this.setState({ 要修改的部分数据 })
		this.setState({
			count: this.state.count + 1,
		});
	};
	// 使用数据 并绑定事件
	render() {
		return <button onClick={this.addCount}>{this.state.count}</button>;
	}
}
```

当我们点击按钮的时候，我们的数据`count`就可以成功加1，是不是很棒？

接下来我们来捋一遍总体流程：

1. 初始化状态
2. 初始化状态渲染视图
3. 更改状态
4. 再次渲染视图

是不是很有趣？

**常见问题：**

- 思想是数据驱动视图，无需手动操作DOM
- 老生常谈的类组件中的this指向问题，你可以使用bind改变this指向，关于这个问题，可以直接参考我的写法就可以，具体了解见官网解释（其实是ES6的问题）
- 为什么不直接修改this.state，而是需要使用this.setState进行修改？因为React并没有实现像Vue3那样使用Proxy方式来监听数据变化，因此必需要通过this.setState来告知其状态发生了变化
- 可以利用展开运算符来达到基于当前状态创建新值的目的，如下：

```javascript
this.state = {
	count:0,
	person:{
		name:'jack'
	}
}

this.setState({
    count: this.state.count + 1
    person: {
       ...this.state.person,
       // 覆盖原来的属性 就可以达到修改对象中属性的目的
       name: 'rose'
    }
})
```

#### 受控表单

> 学习目标：学会受控表单，单一数据源特性

什么是受控表单？如果不知道，可以这么理解，React组件的状态的地方是在state中，input表单元素也有自己的状态是在value中，React将state与表单元素的值（value）绑定到一起，由state的值来控制表单元素的值，从而保证单一数据源特性，主要是使用监听事件。来，上代码~

```javascript
import React from "react";
export default class InputComponent extends React.Component {
	constructor(props) {
		super(props);
		// 声明组件状态
		this.state = {
			message: "this is message",
		};
	}
	// 声明事件回调函数
	changeHandler = (e) => {
		this.setState({ message: e.target.value });
	};
	render() {
		return (
			<div>
				{/* 绑定value 绑定事件*/}
				<input
					value={this.state.message}
					onChange={this.changeHandler}
				/>
			</div>
		);
	}
}
```

之后我们更改input输入框内容的时候，打开React Developer Tools的Components可以看到message的变化

### 函数式组件

> 学习目标：简单了解，能够使用函数组件渲染

**说在前面：**这一部分暂时不细讲，之后的篇章有**函数式组件+Hooks**，所以暂时作为了解就行

#### 快速使用

```javascript
// 定义函数组件
function Hello () {
  return <div>这是我的第一个函数组件!</div>
}

// 定义类组件
function App () {
  return (
    <div className="App">
      {/* 渲染函数组件 */}
      <Hello></Hello>
    </div>
  )
}
export default App
```

## React组件进阶

> 学习目标：简单了解React类组件生命周期之3个阶段，并且了解一下props属性和props.children属性

- 参考官方：[生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

**说在前面：**小菜鸟作者之前使用的是Vue框架。初学React，看过一些React生命周期的文章，React15、16、17不同的版本有不同的变换。不断的变化原因我猜测大概也是为了契合Hooks，但是又想保持旧的API可以正常运行，因此也就有边警告边废除的现象。本文章讲述的是**16.4版本后**的生命周期，对于不常用的生命周期钩子暂时先了解一下即可，或者需要的时候再回来看一看

### 生命周期之挂载阶段

> 学习目标：了解挂载阶段以及各个钩子函数的作用

**执行流程：**

**constructor（常用）-->static getDerivedStateFromProps-->render（常用）-->componentDidMount（常用）**

**说明：**

| 钩子函数                        | 触发时机                                                     | 作用                                                         |
| ------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- |
| constructor                     | 创建组件时，最先执行，初始化的时候只执行一次                 | 1. 初始化state  2. 创建 Ref 3. 也使用 bind 解决 this 指向问题等 |
| static getDerivedStateFromProps | 在render方法之前调用，并且在初始挂载、更新、forceUpdate时都会调用 | 让组件在 props 发生改变时更新它自身的内部 state              |
| render                          | 每次组件渲染都会触发                                         | 渲染UI（**注意： 不能在里面调用setState()** ）               |
| componentDidMount               | 组件挂载（完成DOM渲染）后执行，初始化的时候执行一次          | 1. 发送网络请求   2.DOM操作                                  |

### 生命周期之更新阶段

> 学习目标：了解更新阶段以及各个钩子函数的作用

**执行流程：**

**static getDerivedStateFromProps-->shouldComponentUpdate-->render（常用）-->getSnapshotBeforeUpdate-->componentDidUpdate（常用）**

**说明：**

| 钩子函数                        | 触发时机                                                     | 作用                                                         |
| :------------------------------ | ------------------------------------------------------------ | :----------------------------------------------------------- |
| static getDerivedStateFromProps | 在render方法之前调用，并且在初始挂载、更新、forceUpdate时都会调用 | 让组件在 props 发生改变时更新它自身的内部 state              |
| shouldComponentUpdate           | 有新的props或者新的state时候可以调用，首次渲染和使用forceUpdate()时不会调动该方法 | 根据 `shouldComponentUpdate()` 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染**不要直接调用setState，会触发循环渲染导致异常** |
| render                          | 每次组件渲染都会触发                                         | 渲染UI（与 挂载阶段 是同一个render）                         |
| getSnapshotBeforeUpdate         | 在最近一次渲染输出（提交到 DOM 节点）之前调用                | 它可以使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置） |
| componentDidUpdate              | 组件更新后（DOM渲染完毕）                                    | DOM操作，可以获取到更新后的DOM内容，**不要直接调用setState** |

### 生命周期之卸载阶段

> 学习目标：了解卸载阶段以及各个钩子函数的作用

**说在前面：**我比较中意卸载阶段，因为不管是哪个版本只有一个，哈哈哈哈

**执行流程：**

**componentWillUnmount（常用）**

**说明：**

| 钩子函数             | 触发时机                 | 作用                                                         |
| -------------------- | ------------------------ | ------------------------------------------------------------ |
| componentWillUnmount | 组件卸载（从页面中消失） | 执行清理工作（比如：清理定时器，取消网络请求，清除订阅等）**不应该使用setState** |

### props

> 学习目标：掌握props传递参数

**props是什么？**

props就是从组件外部向组件内部向组件内部传递的数据，类组件的props其实是继承了React.component，因此只要继承了，都会有props。使用如下，就会有hello出现

```javascript
import React from "react";
// Outer.js
// ！！！Outer类组件记得添加到App.js中
class Inner extends React.Component {
	render() {
		return <div>{this.props.text}</div>;
	}
}
export default class Outer extends React.Component {
	render() {
		return <Inner text="hello"></Inner>;
	}
}
```

**基本玩法规则：**

**1.props readonly**

props是只读对象，这样可以保证单项数据流的要求，不要乱修改，请牢记

**2. props可以传递任意数据**

所谓任意数据就是任意数据，例如数组、字符串、对象、jsx、函数等等

### props校验之类型约束

> 学习目标：学会使用PropTypes工具对props进行类型约束

**说在前面：**对于组件来说，props是由外部传入的，我们其实无法保证组件使用者传入了什么格式的数据，如果传入的数据格式不对，就有可能会导致组件内部错误，这个时候可以使用props校验解决，但是本人认为直接使用ts会更好

**实现步骤**

1. 安装属性校验包：`yarn add prop-types`
2. 导入`prop-types` 包
3. 使用 `组件名.propTypes = {}` 给组件添加校验规则

例如：

```javascript
import PropTypes from "prop-types";
export default function List = (props) {
	const taskList = props.taskList;
	return (
		<ul>
			{taskList.map((item) => (
				<li key={item.id}>{item.name}</li>
			))}
		</ul>
	);
}
// 添加校验规则
List.propTypes = {
	taskList: PropTypes.array,
};
```

**常见PropTypes字段：**

1. 常见类型：array、bool、func、number、object、string、symbol
2. React元素类型：element
3. 必填项：isRequired
4. 特定的结构对象：shape({})
5. 更多见官网：https://reactjs.org/docs/typechecking-with-proptypes.html

```javascript
// 举个栗子
MyComponent.propTypes = {
  // 常见类型
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  // 必填项
  requiredFunc: PropTypes.func.isRequired,
  // A React element即React元素类型
  optionalElement: PropTypes.element,
   // 特定形状，特定结构
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
}
```

### props校验之默认值

> 学习目标：学会函数式组件和类组件结合PropTypes来对props设置默认值

**1.函数式组件**

函数式组件很简单，就是在函数接受参数的时候直接设置默认值就好了

```javascript
function List({pageSize = 10}) {
  return (
    <div>
      此处展示props的默认值：{ pageSize }
    </div>
  )
}
List.propTypes = {
	pageSize: PropTypes.number,
};
// 然后在APP.js中 不传入pageSize属性，试试看
<List />
```

**2.类组件**

类组件使用`static defaultProps = {}`声明默认值

```javascript
import PropTypes from "prop-types";
import React from "react";
export default class List extends React.Component {
    // 重要
	static defaultProps = {
		pageSize: 11,
	};
	render() {
		return <div>此处展示props的默认值：{this.props.pageSize}</div>;
	}
}

List.propTypes = {
	pageSize: PropTypes.number,
};

```

### props.children

> 学习目标：理解props.children属性作用，学会使用它

**说在前面：**小菜鸟作者认为这个属性有点像v-slot也就是Vue中的插槽，这个children也很好玩，它可以式很多类型

**props.children是什么？**

实际上是该组件的子节点，只要内部有子节点就会有children属性，如果没有则为undefined；有一个就是object类型；有多个就是array类型

**props.children可以是什么？**

1. 普通文本
2. 普通标签元素
3. 函数
4. JSX
5. 等等

**如何使用？**

**1.类组件**

```javascript
// 还是举个栗子
import React from "react";
class Inner extends React.Component {
	render() {
		return <div>{this.props.children}</div>;
	}
}
export default class Outer extends React.Component {
	render() {
		return (
			<Inner>
				<h2>Hello</h2>
			</Inner>
		);
	}
}
// 记得在App.js中调用Outer组件
```

**2.函数式组件**

```javascript
// 记得接收props
import React from "react";
function Inner(props) {
	return <div>{props.children}</div>;
}
export default function Outer() {
	return (
		<Inner>
			<h2>Hello</h2>
		</Inner>
	);
}
// 记得在App.js中调用Outer组件
```

更多玩法，还可以传递回调函数，JSX等等，后面组件通信也会说明

## React组件通信

### 组件通信的基本方式

> 学习目标：掌握组件通信的方式

**说在前面：**在前面的章节，我想你也应该体会到了`props`的神奇之处，为了更好地讲述组件通信，我特地写了一个章节，让你可以基本可以实现组件通信

- 父传子：使用`props`，一般来说`props`不应该修改，保证安全
- 子传父：使用父组件给子组件传递的回调函数，父组件可以在回调函数中拿到`data`
- 跨组件通信（爷爷辈和孙子辈通信）：`React`可以使用`Context`进行跨组件通信
- 兄弟通信：可以考虑状态提升，比如`App`下有`A`和`B`组件，那么`state`可以定义在`App`中，然后通过`props`进行传递

### 父传子的实现

> 学习目标：能够使用props完成父传子通信

**原理：利用props传递参数**

**步骤：**

- 父组件提供需要传递的数据
- 给子组件标签添加属性，属性值为该数据
- 子组件通过接收`props`进而拿到父组件提供的数据
  - 类组件使用`this.props`获取`props`对象
  - 函数式组件直接通过参数获取`props`对象
- 子组件使用数据

```javascript
// 直接复制到App.js试试看吧，在前面的章节我想你也掌握了
import React from "react";

// 函数式子组件
function FSon(props) {
	console.log(props);
	return (
		<div>
			子组件1
			{props.msg}
		</div>
	);
}

// 类子组件
class CSon extends React.Component {
	render() {
		return (
			<div>
				子组件2
				{this.props.msg}
			</div>
		);
	}
}
// 父组件
class App extends React.Component {
	state = {
		message: "this is message",
	};
	render() {
		return (
			<div>
				父组件
				<FSon msg={this.state.message} />
				<CSon msg={this.state.message} />
			</div>
		);
	}
}

export default App;
```

### 子传父的实现

> 学习目标：学会使用回调函数达到子传父的通信目的

**原理：父组件给子组件传递回调函数，子组件调用**

**实现步骤：**

- 父组件提供一个回调函数，主要用于接受子组件传递过来的数据
- 将函数作为子组件标签的属性值，利用`props`进行传递
- 子组件通过`props`拿到并调用回调函数，此时可以将子组件中的数据作为参数传递给回调函数

```javascript
// 举个栗子咯，复制跑跑看吧
import React from "react";

// 子组件
const Son = (props) => {
	const handleClick = () => {
		// 调用父组件传递过来的回调函数 并注入参数
		props.changeMsg("this is newMessage");
	};
	return (
		<div>
			<button onClick={handleClick}>change</button>
		</div>
	);
};

class App extends React.Component {
	state = {
		message: "this is message",
	};
	// 提供回调函数
	changeMessage = (newMsg) => {
		console.log("子组件传过来的数据:", newMsg);
		this.setState({
			message: newMsg,
		});
	};
	render() {
		return (
			<div>
				<div>父组件</div>
				<h3>{this.state.message}</h3>
				<Son
					// 传递给子组件
					changeMsg={this.changeMessage}
				/>
			</div>
		);
	}
}
export default App;
```

### 跨组件通信的实现

> 学习目标：能够使用Context机制解决跨组件通信的问题

**说在前面：**如果是涉及到爷爷辈和孙子辈的通信，一直使用`props`会不会有些呆呆的？哈哈哈，`React`为我们提供`Context`机制来解决这个问题，一起来看看吧

**原理：使用React已经提供好的Context机制**

**实现步骤：**

1. 利用`createContext()`来创建出Context对象 导出 `Provider `和 `Consumer`对象

   ```js
   const { Provider, Consumer } = createContext()
   ```

2. 使用`Provider`包裹根组件提供数据 

   ```jsx
   <Provider value={this.state.message}>
       {/* 根组件 */}
   </Provider>
   ```

3. 需要用到数据的组件使用`Consumer`包裹获取数据

   ```jsx
   <Consumer >
       {(value) => /* 基于 context 值进行渲染*/}
   </Consumer>
   ```

**还是得举个栗子：**

```javascript
import React, { createContext } from "react";

// 1. 创建Context对象
const { Provider, Consumer } = createContext();

// 2. 提供数据
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "this is message",
		};
	}
	render() {
		return (
			<Provider value={this.state.message}>
				<div className="app">
					<ComA />
				</div>
			</Provider>
		);
	}
}
// 3. 消费数据
const ComA = () => {
	return <ComB />;
};

const ComB = () => {
	return <Consumer>{(value) => <div>{value}</div>}</Consumer>;
};

export default App;
```

Hook版本的`Context`会在后面讲解

### 兄弟组件通信的实现

> 学习目标：学会兄弟组件通信的状态提升思路

**原理： 通过状态提升机制，利用共同的父组件实现兄弟通信**

**实现步骤：**

- 由公共父组件管理这个公共状态（重点）
  - 向子组件提供共享公共状态 

  - 提供操作共享状态的方法

- 要接收数据状态的子组件通过props接收数据

- 要传递数据状态的子组件通过props接收回调函数，调用方法传递数据

```javascript
// 试试看吧~~~
import React from "react";

// 子组件A
const SonA = (props) =>{
	return (
		<div>
			SonA:
			{props.msg}
		</div>
	);
}
// 子组件B
const SonB = (props) => {
	return (
		<div>
			SonB:
			<button onClick={() => props.changeMsg("new message")}>
				changeMsg
			</button>
		</div>
	);
}

// 父组件
class App extends React.Component {
	// 父组件提供状态数据
	state = {
		message: "this is message",
	};
	// 父组件提供修改数据的方法
	changeMsg = (newMsg) => {
		this.setState({
			message: newMsg,
		});
	};
	render() {
		return (
			<div>
				{/* 接收数据的组件 */}
				<SonA msg={this.state.message} />
				{/* 修改数据的组件 */}
				<SonB changeMsg={this.changeMsg} />
			</div>
		);
	}
}

export default App;
```

### 更多

关于React的状态管理工具现在有挺多选择如redux、mobx、recoil等，并不是说谁更好，这个的话可能还是看团队的选择，关于这一些知识点实际上看官方的文档就可以了，今后有机会我也可能会整理出来

## Hook

### Hook概念

> 学习目标：了解Hook的概念

**说在前面：**写了这么多，Hook篇章终于来了！这一篇我想较为详细的跟小伙伴们探讨新时代的Hooks，一起来学习吧~~~

- Hook的本质：**一套能够使函数组件更强大，更灵活的“钩子”**

- 经过前面的学习我们知道，React体系将组件分为**类组件**和**函数式组件**，经过多年实战，React官方认为函数式组件是一个更加匹配React的设计理念 即`UI = f(state)`，数据驱动视图，而先前的函数组件是没有有自己的状态的，为了能让函数组件可以拥有自己的状态，所以从react v16.8.0开始，Hooks应运而生，详细可以见官网

**闲话：**React官方说到为了兼容老版本，class类组件并没有被移除，俩者都可以使用。但我还是建议如果是新的项目尽量使用函数式+Hook，类组件的包袱似乎有点重

### Hook规则

> 学习目标：掌握Hook规则，规则是React定好的，我们只要遵循规则就可以

**参考：**[Hook 规则 – React ](https://react.docschina.org/docs/hooks-rules.html)

1. 要在最顶层使用Hook，不要在循环、条件或者嵌套函数调用Hook，不然可能会出现渲染顺序出错的情况
2. 不要在普通的JS函数中调用Hook，而应该在React函数式组件中使用

### useState

> 学习目标：学会使用useState以及了解useState一些特性

#### 计数器游戏

Hooks梦开始的地方，我们还是来玩一个计数器游戏吧

```javascript
import { useState } from "react";

export default function App() {
    // 使用useState
	const [count, setCount] = useState(0);
	const add = () => {
		setCount(count + 1);
	};
    // 假如是要携带参数需要写成：onClick={()=>add(参数)}形式
	return <button onClick={add}>{count}</button>;
}
```

我们来理顺一下思路：

1. **语法：const [state, setState] = useState(initialState);**
2. 使用useState()，并且传入初始值参数0，而初始值仅仅作用于初次渲染，后续的重新渲染都是返回最后更新的状态
3. 使用useState()解构后得到：[count, setCount]，其中count为状态，setCount为修改状态的方法。setCount它可以接受一个新的state值并将组件的一次重新渲染加入队列中
4. 点击按钮，触发add函数，在add函数中使用setCount来修改count
5. 状态变更，重新渲染视图

#### 关于initialState

`initialState`是惰性的，只会在初次渲染的时候起到作用，另外它还可以是一个函数返回一个值，例如：

```javascript
// 将count初始值设置为1
const [count, setCount] = useState(() => {
	return 1;
});
```

#### 关于useState中的setState

**替换并非合并**

`setState`更新的时候与类组件的`this.setState`不同，`setState`总是替换而非合并，因此，如果需要基于之前的状态来创建新的状态，可以用函数的形式，例如计数器中的：

```javascript
// 每次在原来的状态上加2
setCount((preState) => preState + 2);
```

**拿不到next state？**

`setState`的行为很奇怪，似乎好像是异步的，因为我们不能在当前渲染立即拿到`next state`，关于这一点，有以下特性：

- `setState`在原生事件和setTimeout中实际上都是"同步"的
- `setState `通过一个队列机制实现 `state `更新。当执行 `setState `时，会将需要更新的 `state `合并后放入状态队列，而不会立刻更新` this.state`，队列机制可以高效地批量更新` this.state`，也因此，在一些合成事件和钩子函数以及生命周期函数是像"异步"的行为

官方推荐使用`useRef()`中的`ref`作为一个临时仓库进行存储最新的`state`，或者使用其他临时的变量，这个钩子我会在后面的篇章进行讲解，当然还有其他解决的办法。关于这一点，更深层次的话可能得看源码，这里暂时不会再深入讲解

### useEffect

> 学习目标：了解副作用概念，学会useEffect的使用，学会灵活运用useEffect中的第二参数（依赖数组）

#### 副作用概念

> 学习目标：了解副作用的概念

想要知道什么是副作用还得知道什么是主作用，因为副作用是相对于主作用说的，在React世界里，数据渲染视图就是主作用，除此之外都是副作用（比如，手动修改 DOM，发送网络请求）

**常见的副作用：**

- 手动修改DOM
- 发送网络请求
- Date.now()、Math.random()等不确定性方法
- 或者是在函数体修改函数外变量的值

**闲话：**小菜鸟作者认为副作用具有不确定性，不纯粹性（相对于纯函数来说不纯）

#### 计数器游戏—修改Title

> 学习目标：学会useEffect的使用

由上一节提到，手动修改DOM是副作用，那么现在有一个需求，就是我们点击按钮触发count+1后，`document.title`也要变成对应的次数

```javascript
// 试试看吧~~~
import { useEffect, useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
 
  useEffect(()=>{
    // dom操作
    document.title = `当前已点击了${count}次`
  })
  return (
    <button onClick={() => { setCount(count + 1) }}>{count}</button>
  )
}
```

#### useEffect性能优化

> 学习目标：学会灵活运用useEffect中的第二参数（依赖数组），达到性能优化的作用

```javascript
// 例如这样，仅在组件初始渲染的时候和count更新的时候才会执行
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

#### useEffect其他应用

> 学习目标：学会灵活运用useEffect中的第二参数（依赖数组），和effect返回清理函数

**说在前面：**函数式组件是没有像类组件那样的生命周期的，Hooks为函数式组件提供了类似像生命周期的东西，比如`useState`你可以看成为`constructor`，那么对于`useEffect`，我们也可以灵活运用第二参数去模拟一些生命周期，对于一些不常用的生命周期，大家可以参考官方：[生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

##### 第二参数为空数组

实际上当第二参数为空数组时候，也就意味着没有依赖项，也就是说相当于只会在组件初次挂载后执行，其实相当于`componentDidMount`，是不是很有趣？那么一般来说，我们可以在此处发送**网络请求**

```javascript
// 不可以直接在useEffect的回调函数外层直接包裹 await ，因为异步会导致清理函数无法立即返回
useEffect(() => {
	// 自执行函数
    (async function(){
      const res = await axios.get(url,params)
    }());
}, []);
```

##### 第二参数不传参

如果不传第二个参数，`useEffect `在初次渲染和每次组件重新渲染时，都会执行，会有点像`componentDidUpdate`

```javascript
import { useEffect, useState } from "react";

export default function App() {
	const [count, setCount] = useState(0);
	useEffect(() => {
		console.log("我会在初次组件挂载完成后以及重新渲染时执行");
	});
	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}
```

##### effect返回一个函数

`effect`还可以返回一个函数，主要用于清理垃圾作用，比如清理定时器啥的，这个返回函数行为相当于`componentWillUnmount`

```javascript
// 跑起来看看吧
// 跑起来看看吧
import { useEffect, useState } from "react";
function Foo() {
	useEffect(() => {
		const timerId = setInterval(() => {
			console.log("副作用函数执行了");
		}, 1000);
		// 添加清理副作用函数
		return () => {
			clearInterval(timerId);
		};
	});
	return <div>this is Foo</div>;
}

function App() {
	const [flag, setFlag] = useState(true);
	return (
		<>
			<button onClick={() => setFlag(false)}>click</button>
			{flag ? <Foo /> : null}
		</>
	);
}

export default App;
```

**特别注意：**这里不只是组件销毁时才会执行清除操作，每次重新渲染时也都会执行，不然会容易引起bug，具体参考官网（[为什么每次更新的时候都要运行 Effect](https://react.docschina.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update)）

### useRef

> 学习目标：掌握ref获取组件和普通元素，以及作为临时保存变量的盒子

#### 快速使用

**使用步骤：**

- 导入 `useRef` 函数
- 执行 `useRef` 函数并传入`null`，返回值为一个对象，其内部有一个`current`属性可以存放dom对象（或者组件实例）
- 通过`ref`绑定要获取的元素或者类组件

#### 获取类组件和普通元素

```javascript
// 跑起来看看吧
import React, { useRef, useEffect } from "react";
class Foo extends React.Component {
	render() {
		return <div>this is Foo</div>;
	}
}

function App() {
	const FooRef = useRef(null);
	const h2Ref = useRef(null);
	useEffect(() => {
        // 在控制台中打印
		console.log(FooRef.current);
		console.log(h2Ref.current);
	}, []);
	return (
		<>
			<h2 ref={h2Ref}>this is h2</h2>
			<Foo ref={FooRef}></Foo>
		</>
	);
}

export default App;
```

#### 获取函数式组件

由于函数式组件没有状态，也没有实例，因此仅仅使用`ref`是不够的，还需要一个`forwardRef`包裹一下函数式组件进行转发，也就是向下传递，具体参考官网：[Refs 转发 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/forwarding-refs.html)

```javascript
// 跑起来看看吧
import { useRef, forwardRef, useEffect } from "react";
const Foo = forwardRef((props, ref) => {
	return <div ref={ref}>{props.children}</div>;
});

function App() {
	const ref = useRef(null);
	useEffect(() => {
		console.log(ref.current);
	}, []);
	return (
		<>
			<Foo ref={ref}>hello</Foo>
		</>
	);
}

export default App;
```

我自己也不太喜欢使用`ref`，因为就像是回到了手动操作`DOM`，感觉不优雅，我更喜欢`UI = f (state)`

#### 作为存储变量的盒子

`useRef()`创建出来的就是一个普通JS对象，而 `useRef()` 和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个`ref `对象，当`ref `对象内容发生变化时，`useRef` 并不会通知你。变更 `.current` 属性不会引发组件重新渲染。更多见：[Hook API 索引 – useRef)](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)

```javascript
// 使用useRef()
const boxRef = useRef(/*value*/);
// 储存
boxRef.current = newValue
```

### useContext

> 学习目标：掌握Context使用方法

**说在前面：**在类组件中通信我们就知道了`Context`机制，现在，我们可以学习一下`hook`版本的`useContext`

#### 快速使用

**实现步骤：**

- 使用`createContext` 创建`Context`对象
- 在顶层组件通过`Provider` 提供数据
- 在底层组件通过`useContext`函数获取数据

```javascript
// 直接上代码吧
import { createContext, useContext } from "react";
// 创建Context对象
const Context = createContext();

const Foo = () => {
	return (
		<div>
			Foo: <Bar />
		</div>
	);
};
// 最底层
const Bar = () => {
	// 底层组件通过useContext函数获取数据
	const message = useContext(Context);
	return <div>Bar:{message}</div>;
};

export default function App() {
	return (
		// 顶层组件通过Provider 提供数据
		<Context.Provider value={"this is message"}>
			<div>
				<Foo />
			</div>
		</Context.Provider>
	);
}
```

### 自定义Hook

> 学习目标：学会自定义Hook

**说在前面：**说了好几个`Hook`，我们自己能不能写一个属于自己的`Hook`？当然可以！接下来我们一起来看看实现的思想吧

`Hook`本质上是一个钩子，是一个函数。在实际应用中我们可以抽离出一些重复的逻辑来编写成一个`Hook`，那么对于今后有相关逻辑的需要，直接调用我们自定义好的`Hook`即可，是不是非常棒？

#### 玩法规则

参考官网：[自定义 Hook – React (reactjs.org)](https://zh-hans.reactjs.org/docs/hooks-custom.html)

1. 自定义 Hook 必须以 “`use`” 开头，否则React 将无法自动检查你的 Hook 是否违反了Hooks规则
2. 每次调用`Hook`，它都会获取独立的`state`，你需要知道的是在一个组件中多次调用 `useState` 和 `useEffect`，它们是完全独立的

**现在我提出一个需求：**自定义一个`Hook`，它的功能是接收`key`和`value`，每次修改`value`，的时候都会自动往本地`localStorage`同步一份

**代码实现：**

```javascript
import { useEffect, useState } from 'react'

export function useLocalStorage (key, initialValue) {
  const [message, setMessage] = useState(initialValue)
  // 每次只要message变化 就会自动同步到本地一份
  useEffect(() => {
    window.localStorage.setItem(key, message)
  }, [key,message])
  return [message, setMessage]
} 
```

## 额外的Hook

> 学习目标：学习和了解额外的Hook，有些Hook会在一些特定的场景下使用，你可以不必刻意去学习他们，需要的时候你自然会知道他们，不过小菜鸟作者还是写出来了，如果你很有兴趣的话可以看一看吧~~~

**说在前面：**对于一些额外的`Hook`，一般来说是关于性能优化，对于新人来说不太友好，因为需要了解`React`工作原理和机制，无奈小菜鸟作者实力不足，对于`React`原理也是不太了解，但是我们也要有自信，伟大的思想往往都是简单的，我也会尽量把话说得明白一些

### useReducer

> 学习目标：学会使用useReducer，理解dispatch行为

**说在前面：**`useReducer`是非常有趣的，官方提到它是作为`useState`的替代方案，有一个明显的特点就是提供了配套的`dispatch`方法和`reducer`，如果你听着云里雾里，也没有关系，先接着往下走

还记得`javascript`的数组中的方法`reduce`吗？见MDN：[Array.prototype.reduce() - JavaScript | MDN ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)它可以这么使用

```javascript
// 定义arr
const arr = [1, 2, 3, 4];
// 定义一个reducer 函数
/*
一个 “reducer” 函数，包含四个参数：
1.previousValue：上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 initialValue，其值则为 initialValue，否则为数组索引为 0 的元素 array[0]
2.currentValue：数组中正在处理的元素
3.currentIndex：数组中正在处理的元素的索引
4.array：用于遍历的数组
*/
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 5 + 1 + 2 + 3 + 4
// 5为accumulator初始值
console.log(arr.reduce(reducer,5));
// expected output: 15
```

如果这个例子你能明白了，那么就可以接着往下走，因为`useReducer`和`reduce`是很类似的

#### useReducer的作用

`useReducer` 是 `useState` 的替代方案，在某些场景下，`useReducer` 会比 `useState` 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等

#### useReducer的使用

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。那么这个`reducer`和`initialState`和原生方法`reduce`就是类似的，接下来我将通过一个demo进行讲解

```javascript
//复制看看吧
import React, { useReducer } from "react";

const App = () => {
	const initialState = 0;
	const reducer = (state, action) => {
		switch (action) {
			case "increment":
				return state + 1;
			case "decrement":
				return state - 1;
			case "reset":
				return 0;
			default:
				throw new Error("Unexpected action");
		}
	};
	const [count, dispatch] = useReducer(reducer, initialState);
	return (
		<div>
			{count}
			<button onClick={() => dispatch("increment")}>+1</button>
			<button onClick={() => dispatch("decrement")}>-1</button>
			<button onClick={() => dispatch("reset")}>reset</button>
		</div>
	);
};

export default App;
```

- 首先定义了`initialState`和一个`reducer`函数，在`reducer`函数中`action`只是一个普通的字符串
- 使用`useReducer`并且传入`reducer`函数和`initialState`，那么返回的`state`初始值就是为`initialState`，另外我们还获得了一个其配套的`dispatch`方法
- 点击按钮，通过调用其配套的`dispatch`方法并且传入我们想要的`action`，那么就会调用`reducer`函数，执行此函数然后返回一个新的`state`
- 是不是很有趣？使用**switch-case**能让我们对于不同的`action`就会有不同的结果

接下来我们给这个例子做一个升级，现在我们的`state`变成了一个对象，里面有`count1`和`count2`，并且规定`action.type`作为我们想要去做的行为

```javascript
const initialState = {
  count1: 0,
  count2: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment1':
      return { ...state, count1: state.count1 + 1 };
    case 'decrement1':
      return { ...state, count1: state.count1 - 1 };
    case 'set1':
      return { ...state, count1: action.count };
    case 'increment2':
      return { ...state, count2: state.count2 + 1 };
    case 'decrement2':
      return { ...state, count2: state.count2 - 1 };
    case 'set2':
      return { ...state, count2: action.count };
    default:
      throw new Error('Unexpected action');
  }
};
```

例如：`{ ...state, count1: state.count1 + 1 }`，`...state`其中为展开运算符，可以展开出`count1 `和`count2`，后面的`count1: state.count1 + 1 `可以覆盖前面的`count1`，接下来我将提供完整代码：

```javascript
import React, { useReducer } from "react";

const App = () => {
    // 初始值
	const initialState = {
		count1: 0,
		count2: 0,
	};
    // reducer函数
	const reducer = (state, action) => {
        //action.type为动作类型，这是作者本人约定好的，你也可以用别的
		switch (action.type) {
			case "increment1":
				return { ...state, count1: state.count1 + 1 };
			case "decrement1":
				return { ...state, count1: state.count1 - 1 };
			case "set1":
				return { ...state, count1: action.count };
			case "increment2":
				return { ...state, count2: state.count2 + 1 };
			case "decrement2":
				return { ...state, count2: state.count2 - 1 };
			case "set2":
				return { ...state, count2: action.count };
			default:
				throw new Error("Unexpected action");
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<>
			<div>
				{state.count1}
				<button onClick={() => dispatch({ type: "increment1" })}>
					+1
				</button>
				<button onClick={() => dispatch({ type: "decrement1" })}>
					-1
				</button>
				<button onClick={() => dispatch({ type: "set1", count: 0 })}>
					reset
				</button>
			</div>
			<div>
				{state.count2}
				<button onClick={() => dispatch({ type: "increment2" })}>
					+1
				</button>
				<button onClick={() => dispatch({ type: "decrement2" })}>
					-1
				</button>
				<button onClick={() => dispatch({ type: "set2", count: 0 })}>
					reset
				</button>
			</div>
		</>
	);
};

export default App;
```

- 他们都共用了一套`reducer`方法，也都是通过`dispatch`调用，不过传参的时候是不同的`action`，因此也会有着不同的结果
- 其实`useReducer`还可以搭配`useContext`模拟一个状态管理工具，这是挺有趣的，感兴趣的话可以搜索其他文章，这里不再过多说明

### useCallback

> 学习目标：理解缓存，理解为什么要用useCallback，以及会使用useCallback

**说在前面：**在说`useCallback`之前，我想分享一个之前没有提到的点。在React中，有一个公式，`UI = Componnet(props,state)`，也就是说，只要`state`或者`props`的任意一个值的改变都会引起重新渲染。那么为了避免**重复渲染**的问题，我们是不是可以通过**缓存**来解决呀？我们想要的是，只有依赖的变量变化时才重新渲染！

#### useCallback的作用

`useCallback`通常会作为性能优化的手段，`useCallback`**主要是用来用于优化子组件的，防止子组件的重复渲染**

#### useCallback的使用

根据官网：[Hook API 索引 – useCallback](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback)

```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
// useCallback返回 该回调函数的 memoized 版本
```

小菜鸟作者的理解：在`a`和`b`的值不变的的情况下，引用`memoizedCallback`的值就不会变，那么这个`memoized `版本的回调函数就可以被缓存，从而达到渲染性能优化的目的！！！

还记得计数器吗？不记得也没有关系，我们看这一行：

```javascript
const add = () => setCount((count) => count + 1);
```

我们知道，每次`App`组件渲染的时，这个`add`函数都是重新创建的一个函数，假设重新渲染前的`add`函数叫`preAdd`，重新渲染之后的`add`函数叫做`afterAdd`，那么显然`preAdd`不等于`afterAdd`，那么有什么问题呢？

**问题就是：**当我们将`add`函数作为`props`传递给子组件时候，会导致像`PureComponent`、`shouldComponentUpdate`、`React.memo`等相关优化失效（因为每次都是不同的函数）

**补充：**`React.memo`和`PureComponent`的作用一样，通过浅比较`props`和`state`是否变化来决定重新渲染组件，主要用于**纯展示组件**上

**使用场景：**父组件将一个**方法**传递给子组件，当父组件的其他状态发生改变时，子组件也会跟着**重新渲染**，`useCallback`能将父组件传递下来的**函数缓存起来**，只有`useCallback`的**第二个参数改变**时，才会**重新创建函数实例**

```javascript
import React, { useState, useCallback } from "react";
// 子组件
// 使用React.memo包裹一下吧~~~
const AotherComponent = React.memo(function AotherComponent({ onClick }) {
	console.log("AotherComponent 组件渲染");
	return <button onClick={onClick}>AotherComponent - add Count</button>;
});

function App() {
	const [count, setCount] = useState(0);

	const add = () => setCount((count) => count + 1);
	return (
		<div>
			<div>Count is {count}</div>
			<br />
			<div>
				<button onClick={add}>APP - add Count</button>
			</div>
			<AotherComponent onClick={add} />
		</div>
	);
}
export default App;
```

复制上面的代码，然后分别点击`APP - add Count`和`AotherComponent - add Count`就会发现控制台输出`AotherComponent 组件渲染`说明这个时候有着重复渲染的问题，因为`add`函数每次重新渲染都会不同，这个时候可以使用`useCallback`进行包裹

```javascript
// 修改一下吧
const add = useCallback(() => setCount((count) => count + 1), []);
```

第二参数依赖项（deps）为空数组时，也就意味着这个函数在组件的生成周期内会永久缓存。经过包裹后，再次点击，就发现`AotherComponent `就不会重复渲染了。芜湖！成功啦！

### useMemo

> 学习目标：了解useMemo的使用场景，学会useMemo的使用，能与useCallback进行比较

**说在前面：**大家可以放心，如果你掌握了`useCallback`这个武器，那么对于`useMemo`，我相信你也你能很快就能掌握，官网也有提到**useCallback(fn, deps)**` 相当于 `**useMemo(() => fn, deps)**，即使是源码也是极其的相似，只有一两行不同，大家有兴趣可以看看

#### useMemo的作用

当前组件内有**开销很大**的函数计算，此时可以用`useMemo`

#### useMemo的使用

根据官网：[Hook API 索引 – useMemo](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- 把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算
- 第一个参数为一个函数，函数的返回值作为缓存值
- 第二个参数为一个数组，存放当前`useMemo `的依赖项
- 如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值
- 有点像vue中的computed

```javascript
import React, { useMemo, useState } from "react";

function App() {
	const [count, setCount] = useState(0);
	const [bool, setBool] = useState(true);
	useMemo(() => {
		new Array(count).fill("");
		console.log("count变化了,创建了新的数组");
	}, [count]);

	return (
		<div>
			<div>{count}</div>
			<div>Bool is {bool ? "true" : "false"}</div>
			<button onClick={() => setCount(count + 1)}>+1</button>
			<button onClick={() => setBool(!bool)}>取反</button>
		</div>
	);
}

export default App;
```

点击`+1`，控制台就会输出`"count变化了,创建了新的数组"`，点击`取反`并没有这个现象，说明我们成功了！

### useId

> 学习目标：理解useId的作用，能够使用useId

**说在前面：**要理解`useId`的作用之前可能得和你一起学习一下服务端渲染（SSR）流程，在服务端，我们会将 React 组件渲染成为一个字符串，这个过程叫做脱水（dehydrate），字符串以 html 的形式传送给客户端，作为首屏直出的内容。到了客户端之后，React 还需要对该组件重新激活，用于参与新的渲染更新等过程中，这个过程叫做注水（hydrate）。但是，这里就会有一个小问题。如果当前组件已经在服务端渲染过了，但是在客户端我们并没有什么手段知道这个事情，于是客户端还会重新再渲染一次，这样就造成了冗余的渲染。

#### useId的作用

那么，`useId`就是是一个用于生成横跨服务端和客户端的稳定的唯一 ID(（身份），避免冗余的渲染

#### useId的使用

```javascript
import { useId } from "react";
export default function App() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>你喜不喜欢吃肉肉?</label>
      <input id={id} type="checkbox" name="likeMeat"/>
    </>
  );
};
```

**特别地**，如果在同一个组件中，我们就可能就需要多个id，那么请不要重复使用`useId`，而是基于一个id衍生出新的id，例如加上字符串就可以，就像这样啦

```javascript
import { useId } from "react";
export default function App() {
	const id = useId();
	return (
		<div>
			<label htmlFor={id + "-firstName"}>First Name</label>
			<div>
				<input id={id + "-firstName"} type="text" />
			</div>
			<label htmlFor={id + "-lastName"}>Last Name</label>
			<div>
				<input id={id + "-lastName"} type="text" />
			</div>
		</div>
	);
}
```

### 更多

对于额外的hook，我觉得还是得参考官网，暂时先写这么多。

## 结语

这篇文章于入职第一周内完成，边学边写，期间翻阅了很多资料，也得到了同事大佬们的帮助，感激不尽！文章有不足之处还望批评指正！对于React世界，本人还是不够了解，只是浮于表面，那就只能继续探索，未来的日子一起努力吧！



希望你能够保持对世界的好奇心~