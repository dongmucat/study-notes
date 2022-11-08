# CSS

## 基础篇

### 布局单位

- **px**为逻辑像素，它是一种相对长度单位，是相对于显示器屏幕分辨率而言的

- **%**：一般认为子元素的百分比是相对与上一级的父元素，可以实现响应式的效果
- **em/rem**：两者都是相对长度单位，相对于`font-size`的倍数，`em`相对于父元素，`rem`相对于根元素`html`
- **vw/wh**：两者都是与视口窗口有关的单位，`vw`表示相对于视图窗口的宽度，`vh`表示相对于视图窗口高度，另外`vmin`代表`vh`和`vw`中的较小值，`vmax`代表`vh`和`vw`中的较大值

### 盒模型

> 盒模型都是由四个部分组成的，分别是`margin`、`border`、`padding`、`content`

- **标准盒模型：**`width`和`height`属性的范围只包括了`content`
- **IE盒模型（怪异盒模型）：**`width`和`height`属性的范围包括了`border`、`padding`和`content`

- `box-sizeing`: `content-box`表示标准盒模型（默认值）
- `box-sizeing`: `border-box`表示IE盒模型（怪异盒模型）

### BFC

> `BFC`是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。`BFC`可以解决高度塌陷，外边距重叠，清除浮动问题，`BFC`可以看做是一个`CSS`元素属性

#### 触发BFC条件

- overflow: hidden
- display: inline-block
- position: absolute
- position: fixed
- display: table-cell
- display: flex

#### BFC规则

- `BFC`就是一个块级元素，块级元素会独自占用一行
- `BFC`就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
- 垂直方向的距离由`margin`决定， 属于同一个`BFC`的两个相邻的标签外边距会发生重叠
- 计算`BFC`的高度时，浮动元素也参与计算

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

### 伪类和伪元素

> 伪类是操作文档中已有的元素，而伪元素则是创建了一个不在文档树中的元素，并为其添加样式

- 伪类主要用于描述元素特殊情况和效果，伪类分为状态伪类和结构性伪类，如`:link,:hover`都是状态伪类，`:nth-child，:first-child,:last-child`都是结构性伪类，伪类的操作对象是`DOM`树已有的元素
- 伪元素是不存在于`DOM`树中的虚拟元素，它可以像正常的`DOM`元素一样设置内容和样式。比如`::before，::after`都是伪元素。但是伪元素并不是`DOM`元素，一般来说无法被js直接操作。但是我们可以通过比较的hack方法更改，比如使用CSSStyleSheet的insertRule来为伪元素修改样式
- 伪类都伪元素都可以使用单冒号，但是写法上推荐伪类使用单冒号，而伪元素使用双冒号，兼容性的事可以交给例如`postcss`去做比较好

### CSS3新增内容

- 新增了选择器，属性选择器，结构伪类选择器等
- `border-radius`
- 颜色，比如`rgba(),hsla(),opacity属性`
- `transform`变换移位
- `transiton`过渡
- `animation`动画
- `flex`
- 媒体查询

## Flex布局

### 基本概念

> 采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”

![](http://songnian.gitee.io/imgs/imgs/flex坐标轴.png)

容器默认存在两根轴，一根是横轴主轴`main axis`，一根是纵轴交叉轴`cross axis`

### 容器的属性

#### flex-direction

> flex-direction属性决定主轴的方向（即项目的排列方向）

```css
.box {
  flex-direction: column | column-reverse | row | row-reverse ;
}
```

![](http://songnian.gitee.io/imgs/imgs/flex-direction.png)

- row（默认值）：主轴为水平方向，起点在左端
- row-reverse：主轴为水平方向，起点在右端
- column：主轴为垂直方向，起点在上沿
- column-reverse：主轴为垂直方向，起点在下沿

#### flex-wrap

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- nowrap（默认）：不换行
- wrap：换行，第一行在上方
- wrap-reverse：换行，第一行在下方

#### flex-flow

> flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap

```css
.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

#### justify-content

> justify-content属性定义了项目在**主轴**上的对齐方式

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![](http://songnian.gitee.io/imgs/imgs/justify-content.png)

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

#### align-items

> align-items属性定义项目在**交叉轴**上如何对齐

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![](http://songnian.gitee.io/imgs/imgs/align-items.png)

- flex-start：交叉轴的起点对齐
- flex-end：交叉轴的终点对齐
- center：交叉轴的中点对齐
- baseline: 项目的第一行文字的基线对齐
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度

#### align-content

> align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

![](http://songnian.gitee.io/imgs/imgs/align-content.png)

- flex-start：与交叉轴的起点对齐
- flex-end：与交叉轴的终点对齐
- center：与交叉轴的中点对齐
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
- stretch（默认值）：轴线占满整个交叉轴

### 项目的属性

#### order

> order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0

#### flex-grow

> flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

![](http://songnian.gitee.io/imgs/imgs/flex-grow.png)

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

#### flex-shrink

> flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

![](http://songnian.gitee.io/imgs/imgs/flex-shrink.jpg)

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。负值对该属性无效。

#### flex-basis

> flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

#### flex

> flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

#### align-self

> align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![](http://songnian.gitee.io/imgs/imgs/align-self.png)

该属性可能取6个值，除了`auto`，其他都与`align-items`属性完全一致

## position布局

### static

`static`是默认值，就是没有定位，元素处于正常的文档流

### relative

`relative `是相对定位，元素不会脱离文档流，元素会相对于原本自己的位置进行移动

### absolute

`absolute `是绝对定位，元素会脱离文档流。它会相对于最近设置有定位的父元素进行移动；如果没有，则会相对于`body`元素进行移动定位

### fixed

`fixed `是一种特殊的绝对定位，也会脱离文档流，只不过 `fixed `的元素是固定相对与 `body `来定位的

### inherit

`inherit`用于继承父元素的`position`的值

### sticky

`sticky`是粘性定位，可以说是相对定位`relative `和固定定位`fixed `的结合体，元素在跨越特定值之前被认为是相对定位，之后可以认为是固定定位，而且必须指定top、bottom、left、right4个值之一，否则只会处于相对定位