# CSS布局

## 基础篇

### 布局单位

- **px：**为逻辑像素，它是一种相对长度单位，是相对于显示器屏幕分辨率而言的

- **%：**一般认为子元素的百分比是相对与上一级的父元素，可以实现响应式的效果
- **em/rem：**两者都是相对长度单位，相对于`font-size`的倍数，`em`相对于父元素，`rem`相对于根元素`html`
- **vw/wh：**两者都是与视口窗口有关的单位，`vw`表示相对于视图窗口的宽度，`vh`表示相对于视图窗口高度，另外`vmin`代表`vh`和`vw`中的较小值，`vmax`代表`vh`和`vw`中的较大值

### 盒模型

> 盒模型都是由四个部分组成的，分别是`margin`、`border`、`padding`、`content`

- **标准盒模型：**`width`和`height`属性的范围只包括了`content`
- **IE盒模型（怪异盒模型）：**`width`和`height`属性的范围包括了`border`、`padding`和`content`

- `box-sizeing`: `content-box`表示标准盒模型（默认值）
- `box-sizeing`: `border-box`表示IE盒模型（怪异盒模型）

### 选择器

- id选择器：权重为100

- 类选择器：权重为10

- 属性选择器：权重为10

  ```css
  a[target] {
    background-color: yellow;
  }
  //会将带有target属性的a元素的背景设置成红色
  ```

- 伪类选择器：分类静态伪类选择器和动态伪类选择器，权重为10

- 标签选择器：权重为1

- 伪元素选择器：权重为1

- 相邻兄弟选择器：权重为0

  ```html
  <!DOCTYPE HTML>
  <html>
  <head>
  <style type="text/css">
  li + li {font-weight:bold;}
  </style>
  </head>
  
  <body>
  <div>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ul>
    <ol>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ol>
  </div>
  </body>
  </html>
  ```

  如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器，上述选择器只会把列表中的第二个和第三个列表项变为粗体。第一个列表项不受影响

- 子元素选择器：权重为0

- 后代选择器：权重为0

- 通配选择器：权重为0

