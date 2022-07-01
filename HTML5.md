## HTML5

### 新增内容

- 语义化标签
- 视频和音频
- Canvas绘图
- Svg绘图
- 地理定位
- 推拽
- webSocket
- ......

### 语义化标签

![](http://songnian.gitee.io/imgs/imgs/HTML5语义化标签.png)

- 优点是使得标签更有语义化，能更清楚地表达文档结构，提高代码的可读性
- 更易于SEO

### 块元素 行内元素 行内块元素

#### 块元素

每个块级元素通常都会独占一行或者是多行，可以设置宽高以及margin、padding等属性。常见的块级元素有<div/>、<h1>到<h6> 、<p>、<ul>和<ol>、<li>等

#### 行内元素

行内元素只会占据他的边框以内的空间，可以多个行内元素一起在一行，不可以设置宽高。常见的行内元素有：

<i>、<span>、<a>、<strong>等

#### 行内块元素

行内块元素既有块元素的特性，如可以设置宽高和margin、padding等属性；也有行内元素的特性，如可以多个行内块元素一起在一行。常见的有<imput>、<img>

### 引入CSS方式

#### 行内样式

> 所谓行内样式就是直接在标签中直接写样式

```css
<div style="background: red"></div>
```

#### 内部样式

> 所谓内部样式就是在<head>标签中写一个<style>标签

```html
<head>
	<!-- 省略 -->
    <style>
        <!-- 样式 -->
    </style>
</head>
```

#### 外部样式（重要）

> 所谓外部样式就是一般在<head>中用<link>引入外部的`css`文件

```html
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

#### 导入方式

> 所谓导入方式就是在一个`css`文件中用`@import`导入另外一个`css`文件

```html
<style>
    @import url(‘路径’);
</style>
```

