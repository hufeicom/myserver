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

7. 如何隐藏DOM元素
使用hidden属性完全隐藏元素
使用aira-hidden属性隐藏无障碍树上的元素
使用.visuallyhidden类隐藏屏幕上的一个元素
使用visibility: inherit;替代visibility:visible；从而避免事故性得展示内容
不要为添加了aria-hidden的元素附加任何样式
通过添加tabindex=“-1”，使得屏幕不可见，无障碍树不暴露的元素，同时做到键盘不可访问




# 高级

1. 实现foo(1)(2)， 输出3 (闭包，函数式编程，扩展: compose, react hooks, vue3新特性, 组件/逻辑复用)
```js
function foo(x){
    return function(y){
        return x+y
    }
}
```
2. 这段代码有什么问题？(reflow/repaint， 拓展：浏览器渲染过程， 虚拟DOM做的工作，diff算法， 其它性能优化点)
```js
var left = 10, top = 10;
el.style.left = left + "px";
el.style.top  = top  + "px";
```

3. 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少？（为什么？）
    [深究 JavaScript 数组 —— 演进&性能](https://juejin.im/entry/59ae664d518825244d207196)

4. 浏览器中，同一个域名下，最大TCP链接数是多少？ 为什么？（HTTP1.x） 拓展：HTTP2多路复用， 扩展域名（img1.taobao.com, ）

5. 讲讲不同的模块机制（AMD, CMD, commojs, ES Module）？如果有循环依赖会怎样？ 在工程化中的处理

5. 如何优化SPA应用的首屏加载速度慢的问题？(工程打包，SSR，preload/prefetch)，拓展：SEO优化

6. 页面上有一个input，还有一个p标签，改变input后p标签就跟着变化，如何处理(双向绑定的相关点，集中不同实现方式)， 不用addEventListener，如果给同一事件绑定多个不同的回调

7. 实现一个前端路由，如何实现浏览器的前进与后退

8. 有个上课场景，有
    1. 展示当前课堂的学生人数，进入和离开会有提示；
    2. 会展示多道题目；
    2. 在课堂上会有学生作答，展示作答人数和结果；
    3. 可以批改，并统计正确率，可以看某个题目的正确率或者某个学生正确率；
    该如何处理 （状态管理，观察者模式， 发布-订阅模式）？如果引入单元测试，具体实施步骤，注意问题

10. 将数组const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10] 扁平化/去重/排序，性能如何？

11. 聊天界面，下滑翻看聊天记录的场景（滚动条位置，大数量问题，查看新消息）？ 如果页面经常崩溃，如何定位问题？ 排查问题，内存泄漏（window.performance）等

12. js是单线程的，为什么node.js可以做到高并发，适宜的场景？ （异步I/O， 事务驱动， Event loop）

13. 本来你在A分支做的更改，不小心提交到了B分支上，如何处理？ 【git cherry pick】
    当本地版本落后于远程时，且自己有未push的commit， 此时pull代码会自动合并并产生一次新分支对么？ （git rebase）

14. 移动端的处理

17. 如果一个前端项目，对接多个后端，需要注意哪些问题？（协作， 跨域， mock等） 多个项目多人开发，如何做好项目质量保证和统一？

15. 多端统一处理的方案了解哪些，
