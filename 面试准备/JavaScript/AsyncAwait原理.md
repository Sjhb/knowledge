### es6 generator

function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个  Generator  对象
```javascript
    function* generator(i) {
    yield i;
    yield i + 10;
    }

    const gen = generator(10);

    console.log(gen.next().value);
    // expected output: 10

    console.log(gen.next().value);
    // expected output: 20
```

生成器函数在执行时能暂停，后面又能从暂停处继续执行。

调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器 （ iterator ）对象。当这个迭代器的 next() 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现yield的位置为止，yield 后紧跟迭代器要返回的值。或者如果用的是 yield*（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。

next()方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 yield 表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有 yield 语句，即生成器函数是否已经执行完毕并返回。

调用 next()方法时，如果传入了参数，那么这个参数会传给上一条执行的 yield语句左边的变量.

当在生成器函数中显式 return 时，会导致生成器立即变为完成状态，即调用 next() 方法返回的对象的 done 为 true。如果 return 后面跟了一个值，那么这个值会作为当前调用 next() 方法返回的 value 值。

### promise 结合 generator

```javascript
let getPromise = (arg) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(arg);
        }, 100)
    })
}
function * test () {
    let a = yield getPromise(1);
    let a1 = 0;
    let b = yield getPromise(a + a1 + 1);
    yield b++;
    return b;
}
let res = test();
res.next().value.then(e => {
    console.log(e)
    return res.next(e).value;
}).then((e) => {
    console.log(res.next(e))
    console.log(res.next())
})
// 1
// { value: 2, done: false }
// { value: 3, done: true }
```

在test函数内部，代码就像是在同步执行一样。但是写起来比较麻烦，co函数库就解决了这个问题，它提供了一一个函数执行器，
```javascript
    const co = require('co')
    co(test).then(res => console.log(res)) // { value: 3, done: true }
```

### async / await 

#### 基本含义

async 使得后面的 function 始终返回一个 promise，无论 function 本身返回的是否是 promise。

await 必须在 async 函数内部使用，只有等到 await 后面的部分执行完成后，函数才会继续往下执行。

await 会把后面的 promise 放到 microtask queue 中，所以当 await 和 setTimeout 放到一起时，会先执行 await 的部分，再执行 setTimeout 的部分（setTimeout 会进入 macrotask，优先级低于 microtask）。比如：

```javascript
async function f() {
  return 1;
}

(async () => {
    setTimeout(() => console.log('setTimeout is done'), 0);

    await f();
    console.log('await is done'); 
})();
// await is done
// setTimeout is done
```

#### 基本原理

async / await 本质上是 generator 的语法糖，与 generator 相比，多了以下几个特性：

- 内置执行器，无需手动执行 next() 方法
- await 后面的函数可以是 promise 对象也可以是普通 function，而 yield 关键字后面必须得是 thunk 函数或 promise 对象

```javascript
async function fn(args) {
  // ...
}
// 等价于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}
// 而 spawn 函数就是所谓的自动执行器了
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

参考：
    https://github.com/frontend9/fe9-interview/issues/6\
    https://zhuanlan.zhihu.com/p/115112361
