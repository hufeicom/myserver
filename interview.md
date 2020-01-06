## html


请解释 `<script>`、`<script async>` 和 `<script defer>` 的区别


## CSS
1. 什么情况下，用translate()而不用绝对定位？什么时候，情况相反。
> translate()是transform的一个值。改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。而改变绝对定位会触发重新布局，进而触发重绘和复合。transform使浏览器为元素创建一个 GPU 图层，但改变绝对定位会使用到 CPU。 因此translate()更高效，可以缩短平滑动画的绘制时间。
>
>当使用translate()时，元素仍然占据其原始空间（有点像position：relative），这与改变绝对定位不同。


## JS


### 1. 输出结果
```js
var a = 1;
function b() {
    a = 10;
    return;

    function a() {}
}
b();
alert(a);
```
### 1. 判断一个对象是否为空（{}） 的方法有哪些?
for...in, Object.keys, Object.values, Object.entries, Object.getOwnPropertyNames, 
JSON.stringify-> toJSON-> toString, valueof

### 2. Proxy可以实现什么功能？ 能否简单写一下。 与Reflect有什么区别？
响应式，Mock，

### 2. ['1', '2', '3'].map(parseInt)返回结果 
[1, NaN, NaN ]

### 2. `(!+[[]][0] + [] + ![]).length` 输出结果？

### 3. Array.prototype.indexOf 与 Array.includes有什么区别？
```js
const arr = [NaN, +0, -0,,];
arr.indexOf(NaN); // -1
arr.indexOf(undefined); // -1
arr.indexOf(0); // 1
arr.indexOf(-0); // 1

arr.includes(NaN); // true
arr.includes(undefined); // true
```

### 将数组const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10] 扁平化/去重/排序，性能如何？
```js
const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
function one(s) {
    return Array.from(new Set(s.flat(Infinity))).sort((a, b) => a - b)
}

function two(s) {
    return Array.from(new Set(s.toString().split(","))).sort((a, b) => a - b).map(Number)
}

function three(s) {
    function unique(a) {
        return a.filter((item, index) => {
            return a.indexOf(item) === index
        })
    }
    return unique(s.toString().split(",")).sort((a, b) => a - b).map(Number)
};
```
### 3. 说说promise有什么不完美的地方？ 对应的解决方案？
多层then的问题，无法中止，无法捕捉异常
generator， generator的优缺点
async/await
单线程

```js
functions async(generator){
    let iterator = generator();

    function handle(iteratorResult){
        if(iteratorResult.done) return ;
        
        const iteratorValue = iteratorResulte.value;

        if(iteratorValue instanceof Promise){
            iteratorValue.then(res => handle(iterator.next(res))).catch( err=>iterator.throw(err));
        }
    }

    try {
        handle( iterator.next());
    } catch(e){
        iterator.throw(e)
    }
}
```




## web
1. 在css3中要使元素由一种样式转换成另一种样式，为元素添加效果的属性是？

A、animation
B、keyframes
C、flash
D、transform

CSS3中还有哪些属性，有什么作用？






1. 现代浏览器在与服务器建立了一个 TCP 连接后是否会在一个 HTTP 请求完成后断开？
A： 会 B: 不会  C: 不一定

Connection: keep-alive 引申点： HTTP2 多路复用， Websocket与HTTP的区别等

同一个域名下，最多可以同时建立几个链接？HTTP/2有对应的解决方案否？如果不用HTTP/2，如何解决？
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/14




# 正式版 
1. 现代浏览器在与服务器建立了一个 TCP 连接后是否会在一个 HTTP 请求完成后断开？
A： 会 B: 不会  C: 不一定

引申点：HTTP2 多路复用， Websocket与HTTP的区别等


2. 下面属于CSS3新增属性的有？
A. background-clip
B. text-shadow
C. animations 
D. rgba

引申点： hsla， 透明度兼容性， animations与js动画的比较；如果需要手写，动画间隔最小是多少

3. 关于 HTML5 中的自定义属性(data-*)，下列哪个选项是正确的 ？
A. 自定义数据属性以 data 开始，并将根据您的需求进行命名
B. 您可以使用 JavaScript 获得这些属性的值
C. 以上都是
D. 以上都不是


4. ['1', '2', '3'].map(parseInt)返回结果 
A. [1, 2, 3]
C. [0, 1, 2]
D. [1, NaN, NaN ]
B. 没有返回结果

引申点： map, forEach 等ES6中的方法

5. `(!+[[]][0] + [] + ![]).length` 输出结果？
A. 9
B. 2
C. 1
D. 4



6. 将数组const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10] 扁平化/去重/排序，性能如何？
```js
const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
function one(s) {
    return Array.from(new Set(s.flat(Infinity))).sort((a, b) => a - b)
}

function two(s) {
    return Array.from(new Set(s.toString().split(","))).sort((a, b) => a - b).map(Number)
}

function three(s) {
    function unique(a) {
        return a.filter((item, index) => {
            return a.indexOf(item) === index
        })
    }
    return unique(s.toString().split(",")).sort((a, b) => a - b).map(Number)
};
```





1. 说一下reflow和repaint，
2. 如何做代码调试
3. 为什么要有ts呢
4. HTTP缓存
5. 实现一个前端路由，如何实现浏览器的前进与后退