promise实现

https://www.jianshu.com/p/43de678e918a
对上面的补充
https://www.jianshu.com/p/4f3bef72758c

### 为什么会增加Promise

背景：javascript是一种单线程语言，需要异步操作时就通过回调函数来解决，但是异步函数调用层级深时代码就难以维护，ES6提供了一种更优雅的方式编写异步函数：Promise

### Promise规范

任何符合 promise 规范的对象或函数都可以成为 promise，promise A plus 规范地址: https://promisesaplus.com/

#### 术语

- Promise:promise 是一个拥有 then 方法的对象或函数，其行为符合本规范。\
- 具有 then 方法(thenable):是一个定义了 then 方法的对象或函数; 
- 值(value):指任何 JavaScript 的合法值(包括 undefined , thenable 和 promise); 异常(exception):是使用 throw 语句抛出的一个值。
- 原因(reason):表示一个 promise 的拒绝原因。

#### 要求

- 状态：pending、fulfilled、rejected，单向改变pending->fulfilled 或者pending->rejected
- 必须有一个then方法，then方法需要满足：
    - 接收两个可选参数`promise.then(onFulfilled,onRejected)`，参数类型为函数，如果不是函数则忽略
    - onFulfilled为函数：当 promise 执行结束后其必须被调用，其第一个参数为 promise 的结果，在 promise 执行结束前其不可被调用，调用次数不可超过一次
    - onRejected为函数：当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的原因，在 promise 被拒绝执行前其不可被调用，调用次数不可超过一次
    - 在执行上下文堆栈仅包含平台代码之前，不得调用 onFulfilled 或 onRejected：即onFulfilled和onRejected必须是异步函数，执行时机为js执行线程执行完所有同步代码且执行完排在前面的异步任务
    - onFulfilled 和 onRejected 必须被作为普通函数调用(即非实例化调用，这样函数内部 this 非严格模式下指向 window)
    - then方法可以被一个promise调用多次
        - 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
        - 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调
    - then方法必须返回一个 promise 对象 `promise2 = promise1.then(onFulfilled, onRejected);`
        - onFulfiled或者onRejected返回一个值时，promise2状态变为fullfielled
        - onFulfiled或者onRejected抛出一个异常或者返回一个promise.reject，promise2状态变为rejected
        - onFulfiled不是函数，且promise状态为fufiiled，promise2状态必须为fulfilled且返回相同的值
        - 如果 onRejected 不是函数且 promise 状态变为已拒绝， promise2 必须执行拒绝回调并返 回相同的据因
- promise的解决过程：
    - Promise 解决过程是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 [[Resolve]](promise, x) (这句话的意思就是把 promise resolve 了，同时传入 x 作为值)

    ```javascript
        promise.then(function(x) { 
            onsole.log('会执行这个函数，同时传入 x 变量的值', x);
        });
    ```

    - 如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 用 x 的值来执行 promise。
    - 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise 如：
    ```javascript
    let a = new Promise((resolve) => {
        setTimeout(() => {
            resolve(a);
        })
    })
    // TypeError: Chaining cycle detected for promise #<Promise>
    ``` 
    - 如果x为promise
        - 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
        - 如果 x 处于执行态，用相同的值执行 promise
        - 如果 x 处于拒绝态，用相同的据因拒绝 promise
    - 如果 x 为 Object 或 function(不常⻅)
        - 首先尝试执行 x.then
        - 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
        - 如果 then 是函数，将 x 作为函数的作用域 this 调用。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise :
            - 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
            - 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
            - 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先 采用首次调用并忽略其他的调用
            - 如果调用 then 方法抛出了异常 e
                - 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略
                - 否则以 e 为据因拒绝 promise
        - 如果 then 不为函数，以 x 为参数将 promise 变为已完成状态
    - 如果 x 不为对象或者函数，以 x 为参数将 promise 变为已完成状态(重要且常⻅)

### Promise 静态方法

- Promise.all
- Promise.race
- Promise.resolve
- promise.reject
    

#### 代码示例

