# React

## hooks问题

### useState是同步还是异步？

`useState`更新没有合并，是替换，`useState`执行最后一次更新操作，而更新是浅比较的，更新某个复杂类型数据时只要它的引用地址没变，那就不会重新渲染组件

同步和异步的问题还是得看`React`版本

- 如果是`React18`那就是在所有地方的表现都是异步的
- 如果是`React18`之前的版本，在原生事件和`setTimeout`、`Promise.then`中都是同步的，多次调用`setState`会立即更新`state`结果也就会立即调用`render`；在`React`合成事件以及生命周期中是异步的，多次调用`setState`只会调用一次`render`

## JSX

### 原理

全称为`JavaScript XML`，本质上是`React.creatElement`的语法糖

### 工作过程

1. `JSX`代码 
2. `bable`进行编译成使用`React.createElement`方法
3. 转化为虚拟`DOM`，也就是`JS对象`
4. 调用`ReactDOM.render()函数`进行渲染
5. 转化为真实`DOM`元素最后插入页面

```javascript
import React from 'react';   
// 下面的代码没有用到React对象，也要将其import进来
// 因为使用了JSX隐式调用了`React.createElement`方法
import ReactDOM from 'react-dom';

ReactDOM.render( <App />, document.getElementById( 'root' ) );
```

