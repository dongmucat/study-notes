# Pinia快速上手

## 简介

[Pinia](https://pinia.vuejs.org/zh/)一个全新的状态管理库，是`Vuex`的替代者，有以下优势：

- [x] `Vue2`和`Vue3`都支持，并且支持`TypeScript`:sparkles:
- [x] 抛弃 `Mutation` ，只有 `state, getter` 和 `action` ，简化状态管理库:sparkles:
- [x] 具有`Option Api`模式也具有`Compositon Api`模式:sparkles:
- [x] 非常`nice`的代码自动分割:sparkles:
- [x] 体积小只有1~2kb左右:sparkles:

## 快速开始

> Option Api，适合入门:yum:

### 安装

可以用自己喜欢的包管理器下载，我这里使用`pnpm`:yum:

```bash
# 使用npm
npm i pinia
# 使用yarn
yarn add pinia
# 使用pnpm
pnpm add pinia
```

### 挂载

如果您使用的是`Vue3`可以创建一个`pinia`并将其传递给应用程序：

```ts
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
```

如果您使用的是`Vue2`，则还需要一个插件`PiniaVuePlugin`：

```ts
// 其他...
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // 其他...
  // 一个 `pinia` 实例可以在多个 Vue 应用程序中使用
  // 同一个页面
  pinia,
})
```

### 创建store

请您在`src`下创建`stores`文件夹，随后创建`counter.ts`或者为`counter.js`，添加如下内容：

```ts
// src/stores/counter.ts
import { defineStore } from "pinia";

// 使用options API模式定义
export const useCounterStore = defineStore("counter", {
  // 定义state，就是状态/数据
  state: () => {
    return {
      count: 0,
    };
  },
  // getters相当于计算属性computed
  getters: {
    doubleCount: (state) => {
      return state.count * 2;
    },
  },
  // actions支持同步和异步
  actions: {
    increment() {
      this.count++
    },
  },
});
```

### 使用store

我们可以任意一个组件使用，为了方便，我这边在`App.vue`中直接使用：

```vue
<!-- src/App.vue -->
<script setup lang="ts">
    
import { useCounterStore } from "./stores/counter";

const counter = useCounterStore();

// ES解构，不具有响应性！！！！
const { count, doubleCount } = counter;

const increment = () => {
  counter.increment();
};
    
</script>

<template>
  <div>count的值为：{{ count }}</div>
  <div>count值的双倍为：{{ doubleCount }}</div>
  <button @click="increment">+1</button>
  <!-- <MyChild /> -->
</template>

<style scoped lang="less"></style>

```

您可能会发现，当点击按钮的时候，视图上的数据并不能更新:sweat_smile:，但实际上`count`已经增加了。对于此，我们可以使用`storeToRefs`让他具有响应性：

```vue
<!-- src/App.vue -->
<script setup lang="ts">
// 其他...  
import { storeToRefs } from "pinia";
// 其他... 
const { count, doubleCount } = storeToRefs(counter);
// 其他...    
</script>
```

当你再次点击`+1`按钮的时候就会发现视图也会更新了:yum:

### 定义state

故名思意，`state`就是用于定义状态的，推荐使用`箭头函数`返回一个对象：

```ts
// src/stores/counter.ts

// 使用Options Api模式定义
export const useCounterStore = defineStore("counter", {
  // 定义state，就是状态/数据
  state: () => {
    return {
      count: 0,
    };
  },
});
```

### 访问state

访问`state`非常简单，你可以使用解构，也可以使用`.`运算符访问：

```ts
// src/App.vue

import { useCounterStore } from "./stores/counter";

const counter = useCounterStore();

// ES解构，不具有响应性！！！！
const { count, doubleCount } = counter;
// 或者直接使用counter.count
```

### 定义getter

`getter`相当于`computed`属性，一般用于定义`state`的派生值，即使是多次使用也只会调用一次：

```ts
// src/stores/counter.ts 

getters: {
    // 函数会就接收state对象，我们可以对state的某些属性值进行衍生
    doubleCount: (state) => {
      return state.count * 2;
    },
  },
```

### 修改state

- 简单使用下，我们可以通过实例直接对它进行修改：

```ts
// src/App.vue

const counter = useCounterStore();
counter.count++;
```

- 需要替换的时候，可以设置一个新对象来替换整个`counter`的`$state`

```ts
// src/App.vue

const counter = useCounterStore();
counter.$state = {count:999}
```

- 使用`$patch`方法，`$patch` 方法可以接受两个类型的参数，`对象`和`函数`：

```ts
// src/App.vue

const counter = useCounterStore();
// $patch + 对象 的形式
const increment = () => {
  counter.$patch({
    count: counter.count + 1,
  });
};

// 或者： $patch + 函数 的形式，函数可以接收到state
const increment_2 = () => {
  counter.$patch((state) => {
    return {
      count: state.count + 1,
    };
  });
};
```

- 使用`action`进行修改，比较推荐使用，说明如下：

```ts
// src/stores/counter.ts 

// 支持同步也支持异步
actions: {
    // 增加increment方法，其中 `this` 代指 `state`
    increment() {
      this.count++;
    },
  },
```

当我们需要调用的时候使用`store.方法名`：

```ts
// src/App.vue

const counter = useCounterStore();
const increment = () => {
  counter.increment();
};
```

- 有些时候我们可能需要重置`state`，对于`Option Api`模式来说，可以使用`$reset`方法进行重置：

```ts
// src/App.vue

const counter = useCounterStore();
counter.$reset()
```

## 其他模式

> Compositon Api模式

让我们先回顾一下`Option Api`模式的写法：

```ts
// src/stores/counter.ts
import { defineStore } from "pinia";

// 使用Options Api模式定义
export const useCounterStore = defineStore("counter", {
  // 定义state，就是状态/数据
  state: () => {
    return {
      count: 0,
    };
  },
  // getters相当于计算属性computed
  getters: {
    doubleCount: (state) => {
      return state.count * 2;
    },
  },
  // actions支持同步和异步
  actions: {
    increment() {
      this.count++
    },
  },
});
```

在这里，我们直接给出结果:satisfied:：

- `Option Api`的`state`相当于`Compositon Api`的`ref`、`reactive`定义的变量
- `Option Api`的`getter`相当于`Compositon Api`的`computed`
- `Option Api`的`action`相当于`Compositon Api`的`function`

我们可以得到如下代码:yum:：

```ts
// src/stores/counter.ts
import { ref, computed } from "vue";
import { defineStore } from "pinia";
// 使用Compositon Api模式定义
export const useCounterStore = defineStore("counter", () => {
  // 相当于state
  const count = ref<number>(0);
    
  const doubleCount = computed(() => count.value * 2);
    
  const increment = () => {
    count.value++;
  };

  return { count, doubleCount, increment };
});
```

这样的书写方式跟我们平常写`Compositon Api`没有什么区别，但是这个写法也是有缺陷的，因为会不支持某些内置方法（例如`$reset()`），如果您想重置`state`，那么就需要重写`reset`方法，例如：

```ts
// 使用Composition Api模式
export const useCounterStore = defineStore('counter', () => {
  // 初始状态
  const initState = {
    count: 1
  };

  const count = ref<number>(initState.count);
    
  const doubleCount = computed(() => count.value * 2);
    
  function increment() {
    count.value++;
  }

  // 重写reset
  function reset() {
    count.value = initState.count;
  }

  return { count, doubleCount, increment, reset };
});
```

到底用哪一种呢？其实我也说不好，具体情况看团队如何规定吧。

## 最后

本篇文章主要用于快速学习`Pinia`，做了一份简单的总结，更多的玩法还要查阅更多的资料。

