## 前言

`React`状态库太多了，不知道用哪个？回想起来有`Redux`、`MobX`，这篇我想和你分享一下爽到起飞的`Recoil`

## Recoil介绍

### Recoil是什么

> 学习目标：了解Recoil是什么？

`Recoil`官网：[Recoil](https://recoiljs.org/zh-hans/docs/introduction/getting-started)

`Recoil`是`Facebook`推出的一个专门针对`React`的状态管理库，`Recoil`的全部 `API `都是以`Hook`方式提供，使用起来非常方便，可以大大降低学习成本。还有一点，它只支持函数式组件，对于类组件可能要说拜拜了

### Recoil的特点

> 学习目标：了解Recoil的优势特点

**说在前面：**在学习`React`之后我们知道，可以使用`React`内置的`Context`机制+状态提升+（`useReducer`）来进行全局状态管理，但是这样的话会有一些毛病，例如：组件间的状态共享只能通过将`state `提升至它们的公共祖先来实现，但这样做可能导致重新渲染一颗巨大的组件树等等。。。。。。`Recoil`可以改善这些问题！

**特点有哪些？**

- 只支持`Hook`方式，使用风格和`React `完全一致，没有新的语法学习负担
- 推崇状态分散管理，推崇`Minimal`，也就是最小粒度化，
- 状态的定义是渐进式和分布式的，可以对代码进行分割
- 支持`Concurrent Mode`（这个不了解也没事，先不用理会）

## Recoil快速使用

### 环境初始化

推荐使用`React`官方提供的脚手架创建项目，如果你看过我之前的`React`快速上手就应该还有着`my-app`项目

```
npx create-react-app my-app // my-app是我们的项目名字
cd my-app // 进入项目
npm start // 启动！！！React来哩
```

### 目录调整

首先删除多余的文件，剩个**App.js**和**index.js**就可以了

然后在新的项目中**新添加**如下文件和文件夹：

- src
  - components
    - TextInput.js
    - CharCount.js
  - store
    - index.js

### 安装Recoil

```bash
npm install recoil
# 或者
yarn add recoil
```

### RecoilRoot（状态作用域）

首先是引入`RecoilRoot`并将其放在根组件的位置（也可以放在其他父组件位置上），是不是很像`Context`?没错，底层也是这么实现的

```javascript
import { RecoilRoot } from 'recoil';
export default function App() {
  return (
    <RecoilRoot>
      <你的组件 />
    </RecoilRoot>
  );
}
```

### atom（定义数据）

一个 **atom** 代表一个**状态**。`atom `可在任意组件中进行读写。读取`atom `值的组件隐式订阅了该`atom`，因此任何`atom `的更新都将致使使用对应`atom `的组件重新渲染

接下来，在**store/index.js**中添加如下代码

```javascript
import { atom } from "recoil";
export const textState = atom({
	key: "textState", // unique ID (with respect to other atoms/selectors)
	default: "", // default value (aka initial value)
});
```

### useRecoilState（类似useState）

`useRecoilState`可以把它当作`useState`使用，它接收一个atom state，然后返回一个[state,setState]，类似：

```javascript
const [text, setText] = useRecoilState(textState);
```

在**components/TextInput.js**中添加如下代码：

```javascript
import { useRecoilState } from "recoil";
import { textState } from "../store";
export default function TextInput() {
	const [text, setText] = useRecoilState(textState);

	const onChange = (e) => {
		setText(e.target.value);
	};

	return (
		<div>
			<input type="text" onChange={onChange} />
			<br />
			Echo: {text}
		</div>
	);
}
```

然后在**App组件**中引用**TextInput组件**

```javascript
import TextInput from "./components/TextInput";
import { RecoilRoot } from "recoil";

export default function App() {
	return (
		<RecoilRoot>
			<TextInput/>
		</RecoilRoot>
	);
}
```

然后我们对`input`框进行输入的时候，Echo也会出现对应的值，我们就初步完成了公共状态的读和写！使用起来是不是很简单？

### selector（派生）

仅仅靠这些还不够，有时候我们想基于一个状态的派生出其他的状态，那么我们可以使用`recoil`给我们提供的`selector`，这个有点像`Vue`中的`computed`，或者有点像`react`中的`useMemo`。一起来看看吧

在**store/index.js**中添加如下代码：

```javascript
import { atom, selector } from "recoil";
export const charCountState = selector({
	key: "charCountState", // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		const text = get(textState);
		// 返回字符串的长度
		return text.length;
	},
});
```

这里在定义`selector`的时候只设置了`get`而没有设置`set`，因此这个`selector`是只读的，小菜鸟作者不建议设置`set`，如果你想设置，可以参考官网~

### useRecoilValue（读取状态值）

`useRecoilValue(state)`可以返回给定`Recoil state`的值，当你只是读取数据的时候就可以使用它，使用此`hook `会使组件隐式地订阅给定的`state`，我们利用它可以来读取刚才由`selector`派生的值

在**components/CharCount.js**中添加如下代码：

```javascript
import { useRecoilValue } from "recoil";
import { charCountState } from "../store";
export default function CharCount() {
	const count = useRecoilValue(charCountState);
	return <>Char Count: {count}</>;
}
```

在**App组件**中引用这个组件：

```javascript
import TextInput from "./components/TextInput";
import CharCount from "./components/CharCount";
import { RecoilRoot } from "recoil";

export default function App() {
	return (
		<RecoilRoot>
			<TextInput/>
      		<CharCount/>
		</RecoilRoot>
	);
}
```

接下来我们在`input`框输入数据，可以看到`Echo`会有相应的数据，并且`Char Count`会输出数据（字符串）的长度，OK~你大致学会了`Recoil`的核心`API`是怎样使用的。接下来我还会再介绍一个`API`

### useSetRecoilState（修改状态）

`useSetRecoilState` 可以仅获取**写函数**，当你只想改变数据的时候可以使用它，它有一个特点是数据流的变化不会导致组件重新渲染，因为 `useSetRecoilState` 仅写不读

我们可以稍微修改一下**TextInput**组件，让它只是更改数据，因此我们可以在**components/TextInput.js**添加如下代码：

```javascript
import { useSetRecoilState } from "recoil";
import { textState } from "../store";
export default function TextInput() {
	const setText = useSetRecoilState(textState);

	const onChange = (e) => {
		setText(e.target.value);
	};

	return (
		<div>
			<input type="text" onChange={onChange} />
			<br />
		</div>
	);
}
```

当我们在`input`框输入的时候，就可以看到效果啦

## 结语

小菜鸟作者只是写了一些`DEMO`和常用的的`API`，更多的还是见`Recoil`官网：[Recoil](https://recoiljs.org/zh-hans/docs/introduction/getting-started)🤭