
function isArray(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }
  
function Promise (fn) {
    if (!(this instanceof Promise)) throw new Error('不可按方法调用');
    if (typeof fn !== 'function') throw new Error('不是方法');

    this.state = 'pending';
    this.value = null;
    this.defered = [];
    this.handled = false
    doResolve(this, fn)
}

function doResolve (self, fn) {
    let done = false;
    try {
        fn(function(value) {
            if (done) return;
            done = true;
            resolve(self, value)
        }, function (reason) {
            if (done) return;
            done = true;
            reject(self, reason)
        });
    } catch (e) {
        if (done) return;
        done = true;
        reject(self, e);
    }
}
// todo
function reject (self, reason) {
    self.value = reason;
    self.state = 'rejected';
    final(self)
}
function resolve (self, value) {
    try {
        if (value === self) throw new Error('TypeError: Chaining cycle detected for promise')
        if (value && (typeof value === 'object' || typeof value === 'function')) {
            if (value instanceof Promise) {
                self.state = 'promise';
                self.value = value;
                final(self);
                return;
            }
            if (typeof value === 'function') {
                // 略
                return;
            }
        }
        self.state = 'resolved';
        self.value = value;
        final(self);
    } catch (e) {
        reject(self, e);
    }
}

function final (self) {
    if (self.state === 'rejected' &&  self.defered.length === 0) {
        Promise._immediateFn(function () {
            if (!self.handled) {
                Promise._unhandledRejectionFn(self.value);
            }
        })
    }
    for (let i = 0; i < self.defered.length; i++) {
        handle(self, self.defered[i]);
    }
    self.defered = [];
}

function handle (self, defered) {
    if (self.state === 'promise') {
        while(self.state === 'promise') {
            self = self.value
        }
    }
    if (self.state === 'pending') {
        self.defered.push(defered)
        return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
        if (self.state === 'resolved' || self.state === 'rejected') {
            let cb = self.state === 'resolved' ? defered.onFulfilled : defered.onRejected;
            if (cb === null) {
                (self.state === 'resolved' ? resolve : reject)(defered.promise, self.value);
                return;
            }
            try {
                let x = cb(self.value);
                resolve(defered.promise, x);
            } catch (e) {
                reject(defered.promise, e);
            }
        }
    })
}
function Handler (onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    const promise = new this.constructor(function () {});
    handle(this, new Handler(onFulfilled, onRejected, promise))
    return promise;
}
Promise.prototype.catch = function (onRejected) {
    let promise = this.then(null, onRejected);
    return promise;
}
Promise._unhandledRejectionFn = function _unhandledRejectionFn(reason) {
    if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', reason); // eslint-disable-line no-console
      }
}
Promise._immediateFn = function (fn) {
    if (globalThis.setImmdiate) {
        globalThis.setImmdiate(fn)
    } else {
        setTimeout(fn);
    }
}
Promise.reject = function (value) {
    let promise = new Promise(function (resolve, reject) {
      reject(value);
    });
    promise.handled = true;
    return promise;
  };
  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }
  
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;
  
      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(
                val,
                function (val) {
                  res(i, val);
                },
                reject
              );
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }
  
      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };
  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }
  
    return new Promise(function (resolve) {
      resolve(value);
    });
  };
let a = new Promise((resolve) => {
    setTimeout(() => {
        resolve({})
    })
})
a.then(e => console.log('then', e)).catch(e => console.log('catch', e))