```javascript
function Promise (fn) {
    if (typeof fn !== 'function') throw new Error('need function');
    if (!(this instanceof Promise)) throw new Error('不能以方法方式调用');

    this.state = 'pending';
    this.value = null;
    this.defered = [];
    this.handled = false;

    doResolve(fn, this);
}
// 包装函数，防止多次调用
fucntion doResolve(fn, self) {
    let done = false;
    try {
        fn(
            function (val) {
                if (done) return;
                done = true;
                resolve(self, val);
            },
            function (val) {
                if (done) return;
                done = true;
                reject(self, val);
            }
        )
    } catch (e) {
        if (done) return;
        done = true;
        rejct(self, e)
    }
}
// 改变目标promise的状态
function resolve (self, val) {
    try {
        if (val === self) throw new TypeError('A promise cannot be resolved with itself.');
        if (val && (typeof val === 'obejct' || typeof val === 'function')) {
            let then = val.then;
            if (val instanceof Promise) {
                self.state = 'promise';
                self.value = val;
                finale(self);
                return
            }
            if (typeof then === 'function') {
                doResolve(bind(then, val), self);
                return;
            }
        }
        self.state = 'resolved';
        self.value = val;
        finale(self);
    } catch (e) {
        reject(self, e)
    }
}
// 状态变更之后执行注册的回调
function finale (self) {
    if (self.state === 'rejected' && self.defered.length === 0) {
        Promise._immediateFn(function () {
            if (!self._handled) {
                Promise._unhandledRejectionFn(self.value);
            }
        });
    }
    for (let i = 0; i < self.defered.length; i++) {
        handle(self, self.defered[i]);
    }
    slef.defered = [];
}
function handle (self, defer) {
    while (self.state === 'promise') {
        self = self.value;
           }
    // 兼容then注册和resovle一个pending中的Promise
    if (
        self.state === 'pending') {
        
        
        
        
        
        
        
        
        
        
        
        ‘self.defered.push(defer)
        return;
    }
    self.handled = true;
    Promise._immediateFn(function () {
        try {
            let cb = self.state === 'resolved' ? defer.onFulfilled : defer.onRejected;
            if (cb === null) {
                (self.state === 'resolved' ? resolve : reject)(defer.promise, val);
                return;
            }
            let x = cb(val);
            resolve(defer.promise, x);
        } catch (e) {
            reject(defer.promise, e)
        }
    })
}
function reject (self, val) {
    self.state === 'rejected';
    self.val = val;
    finale(self)
}
function bind(fn, thisArg) {
  return function () {
    fn.apply(thisArg, arguments);
  };
}
function Handler (onFulfilled, onRejected, promise) {
    this.onFilfilled = onFulfilled || null;
    this.onRejected = onRejected || null;
    this.promise = promise;
}
Promise.prototype.then = functon (onFulfilled, onRejected) {
    let promise = new Promsie(() => {});
    handler(promise, new Handler(onFulfilled, onRejected, promise))
    return promise;
}
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}
Promise.resolve = function (val) {
    return new Promise((resolve) => {
        resolve(val)
    })
}
Promise.reject = function (err) {
    let promsie = new Promise((resolve, reject) => {
        reject(val)
    })
    return
}
Promise.all = function (arr) {
    return new Promise((res, rej) => {
        if (!isArray(arr)) {
            return rej(new TypeError('Promise.all accepts an array'))
        }

        var args = Array.prototype.slice.call(arr);
        if (args.length === 0) return res([]);
        var remaining = ars.length;
        function res (i, val) {
            try {
                if (val && (typeof val === 'object' || typeof val === 'function')) {
                    var then = val.then;
                    if (typeof then === 'function') {
                        then.call(
                            val,
                            function (val) {
                                res(i, val);
                            },
                            rej
                        );
                        return;
                    }
                }
                args[i] = val;
                if (--remaining === 0) {
                    res(args);
                }
            } catch (ex) {
                rej(ex);
            }
        }
        for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
        }
    })
}
Promise.race = function () {
    return new Promise(function (resolve, reject) {
        if (!isArray(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
        }

        for (var i = 0, len = arr.length; i < len; i++) {
            Promise.resolve(arr[i]).then(resolve, reject);
        }
    });
}
Promise._immediateFn = function (fn) {
    if (globalThis.setImmediate) {
        globalThis.setImmediate(fn)
    } else {
        setTimeout(fn, 0);
    }
}
Promise._unhandledRejectionFn = function (err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
}
function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

```