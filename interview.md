## html


请解释 <script>、<script async> 和 <script defer> 的区别


## CSS
1. 什么情况下，用translate()而不用绝对定位？什么时候，情况相反。
> translate()是transform的一个值。改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。而改变绝对定位会触发重新布局，进而触发重绘和复合。transform使浏览器为元素创建一个 GPU 图层，但改变绝对定位会使用到 CPU。 因此translate()更高效，可以缩短平滑动画的绘制时间。
>
>当使用translate()时，元素仍然占据其原始空间（有点像position：relative），这与改变绝对定位不同。


## JS
1. 输出结果
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
1. 判断一个对象是否为空（{}） 的方法有哪些?
for...in, Object.keys, Object.values, Object.entries, Object.getOwnPropertyNames, 
JSON.stringify-> toJSON-> toString, valueof


2. ['1', '2', '3'].map(parseInt)返回结果 
[1, NaN, NaN ]

2. `(!+[[]][0] + [] + ![]).length` 输出结果？

3. Array.prototype.indexOf 与 Array.includes有什么区别？
```js
const arr = [NaN, +0, -0,,];
arr.indexOf(NaN); // -1
arr.indexOf(undefined); // -1
arr.indexOf(0); // 1
arr.indexOf(-0); // 1

arr.includes(NaN); // true
arr.includes(undefined); // true
```

将数组const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10] 扁平化/去重/排序，性能如何？
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
async/await 与 promise有什么不同？ 自己实现async/await 或 promise的polyfill


## web
同一个域名下，最多可以同时建立几个链接？HTTP/2有对应的解决方案否？如果不用HTTP/2，如何解决？
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/14

