#### event loop

https://juejin.im/post/5afbc62151882542af04112d

https://juejin.im/post/5d5b4c2df265da03dd3d73e5

#### bind返回的函数还可以使用bind吗

可以使用bind,但是是无效的

原理：

```javascript
// MDN
if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== 'function') {
                //bind函数不是被函数调用时，检测到this不是函数，此处直接抛出错误
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }
 
            var aArgs = Array.prototype.slice.call(arguments, 1),//获取参数，从参数列表第一个开始获取，返回数组，获取除绑定的this之外的其他参数
                fToBind = this,//需要修改this的函数
                fNOP = function () {
                },
                fBound = function () {
                    // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
                    return fToBind.apply(this instanceof fBound
                        ? this
                        : oThis,
                        // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的，即将bind函数中的除第一个参数之外的其他参数追加到实际执行中
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };
 
            // 维护原型关系
            if (this.prototype) {
                // 此处获取原函数的原型，返回fBound时作为fBound的原型，维护原有的原型链
                fNOP.prototype = this.prototype;
            }
            // 下行的代码使fBound.prototype是fNOP的实例,因此
            // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
            fBound.prototype = new fNOP();
 
            return fBound;
        };
```

#### react组件间通信

https://github.com/sunyongjian/blog/issues/27

#### common.js和es6模块化的区别是什么，为什么在有了es6有了模块化的情况下还是有common.js


